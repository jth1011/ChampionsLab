#!/usr/bin/env node
// Add regional forms and Rotom appliance forms to existing Pokemon

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SPRITE = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

// Regional forms to add to existing Pokemon
const REGIONAL_FORMS = {
  // Raichu (25) → Alolan Raichu
  26: {
    formEntry: {
      name: "Alolan Raichu",
      sprite: SPRITE(10100),
      types: ["electric", "psychic"],
      baseStats: { hp: 60, attack: 85, defense: 50, spAtk: 95, spDef: 85, speed: 110 },
      abilities: [{ name: "Surge Surfer", description: "Doubles Speed on Electric Terrain.", isHidden: false }],
      isMega: false,
    }
  },
  // Ninetales (38) → Alolan Ninetales
  38: {
    formEntry: {
      name: "Alolan Ninetales",
      sprite: SPRITE(10103),
      types: ["ice", "fairy"],
      baseStats: { hp: 73, attack: 67, defense: 75, spAtk: 81, spDef: 100, speed: 109 },
      abilities: [{ name: "Snow Warning", description: "Summons hail/snow when entering battle.", isHidden: false }],
      isMega: false,
    }
  },
  // Rotom (479) → 5 appliance forms
  479: {
    formEntries: [
      {
        name: "Heat Rotom",
        sprite: SPRITE(10008),
        types: ["electric", "fire"],
        baseStats: { hp: 50, attack: 65, defense: 107, spAtk: 105, spDef: 107, speed: 86 },
        abilities: [{ name: "Levitate", description: "Immune to Ground-type moves.", isHidden: false }],
        isMega: false,
      },
      {
        name: "Wash Rotom",
        sprite: SPRITE(10009),
        types: ["electric", "water"],
        baseStats: { hp: 50, attack: 65, defense: 107, spAtk: 105, spDef: 107, speed: 86 },
        abilities: [{ name: "Levitate", description: "Immune to Ground-type moves.", isHidden: false }],
        isMega: false,
      },
      {
        name: "Frost Rotom",
        sprite: SPRITE(10010),
        types: ["electric", "ice"],
        baseStats: { hp: 50, attack: 65, defense: 107, spAtk: 105, spDef: 107, speed: 86 },
        abilities: [{ name: "Levitate", description: "Immune to Ground-type moves.", isHidden: false }],
        isMega: false,
      },
      {
        name: "Fan Rotom",
        sprite: SPRITE(10011),
        types: ["electric", "flying"],
        baseStats: { hp: 50, attack: 65, defense: 107, spAtk: 105, spDef: 107, speed: 86 },
        abilities: [{ name: "Levitate", description: "Immune to Ground-type moves.", isHidden: false }],
        isMega: false,
      },
      {
        name: "Mow Rotom",
        sprite: SPRITE(10012),
        types: ["electric", "grass"],
        baseStats: { hp: 50, attack: 65, defense: 107, spAtk: 105, spDef: 107, speed: 86 },
        abilities: [{ name: "Levitate", description: "Immune to Ground-type moves.", isHidden: false }],
        isMega: false,
      },
    ]
  },
  // Samurott (503) → Hisuian Samurott
  503: {
    formEntry: {
      name: "Hisuian Samurott",
      sprite: SPRITE(10336),
      types: ["water", "dark"],
      baseStats: { hp: 90, attack: 108, defense: 80, spAtk: 100, spDef: 65, speed: 85 },
      abilities: [{ name: "Sharpness", description: "Powers up slicing moves.", isHidden: false }],
      isMega: false,
    }
  },
  // Zoroark (571) → Hisuian Zoroark
  571: {
    formEntry: {
      name: "Hisuian Zoroark",
      sprite: SPRITE(10340),
      types: ["normal", "ghost"],
      baseStats: { hp: 55, attack: 100, defense: 60, spAtk: 125, spDef: 60, speed: 110 },
      abilities: [{ name: "Illusion", description: "Takes on the appearance of the last party member.", isHidden: false }],
      isMega: false,
    }
  },
  // Decidueye (724) → Hisuian Decidueye
  724: {
    formEntry: {
      name: "Hisuian Decidueye",
      sprite: SPRITE(10341),
      types: ["grass", "fighting"],
      baseStats: { hp: 88, attack: 112, defense: 80, spAtk: 95, spDef: 95, speed: 60 },
      abilities: [{ name: "Scrappy", description: "Can hit Ghost types with Normal and Fighting moves.", isHidden: false }],
      isMega: false,
    }
  },
};

function main() {
  const pdPath = join(ROOT, 'src/lib/pokemon-data.ts');
  let content = readFileSync(pdPath, 'utf-8');
  let count = 0;

  for (const [idStr, data] of Object.entries(REGIONAL_FORMS)) {
    const id = Number(idStr);
    const forms = data.formEntries || [data.formEntry];

    // Find the Pokemon entry by searching for its "id": <id> pattern
    const idPattern = `"id": ${id},`;
    const idIdx = content.indexOf(idPattern);
    if (idIdx === -1) {
      console.log(`⚠ Could not find Pokemon id ${id}`);
      continue;
    }

    // Check if this Pokemon already has a forms array
    // Search forward from idIdx for "forms": [ or "hasMega":
    const entryEnd = content.indexOf('\n  }', idIdx);
    const excerpt = content.slice(idIdx, entryEnd);
    const formsIdx = excerpt.indexOf('"forms":');

    if (formsIdx !== -1) {
      // Has existing forms — insert before the closing ] of forms
      const formsStart = idIdx + formsIdx;
      const formsArrayStart = content.indexOf('[', formsStart);
      // Find matching ]
      let depth = 0;
      let formsArrayEnd = formsArrayStart;
      for (let i = formsArrayStart; i < content.length; i++) {
        if (content[i] === '[') depth++;
        if (content[i] === ']') { depth--; if (depth === 0) { formsArrayEnd = i; break; } }
      }
      // Insert before the closing ]
      const newForms = forms.map(f => JSON.stringify(f, null, 6).replace(/^/gm, '          ').trimStart());
      const insert = ',\n' + newForms.map(f => '          ' + f).join(',\n');
      content = content.slice(0, formsArrayEnd) + insert + '\n    ' + content.slice(formsArrayEnd);
      count += forms.length;
      console.log(`✓ Added ${forms.length} form(s) to existing forms[] of id ${id}`);
    } else {
      // No forms array — need to insert one before "hasMega"
      // Find "hasMega" or "recruitmentCost" after the idIdx
      const hasMegaSearch = content.indexOf('"hasMega"', idIdx);
      const genSearch = content.indexOf('"generation"', idIdx);
      const insertPoint = hasMegaSearch !== -1 && hasMegaSearch < entryEnd ? hasMegaSearch : -1;

      if (insertPoint === -1) {
        // Insert after "generation" line
        const genLine = content.indexOf('\n', genSearch);
        const formsJson = forms.map(f => JSON.stringify(f, null, 6).replace(/^/gm, '          ').trimStart());
        const formsArray = `    "forms": [\n${formsJson.map(f => '          ' + f).join(',\n')}\n    ],\n`;
        content = content.slice(0, genLine + 1) + formsArray + content.slice(genLine + 1);
        count += forms.length;
        console.log(`✓ Added forms[] with ${forms.length} form(s) to id ${id} (after generation)`);
      } else {
        const formsJson = forms.map(f => JSON.stringify(f, null, 6).replace(/^/gm, '          ').trimStart());
        const formsArray = `"forms": [\n${formsJson.map(f => '          ' + f).join(',\n')}\n    ],\n    `;
        content = content.slice(0, insertPoint) + formsArray + content.slice(insertPoint);
        count += forms.length;
        console.log(`✓ Added forms[] with ${forms.length} form(s) to id ${id} (before hasMega)`);
      }
    }
  }

  writeFileSync(pdPath, content, 'utf-8');
  console.log(`\n=== Added ${count} regional/appliance forms total ===`);
}

main();
