#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// FIX REGIONAL FORMS & MISSING MEGAS
// 1. Extract regional forms from nested forms[] to separate top-level entries
// 2. Add Mega Victreebel (Champions-exclusive)
// 3. Add Mega Steelix (classic ORAS mega)
// 4. Add usage data for all new entries
// ═══════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SPRITE = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

// ── STEP 1: REMOVE REGIONAL FORMS FROM PARENT forms[] ─────────

function removeNonMegaForms(content, pokemonId) {
  // Find the Pokemon entry
  const idPattern = `"id": ${pokemonId},`;
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) { console.log(`  ⚠ Could not find id ${pokemonId}`); return content; }

  // Find the end of this pokemon entry (next top-level entry or end)
  const entryEnd = content.indexOf('\n  },', idIdx);
  if (entryEnd === -1) { console.log(`  ⚠ Could not find entry end for id ${pokemonId}`); return content; }
  
  const excerpt = content.slice(idIdx, entryEnd + 10);
  const formsKeyIdx = excerpt.indexOf('"forms":');
  if (formsKeyIdx === -1) { console.log(`  ⚠ No forms[] on id ${pokemonId}`); return content; }

  const formsAbsIdx = idIdx + formsKeyIdx;
  const formsArrayStart = content.indexOf('[', formsAbsIdx);

  // Find matching ] for the forms array
  let depth = 0;
  let formsArrayEnd = formsArrayStart;
  for (let i = formsArrayStart; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') { depth--; if (depth === 0) { formsArrayEnd = i; break; } }
  }

  const formsContent = content.slice(formsArrayStart + 1, formsArrayEnd);

  // Split into individual form objects (handle nested braces)
  const formObjects = [];
  let objDepth = 0;
  let currentStart = -1;
  for (let i = 0; i < formsContent.length; i++) {
    if (formsContent[i] === '{') {
      if (objDepth === 0) currentStart = i;
      objDepth++;
    }
    if (formsContent[i] === '}') {
      objDepth--;
      if (objDepth === 0 && currentStart !== -1) {
        formObjects.push(formsContent.slice(currentStart, i + 1));
        currentStart = -1;
      }
    }
  }

  const megaForms = formObjects.filter(f => f.includes('"isMega": true'));
  const nonMegaForms = formObjects.filter(f => !f.includes('"isMega": true'));

  if (nonMegaForms.length === 0) {
    console.log(`  ⚠ No non-mega forms to remove on id ${pokemonId}`);
    return content;
  }

  if (megaForms.length === 0) {
    // Remove entire "forms": [...],\n line
    // Go back to the start of the line containing "forms":
    const lineStart = content.lastIndexOf('\n', formsAbsIdx);
    // After the ], find the comma and newline
    let removeEnd = formsArrayEnd + 1;
    // Skip trailing comma and whitespace
    if (content[removeEnd] === ',') removeEnd++;
    // Skip the newline after
    if (content[removeEnd] === '\n') removeEnd++;
    content = content.slice(0, lineStart + 1) + content.slice(removeEnd);
    console.log(`  ✓ Removed entire forms[] from id ${pokemonId} (${nonMegaForms.length} forms)`);
  } else {
    // Keep only mega forms - rejoin with proper comma separation
    const newFormsContent = megaForms.join(',\n');
    const newFormsArray = `[\n${newFormsContent}\n    ]`;
    content = content.slice(0, formsArrayStart) + newFormsArray + content.slice(formsArrayEnd + 1);
    console.log(`  ✓ Removed ${nonMegaForms.length} non-mega forms from id ${pokemonId}, kept ${megaForms.length} megas`);
  }

  return content;
}

// ── STEP 2: NEW REGIONAL FORM ENTRIES ──────────────────────────

const REGIONAL_ENTRIES = [
  {
    id: 10100, name: "Alolan Raichu", dexNumber: 26, types: ["electric", "psychic"], gen: 7, tier: "B",
    stats: { hp: 60, attack: 85, defense: 50, spAtk: 95, spDef: 85, speed: 110 },
    abilities: [
      { name: "Surge Surfer", description: "Doubles Speed on Electric Terrain.", isHidden: false },
    ],
    moves: [
      { name: "Thunderbolt", type: "electric", category: "special", power: 90, accuracy: 100, pp: 15, description: "Has a 10% chance to paralyze." },
      { name: "Psychic", type: "psychic", category: "special", power: 90, accuracy: 100, pp: 10, description: "May lower Sp. Def." },
      { name: "Psyshock", type: "psychic", category: "special", power: 80, accuracy: 100, pp: 10, description: "Uses target's Defense stat." },
      { name: "Focus Blast", type: "fighting", category: "special", power: 120, accuracy: 70, pp: 5, description: "May lower Sp. Def." },
      { name: "Volt Switch", type: "electric", category: "special", power: 70, accuracy: 100, pp: 20, description: "Attacks and switches out." },
      { name: "Nuzzle", type: "electric", category: "physical", power: 20, accuracy: 100, pp: 20, description: "Always paralyzes the target." },
      { name: "Fake Out", type: "normal", category: "physical", power: 40, accuracy: 100, pp: 10, description: "Only works on the first turn. Causes flinching." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "Foils attack that turn. It may fail." },
      { name: "Encore", type: "normal", category: "status", power: null, accuracy: 100, pp: 5, description: "Forces the target to repeat its last move." },
      { name: "Grass Knot", type: "grass", category: "special", power: 80, accuracy: 100, pp: 20, description: "Power based on target's weight." },
      { name: "Helping Hand", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "Boosts the power of an ally's move." },
    ],
  },
  {
    id: 10103, name: "Alolan Ninetales", dexNumber: 38, types: ["ice", "fairy"], gen: 7, tier: "A",
    stats: { hp: 73, attack: 67, defense: 75, spAtk: 81, spDef: 100, speed: 109 },
    abilities: [
      { name: "Snow Warning", description: "Summons hail/snow when entering battle.", isHidden: false },
      { name: "Snow Cloak", description: "Raises evasion in hail.", isHidden: true },
    ],
    moves: [
      { name: "Blizzard", type: "ice", category: "special", power: 110, accuracy: 70, pp: 5, description: "Hits all adjacent foes. May freeze." },
      { name: "Moonblast", type: "fairy", category: "special", power: 95, accuracy: 100, pp: 15, description: "May lower Sp. Atk." },
      { name: "Freeze-Dry", type: "ice", category: "special", power: 70, accuracy: 100, pp: 20, description: "Super effective against Water types." },
      { name: "Dazzling Gleam", type: "fairy", category: "special", power: 80, accuracy: 100, pp: 10, description: "Hits both adjacent foes." },
      { name: "Aurora Veil", type: "ice", category: "status", power: null, accuracy: null, pp: 20, description: "Halves damage from physical and special moves for 5 turns. Only works in snow/hail." },
      { name: "Icy Wind", type: "ice", category: "special", power: 55, accuracy: 95, pp: 15, description: "An icy attack that lowers Speed." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "Foils attack that turn. It may fail." },
      { name: "Encore", type: "normal", category: "status", power: null, accuracy: 100, pp: 5, description: "Forces the target to repeat its last move." },
      { name: "Helping Hand", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "Boosts the power of an ally's move." },
      { name: "Disable", type: "normal", category: "status", power: null, accuracy: 100, pp: 20, description: "Disables the target's last used move." },
    ],
  },
  {
    id: 10008, name: "Heat Rotom", dexNumber: 479, types: ["electric", "fire"], gen: 4, tier: "A",
    stats: { hp: 50, attack: 65, defense: 107, spAtk: 105, spDef: 107, speed: 86 },
    abilities: [
      { name: "Levitate", description: "Immune to Ground-type moves.", isHidden: false },
    ],
    moves: [
      { name: "Overheat", type: "fire", category: "special", power: 130, accuracy: 90, pp: 5, description: "Lowers user's Sp. Atk sharply." },
      { name: "Thunderbolt", type: "electric", category: "special", power: 90, accuracy: 100, pp: 15, description: "Has a 10% chance to paralyze." },
      { name: "Volt Switch", type: "electric", category: "special", power: 70, accuracy: 100, pp: 20, description: "Attacks and switches out." },
      { name: "Will-O-Wisp", type: "fire", category: "status", power: null, accuracy: 85, pp: 15, description: "Burns the target." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "Foils attack that turn. It may fail." },
      { name: "Thunder Wave", type: "electric", category: "status", power: null, accuracy: 90, pp: 20, description: "Paralyzes the target." },
      { name: "Discharge", type: "electric", category: "special", power: 80, accuracy: 100, pp: 15, description: "Hits all adjacent Pokémon. May paralyze." },
      { name: "Light Screen", type: "psychic", category: "status", power: null, accuracy: null, pp: 30, description: "Halves special damage for 5 turns." },
      { name: "Nasty Plot", type: "dark", category: "status", power: null, accuracy: null, pp: 20, description: "Sharply raises Sp. Atk." },
      { name: "Helping Hand", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "Boosts the power of an ally's move." },
    ],
  },
  {
    id: 10009, name: "Wash Rotom", dexNumber: 479, types: ["electric", "water"], gen: 4, tier: "A",
    stats: { hp: 50, attack: 65, defense: 107, spAtk: 105, spDef: 107, speed: 86 },
    abilities: [
      { name: "Levitate", description: "Immune to Ground-type moves.", isHidden: false },
    ],
    moves: [
      { name: "Hydro Pump", type: "water", category: "special", power: 110, accuracy: 80, pp: 5, description: "A powerful water-type attack." },
      { name: "Thunderbolt", type: "electric", category: "special", power: 90, accuracy: 100, pp: 15, description: "Has a 10% chance to paralyze." },
      { name: "Volt Switch", type: "electric", category: "special", power: 70, accuracy: 100, pp: 20, description: "Attacks and switches out." },
      { name: "Will-O-Wisp", type: "fire", category: "status", power: null, accuracy: 85, pp: 15, description: "Burns the target." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "Foils attack that turn. It may fail." },
      { name: "Thunder Wave", type: "electric", category: "status", power: null, accuracy: 90, pp: 20, description: "Paralyzes the target." },
      { name: "Nasty Plot", type: "dark", category: "status", power: null, accuracy: null, pp: 20, description: "Sharply raises Sp. Atk." },
      { name: "Helping Hand", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "Boosts the power of an ally's move." },
      { name: "Light Screen", type: "psychic", category: "status", power: null, accuracy: null, pp: 30, description: "Halves special damage for 5 turns." },
    ],
  },
  {
    id: 10010, name: "Frost Rotom", dexNumber: 479, types: ["electric", "ice"], gen: 4, tier: "B",
    stats: { hp: 50, attack: 65, defense: 107, spAtk: 105, spDef: 107, speed: 86 },
    abilities: [
      { name: "Levitate", description: "Immune to Ground-type moves.", isHidden: false },
    ],
    moves: [
      { name: "Blizzard", type: "ice", category: "special", power: 110, accuracy: 70, pp: 5, description: "Hits all adjacent foes. May freeze." },
      { name: "Thunderbolt", type: "electric", category: "special", power: 90, accuracy: 100, pp: 15, description: "Has a 10% chance to paralyze." },
      { name: "Volt Switch", type: "electric", category: "special", power: 70, accuracy: 100, pp: 20, description: "Attacks and switches out." },
      { name: "Will-O-Wisp", type: "fire", category: "status", power: null, accuracy: 85, pp: 15, description: "Burns the target." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "Foils attack that turn. It may fail." },
      { name: "Thunder Wave", type: "electric", category: "status", power: null, accuracy: 90, pp: 20, description: "Paralyzes the target." },
      { name: "Nasty Plot", type: "dark", category: "status", power: null, accuracy: null, pp: 20, description: "Sharply raises Sp. Atk." },
      { name: "Helping Hand", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "Boosts the power of an ally's move." },
    ],
  },
  {
    id: 10011, name: "Fan Rotom", dexNumber: 479, types: ["electric", "flying"], gen: 4, tier: "C",
    stats: { hp: 50, attack: 65, defense: 107, spAtk: 105, spDef: 107, speed: 86 },
    abilities: [
      { name: "Levitate", description: "Immune to Ground-type moves.", isHidden: false },
    ],
    moves: [
      { name: "Air Slash", type: "flying", category: "special", power: 75, accuracy: 95, pp: 15, description: "May cause flinching." },
      { name: "Thunderbolt", type: "electric", category: "special", power: 90, accuracy: 100, pp: 15, description: "Has a 10% chance to paralyze." },
      { name: "Volt Switch", type: "electric", category: "special", power: 70, accuracy: 100, pp: 20, description: "Attacks and switches out." },
      { name: "Will-O-Wisp", type: "fire", category: "status", power: null, accuracy: 85, pp: 15, description: "Burns the target." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "Foils attack that turn. It may fail." },
      { name: "Thunder Wave", type: "electric", category: "status", power: null, accuracy: 90, pp: 20, description: "Paralyzes the target." },
      { name: "Nasty Plot", type: "dark", category: "status", power: null, accuracy: null, pp: 20, description: "Sharply raises Sp. Atk." },
      { name: "Helping Hand", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "Boosts the power of an ally's move." },
    ],
  },
  {
    id: 10012, name: "Mow Rotom", dexNumber: 479, types: ["electric", "grass"], gen: 4, tier: "B",
    stats: { hp: 50, attack: 65, defense: 107, spAtk: 105, spDef: 107, speed: 86 },
    abilities: [
      { name: "Levitate", description: "Immune to Ground-type moves.", isHidden: false },
    ],
    moves: [
      { name: "Leaf Storm", type: "grass", category: "special", power: 130, accuracy: 90, pp: 5, description: "Sharply lowers user's Sp. Atk." },
      { name: "Thunderbolt", type: "electric", category: "special", power: 90, accuracy: 100, pp: 15, description: "Has a 10% chance to paralyze." },
      { name: "Volt Switch", type: "electric", category: "special", power: 70, accuracy: 100, pp: 20, description: "Attacks and switches out." },
      { name: "Will-O-Wisp", type: "fire", category: "status", power: null, accuracy: 85, pp: 15, description: "Burns the target." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "Foils attack that turn. It may fail." },
      { name: "Thunder Wave", type: "electric", category: "status", power: null, accuracy: 90, pp: 20, description: "Paralyzes the target." },
      { name: "Nasty Plot", type: "dark", category: "status", power: null, accuracy: null, pp: 20, description: "Sharply raises Sp. Atk." },
      { name: "Helping Hand", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "Boosts the power of an ally's move." },
    ],
  },
  {
    id: 10336, name: "Hisuian Samurott", dexNumber: 503, types: ["water", "dark"], gen: 5, tier: "B",
    stats: { hp: 90, attack: 108, defense: 80, spAtk: 100, spDef: 65, speed: 85 },
    abilities: [
      { name: "Sharpness", description: "Powers up slicing moves.", isHidden: false },
      { name: "Shell Armor", description: "Blocks critical hits.", isHidden: true },
    ],
    moves: [
      { name: "Ceaseless Edge", type: "dark", category: "physical", power: 65, accuracy: 90, pp: 15, description: "Sets Spikes on the foe's side." },
      { name: "Razor Shell", type: "water", category: "physical", power: 75, accuracy: 95, pp: 10, description: "May lower Defense." },
      { name: "Sacred Sword", type: "fighting", category: "physical", power: 90, accuracy: 100, pp: 15, description: "Ignores target's stat changes." },
      { name: "Aqua Jet", type: "water", category: "physical", power: 40, accuracy: 100, pp: 20, description: "Always strikes first." },
      { name: "Sucker Punch", type: "dark", category: "physical", power: 70, accuracy: 100, pp: 5, description: "Goes first. Fails if foe isn't attacking." },
      { name: "Swords Dance", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "Sharply raises Attack." },
      { name: "Knock Off", type: "dark", category: "physical", power: 65, accuracy: 100, pp: 20, description: "Removes the target's held item." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "Foils attack that turn. It may fail." },
      { name: "Night Slash", type: "dark", category: "physical", power: 70, accuracy: 100, pp: 15, description: "High critical-hit ratio." },
      { name: "Air Slash", type: "flying", category: "special", power: 75, accuracy: 95, pp: 15, description: "May cause flinching." },
    ],
  },
  {
    id: 10340, name: "Hisuian Zoroark", dexNumber: 571, types: ["normal", "ghost"], gen: 5, tier: "A",
    stats: { hp: 55, attack: 100, defense: 60, spAtk: 125, spDef: 60, speed: 110 },
    abilities: [
      { name: "Illusion", description: "Takes on the appearance of the last party member.", isHidden: false },
    ],
    moves: [
      { name: "Shadow Ball", type: "ghost", category: "special", power: 80, accuracy: 100, pp: 15, description: "May lower Sp. Def." },
      { name: "Hyper Voice", type: "normal", category: "special", power: 90, accuracy: 100, pp: 10, description: "A loud attack that hits all adjacent foes." },
      { name: "Nasty Plot", type: "dark", category: "status", power: null, accuracy: null, pp: 20, description: "Sharply raises Sp. Atk." },
      { name: "Flamethrower", type: "fire", category: "special", power: 90, accuracy: 100, pp: 15, description: "Has a 10% chance to burn." },
      { name: "Focus Blast", type: "fighting", category: "special", power: 120, accuracy: 70, pp: 5, description: "May lower Sp. Def." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "Foils attack that turn. It may fail." },
      { name: "U-turn", type: "bug", category: "physical", power: 70, accuracy: 100, pp: 20, description: "Attacks and switches out." },
      { name: "Knock Off", type: "dark", category: "physical", power: 65, accuracy: 100, pp: 20, description: "Removes the target's held item." },
      { name: "Taunt", type: "dark", category: "status", power: null, accuracy: 100, pp: 20, description: "Prevents the target from using status moves." },
      { name: "Snarl", type: "dark", category: "special", power: 55, accuracy: 95, pp: 15, description: "Hits all adjacent foes. Lowers Sp. Atk." },
    ],
  },
  {
    id: 10341, name: "Hisuian Decidueye", dexNumber: 724, types: ["grass", "fighting"], gen: 7, tier: "B",
    stats: { hp: 88, attack: 112, defense: 80, spAtk: 95, spDef: 95, speed: 60 },
    abilities: [
      { name: "Scrappy", description: "Can hit Ghost types with Normal and Fighting moves.", isHidden: false },
      { name: "Long Reach", description: "Moves don't make contact.", isHidden: true },
    ],
    moves: [
      { name: "Close Combat", type: "fighting", category: "physical", power: 120, accuracy: 100, pp: 5, description: "Lowers user's Def and Sp. Def." },
      { name: "Leaf Blade", type: "grass", category: "physical", power: 90, accuracy: 100, pp: 15, description: "High critical-hit ratio." },
      { name: "Knock Off", type: "dark", category: "physical", power: 65, accuracy: 100, pp: 20, description: "Removes the target's held item." },
      { name: "Brave Bird", type: "flying", category: "physical", power: 120, accuracy: 100, pp: 15, description: "User takes recoil damage." },
      { name: "Swords Dance", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "Sharply raises Attack." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "Foils attack that turn. It may fail." },
      { name: "U-turn", type: "bug", category: "physical", power: 70, accuracy: 100, pp: 20, description: "Attacks and switches out." },
      { name: "Shadow Sneak", type: "ghost", category: "physical", power: 40, accuracy: 100, pp: 30, description: "Always strikes first." },
      { name: "Seed Bomb", type: "grass", category: "physical", power: 80, accuracy: 100, pp: 15, description: "A barrage of hard seeds is fired." },
      { name: "Drain Punch", type: "fighting", category: "physical", power: 75, accuracy: 100, pp: 10, description: "Drains 50% of damage dealt." },
    ],
  },
];

// ── STEP 3: MEGA VICTREEBEL ────────────────────────────────────

const MEGA_VICTREEBEL = {
  name: "Mega Victreebel",
  sprite: SPRITE(10400), // Champions-exclusive sprite ID
  types: ["grass", "poison"],
  baseStats: { hp: 80, attack: 145, defense: 75, spAtk: 130, spDef: 80, speed: 80 },
  abilities: [{ name: "Corrosive Maw", description: "Poison and Grass-type moves gain 30% power. Biting moves poison the target on contact.", isChampions: true }],
  isMega: true,
};

// ── STEP 4: MEGA STEELIX ──────────────────────────────────────

const MEGA_STEELIX = {
  name: "Mega Steelix",
  sprite: SPRITE(10072),
  types: ["steel", "ground"],
  baseStats: { hp: 75, attack: 125, defense: 230, spAtk: 55, spDef: 95, speed: 30 },
  abilities: [{ name: "Sand Force", description: "Boosts Rock, Ground, and Steel-type moves by 30% in sandstorm.", isChampions: false }],
  isMega: true,
};

// ── USAGE DATA FOR REGIONAL FORMS ──────────────────────────────

const REGIONAL_USAGE = {
  10100: [ // Alolan Raichu
    { name: "Terrain Surfer", nature: "Timid", ability: "Surge Surfer", item: "Life Orb", moves: ["Thunderbolt", "Psychic", "Volt Switch", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "electric" },
    { name: "Fake Out Lead", nature: "Timid", ability: "Surge Surfer", item: "Focus Sash", moves: ["Fake Out", "Thunderbolt", "Psychic", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "ghost" },
    { name: "Encore Support", nature: "Timid", ability: "Surge Surfer", item: "Focus Sash", moves: ["Thunderbolt", "Encore", "Nuzzle", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
  ],
  10103: [ // Alolan Ninetales
    { name: "Aurora Veil Lead", nature: "Timid", ability: "Snow Warning", item: "Light Clay", moves: ["Aurora Veil", "Blizzard", "Moonblast", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "ghost" },
    { name: "Offensive", nature: "Timid", ability: "Snow Warning", item: "Focus Sash", moves: ["Blizzard", "Moonblast", "Freeze-Dry", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "ground" },
    { name: "Icy Wind Support", nature: "Timid", ability: "Snow Warning", item: "Focus Sash", moves: ["Icy Wind", "Moonblast", "Aurora Veil", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
  ],
  10008: [ // Heat Rotom
    { name: "Choice Specs", nature: "Modest", ability: "Levitate", item: "Choice Specs", moves: ["Overheat", "Thunderbolt", "Volt Switch", "Helping Hand"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "electric" },
    { name: "Bulky WoW", nature: "Bold", ability: "Levitate", item: "Sitrus Berry", moves: ["Thunderbolt", "Overheat", "Will-O-Wisp", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "water" },
    { name: "Nasty Plot", nature: "Timid", ability: "Levitate", item: "Sitrus Berry", moves: ["Nasty Plot", "Thunderbolt", "Overheat", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "water" },
  ],
  10009: [ // Wash Rotom
    { name: "Bulky Pivot", nature: "Bold", ability: "Levitate", item: "Sitrus Berry", moves: ["Hydro Pump", "Volt Switch", "Will-O-Wisp", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "grass" },
    { name: "Offensive", nature: "Modest", ability: "Levitate", item: "Choice Specs", moves: ["Hydro Pump", "Thunderbolt", "Volt Switch", "Nasty Plot"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "electric" },
    { name: "Nasty Plot", nature: "Modest", ability: "Levitate", item: "Sitrus Berry", moves: ["Nasty Plot", "Thunderbolt", "Hydro Pump", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "grass" },
  ],
  10010: [ // Frost Rotom
    { name: "AV Attacker", nature: "Modest", ability: "Levitate", item: "Assault Vest", moves: ["Blizzard", "Thunderbolt", "Volt Switch", "Helping Hand"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "electric" },
    { name: "Bulky WoW", nature: "Bold", ability: "Levitate", item: "Sitrus Berry", moves: ["Thunderbolt", "Blizzard", "Will-O-Wisp", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "water" },
  ],
  10011: [ // Fan Rotom
    { name: "Speed Control", nature: "Timid", ability: "Levitate", item: "Sitrus Berry", moves: ["Air Slash", "Thunderbolt", "Thunder Wave", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "steel" },
    { name: "Nasty Plot", nature: "Timid", ability: "Levitate", item: "Sitrus Berry", moves: ["Nasty Plot", "Air Slash", "Thunderbolt", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "steel" },
  ],
  10012: [ // Mow Rotom
    { name: "Bulky Pivot", nature: "Modest", ability: "Levitate", item: "Sitrus Berry", moves: ["Leaf Storm", "Thunderbolt", "Volt Switch", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "fire" },
    { name: "Nasty Plot", nature: "Modest", ability: "Levitate", item: "Sitrus Berry", moves: ["Nasty Plot", "Leaf Storm", "Thunderbolt", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "fire" },
  ],
  10336: [ // Hisuian Samurott
    { name: "Sharpness SD", nature: "Adamant", ability: "Sharpness", item: "Focus Sash", moves: ["Ceaseless Edge", "Razor Shell", "Sacred Sword", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "dark" },
    { name: "AV Attacker", nature: "Adamant", ability: "Sharpness", item: "Assault Vest", moves: ["Ceaseless Edge", "Razor Shell", "Aqua Jet", "Knock Off"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "water" },
    { name: "Band", nature: "Jolly", ability: "Sharpness", item: "Choice Band", moves: ["Ceaseless Edge", "Razor Shell", "Sacred Sword", "Aqua Jet"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "water" },
  ],
  10340: [ // Hisuian Zoroark
    { name: "Nasty Plot", nature: "Timid", ability: "Illusion", item: "Focus Sash", moves: ["Shadow Ball", "Hyper Voice", "Nasty Plot", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "ghost" },
    { name: "Specs Attacker", nature: "Timid", ability: "Illusion", item: "Choice Specs", moves: ["Shadow Ball", "Hyper Voice", "Flamethrower", "Focus Blast"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "normal" },
    { name: "U-turn Pivot", nature: "Timid", ability: "Illusion", item: "Focus Sash", moves: ["Shadow Ball", "Hyper Voice", "U-turn", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "ghost" },
  ],
  10341: [ // Hisuian Decidueye
    { name: "SD Sweeper", nature: "Adamant", ability: "Scrappy", item: "Life Orb", moves: ["Close Combat", "Leaf Blade", "Swords Dance", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "fighting" },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Scrappy", item: "Assault Vest", moves: ["Close Combat", "Leaf Blade", "Knock Off", "Shadow Sneak"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "grass" },
    { name: "Band", nature: "Jolly", ability: "Scrappy", item: "Choice Band", moves: ["Close Combat", "Leaf Blade", "Brave Bird", "U-turn"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "fighting" },
  ],
};

// ── MAIN ───────────────────────────────────────────────────────

function addMegaToEntry(content, pokemonId, megaData, label) {
  const idPattern = `"id": ${pokemonId},`;
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) { console.log(`  ⚠ Could not find id ${pokemonId}`); return content; }

  const nextEntryIdx = content.indexOf('\n  },', idIdx);
  if (nextEntryIdx === -1) { console.log(`  ⚠ Could not find entry end for id ${pokemonId}`); return content; }

  // Find "hasMega": false within this entry
  const hasMegaStr = '"hasMega": false';
  const hasMegaIdx = content.indexOf(hasMegaStr, idIdx);
  if (hasMegaIdx === -1 || hasMegaIdx > nextEntryIdx + 50) {
    // Maybe already has mega?
    const hasMegaTrue = content.indexOf('"hasMega": true', idIdx);
    if (hasMegaTrue !== -1 && hasMegaTrue < nextEntryIdx + 50) {
      // Already has forms array, add to it
      const formsIdx = content.indexOf('"forms":', idIdx);
      if (formsIdx !== -1 && formsIdx < nextEntryIdx) {
        const formsArrayEnd = content.indexOf('],', formsIdx);
        const megaObj = JSON.stringify(megaData, null, 6);
        const indented = megaObj.split('\n').map(l => '      ' + l).join('\n');
        content = content.slice(0, formsArrayEnd) + ',\n' + indented + '\n    ],' + content.slice(formsArrayEnd + 2);
        console.log(`  ✓ Added ${label} to existing forms array`);
      }
    } else {
      console.log(`  ⚠ Could not find hasMega for id ${pokemonId}`);
    }
    return content;
  }

  // No existing forms array. Insert forms array before hasMega and change to true
  const megaObj = JSON.stringify(megaData, null, 6);
  const indented = megaObj.split('\n').map(l => '      ' + l).join('\n');
  const formsStr = `"forms": [\n${indented}\n    ],\n    "hasMega": true`;
  content = content.slice(0, hasMegaIdx) + formsStr + content.slice(hasMegaIdx + hasMegaStr.length);
  console.log(`  ✓ Added ${label}`);
  return content;
}

function main() {
  console.log("=== FIXING REGIONAL FORMS & MISSING MEGAS ===\n");

  // ── POKEMON-DATA.TS ──────────────────────────────────────────
  const pdPath = join(ROOT, 'src/lib/pokemon-data.ts');
  let pd = readFileSync(pdPath, 'utf-8');

  // 1. Remove non-mega forms from parents
  console.log("── Removing nested regional forms ──");
  pd = removeNonMegaForms(pd, 26);   // Raichu: keep megas, remove Alolan
  pd = removeNonMegaForms(pd, 38);   // Ninetales: remove Alolan
  pd = removeNonMegaForms(pd, 479);  // Rotom: remove all appliance forms
  pd = removeNonMegaForms(pd, 503);  // Samurott: remove Hisuian
  pd = removeNonMegaForms(pd, 571);  // Zoroark: remove Hisuian
  pd = removeNonMegaForms(pd, 724);  // Decidueye: remove Hisuian

  // 2. Add Mega Victreebel to Victreebel (id: 71)
  console.log("\n── Adding Mega Victreebel ──");
  pd = addMegaToEntry(pd, 71, MEGA_VICTREEBEL, "Mega Victreebel");

  // 3. Add Mega Steelix to Steelix (id: 208)
  console.log("\n── Adding Mega Steelix ──");
  pd = addMegaToEntry(pd, 208, MEGA_STEELIX, "Mega Steelix");

  // 4. Add regional form entries as top-level Pokemon
  console.log("\n── Adding regional forms as separate entries ──");
  
  // Find the helper functions to preserve them
  const helperFuncsStart = pd.indexOf('\nexport function getPokemonBySeason');
  let helperFuncs = '';
  if (helperFuncsStart !== -1) {
    helperFuncs = pd.slice(helperFuncsStart);
    pd = pd.slice(0, helperFuncsStart);
  }
  
  // Find the closing ]; of POKEMON_SEED array
  const closingIdx = pd.lastIndexOf('\n];');
  if (closingIdx !== -1) {
    const entries = REGIONAL_ENTRIES.map(e => {
      const entry = {
        id: e.id,
        name: e.name,
        dexNumber: e.dexNumber,
        types: e.types,
        baseStats: e.stats,
        abilities: e.abilities,
        moves: e.moves,
        sprite: SPRITE(e.id),
        officialArt: SPRITE(e.id),
        generation: e.gen,
        hasMega: false,
        recruitmentCost: null,
        homeCompatible: true,
        homeSource: ["Scarlet/Violet", "Legends Z-A"],
        season: 1,
        tier: e.tier,
        usageRate: null,
      };
      return JSON.stringify(entry, null, 2).replace(/^/gm, '  ');
    });
    const insert = ',\n' + entries.join(',\n');
    pd = pd.slice(0, closingIdx) + insert + '\n];';
    console.log(`  ✓ Added ${REGIONAL_ENTRIES.length} regional form entries`);
  }

  // Re-append helper functions
  if (helperFuncs) {
    pd += helperFuncs;
  }

  // Update the comment
  pd = pd.replace(
    /\/\/ .*Pokémon in the Champions Season 1 roster.*/,
    '// 136 Pokémon + 11 regional forms in the Champions Season 1 roster (official Bulbapedia list)'
  );

  writeFileSync(pdPath, pd, 'utf-8');
  console.log("\n  ✓ Written pokemon-data.ts");

  // ── USAGE-DATA.TS ────────────────────────────────────────────
  console.log("\n── Updating usage-data.ts ──");
  const udPath = join(ROOT, 'src/lib/usage-data.ts');
  let ud = readFileSync(udPath, 'utf-8');

  const usageEntries = [];
  for (const [id, sets] of Object.entries(REGIONAL_USAGE)) {
    const pokeName = REGIONAL_ENTRIES.find(p => p.id === Number(id))?.name || `id ${id}`;
    const lines = [];
    lines.push(`\n  // ${pokeName} (id: ${id})`);
    lines.push(`  ${id}: [`);
    for (const set of sets) {
      const spStr = `{ hp: ${set.sp.hp}, attack: ${set.sp.attack}, defense: ${set.sp.defense}, spAtk: ${set.sp.spAtk}, spDef: ${set.sp.spDef}, speed: ${set.sp.speed} }`;
      const movesStr = JSON.stringify(set.moves);
      const teraStr = set.teraType ? `, teraType: "${set.teraType}"` : '';
      lines.push(`    { name: "${set.name}", nature: "${set.nature}", ability: "${set.ability}", item: "${set.item}", moves: ${movesStr}, sp: ${spStr}${teraStr} },`);
    }
    lines.push(`  ],`);
    usageEntries.push(lines.join('\n'));
  }
  const usageInsert = usageEntries.join('\n');

  const usageClosing = ud.lastIndexOf('\n};');
  if (usageClosing !== -1) {
    ud = ud.slice(0, usageClosing) + '\n' + usageInsert + '\n};';
    writeFileSync(udPath, ud, 'utf-8');
    console.log(`  ✓ Added usage data for ${Object.keys(REGIONAL_USAGE).length} regional forms`);
  }

  // ── SUMMARY ──────────────────────────────────────────────────
  console.log("\n=== SUMMARY ===");
  console.log("Regional forms extracted to separate entries: 11");
  console.log("  (Alolan Raichu, Alolan Ninetales, 5 Rotom forms, Hisuian Samurott/Zoroark/Decidueye)");
  console.log("Megas added: Mega Victreebel, Mega Steelix");
  console.log("Total entries: 126 base + 11 regional = ~137");
}

main();
