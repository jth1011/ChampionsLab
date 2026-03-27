// scripts/audit-core-pairs.cjs
// Find CORE_PAIRS entries referencing Pokémon not in the roster
const fs = require('fs');

const pd = fs.readFileSync('src/lib/pokemon-data.ts', 'utf8');
const rosterIds = new Set([...pd.matchAll(/"id":\s*(\d+)/g)].map(m => Number(m[1])));

const vgc = fs.readFileSync('src/lib/engine/vgc-data.ts', 'utf8');

// Extract CORE_PAIRS entries
const pairMatches = [...vgc.matchAll(/pokemon1:\s*(\d+),\s*pokemon2:\s*(\d+),\s*name:\s*"([^"]+)"/g)];

console.log(`Roster has ${rosterIds.size} Pokémon IDs`);
console.log(`Found ${pairMatches.length} core pairs`);
console.log('');

let issues = 0;
for (const m of pairMatches) {
  const p1 = Number(m[1]);
  const p2 = Number(m[2]);
  const name = m[3];
  const p1ok = rosterIds.has(p1);
  const p2ok = rosterIds.has(p2);
  if (!p1ok || !p2ok) {
    const bad = [];
    if (!p1ok) bad.push(`ID ${p1}`);
    if (!p2ok) bad.push(`ID ${p2}`);
    console.log(`BAD: "${name}" — ${bad.join(' and ')} not in roster`);
    issues++;
  }
}

if (issues === 0) {
  console.log('All core pair Pokémon are in the roster.');
} else {
  console.log(`\n${issues} core pairs reference non-roster Pokémon`);
}

// Also check ML_BEST_CORES from meta page
const meta = fs.readFileSync('src/app/meta/page.tsx', 'utf8');
const mlCores = [...meta.matchAll(/pair:\s*\["([^"]+)",\s*"([^"]+)"\]/g)];
console.log(`\nML Best Cores (${mlCores.length} pairs):`);
for (const m of mlCores) {
  console.log(`  ${m[1]} + ${m[2]}`);
}
