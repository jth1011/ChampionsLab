#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// Validate homeSource data against PokeAPI Pokédex endpoints
// Cross-references each Pokémon's listed games with actual dex data
// ═══════════════════════════════════════════════════════════════
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/lib/pokemon-data.ts");

async function fetchDex(name, id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokedex/${id}/`);
  const data = await res.json();
  const ids = new Set();
  for (const entry of data.pokemon_entries || []) {
    const sid = parseInt(entry.pokemon_species.url.split("/").filter(Boolean).pop());
    if (!isNaN(sid)) ids.add(sid);
  }
  console.log(`  ${name}: ${ids.size} Pokémon`);
  return ids;
}

// Form ID → base species ID
const FORM_SPECIES = {
  10100: 26, 10103: 38,
  10008: 479, 10009: 479, 10010: 479, 10011: 479, 10012: 479,
  10336: 503, 10340: 571, 10341: 724,
};

const HISUIAN_FORMS = new Set([10336, 10340, 10341]);
const ALOLAN_FORMS = new Set([10100, 10103]);
const ROTOM_FORMS = new Set([10008, 10009, 10010, 10011, 10012]);

async function main() {
  console.log("Fetching Pokédex data from PokeAPI...\n");

  const [lgpe, galar, armor, tundra, hisui, paldea, kitakami, blueberry] =
    await Promise.all([
      fetchDex("LGPE (updated-kanto)", 26),
      fetchDex("Galar", 27),
      fetchDex("Isle of Armor", 28),
      fetchDex("Crown Tundra", 29),
      fetchDex("Hisui", 30),
      fetchDex("Paldea", 31),
      fetchDex("Kitakami", 32),
      fetchDex("Blueberry", 33),
    ]);

  const swsh = new Set([...galar, ...armor, ...tundra]);
  const sv   = new Set([...paldea, ...kitakami, ...blueberry]);

  console.log(`\n  SV combined (Paldea+Kitakami+Blueberry): ${sv.size}`);
  console.log(`  SWSH combined (Galar+IoA+CT): ${swsh.size}\n`);

  // Read current pokemon-data.ts
  const content = fs.readFileSync(DATA_FILE, "utf-8");

  // Extract all Pokémon with their homeSource
  const entries = [];
  const idRegex = /"id":\s*(\d+),\s*\n\s*"name":\s*"([^"]+)"/g;
  let m;
  while ((m = idRegex.exec(content)) !== null) {
    const id = parseInt(m[1]);
    const name = m[2];
    const start = m.index;
    const end = content.indexOf("\n  },", start);
    const slice = content.slice(start, end > start ? end + 5 : start + 6000);

    const hsM = slice.match(/"homeSource":\s*\[([^\]]*)\]/);
    const current = hsM
      ? hsM[1].split(",").map((s) => s.trim().replace(/"/g, "")).filter(Boolean)
      : [];

    entries.push({ id, name, current });
  }

  console.log(`Validating ${entries.length} Pokémon...\n`);

  // ── Build expected homeSource for each Pokémon ────────────────
  let issues = 0;
  const report = [];

  for (const { id, name, current } of entries) {
    const sid = FORM_SPECIES[id] || id;
    const isForm    = id >= 10000;
    const isHisuian = HISUIAN_FORMS.has(id);
    const isAlolan  = ALOLAN_FORMS.has(id);
    const isRotom   = ROTOM_FORMS.has(id);

    const problems = [];

    // ── SV (regional dex check) ──
    const inSVDex = sv.has(sid);
    const hasSV   = current.includes("Scarlet/Violet");
    if (hasSV && !inSVDex) {
      problems.push(`SV listed but species #${sid} NOT in SV regional dex`);
    }
    if (!hasSV && inSVDex && !isHisuian) {
      problems.push(`SV MISSING — species #${sid} IS in SV dex`);
    }

    // ── SWSH ──
    const inSWSH = swsh.has(sid);
    const hasSS  = current.includes("Sword/Shield");
    if (hasSS && !inSWSH && !isAlolan) {
      // Alolan forms can be in SWSH via HOME even if base species isn't flagged
      problems.push(`SS listed but species #${sid} NOT in SWSH dex`);
    }
    if (!hasSS && inSWSH && !isHisuian) {
      problems.push(`SS MISSING — species #${sid} IS in SWSH dex`);
    }

    // ── BDSP (Gen 1-4 national dex, #1–493) ──
    const inBDSP = sid <= 493 && (!isForm || isRotom);
    const hasBD  = current.includes("BDSP");
    if (hasBD && !inBDSP) {
      problems.push(`BD listed but species #${sid} should NOT be in BDSP`);
    }
    if (!hasBD && inBDSP) {
      problems.push(`BD MISSING — species #${sid} ≤ 493, should be in BDSP`);
    }

    // ── Legends: Arceus ──
    const inPLA = hisui.has(sid);
    const hasLA = current.includes("Legends: Arceus");
    if (hasLA && !inPLA && !isHisuian) {
      problems.push(`LA listed but species #${sid} NOT in Hisui dex`);
    }
    if (!hasLA && (inPLA || isHisuian)) {
      problems.push(`LA MISSING — species #${sid} IS in Hisui dex`);
    }

    // ── Let's Go ──
    const inLGPE = lgpe.has(sid) && (!isForm || isAlolan);
    const hasLG  = current.includes("Let's Go");
    if (hasLG && !inLGPE) {
      problems.push(`LG listed but species #${sid} NOT in LGPE dex`);
    }
    if (!hasLG && inLGPE) {
      problems.push(`LG MISSING — species #${sid} IS in LGPE dex`);
    }

    // ── Pokémon GO (Gen 1–8 mostly, Gen 9 partial) ──
    const hasGO = current.includes("Pokémon GO");
    if (hasGO && sid > 905 && !isForm) {
      problems.push(`GO listed for Gen 9 species #${sid} — needs manual verification`);
    }

    // ── Legends Z-A — design choice, just note if missing ──
    const hasZA = current.includes("Legends Z-A");
    if (!hasZA) {
      problems.push(`ZA MISSING (all roster Pokémon should have ZA)`);
    }

    if (problems.length > 0) {
      issues++;
      report.push({ id, name, current, problems });
    }
  }

  // ── Print report ─────────────────────────────────────────────
  if (report.length > 0) {
    console.log("══════════════════════════════════════════════════");
    console.log("  DISCREPANCIES FOUND");
    console.log("══════════════════════════════════════════════════\n");
    for (const { id, name, current, problems } of report) {
      console.log(`#${id} ${name}: [${current.join(", ")}]`);
      for (const p of problems) console.log(`  ⚠️  ${p}`);
      console.log();
    }
  }

  console.log("══════════════════════════════════════════════════");
  console.log(`  ${issues} Pokémon with issues / ${entries.length} total`);
  console.log("══════════════════════════════════════════════════");

  // Also print which roster Pokémon ARE in SV dex vs not
  console.log("\n── SV Dex coverage ──");
  const inDex = entries.filter(e => sv.has(FORM_SPECIES[e.id] || e.id));
  const notInDex = entries.filter(e => !sv.has(FORM_SPECIES[e.id] || e.id));
  console.log(`In SV dex: ${inDex.length}`);
  console.log(`NOT in SV dex: ${notInDex.length}`);
  if (notInDex.length > 0) {
    console.log("  " + notInDex.map(e => `#${e.id} ${e.name}`).join("\n  "));
  }
}

main().catch(console.error);
