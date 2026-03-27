/**
 * Fix ALL sprite ID mismatches in pokemon-data.ts
 * 
 * Problem: Many custom megas had wrong form IDs assigned. The PokeAPI official-artwork
 * for those wrong IDs showed the wrong Pokemon (e.g., Mega Scovillain showed Mega Lucario Z).
 * 
 * This script:
 * 1. Corrects form IDs in sprite URLs to the actual PokeAPI IDs
 * 2. Uses official-artwork (since Home sprites don't exist for these)
 * 3. Fixes duplicate ID issues (Aggron/Medicham had wrong IDs)
 * 4. Falls back to base form or regular mega for ones with no artwork
 */
import fs from 'fs';

const FILE = 'src/lib/pokemon-data.ts';
let data = fs.readFileSync(FILE, 'utf8');
let changes = 0;

function fix(description, oldUrl, newUrl) {
  if (data.includes(oldUrl)) {
    data = data.replaceAll(oldUrl, newUrl);
    console.log(`✓ ${description}`);
    changes++;
  } else {
    console.log(`- ${description} (not found, may already be fixed)`);
  }
}

const ART = 'sprites/pokemon/other/official-artwork/';
const HOME = 'sprites/pokemon/other/home/';

// === Fix wrong IDs → correct IDs (using official-artwork since no Home) ===

// Mega Starmie: was 10306 (chimecho-mega) → should be 10280
fix('Mega Starmie 10306→10280',
  ART + '10306.png', ART + '10280.png');

// Mega Clefable: was 10307 (absol-mega-z) → should be 10278
fix('Mega Clefable 10307→10278',
  ART + '10307.png', ART + '10278.png');

// Mega Meowstic: was 10308 (staraptor-mega) → should be 10314
fix('Mega Meowstic 10308→10314',
  ART + '10308.png', ART + '10314.png');

// Mega Scovillain: was 10310 (lucario-mega-z) → should be 10320
fix('Mega Scovillain 10310→10320',
  ART + '10310.png', ART + '10320.png');

// Mega Glimmora: was 10311 (heatran-mega) → should be 10321
fix('Mega Glimmora 10311→10321',
  ART + '10311.png', ART + '10321.png');

// Mega Garchomp Z: was 10313 (golurk-mega) → correct is 10309, but no artwork exists
// Fall back to regular Mega Garchomp artwork (10058)
fix('Mega Garchomp Z 10313→10058 (regular Mega Garchomp, Z has no art)',
  ART + '10313.png', ART + '10058.png');

// Mega Absol Z: was 10314 (meowstic-mega) → should be 10307
// But wait - 10307 is now freed up from Clefable fix above
fix('Mega Absol Z 10314→10307',
  ART + '10314.png', ART + '10307.png');

// Mega Lucario Z: was 10315 (crabominable-mega) → should be 10310
// But 10310 was just freed from Scovillain fix
fix('Mega Lucario Z 10315→10310',
  ART + '10315.png', ART + '10310.png');

// Mega Crabominable: was using base form (740) from prior fix → correct is 10315
fix('Mega Crabominable base→10315',
  HOME + '740.png",' + '\n' + '        "types"', 
  ART + '10315.png",' + '\n' + '        "types"');
// Try alternate patterns too
fix('Mega Crabominable base→10315 (alt pattern)',
  HOME + '740.png",\n            "types"',
  ART + '10315.png",\n            "types"');

// Mega Victreebel: was using base form (71) from prior fix → correct is 10279
fix('Mega Victreebel base→10279',
  HOME + '71.png",\n            "types": [\n                  "grass"',
  ART + '10279.png",\n            "types": [\n                  "grass"');

// === Fix duplicate IDs for real megas ===

// Mega Aggron: was using 10071 (slowbro-mega) → should be 10053
fix('Mega Aggron 10071→10053',
  HOME + '10071.png",\n        "types": ["steel"],',
  HOME + '10053.png",\n        "types": ["steel"],');
// Try with official-artwork too
fix('Mega Aggron (art) 10071→10053',
  ART + '10071.png",\n        "types": ["steel"],',
  HOME + '10053.png",\n        "types": ["steel"],');

// Mega Medicham: was using 10076 (metagross-mega) → should be 10054
fix('Mega Medicham 10076→10054',
  HOME + '10076.png",\n        "types": ["fighting", "psychic"]',
  HOME + '10054.png",\n        "types": ["fighting", "psychic"]');

fs.writeFileSync(FILE, data);
console.log(`\nDone — ${changes} sprite fixes applied`);
