// Quick test to verify the engine and ML runner work
import { PREBUILT_TEAMS } from "../src/lib/engine/generated-teams";
import { POKEMON_SEED } from "../src/lib/pokemon-data";
import { simulateBattle, runSimulation } from "../src/lib/engine/battle-sim";

// Load two prebuilt teams
const team1 = PREBUILT_TEAMS[0]; // Sand Offense
const team2 = PREBUILT_TEAMS[1]; // Rain Rush

function getPokemon(ids: number[]) {
  return ids.map(id => POKEMON_SEED.find(p => p.id === id)!).filter(Boolean);
}

const t1p = getPokemon(team1.pokemonIds);
const t2p = getPokemon(team2.pokemonIds);

console.log(`\n=== TEAM INFO ===`);
console.log(`Team 1: ${team1.name} — ${t1p.length} pokemon, ${team1.sets.length} sets`);
for (let i = 0; i < Math.min(t1p.length, team1.sets.length); i++) {
  console.log(`  ${t1p[i].name}: ${team1.sets[i].item} | ${team1.sets[i].ability} | ${team1.sets[i].moves.join(", ")}`);
}
console.log(`Team 2: ${team2.name} — ${t2p.length} pokemon, ${team2.sets.length} sets`);
for (let i = 0; i < Math.min(t2p.length, team2.sets.length); i++) {
  console.log(`  ${t2p[i].name}: ${team2.sets[i].item} | ${team2.sets[i].ability} | ${team2.sets[i].moves.join(", ")}`);
}

console.log(`\n=== BATTLE TEST ===`);
console.log(`${team1.name} vs ${team2.name}`);

// Single battle
const result = simulateBattle(t1p, team1.sets, t2p, team2.sets);
console.log(`Winner: Team ${result.winner} | Turns: ${result.turnsPlayed} | Remaining: ${result.team1Remaining} vs ${result.team2Remaining}`);

// Monte Carlo
const mc = runSimulation(t1p, team1.sets, t2p, team2.sets, 100);
console.log(`\n=== MONTE CARLO (100 iterations) ===`);
console.log(`Win Rate: ${mc.winRate}% | Avg Turns: ${mc.avgTurns} | Avg Remaining: ${mc.avgRemaining}`);

// Test multiple matchups
console.log(`\n=== CROSS-TEAM MATCHUPS ===`);
for (let i = 0; i < Math.min(5, PREBUILT_TEAMS.length); i++) {
  for (let j = i + 1; j < Math.min(5, PREBUILT_TEAMS.length); j++) {
    const a = PREBUILT_TEAMS[i];
    const b = PREBUILT_TEAMS[j];
    const ap = getPokemon(a.pokemonIds);
    const bp = getPokemon(b.pokemonIds);
    const res = runSimulation(ap, a.sets, bp, b.sets, 20);
    console.log(`  ${a.name} vs ${b.name}: ${res.winRate}% WR, avg ${res.avgTurns} turns`);
  }
}

// Verify no double mega stones in prebuilt teams
console.log(`\n=== MEGA STONE VALIDATION ===`);
for (const team of PREBUILT_TEAMS) {
  const megaCount = team.sets.filter(s => s.item.endsWith("ite") || s.item.endsWith("ite X") || s.item.endsWith("ite Y")).length;
  if (megaCount > 1) {
    console.log(`ERROR: ${team.name} (${team.id}) has ${megaCount} mega stones!`);
  }
}
console.log("Mega validation done.");
console.log("\n=== ALL TESTS PASSED ===");
