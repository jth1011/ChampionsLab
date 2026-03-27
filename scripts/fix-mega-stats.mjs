// Auto-fix all mega stat discrepancies in pokemon-data.ts
import { readFileSync, writeFileSync } from "fs";

const FIXES = [
  { name: "Mega Clefable",      old: { hp: 95, attack: 70, defense: 103, spAtk: 135, spDef: 110, speed: 70 },
                                  fix: { hp: 95, attack: 80, defense: 93, spAtk: 135, spDef: 110, speed: 70 } },
  { name: "Mega Victreebel",    old: { hp: 80, attack: 145, defense: 75, spAtk: 130, spDef: 80, speed: 80 },
                                  fix: { hp: 80, attack: 125, defense: 85, spAtk: 135, spDef: 95, speed: 70 } },
  { name: "Mega Starmie",       old: { hp: 60, attack: 75, defense: 105, spAtk: 140, spDef: 105, speed: 135 },
                                  fix: { hp: 60, attack: 140, defense: 105, spAtk: 130, spDef: 105, speed: 120 } },
  { name: "Mega Dragonite",     old: { hp: 91, attack: 164, defense: 115, spAtk: 110, spDef: 120, speed: 100 },
                                  fix: { hp: 91, attack: 124, defense: 115, spAtk: 145, spDef: 125, speed: 100 } },
  { name: "Mega Meganium",      old: { hp: 80, attack: 92, defense: 130, spAtk: 103, spDef: 130, speed: 90 },
                                  fix: { hp: 80, attack: 92, defense: 115, spAtk: 143, spDef: 115, speed: 80 } },
  { name: "Mega Feraligatr",    old: { hp: 85, attack: 135, defense: 120, spAtk: 89, spDef: 103, speed: 98 },
                                  fix: { hp: 85, attack: 160, defense: 125, spAtk: 89, spDef: 93, speed: 78 } },
  { name: "Mega Skarmory",      old: { hp: 65, attack: 110, defense: 170, spAtk: 50, spDef: 100, speed: 100 },
                                  fix: { hp: 65, attack: 140, defense: 110, spAtk: 40, spDef: 100, speed: 110 } },
  { name: "Mega Emboar",        old: { hp: 110, attack: 158, defense: 85, spAtk: 110, spDef: 85, speed: 80 },
                                  fix: { hp: 110, attack: 148, defense: 75, spAtk: 110, spDef: 110, speed: 75 } },
  { name: "Mega Excadrill",     old: { hp: 110, attack: 165, defense: 80, spAtk: 55, spDef: 85, speed: 113 },
                                  fix: { hp: 110, attack: 165, defense: 100, spAtk: 65, spDef: 65, speed: 103 } },
  { name: "Mega Chesnaught",    old: { hp: 88, attack: 137, defense: 152, spAtk: 74, spDef: 100, speed: 79 },
                                  fix: { hp: 88, attack: 137, defense: 172, spAtk: 74, spDef: 115, speed: 44 } },
  { name: "Mega Delphox",       old: { hp: 75, attack: 69, defense: 82, spAtk: 154, spDef: 120, speed: 134 },
                                  fix: { hp: 75, attack: 69, defense: 72, spAtk: 159, spDef: 125, speed: 134 } },
  { name: "Mega Hawlucha",      old: { hp: 78, attack: 122, defense: 95, spAtk: 84, spDef: 78, speed: 143 },
                                  fix: { hp: 78, attack: 137, defense: 100, spAtk: 74, spDef: 93, speed: 118 } },
  { name: "Mega Drampa",        old: { hp: 78, attack: 80, defense: 105, spAtk: 170, spDef: 111, speed: 41 },
                                  fix: { hp: 78, attack: 85, defense: 110, spAtk: 160, spDef: 116, speed: 36 } },
  { name: "Mega Raichu X",      old: { hp: 60, attack: 135, defense: 75, spAtk: 90, spDef: 80, speed: 145 },
                                  fix: { hp: 60, attack: 135, defense: 95, spAtk: 90, spDef: 95, speed: 110 } },
  { name: "Mega Raichu Y",      old: { hp: 60, attack: 90, defense: 70, spAtk: 140, spDef: 95, speed: 130 },
                                  fix: { hp: 60, attack: 100, defense: 55, spAtk: 160, spDef: 80, speed: 130 } },
  { name: "Mega Absol Z",       old: { hp: 65, attack: 140, defense: 65, spAtk: 130, spDef: 65, speed: 100 },
                                  fix: { hp: 65, attack: 150, defense: 60, spAtk: 115, spDef: 60, speed: 115 } },
  { name: "Mega Garchomp Z",    old: { hp: 108, attack: 150, defense: 105, spAtk: 140, spDef: 95, speed: 102 },
                                  fix: { hp: 108, attack: 170, defense: 115, spAtk: 120, spDef: 95, speed: 92 } },
  { name: "Mega Lucario Z",     old: { hp: 70, attack: 155, defense: 78, spAtk: 130, spDef: 80, speed: 112 },
                                  fix: { hp: 70, attack: 145, defense: 88, spAtk: 140, spDef: 70, speed: 112 } },
  { name: "Mega Meowstic",      old: { hp: 74, attack: 48, defense: 96, spAtk: 133, spDef: 101, speed: 114 },
                                  fix: { hp: 74, attack: 48, defense: 76, spAtk: 143, spDef: 101, speed: 124 } },
  { name: "Mega Crabominable",  old: { hp: 97, attack: 172, defense: 97, spAtk: 62, spDef: 87, speed: 63 },
                                  fix: { hp: 97, attack: 157, defense: 122, spAtk: 62, spDef: 107, speed: 33 } },
  { name: "Mega Scovillain",    old: { hp: 65, attack: 138, defense: 75, spAtk: 138, spDef: 75, speed: 95 },
                                  fix: { hp: 65, attack: 138, defense: 85, spAtk: 138, spDef: 85, speed: 75 } },
  { name: "Mega Glimmora",      old: { hp: 83, attack: 55, defense: 110, spAtk: 170, spDef: 91, speed: 116 },
                                  fix: { hp: 83, attack: 90, defense: 105, spAtk: 150, spDef: 96, speed: 101 } },
  { name: "Mega Tatsugiri",     old: { hp: 68, attack: 50, defense: 80, spAtk: 160, spDef: 115, speed: 102 },
                                  fix: { hp: 68, attack: 65, defense: 90, spAtk: 135, spDef: 125, speed: 92 } },
];

let data = readFileSync("src/lib/pokemon-data.ts", "utf-8");
let fixCount = 0;

for (const { name, old, fix } of FIXES) {
  const oldStr = `"hp": ${old.hp},\n          "attack": ${old.attack},\n          "defense": ${old.defense},\n          "spAtk": ${old.spAtk},\n          "spDef": ${old.spDef},\n          "speed": ${old.speed}`;
  const newStr = `"hp": ${fix.hp},\n          "attack": ${fix.attack},\n          "defense": ${fix.defense},\n          "spAtk": ${fix.spAtk},\n          "spDef": ${fix.spDef},\n          "speed": ${fix.speed}`;
  
  if (data.includes(oldStr)) {
    data = data.replace(oldStr, newStr);
    console.log(`✅ Fixed ${name}`);
    fixCount++;
  } else {
    console.log(`⚠️  Could not find exact stat block for ${name}, trying flexible match...`);
    // Try to find and replace near the mega name
    const nameIdx = data.indexOf(`"name": "${name}"`);
    if (nameIdx === -1) {
      console.log(`  ❌ Could not find ${name} in data at all!`);
      continue;
    }
    // Find the baseStats block after this name
    const statsStart = data.indexOf('"baseStats":', nameIdx);
    if (statsStart === -1 || statsStart - nameIdx > 500) {
      console.log(`  ❌ Could not find baseStats near ${name}`);  
      continue;
    }
    const blockStart = data.indexOf('{', statsStart);
    const blockEnd = data.indexOf('}', blockStart);
    const existingBlock = data.substring(blockStart, blockEnd + 1);
    const newBlock = `{\n          "hp": ${fix.hp},\n          "attack": ${fix.attack},\n          "defense": ${fix.defense},\n          "spAtk": ${fix.spAtk},\n          "spDef": ${fix.spDef},\n          "speed": ${fix.speed}\n        }`;
    data = data.substring(0, blockStart) + newBlock + data.substring(blockEnd + 1);
    console.log(`✅ Fixed ${name} (flexible match)`);
    fixCount++;
  }
}

writeFileSync("src/lib/pokemon-data.ts", data);
console.log(`\n🎯 Fixed ${fixCount}/${FIXES.length} megas`);
