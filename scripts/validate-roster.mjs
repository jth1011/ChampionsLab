#!/usr/bin/env node
// Validate our roster against Serebii's official list
import fs from "fs";

const content = fs.readFileSync("src/lib/pokemon-data.ts", "utf8");

// Extract entries by finding "id": X patterns followed by their data
const entries = [];
const idRegex = /"id":\s*(\d+),/g;
let m;
while ((m = idRegex.exec(content)) !== null) {
  const id = parseInt(m[1]);
  const after = content.substring(m.index, m.index + 500);
  const nameMatch = after.match(/"name":\s*"([^"]+)"/);
  const dexMatch = after.match(/"dexNumber":\s*(\d+)/);
  if (nameMatch && dexMatch) {
    entries.push({ id, name: nameMatch[1], dex: parseInt(dexMatch[1]) });
  }
}

// Serebii official list (from https://www.serebii.net/pokemonchampions/pokemon.shtml)
const SEREBII = [
  [3, "Venusaur"], [6, "Charizard"], [9, "Blastoise"],
  [25, "Pikachu"], [26, "Raichu"], [36, "Clefable"], [38, "Ninetales"],
  [80, "Slowbro"], [94, "Gengar"], [115, "Kangaskhan"], [121, "Starmie"],
  [127, "Pinsir"], [130, "Gyarados"], [136, "Flareon"], [143, "Snorlax"],
  [149, "Dragonite"], [154, "Meganium"], [160, "Feraligatr"],
  [181, "Ampharos"], [186, "Politoed"], [197, "Umbreon"],
  [212, "Scizor"], [214, "Heracross"], [227, "Skarmory"], [229, "Houndoom"],
  [248, "Tyranitar"], [279, "Pelipper"], [282, "Gardevoir"],
  [324, "Torkoal"], [334, "Altaria"], [350, "Milotic"], [359, "Absol"],
  [376, "Metagross"], [395, "Empoleon"], [445, "Garchomp"], [448, "Lucario"],
  [450, "Hippowdon"], [464, "Rhyperior"], [470, "Leafeon"], [471, "Glaceon"],
  [472, "Gliscor"], [478, "Froslass"], [479, "Rotom"],
  [497, "Serperior"], [500, "Emboar"], [503, "Samurott"],
  [530, "Excadrill"], [531, "Audino"], [547, "Whimsicott"],
  [553, "Krookodile"], [571, "Zoroark"], [587, "Emolga"],
  [635, "Hydreigon"], [652, "Chesnaught"], [655, "Delphox"],
  [658, "Greninja"], [660, "Diggersby"], [663, "Talonflame"],
  [678, "Meowstic"], [681, "Aegislash"], [700, "Sylveon"],
  [701, "Hawlucha"], [715, "Noivern"], [724, "Decidueye"],
  [727, "Incineroar"], [740, "Crabominable"], [745, "Lycanroc"],
  [748, "Toxapex"], [763, "Tsareena"], [765, "Oranguru"],
  [778, "Mimikyu"], [780, "Drampa"], [784, "Kommo-o"],
  [858, "Hatterene"], [887, "Dragapult"], [900, "Kleavor"],
  [901, "Ursaluna"], [902, "Basculegion"], [903, "Sneasler"],
  [908, "Meowscarada"], [923, "Pawmot"], [925, "Maushold"],
  [936, "Armarouge"], [952, "Scovillain"], [959, "Tinkaton"],
  [964, "Palafin"], [970, "Glimmora"], [977, "Dondozo"],
  [978, "Tatsugiri"], [983, "Kingambit"],
  [1013, "Sinistcha"], [1018, "Archaludon"], [1019, "Hydrapple"],
];

const serebiiDex = new Set(SEREBII.map(s => s[0]));
const ourBaseDex = new Set(entries.filter(e => e.id < 10000).map(e => e.dex));

console.log("=== ROSTER VALIDATION ===\n");
console.log(`Serebii official: ${SEREBII.length} base Pokémon`);
console.log(`Our roster: ${entries.length} total (${entries.filter(e => e.id < 10000).length} base + ${entries.filter(e => e.id >= 10000).length} forms/regional)\n`);

// Missing from us
const missing = SEREBII.filter(([dex]) => !ourBaseDex.has(dex));
if (missing.length > 0) {
  console.log("❌ MISSING FROM OUR ROSTER (on Serebii but not in our data):");
  missing.forEach(([dex, name]) => console.log(`   #${String(dex).padStart(4, "0")} ${name}`));
} else {
  console.log("✅ All Serebii base Pokémon present in our roster!");
}

// Extra in us (Champions-exclusive additions)
const extra = entries.filter(e => e.id < 10000 && !serebiiDex.has(e.dex));
if (extra.length > 0) {
  console.log("\n🔷 EXTRA IN OUR ROSTER (Champions-exclusive / our additions):");
  extra.forEach(e => console.log(`   #${String(e.dex).padStart(4, "0")} ${e.name} (id: ${e.id})`));
}

// Regional forms / variants
const forms = entries.filter(e => e.id >= 10000);
if (forms.length > 0) {
  console.log("\n🔶 REGIONAL FORMS / VARIANTS:");
  forms.forEach(e => console.log(`   ${e.name} (id: ${e.id}, dex: ${e.dex})`));
}

// Quick data completeness check
console.log("\n=== DATA COMPLETENESS ===\n");
let issueCount = 0;
for (const entry of entries) {
  const block = content.substring(
    content.indexOf(`"id": ${entry.id},`),
    content.indexOf(`"id": ${entry.id},`) + 20000
  );
  
  // Count moves
  const movesMatch = block.match(/"moves":\s*\[([\s\S]*?)\]\s*,?\s*"sprite"/);
  const moveCount = movesMatch ? (movesMatch[1].match(/"name":/g) || []).length : 0;
  
  // Check abilities
  const abilitiesMatch = block.match(/"abilities":\s*\[([\s\S]*?)\]\s*,?\s*"moves"/);
  const abilityCount = abilitiesMatch ? (abilitiesMatch[1].match(/"name":/g) || []).length : 0;
  
  if (moveCount < 5) {
    console.log(`⚠️  ${entry.name} (${entry.id}): only ${moveCount} moves`);
    issueCount++;
  }
  if (abilityCount < 1) {
    console.log(`⚠️  ${entry.name} (${entry.id}): no abilities found`);
    issueCount++;
  }
}

if (issueCount === 0) {
  console.log("✅ All entries have abilities and at least 5 moves");
} else {
  console.log(`\n${issueCount} data issues found`);
}
