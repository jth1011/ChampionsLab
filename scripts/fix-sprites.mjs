/**
 * Fix sprite URLs in pokemon-data.ts:
 * 1. Tatsugiri: wrong path (pixel art) → Home 3D sprite
 * 2. Custom megas with no Home sprites → use official-artwork
 * 3. Mega Crabominable & Mega Victreebel → no sprites anywhere, use base form
 */
import fs from 'fs';

const FILE = 'src/lib/pokemon-data.ts';
let data = fs.readFileSync(FILE, 'utf8');
let changes = 0;

// === 1. Fix Tatsugiri ===
const tatOld1 = '"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/978.png"';
const tatNew1 = '"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/978.png"';
const tatOld2 = '"officialArt": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/978.png"';
const tatNew2 = '"officialArt": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/978.png"';

if (data.includes(tatOld1)) {
  data = data.replace(tatOld1, tatNew1);
  console.log('✓ Fixed Tatsugiri sprite → Home');
  changes++;
}
if (data.includes(tatOld2)) {
  data = data.replace(tatOld2, tatNew2);
  console.log('✓ Fixed Tatsugiri officialArt → Home');
  changes++;
}

// === 2. Custom megas: switch home/{id}.png → official-artwork/{id}.png for IDs that have no Home sprite ===
// These IDs have official-artwork but no Home sprite
const artworkOnlyIds = [
  10281, // Mega Dragonite
  10282, // Mega Meganium
  10283, // Mega Feraligatr
  10284, // Mega Skarmory
  10285, // Mega Froslass
  10286, // Mega Emboar
  10287, // Mega Excadrill
  10292, // Mega Chesnaught
  10293, // Mega Delphox
  10294, // Mega Greninja
  10300, // Mega Hawlucha
  10302, // Mega Drampa
  10304, // Mega Raichu X
  10305, // Mega Raichu Y
  10306, // Mega Starmie
  10307, // Mega Clefable
  10308, // Mega Meowstic
  10310, // Mega Scovillain
  10311, // Mega Glimmora
  10313, // Mega Garchomp Z
  10314, // Mega Absol Z
  10315, // Mega Lucario Z
  10061, // Mega Floette
];

for (const id of artworkOnlyIds) {
  const old = `sprites/pokemon/other/home/${id}.png`;
  const nw = `sprites/pokemon/other/official-artwork/${id}.png`;
  if (data.includes(old)) {
    data = data.replaceAll(old, nw);
    console.log(`✓ Mega ${id}: home → official-artwork`);
    changes++;
  }
}

// === 3. Fully missing sprites: use base Pokemon sprite ===
// Mega Crabominable (10309) → base Crabominable (740)
const crabOld = 'sprites/pokemon/other/home/10309.png';
const crabNew = 'sprites/pokemon/other/home/740.png';
if (data.includes(crabOld)) {
  data = data.replaceAll(crabOld, crabNew);
  console.log('✓ Mega Crabominable (10309): → base form (740)');
  changes++;
}

// Mega Victreebel (10400) → base Victreebel (71)
const vicOld = 'sprites/pokemon/other/home/10400.png';
const vicNew = 'sprites/pokemon/other/home/71.png';
if (data.includes(vicOld)) {
  data = data.replaceAll(vicOld, vicNew);
  console.log('✓ Mega Victreebel (10400): → base form (71)');
  changes++;
}

fs.writeFileSync(FILE, data);
console.log(`\nDone — ${changes} changes applied`);
