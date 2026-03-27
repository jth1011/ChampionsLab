/**
 * Find the correct PokeAPI form IDs for mismatched megas
 */

const toFind = [
  'starmie-mega',
  'clefable-mega', 
  'meowstic-mega',
  'crabominable-mega',
  'scovillain-mega',
  'glimmora-mega',
  'garchomp-mega-z',
  'absol-mega-z',
  'lucario-mega-z',
  'victreebel-mega',
  'aggron-mega',
  'medicham-mega',
];

async function findId(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (res.status === 200) {
      const data = await res.json();
      return { name, id: data.id, found: true };
    }
    return { name, id: null, found: false };
  } catch {
    return { name, id: null, found: false };
  }
}

async function main() {
  console.log('=== Finding correct PokeAPI IDs ===\n');
  for (const name of toFind) {
    const result = await findId(name);
    if (result.found) {
      console.log(`${name.padEnd(25)} → ID: ${result.id}`);
    } else {
      console.log(`${name.padEnd(25)} → NOT FOUND on PokeAPI`);
    }
  }
  
  // Also check which IDs actually belong to the wrong names we found
  console.log('\n=== What IDs are actually used by PokeAPI for these ===');
  const wrongMappings = [
    { ourName: 'Mega Starmie', wrongActual: 'chimecho-mega', wrongId: 10306 },
    { ourName: 'Mega Clefable', wrongActual: 'absol-mega-z', wrongId: 10307 },
    { ourName: 'Mega Meowstic', wrongActual: 'staraptor-mega', wrongId: 10308 },
    { ourName: 'Mega Scovillain', wrongActual: 'lucario-mega-z', wrongId: 10310 },
    { ourName: 'Mega Glimmora', wrongActual: 'heatran-mega', wrongId: 10311 },
    { ourName: 'Mega Garchomp Z', wrongActual: 'golurk-mega', wrongId: 10313 },
    { ourName: 'Mega Absol Z', wrongActual: 'meowstic-mega', wrongId: 10314 },
    { ourName: 'Mega Lucario Z', wrongActual: 'crabominable-mega', wrongId: 10315 },
  ];
  
  for (const m of wrongMappings) {
    console.log(`\nID ${m.wrongId}: We call it "${m.ourName}" but PokeAPI says "${m.wrongActual}"`);
  }
}

main();
