import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const content = readFileSync(join(__dirname, '..', 'src/lib/pokemon-data.ts'), 'utf-8');

// Count entries
const ids = [...content.matchAll(/"id":\s*(\d+),/g)].map(m => Number(m[1]));
console.log('Total entries:', ids.length);

// Check regional forms exist as top-level
const regionals = [10100, 10103, 10008, 10009, 10010, 10011, 10012, 10336, 10340, 10341];
for (const id of regionals) {
  console.log('  ID', id, ids.includes(id) ? '✓' : '✗');
}

// Check Victreebel mega
console.log('Victreebel hasMega:', content.includes('"Mega Victreebel"') ? '✓' : '✗');
console.log('Steelix hasMega:', content.includes('"Mega Steelix"') ? '✓' : '✗');

// Check Corrosive Maw ability
console.log('Corrosive Maw ability:', content.includes('Corrosive Maw') ? '✓' : '✗');
console.log('Sand Force ability:', content.includes('Sand Force') ? '✓' : '✗');

// Check no nested regional forms remain in parents
for (const [id, name] of [[38, 'Ninetales'], [479, 'Rotom'], [503, 'Samurott'], [571, 'Zoroark'], [724, 'Decidueye']]) {
  const idx = content.indexOf(`"id": ${id},`);
  const nextEntry = content.indexOf('\n  },\n  {', idx);
  const endOfFile = content.indexOf('\n  }\n]', idx);
  const end = nextEntry !== -1 && (endOfFile === -1 || nextEntry < endOfFile) ? nextEntry : endOfFile;
  const entry = content.slice(idx, end);
  console.log(`  ID ${id} (${name}) has forms[]:`, entry.includes('"forms":') ? '✗ STILL HAS' : '✓ removed');
}

// Check Raichu still has mega forms but no Alolan
const raikuIdx = content.indexOf('"id": 26,');
const raikuEnd = content.indexOf('\n  },\n', raikuIdx);
const raikuEntry = content.slice(raikuIdx, raikuEnd);
console.log('Raichu has forms[]:', raikuEntry.includes('"forms":') ? '✓' : '✗');
console.log('Raichu has Mega Raichu X:', raikuEntry.includes('Mega Raichu X') ? '✓' : '✗');
console.log('Raichu has Mega Raichu Y:', raikuEntry.includes('Mega Raichu Y') ? '✓' : '✗');
console.log('Raichu has Alolan nested:', raikuEntry.includes('Alolan Raichu') ? '✗ STILL HAS' : '✓ removed');

// Helper functions
console.log('Helper funcs:', content.includes('getPokemonBySeason') ? '✓' : '✗');
console.log('STAT_PRESETS:', content.includes('STAT_PRESETS') ? '✓' : '✗');

// Check usage-data.ts
const usage = readFileSync(join(__dirname, '..', 'src/lib/usage-data.ts'), 'utf-8');
for (const id of regionals) {
  console.log(`  Usage ${id}:`, usage.includes(`${id}:`) ? '✓' : '✗');
}
