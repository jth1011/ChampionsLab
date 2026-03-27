// Validate all canonical mega stats against PokeAPI
const CANONICAL_MEGAS = [
  { name: "Mega Venusaur", api: "venusaur-mega", dexNum: 3 },
  { name: "Mega Charizard X", api: "charizard-mega-x", dexNum: 6 },
  { name: "Mega Charizard Y", api: "charizard-mega-y", dexNum: 6 },
  { name: "Mega Blastoise", api: "blastoise-mega", dexNum: 9 },
  { name: "Mega Beedrill", api: "beedrill-mega", dexNum: 15 },
  { name: "Mega Alakazam", api: "alakazam-mega", dexNum: 65 },
  { name: "Mega Slowbro", api: "slowbro-mega", dexNum: 80 },
  { name: "Mega Gengar", api: "gengar-mega", dexNum: 94 },
  { name: "Mega Kangaskhan", api: "kangaskhan-mega", dexNum: 115 },
  { name: "Mega Pinsir", api: "pinsir-mega", dexNum: 127 },
  { name: "Mega Gyarados", api: "gyarados-mega", dexNum: 130 },
  { name: "Mega Aerodactyl", api: "aerodactyl-mega", dexNum: 142 },
  { name: "Mega Ampharos", api: "ampharos-mega", dexNum: 181 },
  { name: "Mega Steelix", api: "steelix-mega", dexNum: 208 },
  { name: "Mega Scizor", api: "scizor-mega", dexNum: 212 },
  { name: "Mega Heracross", api: "heracross-mega", dexNum: 214 },
  { name: "Mega Houndoom", api: "houndoom-mega", dexNum: 229 },
  { name: "Mega Tyranitar", api: "tyranitar-mega", dexNum: 248 },
  { name: "Mega Gardevoir", api: "gardevoir-mega", dexNum: 282 },
  { name: "Mega Sableye", api: "sableye-mega", dexNum: 302 },
  { name: "Mega Aggron", api: "aggron-mega", dexNum: 306 },
  { name: "Mega Altaria", api: "altaria-mega", dexNum: 334 },
  { name: "Mega Absol", api: "absol-mega", dexNum: 359 },
  { name: "Mega Metagross", api: "metagross-mega", dexNum: 376 },
  { name: "Mega Lopunny", api: "lopunny-mega", dexNum: 428 },
  { name: "Mega Garchomp", api: "garchomp-mega", dexNum: 445 },
  { name: "Mega Lucario", api: "lucario-mega", dexNum: 448 },
  { name: "Mega Abomasnow", api: "abomasnow-mega", dexNum: 460 },
  { name: "Mega Gallade", api: "gallade-mega", dexNum: 475 },
  { name: "Mega Audino", api: "audino-mega", dexNum: 531 },
];

// Load app data
import { readFileSync } from "fs";
const dataFile = readFileSync("src/lib/pokemon-data.ts", "utf-8");

// Extract mega forms from app data
function getAppMegaStats(name, dexNum) {
  // Find the pokemon entry by dex number then find the mega form
  const regex = new RegExp(`"name":\\s*"${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"baseStats":\\s*\\{([^}]+)\\}`, 'g');
  const match = regex.exec(dataFile);
  if (!match) return null;
  const statsStr = match[1];
  const hp = parseInt(statsStr.match(/"hp":\s*(\d+)/)?.[1]);
  const attack = parseInt(statsStr.match(/"attack":\s*(\d+)/)?.[1]);
  const defense = parseInt(statsStr.match(/"defense":\s*(\d+)/)?.[1]);
  const spAtk = parseInt(statsStr.match(/"spAtk":\s*(\d+)/)?.[1]);
  const spDef = parseInt(statsStr.match(/"spDef":\s*(\d+)/)?.[1]);
  const speed = parseInt(statsStr.match(/"speed":\s*(\d+)/)?.[1]);
  return { hp, attack, defense, spAtk, spDef, speed };
}

async function fetchPokeAPIStats(apiName) {
  const url = `https://pokeapi.co/api/v2/pokemon/${apiName}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const stats = {};
  for (const s of data.stats) {
    const name = s.stat.name;
    if (name === "hp") stats.hp = s.base_stat;
    else if (name === "attack") stats.attack = s.base_stat;
    else if (name === "defense") stats.defense = s.base_stat;
    else if (name === "special-attack") stats.spAtk = s.base_stat;
    else if (name === "special-defense") stats.spDef = s.base_stat;
    else if (name === "speed") stats.speed = s.base_stat;
  }
  return stats;
}

const mismatches = [];
const matched = [];

for (const mega of CANONICAL_MEGAS) {
  const appStats = getAppMegaStats(mega.name, mega.dexNum);
  if (!appStats) {
    console.log(`⚠️  ${mega.name} - NOT FOUND in app data`);
    continue;
  }

  const apiStats = await fetchPokeAPIStats(mega.api);
  if (!apiStats) {
    console.log(`⚠️  ${mega.name} - NOT FOUND on PokeAPI`);
    continue;
  }

  const diffs = [];
  for (const stat of ["hp", "attack", "defense", "spAtk", "spDef", "speed"]) {
    if (appStats[stat] !== apiStats[stat]) {
      diffs.push(`${stat}: app=${appStats[stat]} api=${apiStats[stat]}`);
    }
  }

  if (diffs.length > 0) {
    console.log(`❌ ${mega.name} MISMATCH: ${diffs.join(", ")}`);
    mismatches.push({ name: mega.name, diffs, appStats, apiStats });
  } else {
    matched.push(mega.name);
  }
}

console.log(`\n✅ ${matched.length} canonical megas match perfectly`);
if (mismatches.length > 0) {
  console.log(`❌ ${mismatches.length} mismatches found:`);
  for (const m of mismatches) {
    console.log(`   ${m.name}:`);
    console.log(`     App: HP:${m.appStats.hp} Atk:${m.appStats.attack} Def:${m.appStats.defense} SpA:${m.appStats.spAtk} SpD:${m.appStats.spDef} Spe:${m.appStats.speed}`);
    console.log(`     API: HP:${m.apiStats.hp} Atk:${m.apiStats.attack} Def:${m.apiStats.defense} SpA:${m.apiStats.spAtk} SpD:${m.apiStats.spDef} Spe:${m.apiStats.speed}`);
  }
}
