#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// FIX homeSource for ALL 136 Pokémon
// Correct game availability per Pokémon for HOME compatibility
// ═══════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE = join(__dirname, '..', 'src/lib/pokemon-data.ts');

// ── GAME AVAILABILITY DATABASE ─────────────────────────────────
// Sources: Serebii.net, Bulbapedia cross-referenced
// Games: SV = Scarlet/Violet, ZA = Legends Z-A, SS = Sword/Shield,
//        BD = BDSP, LA = Legends: Arceus, GO = Pokémon GO, LG = Let's Go

const SV = "Scarlet/Violet";
const ZA = "Legends Z-A";
const SS = "Sword/Shield";
const BD = "BDSP";
const LA = "Legends: Arceus";
const GO = "Pokémon GO";
const LG = "Let's Go";

// Per-Pokémon homeSource mapping
// Every Pokémon in Z-A gets ZA automatically
const HOME_DATA = {
  // ── GEN 1 ────────────────────────────────────────────────────
  3:     [SV, ZA, SS, BD, GO, LG],   // Venusaur
  6:     [SV, ZA, SS, BD, GO, LG],   // Charizard
  9:     [SV, ZA, SS, BD, GO, LG],   // Blastoise
  15:    [SV, ZA, BD, GO, LG],       // Beedrill (not in SwSh)
  18:    [SV, ZA, BD, GO, LG],       // Pidgeot (not in SwSh)
  25:    [SV, ZA, SS, BD, LA, GO, LG], // Pikachu
  26:    [SV, ZA, SS, BD, LA, GO, LG], // Raichu
  36:    [SV, ZA, SS, BD, LA, GO, LG], // Clefable
  38:    [SV, ZA, SS, BD, GO, LG],   // Ninetales
  59:    [SV, ZA, SS, BD, GO, LG],   // Arcanine
  65:    [SV, ZA, SS, BD, LA, GO, LG], // Alakazam
  71:    [SV, ZA, BD, GO, LG],       // Victreebel (not in SwSh)
  80:    [SV, ZA, SS, BD, GO, LG],   // Slowbro
  94:    [SV, ZA, SS, BD, LA, GO, LG], // Gengar
  115:   [SV, ZA, SS, BD, GO, LG],   // Kangaskhan
  121:   [SV, ZA, SS, BD, GO, LG],   // Starmie
  127:   [SV, ZA, SS, BD, GO, LG],   // Pinsir
  130:   [SV, ZA, SS, BD, LA, GO, LG], // Gyarados
  132:   [SV, ZA, SS, BD, GO, LG],   // Ditto
  136:   [SV, ZA, SS, BD, GO, LG],   // Flareon
  143:   [SV, ZA, SS, BD, LA, GO, LG], // Snorlax

  // ── GEN 2 ────────────────────────────────────────────────────
  149:   [SV, ZA, SS, BD, GO, LG],   // Dragonite (Gen 1 but dex 149)
  154:   [SV, ZA, BD, GO],           // Meganium (not in SwSh)
  160:   [SV, ZA, BD, GO],           // Feraligatr (not in SwSh)
  181:   [SV, ZA, SS, BD, GO],       // Ampharos
  184:   [SV, ZA, SS, BD, GO],       // Azumarill
  186:   [SV, ZA, SS, BD, GO],       // Politoed
  196:   [SV, ZA, SS, BD, LA, GO],   // Espeon
  197:   [SV, ZA, SS, BD, LA, GO],   // Umbreon
  208:   [SV, ZA, SS, BD, GO],       // Steelix
  212:   [SV, ZA, SS, BD, GO],       // Scizor
  214:   [SV, ZA, SS, BD, GO],       // Heracross
  227:   [SV, ZA, SS, BD, GO],       // Skarmory
  229:   [SV, ZA, SS, BD, GO],       // Houndoom
  248:   [SV, ZA, SS, BD, GO],       // Tyranitar

  // ── GEN 3 ────────────────────────────────────────────────────
  279:   [SV, ZA, SS, BD, GO],       // Pelipper
  282:   [SV, ZA, SS, BD, LA, GO],   // Gardevoir
  306:   [SV, ZA, SS, BD, GO],       // Aggron
  308:   [SV, ZA, SS, BD, GO],       // Medicham
  310:   [SV, ZA, SS, BD, GO],       // Manectric
  319:   [SV, ZA, SS, BD, GO],       // Sharpedo
  323:   [SV, ZA, SS, BD, GO],       // Camerupt
  324:   [SV, ZA, SS, BD, GO],       // Torkoal
  334:   [SV, ZA, SS, BD, GO],       // Altaria
  350:   [SV, ZA, SS, BD, GO],       // Milotic
  354:   [SV, ZA, SS, BD, GO],       // Banette
  359:   [SV, ZA, SS, BD, GO],       // Absol
  362:   [SV, ZA, SS, BD, GO],       // Glalie

  // ── GEN 4 ────────────────────────────────────────────────────
  376:   [SV, ZA, SS, BD, GO],       // Metagross
  395:   [SV, ZA, BD, GO],           // Empoleon (not in SwSh)
  428:   [SV, ZA, SS, BD, GO],       // Lopunny
  442:   [SV, ZA, SS, BD, LA, GO],   // Spiritomb
  445:   [SV, ZA, SS, BD, LA, GO],   // Garchomp
  448:   [SV, ZA, SS, BD, LA, GO],   // Lucario
  450:   [SV, ZA, SS, BD, LA, GO],   // Hippowdon
  460:   [SV, ZA, SS, BD, LA, GO],   // Abomasnow
  464:   [SV, ZA, SS, BD, LA, GO],   // Rhyperior
  470:   [SV, ZA, SS, BD, LA, GO],   // Leafeon
  471:   [SV, ZA, SS, BD, LA, GO],   // Glaceon
  472:   [SV, ZA, SS, BD, LA, GO],   // Gliscor
  473:   [SV, ZA, SS, BD, LA, GO],   // Mamoswine
  475:   [SV, ZA, SS, BD, LA, GO],   // Gallade
  478:   [SV, ZA, SS, BD, LA, GO],   // Froslass
  479:   [SV, ZA, SS, BD, LA, GO],   // Rotom

  // ── GEN 5 ────────────────────────────────────────────────────
  497:   [SV, ZA, GO],               // Serperior (not in SwSh or BDSP)
  500:   [SV, ZA, GO],               // Emboar (not in SwSh or BDSP)
  503:   [SV, ZA, LA, GO],           // Samurott (PLA has Hisuian)
  530:   [SV, ZA, SS, GO],           // Excadrill
  531:   [SV, ZA, SS, GO],           // Audino
  547:   [SV, ZA, SS, GO],           // Whimsicott
  553:   [SV, ZA, SS, GO],           // Krookodile
  571:   [SV, ZA, SS, LA, GO],       // Zoroark (PLA has Hisuian)
  587:   [SV, ZA, SS, GO],           // Emolga
  623:   [SV, ZA, SS, GO],           // Golurk
  635:   [SV, ZA, SS, GO],           // Hydreigon

  // ── GEN 6 ────────────────────────────────────────────────────
  652:   [SV, ZA, GO],               // Chesnaught (not in SwSh)
  655:   [SV, ZA, GO],               // Delphox (not in SwSh)
  658:   [SV, ZA, GO],               // Greninja (not in SwSh)
  660:   [SV, ZA, SS, GO],           // Diggersby
  663:   [SV, ZA, SS, GO],           // Talonflame
  670:   [SV, ZA, GO],               // Floette (not in SwSh)
  676:   [SV, ZA, GO],               // Furfrou (not in SwSh)
  678:   [SV, ZA, SS, GO],           // Meowstic
  681:   [SV, ZA, SS, GO],           // Aegislash
  693:   [SV, ZA, SS, GO],           // Clawitzer
  700:   [SV, ZA, SS, GO],           // Sylveon
  701:   [SV, ZA, SS, GO],           // Hawlucha
  706:   [SV, ZA, SS, GO],           // Goodra
  709:   [SV, ZA, SS, GO],           // Trevenant
  713:   [SV, ZA, SS, LA, GO],       // Avalugg (PLA has Hisuian)
  715:   [SV, ZA, SS, GO],           // Noivern

  // ── GEN 7 ────────────────────────────────────────────────────
  724:   [SV, ZA, SS, LA, GO],       // Decidueye (PLA has Hisuian)
  727:   [SV, ZA, SS, GO],           // Incineroar
  740:   [SV, ZA, GO],               // Crabominable (not in SwSh)
  745:   [SV, ZA, SS, GO],           // Lycanroc
  748:   [SV, ZA, SS, GO],           // Toxapex
  750:   [SV, ZA, SS, GO],           // Mudsdale
  763:   [SV, ZA, SS, GO],           // Tsareena
  765:   [SV, ZA, SS, GO],           // Oranguru
  778:   [SV, ZA, SS, GO],           // Mimikyu
  780:   [SV, ZA, SS, GO],           // Drampa
  784:   [SV, ZA, SS, GO],           // Kommo-o

  // ── GEN 8 ────────────────────────────────────────────────────
  823:   [SV, ZA, SS, GO],           // Corviknight
  858:   [SV, ZA, SS, GO],           // Hatterene
  861:   [SV, ZA, SS, GO],           // Grimmsnarl
  867:   [SV, ZA, SS, GO],           // Runerigus
  887:   [SV, ZA, SS, GO],           // Dragapult
  900:   [SV, ZA, LA, GO],           // Kleavor (PLA origin)
  901:   [SV, ZA, LA, GO],           // Ursaluna (PLA origin)
  902:   [SV, ZA, LA, GO],           // Basculegion (PLA origin)
  903:   [SV, ZA, LA, GO],           // Sneasler (PLA origin)

  // ── GEN 9 ────────────────────────────────────────────────────
  908:   [SV, ZA, GO],               // Meowscarada
  923:   [SV, ZA, GO],               // Pawmot
  925:   [SV, ZA, GO],               // Maushold
  934:   [SV, ZA, GO],               // Garganacl
  936:   [SV, ZA, GO],               // Armarouge
  952:   [SV, ZA, GO],               // Scovillain
  959:   [SV, ZA, GO],               // Tinkaton
  964:   [SV, ZA, GO],               // Palafin
  970:   [SV, ZA, GO],               // Glimmora
  977:   [SV, ZA, GO],               // Dondozo
  981:   [SV, ZA, GO],               // Farigiraf
  983:   [SV, ZA, GO],               // Kingambit
  1013:  [SV, ZA, GO],               // Sinistcha
  1018:  [SV, ZA, GO],               // Archaludon
  1019:  [SV, ZA, GO],               // Hydrapple

  // ── REGIONAL FORMS ──────────────────────────────────────────
  10100: [SV, ZA, SS, GO],           // Alolan Raichu
  10103: [SV, ZA, SS, GO],           // Alolan Ninetales
  10008: [SV, ZA, SS, BD, LA, GO],   // Heat Rotom
  10009: [SV, ZA, SS, BD, LA, GO],   // Wash Rotom
  10010: [SV, ZA, SS, BD, LA, GO],   // Frost Rotom
  10011: [SV, ZA, SS, BD, LA, GO],   // Fan Rotom
  10012: [SV, ZA, SS, BD, LA, GO],   // Mow Rotom
  10336: [SV, ZA, LA, GO],           // Hisuian Samurott
  10340: [SV, ZA, LA, GO],           // Hisuian Zoroark
  10341: [SV, ZA, LA, GO],           // Hisuian Decidueye
};

// ── APPLY FIXES ────────────────────────────────────────────────

function main() {
  let content = readFileSync(FILE, 'utf-8');
  let fixed = 0;
  let skipped = 0;
  let errors = [];

  for (const [idStr, sources] of Object.entries(HOME_DATA)) {
    const id = Number(idStr);
    const idPattern = `"id": ${id},`;
    const idx = content.indexOf(idPattern);
    
    if (idx === -1) {
      errors.push(`ID ${id} not found`);
      continue;
    }

    // Find the end of this entry
    const entryEnd = content.indexOf('\n  }', idx);
    if (entryEnd === -1) {
      errors.push(`ID ${id}: could not find entry end`);
      continue;
    }
    
    const entry = content.slice(idx, entryEnd + 4);
    const homeSourceJSON = JSON.stringify(sources);
    
    // Check if homeSource already exists in this entry
    const existingHS = entry.match(/"homeSource":\s*\[[\s\S]*?\]/);
    
    if (existingHS) {
      // Replace existing homeSource
      const fullMatch = existingHS[0];
      const absPos = content.indexOf(fullMatch, idx);
      if (absPos !== -1 && absPos < entryEnd + 10) {
        content = content.slice(0, absPos) + `"homeSource": ${homeSourceJSON}` + content.slice(absPos + fullMatch.length);
        fixed++;
      }
    } else {
      // Need to add homeSource — find homeCompatible or the right place
      const hcIdx = content.indexOf('"homeCompatible":', idx);
      if (hcIdx !== -1 && hcIdx < entryEnd + 10) {
        // Find end of homeCompatible line
        const hcLineEnd = content.indexOf('\n', hcIdx);
        // Insert homeSource after homeCompatible line
        const insertStr = `\n    "homeSource": ${homeSourceJSON},`;
        content = content.slice(0, hcLineEnd) + insertStr + content.slice(hcLineEnd);
        fixed++;
      } else {
        // No homeCompatible found — add both after generation line
        const genIdx = content.indexOf('"generation":', idx);
        if (genIdx !== -1 && genIdx < entryEnd + 10) {
          const genLineEnd = content.indexOf('\n', genIdx);
          const insertStr = `\n    "homeCompatible": true,\n    "homeSource": ${homeSourceJSON},`;
          content = content.slice(0, genLineEnd) + insertStr + content.slice(genLineEnd);
          fixed++;
        } else {
          errors.push(`ID ${id}: could not find insertion point`);
        }
      }
    }
  }

  // Also ensure homeCompatible: true for all entries that now have homeSource
  // Find entries that have homeSource but missing homeCompatible
  const missingHC = [];
  for (const [idStr] of Object.entries(HOME_DATA)) {
    const id = Number(idStr);
    const idPattern = `"id": ${id},`;
    const idPos = content.indexOf(idPattern);
    if (idPos === -1) continue;
    const eEnd = content.indexOf('\n  }', idPos);
    const entrySlice = content.slice(idPos, eEnd);
    if (!entrySlice.includes('"homeCompatible"')) {
      missingHC.push(id);
    }
  }

  writeFileSync(FILE, content, 'utf-8');
  
  console.log("=== HOME SOURCE FIX RESULTS ===");
  console.log(`Fixed: ${fixed} entries`);
  console.log(`Errors: ${errors.length}`);
  if (errors.length > 0) console.log("  " + errors.join("\n  "));
  if (missingHC.length > 0) console.log(`Missing homeCompatible: ${missingHC.join(", ")}`);
  console.log("\nDone!");
}

main();
