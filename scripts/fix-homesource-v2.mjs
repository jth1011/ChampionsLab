#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// Fix validated homeSource discrepancies
// Based on PokeAPI validation results
// ═══════════════════════════════════════════════════════════════
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/lib/pokemon-data.ts");

const SV = "Scarlet/Violet";
const ZA = "Legends Z-A";
const SS = "Sword/Shield";
const BD = "BDSP";
const LA = "Legends: Arceus";
const GO = "Pokémon GO";
const LG = "Let's Go";

// ── CORRECTIONS ────────────────────────────────────────────────
// Each entry: id → corrected homeSource array
// Based on cross-referencing PokeAPI pokedex data + HOME transfer lists

const CORRECTIONS = {
  // ── ADD MISSING "Legends: Arceus" (species in Hisui dex) ────
  38:   [SV, ZA, SS, BD, LA, GO, LG],   // Ninetales — Vulpix/Ninetales in Hisui
  59:   [SV, ZA, SS, BD, LA, GO, LG],   // Arcanine — Growlithe/Arcanine in Hisui
  136:  [SV, ZA, SS, BD, LA, GO, LG],   // Flareon — Eevee/Flareon in Hisui
  208:  [SV, ZA, BD, LA, GO],            // Steelix — Onix/Steelix in Hisui + NOT in SV dex, NOT in SWSH
  212:  [SV, ZA, SS, BD, LA, GO],        // Scizor — Scyther/Scizor in Hisui
  214:  [SV, ZA, SS, BD, LA, GO],        // Heracross — in Hisui
  362:  [SV, ZA, SS, BD, LA, GO],        // Glalie — Snorunt/Glalie in Hisui
  395:  [SV, ZA, BD, LA, GO],            // Empoleon — Piplup line in Hisui
  428:  [SV, ZA, SS, BD, LA, GO],        // Lopunny — Buneary/Lopunny in Hisui
  700:  [SV, ZA, SS, LA, GO],            // Sylveon — Eevee/Sylveon in Hisui
  706:  [SV, ZA, SS, LA, GO],            // Goodra — Goomy/Goodra in Hisui

  // ── REMOVE WRONG "Sword/Shield" (NOT in any SWSH dex or HOME transfer) ──
  181:  [SV, ZA, BD, GO],                // Ampharos — NOT in SWSH data
  229:  [SV, ZA, BD, GO],                // Houndoom — NOT in SWSH data
  308:  [SV, ZA, BD, GO],                // Medicham — NOT in SWSH data
  323:  [SV, ZA, BD, GO],                // Camerupt — NOT in SWSH data
  354:  [SV, ZA, BD, GO],                // Banette — NOT in SWSH data
  472:  [SV, ZA, BD, LA, GO],            // Gliscor — NOT in SWSH data, but IS in Hisui (already had LA)

  // ── FIX ALOLAN FORMS: ADD MISSING "Let's Go" ────────────────
  10100: [SV, ZA, SS, GO, LG],           // Alolan Raichu — add LG (Alolan in LGPE)
  10103: [SV, ZA, SS, GO, LG],           // Alolan Ninetales — add LG (Alolan in LGPE)

  // ── FIX HISUIAN DECIDUEYE: WAS EMPTY ────────────────────────
  10341: [SV, ZA, LA, GO],               // Hisuian Decidueye — PLA origin, HOME to SV

  // ── REMOVE WRONG "Pokémon GO" for DLC-exclusive Gen 9 ───────
  1013:  [SV, ZA],                        // Sinistcha — Teal Mask DLC, not in GO
  1018:  [SV, ZA],                        // Archaludon — Indigo Disk DLC, not in GO
  1019:  [SV, ZA],                        // Hydrapple — Indigo Disk DLC, not in GO
};

// ── APPLY CORRECTIONS ──────────────────────────────────────────

function main() {
  let content = fs.readFileSync(DATA_FILE, "utf-8");
  let fixed = 0;
  let errors = [];

  for (const [idStr, sources] of Object.entries(CORRECTIONS)) {
    const id = Number(idStr);
    const idPattern = `"id": ${id},`;
    const idx = content.indexOf(idPattern);

    if (idx === -1) {
      errors.push(`ID ${id} not found`);
      continue;
    }

    // Find the boundary of this entry
    const entryEnd = content.indexOf('\n  },', idx);
    if (entryEnd === -1) {
      errors.push(`ID ${id}: could not find entry end`);
      continue;
    }

    const entry = content.slice(idx, entryEnd + 5);
    const homeSourceJSON = JSON.stringify(sources);

    // Check if homeSource already exists
    const existingHS = entry.match(/"homeSource":\s*\[[\s\S]*?\]/);

    if (existingHS) {
      const fullMatch = existingHS[0];
      const absPos = content.indexOf(fullMatch, idx);
      if (absPos !== -1 && absPos < entryEnd + 10) {
        const before = content.slice(0, absPos);
        const after = content.slice(absPos + fullMatch.length);
        content = before + `"homeSource": ${homeSourceJSON}` + after;
        fixed++;
      }
    } else {
      // Need to add homeSource — find homeCompatible
      const hcIdx = content.indexOf('"homeCompatible":', idx);
      if (hcIdx !== -1 && hcIdx < entryEnd + 10) {
        const hcLineEnd = content.indexOf('\n', hcIdx);
        const insertStr = `\n    "homeSource": ${homeSourceJSON},`;
        content = content.slice(0, hcLineEnd) + insertStr + content.slice(hcLineEnd);
        fixed++;
      } else {
        errors.push(`ID ${id}: could not find insertion point`);
      }
    }
  }

  fs.writeFileSync(DATA_FILE, content, "utf-8");

  console.log("═══════════════════════════════════════════════════");
  console.log("  HOME SOURCE FIX RESULTS");
  console.log("═══════════════════════════════════════════════════");
  console.log(`  Fixed: ${fixed} / ${Object.keys(CORRECTIONS).length}`);
  if (errors.length > 0) {
    console.log(`  Errors: ${errors.length}`);
    errors.forEach((e) => console.log(`    ❌ ${e}`));
  }
  console.log("═══════════════════════════════════════════════════");
}

main();
