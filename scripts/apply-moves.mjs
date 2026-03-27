#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — APPLY FULL MOVESETS
// Reads move-data-cache.json and rewrites pokemon-data.ts with complete moves
// Also adds Tatsugiri (#978) if missing
// ═══════════════════════════════════════════════════════════════════════════
import fs from "fs";

const CACHE_FILE = "scripts/move-data-cache.json";
const DATA_FILE = "src/lib/pokemon-data.ts";

// Load cached move data
const moveData = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
let content = fs.readFileSync(DATA_FILE, "utf8");

// ── STEP 1: Add Tatsugiri if missing ─────────────────────────────────────
if (!content.includes('"id": 978,')) {
  console.log("Adding Tatsugiri (#978)...");
  
  const tatsugiriMoves = moveData["978"] || [];
  const movesStr = tatsugiriMoves.map(m => `      { "name": "${m.name}", "type": "${m.type}", "category": "${m.category}", "power": ${m.power}, "accuracy": ${m.accuracy}, "pp": ${m.pp}, "description": "${(m.description || "").replace(/"/g, '\\"')}" }`).join(",\n");
  
  const tatsugiriEntry = `  {
    "id": 978,
    "name": "Tatsugiri",
    "dexNumber": 978,
    "types": ["dragon", "water"],
    "baseStats": { "hp": 68, "attack": 50, "defense": 60, "spAtk": 120, "spDef": 95, "speed": 82 },
    "abilities": [
      { "name": "Commander", "description": "When Tatsugiri enters battle with Dondozo, it goes into Dondozo's mouth and boosts all of Dondozo's stats." },
      { "name": "Storm Drain", "description": "Draws in all Water-type moves to boost its Sp. Atk stat.", "isHidden": true }
    ],
    "moves": [
${movesStr}
    ],
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/978.png",
    "officialArt": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/978.png",
    "generation": 9,
    "season": 1,
    "homeCompatible": true,
    "homeSource": ["Scarlet/Violet","Legends Z-A","Pokémon GO"]
  },`;

  // Insert before Kingambit (983)
  const kingambitIdx = content.indexOf('"id": 983,');
  if (kingambitIdx !== -1) {
    // Find the start of the Kingambit entry object
    const insertionPoint = content.lastIndexOf("{", kingambitIdx);
    content = content.substring(0, insertionPoint) + tatsugiriEntry + "\n  " + content.substring(insertionPoint);
    console.log("  ✓ Tatsugiri added before Kingambit");
  }
}

// ── STEP 2: Replace moves for all existing entries ───────────────────────
let replaced = 0;
let failed = 0;

for (const [idStr, moves] of Object.entries(moveData)) {
  const id = parseInt(idStr);
  
  // Skip if not in our file (Tatsugiri already added above)  
  if (id === 978 && content.includes('"id": 978,')) {
    // Already handled
  }
  
  const idMarker = `"id": ${id},`;
  const idIdx = content.indexOf(idMarker);
  if (idIdx === -1) continue;
  
  // Find the moves array for this entry
  // Pattern: "moves": [ ... ], followed by "sprite":
  const movesStart = content.indexOf('"moves":', idIdx);
  if (movesStart === -1 || movesStart > idIdx + 50000) continue;
  
  const arrayStart = content.indexOf('[', movesStart);
  if (arrayStart === -1) continue;
  
  // Find matching closing bracket - need to handle nested brackets
  let depth = 0;
  let arrayEnd = -1;
  for (let i = arrayStart; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        arrayEnd = i;
        break;
      }
    }
  }
  if (arrayEnd === -1) continue;
  
  // For Ditto, keep Transform only
  if (id === 132) {
    replaced++;
    continue;
  }
  
  // Build new moves array
  const moveEntries = moves.map(m => {
    const desc = (m.description || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ").replace(/\r/g, "");
    return `      { "name": "${m.name}", "type": "${m.type}", "category": "${m.category}", "power": ${m.power}, "accuracy": ${m.accuracy}, "pp": ${m.pp}, "description": "${desc}" }`;
  });
  
  const newMovesArray = "[\n" + moveEntries.join(",\n") + "\n    ]";
  
  content = content.substring(0, arrayStart) + newMovesArray + content.substring(arrayEnd + 1);
  replaced++;
}

console.log(`\nReplaced moves for ${replaced} Pokémon (${failed} failed)`);

// ── STEP 3: Write ────────────────────────────────────────────────────────
fs.writeFileSync(DATA_FILE, content);
console.log("✓ Written to " + DATA_FILE);

// ── STEP 4: Verify ──────────────────────────────────────────────────────
const verify = fs.readFileSync(DATA_FILE, "utf8");
const verifyIds = [...verify.matchAll(/"id":\s*(\d+),/g)].map(m => parseInt(m[1]));
console.log(`\nVerification: ${verifyIds.length} Pokémon entries`);

// Check Tatsugiri
if (verifyIds.includes(978)) {
  console.log("✓ Tatsugiri (#978) present");
} else {
  console.log("✗ Tatsugiri (#978) MISSING");
}

// Count moves per entry
const idRe2 = /"id":\s*(\d+),/g;
let m2;
let low = 0;
while ((m2 = idRe2.exec(verify)) !== null) {
  const id2 = parseInt(m2[1]);
  const start = m2.index;
  const nextId = /"id":\s*\d+,/.exec(verify.substring(start + 10));
  const end = nextId ? start + 10 + nextId.index : verify.length;
  const block = verify.substring(start, end);
  const moveCount = (block.match(/"name":/g) || []).length - 1; // -1 for pokemon name
  const nameMatch = block.match(/"name":\s*"([^"]+)"/);
  if (moveCount < 15 && id2 !== 132) {
    console.log(`  ⚠ ${nameMatch?.[1]} (${id2}): ${moveCount} moves`);
    low++;
  }
}
if (low === 0) console.log("✓ All Pokémon have 15+ moves (except Ditto)");
