// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — MEGA-AWARE MILLION BATTLE SIMULATION
// Full-scale ML training with mega vs base form differentiation
// Each mega Pokémon gets separate ELO, win rates, partners, and matchup data
// ═══════════════════════════════════════════════════════════════════════════════

import {
  runMLSimulation,
  formatReport,
  type FinalReport,
  type ELOEntry,
  type PokemonStats,
  type MoveStats,
  type ArchetypeStats,
  type MLInsight,
  type MetaSnapshot,
} from "../src/lib/engine/ml-runner";
import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const DEFAULT_TARGET_BATTLES = 2_000_000;
const DEFAULT_DURATION_MS = 86_400_000;
const DEFAULT_BATCH_SIZE = 100;
const DEFAULT_ITERATIONS = 7;

interface CliConfig {
  targetBattles: number;
  durationMs: number;
  batchSize: number;
  iterationsPerBattle: number;
  workers: number;
  keepShards: boolean;
}

interface ShardRunResult {
  shardIndex: number;
  report: FinalReport;
}

function parseArg(name: string): string | undefined {
  const args = process.argv.slice(2);
  const inlinePrefix = `--${name}=`;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith(inlinePrefix)) return arg.slice(inlinePrefix.length);
    if (arg === `--${name}`) return args[i + 1];
  }
  return undefined;
}

function parseIntArg(name: string, fallback: number): number {
  const raw = parseArg(name);
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
}

function hasFlag(name: string): boolean {
  return process.argv.slice(2).includes(`--${name}`);
}

function getCpuCount(): number {
  const available = (os as { availableParallelism?: () => number }).availableParallelism;
  return typeof available === "function" ? available() : os.cpus().length;
}

function parseCliConfig(): CliConfig {
  const cpuCount = getCpuCount();
  const requestedWorkers = parseIntArg("workers", cpuCount);
  const workers = Math.max(1, Math.min(requestedWorkers, cpuCount));

  return {
    targetBattles: parseIntArg("battles", DEFAULT_TARGET_BATTLES),
    durationMs: parseIntArg("duration", DEFAULT_DURATION_MS),
    batchSize: parseIntArg("batch", DEFAULT_BATCH_SIZE),
    iterationsPerBattle: parseIntArg("iters", DEFAULT_ITERATIONS),
    workers,
    keepShards: hasFlag("keep-shards"),
  };
}

function splitBattles(totalBattles: number, shardCount: number): number[] {
  const base = Math.floor(totalBattles / shardCount);
  const remainder = totalBattles % shardCount;
  const chunks: number[] = [];
  for (let i = 0; i < shardCount; i++) {
    chunks.push(base + (i < remainder ? 1 : 0));
  }
  return chunks.filter(n => n > 0);
}

function prefixedWrite(prefix: string, chunk: Buffer): void {
  const text = chunk.toString();
  if (!text) return;
  const withPrefix = text
    .split(/\r?\n/)
    .filter(line => line.length > 0)
    .map(line => `${prefix} ${line}`)
    .join("\n");
  if (withPrefix) process.stdout.write(withPrefix + "\n");
}

function shellQuote(value: string): string {
  return `"${value.replace(/"/g, '\\"')}"`;
}

function runShardWorker(
  shardIndex: number,
  shardBattles: number,
  config: CliConfig,
  shardDir: string,
): Promise<ShardRunResult> {
  return new Promise((resolve, reject) => {
    const workerScript = path.join(__dirname, "run-mega-sim-shard.ts");
    const outPath = path.join(shardDir, `shard-${shardIndex + 1}.json`);
    const command = [
      "npx",
      "tsx",
      shellQuote(workerScript),
      "--shard", String(shardIndex + 1),
      "--battles", String(shardBattles),
      "--duration", String(config.durationMs),
      "--batch", String(config.batchSize),
      "--iters", String(config.iterationsPerBattle),
      "--out", shellQuote(outPath),
    ].join(" ");

    const child = spawn(command, {
      cwd: path.join(__dirname, ".."),
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });

    child.stdout.on("data", chunk => prefixedWrite(`[Shard ${shardIndex + 1}]`, chunk));
    child.stderr.on("data", chunk => prefixedWrite(`[Shard ${shardIndex + 1} ERR]`, chunk));
    child.on("error", reject);

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Shard ${shardIndex + 1} exited with code ${code ?? "unknown"}`));
        return;
      }
      try {
        const raw = fs.readFileSync(outPath, "utf-8");
        const report = JSON.parse(raw) as FinalReport;
        resolve({ shardIndex, report });
      } catch (err) {
        reject(err);
      }
    });
  });
}

function roundTenth(value: number): number {
  return Math.round(value * 10) / 10;
}

function weightedAverage(sum: number, weight: number): number {
  return weight > 0 ? sum / weight : 0;
}

function mergeInsights(reports: FinalReport[]): MLInsight[] {
  const byDescription = new Map<string, MLInsight>();
  for (const report of reports) {
    for (const insight of report.insights) {
      const existing = byDescription.get(insight.description);
      if (!existing || insight.confidence > existing.confidence) {
        byDescription.set(insight.description, insight);
      }
    }
  }
  return [...byDescription.values()].sort((a, b) => b.confidence - a.confidence).slice(0, 50);
}

function mergeTeamRankings(reports: FinalReport[]): ELOEntry[] {
  const merged = new Map<string, {
    id: string;
    wins: number;
    losses: number;
    totalGames: number;
    avgTurnsWeightedSum: number;
    avgRemainingWeightedSum: number;
    avgRemainingWeight: number;
    eloWeightedSum: number;
    eloWeight: number;
    peakElo: number;
    lastUpdated: number;
  }>();

  for (const report of reports) {
    for (const t of report.teamRankings) {
      const rec = merged.get(t.id) ?? {
        id: t.id,
        wins: 0,
        losses: 0,
        totalGames: 0,
        avgTurnsWeightedSum: 0,
        avgRemainingWeightedSum: 0,
        avgRemainingWeight: 0,
        eloWeightedSum: 0,
        eloWeight: 0,
        peakElo: t.peakElo,
        lastUpdated: t.lastUpdated,
      };
      rec.wins += t.wins;
      rec.losses += t.losses;
      rec.totalGames += t.totalGames;
      rec.avgTurnsWeightedSum += t.avgTurns * t.totalGames;
      rec.avgRemainingWeightedSum += t.avgRemaining * Math.max(0, t.wins);
      rec.avgRemainingWeight += Math.max(0, t.wins);
      rec.eloWeightedSum += t.elo * Math.max(1, t.totalGames);
      rec.eloWeight += Math.max(1, t.totalGames);
      rec.peakElo = Math.max(rec.peakElo, t.peakElo);
      rec.lastUpdated = Math.max(rec.lastUpdated, t.lastUpdated);
      merged.set(t.id, rec);
    }
  }

  const rankings: ELOEntry[] = [];
  for (const rec of merged.values()) {
    const totalGames = rec.totalGames;
    rankings.push({
      id: rec.id,
      elo: Math.round(weightedAverage(rec.eloWeightedSum, rec.eloWeight)),
      wins: rec.wins,
      losses: rec.losses,
      totalGames,
      winRate: totalGames > 0 ? roundTenth((rec.wins / totalGames) * 100) : 0,
      avgTurns: totalGames > 0 ? rec.avgTurnsWeightedSum / totalGames : 0,
      avgRemaining: rec.avgRemainingWeight > 0 ? rec.avgRemainingWeightedSum / rec.avgRemainingWeight : 0,
      peakElo: rec.peakElo,
      lastUpdated: rec.lastUpdated,
    });
  }
  rankings.sort((a, b) => b.elo - a.elo);
  return rankings;
}

function mergePokemonRankings(reports: FinalReport[]): PokemonStats[] {
  const merged = new Map<string, {
    id: number;
    name: string;
    appearances: number;
    wins: number;
    losses: number;
    avgTeammateCountWeightedSum: number;
    avgTeammateCountWeight: number;
    eloWeightedSum: number;
    eloWeight: number;
    partnerAgg: Map<string, { games: number; wins: number }>;
    setAgg: Map<string, { games: number; wins: number }>;
  }>();

  for (const report of reports) {
    for (const p of report.pokemonRankings) {
      const key = `${p.id}|${p.name}`;
      const rec = merged.get(key) ?? {
        id: p.id,
        name: p.name,
        appearances: 0,
        wins: 0,
        losses: 0,
        avgTeammateCountWeightedSum: 0,
        avgTeammateCountWeight: 0,
        eloWeightedSum: 0,
        eloWeight: 0,
        partnerAgg: new Map(),
        setAgg: new Map(),
      };
      rec.appearances += p.appearances;
      rec.wins += p.wins;
      rec.losses += p.losses;
      rec.avgTeammateCountWeightedSum += p.avgTeammateCount * p.appearances;
      rec.avgTeammateCountWeight += p.appearances;
      rec.eloWeightedSum += p.elo * Math.max(1, p.appearances);
      rec.eloWeight += Math.max(1, p.appearances);

      for (const bp of p.bestPartners) {
        const agg = rec.partnerAgg.get(bp.name) ?? { games: 0, wins: 0 };
        agg.games += bp.games;
        agg.wins += (bp.winRate / 100) * bp.games;
        rec.partnerAgg.set(bp.name, agg);
      }
      for (const bs of p.bestSets) {
        const agg = rec.setAgg.get(bs.set) ?? { games: 0, wins: 0 };
        agg.games += bs.games;
        agg.wins += (bs.winRate / 100) * bs.games;
        rec.setAgg.set(bs.set, agg);
      }

      merged.set(key, rec);
    }
  }

  const rankings: PokemonStats[] = [];
  for (const rec of merged.values()) {
    const bestPartners = [...rec.partnerAgg.entries()]
      .filter(([, v]) => v.games > 0)
      .map(([name, v]) => ({
        id: 0,
        name,
        games: v.games,
        winRate: roundTenth((v.wins / v.games) * 100),
      }))
      .sort((a, b) => b.winRate - a.winRate)
      .slice(0, 5);

    const bestSets = [...rec.setAgg.entries()]
      .filter(([, v]) => v.games > 0)
      .map(([set, v]) => ({
        set,
        games: v.games,
        winRate: roundTenth((v.wins / v.games) * 100),
      }))
      .sort((a, b) => b.winRate - a.winRate)
      .slice(0, 5);

    rankings.push({
      id: rec.id,
      name: rec.name,
      appearances: rec.appearances,
      wins: rec.wins,
      losses: rec.losses,
      winRate: rec.appearances > 0 ? roundTenth((rec.wins / rec.appearances) * 100) : 0,
      avgTeammateCount: rec.avgTeammateCountWeight > 0
        ? rec.avgTeammateCountWeightedSum / rec.avgTeammateCountWeight
        : 0,
      bestPartners,
      worstMatchups: [],
      bestSets,
      elo: Math.round(weightedAverage(rec.eloWeightedSum, rec.eloWeight)),
    });
  }

  rankings.sort((a, b) => b.elo - a.elo);
  return rankings;
}

function mergeMoveRankings(reports: FinalReport[]): MoveStats[] {
  const merged = new Map<string, { name: string; appearances: number; wins: number }>();

  for (const report of reports) {
    for (const m of report.moveRankings) {
      const rec = merged.get(m.name) ?? { name: m.name, appearances: 0, wins: 0 };
      rec.appearances += m.appearances;
      rec.wins += (m.winRate / 100) * m.appearances;
      merged.set(m.name, rec);
    }
  }

  const rankings: MoveStats[] = [...merged.values()].map(rec => ({
    name: rec.name,
    appearances: rec.appearances,
    winContributions: Math.round(rec.wins),
    winRate: rec.appearances > 0 ? roundTenth((rec.wins / rec.appearances) * 100) : 0,
  }));
  rankings.sort((a, b) => b.winRate - a.winRate);
  return rankings;
}

function mergeArchetypeRankings(reports: FinalReport[]): ArchetypeStats[] {
  const merged = new Map<string, {
    name: string;
    wins: number;
    losses: number;
    eloWeightedSum: number;
    eloWeight: number;
  }>();

  for (const report of reports) {
    for (const a of report.archetypeRankings) {
      const rec = merged.get(a.name) ?? {
        name: a.name,
        wins: 0,
        losses: 0,
        eloWeightedSum: 0,
        eloWeight: 0,
      };
      const games = Math.max(1, a.wins + a.losses);
      rec.wins += a.wins;
      rec.losses += a.losses;
      rec.eloWeightedSum += a.elo * games;
      rec.eloWeight += games;
      merged.set(a.name, rec);
    }
  }

  const rankings: ArchetypeStats[] = [...merged.values()].map(rec => {
    const games = rec.wins + rec.losses;
    return {
      name: rec.name,
      elo: Math.round(weightedAverage(rec.eloWeightedSum, rec.eloWeight)),
      wins: rec.wins,
      losses: rec.losses,
      winRate: games > 0 ? roundTenth((rec.wins / games) * 100) : 0,
      bestMatchups: [],
      worstMatchups: [],
    };
  });

  rankings.sort((a, b) => b.elo - a.elo);
  return rankings;
}

function mergeBestPairs(reports: FinalReport[]): FinalReport["bestPairs"] {
  const merged = new Map<string, { pokemon1: string; pokemon2: string; games: number; wins: number }>();

  for (const report of reports) {
    for (const pair of report.bestPairs) {
      const [p1, p2] = [pair.pokemon1, pair.pokemon2].sort((a, b) => a.localeCompare(b));
      const key = `${p1}|${p2}`;
      const rec = merged.get(key) ?? { pokemon1: p1, pokemon2: p2, games: 0, wins: 0 };
      rec.games += pair.games;
      rec.wins += (pair.winRate / 100) * pair.games;
      merged.set(key, rec);
    }
  }

  return [...merged.values()]
    .filter(p => p.games > 0)
    .map(p => ({
      pokemon1: p.pokemon1,
      pokemon2: p.pokemon2,
      games: p.games,
      winRate: roundTenth((p.wins / p.games) * 100),
    }))
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 100);
}

function buildMetaSnapshot(
  pokemonRankings: PokemonStats[],
  archetypeRankings: ArchetypeStats[],
  bestPairs: FinalReport["bestPairs"],
): MetaSnapshot {
  const ranked = [...pokemonRankings]
    .filter(p => p.appearances >= 100)
    .sort((a, b) => b.elo - a.elo);
  const total = ranked.length;
  const tier1 = ranked.slice(0, Math.ceil(total * 0.08)).map(p => p.name);
  const tier2 = ranked.slice(Math.ceil(total * 0.08), Math.ceil(total * 0.25)).map(p => p.name);
  const tier3 = ranked.slice(Math.ceil(total * 0.25), Math.ceil(total * 0.55)).map(p => p.name);

  const dominantArchetypes = archetypeRankings.slice(0, 5).map(a => a.name);
  const underratedPokemon = ranked
    .filter(p => p.winRate > 55 && p.appearances < 20)
    .slice(0, 5)
    .map(p => p.name);
  const overratedPokemon = ranked
    .filter(p => p.winRate < 45 && p.appearances > 15)
    .slice(0, 5)
    .map(p => p.name);
  const bestCores = bestPairs.slice(0, 5).map(p => `${p.pokemon1} + ${p.pokemon2}`);

  return { tier1, tier2, tier3, dominantArchetypes, underratedPokemon, overratedPokemon, bestCores };
}

function mergeReports(reports: FinalReport[], elapsedMs: number): FinalReport {
  const totalBattles = reports.reduce((sum, r) => sum + r.totalBattles, 0);
  const teamRankings = mergeTeamRankings(reports);
  const pokemonRankings = mergePokemonRankings(reports);
  const moveRankings = mergeMoveRankings(reports);
  const archetypeRankings = mergeArchetypeRankings(reports);
  const bestPairs = mergeBestPairs(reports);
  const insights = mergeInsights(reports);
  const metaSnapshot = buildMetaSnapshot(pokemonRankings, archetypeRankings, bestPairs);

  return {
    totalBattles,
    elapsedMs,
    battlesPerSecond: elapsedMs > 0 ? roundTenth(totalBattles / (elapsedMs / 1000)) : 0,
    teamRankings,
    pokemonRankings,
    moveRankings,
    archetypeRankings,
    bestPairs,
    insights,
    metaSnapshot,
  };
}

async function runSingleSimulation(config: CliConfig): Promise<FinalReport> {
  let lastProgressBattles = 0;
  const startTime = Date.now();

  return runMLSimulation({
    durationMs: config.durationMs,
    maxBattles: config.targetBattles,
    batchSize: config.batchSize,
    iterationsPerBattle: config.iterationsPerBattle,
    onProgress: (progress) => {
      if (progress.battlesCompleted - lastProgressBattles < 10000) return;
      lastProgressBattles = progress.battlesCompleted;

      const elapsed = Math.round((Date.now() - startTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      const pct = Math.round((progress.battlesCompleted / config.targetBattles) * 100);
      const eta = progress.battlesPerSecond > 0
        ? Math.round((config.targetBattles - progress.battlesCompleted) / progress.battlesPerSecond)
        : 0;
      const etaMins = Math.floor(eta / 60);
      const etaSecs = eta % 60;

      process.stdout.write(
        `\r  [${mins}:${secs.toString().padStart(2, "0")}] ` +
        `${progress.battlesCompleted.toLocaleString()}/${config.targetBattles.toLocaleString()} battles (${pct}%) | ` +
        `${progress.battlesPerSecond.toFixed(1)}/s | ` +
        `ETA ${etaMins}:${etaSecs.toString().padStart(2, "0")} | ` +
        `Top: ${progress.topPokemon.slice(0, 3).map(p => p.name).join(", ")}   `
      );
    },
    onInsight: (insight) => {
      if (insight) console.log(`\n  ⚡ [INSIGHT] ${insight.description}`);
    },
  });
}

async function runParallelSimulation(config: CliConfig): Promise<FinalReport> {
  const shardDir = path.join(__dirname, "..", ".sim-shards");
  fs.mkdirSync(shardDir, { recursive: true });

  const shardBattles = splitBattles(config.targetBattles, config.workers);
  console.log(`  Launching ${shardBattles.length} shard workers across ${config.workers} requested cores...`);
  console.log(`  Battles per shard: ${shardBattles.join(", ")}`);

  const start = Date.now();
  const shardResults = await Promise.all(
    shardBattles.map((battles, idx) => runShardWorker(idx, battles, config, shardDir))
  );
  const elapsedMs = Date.now() - start;

  const merged = mergeReports(
    shardResults
      .sort((a, b) => a.shardIndex - b.shardIndex)
      .map(r => r.report),
    elapsedMs
  );

  if (!config.keepShards) {
    fs.rmSync(shardDir, { recursive: true, force: true });
  }

  return merged;
}

function exportSimulationData(report: FinalReport): void {
  const simData = buildSimulationData(report);
  const outPath = path.join(__dirname, "..", "src", "lib", "simulation-data.ts");

  const tsContent = `// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — AUTO-GENERATED SIMULATION DATA
// Generated from ${report.totalBattles.toLocaleString()} mega-aware battle simulations
// Date: ${new Date().toISOString()}
// ═══════════════════════════════════════════════════════════════════════════════

export interface SimPokemonData {
  id: number;
  name: string;
  isMega: boolean;
  elo: number;
  winRate: number;
  appearances: number;
  wins: number;
  losses: number;
  bestPartners: { name: string; winRate: number; games: number }[];
  bestSets: { set: string; winRate: number; games: number }[];
}

export interface SimPairData {
  pokemon1: string;
  pokemon2: string;
  winRate: number;
  games: number;
}

export interface SimArchetypeData {
  name: string;
  elo: number;
  winRate: number;
  wins: number;
  losses: number;
}

export interface SimMoveData {
  name: string;
  winRate: number;
  appearances: number;
}

export interface SimMetaSnapshot {
  tier1: string[];
  tier2: string[];
  tier3: string[];
  dominantArchetypes: string[];
  underratedPokemon: string[];
  overratedPokemon: string[];
  bestCores: string[];
}

/** Pokemon simulation data keyed by "id" or "id-mega" */
export const SIM_POKEMON: Record<string, SimPokemonData> = ${JSON.stringify(simData.pokemon, null, 2)};

/** Best core pairs from simulation */
export const SIM_PAIRS: SimPairData[] = ${JSON.stringify(simData.pairs, null, 2)};

/** Archetype rankings from simulation */
export const SIM_ARCHETYPES: SimArchetypeData[] = ${JSON.stringify(simData.archetypes, null, 2)};

/** Top moves by win rate from simulation */
export const SIM_MOVES: SimMoveData[] = ${JSON.stringify(simData.moves, null, 2)};

/** Meta tier snapshot from simulation */
export const SIM_META: SimMetaSnapshot = ${JSON.stringify(simData.meta, null, 2)};

/** Total battles simulated */
export const SIM_TOTAL_BATTLES = ${report.totalBattles};

/** Simulation date */
export const SIM_DATE = "${new Date().toISOString()}";
`;

  fs.writeFileSync(outPath, tsContent, "utf-8");
  console.log(`\n  ✅ Simulation data exported to: ${outPath}`);
}

async function main() {
  const config = parseCliConfig();

  console.log("═══════════════════════════════════════════════════════════");
  console.log("  CHAMPIONS LAB — MEGA-AWARE BATTLE SIMULATION");
  console.log("  Tournament + Generated + Prebuilt + Mega/Base Variant Teams");
  console.log("  50 Mega Pokémon tracked separately from base forms");
  console.log(`  Target battles: ${config.targetBattles.toLocaleString()}`);
  console.log(`  Workers: ${config.workers} | Batch: ${config.batchSize} | Iterations: ${config.iterationsPerBattle}`);
  console.log("═══════════════════════════════════════════════════════════\n");

  const startTime = Date.now();
  const report = config.workers > 1
    ? await runParallelSimulation(config)
    : await runSingleSimulation(config);

  console.log("\n");
  console.log(formatReport(report));

  exportSimulationData(report);

  // Log mega-specific stats
  const megaEntries = report.pokemonRankings.filter(p => {
    // Mega entries have names that include "Mega"
    return p.name.includes("Mega ");
  });
  
  console.log(`\n  ── MEGA POKEMON STATS (${megaEntries.length} tracked) ──`);
  for (const m of megaEntries.sort((a, b) => b.elo - a.elo).slice(0, 20)) {
    console.log(`    ${m.name} — ELO: ${m.elo} | WR: ${m.winRate}% | ${m.appearances} games`);
  }

  const totalTime = Math.round((Date.now() - startTime) / 1000);
  const totalMins = Math.floor(totalTime / 60);
  const totalSecs = totalTime % 60;

  console.log(`\n════════════════════════════════════════════════════`);
  console.log(`  COMPLETED: ${report.totalBattles.toLocaleString()} battles in ${totalMins}m ${totalSecs}s`);
  console.log(`  Teams in pool: ${report.teamRankings.length}`);
  console.log(`  Pokémon tracked: ${report.pokemonRankings.length} (${megaEntries.length} mega forms)`);
  console.log(`  Moves analyzed: ${report.moveRankings.length}`);
  console.log(`  Archetypes ranked: ${report.archetypeRankings.length}`);
  console.log(`════════════════════════════════════════════════════\n`);
}

function buildSimulationData(report: FinalReport) {
  const pokemon: Record<string, {
    id: number; name: string; isMega: boolean;
    elo: number; winRate: number; appearances: number;
    wins: number; losses: number;
    bestPartners: { name: string; winRate: number; games: number }[];
    bestSets: { set: string; winRate: number; games: number }[];
  }> = {};

  for (const p of report.pokemonRankings) {
    const isMega = p.name.includes("Mega ");
    // Build key that distinguishes X/Y/Z mega forms
    let key: string;
    if (!isMega) {
      key = `${p.id}`;
    } else {
      const suffix = p.name.match(/ ([XYZ])$/)?.[1];
      key = suffix ? `${p.id}-mega-${suffix.toLowerCase()}` : `${p.id}-mega`;
    }
    pokemon[key] = {
      id: p.id,
      name: p.name,
      isMega,
      elo: p.elo,
      winRate: p.winRate,
      appearances: p.appearances,
      wins: p.wins,
      losses: p.losses,
      bestPartners: p.bestPartners.slice(0, 5).map(bp => ({
        name: bp.name, winRate: bp.winRate, games: bp.games,
      })),
      bestSets: p.bestSets.slice(0, 3).map(bs => ({
        set: bs.set, winRate: bs.winRate, games: bs.games,
      })),
    };
  }

  const pairs = report.bestPairs.slice(0, 50).map(p => ({
    pokemon1: p.pokemon1,
    pokemon2: p.pokemon2,
    winRate: p.winRate,
    games: p.games,
  }));

  const archetypes = report.archetypeRankings.slice(0, 50).map(a => ({
    name: a.name,
    elo: a.elo,
    winRate: a.winRate,
    wins: a.wins,
    losses: a.losses,
  }));

  const moves = report.moveRankings.slice(0, 50).map(m => ({
    name: m.name,
    winRate: m.winRate,
    appearances: m.appearances,
  }));

  return { pokemon, pairs, archetypes, meta: report.metaSnapshot, moves };
}

main().catch(console.error);
