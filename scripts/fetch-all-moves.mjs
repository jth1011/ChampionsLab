#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — MASTER DATA REBUILD
// Fetches complete movesets from PokeAPI, ensures all fields are correct
// ═══════════════════════════════════════════════════════════════════════════
import fs from "fs";

const API = "https://pokeapi.co/api/v2";

// Rate limiter
let lastFetch = 0;
async function apiFetch(url) {
  const now = Date.now();
  const wait = Math.max(0, 120 - (now - lastFetch));
  if (wait > 0) await new Promise(r => setTimeout(r, wait));
  lastFetch = Date.now();
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API ${res.status}: ${url}`);
  return res.json();
}

// Type mapping
const TYPE_MAP = {
  normal: "normal", fire: "fire", water: "water", electric: "electric",
  grass: "grass", ice: "ice", fighting: "fighting", poison: "poison",
  ground: "ground", flying: "flying", psychic: "psychic", bug: "bug",
  rock: "rock", ghost: "ghost", dragon: "dragon", dark: "dark",
  steel: "steel", fairy: "fairy",
};

// Category mapping
const CAT_MAP = { physical: "physical", special: "special", status: "status" };

// All our pokemon IDs (PokeAPI species/form IDs)
const OUR_IDS = [];

// Read current data to get list
const content = fs.readFileSync("src/lib/pokemon-data.ts", "utf8");
const idRe = /"id":\s*(\d+),/g;
let match;
while ((match = idRe.exec(content)) !== null) {
  OUR_IDS.push(parseInt(match[1]));
}

// Add Tatsugiri if missing
if (!OUR_IDS.includes(978)) OUR_IDS.push(978);

console.log(`Processing ${OUR_IDS.length} Pokémon...`);

// Fetch move details with caching
const moveCache = new Map();
async function getMove(name) {
  if (moveCache.has(name)) return moveCache.get(name);
  try {
    const data = await apiFetch(`${API}/move/${name}`);
    const move = {
      name: data.names?.find(n => n.language.name === "en")?.name || data.name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      type: TYPE_MAP[data.type.name] || data.type.name,
      category: CAT_MAP[data.damage_class.name] || data.damage_class.name,
      power: data.power,
      accuracy: data.accuracy,
      pp: data.pp,
      description: data.flavor_text_entries?.find(e => e.language.name === "en" && e.version_group.name.includes("scarlet"))?.flavor_text
        || data.flavor_text_entries?.find(e => e.language.name === "en")?.flavor_text
        || data.effect_entries?.find(e => e.language.name === "en")?.short_effect
        || "",
    };
    move.description = move.description.replace(/\n/g, " ").replace(/\f/g, " ").trim();
    moveCache.set(name, move);
    return move;
  } catch (e) {
    console.warn(`  ⚠ Could not fetch move: ${name}`);
    return null;
  }
}

// Fetch all moves for a pokemon
async function getPokemonMoves(apiId) {
  const data = await apiFetch(`${API}/pokemon/${apiId}`);
  
  // Get all learnable moves (level-up, TM, tutor, egg)
  const moveNames = [...new Set(data.moves.map(m => m.move.name))];
  
  console.log(`  Fetching ${moveNames.length} moves...`);
  
  // Fetch in batches of 10
  const moves = [];
  for (let i = 0; i < moveNames.length; i += 10) {
    const batch = moveNames.slice(i, i + 10);
    const results = await Promise.all(batch.map(name => getMove(name)));
    moves.push(...results.filter(Boolean));
  }
  
  return moves;
}

// Fetch pokemon species data
async function getSpeciesData(dexNum) {
  const data = await apiFetch(`${API}/pokemon-species/${dexNum}`);
  return data;
}

// Fetch pokemon data
async function getPokemonData(apiId) {
  const data = await apiFetch(`${API}/pokemon/${apiId}`);
  return data;
}

// Map our IDs to PokeAPI IDs 
function getApiId(ourId) {
  // Regional forms use different PokeAPI IDs
  const apiMap = {
    10100: 10100, // Alolan Raichu
    10103: 10103, // Alolan Ninetales
    10008: 10008, // Heat Rotom
    10009: 10009, // Wash Rotom
    10010: 10010, // Frost Rotom
    10011: 10011, // Fan Rotom
    10012: 10012, // Mow Rotom
    10236: 10236, // Hisuian Samurott (corrected)
    10239: 10239, // Hisuian Zoroark (corrected)
    10244: 10244, // Hisuian Decidueye (corrected)
    10336: 10236, // Our ID -> PokeAPI ID
    10340: 10239,
    10341: 10244,
  };
  return apiMap[ourId] || ourId;
}

// Process all pokemon and build move data
async function main() {
  const moveData = new Map(); // id -> moves[]
  let processed = 0;

  for (const id of OUR_IDS) {
    const apiId = getApiId(id);
    try {
      console.log(`[${++processed}/${OUR_IDS.length}] Fetching id ${id} (API: ${apiId})...`);
      const moves = await getPokemonMoves(apiId);
      
      // Sort: status moves first alpha, then by power descending, then alpha
      moves.sort((a, b) => {
        if (a.category === "status" && b.category !== "status") return 1;
        if (a.category !== "status" && b.category === "status") return -1;
        if (a.category !== "status" && b.category !== "status") {
          if ((b.power || 0) !== (a.power || 0)) return (b.power || 0) - (a.power || 0);
        }
        return a.name.localeCompare(b.name);
      });

      moveData.set(id, moves);
      console.log(`  ✓ ${moves.length} moves loaded`);
    } catch (e) {
      console.error(`  ✗ Failed for id ${id}: ${e.message}`);
    }
  }

  // Save intermediate results
  const output = {};
  for (const [id, moves] of moveData) {
    output[id] = moves;
  }
  fs.writeFileSync("scripts/move-data-cache.json", JSON.stringify(output, null, 2));
  console.log(`\nSaved move data for ${moveData.size} Pokémon to scripts/move-data-cache.json`);
  console.log(`Total unique moves cached: ${moveCache.size}`);
}

main().catch(console.error);
