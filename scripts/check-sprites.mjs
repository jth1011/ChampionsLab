const ids = [
  // Known real PokeAPI megas
  {name: 'Mega Venusaur', id: 10033},
  {name: 'Mega Charizard X', id: 10034},
  {name: 'Mega Gengar', id: 10038},
  // Champions Lab custom megas
  {name: 'Mega Dragonite', id: 10281},
  {name: 'Mega Meganium', id: 10282},
  {name: 'Mega Feraligatr', id: 10283},
  {name: 'Mega Skarmory', id: 10284},
  {name: 'Mega Froslass', id: 10285},
  {name: 'Mega Emboar', id: 10286},
  {name: 'Mega Excadrill', id: 10287},
  {name: 'Mega Chesnaught', id: 10292},
  {name: 'Mega Delphox', id: 10293},
  {name: 'Mega Greninja', id: 10294},
  {name: 'Mega Hawlucha', id: 10300},
  {name: 'Mega Drampa', id: 10302},
  {name: 'Mega Raichu X', id: 10304},
  {name: 'Mega Raichu Y', id: 10305},
  {name: 'Mega Starmie', id: 10306},
  {name: 'Mega Clefable', id: 10307},
  {name: 'Mega Meowstic', id: 10308},
  {name: 'Mega Crabominable', id: 10309},
  {name: 'Mega Scovillain', id: 10310},
  {name: 'Mega Glimmora', id: 10311},
  {name: 'Mega Garchomp Z', id: 10313},
  {name: 'Mega Absol Z', id: 10314},
  {name: 'Mega Lucario Z', id: 10315},
  {name: 'Mega Victreebel', id: 10400},
  {name: 'Mega Floette', id: 10061},
  // Tatsugiri Home sprite
  {name: 'Tatsugiri (Home)', id: 978},
  // Also check showdown sprites as alternative
];

const HOME = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/';
const ART = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
const FRONT = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const SHOWDOWN = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/';

async function checkUrl(url) {
  try {
    const res = await fetch(url, {method: 'HEAD'});
    return res.status === 200;
  } catch { return false; }
}

async function check() {
  console.log('=== Checking all sprite sources ===\n');
  console.log('Name'.padEnd(22), 'ID'.padStart(6), '  Home  ', 'Art   ', 'Front ', 'Showdn');
  console.log('-'.repeat(70));
  
  for (const {name, id} of ids) {
    const [home, art, front, sd] = await Promise.all([
      checkUrl(HOME + id + '.png'),
      checkUrl(ART + id + '.png'),
      checkUrl(FRONT + id + '.png'),
      checkUrl(SHOWDOWN + id + '.gif'),
    ]);
    console.log(
      `${name.padEnd(22)} ${String(id).padStart(6)}  ${home ? '✓' : '✗'}     ${art ? '✓' : '✗'}     ${front ? '✓' : '✗'}     ${sd ? '✓' : '✗'}`
    );
  }
}

check();
