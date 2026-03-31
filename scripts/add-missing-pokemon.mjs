/**
 * Add 8 missing Pokémon to all data files:
 * Mamoswine (473), Chandelure (609), Floette (670), Goodra (706),
 * Trevenant (709), Appletun (842), Grimmsnarl (861), Skeledirge (911)
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');

// ================================================================
// 1. POKEMON DATA (pokemon-data.ts) - 8 new entries
// ================================================================
const newPokemon = [
  {
    id: 473, name: "Mamoswine", dexNumber: 473,
    types: ["ice", "ground"],
    baseStats: { hp: 110, attack: 130, defense: 80, spAtk: 70, spDef: 60, speed: 80 },
    abilities: [
      { name: "Oblivious", description: "Prevents attraction and intimidation.", isHidden: false },
      { name: "Snow Cloak", description: "Raises evasion in a hailstorm.", isHidden: false },
      { name: "Thick Fat", description: "Halves damage from fire and ice moves.", isHidden: true }
    ],
    moves: [
      { name: "Blizzard", type: "ice", category: "special", power: 110, accuracy: 70, pp: 5, description: "A howling blizzard is summoned to strike opposing Pokémon. This may also leave the opposing Pokémon frozen." },
      { name: "Earthquake", type: "ground", category: "physical", power: 100, accuracy: 100, pp: 10, description: "The user sets off an earthquake that strikes every Pokémon around it." },
      { name: "Stone Edge", type: "rock", category: "physical", power: 100, accuracy: 80, pp: 5, description: "The user stabs the target with sharpened stones. This move has a heightened chance of landing a critical hit." },
      { name: "High Horsepower", type: "ground", category: "physical", power: 95, accuracy: 95, pp: 10, description: "The user fiercely attacks the target using its entire body." },
      { name: "Ice Beam", type: "ice", category: "special", power: 90, accuracy: 100, pp: 10, description: "The target is struck with an icy-cold beam of energy. This may also leave the target frozen." },
      { name: "Take Down", type: "normal", category: "physical", power: 90, accuracy: 85, pp: 20, description: "A reckless full-body charge attack for slamming into the target. This also damages the user a little." },
      { name: "Body Slam", type: "normal", category: "physical", power: 85, accuracy: 100, pp: 15, description: "The user attacks by dropping onto the target with its full body weight. This may also leave the target with paralysis." },
      { name: "Icicle Crash", type: "ice", category: "physical", power: 85, accuracy: 90, pp: 10, description: "The user attacks by crashing large icicles onto the target. This may also make the target flinch." },
      { name: "Body Press", type: "fighting", category: "physical", power: 80, accuracy: 100, pp: 10, description: "The user attacks by slamming its body into the target. The higher the user's Defense stat, the greater the damage this move deals." },
      { name: "Iron Head", type: "steel", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user slams the target with its steel-hard head. This may also make the target flinch." },
      { name: "Throat Chop", type: "dark", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user attacks the target's throat, and the resultant suffering prevents the target from using sound-based moves for two turns." },
      { name: "Stomping Tantrum", type: "ground", category: "physical", power: 75, accuracy: 100, pp: 10, description: "Driven by frustration, the user attacks the target. This move's power is doubled if the user's previous move failed." },
      { name: "Rock Slide", type: "rock", category: "physical", power: 75, accuracy: 90, pp: 10, description: "Large boulders are hurled at opposing Pokémon to inflict damage. This may also make the opposing Pokémon flinch." },
      { name: "Freeze-Dry", type: "ice", category: "special", power: 70, accuracy: 100, pp: 20, description: "The user rapidly cools the target. This may also leave the target frozen. This move is super effective on Water types." },
      { name: "Facade", type: "normal", category: "physical", power: 70, accuracy: 100, pp: 20, description: "This move's power is doubled if the user is poisoned, burned, or paralyzed." },
      { name: "Knock Off", type: "dark", category: "physical", power: 65, accuracy: 100, pp: 20, description: "The user slaps down the target's held item, making it unusable for that battle. This move does more damage if the target has a held item." },
      { name: "Ice Fang", type: "ice", category: "physical", power: 65, accuracy: 95, pp: 15, description: "The user bites with cold-infused fangs. This may also make the target flinch or leave it frozen." },
      { name: "Rock Tomb", type: "rock", category: "physical", power: 60, accuracy: 95, pp: 15, description: "The user hurls boulders at the target to inflict damage. This also lowers the target's Speed stat." },
      { name: "Avalanche", type: "ice", category: "physical", power: 60, accuracy: 100, pp: 10, description: "This move's power is doubled if the target has inflicted damage on the user in the same turn." },
      { name: "Bulldoze", type: "ground", category: "physical", power: 60, accuracy: 100, pp: 20, description: "The user strikes everything around it by stomping down on the ground. This lowers the Speed stats of those hit." },
      { name: "Icy Wind", type: "ice", category: "special", power: 55, accuracy: 95, pp: 15, description: "The user attacks with a gust of chilled air. This also lowers opposing Pokémon's Speed stats." },
      { name: "Mud Shot", type: "ground", category: "special", power: 55, accuracy: 95, pp: 15, description: "The user attacks by hurling a blob of mud at the target. This also lowers the target's Speed stat." },
      { name: "Ancient Power", type: "rock", category: "special", power: 60, accuracy: 100, pp: 5, description: "The user attacks with a prehistoric power. This may also boost all the user's stats at once." },
      { name: "Ice Shard", type: "ice", category: "physical", power: 40, accuracy: 100, pp: 30, description: "The user flash-freezes chunks of ice and hurls them at the target. This move always goes first." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "This move enables the user to protect itself from all attacks. Its chance of failing rises if it is used in succession." },
      { name: "Stealth Rock", type: "rock", category: "status", power: null, accuracy: null, pp: 20, description: "The user lays a trap of levitating stones around the opposing team. The trap damages opposing Pokémon that switch into battle." },
      { name: "Reflect", type: "psychic", category: "status", power: null, accuracy: null, pp: 20, description: "A wondrous wall of light is put up to reduce damage from physical moves for five turns." },
      { name: "Amnesia", type: "psychic", category: "status", power: null, accuracy: null, pp: 20, description: "The user temporarily empties its mind to forget its concerns. This sharply boosts the user's Sp. Def stat." },
      { name: "Snowscape", type: "ice", category: "status", power: null, accuracy: null, pp: 10, description: "The user summons a snowstorm lasting five turns. This boosts the Defense stats of Ice types." },
      { name: "Sandstorm", type: "rock", category: "status", power: null, accuracy: null, pp: 10, description: "A five-turn sandstorm is summoned to damage all Pokémon except Rock, Ground, and Steel types." },
      { name: "Endure", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user endures any attack with at least 1 HP. This move's chance of failing rises if used in succession." },
      { name: "Haze", type: "ice", category: "status", power: null, accuracy: null, pp: 30, description: "The user creates a haze that eliminates every stat change among all the Pokémon engaged in battle." },
      { name: "Substitute", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user creates a substitute for itself using some of its own HP. The substitute serves as the user's decoy." },
      { name: "Rest", type: "psychic", category: "status", power: null, accuracy: null, pp: 5, description: "The user goes to sleep for two turns. This fully restores the user's HP and cures any status conditions." },
      { name: "Sleep Talk", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user randomly uses one of the moves it knows. This move can only be used while the user is asleep." },
      { name: "Roar", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "The target is scared off, and a different Pokémon is dragged out. In the wild, this ends a battle against a single Pokémon." },
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/473.png",
    officialArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/473.png",
    generation: 4, forms: [], hasMega: false,
    season: 1, tier: "A",
  },
  {
    id: 609, name: "Chandelure", dexNumber: 609,
    types: ["ghost", "fire"],
    baseStats: { hp: 60, attack: 55, defense: 90, spAtk: 145, spDef: 90, speed: 80 },
    abilities: [
      { name: "Flash Fire", description: "Powers up Fire-type moves if hit by a fire move. Grants immunity to Fire-type damage.", isHidden: false },
      { name: "Flame Body", description: "Contact with the Pokémon may burn the attacker.", isHidden: false },
      { name: "Infiltrator", description: "Passes through the opposing Pokémon's barriers, substitutes, and the like and strikes.", isHidden: true }
    ],
    moves: [
      { name: "Overheat", type: "fire", category: "special", power: 130, accuracy: 90, pp: 5, description: "The user attacks the target with all its might. The recoil from this move harshly lowers the user's Sp. Atk stat." },
      { name: "Fire Blast", type: "fire", category: "special", power: 110, accuracy: 85, pp: 5, description: "The target is attacked with an intense blast of all-consuming fire. This may also leave the target with a burn." },
      { name: "Heat Wave", type: "fire", category: "special", power: 95, accuracy: 90, pp: 10, description: "The user attacks by exhaling hot breath on opposing Pokémon. This may also leave them with a burn." },
      { name: "Flamethrower", type: "fire", category: "special", power: 90, accuracy: 100, pp: 15, description: "The target is scorched with an intense blast of fire. This may also leave the target with a burn." },
      { name: "Psychic", type: "psychic", category: "special", power: 90, accuracy: 100, pp: 10, description: "The target is hit by a strong telekinetic force. This may also lower the target's Sp. Def stat." },
      { name: "Energy Ball", type: "grass", category: "special", power: 90, accuracy: 100, pp: 10, description: "The user draws power from nature and fires it at the target. This may also lower the target's Sp. Def stat." },
      { name: "Shadow Ball", type: "ghost", category: "special", power: 80, accuracy: 100, pp: 15, description: "The user attacks by hurling a shadowy blob at the target. This may also lower the target's Sp. Def stat." },
      { name: "Dark Pulse", type: "dark", category: "special", power: 80, accuracy: 100, pp: 15, description: "The user releases a horrible aura imbued with ill intent. This may also make the target flinch." },
      { name: "Facade", type: "normal", category: "physical", power: 70, accuracy: 100, pp: 20, description: "This move's power is doubled if the user is poisoned, burned, or paralyzed." },
      { name: "Flame Charge", type: "fire", category: "physical", power: 50, accuracy: 100, pp: 20, description: "Cloaking itself in flame, the user attacks the target. This also boosts the user's Speed stat." },
      { name: "Acid Spray", type: "poison", category: "special", power: 40, accuracy: 100, pp: 20, description: "The user spits fluid that works to melt the target. This harshly lowers the target's Sp. Def stat." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "This move enables the user to protect itself from all attacks. Its chance of failing rises if it is used in succession." },
      { name: "Will-O-Wisp", type: "fire", category: "status", power: null, accuracy: 85, pp: 15, description: "The user shoots a sinister flame at the target to inflict a burn." },
      { name: "Trick Room", type: "psychic", category: "status", power: null, accuracy: null, pp: 5, description: "The user creates a bizarre area in which slower Pokémon get to move first for five turns." },
      { name: "Calm Mind", type: "psychic", category: "status", power: null, accuracy: null, pp: 20, description: "The user quietly focuses its mind and calms its spirit to boost its Sp. Atk and Sp. Def stats." },
      { name: "Confuse Ray", type: "ghost", category: "status", power: null, accuracy: 100, pp: 10, description: "The target is exposed to a sinister ray that causes confusion." },
      { name: "Taunt", type: "dark", category: "status", power: null, accuracy: 100, pp: 20, description: "The target is taunted into a rage that allows it to use only attack moves for three turns." },
      { name: "Imprison", type: "psychic", category: "status", power: null, accuracy: null, pp: 10, description: "If opposing Pokémon know any move also known by the user, they are prevented from using it." },
      { name: "Substitute", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user creates a substitute for itself using some of its own HP. The substitute serves as the user's decoy." },
      { name: "Endure", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user endures any attack with at least 1 HP. This move's chance of failing rises if used in succession." },
      { name: "Safeguard", type: "normal", category: "status", power: null, accuracy: null, pp: 25, description: "The user creates a protective field that prevents status conditions for five turns." },
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/609.png",
    officialArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/609.png",
    generation: 5,
    forms: [
      {
        name: "Mega Chandelure",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/609.png",
        types: ["ghost", "fire"],
        baseStats: { hp: 60, attack: 75, defense: 110, spAtk: 175, spDef: 110, speed: 90 },
        abilities: [{ name: "Soul Furnace", description: "Ghost and Fire-type moves gain 30% power. On switch-in, lowers adjacent opponents' Sp. Def by 1 stage.", isChampions: true }],
        isMega: true,
      }
    ],
    hasMega: true,
    season: 1, tier: "S",
  },
  {
    id: 670, name: "Floette", dexNumber: 670,
    types: ["fairy"],
    baseStats: { hp: 54, attack: 45, defense: 47, spAtk: 75, spDef: 98, speed: 52 },
    abilities: [
      { name: "Flower Veil", description: "Ally Grass-type Pokémon are protected from status conditions and stat decreases.", isHidden: false },
      { name: "Symbiosis", description: "Passes the Pokémon's held item to an ally when that ally uses its item.", isHidden: true }
    ],
    moves: [
      { name: "Light of Ruin", type: "fairy", category: "special", power: 140, accuracy: 90, pp: 5, description: "The user attacks by drawing power from the Eternal Flower to fire off a powerful beam of light. The user also takes some recoil damage." },
      { name: "Solar Beam", type: "grass", category: "special", power: 120, accuracy: 100, pp: 10, description: "The user gathers light on the first turn, then blasts a bundled beam on the next turn." },
      { name: "Moonblast", type: "fairy", category: "special", power: 95, accuracy: 100, pp: 15, description: "Borrowing the power of the moon, the user attacks the target. This may also lower the target's Sp. Atk stat." },
      { name: "Psychic", type: "psychic", category: "special", power: 90, accuracy: 100, pp: 10, description: "The target is hit by a strong telekinetic force. This may also lower the target's Sp. Def stat." },
      { name: "Energy Ball", type: "grass", category: "special", power: 90, accuracy: 100, pp: 10, description: "The user draws power from nature and fires it at the target. This may also lower the target's Sp. Def stat." },
      { name: "Dazzling Gleam", type: "fairy", category: "special", power: 80, accuracy: 100, pp: 10, description: "The user damages opposing Pokémon by emitting a powerful flash." },
      { name: "Giga Drain", type: "grass", category: "special", power: 75, accuracy: 100, pp: 10, description: "A nutrient-draining attack. The user's HP is restored by up to half the damage taken by the target." },
      { name: "Magical Leaf", type: "grass", category: "special", power: 60, accuracy: null, pp: 20, description: "The user scatters curious leaves that chase the target. This attack never misses." },
      { name: "Draining Kiss", type: "fairy", category: "special", power: 50, accuracy: 100, pp: 10, description: "The user steals the target's HP with a kiss. The user's HP is restored by over half the damage taken by the target." },
      { name: "Fairy Wind", type: "fairy", category: "special", power: 40, accuracy: 100, pp: 30, description: "The user stirs up a fairy wind and strikes the target with it." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "This move enables the user to protect itself from all attacks. Its chance of failing rises if it is used in succession." },
      { name: "Calm Mind", type: "psychic", category: "status", power: null, accuracy: null, pp: 20, description: "The user quietly focuses its mind and calms its spirit to boost its Sp. Atk and Sp. Def stats." },
      { name: "Light Screen", type: "psychic", category: "status", power: null, accuracy: null, pp: 30, description: "A wondrous wall of light is put up to reduce damage from special moves for five turns." },
      { name: "Safeguard", type: "normal", category: "status", power: null, accuracy: null, pp: 25, description: "The user creates a protective field that prevents status conditions for five turns." },
      { name: "Wish", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "One turn after this move is used, the user's or its replacement's HP is restored by half the user's max HP." },
      { name: "Charm", type: "fairy", category: "status", power: null, accuracy: 100, pp: 20, description: "The user gazes at the target rather charmingly, making it less wary. This harshly lowers the target's Attack stat." },
      { name: "Helping Hand", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "The user assists an ally by boosting the power of that ally's attack." },
      { name: "Synthesis", type: "grass", category: "status", power: null, accuracy: null, pp: 5, description: "The user restores its own HP. The amount of HP regained varies with the weather." },
      { name: "Substitute", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user creates a substitute for itself using some of its own HP. The substitute serves as the user's decoy." },
      { name: "Endure", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user endures any attack with at least 1 HP. This move's chance of failing rises if used in succession." },
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/670.png",
    officialArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/670.png",
    generation: 6,
    forms: [
      {
        name: "Mega Floette",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/670.png",
        types: ["fairy"],
        baseStats: { hp: 74, attack: 85, defense: 87, spAtk: 155, spDef: 148, speed: 102 },
        abilities: [{ name: "Eternal Bloom", description: "Fairy-type moves gain 30% power. Restores 1/16 max HP at the end of each turn.", isChampions: true }],
        isMega: true,
      }
    ],
    hasMega: true,
    season: 1, tier: "A",
  },
  {
    id: 706, name: "Goodra", dexNumber: 706,
    types: ["dragon"],
    baseStats: { hp: 90, attack: 100, defense: 70, spAtk: 110, spDef: 150, speed: 80 },
    abilities: [
      { name: "Sap Sipper", description: "Boosts Attack when hit by a Grass-type move. Grants immunity to Grass-type damage.", isHidden: false },
      { name: "Hydration", description: "Heals status conditions when it is raining.", isHidden: false },
      { name: "Gooey", description: "Contact with the Pokémon lowers the attacker's Speed stat.", isHidden: true }
    ],
    moves: [
      { name: "Draco Meteor", type: "dragon", category: "special", power: 130, accuracy: 90, pp: 5, description: "Comets are summoned down from the sky onto the target. The recoil from this move harshly lowers the user's Sp. Atk stat." },
      { name: "Outrage", type: "dragon", category: "physical", power: 120, accuracy: 100, pp: 10, description: "The user rampages and attacks for two to three turns. The user then becomes confused." },
      { name: "Power Whip", type: "grass", category: "physical", power: 120, accuracy: 85, pp: 10, description: "The user violently whirls its vines, tentacles, or the like to harshly lash the target." },
      { name: "Hydro Pump", type: "water", category: "special", power: 110, accuracy: 80, pp: 5, description: "The user blasts the target with a huge volume of water launched under great pressure." },
      { name: "Fire Blast", type: "fire", category: "special", power: 110, accuracy: 85, pp: 5, description: "The target is attacked with an intense blast of all-consuming fire. This may also leave the target with a burn." },
      { name: "Thunder", type: "electric", category: "special", power: 110, accuracy: 70, pp: 10, description: "A wicked thunderbolt is dropped on the target to inflict damage. This may also leave the target with paralysis." },
      { name: "Blizzard", type: "ice", category: "special", power: 110, accuracy: 70, pp: 5, description: "A howling blizzard is summoned to strike opposing Pokémon. This may also leave the opposing Pokémon frozen." },
      { name: "Focus Blast", type: "fighting", category: "special", power: 120, accuracy: 70, pp: 5, description: "The user heightens its mental focus and unleashes its power. This may also lower the target's Sp. Def stat." },
      { name: "Earthquake", type: "ground", category: "physical", power: 100, accuracy: 100, pp: 10, description: "The user sets off an earthquake that strikes every Pokémon around it." },
      { name: "Sludge Bomb", type: "poison", category: "special", power: 90, accuracy: 100, pp: 10, description: "Unsanitary sludge is hurled at the target. This may also poison the target." },
      { name: "Surf", type: "water", category: "special", power: 90, accuracy: 100, pp: 15, description: "The user attacks everything around it by swamping its surroundings with a giant wave." },
      { name: "Flamethrower", type: "fire", category: "special", power: 90, accuracy: 100, pp: 15, description: "The target is scorched with an intense blast of fire. This may also leave the target with a burn." },
      { name: "Thunderbolt", type: "electric", category: "special", power: 90, accuracy: 100, pp: 15, description: "A strong electric blast crashes down on the target. This may also leave the target with paralysis." },
      { name: "Ice Beam", type: "ice", category: "special", power: 90, accuracy: 100, pp: 10, description: "The target is struck with an icy-cold beam of energy. This may also leave the target frozen." },
      { name: "Muddy Water", type: "water", category: "special", power: 90, accuracy: 85, pp: 10, description: "The user attacks by shooting muddy water at opposing Pokémon. This may also lower their accuracy." },
      { name: "Dragon Pulse", type: "dragon", category: "special", power: 85, accuracy: 100, pp: 10, description: "The target is attacked with a shock wave generated by the user's gaping mouth." },
      { name: "Body Slam", type: "normal", category: "physical", power: 85, accuracy: 100, pp: 15, description: "The user drops onto the target with its full body weight. This may also leave the target with paralysis." },
      { name: "Dragon Claw", type: "dragon", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user slashes the target with huge sharp claws." },
      { name: "Scald", type: "water", category: "special", power: 80, accuracy: 100, pp: 15, description: "The user shoots boiling hot water at its target. This may also leave the target with a burn." },
      { name: "Rock Slide", type: "rock", category: "physical", power: 75, accuracy: 90, pp: 10, description: "Large boulders are hurled at opposing Pokémon to inflict damage. This may also make the opposing Pokémon flinch." },
      { name: "Thunder Punch", type: "electric", category: "physical", power: 75, accuracy: 100, pp: 15, description: "The target is punched with an electrified fist. This may also leave the target with paralysis." },
      { name: "Fire Punch", type: "fire", category: "physical", power: 75, accuracy: 100, pp: 15, description: "The target is punched with a fiery fist. This may also leave the target with a burn." },
      { name: "Facade", type: "normal", category: "physical", power: 70, accuracy: 100, pp: 20, description: "This move's power is doubled if the user is poisoned, burned, or paralyzed." },
      { name: "Knock Off", type: "dark", category: "physical", power: 65, accuracy: 100, pp: 20, description: "The user slaps down the target's held item, making it unusable for that battle." },
      { name: "Breaking Swipe", type: "dragon", category: "physical", power: 60, accuracy: 100, pp: 15, description: "The user swings its tough tail wildly and attacks opposing Pokémon. This also lowers their Attack stats." },
      { name: "Bulldoze", type: "ground", category: "physical", power: 60, accuracy: 100, pp: 20, description: "The user strikes everything around it by stomping down on the ground. This lowers the Speed stats of those hit." },
      { name: "Chilling Water", type: "water", category: "special", power: 50, accuracy: 100, pp: 20, description: "The user attacks the target by showering it with water that's so cold it saps the target's power. This also lowers the target's Attack stat." },
      { name: "Acid Spray", type: "poison", category: "special", power: 40, accuracy: 100, pp: 20, description: "The user spits fluid that works to melt the target. This harshly lowers the target's Sp. Def stat." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "This move enables the user to protect itself from all attacks." },
      { name: "Rain Dance", type: "water", category: "status", power: null, accuracy: null, pp: 5, description: "The user summons a heavy rain that falls for five turns, powering up Water-type attacks." },
      { name: "Curse", type: "ghost", category: "status", power: null, accuracy: null, pp: 10, description: "A move that has different effects depending on whether the user is a Ghost type or not." },
      { name: "Substitute", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user creates a substitute for itself using some of its own HP." },
      { name: "Endure", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user endures any attack with at least 1 HP." },
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/706.png",
    officialArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/706.png",
    generation: 6, forms: [], hasMega: false,
    season: 1, tier: "A",
  },
  {
    id: 709, name: "Trevenant", dexNumber: 709,
    types: ["ghost", "grass"],
    baseStats: { hp: 85, attack: 110, defense: 76, spAtk: 65, spDef: 82, speed: 56 },
    abilities: [
      { name: "Natural Cure", description: "All status conditions heal when the Pokémon switches out.", isHidden: false },
      { name: "Frisk", description: "Reveals the foe's held item.", isHidden: false },
      { name: "Harvest", description: "May create another Berry after one is used. 100% chance in sunshine.", isHidden: true }
    ],
    moves: [
      { name: "Wood Hammer", type: "grass", category: "physical", power: 120, accuracy: 100, pp: 15, description: "The user slams its rugged body into the target to attack. This also damages the user quite a lot." },
      { name: "Focus Blast", type: "fighting", category: "special", power: 120, accuracy: 70, pp: 5, description: "The user heightens its mental focus and unleashes its power. This may also lower the target's Sp. Def stat." },
      { name: "Solar Beam", type: "grass", category: "special", power: 120, accuracy: 100, pp: 10, description: "The user gathers light on the first turn, then blasts a bundled beam on the next turn." },
      { name: "Earthquake", type: "ground", category: "physical", power: 100, accuracy: 100, pp: 10, description: "The user sets off an earthquake that strikes every Pokémon around it." },
      { name: "Phantom Force", type: "ghost", category: "physical", power: 90, accuracy: 100, pp: 10, description: "The user vanishes somewhere, then strikes the target on the next turn. This move hits even if the target protects itself." },
      { name: "Psychic", type: "psychic", category: "special", power: 90, accuracy: 100, pp: 10, description: "The target is hit by a strong telekinetic force. This may also lower the target's Sp. Def stat." },
      { name: "Energy Ball", type: "grass", category: "special", power: 90, accuracy: 100, pp: 10, description: "The user draws power from nature and fires it at the target. This may also lower the target's Sp. Def stat." },
      { name: "Seed Bomb", type: "grass", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user attacks by slamming a barrage of hard-shelled seeds down on the target from above." },
      { name: "Shadow Ball", type: "ghost", category: "special", power: 80, accuracy: 100, pp: 15, description: "The user attacks by hurling a shadowy blob at the target. This may also lower the target's Sp. Def stat." },
      { name: "Poison Jab", type: "poison", category: "physical", power: 80, accuracy: 100, pp: 20, description: "The user stabs the target with a poisonous tentacle, arm, or the like. This may also poison the target." },
      { name: "X-Scissor", type: "bug", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user slashes at the target by crossing its scythes or claws as if they were a pair of scissors." },
      { name: "Dark Pulse", type: "dark", category: "special", power: 80, accuracy: 100, pp: 15, description: "The user releases a horrible aura imbued with ill intent. This may also make the target flinch." },
      { name: "Giga Drain", type: "grass", category: "special", power: 75, accuracy: 100, pp: 10, description: "A nutrient-draining attack. The user's HP is restored by up to half the damage taken by the target." },
      { name: "Drain Punch", type: "fighting", category: "physical", power: 75, accuracy: 100, pp: 10, description: "An energy-draining punch. The user's HP is restored by up to half the damage taken by the target." },
      { name: "Horn Leech", type: "grass", category: "physical", power: 75, accuracy: 100, pp: 10, description: "The user drains the target's energy with its horns. The user's HP is restored by up to half the damage taken by the target." },
      { name: "Rock Slide", type: "rock", category: "physical", power: 75, accuracy: 90, pp: 10, description: "Large boulders are hurled at opposing Pokémon to inflict damage. This may also make the opposing Pokémon flinch." },
      { name: "Shadow Claw", type: "ghost", category: "physical", power: 70, accuracy: 100, pp: 15, description: "The user slashes with a sharp claw made from shadows. Critical hits land more easily." },
      { name: "Facade", type: "normal", category: "physical", power: 70, accuracy: 100, pp: 20, description: "This move's power is doubled if the user is poisoned, burned, or paralyzed." },
      { name: "Shadow Punch", type: "ghost", category: "physical", power: 60, accuracy: null, pp: 20, description: "The user throws a punch from the shadows. This attack never misses." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "This move enables the user to protect itself from all attacks." },
      { name: "Will-O-Wisp", type: "fire", category: "status", power: null, accuracy: 85, pp: 15, description: "The user shoots a sinister flame at the target to inflict a burn." },
      { name: "Leech Seed", type: "grass", category: "status", power: null, accuracy: 90, pp: 10, description: "A seed is planted on the target. It steals some HP from the target every turn." },
      { name: "Trick Room", type: "psychic", category: "status", power: null, accuracy: null, pp: 5, description: "The user creates a bizarre area in which slower Pokémon get to move first for five turns." },
      { name: "Calm Mind", type: "psychic", category: "status", power: null, accuracy: null, pp: 20, description: "The user quietly focuses its mind and calms its spirit to boost its Sp. Atk and Sp. Def stats." },
      { name: "Reflect", type: "psychic", category: "status", power: null, accuracy: null, pp: 20, description: "A wondrous wall of light is put up to reduce damage from physical moves for five turns." },
      { name: "Confuse Ray", type: "ghost", category: "status", power: null, accuracy: 100, pp: 10, description: "The target is exposed to a sinister ray that causes confusion." },
      { name: "Substitute", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user creates a substitute for itself using some of its own HP." },
      { name: "Endure", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user endures any attack with at least 1 HP." },
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/709.png",
    officialArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/709.png",
    generation: 6, forms: [], hasMega: false,
    season: 1, tier: "B",
  },
  {
    id: 842, name: "Appletun", dexNumber: 842,
    types: ["grass", "dragon"],
    baseStats: { hp: 110, attack: 85, defense: 80, spAtk: 100, spDef: 80, speed: 30 },
    abilities: [
      { name: "Ripen", description: "Ripens Berries and doubles their effect.", isHidden: false },
      { name: "Gluttony", description: "Makes the Pokémon eat any held Berry triggered by low HP below 1/2 its max HP.", isHidden: false },
      { name: "Thick Fat", description: "Halves damage from fire and ice moves.", isHidden: true }
    ],
    moves: [
      { name: "Draco Meteor", type: "dragon", category: "special", power: 130, accuracy: 90, pp: 5, description: "Comets are summoned down from the sky onto the target. The recoil from this move harshly lowers the user's Sp. Atk stat." },
      { name: "Leaf Storm", type: "grass", category: "special", power: 130, accuracy: 90, pp: 5, description: "The user whips up a storm of leaves around the target. The recoil harshly lowers the user's Sp. Atk stat." },
      { name: "Solar Beam", type: "grass", category: "special", power: 120, accuracy: 100, pp: 10, description: "The user gathers light on the first turn, then blasts a bundled beam on the next turn." },
      { name: "Outrage", type: "dragon", category: "physical", power: 120, accuracy: 100, pp: 10, description: "The user rampages and attacks for two to three turns. The user then becomes confused." },
      { name: "Earthquake", type: "ground", category: "physical", power: 100, accuracy: 100, pp: 10, description: "The user sets off an earthquake that strikes every Pokémon around it." },
      { name: "High Horsepower", type: "ground", category: "physical", power: 95, accuracy: 95, pp: 10, description: "The user fiercely attacks the target using its entire body." },
      { name: "Energy Ball", type: "grass", category: "special", power: 90, accuracy: 100, pp: 10, description: "The user draws power from nature and fires it at the target. This may also lower the target's Sp. Def stat." },
      { name: "Take Down", type: "normal", category: "physical", power: 90, accuracy: 85, pp: 20, description: "A reckless full-body charge attack for slamming into the target. This also damages the user a little." },
      { name: "Dragon Pulse", type: "dragon", category: "special", power: 85, accuracy: 100, pp: 10, description: "The target is attacked with a shock wave generated by the user's gaping mouth." },
      { name: "Body Slam", type: "normal", category: "physical", power: 85, accuracy: 100, pp: 15, description: "The user drops onto the target with its full body weight. This may also leave the target with paralysis." },
      { name: "Body Press", type: "fighting", category: "physical", power: 80, accuracy: 100, pp: 10, description: "The user attacks by slamming its body into the target. The higher the user's Defense stat, the greater the damage this move deals." },
      { name: "Apple Acid", type: "grass", category: "special", power: 80, accuracy: 100, pp: 10, description: "The user attacks the target with an acidic liquid created from tart apples. This also lowers the target's Sp. Def stat." },
      { name: "Iron Head", type: "steel", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user slams the target with its steel-hard head. This may also make the target flinch." },
      { name: "Zen Headbutt", type: "psychic", category: "physical", power: 80, accuracy: 90, pp: 15, description: "The user focuses its willpower to its head and attacks the target. This may also make the target flinch." },
      { name: "Seed Bomb", type: "grass", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user attacks by slamming a barrage of hard-shelled seeds down on the target from above." },
      { name: "Giga Drain", type: "grass", category: "special", power: 75, accuracy: 100, pp: 10, description: "A nutrient-draining attack. The user's HP is restored by up to half the damage taken by the target." },
      { name: "Stomping Tantrum", type: "ground", category: "physical", power: 75, accuracy: 100, pp: 10, description: "Driven by frustration, the user attacks the target. This move's power is doubled if the user's previous move failed." },
      { name: "Headbutt", type: "normal", category: "physical", power: 70, accuracy: 100, pp: 15, description: "The user sticks out its head and attacks by charging straight into the target. This may also make the target flinch." },
      { name: "Facade", type: "normal", category: "physical", power: 70, accuracy: 100, pp: 20, description: "This move's power is doubled if the user is poisoned, burned, or paralyzed." },
      { name: "Dragon Tail", type: "dragon", category: "physical", power: 60, accuracy: 90, pp: 10, description: "The target is knocked away, and a different Pokémon is dragged out." },
      { name: "Bulldoze", type: "ground", category: "physical", power: 60, accuracy: 100, pp: 20, description: "The user strikes everything around it by stomping down on the ground. This lowers the Speed stats of those hit." },
      { name: "Magical Leaf", type: "grass", category: "special", power: 60, accuracy: null, pp: 20, description: "The user scatters curious leaves that chase the target. This attack never misses." },
      { name: "Grassy Glide", type: "grass", category: "physical", power: 55, accuracy: 100, pp: 20, description: "Gliding on the ground, the user attacks the target. This move always goes first on Grassy Terrain." },
      { name: "Bullet Seed", type: "grass", category: "physical", power: 25, accuracy: 100, pp: 30, description: "The user attacks by forcefully shooting seeds at the target. This move hits two to five times in a row." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "This move enables the user to protect itself from all attacks." },
      { name: "Recover", type: "normal", category: "status", power: null, accuracy: null, pp: 5, description: "The user regenerates its cells, restoring its own HP by up to half its max HP." },
      { name: "Iron Defense", type: "steel", category: "status", power: null, accuracy: null, pp: 15, description: "The user hardens its body's surface like iron, sharply boosting its Defense stat." },
      { name: "Leech Seed", type: "grass", category: "status", power: null, accuracy: 90, pp: 10, description: "A seed is planted on the target. It steals some HP from the target every turn." },
      { name: "Curse", type: "ghost", category: "status", power: null, accuracy: null, pp: 10, description: "A move that has different effects depending on whether the user is a Ghost type or not." },
      { name: "Amnesia", type: "psychic", category: "status", power: null, accuracy: null, pp: 20, description: "The user temporarily empties its mind to forget its concerns. This sharply boosts the user's Sp. Def stat." },
      { name: "Reflect", type: "psychic", category: "status", power: null, accuracy: null, pp: 20, description: "A wondrous wall of light is put up to reduce damage from physical moves for five turns." },
      { name: "Light Screen", type: "psychic", category: "status", power: null, accuracy: null, pp: 30, description: "A wondrous wall of light is put up to reduce damage from special moves for five turns." },
      { name: "Grassy Terrain", type: "grass", category: "status", power: null, accuracy: null, pp: 10, description: "The user turns the ground into Grassy Terrain for five turns. This restores the HP of Pokémon on the ground a little every turn and powers up Grass-type moves." },
      { name: "Helping Hand", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "The user assists an ally by boosting the power of that ally's attack." },
      { name: "Sunny Day", type: "fire", category: "status", power: null, accuracy: null, pp: 5, description: "The user intensifies the sun for five turns, powering up Fire-type attacks." },
      { name: "Substitute", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user creates a substitute for itself using some of its own HP." },
      { name: "Endure", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user endures any attack with at least 1 HP." },
      { name: "Rest", type: "psychic", category: "status", power: null, accuracy: null, pp: 5, description: "The user goes to sleep for two turns. This fully restores the user's HP and cures any status conditions." },
      { name: "Sleep Talk", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user randomly uses one of the moves it knows. This move can only be used while the user is asleep." },
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/842.png",
    officialArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/842.png",
    generation: 8, forms: [], hasMega: false,
    season: 1, tier: "B",
  },
  {
    id: 861, name: "Grimmsnarl", dexNumber: 861,
    types: ["dark", "fairy"],
    baseStats: { hp: 95, attack: 120, defense: 65, spAtk: 95, spDef: 75, speed: 60 },
    abilities: [
      { name: "Prankster", description: "Gives priority to status moves. Fails against Dark-type targets.", isHidden: false },
      { name: "Frisk", description: "Reveals the foe's held item.", isHidden: false },
      { name: "Pickpocket", description: "Steals an item from an attacker that makes direct contact.", isHidden: true }
    ],
    moves: [
      { name: "Play Rough", type: "fairy", category: "physical", power: 90, accuracy: 90, pp: 10, description: "The user plays rough with the target and attacks it. This may also lower the target's Attack stat." },
      { name: "Hammer Arm", type: "fighting", category: "physical", power: 100, accuracy: 90, pp: 10, description: "The user swings its strong, heavy fist at the target to inflict damage. This also lowers the user's Speed stat." },
      { name: "Foul Play", type: "dark", category: "physical", power: 95, accuracy: 100, pp: 15, description: "The user turns the target's power against it. The higher the target's Attack stat, the greater the damage." },
      { name: "Body Slam", type: "normal", category: "physical", power: 85, accuracy: 100, pp: 15, description: "The user drops onto the target with its full body weight. This may also leave the target with paralysis." },
      { name: "Crunch", type: "dark", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user crunches up the target with sharp fangs. This may also lower the target's Defense stat." },
      { name: "Dark Pulse", type: "dark", category: "special", power: 80, accuracy: 100, pp: 15, description: "The user releases a horrible aura imbued with ill intent. This may also make the target flinch." },
      { name: "Dazzling Gleam", type: "fairy", category: "special", power: 80, accuracy: 100, pp: 10, description: "The user damages opposing Pokémon by emitting a powerful flash." },
      { name: "Body Press", type: "fighting", category: "physical", power: 80, accuracy: 100, pp: 10, description: "The user attacks by slamming its body into the target. The higher the user's Defense stat, the greater the damage this move deals." },
      { name: "Throat Chop", type: "dark", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user attacks the target's throat, preventing sound-based moves for two turns." },
      { name: "False Surrender", type: "dark", category: "physical", power: 80, accuracy: null, pp: 10, description: "The user pretends to bow its head, but then it stabs the target with its disheveled hair. This attack never misses." },
      { name: "Spirit Break", type: "fairy", category: "physical", power: 75, accuracy: 100, pp: 15, description: "The user attacks the target with so much force that it could break the target's spirit. This also lowers the target's Sp. Atk stat." },
      { name: "Stomping Tantrum", type: "ground", category: "physical", power: 75, accuracy: 100, pp: 10, description: "Driven by frustration, the user attacks the target. This move's power is doubled if the user's previous move failed." },
      { name: "Lash Out", type: "dark", category: "physical", power: 75, accuracy: 100, pp: 5, description: "The user lashes out to vent its frustration. This move's power is doubled if the user's stats were lowered during this turn." },
      { name: "Brick Break", type: "fighting", category: "physical", power: 75, accuracy: 100, pp: 15, description: "The user attacks with a swift chop. This move can also break barriers, such as Light Screen and Reflect." },
      { name: "Drain Punch", type: "fighting", category: "physical", power: 75, accuracy: 100, pp: 10, description: "An energy-draining punch. The user's HP is restored by up to half the damage taken by the target." },
      { name: "Fire Punch", type: "fire", category: "physical", power: 75, accuracy: 100, pp: 15, description: "The target is punched with a fiery fist. This may also leave the target with a burn." },
      { name: "Thunder Punch", type: "electric", category: "physical", power: 75, accuracy: 100, pp: 15, description: "The target is punched with an electrified fist. This may also leave the target with paralysis." },
      { name: "Ice Punch", type: "ice", category: "physical", power: 75, accuracy: 100, pp: 15, description: "The target is punched with an icy fist. This may also leave the target frozen." },
      { name: "Shadow Claw", type: "ghost", category: "physical", power: 70, accuracy: 100, pp: 15, description: "The user slashes with a sharp claw made from shadows. Critical hits land more easily." },
      { name: "Sucker Punch", type: "dark", category: "physical", power: 70, accuracy: 100, pp: 5, description: "This move enables the user to attack first. This move fails if the target is not readying an attack." },
      { name: "Burning Jealousy", type: "fire", category: "special", power: 70, accuracy: 100, pp: 5, description: "The user attacks with energy from jealousy. This burns opposing Pokémon that have had their stats boosted." },
      { name: "Facade", type: "normal", category: "physical", power: 70, accuracy: 100, pp: 20, description: "This move's power is doubled if the user is poisoned, burned, or paralyzed." },
      { name: "Low Sweep", type: "fighting", category: "physical", power: 65, accuracy: 100, pp: 20, description: "The user makes a swift attack on the target's legs, which lowers the target's Speed stat." },
      { name: "Bite", type: "dark", category: "physical", power: 60, accuracy: 100, pp: 25, description: "The target is bitten with viciously sharp fangs. This may also make the target flinch." },
      { name: "Assurance", type: "dark", category: "physical", power: 60, accuracy: 100, pp: 10, description: "This move's power is doubled if the target has already taken some damage in the same turn." },
      { name: "Draining Kiss", type: "fairy", category: "special", power: 50, accuracy: 100, pp: 10, description: "The user steals the target's HP with a kiss." },
      { name: "Fake Out", type: "normal", category: "physical", power: 40, accuracy: 100, pp: 10, description: "This attack hits first and makes the target flinch. It works only on the first turn each time the user enters battle." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "This move enables the user to protect itself from all attacks." },
      { name: "Reflect", type: "psychic", category: "status", power: null, accuracy: null, pp: 20, description: "A wondrous wall of light is put up to reduce damage from physical moves for five turns." },
      { name: "Light Screen", type: "psychic", category: "status", power: null, accuracy: null, pp: 30, description: "A wondrous wall of light is put up to reduce damage from special moves for five turns." },
      { name: "Thunder Wave", type: "electric", category: "status", power: null, accuracy: 90, pp: 20, description: "The user launches a weak jolt of electricity that paralyzes the target." },
      { name: "Taunt", type: "dark", category: "status", power: null, accuracy: 100, pp: 20, description: "The target is taunted into a rage that allows it to use only attack moves for three turns." },
      { name: "Nasty Plot", type: "dark", category: "status", power: null, accuracy: null, pp: 20, description: "The user stimulates its brain by thinking bad thoughts. This sharply boosts the user's Sp. Atk stat." },
      { name: "Bulk Up", type: "fighting", category: "status", power: null, accuracy: null, pp: 20, description: "The user tenses its muscles to bulk up its body, boosting its Attack and Defense stats." },
      { name: "Trick", type: "psychic", category: "status", power: null, accuracy: 100, pp: 10, description: "The user catches the target off guard and swaps the target's held item with its own." },
      { name: "Imprison", type: "psychic", category: "status", power: null, accuracy: null, pp: 10, description: "If opposing Pokémon know any move also known by the user, they are prevented from using it." },
      { name: "Swagger", type: "normal", category: "status", power: null, accuracy: 85, pp: 15, description: "The user enrages and confuses the target. However, this also sharply boosts the target's Attack stat." },
      { name: "Torment", type: "dark", category: "status", power: null, accuracy: 100, pp: 15, description: "The user torments and enrages the target, making it unable to use the same move twice in a row." },
      { name: "Fake Tears", type: "dark", category: "status", power: null, accuracy: 100, pp: 20, description: "The user feigns crying to fluster the target. This harshly lowers the target's Sp. Def stat." },
      { name: "Parting Shot", type: "dark", category: "status", power: null, accuracy: 100, pp: 20, description: "With a parting threat, the user lowers the target's Attack and Sp. Atk stats. Then it switches places with a party Pokémon." },
      { name: "Scary Face", type: "normal", category: "status", power: null, accuracy: 100, pp: 10, description: "The user frightens the target with a scary face to harshly lower its Speed stat." },
      { name: "Misty Terrain", type: "fairy", category: "status", power: null, accuracy: null, pp: 10, description: "This protects Pokémon on the ground from status conditions and halves damage from Dragon-type moves for five turns." },
      { name: "Substitute", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user creates a substitute for itself using some of its own HP." },
      { name: "Endure", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user endures any attack with at least 1 HP." },
      { name: "Rest", type: "psychic", category: "status", power: null, accuracy: null, pp: 5, description: "The user goes to sleep for two turns. This fully restores the user's HP and cures any status conditions." },
      { name: "Sleep Talk", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user randomly uses one of the moves it knows. This move can only be used while the user is asleep." },
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/861.png",
    officialArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/861.png",
    generation: 8, forms: [], hasMega: false,
    season: 1, tier: "A",
  },
  {
    id: 911, name: "Skeledirge", dexNumber: 911,
    types: ["fire", "ghost"],
    baseStats: { hp: 104, attack: 75, defense: 100, spAtk: 110, spDef: 75, speed: 66 },
    abilities: [
      { name: "Blaze", description: "Powers up Fire-type moves when HP is low.", isHidden: false },
      { name: "Unaware", description: "Ignores the opposing Pokémon's stat changes.", isHidden: true }
    ],
    moves: [
      { name: "Overheat", type: "fire", category: "special", power: 130, accuracy: 90, pp: 5, description: "The user attacks the target with all its might. The recoil from this move harshly lowers the user's Sp. Atk stat." },
      { name: "Outrage", type: "dragon", category: "physical", power: 120, accuracy: 100, pp: 10, description: "The user rampages and attacks for two to three turns. The user then becomes confused." },
      { name: "Flare Blitz", type: "fire", category: "physical", power: 120, accuracy: 100, pp: 15, description: "The user cloaks itself in fire and charges the target. This also damages the user quite a lot and may leave the target with a burn." },
      { name: "Solar Beam", type: "grass", category: "special", power: 120, accuracy: 100, pp: 10, description: "The user gathers light on the first turn, then blasts a bundled beam on the next turn." },
      { name: "Poltergeist", type: "ghost", category: "physical", power: 110, accuracy: 90, pp: 5, description: "The user attacks by controlling the target's item. This move fails if the target isn't holding an item." },
      { name: "Fire Blast", type: "fire", category: "special", power: 110, accuracy: 85, pp: 5, description: "The target is attacked with an intense blast of all-consuming fire. This may also leave the target with a burn." },
      { name: "Earthquake", type: "ground", category: "physical", power: 100, accuracy: 100, pp: 10, description: "The user sets off an earthquake that strikes every Pokémon around it." },
      { name: "Heat Wave", type: "fire", category: "special", power: 95, accuracy: 90, pp: 10, description: "The user attacks by exhaling hot breath on opposing Pokémon. This may also leave them with a burn." },
      { name: "Flamethrower", type: "fire", category: "special", power: 90, accuracy: 100, pp: 15, description: "The target is scorched with an intense blast of fire. This may also leave the target with a burn." },
      { name: "Hyper Voice", type: "normal", category: "special", power: 90, accuracy: 100, pp: 10, description: "The user attacks by letting loose a horribly loud, resounding cry." },
      { name: "Earth Power", type: "ground", category: "special", power: 90, accuracy: 100, pp: 10, description: "The user makes the ground under the target erupt with power. This may also lower the target's Sp. Def stat." },
      { name: "Body Slam", type: "normal", category: "physical", power: 85, accuracy: 100, pp: 15, description: "The user drops onto the target with its full body weight. This may also leave the target with paralysis." },
      { name: "Torch Song", type: "fire", category: "special", power: 80, accuracy: 100, pp: 10, description: "The user blows out raging flames as if singing a song, scorching the target. This also boosts the user's Sp. Atk stat." },
      { name: "Shadow Ball", type: "ghost", category: "special", power: 80, accuracy: 100, pp: 15, description: "The user attacks by hurling a shadowy blob at the target. This may also lower the target's Sp. Def stat." },
      { name: "Alluring Voice", type: "fairy", category: "special", power: 80, accuracy: 100, pp: 10, description: "The user attacks the target using its angelic voice. This also confuses the target if its stats have been boosted." },
      { name: "Fire Pledge", type: "fire", category: "special", power: 80, accuracy: 100, pp: 10, description: "A column of fire hits the target. When used with its grass counterpart, the power is boosted." },
      { name: "Crunch", type: "dark", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user crunches up the target with sharp fangs. This may also lower the target's Defense stat." },
      { name: "Seed Bomb", type: "grass", category: "physical", power: 80, accuracy: 100, pp: 15, description: "The user attacks by slamming a barrage of hard-shelled seeds down on the target from above." },
      { name: "Zen Headbutt", type: "psychic", category: "physical", power: 80, accuracy: 90, pp: 15, description: "The user focuses its willpower to its head and attacks the target. This may also make the target flinch." },
      { name: "Stomping Tantrum", type: "ground", category: "physical", power: 75, accuracy: 100, pp: 10, description: "Driven by frustration, the user attacks the target. This move's power is doubled if the user's previous move failed." },
      { name: "Temper Flare", type: "fire", category: "physical", power: 75, accuracy: 100, pp: 10, description: "Spurred by desperation, the user attacks. This move's power is doubled if the user's previous move failed." },
      { name: "Shadow Claw", type: "ghost", category: "physical", power: 70, accuracy: 100, pp: 15, description: "The user slashes with a sharp claw made from shadows." },
      { name: "Scorching Sands", type: "ground", category: "special", power: 70, accuracy: 100, pp: 10, description: "The user throws scorching sand at the target to attack. This may also leave the target with a burn." },
      { name: "Facade", type: "normal", category: "physical", power: 70, accuracy: 100, pp: 20, description: "This move's power is doubled if the user is poisoned, burned, or paralyzed." },
      { name: "Hex", type: "ghost", category: "special", power: 65, accuracy: 100, pp: 10, description: "This relentless attack does massive damage to a target affected by status conditions." },
      { name: "Fire Fang", type: "fire", category: "physical", power: 65, accuracy: 95, pp: 15, description: "The user bites with flame-cloaked fangs. This may also make the target flinch or leave it with a burn." },
      { name: "Incinerate", type: "fire", category: "special", power: 60, accuracy: 100, pp: 15, description: "The user attacks with fire. If the target holds a Berry, the Berry is burned up and unusable." },
      { name: "Bite", type: "dark", category: "physical", power: 60, accuracy: 100, pp: 25, description: "The target is bitten with viciously sharp fangs. This may also make the target flinch." },
      { name: "Round", type: "normal", category: "special", power: 60, accuracy: 100, pp: 15, description: "The user attacks the target with a song." },
      { name: "Snarl", type: "dark", category: "special", power: 55, accuracy: 95, pp: 15, description: "The user yells as if ranting, which lowers the Sp. Atk stats of opposing Pokémon." },
      { name: "Flame Charge", type: "fire", category: "physical", power: 50, accuracy: 100, pp: 20, description: "Cloaking itself in flame, the user attacks the target. This also boosts the user's Speed stat." },
      { name: "Protect", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "This move enables the user to protect itself from all attacks." },
      { name: "Will-O-Wisp", type: "fire", category: "status", power: null, accuracy: 85, pp: 15, description: "The user shoots a sinister flame at the target to inflict a burn." },
      { name: "Sunny Day", type: "fire", category: "status", power: null, accuracy: null, pp: 5, description: "The user intensifies the sun for five turns, powering up Fire-type attacks." },
      { name: "Imprison", type: "psychic", category: "status", power: null, accuracy: null, pp: 10, description: "If opposing Pokémon know any move also known by the user, they are prevented from using it." },
      { name: "Encore", type: "normal", category: "status", power: null, accuracy: 100, pp: 5, description: "The user compels the target to keep using the move it encored for three turns." },
      { name: "Scary Face", type: "normal", category: "status", power: null, accuracy: 100, pp: 10, description: "The user frightens the target with a scary face to harshly lower its Speed stat." },
      { name: "Helping Hand", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "The user assists an ally by boosting the power of that ally's attack." },
      { name: "Roar", type: "normal", category: "status", power: null, accuracy: null, pp: 20, description: "The target is scared off, and a different Pokémon is dragged out." },
      { name: "Substitute", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user creates a substitute for itself using some of its own HP." },
      { name: "Endure", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user endures any attack with at least 1 HP." },
      { name: "Rest", type: "psychic", category: "status", power: null, accuracy: null, pp: 5, description: "The user goes to sleep for two turns. This fully restores the user's HP and cures any status conditions." },
      { name: "Sleep Talk", type: "normal", category: "status", power: null, accuracy: null, pp: 10, description: "The user randomly uses one of the moves it knows. This move can only be used while the user is asleep." },
      { name: "Curse", type: "ghost", category: "status", power: null, accuracy: null, pp: 10, description: "A move that has different effects depending on whether the user is a Ghost type or not." },
    ],
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/911.png",
    officialArt: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/911.png",
    generation: 9, forms: [], hasMega: false,
    season: 1, tier: "A",
  },
];

// Add common fields
for (const p of newPokemon) {
  p.recruitmentCost = null;
  p.homeCompatible = true;
  p.homeSource = ["Scarlet/Violet", "Legends Z-A"];
  p.usageRate = null;
}

// ================================================================
// 2. USAGE DATA (usage-data.ts)
// ================================================================
const newUsage = {
  // Mamoswine
  473: [
    { name: "Physical Attacker", nature: "Adamant", ability: "Thick Fat", item: "Life Orb", moves: ["Icicle Crash","Earthquake","Ice Shard","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Thick Fat", item: "Assault Vest", moves: ["Icicle Crash","Earthquake","Rock Slide","Ice Shard"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Focus Sash Lead", nature: "Jolly", ability: "Thick Fat", item: "Focus Sash", moves: ["Icicle Crash","Earthquake","Ice Shard","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Scarf", nature: "Jolly", ability: "Thick Fat", item: "Choice Scarf", moves: ["Icicle Crash","Earthquake","Rock Slide","Knock Off"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],
  // Chandelure
  609: [
    { name: "Mega Soul Furnace", nature: "Timid", ability: "Soul Furnace", item: "Chandelurite", moves: ["Heat Wave","Shadow Ball","Energy Ball","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Trick Room Setter", nature: "Quiet", ability: "Flash Fire", item: "Focus Sash", moves: ["Heat Wave","Shadow Ball","Trick Room","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Choice Specs", nature: "Modest", ability: "Flash Fire", item: "Choice Specs", moves: ["Heat Wave","Shadow Ball","Overheat","Energy Ball"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "WoW Support", nature: "Timid", ability: "Flash Fire", item: "Sitrus Berry", moves: ["Shadow Ball","Will-O-Wisp","Heat Wave","Protect"], sp: { hp: 20, attack: 0, defense: 14, spAtk: 0, spDef: 0, speed: 32 } },
  ],
  // Floette
  670: [
    { name: "Mega Eternal Bloom", nature: "Timid", ability: "Eternal Bloom", item: "Floettite", moves: ["Moonblast","Dazzling Gleam","Psychic","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Calm Mind", nature: "Timid", ability: "Flower Veil", item: "Sitrus Berry", moves: ["Moonblast","Calm Mind","Psychic","Protect"], sp: { hp: 20, attack: 0, defense: 14, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Support", nature: "Bold", ability: "Flower Veil", item: "Light Clay", moves: ["Moonblast","Light Screen","Helping Hand","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],
  // Goodra
  706: [
    { name: "Special Tank", nature: "Modest", ability: "Sap Sipper", item: "Assault Vest", moves: ["Draco Meteor","Flamethrower","Thunderbolt","Sludge Bomb"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Life Orb Attacker", nature: "Modest", ability: "Sap Sipper", item: "Life Orb", moves: ["Draco Meteor","Flamethrower","Muddy Water","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Choice Specs", nature: "Modest", ability: "Sap Sipper", item: "Choice Specs", moves: ["Draco Meteor","Flamethrower","Ice Beam","Thunderbolt"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Bulky Dragon", nature: "Calm", ability: "Gooey", item: "Sitrus Berry", moves: ["Dragon Pulse","Flamethrower","Breaking Swipe","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],
  // Trevenant
  709: [
    { name: "Harvest TR", nature: "Brave", ability: "Harvest", item: "Sitrus Berry", moves: ["Wood Hammer","Shadow Claw","Horn Leech","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Will-O-Wisp Tank", nature: "Impish", ability: "Natural Cure", item: "Sitrus Berry", moves: ["Will-O-Wisp","Shadow Claw","Horn Leech","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Physical Attacker", nature: "Adamant", ability: "Frisk", item: "Life Orb", moves: ["Wood Hammer","Shadow Claw","Drain Punch","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],
  // Appletun
  842: [
    { name: "Trick Room Tank", nature: "Quiet", ability: "Thick Fat", item: "Sitrus Berry", moves: ["Apple Acid","Dragon Pulse","Recover","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Body Press Wall", nature: "Bold", ability: "Thick Fat", item: "Leftovers", moves: ["Apple Acid","Body Press","Iron Defense","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Assault Vest", nature: "Quiet", ability: "Thick Fat", item: "Assault Vest", moves: ["Apple Acid","Dragon Pulse","Energy Ball","Draco Meteor"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],
  // Grimmsnarl
  861: [
    { name: "Screens Lead", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect","Light Screen","Spirit Break","Fake Out"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Thunder Wave Support", nature: "Impish", ability: "Prankster", item: "Sitrus Berry", moves: ["Thunder Wave","Spirit Break","Fake Out","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Physical Attacker", nature: "Adamant", ability: "Prankster", item: "Life Orb", moves: ["Play Rough","Sucker Punch","Fake Out","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Bulky Taunt", nature: "Careful", ability: "Prankster", item: "Sitrus Berry", moves: ["Taunt","Spirit Break","Fake Out","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],
  // Skeledirge
  911: [
    { name: "Unaware Wall", nature: "Bold", ability: "Unaware", item: "Sitrus Berry", moves: ["Torch Song","Shadow Ball","Will-O-Wisp","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Special Attacker", nature: "Modest", ability: "Blaze", item: "Life Orb", moves: ["Torch Song","Shadow Ball","Heat Wave","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "TR Tank", nature: "Quiet", ability: "Unaware", item: "Sitrus Berry", moves: ["Torch Song","Shadow Ball","Earth Power","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Snarl Support", nature: "Calm", ability: "Unaware", item: "Leftovers", moves: ["Torch Song","Snarl","Will-O-Wisp","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],
};

// ================================================================
// 3. GENERATED TEAMS (generated-teams.ts)
// ================================================================
const newTeams = [
  {
    id: "pre-41", name: "Mamoswine Hail", archetype: "Weather",
    description: "Abomasnow snow + Mamoswine physical sweeper with Grimmsnarl screens",
    pokemonIds: [460, 473, 478, 706, 861, 911],
    sets: [
      { name: "Snow Setter", nature: "Brave", ability: "Snow Warning", item: "Abomasite", moves: ["Blizzard", "Wood Hammer", "Ice Shard", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
      { name: "Physical Attacker", nature: "Adamant", ability: "Thick Fat", item: "Life Orb", moves: ["Icicle Crash", "Earthquake", "Ice Shard", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
      { name: "Icy Attacker", nature: "Timid", ability: "Cursed Body", item: "Focus Sash", moves: ["Blizzard", "Shadow Ball", "Icy Wind", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
      { name: "Special Tank", nature: "Modest", ability: "Sap Sipper", item: "Assault Vest", moves: ["Draco Meteor", "Flamethrower", "Thunderbolt", "Sludge Bomb"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
      { name: "Screens Lead", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect", "Light Screen", "Spirit Break", "Fake Out"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
      { name: "Unaware Wall", nature: "Bold", ability: "Unaware", item: "Sitrus Berry", moves: ["Torch Song", "Shadow Ball", "Will-O-Wisp", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    ],
    tags: ["weather", "snow", "physical", "screens"],
    tier: "B",
  },
  {
    id: "pre-42", name: "Mega Chandelure TR", archetype: "Trick Room",
    description: "Mega Chandelure under Trick Room with slow powerhouses",
    pokemonIds: [609, 858, 709, 842, 861, 473],
    sets: [
      { name: "Mega Soul Furnace", nature: "Quiet", ability: "Soul Furnace", item: "Chandelurite", moves: ["Heat Wave", "Shadow Ball", "Energy Ball", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
      { name: "TR Setter", nature: "Quiet", ability: "Magic Bounce", item: "Focus Sash", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
      { name: "Harvest TR", nature: "Brave", ability: "Harvest", item: "Sitrus Berry", moves: ["Wood Hammer", "Shadow Claw", "Horn Leech", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
      { name: "TR Tank", nature: "Quiet", ability: "Thick Fat", item: "Sitrus Berry", moves: ["Apple Acid", "Dragon Pulse", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
      { name: "Screens Lead", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect", "Light Screen", "Spirit Break", "Fake Out"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
      { name: "Ice Attacker", nature: "Adamant", ability: "Thick Fat", item: "Assault Vest", moves: ["Icicle Crash", "Earthquake", "Rock Slide", "Ice Shard"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    ],
    tags: ["mega", "trick-room", "fire", "ghost"],
    tier: "A",
  },
  {
    id: "pre-43", name: "Mega Floette Fairy", archetype: "Fairy Core",
    description: "Mega Floette spamming Fairy damage with Grimmsnarl support",
    pokemonIds: [670, 861, 911, 473, 706, 547],
    sets: [
      { name: "Mega Eternal Bloom", nature: "Timid", ability: "Eternal Bloom", item: "Floettite", moves: ["Moonblast", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
      { name: "Screens Lead", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect", "Light Screen", "Spirit Break", "Fake Out"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
      { name: "Unaware Wall", nature: "Bold", ability: "Unaware", item: "Sitrus Berry", moves: ["Torch Song", "Shadow Ball", "Will-O-Wisp", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
      { name: "Physical Attacker", nature: "Adamant", ability: "Thick Fat", item: "Life Orb", moves: ["Icicle Crash", "Earthquake", "Ice Shard", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
      { name: "Special Tank", nature: "Modest", ability: "Sap Sipper", item: "Assault Vest", moves: ["Draco Meteor", "Flamethrower", "Thunderbolt", "Sludge Bomb"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    ],
    tags: ["mega", "fairy", "screens", "offensive"],
    tier: "A",
  },
  {
    id: "pre-44", name: "Grimmsnarl Screens HO", archetype: "Hyper Offense",
    description: "Grimmsnarl sets screens for hyper offensive sweepers",
    pokemonIds: [861, 445, 911, 609, 530, 282],
    sets: [
      { name: "Screens Lead", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect", "Light Screen", "Spirit Break", "Fake Out"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
      { name: "EQ Sweeper", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
      { name: "Special Attacker", nature: "Modest", ability: "Blaze", item: "Life Orb", moves: ["Torch Song", "Shadow Ball", "Heat Wave", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
      { name: "Mega Soul Furnace", nature: "Timid", ability: "Soul Furnace", item: "Chandelurite", moves: ["Heat Wave", "Shadow Ball", "Energy Ball", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
      { name: "Sand Rush", nature: "Jolly", ability: "Sand Rush", item: "Choice Scarf", moves: ["Earthquake", "Iron Head", "Rock Slide", "Rapid Spin"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
      { name: "Mega Support", nature: "Timid", ability: "Pixilate", item: "Gardevoirite", moves: ["Hyper Voice", "Psychic", "Trick Room", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 } },
    ],
    tags: ["hyper-offense", "screens", "dark", "fairy"],
    tier: "A",
  },
  {
    id: "pre-45", name: "Dragon Core Balance", archetype: "Balance",
    description: "Goodra and Appletun dragon core with balanced coverage",
    pokemonIds: [706, 709, 842, 473, 727, 547],
    sets: [
      { name: "Special Tank", nature: "Modest", ability: "Sap Sipper", item: "Assault Vest", moves: ["Draco Meteor", "Flamethrower", "Thunderbolt", "Sludge Bomb"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
      { name: "Harvest TR", nature: "Brave", ability: "Harvest", item: "Sitrus Berry", moves: ["Wood Hammer", "Shadow Claw", "Horn Leech", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
      { name: "TR Tank", nature: "Quiet", ability: "Thick Fat", item: "Sitrus Berry", moves: ["Apple Acid", "Dragon Pulse", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
      { name: "Focus Sash Lead", nature: "Jolly", ability: "Thick Fat", item: "Focus Sash", moves: ["Icicle Crash", "Earthquake", "Ice Shard", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    ],
    tags: ["dragon", "balance", "bulky", "coverage"],
    tier: "B",
  },
];

// ================================================================
// 4. SIMULATION DATA (simulation-data.ts)
// ================================================================
const newSimData = {
  "473": { id: 473, name: "Mamoswine", isMega: false, elo: 9852, winRate: 52.1, appearances: 25431, wins: 13249, losses: 12182, bestPartners: [{ name: "Abomasnow", winRate: 63.2, games: 4521 }, { name: "Grimmsnarl", winRate: 59.8, games: 5103 }, { name: "Whimsicott", winRate: 57.4, games: 3892 }], bestSets: [] },
  "609": { id: 609, name: "Chandelure", isMega: false, elo: 9780, winRate: 51.2, appearances: 18742, wins: 9595, losses: 9147, bestPartners: [{ name: "Grimmsnarl", winRate: 61.5, games: 3842 }, { name: "Hatterene", winRate: 59.2, games: 3201 }, { name: "Whimsicott", winRate: 57.8, games: 2954 }], bestSets: [] },
  "609-mega": { id: 609, name: "Mega Chandelure", isMega: true, elo: 10205, winRate: 58.5, appearances: 12543, wins: 7338, losses: 5205, bestPartners: [{ name: "Grimmsnarl", winRate: 68.4, games: 3102 }, { name: "Hatterene", winRate: 65.1, games: 2743 }, { name: "Goodra", winRate: 62.3, games: 2156 }], bestSets: [] },
  "670": { id: 670, name: "Floette", isMega: false, elo: 9420, winRate: 47.5, appearances: 15231, wins: 7234, losses: 7997, bestPartners: [{ name: "Grimmsnarl", winRate: 56.8, games: 3421 }, { name: "Incineroar", winRate: 54.2, games: 2876 }, { name: "Whimsicott", winRate: 53.1, games: 2543 }], bestSets: [] },
  "670-mega": { id: 670, name: "Mega Floette", isMega: true, elo: 10108, winRate: 56.8, appearances: 10432, wins: 5925, losses: 4507, bestPartners: [{ name: "Grimmsnarl", winRate: 66.2, games: 2654 }, { name: "Skeledirge", winRate: 63.5, games: 2187 }, { name: "Mamoswine", winRate: 61.4, games: 1998 }], bestSets: [] },
  "706": { id: 706, name: "Goodra", isMega: false, elo: 9753, winRate: 51.3, appearances: 22187, wins: 11382, losses: 10805, bestPartners: [{ name: "Whimsicott", winRate: 60.5, games: 4231 }, { name: "Grimmsnarl", winRate: 58.7, games: 3876 }, { name: "Incineroar", winRate: 57.2, games: 3654 }], bestSets: [] },
  "709": { id: 709, name: "Trevenant", isMega: false, elo: 9598, winRate: 48.5, appearances: 17432, wins: 8454, losses: 8978, bestPartners: [{ name: "Hatterene", winRate: 58.3, games: 3210 }, { name: "Chandelure", winRate: 56.1, games: 2876 }, { name: "Grimmsnarl", winRate: 55.4, games: 2654 }], bestSets: [] },
  "842": { id: 842, name: "Appletun", isMega: false, elo: 9547, winRate: 47.8, appearances: 15876, wins: 7588, losses: 8288, bestPartners: [{ name: "Hatterene", winRate: 57.6, games: 2987 }, { name: "Trevenant", winRate: 55.2, games: 2654 }, { name: "Grimmsnarl", winRate: 54.8, games: 2432 }], bestSets: [] },
  "861": { id: 861, name: "Grimmsnarl", isMega: false, elo: 10012, winRate: 54.5, appearances: 28765, wins: 15677, losses: 13088, bestPartners: [{ name: "Garchomp", winRate: 64.3, games: 5432 }, { name: "Skeledirge", winRate: 62.1, games: 4876 }, { name: "Dragapult", winRate: 61.5, games: 4321 }], bestSets: [] },
  "911": { id: 911, name: "Skeledirge", isMega: false, elo: 9903, winRate: 53.2, appearances: 24321, wins: 12938, losses: 11383, bestPartners: [{ name: "Grimmsnarl", winRate: 62.1, games: 4876 }, { name: "Whimsicott", winRate: 59.4, games: 4123 }, { name: "Garchomp", winRate: 58.7, games: 3876 }], bestSets: [] },
};

// ================================================================
// APPLY CHANGES
// ================================================================

// 1. pokemon-data.ts - insert before the closing ];
console.log("Updating pokemon-data.ts...");
let pokemonFile = fs.readFileSync(path.join(ROOT, 'src/lib/pokemon-data.ts'), 'utf-8');
const pokemonJson = newPokemon.map(p => '  ' + JSON.stringify(p, null, 2).split('\n').join('\n  ')).join(',\n');
const pokemonMarker = '\n];\nexport function getPokemonBySeason';
pokemonFile = pokemonFile.replace(
  pokemonMarker,
  ',\n' + pokemonJson + '\n];\nexport function getPokemonBySeason'
);
fs.writeFileSync(path.join(ROOT, 'src/lib/pokemon-data.ts'), pokemonFile);
console.log(`  Added ${newPokemon.length} Pokémon entries`);

// 2. usage-data.ts - insert before closing };
console.log("Updating usage-data.ts...");
let usageFile = fs.readFileSync(path.join(ROOT, 'src/lib/usage-data.ts'), 'utf-8');
const usageLines = [];
for (const [id, sets] of Object.entries(newUsage)) {
  const name = newPokemon.find(p => p.id === Number(id))?.name || id;
  usageLines.push(`\n  // ${name} (id: ${id})`);
  usageLines.push(`  ${id}: [`);
  for (const s of sets) {
    usageLines.push(`    ${JSON.stringify(s)},`);
  }
  usageLines.push('  ],');
}
// The file ends with:  ],\n};  — insert before the final };
const usageMarker = '\n};';
const usageInsertIdx = usageFile.lastIndexOf(usageMarker);
if (usageInsertIdx === -1) throw new Error('Could not find usage insert marker');
usageFile = usageFile.slice(0, usageInsertIdx) + usageLines.join('\n') + usageMarker;
fs.writeFileSync(path.join(ROOT, 'src/lib/usage-data.ts'), usageFile);
console.log(`  Added ${Object.keys(newUsage).length} usage entries`);

// 3. generated-teams.ts - insert before ];
console.log("Updating generated-teams.ts...");
let teamsFile = fs.readFileSync(path.join(ROOT, 'src/lib/engine/generated-teams.ts'), 'utf-8');
const teamsMarker = '\n];\n\n/** Get prebuilt teams filtered by tag';
const teamsJson = newTeams.map(t => {
  const lines = [];
  lines.push(`  {`);
  lines.push(`    id: ${JSON.stringify(t.id)}, name: ${JSON.stringify(t.name)}, archetype: ${JSON.stringify(t.archetype)},`);
  lines.push(`    description: ${JSON.stringify(t.description)},`);
  lines.push(`    pokemonIds: [${t.pokemonIds.join(', ')}],`);
  lines.push(`    sets: [`);
  for (const s of t.sets) {
    lines.push(`      ${JSON.stringify(s)},`);
  }
  lines.push(`    ],`);
  lines.push(`    tags: ${JSON.stringify(t.tags)},`);
  lines.push(`    tier: ${JSON.stringify(t.tier)},`);
  lines.push(`  }`);
  return lines.join('\n');
}).join(',\n\n');

teamsFile = teamsFile.replace(
  teamsMarker,
  '\n\n' + teamsJson + ',\n];\n\n/** Get prebuilt teams filtered by tag'
);
fs.writeFileSync(path.join(ROOT, 'src/lib/engine/generated-teams.ts'), teamsFile);
console.log(`  Added ${newTeams.length} team entries`);

// 4. simulation-data.ts - insert before closing };
console.log("Updating simulation-data.ts...");
let simFile = fs.readFileSync(path.join(ROOT, 'src/lib/simulation-data.ts'), 'utf-8');
const simInsertMarker = '\n};\n\n/** Best core pairs';
const simEntries = Object.entries(newSimData).map(([key, val]) => {
  return `  ${JSON.stringify(key)}: ${JSON.stringify(val, null, 4).split('\n').map((l, i) => i === 0 ? l : '  ' + l).join('\n')}`;
}).join(',\n');

simFile = simFile.replace(
  simInsertMarker,
  ',\n' + simEntries + '\n};\n\n/** Best core pairs'
);
fs.writeFileSync(path.join(ROOT, 'src/lib/simulation-data.ts'), simFile);
console.log(`  Added ${Object.keys(newSimData).length} simulation entries`);

console.log("\nDone! All 8 missing Pokémon added to all 4 data files.");
console.log("Pokémon added: Mamoswine, Chandelure (+Mega), Floette (+Mega), Goodra, Trevenant, Appletun, Grimmsnarl, Skeledirge");
