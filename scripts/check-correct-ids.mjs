/**
 * Check sprite availability for the correct IDs
 */

const correctIds = [
  { name: 'Mega Starmie', correctId: 10280, baseId: 121 },
  { name: 'Mega Clefable', correctId: 10278, baseId: 36 },
  { name: 'Mega Meowstic', correctId: 10314, baseId: 678 },
  { name: 'Mega Crabominable', correctId: 10315, baseId: 740 },
  { name: 'Mega Scovillain', correctId: 10320, baseId: 952 },
  { name: 'Mega Glimmora', correctId: 10321, baseId: 970 },
  { name: 'Mega Garchomp Z', correctId: 10309, baseId: 445 },
  { name: 'Mega Absol Z', correctId: 10307, baseId: 359 },
  { name: 'Mega Lucario Z', correctId: 10310, baseId: 448 },
  { name: 'Mega Victreebel', correctId: 10279, baseId: 71 },
  { name: 'Mega Aggron', correctId: 10053, baseId: 306 },
  { name: 'Mega Medicham', correctId: 10054, baseId: 308 },
];

const HOME = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/';
const ART = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.status === 200;
  } catch { return false; }
}

async function main() {
  console.log('Name'.padEnd(24), 'ID'.padStart(6), '  Home  Art');
  console.log('-'.repeat(50));
  
  for (const m of correctIds) {
    const [home, art] = await Promise.all([
      checkUrl(HOME + m.correctId + '.png'),
      checkUrl(ART + m.correctId + '.png'),
    ]);
    console.log(`${m.name.padEnd(24)} ${String(m.correctId).padStart(6)}  ${home ? '✓' : '✗'}     ${art ? '✓' : '✗'}`);
  }
}

main();
