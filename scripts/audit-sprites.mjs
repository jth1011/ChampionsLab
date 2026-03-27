/**
 * Check what PokeAPI actually has at each custom mega form ID
 * by fetching the official-artwork and checking the PokeAPI species endpoint
 */

// All custom mega IDs used in our data
const customMegas = [
  { name: 'Mega Dragonite', formId: 10281, baseId: 149 },
  { name: 'Mega Meganium', formId: 10282, baseId: 154 },
  { name: 'Mega Feraligatr', formId: 10283, baseId: 160 },
  { name: 'Mega Skarmory', formId: 10284, baseId: 227 },
  { name: 'Mega Froslass', formId: 10285, baseId: 478 },
  { name: 'Mega Emboar', formId: 10286, baseId: 500 },
  { name: 'Mega Excadrill', formId: 10287, baseId: 530 },
  { name: 'Mega Chesnaught', formId: 10292, baseId: 652 },
  { name: 'Mega Delphox', formId: 10293, baseId: 655 },
  { name: 'Mega Greninja', formId: 10294, baseId: 658 },
  { name: 'Mega Hawlucha', formId: 10300, baseId: 701 },
  { name: 'Mega Drampa', formId: 10302, baseId: 780 },
  { name: 'Mega Raichu X', formId: 10304, baseId: 26 },
  { name: 'Mega Raichu Y', formId: 10305, baseId: 26 },
  { name: 'Mega Starmie', formId: 10306, baseId: 121 },
  { name: 'Mega Clefable', formId: 10307, baseId: 36 },
  { name: 'Mega Meowstic', formId: 10308, baseId: 678 },
  { name: 'Mega Crabominable', formId: 10309, baseId: 740 },
  { name: 'Mega Scovillain', formId: 10310, baseId: 952 },
  { name: 'Mega Glimmora', formId: 10311, baseId: 970 },
  { name: 'Mega Garchomp Z', formId: 10313, baseId: 445 },
  { name: 'Mega Absol Z', formId: 10314, baseId: 359 },
  { name: 'Mega Lucario Z', formId: 10315, baseId: 448 },
  { name: 'Mega Victreebel', formId: 10400, baseId: 71 },
  { name: 'Mega Floette', formId: 10061, baseId: 669 },
];

// Also check real megas that should have correct IDs
const realMegas = [
  { name: 'Mega Slowbro', formId: 10071 },
  { name: 'Mega Aggron', formId: 10071 },  // DUPLICATE ID!
  { name: 'Mega Metagross', formId: 10076 },
  { name: 'Mega Medicham', formId: 10076 },  // DUPLICATE ID!
];

async function checkId(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      return data.name; // e.g. "lucario-mega", "charizard-mega-x"
    }
    return 'NOT FOUND';
  } catch {
    return 'ERROR';
  }
}

async function main() {
  console.log('=== Checking what PokeAPI actually has at each form ID ===\n');
  console.log('Our Name'.padEnd(24), 'ID'.padStart(6), '  PokeAPI Actual Name');
  console.log('-'.repeat(70));

  for (const m of customMegas) {
    const actual = await checkId(m.formId);
    const match = actual.toLowerCase().includes(m.name.toLowerCase().split(' ')[1]) ? '✓' : '✗ WRONG!';
    console.log(`${m.name.padEnd(24)} ${String(m.formId).padStart(6)}  ${actual.padEnd(30)} ${match}`);
  }

  console.log('\n=== Also checking real megas for duplicates ===\n');
  for (const m of realMegas) {
    const actual = await checkId(m.formId);
    const match = actual.toLowerCase().includes(m.name.toLowerCase().split(' ')[1]) ? '✓' : '✗ WRONG!';
    console.log(`${m.name.padEnd(24)} ${String(m.formId).padStart(6)}  ${actual.padEnd(30)} ${match}`);
  }
}

main();
