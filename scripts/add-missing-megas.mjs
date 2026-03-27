import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/lib/pokemon-data.ts");

// Missing Mega forms according to Bulbapedia's Champions list
// For Pokémon already in our roster
const MISSING_MEGAS = [
  {
    id: 26,
    name: "Raichu",
    forms: [
      {
        name: "Mega Raichu X",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/26.png",
        types: ["electric", "fighting"],
        baseStats: { hp: 60, attack: 135, defense: 95, spAtk: 90, spDef: 95, speed: 110 },
        abilities: [{ name: "Volt Rush", description: "Electric and Fighting-type moves gain 30% power. On Mega Evolution, raises Speed by one stage.", isChampions: true }],
        isMega: true,
      },
      {
        name: "Mega Raichu Y",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/26.png",
        types: ["electric", "psychic"],
        baseStats: { hp: 60, attack: 100, defense: 55, spAtk: 160, spDef: 80, speed: 130 },
        abilities: [{ name: "Mind Surge", description: "Electric and Psychic-type moves gain 30% power. Psychic Terrain is set on Mega Evolution.", isChampions: true }],
        isMega: true,
      },
    ],
  },
  {
    id: 80,
    name: "Slowbro",
    forms: [
      {
        name: "Mega Slowbro",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10071.png",
        types: ["water", "psychic"],
        baseStats: { hp: 95, attack: 75, defense: 180, spAtk: 130, spDef: 80, speed: 30 },
        abilities: [{ name: "Shell Armor", description: "The Pokémon's hard armor prevents critical hits from landing.", isHidden: false }],
        isMega: true,
      },
    ],
  },
  {
    id: 478,
    name: "Froslass",
    forms: [
      {
        name: "Mega Froslass",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/478.png",
        types: ["ice", "ghost"],
        baseStats: { hp: 70, attack: 80, defense: 70, spAtk: 140, spDef: 100, speed: 120 },
        abilities: [{ name: "Frozen Veil", description: "Ice-type moves gain 30% power and have a 30% chance to freeze the target. Immune to hail damage.", isChampions: true }],
        isMega: true,
      },
    ],
  },
  {
    id: 500,
    name: "Emboar",
    forms: [
      {
        name: "Mega Emboar",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/500.png",
        types: ["fire", "fighting"],
        baseStats: { hp: 110, attack: 148, defense: 75, spAtk: 110, spDef: 110, speed: 75 },
        abilities: [{ name: "Reckless Flame", description: "Recoil moves deal 30% more damage and Fire-type moves gain priority at full HP.", isChampions: true }],
        isMega: true,
      },
    ],
  },
  {
    id: 652,
    name: "Chesnaught",
    forms: [
      {
        name: "Mega Chesnaught",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/652.png",
        types: ["grass", "fighting"],
        baseStats: { hp: 88, attack: 137, defense: 172, spAtk: 74, spDef: 115, speed: 44 },
        abilities: [{ name: "Iron Thorns", description: "Takes 50% less damage from contact moves. Attackers that make contact lose 1/8 of their max HP.", isChampions: true }],
        isMega: true,
      },
    ],
  },
  {
    id: 655,
    name: "Delphox",
    forms: [
      {
        name: "Mega Delphox",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/655.png",
        types: ["fire", "psychic"],
        baseStats: { hp: 75, attack: 69, defense: 72, spAtk: 159, spDef: 125, speed: 134 },
        abilities: [{ name: "Astral Flame", description: "Fire and Psychic-type moves ignore the target's stat changes and Abilities.", isChampions: true }],
        isMega: true,
      },
    ],
  },
  {
    id: 658,
    name: "Greninja",
    forms: [
      {
        name: "Mega Greninja",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/658.png",
        types: ["water", "dark"],
        baseStats: { hp: 72, attack: 125, defense: 77, spAtk: 133, spDef: 81, speed: 142 },
        abilities: [{ name: "Protean Surge", description: "All moves gain STAB. The Pokémon changes type to match the move it uses.", isChampions: true }],
        isMega: true,
      },
    ],
  },
  {
    id: 701,
    name: "Hawlucha",
    forms: [
      {
        name: "Mega Hawlucha",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/701.png",
        types: ["fighting", "flying"],
        baseStats: { hp: 78, attack: 137, defense: 100, spAtk: 74, spDef: 93, speed: 118 },
        abilities: [{ name: "Sky High", description: "Flying and Fighting-type moves gain 30% power. Ignores the effects of Intimidate.", isChampions: true }],
        isMega: true,
      },
    ],
  },
];

function main() {
  let content = fs.readFileSync(DATA_FILE, "utf-8");

  for (const mega of MISSING_MEGAS) {
    const formsJson = JSON.stringify(mega.forms, null, 6)
      .replace(/\n/g, "\n    ");

    // Find this Pokémon's entry and add forms + hasMega
    // Pattern: find "generation": N, followed by hasMega or recruitmentCost
    const regex = new RegExp(
      `("id":\\s*${mega.id},[\\s\\S]*?"generation":\\s*\\d+,)\\s*\\n(\\s*"hasMega":\\s*false,|\\s*"forms":)`,
    );

    const match = content.match(regex);
    if (match) {
      // Case 1: hasMega: false — replace with forms + hasMega: true
      if (match[2].includes("hasMega")) {
        content = content.replace(
          regex,
          `$1\n    "forms": ${formsJson},\n    "hasMega": true,`
        );
        console.log(`✓ Added Mega form(s) for ${mega.name} (#${mega.id})`);
      }
    } else {
      // Try alternate pattern: no hasMega field at all, just generation then recruitmentCost
      const regex2 = new RegExp(
        `("id":\\s*${mega.id},[\\s\\S]*?"generation":\\s*\\d+,)\\s*\\n(\\s*"recruitmentCost")`,
      );
      const match2 = content.match(regex2);
      if (match2) {
        content = content.replace(
          regex2,
          `$1\n    "forms": ${formsJson},\n    "hasMega": true,\n$2`
        );
        console.log(`✓ Added Mega form(s) for ${mega.name} (#${mega.id})`);
      } else {
        console.log(`✗ Could not find entry for ${mega.name} (#${mega.id})`);
      }
    }
  }

  fs.writeFileSync(DATA_FILE, content);
  console.log("\nDone!");
}

main();
