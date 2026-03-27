// Validate Z-A and Mega Dimension megas against Bulbapedia
// Fetch each Pokémon's Bulbapedia page and extract mega stats

const ZA_MEGAS = [
  // Z-A base game megas in our app
  { name: "Mega Clefable", pokemon: "Clefable", dexNum: 36 },
  { name: "Mega Victreebel", pokemon: "Victreebel", dexNum: 71 },
  { name: "Mega Starmie", pokemon: "Starmie", dexNum: 121 },
  { name: "Mega Dragonite", pokemon: "Dragonite", dexNum: 149 },
  { name: "Mega Meganium", pokemon: "Meganium", dexNum: 154 },
  { name: "Mega Feraligatr", pokemon: "Feraligatr", dexNum: 160 },
  { name: "Mega Skarmory", pokemon: "Skarmory", dexNum: 227 },
  // Froslass already fixed
  { name: "Mega Emboar", pokemon: "Emboar", dexNum: 500 },
  { name: "Mega Excadrill", pokemon: "Excadrill", dexNum: 530 },
  { name: "Mega Chesnaught", pokemon: "Chesnaught", dexNum: 652 },
  { name: "Mega Delphox", pokemon: "Delphox", dexNum: 655 },
  { name: "Mega Greninja", pokemon: "Greninja", dexNum: 658 },
  { name: "Mega Hawlucha", pokemon: "Hawlucha", dexNum: 701 },
  { name: "Mega Drampa", pokemon: "Drampa", dexNum: 780 },
  // Mega Dimension DLC megas
  { name: "Mega Raichu X", pokemon: "Raichu", dexNum: 26 },
  { name: "Mega Raichu Y", pokemon: "Raichu", dexNum: 26 },
  { name: "Mega Absol Z", pokemon: "Absol", dexNum: 359 },
  { name: "Mega Garchomp Z", pokemon: "Garchomp", dexNum: 445 },
  { name: "Mega Lucario Z", pokemon: "Lucario", dexNum: 448 },
  { name: "Mega Meowstic", pokemon: "Meowstic", dexNum: 678 },
  { name: "Mega Crabominable", pokemon: "Crabominable", dexNum: 740 },
  { name: "Mega Scovillain", pokemon: "Scovillain", dexNum: 952 },
  { name: "Mega Glimmora", pokemon: "Glimmora", dexNum: 970 },
  { name: "Mega Tatsugiri", pokemon: "Tatsugiri", dexNum: 978 },
];

import { readFileSync } from "fs";
const dataFile = readFileSync("src/lib/pokemon-data.ts", "utf-8");

function getAppMegaStats(name) {
  const regex = new RegExp(`"name":\\s*"${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?"baseStats":\\s*\\{([^}]+)\\}`, 'g');
  const match = regex.exec(dataFile);
  if (!match) return null;
  const statsStr = match[1];
  return {
    hp: parseInt(statsStr.match(/"hp":\s*(\d+)/)?.[1]),
    attack: parseInt(statsStr.match(/"attack":\s*(\d+)/)?.[1]),
    defense: parseInt(statsStr.match(/"defense":\s*(\d+)/)?.[1]),
    spAtk: parseInt(statsStr.match(/"spAtk":\s*(\d+)/)?.[1]),
    spDef: parseInt(statsStr.match(/"spDef":\s*(\d+)/)?.[1]),
    speed: parseInt(statsStr.match(/"speed":\s*(\d+)/)?.[1]),
  };
}

async function fetchBulbapediaStats(pokemonName, megaName) {
  const url = `https://bulbapedia.bulbagarden.net/w/index.php?title=${encodeURIComponent(pokemonName + "_(Pokémon)")}&action=raw`;
  try {
    const res = await fetch(url, { 
      headers: { 'User-Agent': 'ChampionsLabStatAudit/1.0' },
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) return null;
    const text = await res.text();
    
    // Look for mega stats section - the wikitext uses templates like |NDex=478 and stats in template format
    // The raw wikitext has stats in format like: |HP=70|Attack=80|Defense=70|SpAtk=140|SpDef=100|Speed=120
    // For mega forms, look for sections with "Mega" in them
    
    // Find all stat blocks
    const statBlocks = [];
    // Pattern for stat templates: |HP=X|Attack=X|Defense=X|SpAtk=X|SpDef=X|Speed=X
    const megaStatRegex = /Mega\s*(?:Froslass|Clefable|Victreebel|Starmie|Dragonite|Meganium|Feraligatr|Skarmory|Emboar|Excadrill|Chesnaught|Delphox|Greninja|Hawlucha|Drampa|Raichu\s*[XYZ]?|Absol\s*Z?|Garchomp\s*Z?|Lucario\s*Z?|Meowstic|Crabominable|Scovillain|Glimmora|Tatsugiri)[^}]*?\|HP\s*=\s*(\d+)\s*\|Attack\s*=\s*(\d+)\s*\|Defense\s*=\s*(\d+)\s*\|SpAtk\s*=\s*(\d+)\s*\|SpDef\s*=\s*(\d+)\s*\|Speed\s*=\s*(\d+)/gi;
    
    let m;
    while ((m = megaStatRegex.exec(text)) !== null) {
      statBlocks.push({
        hp: parseInt(m[1]),
        attack: parseInt(m[2]),
        defense: parseInt(m[3]),
        spAtk: parseInt(m[4]),
        spDef: parseInt(m[5]),
        speed: parseInt(m[6]),
      });
    }
    
    // Alternative: look for the general stat pattern near "Mega" keyword
    if (statBlocks.length === 0) {
      // Try a more flexible approach - find stat sections
      const sections = text.split(/={2,}\s*Base stats\s*={2,}/i);
      for (const section of sections) {
        if (!section.includes('Mega')) continue;
        const statMatch = section.match(/\|HP\s*=\s*(\d+)\s*\|Attack\s*=\s*(\d+)\s*\|Defense\s*=\s*(\d+)\s*\|SpAtk\s*=\s*(\d+)\s*\|SpDef\s*=\s*(\d+)\s*\|Speed\s*=\s*(\d+)/i);
        if (statMatch) {
          statBlocks.push({
            hp: parseInt(statMatch[1]),
            attack: parseInt(statMatch[2]),
            defense: parseInt(statMatch[3]),
            spAtk: parseInt(statMatch[4]),
            spDef: parseInt(statMatch[5]),
            speed: parseInt(statMatch[6]),
          });
        }
      }
    }
    
    // Even more flexible: just find ALL stat template blocks
    if (statBlocks.length === 0) {
      const allStats = [...text.matchAll(/\|HP\s*=\s*(\d+)\s*\|Attack\s*=\s*(\d+)\s*\|Defense\s*=\s*(\d+)\s*\|SpAtk\s*=\s*(\d+)\s*\|SpDef\s*=\s*(\d+)\s*\|Speed\s*=\s*(\d+)/gi)];
      // The second stat block (if exists) is typically the mega form
      if (allStats.length >= 2) {
        const m = allStats[1];
        statBlocks.push({
          hp: parseInt(m[1]),
          attack: parseInt(m[2]),
          defense: parseInt(m[3]),
          spAtk: parseInt(m[4]),
          spDef: parseInt(m[5]),
          speed: parseInt(m[6]),
        });
      }
    }
    
    return statBlocks.length > 0 ? statBlocks : null;
  } catch (e) {
    console.error(`  Error fetching ${pokemonName}: ${e.message}`);
    return null;
  }
}

// Process unique Pokémon (some have multiple megas like Raichu X/Y)
const uniquePokemon = [...new Map(ZA_MEGAS.map(m => [m.pokemon, m])).values()];

const mismatches = [];
const matches = [];
const unverified = [];

for (const pokemon of uniquePokemon) {
  const bulbStats = await fetchBulbapediaStats(pokemon.pokemon, pokemon.name);
  
  // Find all megas in our app for this Pokémon
  const appMegas = ZA_MEGAS.filter(m => m.pokemon === pokemon.pokemon);
  
  if (!bulbStats || bulbStats.length === 0) {
    for (const mega of appMegas) {
      const appStats = getAppMegaStats(mega.name);
      unverified.push({ name: mega.name, appStats });
    }
    continue;
  }
  
  for (let i = 0; i < appMegas.length; i++) {
    const mega = appMegas[i];
    const appStats = getAppMegaStats(mega.name);
    if (!appStats) {
      console.log(`⚠️  ${mega.name} - NOT FOUND in app data`);
      continue;
    }
    
    // Match the correct bulb stat block for this mega
    const bulb = bulbStats[i] || bulbStats[0];
    
    const diffs = [];
    for (const stat of ["hp", "attack", "defense", "spAtk", "spDef", "speed"]) {
      if (appStats[stat] !== bulb[stat]) {
        diffs.push(`${stat}: app=${appStats[stat]} bulb=${bulb[stat]}`);
      }
    }
    
    if (diffs.length > 0) {
      console.log(`❌ ${mega.name} MISMATCH: ${diffs.join(", ")}`);
      mismatches.push({ name: mega.name, diffs, appStats, bulbStats: bulb });
    } else {
      matches.push(mega.name);
    }
  }
  
  // Rate limit
  await new Promise(r => setTimeout(r, 500));
}

console.log(`\n=== RESULTS ===`);
console.log(`✅ ${matches.length} Z-A/MD megas match: ${matches.join(", ")}`);
if (mismatches.length > 0) {
  console.log(`\n❌ ${mismatches.length} mismatches:`);
  for (const m of mismatches) {
    console.log(`  ${m.name}:`);
    console.log(`    App:  HP:${m.appStats.hp} Atk:${m.appStats.attack} Def:${m.appStats.defense} SpA:${m.appStats.spAtk} SpD:${m.appStats.spDef} Spe:${m.appStats.speed}`);
    console.log(`    Bulb: HP:${m.bulbStats.hp} Atk:${m.bulbStats.attack} Def:${m.bulbStats.defense} SpA:${m.bulbStats.spAtk} SpD:${m.bulbStats.spDef} Spe:${m.bulbStats.speed}`);
  }
}
if (unverified.length > 0) {
  console.log(`\n⚠️  ${unverified.length} could not be verified (stats not found on Bulbapedia):`);
  for (const u of unverified) {
    console.log(`  ${u.name}: HP:${u.appStats?.hp} Atk:${u.appStats?.attack} Def:${u.appStats?.defense} SpA:${u.appStats?.spAtk} SpD:${u.appStats?.spDef} Spe:${u.appStats?.speed}`);
  }
}
