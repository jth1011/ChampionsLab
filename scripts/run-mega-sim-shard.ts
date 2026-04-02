// Runs one shard of mega-aware ML simulation and writes a shard report JSON file.

import { runMLSimulation, type FinalReport } from "../src/lib/engine/ml-runner";
import fs from "fs";
import path from "path";

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

async function main() {
  const shardId = parseIntArg("shard", 1);
  const maxBattles = parseIntArg("battles", 100000);
  const durationMs = parseIntArg("duration", 86_400_000);
  const batchSize = parseIntArg("batch", 100);
  const iterationsPerBattle = parseIntArg("iters", 7);
  const outPath = parseArg("out");

  if (!outPath) {
    throw new Error("Missing required --out <path> argument");
  }

  console.log(`Starting shard ${shardId}: ${maxBattles.toLocaleString()} battles`);

  const report: FinalReport = await runMLSimulation({
    durationMs,
    maxBattles,
    batchSize,
    iterationsPerBattle,
  });

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report), "utf-8");

  console.log(
    `Shard ${shardId} complete: ${report.totalBattles.toLocaleString()} battles, ` +
    `${report.battlesPerSecond.toFixed(1)} battles/s, output=${outPath}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
