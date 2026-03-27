/**
 * Final validation: Check all mega sprite URLs against PokeAPI to verify correctness
 */
import fs from 'fs';

const FILE = 'src/lib/pokemon-data.ts';
const data = fs.readFileSync(FILE, 'utf8');

// Extract all mega forms with their sprites
const formRegex = /"name":\s*"(Mega [^"]+)",\s*"sprite":\s*"([^"]+)"/g;
let match;
const megas = [];
while ((match = formRegex.exec(data)) !== null) {
  megas.push({ name: match[1], sprite: match[2] });
}

async function checkName(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (res.status === 200) {
      const d = await res.json();
      return d.name;
    }
    return null;
  } catch { return null; }
}

async function main() {
  console.log(`Found ${megas.length} mega forms\n`);
  console.log('Our Name'.padEnd(24), 'Sprite ID', '  Source     ', 'PokeAPI Name'.padEnd(28), 'Status');
  console.log('-'.repeat(100));
  
  let errors = 0;
  
  for (const m of megas) {
    const idMatch = m.sprite.match(/\/(\d+)\.png/);
    const id = idMatch ? idMatch[1] : '?';
    const source = m.sprite.includes('official-artwork') ? 'artwork' : m.sprite.includes('/home/') ? 'home  ' : 'other ';
    
    // Check if sprite URL returns 200
    const spriteOk = await fetch(m.sprite, { method: 'HEAD' }).then(r => r.status === 200).catch(() => false);
    
    // Check what PokeAPI says this ID is
    const actualName = await checkName(id);
    
    // Determine if the name matches
    const ourBase = m.name.replace('Mega ', '').replace(/ [XYZ]$/, '').toLowerCase();
    const match = actualName && actualName.includes(ourBase) ? '✓ MATCH' : 
                  !actualName ? '? NO API' :
                  `✗ WRONG → ${actualName}`;
    
    const spriteStatus = spriteOk ? '✓' : '✗ 404';
    
    const status = `Sprite: ${spriteStatus}  ID: ${match}`;
    if (!spriteOk || (actualName && !actualName.includes(ourBase))) errors++;
    
    console.log(`${m.name.padEnd(24)} ${id.padStart(6)}    ${source}  ${(actualName || 'N/A').padEnd(28)} ${status}`);
  }
  
  console.log(`\n${errors === 0 ? '✓ All sprites validated!' : `✗ ${errors} issues found`}`);
}

main();
