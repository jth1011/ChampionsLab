#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// UPDATE ROSTER — Adds 34 missing Pokemon, removes Tatsugiri,
// adds mega forms, regional forms, and usage data
// Based on: https://bulbapedia.bulbagarden.net/wiki/List_of_Pokémon_in_Pokémon_Champions
// ═══════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SPRITE = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

// ── MOVE DATABASE ──────────────────────────────────────────────
const MOVES = {
  // Normal
  "Body Slam":      { type: "normal",   cat: "physical", pow: 85,  acc: 100, pp: 15, desc: "An attack that may cause paralysis." },
  "Double-Edge":    { type: "normal",   cat: "physical", pow: 120, acc: 100, pp: 15, desc: "A reckless charge attack that also hurts the user." },
  "Extreme Speed":  { type: "normal",   cat: "physical", pow: 80,  acc: 100, pp: 5,  desc: "An extremely fast attack that always goes first." },
  "Facade":         { type: "normal",   cat: "physical", pow: 70,  acc: 100, pp: 20, desc: "Doubles power when burned, paralyzed, or poisoned." },
  "Fake Out":       { type: "normal",   cat: "physical", pow: 40,  acc: 100, pp: 10, desc: "Only works on the first turn. Causes flinching." },
  "Headbutt":       { type: "normal",   cat: "physical", pow: 70,  acc: 100, pp: 15, desc: "An attack that may make the foe flinch." },
  "Hyper Beam":     { type: "normal",   cat: "special",  pow: 150, acc: 90,  pp: 5,  desc: "Must rest on next turn." },
  "Hyper Voice":    { type: "normal",   cat: "special",  pow: 90,  acc: 100, pp: 10, desc: "A loud attack that hits all adjacent foes." },
  "Last Resort":    { type: "normal",   cat: "physical", pow: 140, acc: 100, pp: 5,  desc: "Can only be used after all other moves have been used." },
  "Quick Attack":   { type: "normal",   cat: "physical", pow: 40,  acc: 100, pp: 30, desc: "An extremely fast attack that always goes first." },
  "Rapid Spin":     { type: "normal",   cat: "physical", pow: 50,  acc: 100, pp: 40, desc: "Removes hazards and raises Speed." },
  "Return":         { type: "normal",   cat: "physical", pow: 102, acc: 100, pp: 20, desc: "Stronger the more the user likes you." },
  "Slash":          { type: "normal",   cat: "physical", pow: 70,  acc: 100, pp: 20, desc: "Has a high critical-hit ratio." },
  "Substitute":     { type: "normal",   cat: "status",   pow: null,acc: null,pp: 10, desc: "Makes a decoy with 1/4 user's max HP." },
  "Swords Dance":   { type: "normal",   cat: "status",   pow: null,acc: null,pp: 20, desc: "Sharply raises Attack." },
  "Transform":      { type: "normal",   cat: "status",   pow: null,acc: null,pp: 10, desc: "Transforms into a copy of the foe." },
  "Protect":        { type: "normal",   cat: "status",   pow: null,acc: null,pp: 10, desc: "Foils attack that turn. It may fail." },
  "Helping Hand":   { type: "normal",   cat: "status",   pow: null,acc: null,pp: 20, desc: "Boosts the power of an ally's move." },
  "Explosion":      { type: "normal",   cat: "physical", pow: 250, acc: 100, pp: 5,  desc: "The user faints. Very powerful." },
  "Crush Claw":     { type: "normal",   cat: "physical", pow: 75,  acc: 95,  pp: 10, desc: "May lower Defense." },
  "Population Bomb":{ type: "normal",   cat: "physical", pow: 20,  acc: 90, pp: 10, desc: "Hits 1-10 times." },
  "Tidy Up":        { type: "normal",   cat: "status",   pow: null,acc: null,pp: 10, desc: "Removes hazards, raises Attack and Speed." },
  // Fire
  "Flamethrower":   { type: "fire",     cat: "special",  pow: 90,  acc: 100, pp: 15, desc: "Has a 10% chance to burn." },
  "Fire Blast":     { type: "fire",     cat: "special",  pow: 110, acc: 85,  pp: 5,  desc: "Has a 10% chance to burn." },
  "Flare Blitz":    { type: "fire",     cat: "physical", pow: 120, acc: 100, pp: 15, desc: "User takes recoil. May burn." },
  "Heat Wave":      { type: "fire",     cat: "special",  pow: 95,  acc: 90,  pp: 10, desc: "Hits both adjacent foes. May burn." },
  "Overheat":       { type: "fire",     cat: "special",  pow: 130, acc: 90,  pp: 5,  desc: "Lowers user's Sp. Atk sharply." },
  "Will-O-Wisp":    { type: "fire",     cat: "status",   pow: null,acc: 85,  pp: 15, desc: "Burns the target." },
  "Fire Punch":     { type: "fire",     cat: "physical", pow: 75,  acc: 100, pp: 15, desc: "May burn the target." },
  "Mystical Fire":  { type: "fire",     cat: "special",  pow: 75,  acc: 100, pp: 10, desc: "Lowers target's Sp. Atk." },
  "Armor Cannon":   { type: "fire",     cat: "special",  pow: 120, acc: 100, pp: 5,  desc: "Lowers user's Def and Sp. Def." },
  // Water
  "Surf":           { type: "water",    cat: "special",  pow: 90,  acc: 100, pp: 15, desc: "Hits all adjacent Pokémon." },
  "Hydro Pump":     { type: "water",    cat: "special",  pow: 110, acc: 80,  pp: 5,  desc: "A powerful water-type attack." },
  "Scald":          { type: "water",    cat: "special",  pow: 80,  acc: 100, pp: 15, desc: "Has a 30% chance to burn." },
  "Aqua Jet":       { type: "water",    cat: "physical", pow: 40,  acc: 100, pp: 20, desc: "Always strikes first." },
  "Waterfall":      { type: "water",    cat: "physical", pow: 80,  acc: 100, pp: 15, desc: "May cause flinching." },
  "Liquidation":    { type: "water",    cat: "physical", pow: 85,  acc: 100, pp: 10, desc: "May lower Defense." },
  "Water Pulse":    { type: "water",    cat: "special",  pow: 60,  acc: 100, pp: 20, desc: "May confuse the target." },
  "Aura Sphere":    { type: "fighting", cat: "special",  pow: 80,  acc: null,pp: 20, desc: "This attack never misses." },
  "Crabhammer":     { type: "water",    cat: "physical", pow: 100, acc: 90,  pp: 10, desc: "High critical-hit ratio." },
  // Grass
  "Leaf Storm":     { type: "grass",    cat: "special",  pow: 130, acc: 90,  pp: 5,  desc: "Sharply lowers user's Sp. Atk." },
  "Energy Ball":    { type: "grass",    cat: "special",  pow: 90,  acc: 100, pp: 10, desc: "May lower Sp. Def." },
  "Leaf Blade":     { type: "grass",    cat: "physical", pow: 90,  acc: 100, pp: 15, desc: "High critical-hit ratio." },
  "Giga Drain":     { type: "grass",    cat: "special",  pow: 75,  acc: 100, pp: 10, desc: "Drains 50% of damage dealt." },
  "Power Whip":     { type: "grass",    cat: "physical", pow: 120, acc: 85,  pp: 10, desc: "The user violently whirls vines." },
  "Seed Bomb":      { type: "grass",    cat: "physical", pow: 80,  acc: 100, pp: 15, desc: "A barrage of hard seeds is fired." },
  "Sleep Powder":   { type: "grass",    cat: "status",   pow: null,acc: 75,  pp: 15, desc: "May put the foe to sleep." },
  "Spore":          { type: "grass",    cat: "status",   pow: null,acc: 100, pp: 15, desc: "Puts the target to sleep." },
  "Spiky Shield":   { type: "grass",    cat: "status",   pow: null,acc: null,pp: 10, desc: "Protects and damages attackers on contact." },
  "Trop Kick":      { type: "grass",    cat: "physical", pow: 70,  acc: 100, pp: 15, desc: "Lowers the target's Attack." },
  "Horn Leech":     { type: "grass",    cat: "physical", pow: 75,  acc: 100, pp: 10, desc: "Drains 50% of damage dealt." },
  "Grass Knot":     { type: "grass",    cat: "special",  pow: 80,  acc: 100, pp: 20, desc: "Power based on target's weight." },
  // Electric
  "Thunderbolt":    { type: "electric", cat: "special",  pow: 90,  acc: 100, pp: 15, desc: "Has a 10% chance to paralyze." },
  "Thunder":        { type: "electric", cat: "special",  pow: 110, acc: 70,  pp: 10, desc: "Has a 30% chance to paralyze." },
  "Volt Switch":    { type: "electric", cat: "special",  pow: 70,  acc: 100, pp: 20, desc: "Attacks and switches out." },
  "Wild Charge":    { type: "electric", cat: "physical", pow: 90,  acc: 100, pp: 15, desc: "User takes recoil damage." },
  "Thunder Wave":   { type: "electric", cat: "status",   pow: null,acc: 90,  pp: 20, desc: "Paralyzes the target." },
  "Discharge":      { type: "electric", cat: "special",  pow: 80,  acc: 100, pp: 15, desc: "Hits all adjacent Pokémon. May paralyze." },
  "Nuzzle":         { type: "electric", cat: "physical", pow: 20,  acc: 100, pp: 20, desc: "Always paralyzes the target." },
  "Thunder Punch":  { type: "electric", cat: "physical", pow: 75,  acc: 100, pp: 15, desc: "May paralyze the target." },
  // Ice
  "Ice Beam":       { type: "ice",      cat: "special",  pow: 90,  acc: 100, pp: 10, desc: "Has a 10% chance to freeze." },
  "Blizzard":       { type: "ice",      cat: "special",  pow: 110, acc: 70,  pp: 5,  desc: "Hits all adjacent foes. May freeze." },
  "Icicle Crash":   { type: "ice",      cat: "physical", pow: 85,  acc: 90,  pp: 10, desc: "May cause flinching." },
  "Ice Shard":      { type: "ice",      cat: "physical", pow: 40,  acc: 100, pp: 30, desc: "Always strikes first." },
  "Freeze-Dry":     { type: "ice",      cat: "special",  pow: 70,  acc: 100, pp: 20, desc: "Super effective against Water types." },
  "Ice Punch":      { type: "ice",      cat: "physical", pow: 75,  acc: 100, pp: 15, desc: "May freeze the target." },
  "Icy Wind":       { type: "ice",      cat: "special",  pow: 55,  acc: 95,  pp: 15, desc: "An icy attack that lowers Speed." },
  "Aurora Veil":    { type: "ice",      cat: "status",   pow: null,acc: null,pp: 20, desc: "Halves damage from physical and special moves for 5 turns. Only works in snow/hail." },
  // Fighting
  "Close Combat":   { type: "fighting", cat: "physical", pow: 120, acc: 100, pp: 5,  desc: "Lowers user's Def and Sp. Def." },
  "Drain Punch":    { type: "fighting", cat: "physical", pow: 75,  acc: 100, pp: 10, desc: "Drains 50% of damage dealt." },
  "High Jump Kick": { type: "fighting", cat: "physical", pow: 130, acc: 90,  pp: 10, desc: "Crash damage on miss." },
  "Focus Blast":    { type: "fighting", cat: "special",  pow: 120, acc: 70,  pp: 5,  desc: "May lower Sp. Def." },
  "Mach Punch":     { type: "fighting", cat: "physical", pow: 40,  acc: 100, pp: 30, desc: "Always strikes first." },
  "Superpower":     { type: "fighting", cat: "physical", pow: 120, acc: 100, pp: 5,  desc: "Lowers user's Attack and Defense." },
  "Low Kick":       { type: "fighting", cat: "physical", pow: 80,  acc: 100, pp: 20, desc: "Power based on target's weight." },
  "Brick Break":    { type: "fighting", cat: "physical", pow: 75,  acc: 100, pp: 15, desc: "Breaks screens. Reliable power." },
  "Hammer Arm":     { type: "fighting", cat: "physical", pow: 100, acc: 90,  pp: 10, desc: "Lowers user's Speed." },
  "Bulk Up":        { type: "fighting", cat: "status",   pow: null,acc: null,pp: 20, desc: "Raises Attack and Defense." },
  "Detect":         { type: "fighting", cat: "status",   pow: null,acc: null,pp: 5,  desc: "Evades all attacks. May fail if used in succession." },
  "Force Palm":     { type: "fighting", cat: "physical", pow: 60,  acc: 100, pp: 10, desc: "May paralyze the target." },
  "Ice Hammer":     { type: "ice",      cat: "physical", pow: 100, acc: 90,  pp: 10, desc: "Lowers user's Speed." },
  // Poison
  "Sludge Bomb":    { type: "poison",   cat: "special",  pow: 90,  acc: 100, pp: 10, desc: "Has a 30% chance to poison." },
  "Poison Jab":     { type: "poison",   cat: "physical", pow: 80,  acc: 100, pp: 20, desc: "Has a 30% chance to poison." },
  "Toxic":          { type: "poison",   cat: "status",   pow: null,acc: 90,  pp: 10, desc: "Badly poisons the target." },
  "Toxic Spikes":   { type: "poison",   cat: "status",   pow: null,acc: null,pp: 20, desc: "Sets poison spikes on the foe's side." },
  "Baneful Bunker": { type: "poison",   cat: "status",   pow: null,acc: null,pp: 10, desc: "Protects and poisons on contact." },
  "Venoshock":      { type: "poison",   cat: "special",  pow: 65,  acc: 100, pp: 10, desc: "Doubles power if target is poisoned." },
  // Ground
  "Earthquake":     { type: "ground",   cat: "physical", pow: 100, acc: 100, pp: 10, desc: "Hits all adjacent Pokémon." },
  "Earth Power":    { type: "ground",   cat: "special",  pow: 90,  acc: 100, pp: 10, desc: "May lower Sp. Def." },
  "High Horsepower":{ type: "ground",   cat: "physical", pow: 95,  acc: 95,  pp: 10, desc: "A powerful Ground-type attack." },
  "Stomping Tantrum":{ type: "ground",  cat: "physical", pow: 75,  acc: 100, pp: 10, desc: "Doubles power if last move failed." },
  "Stealth Rock":   { type: "rock",     cat: "status",   pow: null,acc: null,pp: 20, desc: "Sets floating stones around the foe." },
  "Spikes":         { type: "ground",   cat: "status",   pow: null,acc: null,pp: 20, desc: "Damages foe on switching in." },
  "Mud-Slap":       { type: "ground",   cat: "special",  pow: 20,  acc: 100, pp: 10, desc: "Lowers target's accuracy." },
  "Mud Shot":       { type: "ground",   cat: "special",  pow: 55,  acc: 95,  pp: 15, desc: "Lowers target's Speed." },
  "Scorching Sands":{ type: "ground",   cat: "special",  pow: 70,  acc: 100, pp: 10, desc: "May burn the target." },
  "Precipice Blades":{ type: "ground",  cat: "physical", pow: 120, acc: 85,  pp: 10, desc: "Hits all adjacent foes." },
  // Flying
  "Brave Bird":     { type: "flying",   cat: "physical", pow: 120, acc: 100, pp: 15, desc: "User takes recoil damage." },
  "Air Slash":      { type: "flying",   cat: "special",  pow: 75,  acc: 95,  pp: 15, desc: "May cause flinching." },
  "Hurricane":      { type: "flying",   cat: "special",  pow: 110, acc: 70,  pp: 10, desc: "May confuse. Never misses in rain." },
  "Tailwind":       { type: "flying",   cat: "status",   pow: null,acc: null,pp: 15, desc: "Doubles allies' Speed for 4 turns." },
  "Roost":          { type: "flying",   cat: "status",   pow: null,acc: null,pp: 5,  desc: "Heals 50% HP. Loses Flying type this turn." },
  "U-turn":         { type: "bug",      cat: "physical", pow: 70,  acc: 100, pp: 20, desc: "Attacks and switches out." },
  "Acrobatics":     { type: "flying",   cat: "physical", pow: 55,  acc: 100, pp: 15, desc: "Doubles power with no held item." },
  "Dual Wingbeat":  { type: "flying",   cat: "physical", pow: 40,  acc: 90,  pp: 10, desc: "Hits twice." },
  // Psychic
  "Psychic":        { type: "psychic",  cat: "special",  pow: 90,  acc: 100, pp: 10, desc: "May lower Sp. Def." },
  "Psyshock":       { type: "psychic",  cat: "special",  pow: 80,  acc: 100, pp: 10, desc: "Uses target's Defense stat." },
  "Shadow Ball":    { type: "ghost",    cat: "special",  pow: 80,  acc: 100, pp: 15, desc: "May lower Sp. Def." },
  "Trick Room":     { type: "psychic",  cat: "status",   pow: null,acc: null,pp: 5,  desc: "Slower Pokémon move first for 5 turns." },
  "Calm Mind":      { type: "psychic",  cat: "status",   pow: null,acc: null,pp: 20, desc: "Raises Sp. Atk and Sp. Def." },
  "Expanding Force":{ type: "psychic",  cat: "special",  pow: 80,  acc: 100, pp: 10, desc: "Boosted on Psychic Terrain." },
  "Zen Headbutt":   { type: "psychic",  cat: "physical", pow: 80,  acc: 90,  pp: 15, desc: "May cause flinching." },
  "Psycho Cut":     { type: "psychic",  cat: "physical", pow: 70,  acc: 100, pp: 20, desc: "High critical-hit ratio." },
  "Imprison":       { type: "psychic",  cat: "status",   pow: null,acc: null,pp: 10, desc: "Prevents foes from using moves the user knows." },
  "Stored Power":   { type: "psychic",  cat: "special",  pow: 20,  acc: 100, pp: 10, desc: "Power increases with stat boosts." },
  "Dazzling Gleam": { type: "fairy",    cat: "special",  pow: 80,  acc: 100, pp: 10, desc: "Hits both adjacent foes." },
  "Morning Sun":    { type: "normal",   cat: "status",   pow: null,acc: null,pp: 5,  desc: "Heals HP. More in sun." },
  // Bug
  "X-Scissor":      { type: "bug",      cat: "physical", pow: 80,  acc: 100, pp: 15, desc: "A scissor-like attack." },
  "Bug Buzz":       { type: "bug",      cat: "special",  pow: 90,  acc: 100, pp: 10, desc: "May lower Sp. Def." },
  "Fell Stinger":   { type: "bug",      cat: "physical", pow: 50,  acc: 100, pp: 25, desc: "Sharply raises Attack if it KOs." },
  "Pin Missile":    { type: "bug",      cat: "physical", pow: 25,  acc: 95,  pp: 20, desc: "Hits 2-5 times." },
  "Megahorn":       { type: "bug",      cat: "physical", pow: 120, acc: 85,  pp: 10, desc: "A powerful horn attack." },
  "Stone Axe":      { type: "rock",     cat: "physical", pow: 65,  acc: 90,  pp: 15, desc: "Sets Stealth Rock on the foe's side." },
  // Rock
  "Rock Slide":     { type: "rock",     cat: "physical", pow: 75,  acc: 90,  pp: 10, desc: "Hits all adjacent foes. May flinch." },
  "Stone Edge":     { type: "rock",     cat: "physical", pow: 100, acc: 80,  pp: 5,  desc: "High critical-hit ratio." },
  "Head Smash":     { type: "rock",     cat: "physical", pow: 150, acc: 80,  pp: 5,  desc: "User takes severe recoil damage." },
  "Accelerock":     { type: "rock",     cat: "physical", pow: 40,  acc: 100, pp: 20, desc: "Always goes first." },
  "Salt Cure":      { type: "rock",     cat: "physical", pow: 40,  acc: 100, pp: 15, desc: "Traps and damages foe each turn. Extra vs Water/Steel." },
  "Body Press":     { type: "fighting", cat: "physical", pow: 80,  acc: 100, pp: 10, desc: "Uses Defense stat instead of Attack." },
  "Iron Defense":   { type: "steel",    cat: "status",   pow: null,acc: null,pp: 15, desc: "Sharply raises Defense." },
  "Recover":        { type: "normal",   cat: "status",   pow: null,acc: null,pp: 5,  desc: "Heals 50% of max HP." },
  // Ghost
  "Shadow Claw":    { type: "ghost",    cat: "physical", pow: 70,  acc: 100, pp: 15, desc: "High critical-hit ratio." },
  "Phantom Force":  { type: "ghost",    cat: "physical", pow: 90,  acc: 100, pp: 10, desc: "Vanishes first turn, strikes second." },
  "Poltergeist":    { type: "ghost",    cat: "physical", pow: 110, acc: 90,  pp: 5,  desc: "Fails if foe has no item." },
  "Hex":            { type: "ghost",    cat: "special",  pow: 65,  acc: 100, pp: 10, desc: "Doubles power if target has a status condition." },
  "Destiny Bond":   { type: "ghost",    cat: "status",   pow: null,acc: null,pp: 5,  desc: "If the user faints, the attacker also faints." },
  "Shadow Sneak":   { type: "ghost",    cat: "physical", pow: 40,  acc: 100, pp: 30, desc: "Always strikes first." },
  "Night Shade":    { type: "ghost",    cat: "special",  pow: 50,  acc: 100, pp: 15, desc: "Deals damage equal to the user's level." },
  "Trick-or-Treat": { type: "ghost",    cat: "status",   pow: null,acc: 100, pp: 20, desc: "Adds Ghost type to the target." },
  // Dragon
  "Draco Meteor":   { type: "dragon",   cat: "special",  pow: 130, acc: 90,  pp: 5,  desc: "Sharply lowers user's Sp. Atk." },
  "Dragon Claw":    { type: "dragon",   cat: "physical", pow: 80,  acc: 100, pp: 15, desc: "A sharp claw attack." },
  "Dragon Pulse":   { type: "dragon",   cat: "special",  pow: 85,  acc: 100, pp: 10, desc: "A powerful pulse of draconic energy." },
  "Outrage":        { type: "dragon",   cat: "physical", pow: 120, acc: 100, pp: 10, desc: "Works 2-3 turns then confuses user." },
  "Dragon Dance":   { type: "dragon",   cat: "status",   pow: null,acc: null,pp: 20, desc: "Raises Attack and Speed." },
  "Dragon Tail":    { type: "dragon",   cat: "physical", pow: 60,  acc: 90,  pp: 10, desc: "Forces the target to switch out." },
  // Dark
  "Dark Pulse":     { type: "dark",     cat: "special",  pow: 80,  acc: 100, pp: 15, desc: "May cause flinching." },
  "Knock Off":      { type: "dark",     cat: "physical", pow: 65,  acc: 100, pp: 20, desc: "Removes the target's held item." },
  "Sucker Punch":   { type: "dark",     cat: "physical", pow: 70,  acc: 100, pp: 5,  desc: "Goes first. Fails if foe isn't attacking." },
  "Crunch":         { type: "dark",     cat: "physical", pow: 80,  acc: 100, pp: 15, desc: "May lower Defense." },
  "Foul Play":      { type: "dark",     cat: "physical", pow: 95,  acc: 100, pp: 15, desc: "Uses the target's Attack stat." },
  "Snarl":          { type: "dark",     cat: "special",  pow: 55,  acc: 95,  pp: 15, desc: "Hits all adjacent foes. Lowers Sp. Atk." },
  "Night Slash":    { type: "dark",     cat: "physical", pow: 70,  acc: 100, pp: 15, desc: "High critical-hit ratio." },
  "Parting Shot":   { type: "dark",     cat: "status",   pow: null,acc: 100, pp: 20, desc: "Lowers foe's Attack and Sp. Atk, then switches." },
  "Taunt":          { type: "dark",     cat: "status",   pow: null,acc: 100, pp: 20, desc: "Prevents the target from using status moves." },
  "Kowtow Cleave":  { type: "dark",     cat: "physical", pow: 85,  acc: null,pp: 10, desc: "This attack never misses." },
  // Steel
  "Iron Head":      { type: "steel",    cat: "physical", pow: 80,  acc: 100, pp: 15, desc: "May cause flinching." },
  "Flash Cannon":   { type: "steel",    cat: "special",  pow: 80,  acc: 100, pp: 10, desc: "May lower Sp. Def." },
  "Bullet Punch":   { type: "steel",    cat: "physical", pow: 40,  acc: 100, pp: 30, desc: "Always strikes first." },
  "Metal Burst":    { type: "steel",    cat: "physical", pow: null,acc: 100, pp: 10, desc: "Returns 1.5x damage taken." },
  "Heavy Slam":     { type: "steel",    cat: "physical", pow: 80,  acc: 100, pp: 10, desc: "Deals more damage the heavier the user is." },
  "Gyro Ball":      { type: "steel",    cat: "physical", pow: 80,  acc: 100, pp: 5,  desc: "Deals more damage the slower the user is." },
  "King's Shield":  { type: "steel",    cat: "status",   pow: null,acc: null,pp: 10, desc: "Protects and lowers attacker's Attack." },
  "Steel Beam":     { type: "steel",    cat: "special",  pow: 140, acc: 95,  pp: 5,  desc: "User takes recoil damage." },
  "Make It Rain":   { type: "steel",    cat: "special",  pow: 120, acc: 100, pp: 5,  desc: "Hits all adjacent foes. Lowers user's Sp. Atk." },
  "Gigaton Hammer": { type: "steel",    cat: "physical", pow: 160, acc: 100, pp: 5,  desc: "Can't be used consecutively." },
  // Fairy
  "Moonblast":      { type: "fairy",    cat: "special",  pow: 95,  acc: 100, pp: 15, desc: "May lower Sp. Atk." },
  "Play Rough":     { type: "fairy",    cat: "physical", pow: 90,  acc: 90,  pp: 10, desc: "May lower Attack." },
  "Spirit Break":   { type: "fairy",    cat: "physical", pow: 75,  acc: 100, pp: 15, desc: "Lowers Sp. Atk of the target." },
  "Light Screen":   { type: "psychic",  cat: "status",   pow: null,acc: null,pp: 30, desc: "Halves special damage for 5 turns." },
  "Reflect":        { type: "psychic",  cat: "status",   pow: null,acc: null,pp: 20, desc: "Halves physical damage for 5 turns." },
  "Misty Terrain":  { type: "fairy",    cat: "status",   pow: null,acc: null,pp: 10, desc: "Prevents status and halves Dragon damage." },
  "Charm":          { type: "fairy",    cat: "status",   pow: null,acc: 100, pp: 20, desc: "Sharply lowers target's Attack." },
  "Encore":         { type: "normal",   cat: "status",   pow: null,acc: 100, pp: 5,  desc: "Forces the target to repeat its last move." },
  "Thunder Fang":   { type: "electric", cat: "physical", pow: 65,  acc: 95,  pp: 15, desc: "May cause flinching or paralysis." },
  "Iron Tail":      { type: "steel",    cat: "physical", pow: 100, acc: 75,  pp: 15, desc: "May lower Defense." },
  "Gunk Shot":      { type: "poison",   cat: "physical", pow: 120, acc: 80,  pp: 5,  desc: "May poison the target." },
  "Wicked Blow":    { type: "dark",     cat: "physical", pow: 75,  acc: 100, pp: 5,  desc: "Always a critical hit." },
  "Wood Hammer":    { type: "grass",    cat: "physical", pow: 120, acc: 100, pp: 15, desc: "User takes recoil damage." },
  "Throat Chop":    { type: "dark",     cat: "physical", pow: 80,  acc: 100, pp: 15, desc: "Prevents sound-based moves for 2 turns." },
  "Trailblaze":     { type: "grass",    cat: "physical", pow: 50,  acc: 100, pp: 20, desc: "Raises user's Speed." },
  "Seed Flare":     { type: "grass",    cat: "special",  pow: 120, acc: 85,  pp: 5,  desc: "May sharply lower Sp. Def." },
  "Close Combat":   { type: "fighting", cat: "physical", pow: 120, acc: 100, pp: 5,  desc: "Lowers user's Def and Sp. Def." },
  "Floral Healing": { type: "fairy",    cat: "status",   pow: null,acc: null,pp: 10, desc: "Heals an ally by 50% HP. More on Grassy Terrain." },
};

function m(name) {
  const d = MOVES[name];
  if (!d) throw new Error(`Move not found: ${name}`);
  return { name, type: d.type, category: d.cat, power: d.pow, accuracy: d.acc, pp: d.pp, description: d.desc };
}
function ab(name, desc, hidden = false, champ = false) {
  const o = { name, description: desc };
  if (champ) o.isChampions = true;
  else o.isHidden = hidden;
  return o;
}

// ── NEW POKEMON DEFINITIONS ────────────────────────────────────
const NEW_POKEMON = [
  {
    id: 15, name: "Beedrill", types: ["bug","poison"], gen: 1, tier: "B",
    stats: { hp:65, attack:90, defense:40, spAtk:45, spDef:80, speed:75 },
    abilities: [
      ab("Swarm", "Powers up Bug-type moves when HP is low."),
      ab("Sniper", "Powers up moves if they are critical hits.", true),
    ],
    moveNames: ["Poison Jab","X-Scissor","U-turn","Drill Run","Swords Dance","Knock Off","Pin Missile","Fell Stinger","Brick Break","Protect"],
    hasMega: true,
    mega: { name:"Mega Beedrill", sprite:SPRITE(10090), types:["bug","poison"],
      stats:{hp:65,attack:150,defense:40,spAtk:15,spDef:80,speed:145},
      abilities:[ab("Adaptability","Powers up same-type moves even further.",false,false)]
    },
  },
  {
    id: 18, name: "Pidgeot", types: ["normal","flying"], gen: 1, tier: "B",
    stats: { hp:83, attack:80, defense:75, spAtk:70, spDef:70, speed:101 },
    abilities: [
      ab("Keen Eye", "Prevents accuracy loss."),
      ab("Big Pecks", "Prevents Defense loss.", true),
    ],
    moveNames: ["Brave Bird","Hurricane","Air Slash","Heat Wave","U-turn","Quick Attack","Roost","Tailwind","Protect","Hyper Beam"],
    hasMega: true,
    mega: { name:"Mega Pidgeot", sprite:SPRITE(10073), types:["normal","flying"],
      stats:{hp:83,attack:80,defense:80,spAtk:135,spDef:80,speed:121},
      abilities:[ab("No Guard","All moves used by or against this Pokémon will always hit.",false,false)]
    },
  },
  {
    id: 59, name: "Arcanine", types: ["fire"], gen: 1, tier: "A",
    stats: { hp:90, attack:110, defense:80, spAtk:100, spDef:80, speed:95 },
    abilities: [
      ab("Intimidate", "Lowers adjacent opponents' Attack by one stage upon entering battle."),
      ab("Flash Fire", "Powers up Fire-type moves if hit by one.", false),
      ab("Justified", "Raises Attack when hit by a Dark-type move.", true),
    ],
    moveNames: ["Flare Blitz","Extreme Speed","Close Combat","Wild Charge","Will-O-Wisp","Morning Sun","Snarl","Protect","Crunch","Helping Hand"],
  },
  {
    id: 65, name: "Alakazam", types: ["psychic"], gen: 1, tier: "A",
    stats: { hp:55, attack:50, defense:45, spAtk:135, spDef:95, speed:120 },
    abilities: [
      ab("Synchronize", "Passes poison, paralysis, or burn to the attacker."),
      ab("Inner Focus", "Prevents flinching."),
      ab("Magic Guard", "Only takes damage from attacks.", true),
    ],
    moveNames: ["Psychic","Psyshock","Shadow Ball","Focus Blast","Dazzling Gleam","Energy Ball","Thunder Wave","Calm Mind","Protect","Encore"],
    hasMega: true,
    mega: { name:"Mega Alakazam", sprite:SPRITE(10065), types:["psychic"],
      stats:{hp:55,attack:50,defense:65,spAtk:175,spDef:105,speed:150},
      abilities:[ab("Trace","Copies the foe's ability.",false,false)]
    },
  },
  {
    id: 71, name: "Victreebel", types: ["grass","poison"], gen: 1, tier: "C",
    stats: { hp:80, attack:105, defense:65, spAtk:100, spDef:70, speed:70 },
    abilities: [
      ab("Chlorophyll", "Doubles Speed in sun."),
      ab("Gluttony", "Eats held berries at 50% HP instead of 25%.", true),
    ],
    moveNames: ["Leaf Storm","Sludge Bomb","Sleep Powder","Power Whip","Knock Off","Sucker Punch","Leaf Blade","Energy Ball","Protect","Encore"],
  },
  {
    id: 132, name: "Ditto", types: ["normal"], gen: 1, tier: "C",
    stats: { hp:48, attack:48, defense:48, spAtk:48, spDef:48, speed:48 },
    abilities: [
      ab("Limber", "Prevents paralysis."),
      ab("Imposter", "Transforms into the foe on entry.", true),
    ],
    moveNames: ["Transform"],
  },
  {
    id: 184, name: "Azumarill", types: ["water","fairy"], gen: 2, tier: "A",
    stats: { hp:100, attack:50, defense:80, spAtk:60, spDef:80, speed:50 },
    abilities: [
      ab("Thick Fat", "Halves damage from Fire and Ice-type moves."),
      ab("Huge Power", "Doubles the Pokémon's Attack stat."),
      ab("Sap Sipper", "Raises Attack when hit by Grass-type moves.", true),
    ],
    moveNames: ["Play Rough","Aqua Jet","Liquidation","Superpower","Knock Off","Belly Drum","Ice Punch","Protect","Helping Hand","Brick Break"],
  },
  {
    id: 196, name: "Espeon", types: ["psychic"], gen: 2, tier: "B",
    stats: { hp:65, attack:65, defense:60, spAtk:130, spDef:95, speed:110 },
    abilities: [
      ab("Synchronize", "Passes poison, paralysis, or burn to the attacker."),
      ab("Magic Bounce", "Reflects status moves back.", true),
    ],
    moveNames: ["Psychic","Psyshock","Shadow Ball","Dazzling Gleam","Calm Mind","Morning Sun","Trick Room","Protect","Stored Power","Helping Hand"],
  },
  {
    id: 208, name: "Steelix", types: ["steel","ground"], gen: 2, tier: "B",
    stats: { hp:75, attack:85, defense:200, spAtk:55, spDef:65, speed:30 },
    abilities: [
      ab("Rock Head", "Prevents recoil damage."),
      ab("Sturdy", "Survives with 1 HP from a would-be KO at full HP."),
      ab("Sheer Force", "Removes secondary effects but boosts power by 30%.", true),
    ],
    moveNames: ["Earthquake","Iron Head","Stone Edge","Heavy Slam","Stealth Rock","Body Press","Dragon Tail","Protect","Gyro Ball","Explosion"],
  },
  {
    id: 306, name: "Aggron", types: ["steel","rock"], gen: 3, tier: "B",
    stats: { hp:70, attack:110, defense:180, spAtk:60, spDef:60, speed:50 },
    abilities: [
      ab("Sturdy", "Survives with 1 HP from a would-be KO at full HP."),
      ab("Rock Head", "Prevents recoil damage."),
      ab("Heavy Metal", "Doubles the Pokémon's weight.", true),
    ],
    moveNames: ["Iron Head","Stone Edge","Head Smash","Earthquake","Heavy Slam","Body Press","Stealth Rock","Iron Defense","Protect","Rock Slide"],
    hasMega: true,
    mega: { name:"Mega Aggron", sprite:SPRITE(10071), types:["steel"],
      stats:{hp:70,attack:140,defense:230,spAtk:60,spDef:80,speed:50},
      abilities:[ab("Filter","Reduces super-effective damage by 25%.",false,false)]
    },
  },
  {
    id: 308, name: "Medicham", types: ["fighting","psychic"], gen: 3, tier: "B",
    stats: { hp:60, attack:60, defense:75, spAtk:60, spDef:75, speed:80 },
    abilities: [
      ab("Pure Power", "Doubles the Pokémon's Attack stat."),
      ab("Telepathy", "Avoids damage from allies.", true),
    ],
    moveNames: ["Close Combat","Zen Headbutt","Ice Punch","Thunder Punch","Bullet Punch","Fake Out","Psycho Cut","Drain Punch","Protect","Detect"],
    hasMega: true,
    mega: { name:"Mega Medicham", sprite:SPRITE(10076), types:["fighting","psychic"],
      stats:{hp:60,attack:100,defense:85,spAtk:80,spDef:85,speed:100},
      abilities:[ab("Pure Power","Doubles the Pokémon's Attack stat.",false,false)]
    },
  },
  {
    id: 310, name: "Manectric", types: ["electric"], gen: 3, tier: "B",
    stats: { hp:70, attack:75, defense:60, spAtk:105, spDef:60, speed:105 },
    abilities: [
      ab("Static", "Has a 30% chance of paralyzing on contact."),
      ab("Lightning Rod", "Redirects single-target Electric moves. Absorbs them, raising Sp. Atk."),
      ab("Minus", "Raises Sp. Atk when an ally with Plus/Minus is present.", true),
    ],
    moveNames: ["Thunderbolt","Volt Switch","Overheat","Flamethrower","Snarl","Thunder Wave","Protect","Discharge","Wild Charge","Hyper Voice"],
    hasMega: true,
    mega: { name:"Mega Manectric", sprite:SPRITE(10077), types:["electric"],
      stats:{hp:70,attack:75,defense:80,spAtk:135,spDef:80,speed:135},
      abilities:[ab("Intimidate","Lowers adjacent opponents' Attack by one stage upon entering battle.",false,false)]
    },
  },
  {
    id: 319, name: "Sharpedo", types: ["water","dark"], gen: 3, tier: "B",
    stats: { hp:70, attack:120, defense:40, spAtk:95, spDef:40, speed:95 },
    abilities: [
      ab("Rough Skin", "Damages attackers on contact."),
      ab("Speed Boost", "Raises Speed at the end of each turn.", false),
      ab("Speed Boost", "Raises Speed at the end of each turn.", true),
    ],
    moveNames: ["Crunch","Liquidation","Ice Fang","Poison Jab","Close Combat","Psychic Fangs","Protect","Waterfall","Aqua Jet","Destiny Bond"],
  },
  {
    id: 323, name: "Camerupt", types: ["fire","ground"], gen: 3, tier: "C",
    stats: { hp:70, attack:100, defense:70, spAtk:105, spDef:75, speed:40 },
    abilities: [
      ab("Magma Armor", "Prevents freezing."),
      ab("Solid Rock", "Reduces super-effective damage by 25%."),
      ab("Anger Point", "Maximizes Attack on critical hit.", true),
    ],
    moveNames: ["Heat Wave","Earth Power","Fire Blast","Flamethrower","Earthquake","Stealth Rock","Rock Slide","Protect","Overheat","Eruption"],
    hasMega: true,
    mega: { name:"Mega Camerupt", sprite:SPRITE(10087), types:["fire","ground"],
      stats:{hp:70,attack:120,defense:100,spAtk:145,spDef:105,speed:20},
      abilities:[ab("Sheer Force","Removes secondary effects but boosts power by 30%.",false,false)]
    },
  },
  {
    id: 354, name: "Banette", types: ["ghost"], gen: 3, tier: "C",
    stats: { hp:64, attack:115, defense:65, spAtk:83, spDef:63, speed:65 },
    abilities: [
      ab("Insomnia", "Prevents sleep."),
      ab("Frisk", "Reveals the foe's held item."),
      ab("Cursed Body", "May disable a move used on it.", true),
    ],
    moveNames: ["Shadow Claw","Shadow Sneak","Knock Off","Will-O-Wisp","Destiny Bond","Sucker Punch","Phantom Force","Trick-or-Treat","Protect","Taunt"],
    hasMega: true,
    mega: { name:"Mega Banette", sprite:SPRITE(10056), types:["ghost"],
      stats:{hp:64,attack:165,defense:75,spAtk:93,spDef:83,speed:75},
      abilities:[ab("Prankster","Status moves gain +1 priority.",false,false)]
    },
  },
  {
    id: 362, name: "Glalie", types: ["ice"], gen: 3, tier: "C",
    stats: { hp:80, attack:80, defense:80, spAtk:80, spDef:80, speed:80 },
    abilities: [
      ab("Inner Focus", "Prevents flinching."),
      ab("Ice Body", "Heals in hail."),
      ab("Moody", "Raises one random stat sharply and lowers another.", true),
    ],
    moveNames: ["Ice Beam","Freeze-Dry","Earthquake","Crunch","Ice Shard","Explosion","Protect","Icy Wind","Body Press","Iron Head"],
    hasMega: true,
    mega: { name:"Mega Glalie", sprite:SPRITE(10074), types:["ice"],
      stats:{hp:80,attack:120,defense:80,spAtk:120,spDef:80,speed:100},
      abilities:[ab("Refrigerate","Normal-type moves become Ice-type with a 20% power boost.",false,false)]
    },
  },
  {
    id: 428, name: "Lopunny", types: ["normal"], gen: 4, tier: "B",
    stats: { hp:65, attack:76, defense:84, spAtk:54, spDef:96, speed:105 },
    abilities: [
      ab("Cute Charm", "Contact may cause infatuation."),
      ab("Klutz", "Can't use held items."),
      ab("Limber", "Prevents paralysis.", true),
    ],
    moveNames: ["Return","High Jump Kick","Fake Out","Ice Punch","Thunder Punch","Encore","Protect","U-turn","Drain Punch","Knock Off"],
    hasMega: true,
    mega: { name:"Mega Lopunny", sprite:SPRITE(10088), types:["normal","fighting"],
      stats:{hp:65,attack:136,defense:94,spAtk:54,spDef:96,speed:135},
      abilities:[ab("Scrappy","Can hit Ghost types with Normal and Fighting moves.",false,false)]
    },
  },
  {
    id: 442, name: "Spiritomb", types: ["ghost","dark"], gen: 4, tier: "B",
    stats: { hp:50, attack:92, defense:108, spAtk:92, spDef:108, speed:35 },
    abilities: [
      ab("Pressure", "Moves targeting this Pokémon use 2 PP."),
      ab("Infiltrator", "Ignores screens and Substitute.", true),
    ],
    moveNames: ["Shadow Ball","Dark Pulse","Sucker Punch","Will-O-Wisp","Foul Play","Calm Mind","Taunt","Protect","Snarl","Trick Room"],
  },
  {
    id: 460, name: "Abomasnow", types: ["grass","ice"], gen: 4, tier: "B",
    stats: { hp:90, attack:92, defense:75, spAtk:92, spDef:85, speed:60 },
    abilities: [
      ab("Snow Warning", "Summons hail/snow when entering battle."),
      ab("Soundproof", "Immune to sound-based moves.", true),
    ],
    moveNames: ["Blizzard","Energy Ball","Ice Shard","Wood Hammer","Earthquake","Aurora Veil","Protect","Leaf Storm","Giga Drain","Icy Wind"],
    hasMega: true,
    mega: { name:"Mega Abomasnow", sprite:SPRITE(10060), types:["grass","ice"],
      stats:{hp:90,attack:132,defense:105,spAtk:132,spDef:105,speed:30},
      abilities:[ab("Snow Warning","Summons hail/snow when entering battle.",false,false)]
    },
  },
  {
    id: 473, name: "Mamoswine", types: ["ice","ground"], gen: 4, tier: "A",
    stats: { hp:110, attack:130, defense:80, spAtk:70, spDef:60, speed:80 },
    abilities: [
      ab("Oblivious", "Prevents infatuation and Taunt."),
      ab("Snow Cloak", "Raises evasion in hail."),
      ab("Thick Fat", "Halves damage from Fire and Ice-type moves.", true),
    ],
    moveNames: ["Earthquake","Icicle Crash","Ice Shard","Superpower","Knock Off","Rock Slide","Stealth Rock","Protect","High Horsepower","Stone Edge"],
  },
  {
    id: 475, name: "Gallade", types: ["psychic","fighting"], gen: 4, tier: "B",
    stats: { hp:68, attack:125, defense:65, spAtk:65, spDef:115, speed:80 },
    abilities: [
      ab("Steadfast", "Raises Speed when flinched."),
      ab("Sharpness", "Powers up slicing moves.", false),
      ab("Justified", "Raises Attack when hit by Dark-type moves.", true),
    ],
    moveNames: ["Close Combat","Psycho Cut","Leaf Blade","Knock Off","Ice Punch","Swords Dance","Zen Headbutt","Shadow Sneak","Protect","Drain Punch"],
    hasMega: true,
    mega: { name:"Mega Gallade", sprite:SPRITE(10068), types:["psychic","fighting"],
      stats:{hp:68,attack:165,defense:95,spAtk:65,spDef:115,speed:110},
      abilities:[ab("Inner Focus","Prevents flinching.",false,false)]
    },
  },
  {
    id: 623, name: "Golurk", types: ["ground","ghost"], gen: 5, tier: "C",
    stats: { hp:89, attack:124, defense:80, spAtk:55, spDef:80, speed:55 },
    abilities: [
      ab("Iron Fist", "Powers up punching moves by 20%."),
      ab("Klutz", "Can't use held items."),
      ab("No Guard", "All moves used by or against always hit.", true),
    ],
    moveNames: ["Earthquake","Poltergeist","Shadow Punch","Ice Punch","Thunder Punch","Drain Punch","Rock Slide","Stealth Rock","Protect","Phantom Force"],
  },
  {
    id: 670, name: "Floette", types: ["fairy"], gen: 6, tier: "C",
    stats: { hp:54, attack:45, defense:47, spAtk:75, spDef:98, speed:52 },
    abilities: [
      ab("Flower Veil", "Protects Grass-type allies from stat reduction and status."),
      ab("Symbiosis", "Passes held item to an ally that uses theirs.", true),
    ],
    moveNames: ["Moonblast","Dazzling Gleam","Psychic","Energy Ball","Calm Mind","Protect","Helping Hand","Floral Healing","Light Screen","Wish"],
    hasMega: true,
    mega: { name:"Mega Floette", sprite:SPRITE(10061), types:["fairy"],
      stats:{hp:74,attack:65,defense:67,spAtk:125,spDef:128,speed:92},
      abilities:[ab("Flower Power","Fairy and Grass-type moves gain 30% power. Allies' Sp. Def boosted by 10%.",false,true)]
    },
  },
  {
    id: 676, name: "Furfrou", types: ["normal"], gen: 6, tier: "C",
    stats: { hp:75, attack:80, defense:60, spAtk:65, spDef:90, speed:102 },
    abilities: [
      ab("Fur Coat", "Halves damage from physical moves."),
    ],
    moveNames: ["Return","Sucker Punch","U-turn","Wild Charge","Thunder Wave","Charm","Protect","Helping Hand","Snarl","Cotton Guard"],
  },
  {
    id: 693, name: "Clawitzer", types: ["water"], gen: 6, tier: "B",
    stats: { hp:71, attack:73, defense:88, spAtk:120, spDef:89, speed:59 },
    abilities: [
      ab("Mega Launcher", "Powers up pulse and aura moves by 50%."),
    ],
    moveNames: ["Water Pulse","Dark Pulse","Aura Sphere","Dragon Pulse","Ice Beam","Crabhammer","U-turn","Protect","Helping Hand","Scald"],
  },
  {
    id: 706, name: "Goodra", types: ["dragon"], gen: 6, tier: "B",
    stats: { hp:90, attack:100, defense:70, spAtk:110, spDef:150, speed:80 },
    abilities: [
      ab("Sap Sipper", "Raises Attack when hit by Grass-type moves."),
      ab("Hydration", "Heals status in rain."),
      ab("Gooey", "Contact lowers attacker's Speed.", true),
    ],
    moveNames: ["Draco Meteor","Dragon Pulse","Fire Blast","Sludge Bomb","Thunderbolt","Ice Beam","Power Whip","Protect","Muddy Water","Acid Spray"],
  },
  {
    id: 709, name: "Trevenant", types: ["ghost","grass"], gen: 6, tier: "C",
    stats: { hp:85, attack:110, defense:76, spAtk:65, spDef:82, speed:56 },
    abilities: [
      ab("Natural Cure", "Heals status when switching out."),
      ab("Frisk", "Reveals the foe's held item."),
      ab("Harvest", "May restore a consumed berry at end of turn.", true),
    ],
    moveNames: ["Wood Hammer","Shadow Claw","Horn Leech","Phantom Force","Will-O-Wisp","Trick Room","Protect","Drain Punch","Rock Slide","Leech Seed"],
  },
  {
    id: 713, name: "Avalugg", types: ["ice"], gen: 6, tier: "C",
    stats: { hp:95, attack:117, defense:184, spAtk:44, spDef:46, speed:28 },
    abilities: [
      ab("Own Tempo", "Prevents confusion."),
      ab("Ice Body", "Heals in hail."),
      ab("Sturdy", "Survives with 1 HP from a would-be KO at full HP.", true),
    ],
    moveNames: ["Avalanche","Body Press","Earthquake","Heavy Slam","Rapid Spin","Recover","Iron Defense","Protect","Rock Slide","Crunch"],
  },
  {
    id: 750, name: "Mudsdale", types: ["ground"], gen: 7, tier: "B",
    stats: { hp:100, attack:125, defense:100, spAtk:55, spDef:85, speed:35 },
    abilities: [
      ab("Own Tempo", "Prevents confusion."),
      ab("Stamina", "Raises Defense when hit."),
      ab("Inner Focus", "Prevents flinching.", true),
    ],
    moveNames: ["High Horsepower","Earthquake","Rock Slide","Heavy Slam","Close Combat","Body Press","Stealth Rock","Protect","Iron Head","Stomping Tantrum"],
  },
  {
    id: 823, name: "Corviknight", types: ["flying","steel"], gen: 8, tier: "A",
    stats: { hp:98, attack:87, defense:105, spAtk:53, spDef:85, speed:67 },
    abilities: [
      ab("Pressure", "Moves targeting this Pokémon use 2 PP."),
      ab("Unnerve", "Prevents foes from eating berries."),
      ab("Mirror Armor", "Reflects stat-lowering effects back.", true),
    ],
    moveNames: ["Brave Bird","Iron Head","Body Press","U-turn","Roost","Tailwind","Protect","Bulk Up","Iron Defense","Reflect"],
  },
  {
    id: 861, name: "Grimmsnarl", types: ["dark","fairy"], gen: 8, tier: "A",
    stats: { hp:95, attack:120, defense:65, spAtk:95, spDef:75, speed:60 },
    abilities: [
      ab("Prankster", "Status moves gain +1 priority."),
      ab("Frisk", "Reveals the foe's held item."),
      ab("Pickpocket", "Steals held item on contact.", true),
    ],
    moveNames: ["Spirit Break","Sucker Punch","Play Rough","Darkest Lariat","Light Screen","Reflect","Thunder Wave","Taunt","Fake Out","Protect"],
  },
  {
    id: 867, name: "Runerigus", types: ["ground","ghost"], gen: 8, tier: "C",
    stats: { hp:58, attack:95, defense:145, spAtk:50, spDef:105, speed:30 },
    abilities: [
      ab("Wandering Spirit", "Exchanges ability with attacker on contact."),
    ],
    moveNames: ["Earthquake","Shadow Claw","Body Press","Stealth Rock","Will-O-Wisp","Trick Room","Protect","Iron Defense","Toxic Spikes","Rock Slide"],
  },
  {
    id: 934, name: "Garganacl", types: ["rock"], gen: 9, tier: "A",
    stats: { hp:100, attack:100, defense:130, spAtk:45, spDef:90, speed:35 },
    abilities: [
      ab("Purifying Salt", "Prevents status and halves Ghost damage."),
      ab("Sturdy", "Survives with 1 HP from a would-be KO at full HP."),
      ab("Clear Body", "Prevents stat reduction.", true),
    ],
    moveNames: ["Salt Cure","Body Press","Rock Slide","Earthquake","Heavy Slam","Iron Defense","Stealth Rock","Protect","Recover","Explosion"],
  },
  {
    id: 981, name: "Farigiraf", types: ["normal","psychic"], gen: 9, tier: "B",
    stats: { hp:120, attack:90, defense:70, spAtk:110, spDef:70, speed:60 },
    abilities: [
      ab("Cud Chew", "Eats a consumed berry again at end of next turn."),
      ab("Armor Tail", "Prevents priority moves against this Pokémon and allies."),
      ab("Sap Sipper", "Raises Attack when hit by Grass-type moves.", true),
    ],
    moveNames: ["Hyper Voice","Psychic","Psyshock","Dazzling Gleam","Thunderbolt","Trick Room","Protect","Helping Hand","Nasty Plot","Shadow Ball"],
  },
];

// ── ADDITIONAL MOVES FOR AZUMARILL ──
MOVES["Belly Drum"]    = { type: "normal",   cat: "status",  pow: null, acc: null, pp: 10, desc: "Maximizes Attack at the cost of half max HP." };
MOVES["Wish"]          = { type: "normal",   cat: "status",  pow: null, acc: null, pp: 10, desc: "Heals HP next turn." };
MOVES["Cotton Guard"]  = { type: "grass",    cat: "status",  pow: null, acc: null, pp: 10, desc: "Sharply raises Defense by 3 stages." };
MOVES["Leech Seed"]    = { type: "grass",    cat: "status",  pow: null, acc: 90,  pp: 10, desc: "Drains HP from foe each turn." };
MOVES["Drill Run"]     = { type: "ground",   cat: "physical",pow: 80,   acc: 95,  pp: 10, desc: "High critical-hit ratio." };
MOVES["Shadow Punch"]  = { type: "ghost",    cat: "physical",pow: 60,   acc: null,pp: 20, desc: "This attack never misses." };
MOVES["Psychic Fangs"] = { type: "psychic",  cat: "physical",pow: 85,   acc: 100, pp: 10, desc: "Breaks screens." };
MOVES["Ice Fang"]      = { type: "ice",      cat: "physical",pow: 65,   acc: 95,  pp: 15, desc: "May freeze or flinch." };
MOVES["Avalanche"]     = { type: "ice",      cat: "physical",pow: 60,   acc: 100, pp: 10, desc: "Doubles power if user was hit first." };
MOVES["Darkest Lariat"]= { type: "dark",     cat: "physical",pow: 85,   acc: 100, pp: 10, desc: "Ignores target's stat changes." };
MOVES["Nasty Plot"]    = { type: "dark",     cat: "status",  pow: null, acc: null, pp: 20, desc: "Sharply raises Sp. Atk." };
MOVES["Acid Spray"]    = { type: "poison",   cat: "special", pow: 40,   acc: 100, pp: 20, desc: "Sharply lowers Sp. Def." };
MOVES["Muddy Water"]   = { type: "water",    cat: "special", pow: 90,   acc: 85,  pp: 10, desc: "May lower accuracy. Hits both foes." };
MOVES["Eruption"]      = { type: "fire",     cat: "special", pow: 150,  acc: 100, pp: 5,  desc: "Power scales with user's remaining HP." };

// ── USAGE DATA FOR NEW POKEMON ─────────────────────────────────
const NEW_USAGE = {
  15: [ // Beedrill
    { name: "Mega Lead", nature: "Jolly", ability: "Adaptability", item: "Beedrillite", moves: ["U-turn","Poison Jab","X-Scissor","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "steel" },
    { name: "Swords Dance", nature: "Jolly", ability: "Adaptability", item: "Beedrillite", moves: ["Swords Dance","Poison Jab","Drill Run","Protect"], sp: {hp:4,attack:32,defense:0,spAtk:0,spDef:0,speed:30}, teraType: "ground" },
    { name: "Non-Mega Pivot", nature: "Jolly", ability: "Swarm", item: "Focus Sash", moves: ["U-turn","Poison Jab","Fell Stinger","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "steel" },
  ],
  18: [ // Pidgeot
    { name: "Mega Special", nature: "Timid", ability: "No Guard", item: "Pidgeotite", moves: ["Hurricane","Heat Wave","U-turn","Protect"], sp: {hp:4,attack:0,defense:0,spAtk:32,spDef:0,speed:30}, teraType: "ground" },
    { name: "Tailwind Lead", nature: "Timid", ability: "No Guard", item: "Pidgeotite", moves: ["Hurricane","Tailwind","Heat Wave","Protect"], sp: {hp:20,attack:0,defense:2,spAtk:32,spDef:0,speed:12}, teraType: "steel" },
  ],
  59: [ // Arcanine
    { name: "Intimidate Support", nature: "Adamant", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz","Extreme Speed","Will-O-Wisp","Protect"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "grass" },
    { name: "AV Attacker", nature: "Adamant", ability: "Intimidate", item: "Assault Vest", moves: ["Flare Blitz","Extreme Speed","Close Combat","Crunch"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "water" },
    { name: "Bulky Wisp", nature: "Impish", ability: "Intimidate", item: "Leftovers", moves: ["Will-O-Wisp","Flare Blitz","Morning Sun","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "water" },
    { name: "Scarf", nature: "Jolly", ability: "Intimidate", item: "Choice Scarf", moves: ["Flare Blitz","Close Combat","Wild Charge","Extreme Speed"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "fighting" },
  ],
  65: [ // Alakazam
    { name: "Mega Attacker", nature: "Timid", ability: "Trace", item: "Alakazite", moves: ["Psychic","Shadow Ball","Focus Blast","Protect"], sp: {hp:0,attack:0,defense:2,spAtk:32,spDef:0,speed:32}, teraType: "ghost" },
    { name: "Sash Lead", nature: "Timid", ability: "Magic Guard", item: "Focus Sash", moves: ["Psychic","Dazzling Gleam","Shadow Ball","Protect"], sp: {hp:0,attack:0,defense:2,spAtk:32,spDef:0,speed:32}, teraType: "fairy" },
    { name: "Calm Mind", nature: "Timid", ability: "Magic Guard", item: "Life Orb", moves: ["Psyshock","Shadow Ball","Calm Mind","Protect"], sp: {hp:4,attack:0,defense:0,spAtk:32,spDef:0,speed:30}, teraType: "steel" },
  ],
  71: [ // Victreebel
    { name: "Sun Sweeper", nature: "Modest", ability: "Chlorophyll", item: "Life Orb", moves: ["Leaf Storm","Sludge Bomb","Sleep Powder","Protect"], sp: {hp:0,attack:0,defense:2,spAtk:32,spDef:0,speed:32}, teraType: "fire" },
    { name: "Physical Sun", nature: "Adamant", ability: "Chlorophyll", item: "Life Orb", moves: ["Power Whip","Sucker Punch","Knock Off","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "dark" },
  ],
  132: [ // Ditto
    { name: "Imposter Scarf", nature: "Jolly", ability: "Imposter", item: "Choice Scarf", moves: ["Transform"], sp: {hp:32,attack:0,defense:2,spAtk:0,spDef:32,speed:0}, teraType: "normal" },
  ],
  184: [ // Azumarill
    { name: "Belly Drum", nature: "Adamant", ability: "Huge Power", item: "Sitrus Berry", moves: ["Belly Drum","Aqua Jet","Play Rough","Protect"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "water" },
    { name: "AV Attacker", nature: "Adamant", ability: "Huge Power", item: "Assault Vest", moves: ["Play Rough","Aqua Jet","Liquidation","Superpower"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "steel" },
    { name: "Choice Band", nature: "Adamant", ability: "Huge Power", item: "Choice Band", moves: ["Play Rough","Aqua Jet","Liquidation","Knock Off"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "water" },
  ],
  196: [ // Espeon
    { name: "Magic Bounce Support", nature: "Timid", ability: "Magic Bounce", item: "Focus Sash", moves: ["Psychic","Dazzling Gleam","Helping Hand","Protect"], sp: {hp:4,attack:0,defense:0,spAtk:32,spDef:0,speed:30}, teraType: "fairy" },
    { name: "Calm Mind", nature: "Timid", ability: "Magic Bounce", item: "Leftovers", moves: ["Psyshock","Shadow Ball","Calm Mind","Protect"], sp: {hp:4,attack:0,defense:0,spAtk:32,spDef:0,speed:30}, teraType: "steel" },
  ],
  208: [ // Steelix
    { name: "Trick Room Tank", nature: "Brave", ability: "Sturdy", item: "Leftovers", moves: ["Earthquake","Iron Head","Body Press","Protect"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "water" },
    { name: "Hazard Setter", nature: "Relaxed", ability: "Sturdy", item: "Leftovers", moves: ["Stealth Rock","Gyro Ball","Earthquake","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "water" },
  ],
  306: [ // Aggron
    { name: "Mega Tank", nature: "Adamant", ability: "Filter", item: "Aggronite", moves: ["Iron Head","Earthquake","Heavy Slam","Protect"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "water" },
    { name: "Body Press", nature: "Impish", ability: "Filter", item: "Aggronite", moves: ["Body Press","Iron Head","Iron Defense","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "water" },
    { name: "AV Non-Mega", nature: "Adamant", ability: "Sturdy", item: "Assault Vest", moves: ["Iron Head","Earthquake","Head Smash","Rock Slide"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "fighting" },
  ],
  308: [ // Medicham
    { name: "Mega Fighting", nature: "Jolly", ability: "Pure Power", item: "Medichamite", moves: ["Close Combat","Zen Headbutt","Ice Punch","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "fire" },
    { name: "Fake Out Lead", nature: "Jolly", ability: "Pure Power", item: "Medichamite", moves: ["Fake Out","Close Combat","Zen Headbutt","Protect"], sp: {hp:4,attack:32,defense:0,spAtk:0,spDef:0,speed:30}, teraType: "ghost" },
  ],
  310: [ // Manectric
    { name: "Mega Intimidate", nature: "Timid", ability: "Intimidate", item: "Manectite", moves: ["Thunderbolt","Overheat","Volt Switch","Protect"], sp: {hp:0,attack:0,defense:2,spAtk:32,spDef:0,speed:32}, teraType: "ice" },
    { name: "Lightning Rod", nature: "Timid", ability: "Lightning Rod", item: "Focus Sash", moves: ["Thunderbolt","Snarl","Volt Switch","Protect"], sp: {hp:4,attack:0,defense:0,spAtk:32,spDef:0,speed:30}, teraType: "grass" },
  ],
  319: [ // Sharpedo
    { name: "Speed Boost Sweep", nature: "Adamant", ability: "Speed Boost", item: "Focus Sash", moves: ["Crunch","Liquidation","Close Combat","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "dark" },
    { name: "Band", nature: "Adamant", ability: "Speed Boost", item: "Choice Band", moves: ["Crunch","Liquidation","Close Combat","Poison Jab"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "water" },
  ],
  323: [ // Camerupt
    { name: "Mega TR", nature: "Quiet", ability: "Sheer Force", item: "Cameruptite", moves: ["Heat Wave","Earth Power","Fire Blast","Protect"], sp: {hp:32,attack:0,defense:2,spAtk:32,spDef:0,speed:0}, teraType: "grass" },
    { name: "Eruption", nature: "Quiet", ability: "Solid Rock", item: "Choice Specs", moves: ["Eruption","Earth Power","Heat Wave","Overheat"], sp: {hp:32,attack:0,defense:2,spAtk:32,spDef:0,speed:0}, teraType: "grass" },
  ],
  354: [ // Banette
    { name: "Mega Prankster", nature: "Adamant", ability: "Prankster", item: "Banettite", moves: ["Shadow Claw","Shadow Sneak","Will-O-Wisp","Protect"], sp: {hp:4,attack:32,defense:0,spAtk:0,spDef:0,speed:30}, teraType: "normal" },
    { name: "Destiny Bond", nature: "Jolly", ability: "Prankster", item: "Banettite", moves: ["Shadow Claw","Destiny Bond","Will-O-Wisp","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "dark" },
  ],
  362: [ // Glalie
    { name: "Mega Mixed", nature: "Hasty", ability: "Refrigerate", item: "Glalitite", moves: ["Return","Freeze-Dry","Earthquake","Protect"], sp: {hp:0,attack:16,defense:2,spAtk:16,spDef:0,speed:32}, teraType: "ground" },
    { name: "Explosion", nature: "Jolly", ability: "Refrigerate", item: "Glalitite", moves: ["Return","Explosion","Ice Shard","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "normal" },
  ],
  428: [ // Lopunny
    { name: "Mega Fake Out", nature: "Jolly", ability: "Scrappy", item: "Lopunnite", moves: ["Fake Out","High Jump Kick","Return","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "fighting" },
    { name: "Encore Support", nature: "Jolly", ability: "Scrappy", item: "Lopunnite", moves: ["Fake Out","High Jump Kick","Encore","Protect"], sp: {hp:4,attack:32,defense:0,spAtk:0,spDef:0,speed:30}, teraType: "ghost" },
  ],
  442: [ // Spiritomb
    { name: "Bulky WoW", nature: "Bold", ability: "Pressure", item: "Leftovers", moves: ["Will-O-Wisp","Foul Play","Snarl","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "fairy" },
    { name: "TR Attacker", nature: "Quiet", ability: "Pressure", item: "Choice Specs", moves: ["Shadow Ball","Dark Pulse","Psychic","Trick Room"], sp: {hp:32,attack:0,defense:2,spAtk:32,spDef:0,speed:0}, teraType: "ghost" },
  ],
  460: [ // Abomasnow
    { name: "Mega Snow", nature: "Brave", ability: "Snow Warning", item: "Abomasite", moves: ["Blizzard","Wood Hammer","Ice Shard","Protect"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "ice" },
    { name: "Aurora Veil", nature: "Calm", ability: "Snow Warning", item: "Light Clay", moves: ["Blizzard","Aurora Veil","Energy Ball","Protect"], sp: {hp:32,attack:0,defense:2,spAtk:0,spDef:32,speed:0}, teraType: "water" },
    { name: "Mixed Mega", nature: "Quiet", ability: "Snow Warning", item: "Abomasite", moves: ["Blizzard","Giga Drain","Ice Shard","Protect"], sp: {hp:32,attack:0,defense:2,spAtk:32,spDef:0,speed:0}, teraType: "ground" },
  ],
  473: [ // Mamoswine
    { name: "Band Attacker", nature: "Adamant", ability: "Thick Fat", item: "Choice Band", moves: ["Earthquake","Icicle Crash","Ice Shard","Superpower"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "ice" },
    { name: "Sash Lead", nature: "Jolly", ability: "Oblivious", item: "Focus Sash", moves: ["Earthquake","Icicle Crash","Ice Shard","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "ground" },
    { name: "AV Tank", nature: "Adamant", ability: "Thick Fat", item: "Assault Vest", moves: ["Earthquake","Icicle Crash","Ice Shard","Knock Off"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "water" },
  ],
  475: [ // Gallade
    { name: "Mega Swords", nature: "Jolly", ability: "Inner Focus", item: "Galladite", moves: ["Close Combat","Psycho Cut","Knock Off","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "dark" },
    { name: "SD Sweeper", nature: "Jolly", ability: "Sharpness", item: "Life Orb", moves: ["Close Combat","Leaf Blade","Psycho Cut","Protect"], sp: {hp:0,attack:32,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "steel" },
  ],
  623: [ // Golurk
    { name: "TR Attacker", nature: "Brave", ability: "Iron Fist", item: "Assault Vest", moves: ["Earthquake","Poltergeist","Drain Punch","Ice Punch"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "water" },
    { name: "No Guard", nature: "Brave", ability: "No Guard", item: "Life Orb", moves: ["Earthquake","Poltergeist","Rock Slide","Protect"], sp: {hp:4,attack:32,defense:0,spAtk:0,spDef:0,speed:30}, teraType: "ghost" },
  ],
  670: [ // Floette
    { name: "Mega Support", nature: "Timid", ability: "Flower Power", item: "Floettite", moves: ["Moonblast","Psychic","Floral Healing","Protect"], sp: {hp:20,attack:0,defense:2,spAtk:32,spDef:0,speed:12}, teraType: "steel" },
    { name: "Calm Mind", nature: "Bold", ability: "Flower Veil", item: "Leftovers", moves: ["Moonblast","Calm Mind","Helping Hand","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "steel" },
  ],
  676: [ // Furfrou
    { name: "Fur Coat Physical", nature: "Jolly", ability: "Fur Coat", item: "Leftovers", moves: ["Return","Sucker Punch","Thunder Wave","Protect"], sp: {hp:32,attack:0,defense:2,spAtk:0,spDef:0,speed:32}, teraType: "ghost" },
    { name: "Support", nature: "Jolly", ability: "Fur Coat", item: "Sitrus Berry", moves: ["Return","U-turn","Charm","Protect"], sp: {hp:32,attack:0,defense:2,spAtk:0,spDef:32,speed:0}, teraType: "steel" },
  ],
  693: [ // Clawitzer
    { name: "Launcher Specs", nature: "Quiet", ability: "Mega Launcher", item: "Choice Specs", moves: ["Water Pulse","Dark Pulse","Aura Sphere","Dragon Pulse"], sp: {hp:32,attack:0,defense:2,spAtk:32,spDef:0,speed:0}, teraType: "fairy" },
    { name: "TR Attacker", nature: "Quiet", ability: "Mega Launcher", item: "Life Orb", moves: ["Water Pulse","Dark Pulse","Aura Sphere","Protect"], sp: {hp:32,attack:0,defense:2,spAtk:32,spDef:0,speed:0}, teraType: "steel" },
  ],
  706: [ // Goodra
    { name: "AV Special", nature: "Modest", ability: "Sap Sipper", item: "Assault Vest", moves: ["Draco Meteor","Fire Blast","Sludge Bomb","Thunderbolt"], sp: {hp:32,attack:0,defense:2,spAtk:32,spDef:0,speed:0}, teraType: "steel" },
    { name: "Mixed", nature: "Quiet", ability: "Sap Sipper", item: "Assault Vest", moves: ["Draco Meteor","Ice Beam","Power Whip","Fire Blast"], sp: {hp:32,attack:0,defense:2,spAtk:32,spDef:0,speed:0}, teraType: "fairy" },
  ],
  709: [ // Trevenant
    { name: "TR Attacker", nature: "Brave", ability: "Harvest", item: "Sitrus Berry", moves: ["Wood Hammer","Shadow Claw","Trick Room","Protect"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "fire" },
    { name: "Will-O-Wisp", nature: "Impish", ability: "Natural Cure", item: "Sitrus Berry", moves: ["Horn Leech","Shadow Claw","Will-O-Wisp","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "water" },
  ],
  713: [ // Avalugg
    { name: "Body Press Wall", nature: "Relaxed", ability: "Sturdy", item: "Leftovers", moves: ["Body Press","Iron Defense","Avalanche","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "fighting" },
    { name: "TR Attacker", nature: "Brave", ability: "Sturdy", item: "Assault Vest", moves: ["Avalanche","Heavy Slam","Earthquake","Rapid Spin"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "steel" },
  ],
  750: [ // Mudsdale
    { name: "Stamina Tank", nature: "Adamant", ability: "Stamina", item: "Leftovers", moves: ["High Horsepower","Heavy Slam","Body Press","Protect"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "water" },
    { name: "AV Attacker", nature: "Brave", ability: "Stamina", item: "Assault Vest", moves: ["High Horsepower","Close Combat","Rock Slide","Heavy Slam"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "steel" },
  ],
  823: [ // Corviknight
    { name: "Bulky Tailwind", nature: "Impish", ability: "Mirror Armor", item: "Sitrus Berry", moves: ["Brave Bird","Tailwind","Iron Head","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "water" },
    { name: "Body Press", nature: "Impish", ability: "Mirror Armor", item: "Leftovers", moves: ["Body Press","Iron Defense","Roost","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "fighting" },
    { name: "Offensive", nature: "Adamant", ability: "Pressure", item: "Life Orb", moves: ["Brave Bird","Iron Head","U-turn","Protect"], sp: {hp:4,attack:32,defense:0,spAtk:0,spDef:0,speed:30}, teraType: "flying" },
  ],
  861: [ // Grimmsnarl
    { name: "Screens Lead", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Light Screen","Reflect","Spirit Break","Fake Out"], sp: {hp:32,attack:0,defense:2,spAtk:0,spDef:32,speed:0}, teraType: "steel" },
    { name: "Thunder Wave", nature: "Adamant", ability: "Prankster", item: "Sitrus Berry", moves: ["Spirit Break","Sucker Punch","Thunder Wave","Fake Out"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "poison" },
    { name: "Taunt Lead", nature: "Careful", ability: "Prankster", item: "Focus Sash", moves: ["Taunt","Thunder Wave","Spirit Break","Protect"], sp: {hp:32,attack:0,defense:2,spAtk:0,spDef:32,speed:0}, teraType: "poison" },
  ],
  867: [ // Runerigus
    { name: "TR Wall", nature: "Relaxed", ability: "Wandering Spirit", item: "Leftovers", moves: ["Earthquake","Body Press","Trick Room","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "water" },
    { name: "Hazard Setter", nature: "Relaxed", ability: "Wandering Spirit", item: "Mental Herb", moves: ["Stealth Rock","Will-O-Wisp","Shadow Claw","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "water" },
  ],
  934: [ // Garganacl
    { name: "Salt Cure Wall", nature: "Careful", ability: "Purifying Salt", item: "Leftovers", moves: ["Salt Cure","Recover","Body Press","Protect"], sp: {hp:32,attack:0,defense:2,spAtk:0,spDef:32,speed:0}, teraType: "ghost" },
    { name: "Iron Defense Press", nature: "Impish", ability: "Purifying Salt", item: "Leftovers", moves: ["Iron Defense","Body Press","Salt Cure","Recover"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "water" },
    { name: "AV Attacker", nature: "Adamant", ability: "Purifying Salt", item: "Assault Vest", moves: ["Salt Cure","Rock Slide","Body Press","Heavy Slam"], sp: {hp:32,attack:32,defense:2,spAtk:0,spDef:0,speed:0}, teraType: "ghost" },
  ],
  981: [ // Farigiraf
    { name: "TR Support", nature: "Quiet", ability: "Armor Tail", item: "Sitrus Berry", moves: ["Hyper Voice","Psychic","Trick Room","Protect"], sp: {hp:32,attack:0,defense:2,spAtk:32,spDef:0,speed:0}, teraType: "fairy" },
    { name: "Nasty Plot", nature: "Modest", ability: "Armor Tail", item: "Throat Spray", moves: ["Hyper Voice","Psyshock","Nasty Plot","Protect"], sp: {hp:20,attack:0,defense:2,spAtk:32,spDef:0,speed:12}, teraType: "ghost" },
    { name: "Support", nature: "Bold", ability: "Armor Tail", item: "Sitrus Berry", moves: ["Psychic","Helping Hand","Trick Room","Protect"], sp: {hp:32,attack:0,defense:32,spAtk:0,spDef:2,speed:0}, teraType: "steel" },
  ],
};

// ── GENERATE AND PATCH ─────────────────────────────────────────

function buildPokemonEntry(def) {
  const moves = def.moveNames.map(n => m(n));
  const entry = {
    id: def.id,
    name: def.name,
    dexNumber: def.id,
    types: def.types,
    baseStats: def.stats,
    abilities: def.abilities,
    moves,
    sprite: SPRITE(def.id),
    officialArt: SPRITE(def.id),
    generation: def.gen,
  };
  if (def.hasMega) {
    entry.forms = [{
      name: def.mega.name,
      sprite: def.mega.sprite,
      types: def.mega.types,
      baseStats: def.mega.stats,
      abilities: def.mega.abilities,
      isMega: true,
    }];
  }
  entry.hasMega = !!def.hasMega;
  entry.recruitmentCost = null;
  entry.homeCompatible = true;
  entry.homeSource = def.gen <= 4 ? ["Scarlet/Violet","Legends Z-A","Sword/Shield","BDSP","Pokémon GO"]
    : def.gen <= 5 ? ["Scarlet/Violet","Legends Z-A","Pokémon GO"]
    : def.gen <= 7 ? ["Scarlet/Violet","Legends Z-A"]
    : ["Scarlet/Violet","Legends Z-A"];
  entry.season = 1;
  entry.tier = def.tier;
  entry.usageRate = null;
  return entry;
}

function main() {
  console.log("=== UPDATING CHAMPIONS LAB ROSTER ===\n");

  // 1. Read pokemon-data.ts
  const pdPath = join(ROOT, 'src/lib/pokemon-data.ts');
  let pdContent = readFileSync(pdPath, 'utf-8');

  // 2. Remove Tatsugiri (id: 978)
  // Find the Tatsugiri entry and remove it
  const tatsStart = pdContent.indexOf('  {\n    "id": 978,');
  if (tatsStart === -1) {
    // Try alternate format
    const tatsAlt = pdContent.indexOf('  {\n    id: 978,');
    if (tatsAlt !== -1) {
      const tatsEnd = pdContent.indexOf('\n  },\n', tatsAlt);
      if (tatsEnd !== -1) {
        pdContent = pdContent.slice(0, tatsAlt) + pdContent.slice(tatsEnd + 5);
        console.log("✓ Removed Tatsugiri (978) — alt format");
      }
    }
  } else {
    const tatsEnd = pdContent.indexOf('\n  },\n', tatsStart);
    if (tatsEnd !== -1) {
      pdContent = pdContent.slice(0, tatsStart) + pdContent.slice(tatsEnd + 5);
      console.log("✓ Removed Tatsugiri (978)");
    }
  }

  // 3. Build new entries
  const newEntries = NEW_POKEMON.map(def => buildPokemonEntry(def));
  const entriesJSON = newEntries.map(e => JSON.stringify(e, null, 2).replace(/^/gm, '  ')).join(',\n');

  // 4. Insert new entries before the closing "];" of POKEMON_SEED
  const closingIndex = pdContent.lastIndexOf('\n];');
  if (closingIndex === -1) {
    console.error("ERROR: Could not find closing ]; of POKEMON_SEED");
    process.exit(1);
  }
  pdContent = pdContent.slice(0, closingIndex) + ',\n' + entriesJSON + '\n];';

  // 5. Write updated pokemon-data.ts
  writeFileSync(pdPath, pdContent, 'utf-8');
  console.log(`✓ Added ${newEntries.length} new Pokémon to pokemon-data.ts`);

  // 6. Update usage-data.ts
  const udPath = join(ROOT, 'src/lib/usage-data.ts');
  let udContent = readFileSync(udPath, 'utf-8');

  // Remove Tatsugiri usage data
  const tatsUsage = udContent.indexOf('  978:');
  if (tatsUsage !== -1) {
    // Find the end bracket of this entry array
    let bracketCount = 0;
    let i = udContent.indexOf('[', tatsUsage);
    let endIdx = i;
    for (; endIdx < udContent.length; endIdx++) {
      if (udContent[endIdx] === '[') bracketCount++;
      if (udContent[endIdx] === ']') { bracketCount--; if (bracketCount === 0) break; }
    }
    // Find trailing comma
    let trailEnd = endIdx + 1;
    while (trailEnd < udContent.length && (udContent[trailEnd] === ',' || udContent[trailEnd] === '\n')) trailEnd++;
    udContent = udContent.slice(0, tatsUsage) + udContent.slice(trailEnd);
    console.log("✓ Removed Tatsugiri from usage-data.ts");
  }

  // Add new usage data entries before the closing "};" of USAGE_DATA
  const usageEntries = [];
  for (const [id, sets] of Object.entries(NEW_USAGE)) {
    const pokeName = NEW_POKEMON.find(p => p.id === Number(id))?.name || `id: ${id}`;
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

  const usageClosing = udContent.lastIndexOf('\n};');
  if (usageClosing !== -1) {
    udContent = udContent.slice(0, usageClosing) + '\n' + usageInsert + '\n};';
    writeFileSync(udPath, udContent, 'utf-8');
    console.log(`✓ Added usage data for ${Object.keys(NEW_USAGE).length} new Pokémon`);
  }

  // 7. Summary
  console.log(`\n=== ROSTER UPDATE COMPLETE ===`);
  console.log(`New Pokemon: ${newEntries.length}`);
  console.log(`Removed: Tatsugiri (978)`);
  console.log(`Total should be: ${93 - 1 + newEntries.length} (was 93)`);
  console.log(`New megas: ${newEntries.filter(e => e.hasMega).length}`);

  // Print name list
  console.log("\nAdded:");
  for (const e of newEntries) {
    const megaStr = e.hasMega ? ` [MEGA: ${e.forms[0].name}]` : '';
    console.log(`  #${e.id} ${e.name} (${e.types.join('/')}) — Tier ${e.tier}${megaStr}`);
  }
}

main();
