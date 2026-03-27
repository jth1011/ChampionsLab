import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const c = readFileSync(join(__dirname, '..', 'src/lib/pokemon-data.ts'), 'utf-8');

// Extract all pokemon entries with their homeSource
const re = /"id":\s*(\d+),\s*\n\s*"name":\s*"([^"]+)"/g;
let m;
const pokemons = [];
while ((m = re.exec(c)) !== null) {
  const id = Number(m[1]);
  const name = m[2];
  const after = c.slice(m.index, m.index + 3000);
  const hsMatch = after.match(/"homeSource":\s*(\[[^\]]*\])/);
  const hs = hsMatch ? hsMatch[1] : 'MISSING';
  pokemons.push({ id, name, homeSource: hs });
}

// Show all unique homeSource patterns
const patterns = new Map();
for (const p of pokemons) {
  if (!patterns.has(p.homeSource)) patterns.set(p.homeSource, []);
  patterns.get(p.homeSource).push(`${p.name} (${p.id})`);
}

for (const [pattern, names] of patterns.entries()) {
  console.log(`\n=== ${pattern} ===`);
  console.log(`Count: ${names.length}`);
  console.log(`Pokemon: ${names.join(', ')}`);
}

console.log(`\n\nTOTAL: ${pokemons.length} entries`);
