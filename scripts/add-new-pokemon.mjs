import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, '..', 'src', 'lib', 'pokemon-data.ts');

const taurosEntry = {
  "id": 128,
  "name": "Tauros",
  "dexNumber": 128,
  "types": ["normal"],
  "baseStats": {
    "hp": 75,
    "attack": 100,
    "defense": 95,
    "spAtk": 40,
    "spDef": 70,
    "speed": 110
  },
  "abilities": [
    {
      "name": "Intimidate",
      "description": "Upon entering battle, lowers the opposing Pokémon's Attack stat.",
      "isHidden": false
    },
    {
      "name": "Anger Point",
      "description": "Raises Attack to the maximum when hit by a critical hit.",
      "isHidden": false
    },
    {
      "name": "Sheer Force",
      "description": "Moves with secondary effects have 1.3× power but lose their secondary effects.",
      "isHidden": true
    }
  ],
  "moves": [
    { "name": "Body Slam", "type": "normal", "category": "physical", "power": 85, "accuracy": 100, "pp": 15, "description": "The user drops onto the target with its full body weight. This may also leave the target with paralysis." },
    { "name": "Close Combat", "type": "fighting", "category": "physical", "power": 120, "accuracy": 100, "pp": 5, "description": "The user fights the target up close without guarding itself. This lowers the user's Defense and Sp. Def stats." },
    { "name": "Rock Slide", "type": "rock", "category": "physical", "power": 75, "accuracy": 90, "pp": 10, "description": "Large boulders are hurled at opposing Pokémon to inflict damage. This may also make the opposing Pokémon flinch." },
    { "name": "Earthquake", "type": "ground", "category": "physical", "power": 100, "accuracy": 100, "pp": 10, "description": "The user sets off an earthquake that strikes every Pokémon around it." },
    { "name": "Wild Charge", "type": "electric", "category": "physical", "power": 90, "accuracy": 100, "pp": 15, "description": "The user shrouds itself in electricity and smashes into the target. This also damages the user a little." },
    { "name": "Iron Head", "type": "steel", "category": "physical", "power": 80, "accuracy": 100, "pp": 15, "description": "The user slams the target with its steel-hard head. This may also make the target flinch." },
    { "name": "Zen Headbutt", "type": "psychic", "category": "physical", "power": 80, "accuracy": 90, "pp": 15, "description": "The user focuses its willpower to its head and attacks the target. This may also make the target flinch." },
    { "name": "Protect", "type": "normal", "category": "status", "power": null, "accuracy": null, "pp": 10, "description": "This move enables the user to protect itself from all attacks. Its chance of failing rises if it is used in succession." },
    { "name": "Helping Hand", "type": "normal", "category": "status", "power": null, "accuracy": null, "pp": 20, "description": "The user assists an ally by boosting the power of that ally's attack." },
    { "name": "Icy Wind", "type": "ice", "category": "special", "power": 55, "accuracy": 95, "pp": 15, "description": "The user attacks with a gust of chilled air. This also lowers opposing Pokémon's Speed stats." },
    { "name": "Double-Edge", "type": "normal", "category": "physical", "power": 120, "accuracy": 100, "pp": 15, "description": "A reckless life-risking tackle in which the user rushes the target. This also damages the user quite a lot." },
    { "name": "Stone Edge", "type": "rock", "category": "physical", "power": 100, "accuracy": 80, "pp": 5, "description": "The user stabs the target with sharpened stones. This move has a heightened chance of landing a critical hit." },
    { "name": "High Horsepower", "type": "ground", "category": "physical", "power": 95, "accuracy": 95, "pp": 10, "description": "The user fiercely attacks the target using its entire body." },
    { "name": "Facade", "type": "normal", "category": "physical", "power": 70, "accuracy": 100, "pp": 20, "description": "This move's power is doubled if the user is poisoned, burned, or paralyzed." },
    { "name": "Throat Chop", "type": "dark", "category": "physical", "power": 80, "accuracy": 100, "pp": 15, "description": "The user attacks the target's throat, preventing the target from using sound-based moves for two turns." },
    { "name": "Smart Strike", "type": "steel", "category": "physical", "power": 70, "accuracy": null, "pp": 10, "description": "The user stabs the target with a sharp horn. This attack never misses." },
    { "name": "Lash Out", "type": "dark", "category": "physical", "power": 75, "accuracy": 100, "pp": 5, "description": "The user lashes out to vent its frustration. This move's power is doubled if the user's stats were lowered during this turn." },
    { "name": "Raging Bull", "type": "normal", "category": "physical", "power": 90, "accuracy": 100, "pp": 10, "description": "The user performs a tackle like a raging bull. This move's type depends on the user's form. It can also break barriers such as Light Screen and Reflect." },
    { "name": "Bulldoze", "type": "ground", "category": "physical", "power": 60, "accuracy": 100, "pp": 20, "description": "The user strikes everything around it by stomping down on the ground. This lowers the Speed stats of those hit." },
    { "name": "Thunderbolt", "type": "electric", "category": "special", "power": 90, "accuracy": 100, "pp": 15, "description": "The user attacks the target with a strong electric blast. This may also leave the target with paralysis." },
    { "name": "Ice Beam", "type": "ice", "category": "special", "power": 90, "accuracy": 100, "pp": 10, "description": "The target is struck with an icy-cold beam of energy. This may also leave the target frozen." },
    { "name": "Flamethrower", "type": "fire", "category": "special", "power": 90, "accuracy": 100, "pp": 15, "description": "The target is scorched with an intense blast of fire. This may also leave the target with a burn." }
  ],
  "sprite": "/sprites/128.png",
  "officialArt": "/sprites/128.png",
  "generation": 1,
  "forms": [],
  "hasMega": false,
  "recruitmentCost": null,
  "homeCompatible": true,
  "homeSource": [
    "Scarlet/Violet",
    "Sword/Shield",
    "BDSP",
    "Pokémon GO",
    "Let's Go"
  ],
  "season": 1,
  "tier": "B",
  "usageRate": null
};

const castformEntry = {
  "id": 351,
  "name": "Castform",
  "dexNumber": 351,
  "types": ["normal"],
  "baseStats": {
    "hp": 70,
    "attack": 70,
    "defense": 70,
    "spAtk": 70,
    "spDef": 70,
    "speed": 70
  },
  "abilities": [
    {
      "name": "Forecast",
      "description": "Changes the Pokémon's type and appearance based on the weather in battle.",
      "isHidden": false
    }
  ],
  "moves": [
    { "name": "Weather Ball", "type": "normal", "category": "special", "power": 50, "accuracy": 100, "pp": 10, "description": "This attack move varies in power and type depending on the weather." },
    { "name": "Rain Dance", "type": "water", "category": "status", "power": null, "accuracy": null, "pp": 5, "description": "The user summons a heavy rain that falls for five turns, powering up Water-type attacks." },
    { "name": "Sunny Day", "type": "fire", "category": "status", "power": null, "accuracy": null, "pp": 5, "description": "The user intensifies the sun for five turns, powering up Fire-type attacks." },
    { "name": "Hail", "type": "ice", "category": "status", "power": null, "accuracy": null, "pp": 10, "description": "The user summons a hailstorm lasting five turns. It damages all Pokémon except Ice types." },
    { "name": "Protect", "type": "normal", "category": "status", "power": null, "accuracy": null, "pp": 10, "description": "This move enables the user to protect itself from all attacks. Its chance of failing rises if it is used in succession." },
    { "name": "Thunderbolt", "type": "electric", "category": "special", "power": 90, "accuracy": 100, "pp": 15, "description": "The user attacks the target with a strong electric blast. This may also leave the target with paralysis." },
    { "name": "Thunder", "type": "electric", "category": "special", "power": 110, "accuracy": 70, "pp": 10, "description": "A wicked thunderbolt is dropped on the target to inflict damage. This may also leave the target with paralysis." },
    { "name": "Ice Beam", "type": "ice", "category": "special", "power": 90, "accuracy": 100, "pp": 10, "description": "The target is struck with an icy-cold beam of energy. This may also leave the target frozen." },
    { "name": "Blizzard", "type": "ice", "category": "special", "power": 110, "accuracy": 70, "pp": 5, "description": "A howling blizzard is summoned to strike opposing Pokémon. This may also leave the opposing Pokémon frozen." },
    { "name": "Flamethrower", "type": "fire", "category": "special", "power": 90, "accuracy": 100, "pp": 15, "description": "The target is scorched with an intense blast of fire. This may also leave the target with a burn." },
    { "name": "Fire Blast", "type": "fire", "category": "special", "power": 110, "accuracy": 85, "pp": 5, "description": "The target is attacked with an intense blast of all-consuming fire. This may also leave the target with a burn." },
    { "name": "Shadow Ball", "type": "ghost", "category": "special", "power": 80, "accuracy": 100, "pp": 15, "description": "The user hurls a shadowy blob at the target. This may also lower the target's Sp. Def stat." },
    { "name": "Energy Ball", "type": "grass", "category": "special", "power": 90, "accuracy": 100, "pp": 10, "description": "The user draws power from nature and fires it at the target. This may also lower the target's Sp. Def stat." },
    { "name": "Solar Beam", "type": "grass", "category": "special", "power": 120, "accuracy": 100, "pp": 10, "description": "The user gathers light on the first turn, then blasts a bundled beam on the next turn." },
    { "name": "Hydro Pump", "type": "water", "category": "special", "power": 110, "accuracy": 80, "pp": 5, "description": "The target is blasted by a huge volume of water launched under great pressure." },
    { "name": "Hurricane", "type": "flying", "category": "special", "power": 110, "accuracy": 70, "pp": 10, "description": "The user attacks by wrapping its opponent in a fierce wind. This may also confuse the target." },
    { "name": "Thunder Wave", "type": "electric", "category": "status", "power": null, "accuracy": 90, "pp": 20, "description": "The user launches a weak jolt of electricity that paralyzes the target." },
    { "name": "Scald", "type": "water", "category": "special", "power": 80, "accuracy": 100, "pp": 15, "description": "The user shoots boiling hot water at its target. This may also leave the target with a burn." },
    { "name": "Facade", "type": "normal", "category": "physical", "power": 70, "accuracy": 100, "pp": 20, "description": "This move's power is doubled if the user is poisoned, burned, or paralyzed." },
    { "name": "Headbutt", "type": "normal", "category": "physical", "power": 70, "accuracy": 100, "pp": 15, "description": "The user sticks out its head and attacks by charging straight into the target. This may also make the target flinch." }
  ],
  "sprite": "/sprites/351.png",
  "officialArt": "/sprites/351.png",
  "generation": 3,
  "forms": [],
  "hasMega": false,
  "recruitmentCost": null,
  "homeCompatible": true,
  "homeSource": [
    "BDSP",
    "Pokémon GO"
  ],
  "season": 1,
  "tier": "C",
  "usageRate": null
};

// Read the file
let content = fs.readFileSync(dataFile, 'utf8');

// Find the insertion point for Tauros (after dex 127, before dex 130)
const taurosJson = JSON.stringify(taurosEntry, null, 2).replace(/^/gm, '  ');
const taurosMarker = `    "usageRate": null\n  },\n  {\n    "id": 130,\n    "name": "Gyarados",`;
const taurosReplacement = `    "usageRate": null\n  },\n${taurosJson},\n  {\n    "id": 130,\n    "name": "Gyarados",`;

if (!content.includes(taurosMarker)) {
  console.error('Could not find Tauros insertion marker (before Gyarados)');
  process.exit(1);
}
content = content.replace(taurosMarker, taurosReplacement);
console.log('✅ Inserted Tauros (#128) entry');

// Find the insertion point for Castform (after dex 350, before dex 359)
const castformJson = JSON.stringify(castformEntry, null, 2).replace(/^/gm, '  ');
const castformMarker = `    "usageRate": null\n  },\n  {\n    "id": 359,\n    "name": "Absol",`;
const castformReplacement = `    "usageRate": null\n  },\n${castformJson},\n  {\n    "id": 359,\n    "name": "Absol",`;

if (!content.includes(castformMarker)) {
  console.error('Could not find Castform insertion marker (before Absol)');
  process.exit(1);
}
content = content.replace(castformMarker, castformReplacement);
console.log('✅ Inserted Castform (#351) entry');

// Write back
fs.writeFileSync(dataFile, content, 'utf8');
console.log('✅ pokemon-data.ts updated successfully');
