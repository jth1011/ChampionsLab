// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — AUTO-GENERATED SIMULATION DATA
// Generated from 2,000,000 mega-aware battle simulations
// Date: 2026-03-27T22:19:04.273Z
// ═══════════════════════════════════════════════════════════════════════════════

export interface SimPokemonData {
  id: number;
  name: string;
  isMega: boolean;
  elo: number;
  winRate: number;
  appearances: number;
  wins: number;
  losses: number;
  bestPartners: { name: string; winRate: number; games: number }[];
  bestSets: { set: string; winRate: number; games: number }[];
}

export interface SimPairData {
  pokemon1: string;
  pokemon2: string;
  winRate: number;
  games: number;
}

export interface SimArchetypeData {
  name: string;
  elo: number;
  winRate: number;
  wins: number;
  losses: number;
}

export interface SimMoveData {
  name: string;
  winRate: number;
  appearances: number;
}

export interface SimMetaSnapshot {
  tier1: string[];
  tier2: string[];
  tier3: string[];
  dominantArchetypes: string[];
  bestCores: string[];
}

/** Pokemon simulation data keyed by "id" or "id-mega" */
export const SIM_POKEMON: Record<string, SimPokemonData> = {
  "3": {
    "id": 3,
    "name": "Venusaur",
    "isMega": false,
    "elo": 9663,
    "winRate": 50.5,
    "appearances": 189709,
    "wins": 95832,
    "losses": 93877,
    "bestPartners": [
      {
        "name": "Scovillain",
        "winRate": 54.5,
        "games": 9851
      },
      {
        "name": "Leafeon",
        "winRate": 54.5,
        "games": 9851
      },
      {
        "name": "Ninetales",
        "winRate": 54.5,
        "games": 9851
      },
      {
        "name": "Charizard",
        "winRate": 54.5,
        "games": 9851
      },
      {
        "name": "Garchomp",
        "winRate": 50.8,
        "games": 62263
      }
    ],
    "bestSets": []
  },
  "6": {
    "id": 6,
    "name": "Charizard",
    "isMega": false,
    "elo": 9652,
    "winRate": 51.2,
    "appearances": 303875,
    "wins": 155623,
    "losses": 148252,
    "bestPartners": [
      {
        "name": "Excadrill",
        "winRate": 64.7,
        "games": 8206
      },
      {
        "name": "Hydreigon",
        "winRate": 64.7,
        "games": 8206
      },
      {
        "name": "Torkoal",
        "winRate": 61.8,
        "games": 4379
      },
      {
        "name": "Chesnaught",
        "winRate": 61.6,
        "games": 8793
      },
      {
        "name": "Heat Rotom",
        "winRate": 60.3,
        "games": 17887
      }
    ],
    "bestSets": []
  },
  "9": {
    "id": 9,
    "name": "Blastoise",
    "isMega": false,
    "elo": 9708,
    "winRate": 50.4,
    "appearances": 104751,
    "wins": 52757,
    "losses": 51994,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 51.5,
        "games": 10966
      },
      {
        "name": "Meowscarada",
        "winRate": 51.5,
        "games": 10966
      },
      {
        "name": "Torterra",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.8,
        "games": 11206
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 16492
      }
    ],
    "bestSets": []
  },
  "15": {
    "id": 15,
    "name": "Beedrill",
    "isMega": false,
    "elo": 9658,
    "winRate": 43.8,
    "appearances": 9704,
    "wins": 4252,
    "losses": 5452,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 43.8,
        "games": 9704
      },
      {
        "name": "Incineroar",
        "winRate": 43.8,
        "games": 9704
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 43.8,
        "games": 9704
      },
      {
        "name": "Greninja",
        "winRate": 43.8,
        "games": 9704
      },
      {
        "name": "Garchomp",
        "winRate": 43.8,
        "games": 9704
      }
    ],
    "bestSets": []
  },
  "25": {
    "id": 25,
    "name": "Pikachu",
    "isMega": false,
    "elo": 9613,
    "winRate": 45.7,
    "appearances": 15433,
    "wins": 7049,
    "losses": 8384,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 49.1,
        "games": 5605
      },
      {
        "name": "Skarmory",
        "winRate": 49.1,
        "games": 5605
      },
      {
        "name": "Pelipper",
        "winRate": 49.1,
        "games": 5605
      },
      {
        "name": "Aerodactyl",
        "winRate": 49.1,
        "games": 5605
      },
      {
        "name": "Gyarados",
        "winRate": 46.1,
        "games": 5247
      }
    ],
    "bestSets": []
  },
  "26": {
    "id": 26,
    "name": "Raichu",
    "isMega": false,
    "elo": 9713,
    "winRate": 50.1,
    "appearances": 22103,
    "wins": 11081,
    "losses": 11022,
    "bestPartners": [
      {
        "name": "Mega Gardevoir",
        "winRate": 50.4,
        "games": 10977
      },
      {
        "name": "Garchomp",
        "winRate": 50.4,
        "games": 10977
      },
      {
        "name": "Tyranitar",
        "winRate": 50.4,
        "games": 10977
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 22103
      },
      {
        "name": "Incineroar",
        "winRate": 50.1,
        "games": 22103
      }
    ],
    "bestSets": []
  },
  "36": {
    "id": 36,
    "name": "Clefable",
    "isMega": false,
    "elo": 9762,
    "winRate": 51.2,
    "appearances": 70146,
    "wins": 35927,
    "losses": 34219,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 58.5,
        "games": 9239
      },
      {
        "name": "Scizor",
        "winRate": 58.5,
        "games": 9239
      },
      {
        "name": "Metagross",
        "winRate": 58.5,
        "games": 9239
      },
      {
        "name": "Kingambit",
        "winRate": 52.7,
        "games": 31427
      },
      {
        "name": "Incineroar",
        "winRate": 51.6,
        "games": 48032
      }
    ],
    "bestSets": []
  },
  "38": {
    "id": 38,
    "name": "Ninetales",
    "isMega": false,
    "elo": 9693,
    "winRate": 53.1,
    "appearances": 20576,
    "wins": 10928,
    "losses": 9648,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 61.8,
        "games": 4379
      },
      {
        "name": "Scovillain",
        "winRate": 54.5,
        "games": 9851
      },
      {
        "name": "Leafeon",
        "winRate": 54.5,
        "games": 9851
      },
      {
        "name": "Charizard",
        "winRate": 54.5,
        "games": 9851
      },
      {
        "name": "Venusaur",
        "winRate": 54.5,
        "games": 9851
      }
    ],
    "bestSets": []
  },
  "59": {
    "id": 59,
    "name": "Arcanine",
    "isMega": false,
    "elo": 9689,
    "winRate": 48.8,
    "appearances": 671641,
    "wins": 327888,
    "losses": 343753,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 58,
        "games": 4585
      },
      {
        "name": "Archaludon",
        "winRate": 53.4,
        "games": 5301
      },
      {
        "name": "Ninetales",
        "winRate": 53.4,
        "games": 5301
      },
      {
        "name": "Ampharos",
        "winRate": 52.2,
        "games": 10929
      },
      {
        "name": "Mega Scizor",
        "winRate": 51.9,
        "games": 15870
      }
    ],
    "bestSets": []
  },
  "65": {
    "id": 65,
    "name": "Alakazam",
    "isMega": false,
    "elo": 9721,
    "winRate": 48,
    "appearances": 32240,
    "wins": 15467,
    "losses": 16773,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.3,
        "games": 11146
      },
      {
        "name": "Azumarill",
        "winRate": 50.3,
        "games": 11146
      },
      {
        "name": "Conkeldurr",
        "winRate": 50.3,
        "games": 11146
      },
      {
        "name": "Crabominable",
        "winRate": 50.3,
        "games": 11146
      },
      {
        "name": "Hatterene",
        "winRate": 50.2,
        "games": 5716
      }
    ],
    "bestSets": []
  },
  "71": {
    "id": 71,
    "name": "Victreebel",
    "isMega": false,
    "elo": 9713,
    "winRate": 50.2,
    "appearances": 21847,
    "wins": 10974,
    "losses": 10873,
    "bestPartners": [
      {
        "name": "Mega Greninja",
        "winRate": 51.8,
        "games": 5355
      },
      {
        "name": "Aegislash",
        "winRate": 51.8,
        "games": 5355
      },
      {
        "name": "Charizard",
        "winRate": 51.8,
        "games": 5355
      },
      {
        "name": "Metagross",
        "winRate": 51.8,
        "games": 5355
      },
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 16250
      }
    ],
    "bestSets": []
  },
  "80": {
    "id": 80,
    "name": "Slowbro",
    "isMega": false,
    "elo": 9694,
    "winRate": 51.7,
    "appearances": 106537,
    "wins": 55059,
    "losses": 51478,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 66.8,
        "games": 3934
      },
      {
        "name": "Archaludon",
        "winRate": 66.8,
        "games": 3934
      },
      {
        "name": "Mega Gyarados",
        "winRate": 57.1,
        "games": 9341
      },
      {
        "name": "Snorlax",
        "winRate": 56.8,
        "games": 14511
      },
      {
        "name": "Hatterene",
        "winRate": 54.9,
        "games": 15025
      }
    ],
    "bestSets": []
  },
  "94": {
    "id": 94,
    "name": "Gengar",
    "isMega": false,
    "elo": 9692,
    "winRate": 49.5,
    "appearances": 446494,
    "wins": 220845,
    "losses": 225649,
    "bestPartners": [
      {
        "name": "Mega Chesnaught",
        "winRate": 66.4,
        "games": 3878
      },
      {
        "name": "Heat Rotom",
        "winRate": 63,
        "games": 12671
      },
      {
        "name": "Chesnaught",
        "winRate": 61.6,
        "games": 8793
      },
      {
        "name": "Greninja",
        "winRate": 54.8,
        "games": 34643
      },
      {
        "name": "Charizard",
        "winRate": 52.6,
        "games": 50800
      }
    ],
    "bestSets": []
  },
  "115": {
    "id": 115,
    "name": "Kangaskhan",
    "isMega": false,
    "elo": 9703,
    "winRate": 48.9,
    "appearances": 32145,
    "wins": 15732,
    "losses": 16413,
    "bestPartners": [
      {
        "name": "Mega Gardevoir",
        "winRate": 50,
        "games": 16246
      },
      {
        "name": "Garchomp",
        "winRate": 50,
        "games": 16246
      },
      {
        "name": "Tyranitar",
        "winRate": 50,
        "games": 16246
      },
      {
        "name": "Gyarados",
        "winRate": 49.6,
        "games": 27126
      },
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 27126
      }
    ],
    "bestSets": []
  },
  "121": {
    "id": 121,
    "name": "Starmie",
    "isMega": false,
    "elo": 9710,
    "winRate": 49.7,
    "appearances": 44169,
    "wins": 21944,
    "losses": 22225,
    "bestPartners": [
      {
        "name": "Crabominable",
        "winRate": 50,
        "games": 11191
      },
      {
        "name": "Drampa",
        "winRate": 50,
        "games": 11191
      },
      {
        "name": "Ursaluna",
        "winRate": 50,
        "games": 11191
      },
      {
        "name": "Emboar",
        "winRate": 50,
        "games": 10828
      },
      {
        "name": "Arcanine",
        "winRate": 49.9,
        "games": 16780
      }
    ],
    "bestSets": []
  },
  "127": {
    "id": 127,
    "name": "Pinsir",
    "isMega": false,
    "elo": 9691,
    "winRate": 50.6,
    "appearances": 24935,
    "wins": 12612,
    "losses": 12323,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 57.6,
        "games": 9513
      },
      {
        "name": "Archaludon",
        "winRate": 57.6,
        "games": 9513
      },
      {
        "name": "Kingambit",
        "winRate": 57.6,
        "games": 9513
      },
      {
        "name": "Tyranitar",
        "winRate": 57.6,
        "games": 9513
      },
      {
        "name": "Metagross",
        "winRate": 57.6,
        "games": 9513
      }
    ],
    "bestSets": []
  },
  "130": {
    "id": 130,
    "name": "Gyarados",
    "isMega": false,
    "elo": 9733,
    "winRate": 49.7,
    "appearances": 1259503,
    "wins": 626352,
    "losses": 633151,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 55.6,
        "games": 5143
      },
      {
        "name": "Archaludon",
        "winRate": 52.4,
        "games": 21550
      },
      {
        "name": "Ampharos",
        "winRate": 52.2,
        "games": 10929
      },
      {
        "name": "Tsareena",
        "winRate": 52,
        "games": 10702
      },
      {
        "name": "Primarina",
        "winRate": 51.9,
        "games": 5386
      }
    ],
    "bestSets": []
  },
  "132": {
    "id": 132,
    "name": "Ditto",
    "isMega": false,
    "elo": 9578,
    "winRate": 39.7,
    "appearances": 13587,
    "wins": 5398,
    "losses": 8189,
    "bestPartners": [
      {
        "name": "Mega Gallade",
        "winRate": 48.2,
        "games": 5472
      },
      {
        "name": "Corviknight",
        "winRate": 48.2,
        "games": 5472
      },
      {
        "name": "Heat Rotom",
        "winRate": 48.2,
        "games": 5472
      },
      {
        "name": "Excadrill",
        "winRate": 48.2,
        "games": 5472
      },
      {
        "name": "Aggron",
        "winRate": 48.2,
        "games": 5472
      }
    ],
    "bestSets": []
  },
  "134": {
    "id": 134,
    "name": "Vaporeon",
    "isMega": false,
    "elo": 9754,
    "winRate": 50.1,
    "appearances": 43738,
    "wins": 21908,
    "losses": 21830,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 50.4,
        "games": 5483
      },
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 16446
      },
      {
        "name": "Dragonite",
        "winRate": 50.4,
        "games": 10903
      },
      {
        "name": "Mudsdale",
        "winRate": 50.4,
        "games": 5420
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.4,
        "games": 5543
      }
    ],
    "bestSets": []
  },
  "135": {
    "id": 135,
    "name": "Jolteon",
    "isMega": false,
    "elo": 9661,
    "winRate": 50,
    "appearances": 16316,
    "wins": 8151,
    "losses": 8165,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.5,
        "games": 5486
      },
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 5486
      },
      {
        "name": "Corviknight",
        "winRate": 50.5,
        "games": 5486
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 10854
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50,
        "games": 10948
      }
    ],
    "bestSets": []
  },
  "136": {
    "id": 136,
    "name": "Flareon",
    "isMega": false,
    "elo": 9663,
    "winRate": 48.1,
    "appearances": 15966,
    "wins": 7686,
    "losses": 8280,
    "bestPartners": [
      {
        "name": "Empoleon",
        "winRate": 50.1,
        "games": 5437
      },
      {
        "name": "Weavile",
        "winRate": 50.1,
        "games": 5437
      },
      {
        "name": "Meowscarada",
        "winRate": 50.1,
        "games": 5437
      },
      {
        "name": "Ninetales",
        "winRate": 48.6,
        "games": 5472
      },
      {
        "name": "Scovillain",
        "winRate": 48.6,
        "games": 5472
      }
    ],
    "bestSets": []
  },
  "142": {
    "id": 142,
    "name": "Aerodactyl",
    "isMega": false,
    "elo": 9789,
    "winRate": 51.4,
    "appearances": 56023,
    "wins": 28790,
    "losses": 27233,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 60.6,
        "games": 13437
      },
      {
        "name": "Kingambit",
        "winRate": 60.6,
        "games": 13437
      },
      {
        "name": "Archaludon",
        "winRate": 60.6,
        "games": 13437
      },
      {
        "name": "Scovillain",
        "winRate": 60.5,
        "games": 9036
      },
      {
        "name": "Corviknight",
        "winRate": 57.6,
        "games": 19092
      }
    ],
    "bestSets": []
  },
  "143": {
    "id": 143,
    "name": "Snorlax",
    "isMega": false,
    "elo": 9725,
    "winRate": 54,
    "appearances": 25613,
    "wins": 13821,
    "losses": 11792,
    "bestPartners": [
      {
        "name": "Hatterene",
        "winRate": 58.1,
        "games": 9432
      },
      {
        "name": "Kingambit",
        "winRate": 57.2,
        "games": 9580
      },
      {
        "name": "Slowbro",
        "winRate": 56.8,
        "games": 14511
      },
      {
        "name": "Torkoal",
        "winRate": 56.8,
        "games": 14511
      },
      {
        "name": "Drampa",
        "winRate": 56.1,
        "games": 4931
      }
    ],
    "bestSets": []
  },
  "149": {
    "id": 149,
    "name": "Dragonite",
    "isMega": false,
    "elo": 9764,
    "winRate": 49.7,
    "appearances": 506949,
    "wins": 251930,
    "losses": 255019,
    "bestPartners": [
      {
        "name": "Milotic",
        "winRate": 52,
        "games": 21488
      },
      {
        "name": "Gardevoir",
        "winRate": 50.9,
        "games": 9822
      },
      {
        "name": "Hydreigon",
        "winRate": 50.9,
        "games": 27076
      },
      {
        "name": "Gliscor",
        "winRate": 50.9,
        "games": 5696
      },
      {
        "name": "Houndoom",
        "winRate": 50.8,
        "games": 11268
      }
    ],
    "bestSets": []
  },
  "154": {
    "id": 154,
    "name": "Meganium",
    "isMega": false,
    "elo": 9696,
    "winRate": 46.7,
    "appearances": 67820,
    "wins": 31689,
    "losses": 36131,
    "bestPartners": [
      {
        "name": "Mega Raichu Y",
        "winRate": 50.5,
        "games": 5649
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.1,
        "games": 11416
      },
      {
        "name": "Toxapex",
        "winRate": 50.1,
        "games": 11416
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.1,
        "games": 11416
      },
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 27969
      }
    ],
    "bestSets": []
  },
  "157": {
    "id": 157,
    "name": "Typhlosion",
    "isMega": false,
    "elo": 9675,
    "winRate": 48,
    "appearances": 16007,
    "wins": 7690,
    "losses": 8317,
    "bestPartners": [
      {
        "name": "Vanilluxe",
        "winRate": 50.5,
        "games": 5671
      },
      {
        "name": "Palafin",
        "winRate": 50.5,
        "games": 5671
      },
      {
        "name": "Garchomp",
        "winRate": 50.5,
        "games": 5671
      },
      {
        "name": "Charizard",
        "winRate": 50.5,
        "games": 5671
      },
      {
        "name": "Dragonite",
        "winRate": 48.3,
        "games": 10789
      }
    ],
    "bestSets": []
  },
  "160": {
    "id": 160,
    "name": "Feraligatr",
    "isMega": false,
    "elo": 9691,
    "winRate": 50,
    "appearances": 151514,
    "wins": 75749,
    "losses": 75765,
    "bestPartners": [
      {
        "name": "Mega Venusaur",
        "winRate": 56.6,
        "games": 9697
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Wash Rotom",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Archaludon",
        "winRate": 55.6,
        "games": 5143
      },
      {
        "name": "Kingambit",
        "winRate": 55.6,
        "games": 5143
      }
    ],
    "bestSets": []
  },
  "181": {
    "id": 181,
    "name": "Ampharos",
    "isMega": false,
    "elo": 9671,
    "winRate": 52.2,
    "appearances": 10929,
    "wins": 5704,
    "losses": 5225,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 52.2,
        "games": 10929
      },
      {
        "name": "Incineroar",
        "winRate": 52.2,
        "games": 10929
      },
      {
        "name": "Charizard",
        "winRate": 52.2,
        "games": 10929
      },
      {
        "name": "Arcanine",
        "winRate": 52.2,
        "games": 10929
      },
      {
        "name": "Whimsicott",
        "winRate": 52.2,
        "games": 10929
      }
    ],
    "bestSets": []
  },
  "184": {
    "id": 184,
    "name": "Azumarill",
    "isMega": false,
    "elo": 9669,
    "winRate": 50.8,
    "appearances": 284946,
    "wins": 144732,
    "losses": 140214,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Samurott",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Milotic",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Clawitzer",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Archaludon",
        "winRate": 58.7,
        "games": 4660
      }
    ],
    "bestSets": []
  },
  "186": {
    "id": 186,
    "name": "Politoed",
    "isMega": false,
    "elo": 9789,
    "winRate": 50.2,
    "appearances": 206829,
    "wins": 103880,
    "losses": 102949,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 55.6,
        "games": 5143
      },
      {
        "name": "Archaludon",
        "winRate": 55.6,
        "games": 5143
      },
      {
        "name": "Mega Venusaur",
        "winRate": 53.1,
        "games": 10362
      },
      {
        "name": "Kingambit",
        "winRate": 52,
        "games": 16007
      },
      {
        "name": "Greninja",
        "winRate": 51.8,
        "games": 21258
      }
    ],
    "bestSets": []
  },
  "196": {
    "id": 196,
    "name": "Espeon",
    "isMega": false,
    "elo": 9616,
    "winRate": 41.6,
    "appearances": 23598,
    "wins": 9826,
    "losses": 13772,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 50.3,
        "games": 5462
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.3,
        "games": 5462
      },
      {
        "name": "Dragonite",
        "winRate": 50.3,
        "games": 5462
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 11180
      },
      {
        "name": "Kingambit",
        "winRate": 49.2,
        "games": 5718
      }
    ],
    "bestSets": []
  },
  "197": {
    "id": 197,
    "name": "Umbreon",
    "isMega": false,
    "elo": 9688,
    "winRate": 48.5,
    "appearances": 42848,
    "wins": 20760,
    "losses": 22088,
    "bestPartners": [
      {
        "name": "Delphox",
        "winRate": 50.5,
        "games": 5650
      },
      {
        "name": "Charizard",
        "winRate": 50.5,
        "games": 5650
      },
      {
        "name": "Runerigus",
        "winRate": 50.4,
        "games": 5339
      },
      {
        "name": "Whimsicott",
        "winRate": 50.4,
        "games": 5339
      },
      {
        "name": "Hydreigon",
        "winRate": 50.4,
        "games": 5339
      }
    ],
    "bestSets": []
  },
  "199": {
    "id": 199,
    "name": "Slowking",
    "isMega": false,
    "elo": 9671,
    "winRate": 50,
    "appearances": 16893,
    "wins": 8450,
    "losses": 8443,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 5692
      },
      {
        "name": "Crabominable",
        "winRate": 50.4,
        "games": 5692
      },
      {
        "name": "Drampa",
        "winRate": 50.4,
        "games": 5692
      },
      {
        "name": "Ursaluna",
        "winRate": 50.4,
        "games": 5692
      },
      {
        "name": "Mega Houndoom",
        "winRate": 50.4,
        "games": 5678
      }
    ],
    "bestSets": []
  },
  "208": {
    "id": 208,
    "name": "Steelix",
    "isMega": false,
    "elo": 9706,
    "winRate": 49.4,
    "appearances": 104177,
    "wins": 51433,
    "losses": 52744,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 22024
      },
      {
        "name": "Quaquaval",
        "winRate": 50.2,
        "games": 5615
      },
      {
        "name": "Metagross",
        "winRate": 50.2,
        "games": 16648
      },
      {
        "name": "Skarmory",
        "winRate": 50.2,
        "games": 5615
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.2,
        "games": 5615
      }
    ],
    "bestSets": []
  },
  "212": {
    "id": 212,
    "name": "Scizor",
    "isMega": false,
    "elo": 9779,
    "winRate": 51.2,
    "appearances": 412405,
    "wins": 210988,
    "losses": 201417,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 62.4,
        "games": 13098
      },
      {
        "name": "Archaludon",
        "winRate": 62.2,
        "games": 21741
      },
      {
        "name": "Clefable",
        "winRate": 58.5,
        "games": 9239
      },
      {
        "name": "Torkoal",
        "winRate": 58.1,
        "games": 4683
      },
      {
        "name": "Empoleon",
        "winRate": 56.3,
        "games": 14648
      }
    ],
    "bestSets": []
  },
  "214": {
    "id": 214,
    "name": "Heracross",
    "isMega": false,
    "elo": 9714,
    "winRate": 52.7,
    "appearances": 10807,
    "wins": 5692,
    "losses": 5115,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 52.7,
        "games": 10807
      },
      {
        "name": "Metagross",
        "winRate": 52.7,
        "games": 10807
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.7,
        "games": 10807
      },
      {
        "name": "Greninja",
        "winRate": 52.7,
        "games": 10807
      },
      {
        "name": "Kingambit",
        "winRate": 52.7,
        "games": 10807
      }
    ],
    "bestSets": []
  },
  "227": {
    "id": 227,
    "name": "Skarmory",
    "isMega": false,
    "elo": 9728,
    "winRate": 48.9,
    "appearances": 70516,
    "wins": 34468,
    "losses": 36048,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 52.2,
        "games": 5380
      },
      {
        "name": "Alolan Raichu",
        "winRate": 52.2,
        "games": 5380
      },
      {
        "name": "Quaquaval",
        "winRate": 50.2,
        "games": 5615
      },
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 22480
      },
      {
        "name": "Steelix",
        "winRate": 50.2,
        "games": 5615
      }
    ],
    "bestSets": []
  },
  "229": {
    "id": 229,
    "name": "Houndoom",
    "isMega": false,
    "elo": 9727,
    "winRate": 50.6,
    "appearances": 16692,
    "wins": 8449,
    "losses": 8243,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 11268
      },
      {
        "name": "Decidueye",
        "winRate": 50.8,
        "games": 11268
      },
      {
        "name": "Dragapult",
        "winRate": 50.8,
        "games": 11268
      },
      {
        "name": "Dragonite",
        "winRate": 50.8,
        "games": 11268
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 16692
      }
    ],
    "bestSets": []
  },
  "248": {
    "id": 248,
    "name": "Tyranitar",
    "isMega": false,
    "elo": 9697,
    "winRate": 50.6,
    "appearances": 684659,
    "wins": 346309,
    "losses": 338350,
    "bestPartners": [
      {
        "name": "Aerodactyl",
        "winRate": 60.6,
        "games": 13437
      },
      {
        "name": "Corviknight",
        "winRate": 60.6,
        "games": 13437
      },
      {
        "name": "Scovillain",
        "winRate": 60.5,
        "games": 9036
      },
      {
        "name": "Pinsir",
        "winRate": 57.6,
        "games": 9513
      },
      {
        "name": "Archaludon",
        "winRate": 57.3,
        "games": 33341
      }
    ],
    "bestSets": []
  },
  "279": {
    "id": 279,
    "name": "Pelipper",
    "isMega": false,
    "elo": 9664,
    "winRate": 49.5,
    "appearances": 98625,
    "wins": 48818,
    "losses": 49807,
    "bestPartners": [
      {
        "name": "Mega Excadrill",
        "winRate": 50.7,
        "games": 5666
      },
      {
        "name": "Kleavor",
        "winRate": 50.6,
        "games": 5717
      },
      {
        "name": "Blastoise",
        "winRate": 50.6,
        "games": 5717
      },
      {
        "name": "Mega Lucario Z",
        "winRate": 50.5,
        "games": 5362
      },
      {
        "name": "Emolga",
        "winRate": 50.5,
        "games": 5362
      }
    ],
    "bestSets": []
  },
  "282": {
    "id": 282,
    "name": "Gardevoir",
    "isMega": false,
    "elo": 9731,
    "winRate": 49.8,
    "appearances": 437985,
    "wins": 218004,
    "losses": 219981,
    "bestPartners": [
      {
        "name": "Mega Scizor",
        "winRate": 59.3,
        "games": 4674
      },
      {
        "name": "Mega Garchomp",
        "winRate": 54.6,
        "games": 5106
      },
      {
        "name": "Milotic",
        "winRate": 53.4,
        "games": 10244
      },
      {
        "name": "Primarina",
        "winRate": 51.9,
        "games": 5386
      },
      {
        "name": "Azumarill",
        "winRate": 51.9,
        "games": 5386
      }
    ],
    "bestSets": []
  },
  "302": {
    "id": 302,
    "name": "Sableye",
    "isMega": false,
    "elo": 9556,
    "winRate": 43.7,
    "appearances": 78079,
    "wins": 34117,
    "losses": 43962,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 51.3,
        "games": 5492
      },
      {
        "name": "Corviknight",
        "winRate": 50.7,
        "games": 5782
      },
      {
        "name": "Mega Gengar",
        "winRate": 50.5,
        "games": 11411
      },
      {
        "name": "Kingambit",
        "winRate": 50.4,
        "games": 11138
      },
      {
        "name": "Garchomp",
        "winRate": 50.4,
        "games": 28040
      }
    ],
    "bestSets": []
  },
  "306": {
    "id": 306,
    "name": "Aggron",
    "isMega": false,
    "elo": 9685,
    "winRate": 48.1,
    "appearances": 91386,
    "wins": 43982,
    "losses": 47404,
    "bestPartners": [
      {
        "name": "Toucannon",
        "winRate": 50.8,
        "games": 5686
      },
      {
        "name": "Garchomp",
        "winRate": 50.8,
        "games": 5686
      },
      {
        "name": "Stunfisk",
        "winRate": 50.8,
        "games": 5686
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 11274
      },
      {
        "name": "Whimsicott",
        "winRate": 50.5,
        "games": 11274
      }
    ],
    "bestSets": []
  },
  "324": {
    "id": 324,
    "name": "Torkoal",
    "isMega": false,
    "elo": 9629,
    "winRate": 51.3,
    "appearances": 198028,
    "wins": 101494,
    "losses": 96534,
    "bestPartners": [
      {
        "name": "Scovillain",
        "winRate": 61.8,
        "games": 4379
      },
      {
        "name": "Leafeon",
        "winRate": 61.8,
        "games": 4379
      },
      {
        "name": "Ninetales",
        "winRate": 61.8,
        "games": 4379
      },
      {
        "name": "Charizard",
        "winRate": 61.8,
        "games": 4379
      },
      {
        "name": "Mega Starmie",
        "winRate": 58.1,
        "games": 4683
      }
    ],
    "bestSets": []
  },
  "334": {
    "id": 334,
    "name": "Altaria",
    "isMega": false,
    "elo": 9714,
    "winRate": 46.7,
    "appearances": 83200,
    "wins": 38892,
    "losses": 44308,
    "bestPartners": [
      {
        "name": "Toxapex",
        "winRate": 50.9,
        "games": 5673
      },
      {
        "name": "Greninja",
        "winRate": 50.9,
        "games": 5673
      },
      {
        "name": "Mega Excadrill",
        "winRate": 50.8,
        "games": 11339
      },
      {
        "name": "Primarina",
        "winRate": 50.4,
        "games": 11256
      },
      {
        "name": "Mega Steelix",
        "winRate": 50.1,
        "games": 5763
      }
    ],
    "bestSets": []
  },
  "350": {
    "id": 350,
    "name": "Milotic",
    "isMega": false,
    "elo": 9642,
    "winRate": 50.8,
    "appearances": 108629,
    "wins": 55220,
    "losses": 53409,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Azumarill",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Clawitzer",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Sandaconda",
        "winRate": 54.5,
        "games": 10461
      },
      {
        "name": "Samurott",
        "winRate": 54.5,
        "games": 10461
      }
    ],
    "bestSets": []
  },
  "359": {
    "id": 359,
    "name": "Absol",
    "isMega": false,
    "elo": 9656,
    "winRate": 50.5,
    "appearances": 16975,
    "wins": 8566,
    "losses": 8409,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 11409
      },
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 11409
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.7,
        "games": 11409
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.7,
        "games": 11409
      },
      {
        "name": "Dragapult",
        "winRate": 50.7,
        "games": 11409
      }
    ],
    "bestSets": []
  },
  "376": {
    "id": 376,
    "name": "Metagross",
    "isMega": false,
    "elo": 9732,
    "winRate": 51.4,
    "appearances": 364909,
    "wins": 187596,
    "losses": 177313,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 67.5,
        "games": 3946
      },
      {
        "name": "Chesnaught",
        "winRate": 61.6,
        "games": 8793
      },
      {
        "name": "Clefable",
        "winRate": 58.5,
        "games": 9239
      },
      {
        "name": "Archaludon",
        "winRate": 58.1,
        "games": 42229
      },
      {
        "name": "Charizard",
        "winRate": 57.8,
        "games": 23447
      }
    ],
    "bestSets": []
  },
  "389": {
    "id": 389,
    "name": "Torterra",
    "isMega": false,
    "elo": 9685,
    "winRate": 49.9,
    "appearances": 16892,
    "wins": 8436,
    "losses": 8456,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Arcanine",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Charizard",
        "winRate": 50.1,
        "games": 11322
      }
    ],
    "bestSets": []
  },
  "392": {
    "id": 392,
    "name": "Infernape",
    "isMega": false,
    "elo": 9680,
    "winRate": 50.9,
    "appearances": 32604,
    "wins": 16581,
    "losses": 16023,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 56.3,
        "games": 4946
      },
      {
        "name": "Charizard",
        "winRate": 53.9,
        "games": 10449
      },
      {
        "name": "Mega Metagross",
        "winRate": 52.9,
        "games": 10426
      },
      {
        "name": "Krookodile",
        "winRate": 52.9,
        "games": 10426
      },
      {
        "name": "Greninja",
        "winRate": 52.1,
        "games": 16176
      }
    ],
    "bestSets": []
  },
  "395": {
    "id": 395,
    "name": "Empoleon",
    "isMega": false,
    "elo": 9717,
    "winRate": 51.1,
    "appearances": 96421,
    "wins": 49282,
    "losses": 47139,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 62.4,
        "games": 8796
      },
      {
        "name": "Mega Clefable",
        "winRate": 60.2,
        "games": 9152
      },
      {
        "name": "Aegislash",
        "winRate": 60.2,
        "games": 9152
      },
      {
        "name": "Mega Heracross",
        "winRate": 58.6,
        "games": 4715
      },
      {
        "name": "Corviknight",
        "winRate": 56.7,
        "games": 9786
      }
    ],
    "bestSets": []
  },
  "442": {
    "id": 442,
    "name": "Spiritomb",
    "isMega": false,
    "elo": 9605,
    "winRate": 40.9,
    "appearances": 37130,
    "wins": 15176,
    "losses": 21954,
    "bestPartners": [
      {
        "name": "Mega Gengar",
        "winRate": 50.4,
        "games": 5629
      },
      {
        "name": "Azumarill",
        "winRate": 50.4,
        "games": 5629
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.4,
        "games": 5629
      },
      {
        "name": "Mega Audino",
        "winRate": 49.2,
        "games": 5523
      },
      {
        "name": "Slowking",
        "winRate": 49.2,
        "games": 5523
      }
    ],
    "bestSets": []
  },
  "445": {
    "id": 445,
    "name": "Garchomp",
    "isMega": false,
    "elo": 9688,
    "winRate": 50.4,
    "appearances": 1769919,
    "wins": 892117,
    "losses": 877802,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 58.3,
        "games": 4674
      },
      {
        "name": "Archaludon",
        "winRate": 57.4,
        "games": 33469
      },
      {
        "name": "Lucario",
        "winRate": 55.6,
        "games": 14789
      },
      {
        "name": "Hydreigon",
        "winRate": 55,
        "games": 45081
      },
      {
        "name": "Heat Rotom",
        "winRate": 55,
        "games": 15192
      }
    ],
    "bestSets": []
  },
  "448": {
    "id": 448,
    "name": "Lucario",
    "isMega": false,
    "elo": 9730,
    "winRate": 49.9,
    "appearances": 81852,
    "wins": 40831,
    "losses": 41021,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 58.7,
        "games": 4612
      },
      {
        "name": "Azumarill",
        "winRate": 58.3,
        "games": 4674
      },
      {
        "name": "Meowscarada",
        "winRate": 58.3,
        "games": 4674
      },
      {
        "name": "Aegislash",
        "winRate": 56.7,
        "games": 9683
      },
      {
        "name": "Mega Froslass",
        "winRate": 56.7,
        "games": 9671
      }
    ],
    "bestSets": []
  },
  "450": {
    "id": 450,
    "name": "Hippowdon",
    "isMega": false,
    "elo": 9698,
    "winRate": 52,
    "appearances": 21261,
    "wins": 11051,
    "losses": 10210,
    "bestPartners": [
      {
        "name": "Toucannon",
        "winRate": 60.4,
        "games": 4380
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 60.4,
        "games": 4380
      },
      {
        "name": "Aegislash",
        "winRate": 60.4,
        "games": 4380
      },
      {
        "name": "Heat Rotom",
        "winRate": 60.4,
        "games": 4380
      },
      {
        "name": "Archaludon",
        "winRate": 54.4,
        "games": 9950
      }
    ],
    "bestSets": []
  },
  "460": {
    "id": 460,
    "name": "Abomasnow",
    "isMega": false,
    "elo": 9613,
    "winRate": 46.9,
    "appearances": 25451,
    "wins": 11944,
    "losses": 13507,
    "bestPartners": [
      {
        "name": "Hisuian Typhlosion",
        "winRate": 50.2,
        "games": 5427
      },
      {
        "name": "Dragonite",
        "winRate": 50.2,
        "games": 5427
      },
      {
        "name": "Azumarill",
        "winRate": 50.2,
        "games": 5427
      },
      {
        "name": "Umbreon",
        "winRate": 50.2,
        "games": 5427
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 16263
      }
    ],
    "bestSets": []
  },
  "461": {
    "id": 461,
    "name": "Weavile",
    "isMega": false,
    "elo": 9628,
    "winRate": 45.7,
    "appearances": 15174,
    "wins": 6937,
    "losses": 8237,
    "bestPartners": [
      {
        "name": "Flareon",
        "winRate": 50.1,
        "games": 5437
      },
      {
        "name": "Empoleon",
        "winRate": 50.1,
        "games": 5437
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.1,
        "games": 5437
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 5437
      },
      {
        "name": "Polteageist",
        "winRate": 49.5,
        "games": 5595
      }
    ],
    "bestSets": []
  },
  "464": {
    "id": 464,
    "name": "Rhyperior",
    "isMega": false,
    "elo": 9640,
    "winRate": 50.4,
    "appearances": 190273,
    "wins": 95828,
    "losses": 94445,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 54.3,
        "games": 5079
      },
      {
        "name": "Greninja",
        "winRate": 51,
        "games": 5572
      },
      {
        "name": "Heat Rotom",
        "winRate": 51,
        "games": 5572
      },
      {
        "name": "Tyranitar",
        "winRate": 50.9,
        "games": 16138
      },
      {
        "name": "Garchomp",
        "winRate": 50.8,
        "games": 45267
      }
    ],
    "bestSets": []
  },
  "470": {
    "id": 470,
    "name": "Leafeon",
    "isMega": false,
    "elo": 9702,
    "winRate": 52.7,
    "appearances": 21087,
    "wins": 11110,
    "losses": 9977,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 61.8,
        "games": 4379
      },
      {
        "name": "Scovillain",
        "winRate": 54.5,
        "games": 9851
      },
      {
        "name": "Ninetales",
        "winRate": 54.5,
        "games": 9851
      },
      {
        "name": "Charizard",
        "winRate": 54.5,
        "games": 9851
      },
      {
        "name": "Venusaur",
        "winRate": 54.5,
        "games": 9851
      }
    ],
    "bestSets": []
  },
  "471": {
    "id": 471,
    "name": "Glaceon",
    "isMega": false,
    "elo": 9726,
    "winRate": 50.1,
    "appearances": 16584,
    "wins": 8316,
    "losses": 8268,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 50.8,
        "games": 5641
      },
      {
        "name": "Incineroar",
        "winRate": 50.8,
        "games": 5641
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 5641
      },
      {
        "name": "Froslass",
        "winRate": 50.6,
        "games": 11176
      },
      {
        "name": "Mega Skarmory",
        "winRate": 50.3,
        "games": 5535
      }
    ],
    "bestSets": []
  },
  "472": {
    "id": 472,
    "name": "Gliscor",
    "isMega": false,
    "elo": 9705,
    "winRate": 51.4,
    "appearances": 32501,
    "wins": 16702,
    "losses": 15799,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 58.7,
        "games": 4660
      },
      {
        "name": "Corviknight",
        "winRate": 58.7,
        "games": 4660
      },
      {
        "name": "Dragapult",
        "winRate": 54.4,
        "games": 10356
      },
      {
        "name": "Mega Gyarados",
        "winRate": 54.1,
        "games": 10067
      },
      {
        "name": "Azumarill",
        "winRate": 53.6,
        "games": 10367
      }
    ],
    "bestSets": []
  },
  "475": {
    "id": 475,
    "name": "Gallade",
    "isMega": false,
    "elo": 9638,
    "winRate": 47.4,
    "appearances": 10733,
    "wins": 5084,
    "losses": 5649,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 47.4,
        "games": 10733
      },
      {
        "name": "Kingambit",
        "winRate": 47.4,
        "games": 10733
      },
      {
        "name": "Aggron",
        "winRate": 47.4,
        "games": 10733
      },
      {
        "name": "Steelix",
        "winRate": 47.4,
        "games": 10733
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 47.4,
        "games": 10733
      }
    ],
    "bestSets": []
  },
  "478": {
    "id": 478,
    "name": "Froslass",
    "isMega": false,
    "elo": 9743,
    "winRate": 50.6,
    "appearances": 22059,
    "wins": 11155,
    "losses": 10904,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 50.8,
        "games": 5641
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 5641
      },
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 16524
      },
      {
        "name": "Glaceon",
        "winRate": 50.6,
        "games": 11176
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 11176
      }
    ],
    "bestSets": []
  },
  "479": {
    "id": 479,
    "name": "Rotom",
    "isMega": false,
    "elo": 9756,
    "winRate": 50.5,
    "appearances": 60078,
    "wins": 30315,
    "losses": 29763,
    "bestPartners": [
      {
        "name": "Alcremie",
        "winRate": 61,
        "games": 4475
      },
      {
        "name": "Archaludon",
        "winRate": 61,
        "games": 4475
      },
      {
        "name": "Scizor",
        "winRate": 55.2,
        "games": 10155
      },
      {
        "name": "Metagross",
        "winRate": 53.3,
        "games": 15492
      },
      {
        "name": "Kingambit",
        "winRate": 53,
        "games": 15355
      }
    ],
    "bestSets": []
  },
  "497": {
    "id": 497,
    "name": "Serperior",
    "isMega": false,
    "elo": 9638,
    "winRate": 47.8,
    "appearances": 15710,
    "wins": 7504,
    "losses": 8206,
    "bestPartners": [
      {
        "name": "Mega Tyranitar",
        "winRate": 50.3,
        "games": 5396
      },
      {
        "name": "Volcarona",
        "winRate": 50.3,
        "games": 5396
      },
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 5396
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.3,
        "games": 5396
      },
      {
        "name": "Charizard",
        "winRate": 50.3,
        "games": 5396
      }
    ],
    "bestSets": []
  },
  "500": {
    "id": 500,
    "name": "Emboar",
    "isMega": false,
    "elo": 9707,
    "winRate": 50.1,
    "appearances": 21780,
    "wins": 10921,
    "losses": 10859,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 50.7,
        "games": 5503
      },
      {
        "name": "Dragonite",
        "winRate": 50.7,
        "games": 5503
      },
      {
        "name": "Lucario",
        "winRate": 50.7,
        "games": 5503
      },
      {
        "name": "Dragapult",
        "winRate": 50.3,
        "games": 10952
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 10952
      }
    ],
    "bestSets": []
  },
  "503": {
    "id": 503,
    "name": "Samurott",
    "isMega": false,
    "elo": 9660,
    "winRate": 51.8,
    "appearances": 32609,
    "wins": 16880,
    "losses": 15729,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Azumarill",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Clawitzer",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Sandaconda",
        "winRate": 54.5,
        "games": 10461
      },
      {
        "name": "Milotic",
        "winRate": 54.5,
        "games": 10461
      }
    ],
    "bestSets": []
  },
  "530": {
    "id": 530,
    "name": "Excadrill",
    "isMega": false,
    "elo": 9721,
    "winRate": 49.5,
    "appearances": 487761,
    "wins": 241681,
    "losses": 246080,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 64.7,
        "games": 8206
      },
      {
        "name": "Hydreigon",
        "winRate": 59.3,
        "games": 18379
      },
      {
        "name": "Mega Froslass",
        "winRate": 55.3,
        "games": 4997
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 55.3,
        "games": 4997
      },
      {
        "name": "Archaludon",
        "winRate": 54.3,
        "games": 40793
      }
    ],
    "bestSets": []
  },
  "531": {
    "id": 531,
    "name": "Audino",
    "isMega": false,
    "elo": 9580,
    "winRate": 42.3,
    "appearances": 9315,
    "wins": 3936,
    "losses": 5379,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 42.3,
        "games": 9315
      },
      {
        "name": "Hatterene",
        "winRate": 42.3,
        "games": 9315
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 42.3,
        "games": 9315
      },
      {
        "name": "Galarian Slowking",
        "winRate": 42.3,
        "games": 9315
      },
      {
        "name": "Sableye",
        "winRate": 42.3,
        "games": 9315
      }
    ],
    "bestSets": []
  },
  "534": {
    "id": 534,
    "name": "Conkeldurr",
    "isMega": false,
    "elo": 9675,
    "winRate": 50.4,
    "appearances": 71081,
    "wins": 35803,
    "losses": 35278,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 61,
        "games": 4397
      },
      {
        "name": "Mega Alakazam",
        "winRate": 55.1,
        "games": 10025
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 54.8,
        "games": 9774
      },
      {
        "name": "Greninja",
        "winRate": 54.8,
        "games": 9774
      },
      {
        "name": "Pawmot",
        "winRate": 51,
        "games": 5593
      }
    ],
    "bestSets": []
  },
  "547": {
    "id": 547,
    "name": "Whimsicott",
    "isMega": false,
    "elo": 9669,
    "winRate": 50.2,
    "appearances": 1099626,
    "wins": 551472,
    "losses": 548154,
    "bestPartners": [
      {
        "name": "Lucario",
        "winRate": 58.7,
        "games": 4612
      },
      {
        "name": "Mega Starmie",
        "winRate": 58.1,
        "games": 4683
      },
      {
        "name": "Mega Charizard X",
        "winRate": 57.5,
        "games": 9300
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 57.5,
        "games": 9300
      },
      {
        "name": "Heat Rotom",
        "winRate": 57.5,
        "games": 9506
      }
    ],
    "bestSets": []
  },
  "553": {
    "id": 553,
    "name": "Krookodile",
    "isMega": false,
    "elo": 9650,
    "winRate": 49,
    "appearances": 344296,
    "wins": 168826,
    "losses": 175470,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 56,
        "games": 29622
      },
      {
        "name": "Archaludon",
        "winRate": 55.9,
        "games": 29452
      },
      {
        "name": "Charizard",
        "winRate": 54.5,
        "games": 29229
      },
      {
        "name": "Mega Charizard X",
        "winRate": 54.2,
        "games": 5231
      },
      {
        "name": "Infernape",
        "winRate": 52.9,
        "games": 10426
      }
    ],
    "bestSets": []
  },
  "569": {
    "id": 569,
    "name": "Garbodor",
    "isMega": false,
    "elo": 9555,
    "winRate": 40.5,
    "appearances": 13695,
    "wins": 5540,
    "losses": 8155,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 5453
      },
      {
        "name": "Greninja",
        "winRate": 50,
        "games": 5453
      },
      {
        "name": "Umbreon",
        "winRate": 50,
        "games": 5453
      },
      {
        "name": "Tyranitar",
        "winRate": 50,
        "games": 5453
      },
      {
        "name": "Meowscarada",
        "winRate": 50,
        "games": 5453
      }
    ],
    "bestSets": []
  },
  "571": {
    "id": 571,
    "name": "Zoroark",
    "isMega": false,
    "elo": 9610,
    "winRate": 44.1,
    "appearances": 19541,
    "wins": 8615,
    "losses": 10926,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 50.5,
        "games": 5690
      },
      {
        "name": "Mimikyu",
        "winRate": 50.5,
        "games": 5690
      },
      {
        "name": "Corviknight",
        "winRate": 50.5,
        "games": 5690
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.5,
        "games": 5690
      },
      {
        "name": "Dragonite",
        "winRate": 50.5,
        "games": 5690
      }
    ],
    "bestSets": []
  },
  "584": {
    "id": 584,
    "name": "Vanilluxe",
    "isMega": false,
    "elo": 9692,
    "winRate": 50.4,
    "appearances": 16908,
    "wins": 8516,
    "losses": 8392,
    "bestPartners": [
      {
        "name": "Infernape",
        "winRate": 50.7,
        "games": 5750
      },
      {
        "name": "Emolga",
        "winRate": 50.7,
        "games": 5750
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5750
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.7,
        "games": 5750
      },
      {
        "name": "Palafin",
        "winRate": 50.5,
        "games": 5671
      }
    ],
    "bestSets": []
  },
  "587": {
    "id": 587,
    "name": "Emolga",
    "isMega": false,
    "elo": 9695,
    "winRate": 45.4,
    "appearances": 40515,
    "wins": 18395,
    "losses": 22120,
    "bestPartners": [
      {
        "name": "Vanilluxe",
        "winRate": 50.7,
        "games": 5750
      },
      {
        "name": "Infernape",
        "winRate": 50.7,
        "games": 5750
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5750
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.7,
        "games": 5750
      },
      {
        "name": "Mega Lucario Z",
        "winRate": 50.5,
        "games": 5362
      }
    ],
    "bestSets": []
  },
  "618": {
    "id": 618,
    "name": "Stunfisk",
    "isMega": false,
    "elo": 9739,
    "winRate": 50.8,
    "appearances": 27159,
    "wins": 13803,
    "losses": 13356,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Archaludon",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Pawmot",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Mudsdale",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Diggersby",
        "winRate": 54,
        "games": 4965
      }
    ],
    "bestSets": []
  },
  "623": {
    "id": 623,
    "name": "Golurk",
    "isMega": false,
    "elo": 9752,
    "winRate": 49.9,
    "appearances": 22332,
    "wins": 11142,
    "losses": 11190,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 5486
      },
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 5486
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5486
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 5486
      },
      {
        "name": "Meowscarada",
        "winRate": 50.5,
        "games": 10910
      }
    ],
    "bestSets": []
  },
  "635": {
    "id": 635,
    "name": "Hydreigon",
    "isMega": false,
    "elo": 9701,
    "winRate": 53.3,
    "appearances": 122039,
    "wins": 65059,
    "losses": 56980,
    "bestPartners": [
      {
        "name": "Galarian Stunfisk",
        "winRate": 67.1,
        "games": 3855
      },
      {
        "name": "Charizard",
        "winRate": 64.7,
        "games": 8206
      },
      {
        "name": "Mega Alakazam",
        "winRate": 61,
        "games": 4397
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 61,
        "games": 4397
      },
      {
        "name": "Conkeldurr",
        "winRate": 61,
        "games": 4397
      }
    ],
    "bestSets": []
  },
  "637": {
    "id": 637,
    "name": "Volcarona",
    "isMega": false,
    "elo": 9573,
    "winRate": 41.1,
    "appearances": 13763,
    "wins": 5661,
    "losses": 8102,
    "bestPartners": [
      {
        "name": "Mega Tyranitar",
        "winRate": 50.3,
        "games": 5396
      },
      {
        "name": "Serperior",
        "winRate": 50.3,
        "games": 5396
      },
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 5396
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.3,
        "games": 5396
      },
      {
        "name": "Charizard",
        "winRate": 50.3,
        "games": 5396
      }
    ],
    "bestSets": []
  },
  "652": {
    "id": 652,
    "name": "Chesnaught",
    "isMega": false,
    "elo": 9716,
    "winRate": 55.4,
    "appearances": 13801,
    "wins": 7649,
    "losses": 6152,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 61.6,
        "games": 8793
      },
      {
        "name": "Metagross",
        "winRate": 61.6,
        "games": 8793
      },
      {
        "name": "Heat Rotom",
        "winRate": 61.6,
        "games": 8793
      },
      {
        "name": "Greninja",
        "winRate": 61.6,
        "games": 8793
      },
      {
        "name": "Gengar",
        "winRate": 61.6,
        "games": 8793
      }
    ],
    "bestSets": []
  },
  "655": {
    "id": 655,
    "name": "Delphox",
    "isMega": false,
    "elo": 9686,
    "winRate": 50.1,
    "appearances": 39548,
    "wins": 19807,
    "losses": 19741,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 16913
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.6,
        "games": 11330
      },
      {
        "name": "Scizor",
        "winRate": 50.6,
        "games": 5680
      },
      {
        "name": "Kingambit",
        "winRate": 50.6,
        "games": 11263
      },
      {
        "name": "Azumarill",
        "winRate": 50.6,
        "games": 11263
      }
    ],
    "bestSets": []
  },
  "658": {
    "id": 658,
    "name": "Greninja",
    "isMega": false,
    "elo": 9718,
    "winRate": 50.9,
    "appearances": 409025,
    "wins": 208133,
    "losses": 200892,
    "bestPartners": [
      {
        "name": "Mega Chesnaught",
        "winRate": 66.4,
        "games": 3878
      },
      {
        "name": "Chesnaught",
        "winRate": 61.6,
        "games": 8793
      },
      {
        "name": "Charizard",
        "winRate": 58.4,
        "games": 28046
      },
      {
        "name": "Mega Venusaur",
        "winRate": 57.5,
        "games": 4790
      },
      {
        "name": "Mega Froslass",
        "winRate": 56.7,
        "games": 9671
      }
    ],
    "bestSets": []
  },
  "660": {
    "id": 660,
    "name": "Diggersby",
    "isMega": false,
    "elo": 9662,
    "winRate": 51.3,
    "appearances": 16103,
    "wins": 8260,
    "losses": 7843,
    "bestPartners": [
      {
        "name": "Pawmot",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Stunfisk",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Mudsdale",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Mega Gyarados",
        "winRate": 51.7,
        "games": 10535
      },
      {
        "name": "Archaludon",
        "winRate": 51.7,
        "games": 10535
      }
    ],
    "bestSets": []
  },
  "663": {
    "id": 663,
    "name": "Talonflame",
    "isMega": false,
    "elo": 9642,
    "winRate": 48,
    "appearances": 26300,
    "wins": 12627,
    "losses": 13673,
    "bestPartners": [
      {
        "name": "Mega Abomasnow",
        "winRate": 53.4,
        "games": 5301
      },
      {
        "name": "Archaludon",
        "winRate": 53.4,
        "games": 5301
      },
      {
        "name": "Ninetales",
        "winRate": 53.4,
        "games": 5301
      },
      {
        "name": "Arcanine",
        "winRate": 51.3,
        "games": 16615
      },
      {
        "name": "Gyarados",
        "winRate": 51.2,
        "games": 16684
      }
    ],
    "bestSets": []
  },
  "666": {
    "id": 666,
    "name": "Vivillon",
    "isMega": false,
    "elo": 9687,
    "winRate": 46.7,
    "appearances": 15641,
    "wins": 7302,
    "losses": 8339,
    "bestPartners": [
      {
        "name": "Garchomp",
        "winRate": 50.9,
        "games": 5750
      },
      {
        "name": "Garganacl",
        "winRate": 50.9,
        "games": 5750
      },
      {
        "name": "Azumarill",
        "winRate": 50.9,
        "games": 5750
      },
      {
        "name": "Arcanine",
        "winRate": 49.1,
        "games": 11060
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.1,
        "games": 11060
      }
    ],
    "bestSets": []
  },
  "676": {
    "id": 676,
    "name": "Furfrou",
    "isMega": false,
    "elo": 9590,
    "winRate": 37.9,
    "appearances": 13337,
    "wins": 5056,
    "losses": 8281,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 44.8,
        "games": 4966
      },
      {
        "name": "Incineroar",
        "winRate": 44.8,
        "games": 4966
      },
      {
        "name": "Mimikyu",
        "winRate": 44.8,
        "games": 4966
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 44.8,
        "games": 4966
      },
      {
        "name": "Spiritomb",
        "winRate": 43.5,
        "games": 4934
      }
    ],
    "bestSets": []
  },
  "678": {
    "id": 678,
    "name": "Meowstic",
    "isMega": false,
    "elo": 9668,
    "winRate": 42.9,
    "appearances": 19104,
    "wins": 8203,
    "losses": 10901,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.5,
        "games": 10989
      },
      {
        "name": "Kingambit",
        "winRate": 49.5,
        "games": 10989
      },
      {
        "name": "Krookodile",
        "winRate": 49.5,
        "games": 10989
      },
      {
        "name": "Azumarill",
        "winRate": 49.5,
        "games": 10989
      },
      {
        "name": "Conkeldurr",
        "winRate": 49.5,
        "games": 10989
      }
    ],
    "bestSets": []
  },
  "681": {
    "id": 681,
    "name": "Aegislash",
    "isMega": false,
    "elo": 9698,
    "winRate": 50.3,
    "appearances": 447685,
    "wins": 225345,
    "losses": 222340,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 63.5,
        "games": 8461
      },
      {
        "name": "Hippowdon",
        "winRate": 60.4,
        "games": 4380
      },
      {
        "name": "Mega Clefable",
        "winRate": 60.2,
        "games": 9152
      },
      {
        "name": "Empoleon",
        "winRate": 60.2,
        "games": 9152
      },
      {
        "name": "Hydreigon",
        "winRate": 58,
        "games": 4585
      }
    ],
    "bestSets": []
  },
  "693": {
    "id": 693,
    "name": "Clawitzer",
    "isMega": false,
    "elo": 9728,
    "winRate": 52.4,
    "appearances": 21524,
    "wins": 11268,
    "losses": 10256,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Samurott",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Heat Rotom",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Azumarill",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Milotic",
        "winRate": 60.5,
        "games": 4647
      }
    ],
    "bestSets": []
  },
  "697": {
    "id": 697,
    "name": "Tyrantrum",
    "isMega": false,
    "elo": 9658,
    "winRate": 50.2,
    "appearances": 16653,
    "wins": 8365,
    "losses": 8288,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 51.9,
        "games": 5386
      },
      {
        "name": "Azumarill",
        "winRate": 51.9,
        "games": 5386
      },
      {
        "name": "Scizor",
        "winRate": 51.9,
        "games": 5386
      },
      {
        "name": "Gardevoir",
        "winRate": 50.6,
        "games": 11018
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 11021
      }
    ],
    "bestSets": []
  },
  "699": {
    "id": 699,
    "name": "Aurorus",
    "isMega": false,
    "elo": 9651,
    "winRate": 47.4,
    "appearances": 15844,
    "wins": 7515,
    "losses": 8329,
    "bestPartners": [
      {
        "name": "Leafeon",
        "winRate": 50.4,
        "games": 5661
      },
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 5661
      },
      {
        "name": "Gyarados",
        "winRate": 48.7,
        "games": 10836
      },
      {
        "name": "Whimsicott",
        "winRate": 48.7,
        "games": 10836
      },
      {
        "name": "Kommo-o",
        "winRate": 47.7,
        "games": 10669
      }
    ],
    "bestSets": []
  },
  "700": {
    "id": 700,
    "name": "Sylveon",
    "isMega": false,
    "elo": 9714,
    "winRate": 50.6,
    "appearances": 55040,
    "wins": 27864,
    "losses": 27176,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 57.3,
        "games": 4725
      },
      {
        "name": "Dragapult",
        "winRate": 52.8,
        "games": 15871
      },
      {
        "name": "Whimsicott",
        "winRate": 52.1,
        "games": 15902
      },
      {
        "name": "Azumarill",
        "winRate": 51.2,
        "games": 5581
      },
      {
        "name": "Mega Scizor",
        "winRate": 51.2,
        "games": 5581
      }
    ],
    "bestSets": []
  },
  "701": {
    "id": 701,
    "name": "Hawlucha",
    "isMega": false,
    "elo": 9663,
    "winRate": 47.6,
    "appearances": 58194,
    "wins": 27688,
    "losses": 30506,
    "bestPartners": [
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.6,
        "games": 5680
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5574
      },
      {
        "name": "Ceruledge",
        "winRate": 50.5,
        "games": 5574
      },
      {
        "name": "Mega Absol Z",
        "winRate": 50.4,
        "games": 11520
      },
      {
        "name": "Rotom",
        "winRate": 50.4,
        "games": 11520
      }
    ],
    "bestSets": []
  },
  "707": {
    "id": 707,
    "name": "Klefki",
    "isMega": false,
    "elo": 9720,
    "winRate": 49.9,
    "appearances": 44112,
    "wins": 22008,
    "losses": 22104,
    "bestPartners": [
      {
        "name": "Mega Garchomp",
        "winRate": 51.2,
        "games": 5450
      },
      {
        "name": "Azumarill",
        "winRate": 51.2,
        "games": 5450
      },
      {
        "name": "Primarina",
        "winRate": 51.2,
        "games": 5450
      },
      {
        "name": "Farigiraf",
        "winRate": 50.5,
        "games": 5636
      },
      {
        "name": "Sneasler",
        "winRate": 50.5,
        "games": 5636
      }
    ],
    "bestSets": []
  },
  "711": {
    "id": 711,
    "name": "Gourgeist",
    "isMega": false,
    "elo": 9759,
    "winRate": 49.8,
    "appearances": 16780,
    "wins": 8356,
    "losses": 8424,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 50.4,
        "games": 5543
      },
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 5543
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.4,
        "games": 5543
      },
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 5543
      },
      {
        "name": "Vaporeon",
        "winRate": 50,
        "games": 11034
      }
    ],
    "bestSets": []
  },
  "715": {
    "id": 715,
    "name": "Noivern",
    "isMega": false,
    "elo": 9731,
    "winRate": 48.3,
    "appearances": 101071,
    "wins": 48856,
    "losses": 52215,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 52.2,
        "games": 5380
      },
      {
        "name": "Alolan Raichu",
        "winRate": 52.2,
        "games": 5380
      },
      {
        "name": "Gliscor",
        "winRate": 50.9,
        "games": 5696
      },
      {
        "name": "Fan Rotom",
        "winRate": 50.9,
        "games": 5696
      },
      {
        "name": "Mega Excadrill",
        "winRate": 50.6,
        "games": 11241
      }
    ],
    "bestSets": []
  },
  "724": {
    "id": 724,
    "name": "Decidueye",
    "isMega": false,
    "elo": 9811,
    "winRate": 50.4,
    "appearances": 22307,
    "wins": 11248,
    "losses": 11059,
    "bestPartners": [
      {
        "name": "Houndoom",
        "winRate": 50.8,
        "games": 11268
      },
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 16673
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 16673
      },
      {
        "name": "Dragapult",
        "winRate": 50.7,
        "games": 16673
      },
      {
        "name": "Dragonite",
        "winRate": 50.7,
        "games": 16673
      }
    ],
    "bestSets": []
  },
  "727": {
    "id": 727,
    "name": "Incineroar",
    "isMega": false,
    "elo": 9694,
    "winRate": 49.9,
    "appearances": 2043701,
    "wins": 1019536,
    "losses": 1024165,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 67.5,
        "games": 3946
      },
      {
        "name": "Archaludon",
        "winRate": 58.3,
        "games": 18677
      },
      {
        "name": "Mega Venusaur",
        "winRate": 57.5,
        "games": 4790
      },
      {
        "name": "Mega Garchomp",
        "winRate": 54.6,
        "games": 5106
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 54.5,
        "games": 4984
      }
    ],
    "bestSets": []
  },
  "730": {
    "id": 730,
    "name": "Primarina",
    "isMega": false,
    "elo": 9747,
    "winRate": 50.4,
    "appearances": 39485,
    "wins": 19887,
    "losses": 19598,
    "bestPartners": [
      {
        "name": "Tyrantrum",
        "winRate": 51.9,
        "games": 5386
      },
      {
        "name": "Gyarados",
        "winRate": 51.9,
        "games": 5386
      },
      {
        "name": "Gardevoir",
        "winRate": 51.9,
        "games": 5386
      },
      {
        "name": "Scizor",
        "winRate": 51.9,
        "games": 5386
      },
      {
        "name": "Mega Garchomp",
        "winRate": 51.2,
        "games": 5450
      }
    ],
    "bestSets": []
  },
  "733": {
    "id": 733,
    "name": "Toucannon",
    "isMega": false,
    "elo": 9662,
    "winRate": 53.1,
    "appearances": 15596,
    "wins": 8285,
    "losses": 7311,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 60.4,
        "games": 4380
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 60.4,
        "games": 4380
      },
      {
        "name": "Hippowdon",
        "winRate": 60.4,
        "games": 4380
      },
      {
        "name": "Heat Rotom",
        "winRate": 55,
        "games": 10066
      },
      {
        "name": "Aegislash",
        "winRate": 53.1,
        "games": 15596
      }
    ],
    "bestSets": []
  },
  "740": {
    "id": 740,
    "name": "Crabominable",
    "isMega": false,
    "elo": 9676,
    "winRate": 50.4,
    "appearances": 78059,
    "wins": 39368,
    "losses": 38691,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 53.9,
        "games": 5035
      },
      {
        "name": "Scizor",
        "winRate": 53.9,
        "games": 5035
      },
      {
        "name": "Meowscarada",
        "winRate": 53.9,
        "games": 5035
      },
      {
        "name": "Mega Starmie",
        "winRate": 52.3,
        "games": 10722
      },
      {
        "name": "Pawmot",
        "winRate": 51,
        "games": 5593
      }
    ],
    "bestSets": []
  },
  "745": {
    "id": 745,
    "name": "Lycanroc",
    "isMega": false,
    "elo": 9636,
    "winRate": 46.3,
    "appearances": 15565,
    "wins": 7210,
    "losses": 8355,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5661
      },
      {
        "name": "Whimsicott",
        "winRate": 50.5,
        "games": 5661
      },
      {
        "name": "Dragonite",
        "winRate": 50.5,
        "games": 5661
      },
      {
        "name": "Charizard",
        "winRate": 50.5,
        "games": 5661
      },
      {
        "name": "Azumarill",
        "winRate": 48.9,
        "games": 5564
      }
    ],
    "bestSets": []
  },
  "748": {
    "id": 748,
    "name": "Toxapex",
    "isMega": false,
    "elo": 9642,
    "winRate": 47,
    "appearances": 135725,
    "wins": 63780,
    "losses": 71945,
    "bestPartners": [
      {
        "name": "Mega Excadrill",
        "winRate": 50.9,
        "games": 5673
      },
      {
        "name": "Altaria",
        "winRate": 50.9,
        "games": 5673
      },
      {
        "name": "Primarina",
        "winRate": 50.9,
        "games": 5673
      },
      {
        "name": "Mega Garchomp",
        "winRate": 50.8,
        "games": 5617
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 11052
      }
    ],
    "bestSets": []
  },
  "750": {
    "id": 750,
    "name": "Mudsdale",
    "isMega": false,
    "elo": 9700,
    "winRate": 51.1,
    "appearances": 15911,
    "wins": 8129,
    "losses": 7782,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Archaludon",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Pawmot",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Stunfisk",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Diggersby",
        "winRate": 54,
        "games": 4965
      }
    ],
    "bestSets": []
  },
  "752": {
    "id": 752,
    "name": "Araquanid",
    "isMega": false,
    "elo": 9701,
    "winRate": 48.2,
    "appearances": 42586,
    "wins": 20544,
    "losses": 22042,
    "bestPartners": [
      {
        "name": "Mega Excadrill",
        "winRate": 50.6,
        "games": 5575
      },
      {
        "name": "Hydreigon",
        "winRate": 50.6,
        "games": 5575
      },
      {
        "name": "Dragapult",
        "winRate": 50.6,
        "games": 5575
      },
      {
        "name": "Dragonite",
        "winRate": 50.6,
        "games": 5575
      },
      {
        "name": "Noivern",
        "winRate": 50.6,
        "games": 5575
      }
    ],
    "bestSets": []
  },
  "763": {
    "id": 763,
    "name": "Tsareena",
    "isMega": false,
    "elo": 9680,
    "winRate": 50.2,
    "appearances": 20494,
    "wins": 10293,
    "losses": 10201,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 53.7,
        "games": 5213
      },
      {
        "name": "Greninja",
        "winRate": 53.7,
        "games": 10429
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 53.7,
        "games": 5213
      },
      {
        "name": "Palafin",
        "winRate": 53.7,
        "games": 10429
      },
      {
        "name": "Heat Rotom",
        "winRate": 53.6,
        "games": 5216
      }
    ],
    "bestSets": []
  },
  "765": {
    "id": 765,
    "name": "Oranguru",
    "isMega": false,
    "elo": 9636,
    "winRate": 50.7,
    "appearances": 28311,
    "wins": 14347,
    "losses": 13964,
    "bestPartners": [
      {
        "name": "Rhyperior",
        "winRate": 50.8,
        "games": 22712
      },
      {
        "name": "Hatterene",
        "winRate": 50.7,
        "games": 28311
      },
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 28311
      },
      {
        "name": "Venusaur",
        "winRate": 50.7,
        "games": 28311
      },
      {
        "name": "Torkoal",
        "winRate": 50.7,
        "games": 28311
      }
    ],
    "bestSets": []
  },
  "778": {
    "id": 778,
    "name": "Mimikyu",
    "isMega": false,
    "elo": 9744,
    "winRate": 47.6,
    "appearances": 62941,
    "wins": 29934,
    "losses": 33007,
    "bestPartners": [
      {
        "name": "Rhyperior",
        "winRate": 50.6,
        "games": 5457
      },
      {
        "name": "Ursaluna",
        "winRate": 50.6,
        "games": 5457
      },
      {
        "name": "Kingambit",
        "winRate": 50.6,
        "games": 5457
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 5457
      },
      {
        "name": "Zoroark",
        "winRate": 50.5,
        "games": 5690
      }
    ],
    "bestSets": []
  },
  "780": {
    "id": 780,
    "name": "Drampa",
    "isMega": false,
    "elo": 9667,
    "winRate": 49.5,
    "appearances": 139743,
    "wins": 69221,
    "losses": 70522,
    "bestPartners": [
      {
        "name": "Kommo-o",
        "winRate": 58.1,
        "games": 4683
      },
      {
        "name": "Snorlax",
        "winRate": 56.1,
        "games": 4931
      },
      {
        "name": "Whimsicott",
        "winRate": 54.5,
        "games": 10132
      },
      {
        "name": "Mega Starmie",
        "winRate": 54.1,
        "games": 10370
      },
      {
        "name": "Scizor",
        "winRate": 52.7,
        "games": 15862
      }
    ],
    "bestSets": []
  },
  "784": {
    "id": 784,
    "name": "Kommo-o",
    "isMega": false,
    "elo": 9664,
    "winRate": 51,
    "appearances": 75278,
    "wins": 38402,
    "losses": 36876,
    "bestPartners": [
      {
        "name": "Mega Charizard X",
        "winRate": 67.1,
        "games": 3855
      },
      {
        "name": "Mega Starmie",
        "winRate": 58.1,
        "games": 4683
      },
      {
        "name": "Drampa",
        "winRate": 58.1,
        "games": 4683
      },
      {
        "name": "Torkoal",
        "winRate": 58.1,
        "games": 4683
      },
      {
        "name": "Archaludon",
        "winRate": 57.3,
        "games": 9519
      }
    ],
    "bestSets": []
  },
  "823": {
    "id": 823,
    "name": "Corviknight",
    "isMega": false,
    "elo": 9708,
    "winRate": 50.6,
    "appearances": 212670,
    "wins": 107524,
    "losses": 105146,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 60.6,
        "games": 13437
      },
      {
        "name": "Scovillain",
        "winRate": 60.5,
        "games": 9036
      },
      {
        "name": "Archaludon",
        "winRate": 59.8,
        "games": 22812
      },
      {
        "name": "Mega Gyarados",
        "winRate": 58.7,
        "games": 4660
      },
      {
        "name": "Gliscor",
        "winRate": 58.7,
        "games": 4660
      }
    ],
    "bestSets": []
  },
  "844": {
    "id": 844,
    "name": "Sandaconda",
    "isMega": false,
    "elo": 9699,
    "winRate": 53.1,
    "appearances": 15944,
    "wins": 8464,
    "losses": 7480,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Azumarill",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Clawitzer",
        "winRate": 60.5,
        "games": 4647
      },
      {
        "name": "Samurott",
        "winRate": 54.5,
        "games": 10461
      },
      {
        "name": "Milotic",
        "winRate": 54.5,
        "games": 10461
      }
    ],
    "bestSets": []
  },
  "855": {
    "id": 855,
    "name": "Polteageist",
    "isMega": false,
    "elo": 9611,
    "winRate": 39.6,
    "appearances": 18190,
    "wins": 7197,
    "losses": 10993,
    "bestPartners": [
      {
        "name": "Mega Kangaskhan",
        "winRate": 49.8,
        "games": 5452
      },
      {
        "name": "Krookodile",
        "winRate": 49.8,
        "games": 5452
      },
      {
        "name": "Rotom",
        "winRate": 49.8,
        "games": 5452
      },
      {
        "name": "Gardevoir",
        "winRate": 49.8,
        "games": 5452
      },
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 5452
      }
    ],
    "bestSets": []
  },
  "858": {
    "id": 858,
    "name": "Hatterene",
    "isMega": false,
    "elo": 9709,
    "winRate": 50.2,
    "appearances": 533675,
    "wins": 267854,
    "losses": 265821,
    "bestPartners": [
      {
        "name": "Mega Scizor",
        "winRate": 59.3,
        "games": 4674
      },
      {
        "name": "Snorlax",
        "winRate": 58.1,
        "games": 9432
      },
      {
        "name": "Slowbro",
        "winRate": 54.9,
        "games": 15025
      },
      {
        "name": "Tyranitar",
        "winRate": 52.6,
        "games": 31310
      },
      {
        "name": "Azumarill",
        "winRate": 51.9,
        "games": 5396
      }
    ],
    "bestSets": []
  },
  "866": {
    "id": 866,
    "name": "Mr. Rime",
    "isMega": false,
    "elo": 9694,
    "winRate": 49.2,
    "appearances": 16203,
    "wins": 7979,
    "losses": 8224,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 5433
      },
      {
        "name": "Krookodile",
        "winRate": 50.2,
        "games": 5433
      },
      {
        "name": "Incineroar",
        "winRate": 50,
        "games": 10926
      },
      {
        "name": "Kingambit",
        "winRate": 50,
        "games": 10926
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 49.8,
        "games": 5493
      }
    ],
    "bestSets": []
  },
  "867": {
    "id": 867,
    "name": "Runerigus",
    "isMega": false,
    "elo": 9726,
    "winRate": 50.2,
    "appearances": 16349,
    "wins": 8215,
    "losses": 8134,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 50.4,
        "games": 5339
      },
      {
        "name": "Umbreon",
        "winRate": 50.4,
        "games": 5339
      },
      {
        "name": "Dragonite",
        "winRate": 50.3,
        "games": 10810
      },
      {
        "name": "Feraligatr",
        "winRate": 50.3,
        "games": 10810
      },
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 10878
      }
    ],
    "bestSets": []
  },
  "869": {
    "id": 869,
    "name": "Alcremie",
    "isMega": false,
    "elo": 9779,
    "winRate": 54.3,
    "appearances": 14888,
    "wins": 8080,
    "losses": 6808,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 61,
        "games": 4475
      },
      {
        "name": "Rotom",
        "winRate": 61,
        "games": 4475
      },
      {
        "name": "Metagross",
        "winRate": 56.6,
        "games": 9664
      },
      {
        "name": "Kingambit",
        "winRate": 55,
        "games": 9699
      },
      {
        "name": "Scizor",
        "winRate": 54.3,
        "games": 14888
      }
    ],
    "bestSets": []
  },
  "877": {
    "id": 877,
    "name": "Morpeko",
    "isMega": false,
    "elo": 9560,
    "winRate": 39,
    "appearances": 17117,
    "wins": 6676,
    "losses": 10441,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 53.5,
        "games": 5173
      },
      {
        "name": "Greninja",
        "winRate": 53.5,
        "games": 5173
      },
      {
        "name": "Tyranitar",
        "winRate": 53.5,
        "games": 5173
      },
      {
        "name": "Hydreigon",
        "winRate": 48.2,
        "games": 9752
      },
      {
        "name": "Mega Gengar",
        "winRate": 45.2,
        "games": 9315
      }
    ],
    "bestSets": []
  },
  "887": {
    "id": 887,
    "name": "Dragapult",
    "isMega": false,
    "elo": 9679,
    "winRate": 50.3,
    "appearances": 1014307,
    "wins": 510050,
    "losses": 504257,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 54.7,
        "games": 10152
      },
      {
        "name": "Mega Garchomp",
        "winRate": 54.6,
        "games": 5106
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 54.5,
        "games": 4984
      },
      {
        "name": "Gliscor",
        "winRate": 54.4,
        "games": 10356
      },
      {
        "name": "Corviknight",
        "winRate": 53.5,
        "games": 15627
      }
    ],
    "bestSets": []
  },
  "900": {
    "id": 900,
    "name": "Kleavor",
    "isMega": false,
    "elo": 9691,
    "winRate": 52.2,
    "appearances": 16313,
    "wins": 8519,
    "losses": 7794,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 55.6,
        "games": 5143
      },
      {
        "name": "Kingambit",
        "winRate": 55.6,
        "games": 5143
      },
      {
        "name": "Politoed",
        "winRate": 55.6,
        "games": 5143
      },
      {
        "name": "Archaludon",
        "winRate": 53.1,
        "games": 10596
      },
      {
        "name": "Feraligatr",
        "winRate": 53,
        "games": 10860
      }
    ],
    "bestSets": []
  },
  "901": {
    "id": 901,
    "name": "Ursaluna",
    "isMega": false,
    "elo": 9693,
    "winRate": 50.2,
    "appearances": 50268,
    "wins": 25253,
    "losses": 25015,
    "bestPartners": [
      {
        "name": "Mega Slowbro",
        "winRate": 51.8,
        "games": 5503
      },
      {
        "name": "Infernape",
        "winRate": 51.8,
        "games": 5503
      },
      {
        "name": "Charizard",
        "winRate": 51.8,
        "games": 5503
      },
      {
        "name": "Meowscarada",
        "winRate": 51.8,
        "games": 5503
      },
      {
        "name": "Mega Starmie",
        "winRate": 50.8,
        "games": 5687
      }
    ],
    "bestSets": []
  },
  "902": {
    "id": 902,
    "name": "Basculegion",
    "isMega": false,
    "elo": 9588,
    "winRate": 42.2,
    "appearances": 14030,
    "wins": 5916,
    "losses": 8114,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 51,
        "games": 5646
      },
      {
        "name": "Incineroar",
        "winRate": 51,
        "games": 5646
      },
      {
        "name": "Hydreigon",
        "winRate": 47,
        "games": 10225
      },
      {
        "name": "Whimsicott",
        "winRate": 42.2,
        "games": 9451
      },
      {
        "name": "Meowscarada",
        "winRate": 42.2,
        "games": 9451
      }
    ],
    "bestSets": []
  },
  "903": {
    "id": 903,
    "name": "Sneasler",
    "isMega": false,
    "elo": 9681,
    "winRate": 50,
    "appearances": 33560,
    "wins": 16777,
    "losses": 16783,
    "bestPartners": [
      {
        "name": "Pawmot",
        "winRate": 50.8,
        "games": 11229
      },
      {
        "name": "Sylveon",
        "winRate": 50.5,
        "games": 5636
      },
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 5636
      },
      {
        "name": "Klefki",
        "winRate": 50.5,
        "games": 5636
      },
      {
        "name": "Farigiraf",
        "winRate": 50.4,
        "games": 16878
      }
    ],
    "bestSets": []
  },
  "908": {
    "id": 908,
    "name": "Meowscarada",
    "isMega": false,
    "elo": 9700,
    "winRate": 49.4,
    "appearances": 171073,
    "wins": 84517,
    "losses": 86556,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 58.3,
        "games": 4674
      },
      {
        "name": "Azumarill",
        "winRate": 58.3,
        "games": 4674
      },
      {
        "name": "Lucario",
        "winRate": 58.3,
        "games": 4674
      },
      {
        "name": "Mega Starmie",
        "winRate": 53.9,
        "games": 5035
      },
      {
        "name": "Crabominable",
        "winRate": 53.9,
        "games": 5035
      }
    ],
    "bestSets": []
  },
  "914": {
    "id": 914,
    "name": "Quaquaval",
    "isMega": false,
    "elo": 9704,
    "winRate": 50.7,
    "appearances": 22042,
    "wins": 11170,
    "losses": 10872,
    "bestPartners": [
      {
        "name": "Mega Delphox",
        "winRate": 51.3,
        "games": 5449
      },
      {
        "name": "Kingambit",
        "winRate": 51.3,
        "games": 5449
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 51.3,
        "games": 5449
      },
      {
        "name": "Drampa",
        "winRate": 51.3,
        "games": 5449
      },
      {
        "name": "Incineroar",
        "winRate": 50.9,
        "games": 5638
      }
    ],
    "bestSets": []
  },
  "923": {
    "id": 923,
    "name": "Pawmot",
    "isMega": false,
    "elo": 9694,
    "winRate": 50.6,
    "appearances": 32609,
    "wins": 16510,
    "losses": 16099,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Archaludon",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Stunfisk",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Mudsdale",
        "winRate": 54,
        "games": 4965
      },
      {
        "name": "Diggersby",
        "winRate": 54,
        "games": 4965
      }
    ],
    "bestSets": []
  },
  "925": {
    "id": 925,
    "name": "Maushold",
    "isMega": false,
    "elo": 9596,
    "winRate": 38.8,
    "appearances": 13546,
    "wins": 5254,
    "losses": 8292,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50.5,
        "games": 5816
      },
      {
        "name": "Garchomp",
        "winRate": 50.5,
        "games": 5816
      },
      {
        "name": "Dragapult",
        "winRate": 50.5,
        "games": 5816
      },
      {
        "name": "Kingambit",
        "winRate": 50.5,
        "games": 5816
      },
      {
        "name": "Gyarados",
        "winRate": 41.7,
        "games": 4614
      }
    ],
    "bestSets": []
  },
  "934": {
    "id": 934,
    "name": "Garganacl",
    "isMega": false,
    "elo": 9664,
    "winRate": 50.1,
    "appearances": 44152,
    "wins": 22100,
    "losses": 22052,
    "bestPartners": [
      {
        "name": "Corviknight",
        "winRate": 51.2,
        "games": 10967
      },
      {
        "name": "Vivillon",
        "winRate": 50.9,
        "games": 5750
      },
      {
        "name": "Arcanine",
        "winRate": 50.9,
        "games": 5750
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 22190
      },
      {
        "name": "Azumarill",
        "winRate": 50.6,
        "games": 16863
      }
    ],
    "bestSets": []
  },
  "936": {
    "id": 936,
    "name": "Armarouge",
    "isMega": false,
    "elo": 9656,
    "winRate": 49,
    "appearances": 16655,
    "wins": 8161,
    "losses": 8494,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 49.9,
        "games": 5708
      },
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 5708
      },
      {
        "name": "Drampa",
        "winRate": 49.9,
        "games": 5708
      },
      {
        "name": "Greninja",
        "winRate": 49.7,
        "games": 11207
      },
      {
        "name": "Azumarill",
        "winRate": 49.7,
        "games": 11207
      }
    ],
    "bestSets": []
  },
  "937": {
    "id": 937,
    "name": "Ceruledge",
    "isMega": false,
    "elo": 9667,
    "winRate": 50,
    "appearances": 16656,
    "wins": 8329,
    "losses": 8327,
    "bestPartners": [
      {
        "name": "Mega Absol",
        "winRate": 50.5,
        "games": 5574
      },
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 5574
      },
      {
        "name": "Hawlucha",
        "winRate": 50.5,
        "games": 5574
      },
      {
        "name": "Dragapult",
        "winRate": 50.5,
        "games": 5574
      },
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 11090
      }
    ],
    "bestSets": []
  },
  "952": {
    "id": 952,
    "name": "Scovillain",
    "isMega": false,
    "elo": 9779,
    "winRate": 57.4,
    "appearances": 18887,
    "wins": 10832,
    "losses": 8055,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 61.8,
        "games": 4379
      },
      {
        "name": "Aerodactyl",
        "winRate": 60.5,
        "games": 9036
      },
      {
        "name": "Tyranitar",
        "winRate": 60.5,
        "games": 9036
      },
      {
        "name": "Corviknight",
        "winRate": 60.5,
        "games": 9036
      },
      {
        "name": "Kingambit",
        "winRate": 60.5,
        "games": 9036
      }
    ],
    "bestSets": []
  },
  "959": {
    "id": 959,
    "name": "Tinkaton",
    "isMega": false,
    "elo": 9692,
    "winRate": 48.5,
    "appearances": 43031,
    "wins": 20851,
    "losses": 22180,
    "bestPartners": [
      {
        "name": "Mega Garchomp",
        "winRate": 50.8,
        "games": 5617
      },
      {
        "name": "Toxapex",
        "winRate": 50.5,
        "games": 11242
      },
      {
        "name": "Scizor",
        "winRate": 50.2,
        "games": 16758
      },
      {
        "name": "Kingambit",
        "winRate": 50.2,
        "games": 16758
      },
      {
        "name": "Mega Dragonite",
        "winRate": 50.2,
        "games": 5645
      }
    ],
    "bestSets": []
  },
  "964": {
    "id": 964,
    "name": "Palafin",
    "isMega": false,
    "elo": 9732,
    "winRate": 50.3,
    "appearances": 231524,
    "wins": 116353,
    "losses": 115171,
    "bestPartners": [
      {
        "name": "Mega Venusaur",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Wash Rotom",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Tyranitar",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Tsareena",
        "winRate": 53.7,
        "games": 10429
      }
    ],
    "bestSets": []
  },
  "968": {
    "id": 968,
    "name": "Orthworm",
    "isMega": false,
    "elo": 9735,
    "winRate": 50.9,
    "appearances": 16311,
    "wins": 8308,
    "losses": 8003,
    "bestPartners": [
      {
        "name": "Mega Altaria",
        "winRate": 53,
        "games": 5224
      },
      {
        "name": "Scizor",
        "winRate": 53,
        "games": 5224
      },
      {
        "name": "Kingambit",
        "winRate": 53,
        "games": 5224
      },
      {
        "name": "Lucario",
        "winRate": 53,
        "games": 5224
      },
      {
        "name": "Metagross",
        "winRate": 53,
        "games": 5224
      }
    ],
    "bestSets": []
  },
  "970": {
    "id": 970,
    "name": "Glimmora",
    "isMega": false,
    "elo": 9639,
    "winRate": 49.5,
    "appearances": 10727,
    "wins": 5310,
    "losses": 5417,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.5,
        "games": 10727
      },
      {
        "name": "Dragonite",
        "winRate": 49.5,
        "games": 10727
      },
      {
        "name": "Feraligatr",
        "winRate": 49.5,
        "games": 10727
      },
      {
        "name": "Politoed",
        "winRate": 49.5,
        "games": 10727
      },
      {
        "name": "Scizor",
        "winRate": 49.5,
        "games": 10727
      }
    ],
    "bestSets": []
  },
  "977": {
    "id": 977,
    "name": "Dondozo",
    "isMega": false,
    "elo": 9702,
    "winRate": 49.6,
    "appearances": 55468,
    "wins": 27528,
    "losses": 27940,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 51.2,
        "games": 5302
      },
      {
        "name": "Garchomp",
        "winRate": 49.7,
        "games": 44407
      },
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 55468
      },
      {
        "name": "Tatsugiri",
        "winRate": 49.6,
        "games": 55468
      },
      {
        "name": "Hatterene",
        "winRate": 49.6,
        "games": 49816
      }
    ],
    "bestSets": []
  },
  "978": {
    "id": 978,
    "name": "Tatsugiri",
    "isMega": false,
    "elo": 9688,
    "winRate": 49.7,
    "appearances": 66717,
    "wins": 33158,
    "losses": 33559,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 50.4,
        "games": 16551
      },
      {
        "name": "Corviknight",
        "winRate": 50,
        "games": 11249
      },
      {
        "name": "Arcanine",
        "winRate": 50,
        "games": 11249
      },
      {
        "name": "Skarmory",
        "winRate": 50,
        "games": 11249
      },
      {
        "name": "Garchomp",
        "winRate": 49.7,
        "games": 44407
      }
    ],
    "bestSets": []
  },
  "981": {
    "id": 981,
    "name": "Farigiraf",
    "isMega": false,
    "elo": 9671,
    "winRate": 50.4,
    "appearances": 16878,
    "wins": 8504,
    "losses": 8374,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 51,
        "games": 5593
      },
      {
        "name": "Pawmot",
        "winRate": 50.8,
        "games": 11229
      },
      {
        "name": "Sylveon",
        "winRate": 50.5,
        "games": 5636
      },
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 5636
      },
      {
        "name": "Klefki",
        "winRate": 50.5,
        "games": 5636
      }
    ],
    "bestSets": []
  },
  "983": {
    "id": 983,
    "name": "Kingambit",
    "isMega": false,
    "elo": 9721,
    "winRate": 50.8,
    "appearances": 782983,
    "wins": 397820,
    "losses": 385163,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 67.5,
        "games": 3946
      },
      {
        "name": "Aerodactyl",
        "winRate": 60.6,
        "games": 13437
      },
      {
        "name": "Scovillain",
        "winRate": 60.5,
        "games": 9036
      },
      {
        "name": "Archaludon",
        "winRate": 59.3,
        "games": 50641
      },
      {
        "name": "Corviknight",
        "winRate": 58.3,
        "games": 18770
      }
    ],
    "bestSets": []
  },
  "1013": {
    "id": 1013,
    "name": "Sinistcha",
    "isMega": false,
    "elo": 9738,
    "winRate": 50.6,
    "appearances": 16912,
    "wins": 8562,
    "losses": 8350,
    "bestPartners": [
      {
        "name": "Meowscarada",
        "winRate": 51.8,
        "games": 5575
      },
      {
        "name": "Mow Rotom",
        "winRate": 51.8,
        "games": 5575
      },
      {
        "name": "Leafeon",
        "winRate": 51.8,
        "games": 5575
      },
      {
        "name": "Blastoise",
        "winRate": 50.8,
        "games": 5591
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.8,
        "games": 5591
      }
    ],
    "bestSets": []
  },
  "1018": {
    "id": 1018,
    "name": "Archaludon",
    "isMega": false,
    "elo": 9767,
    "winRate": 56,
    "appearances": 171267,
    "wins": 95885,
    "losses": 75382,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 67.2,
        "games": 8027
      },
      {
        "name": "Slowbro",
        "winRate": 66.8,
        "games": 3934
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 63.5,
        "games": 8461
      },
      {
        "name": "Aegislash",
        "winRate": 63.5,
        "games": 8461
      },
      {
        "name": "Heat Rotom",
        "winRate": 63.5,
        "games": 8314
      }
    ],
    "bestSets": []
  },
  "1019": {
    "id": 1019,
    "name": "Hydrapple",
    "isMega": false,
    "elo": 9687,
    "winRate": 49.8,
    "appearances": 16546,
    "wins": 8241,
    "losses": 8305,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 50.3,
        "games": 5296
      },
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 5296
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.3,
        "games": 5296
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 5296
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.2,
        "games": 10758
      }
    ],
    "bestSets": []
  },
  "5059": {
    "id": 5059,
    "name": "Hisuian Arcanine",
    "isMega": false,
    "elo": 9685,
    "winRate": 49,
    "appearances": 409618,
    "wins": 200829,
    "losses": 208789,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 66.9,
        "games": 4081
      },
      {
        "name": "Archaludon",
        "winRate": 63.5,
        "games": 8461
      },
      {
        "name": "Hydreigon",
        "winRate": 61,
        "games": 4397
      },
      {
        "name": "Toucannon",
        "winRate": 60.4,
        "games": 4380
      },
      {
        "name": "Hippowdon",
        "winRate": 60.4,
        "games": 4380
      }
    ],
    "bestSets": []
  },
  "5157": {
    "id": 5157,
    "name": "Hisuian Typhlosion",
    "isMega": false,
    "elo": 9718,
    "winRate": 50.1,
    "appearances": 16350,
    "wins": 8196,
    "losses": 8154,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 5427
      },
      {
        "name": "Dragonite",
        "winRate": 50.2,
        "games": 5427
      },
      {
        "name": "Umbreon",
        "winRate": 50.2,
        "games": 5427
      },
      {
        "name": "Abomasnow",
        "winRate": 50.2,
        "games": 5427
      },
      {
        "name": "Hawlucha",
        "winRate": 50.2,
        "games": 5340
      }
    ],
    "bestSets": []
  },
  "6080": {
    "id": 6080,
    "name": "Galarian Slowbro",
    "isMega": false,
    "elo": 9654,
    "winRate": 44.8,
    "appearances": 59530,
    "wins": 26657,
    "losses": 32873,
    "bestPartners": [
      {
        "name": "Palafin",
        "winRate": 50.6,
        "games": 5721
      },
      {
        "name": "Garchomp",
        "winRate": 50.4,
        "games": 16515
      },
      {
        "name": "Kingambit",
        "winRate": 50.4,
        "games": 16515
      },
      {
        "name": "Politoed",
        "winRate": 50.4,
        "games": 5427
      },
      {
        "name": "Mega Absol Z",
        "winRate": 50.2,
        "games": 5840
      }
    ],
    "bestSets": []
  },
  "6199": {
    "id": 6199,
    "name": "Galarian Slowking",
    "isMega": false,
    "elo": 9562,
    "winRate": 44,
    "appearances": 14565,
    "wins": 6408,
    "losses": 8157,
    "bestPartners": [
      {
        "name": "Mega Audino",
        "winRate": 47.1,
        "games": 5250
      },
      {
        "name": "Gyarados",
        "winRate": 44,
        "games": 14565
      },
      {
        "name": "Hatterene",
        "winRate": 44,
        "games": 14565
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 44,
        "games": 14565
      },
      {
        "name": "Sableye",
        "winRate": 44,
        "games": 14565
      }
    ],
    "bestSets": []
  },
  "6618": {
    "id": 6618,
    "name": "Galarian Stunfisk",
    "isMega": false,
    "elo": 9703,
    "winRate": 50.4,
    "appearances": 96962,
    "wins": 48824,
    "losses": 48138,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 67.1,
        "games": 3855
      },
      {
        "name": "Mega Charizard X",
        "winRate": 57.5,
        "games": 9300
      },
      {
        "name": "Whimsicott",
        "winRate": 57.5,
        "games": 9300
      },
      {
        "name": "Kommo-o",
        "winRate": 56,
        "games": 9332
      },
      {
        "name": "Alcremie",
        "winRate": 52.9,
        "games": 5189
      }
    ],
    "bestSets": []
  },
  "10008": {
    "id": 10008,
    "name": "Heat Rotom",
    "isMega": false,
    "elo": 9647,
    "winRate": 53.2,
    "appearances": 109119,
    "wins": 58093,
    "losses": 51026,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 66.8,
        "games": 3934
      },
      {
        "name": "Slowbro",
        "winRate": 66.8,
        "games": 3934
      },
      {
        "name": "Mega Chesnaught",
        "winRate": 66.4,
        "games": 3878
      },
      {
        "name": "Archaludon",
        "winRate": 63.5,
        "games": 8314
      },
      {
        "name": "Gengar",
        "winRate": 63,
        "games": 12671
      }
    ],
    "bestSets": []
  },
  "10009": {
    "id": 10009,
    "name": "Wash Rotom",
    "isMega": false,
    "elo": 9713,
    "winRate": 51.5,
    "appearances": 134432,
    "wins": 69228,
    "losses": 65204,
    "bestPartners": [
      {
        "name": "Corviknight",
        "winRate": 58.6,
        "games": 4715
      },
      {
        "name": "Pinsir",
        "winRate": 57.6,
        "games": 9513
      },
      {
        "name": "Mega Heracross",
        "winRate": 56,
        "games": 9934
      },
      {
        "name": "Feraligatr",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Palafin",
        "winRate": 55.8,
        "games": 4907
      }
    ],
    "bestSets": []
  },
  "10010": {
    "id": 10010,
    "name": "Frost Rotom",
    "isMega": false,
    "elo": 9712,
    "winRate": 49.4,
    "appearances": 16650,
    "wins": 8227,
    "losses": 8423,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 49.4,
        "games": 11207
      },
      {
        "name": "Hawlucha",
        "winRate": 49.4,
        "games": 5500
      },
      {
        "name": "Dragonite",
        "winRate": 49.4,
        "games": 10943
      },
      {
        "name": "Noivern",
        "winRate": 49.4,
        "games": 5500
      },
      {
        "name": "Whimsicott",
        "winRate": 49.4,
        "games": 5500
      }
    ],
    "bestSets": []
  },
  "10011": {
    "id": 10011,
    "name": "Fan Rotom",
    "isMega": false,
    "elo": 9673,
    "winRate": 47.8,
    "appearances": 43124,
    "wins": 20626,
    "losses": 22498,
    "bestPartners": [
      {
        "name": "Mega Lucario Z",
        "winRate": 50.9,
        "games": 5696
      },
      {
        "name": "Noivern",
        "winRate": 50.9,
        "games": 5696
      },
      {
        "name": "Dragapult",
        "winRate": 50.9,
        "games": 5696
      },
      {
        "name": "Dragonite",
        "winRate": 50.5,
        "games": 11459
      },
      {
        "name": "Gliscor",
        "winRate": 50.2,
        "games": 11403
      }
    ],
    "bestSets": []
  },
  "10012": {
    "id": 10012,
    "name": "Mow Rotom",
    "isMega": false,
    "elo": 9766,
    "winRate": 50.1,
    "appearances": 22529,
    "wins": 11277,
    "losses": 11252,
    "bestPartners": [
      {
        "name": "Clawitzer",
        "winRate": 51.8,
        "games": 5575
      },
      {
        "name": "Meowscarada",
        "winRate": 51.8,
        "games": 5575
      },
      {
        "name": "Krookodile",
        "winRate": 51.8,
        "games": 5575
      },
      {
        "name": "Leafeon",
        "winRate": 51.8,
        "games": 5575
      },
      {
        "name": "Sinistcha",
        "winRate": 51.8,
        "games": 5575
      }
    ],
    "bestSets": []
  },
  "10100": {
    "id": 10100,
    "name": "Alolan Raichu",
    "isMega": false,
    "elo": 9712,
    "winRate": 45.7,
    "appearances": 55905,
    "wins": 25543,
    "losses": 30362,
    "bestPartners": [
      {
        "name": "Mega Emboar",
        "winRate": 52.2,
        "games": 5380
      },
      {
        "name": "Noivern",
        "winRate": 52.2,
        "games": 5380
      },
      {
        "name": "Skarmory",
        "winRate": 52.2,
        "games": 5380
      },
      {
        "name": "Whimsicott",
        "winRate": 52.2,
        "games": 5380
      },
      {
        "name": "Archaludon",
        "winRate": 52.2,
        "games": 5380
      }
    ],
    "bestSets": []
  },
  "10103": {
    "id": 10103,
    "name": "Alolan Ninetales",
    "isMega": false,
    "elo": 9704,
    "winRate": 50.6,
    "appearances": 82748,
    "wins": 41878,
    "losses": 40870,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 54.5,
        "games": 4984
      },
      {
        "name": "Incineroar",
        "winRate": 54.5,
        "games": 4984
      },
      {
        "name": "Kingambit",
        "winRate": 54.5,
        "games": 4984
      },
      {
        "name": "Garchomp",
        "winRate": 51.4,
        "games": 21757
      },
      {
        "name": "Scizor",
        "winRate": 51.3,
        "games": 32775
      }
    ],
    "bestSets": []
  },
  "10336": {
    "id": 10336,
    "name": "Hisuian Samurott",
    "isMega": false,
    "elo": 9714,
    "winRate": 51.3,
    "appearances": 31850,
    "wins": 16337,
    "losses": 15513,
    "bestPartners": [
      {
        "name": "Mega Venusaur",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Feraligatr",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Palafin",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Tyranitar",
        "winRate": 55.8,
        "games": 4907
      },
      {
        "name": "Mega Froslass",
        "winRate": 55.3,
        "games": 4997
      }
    ],
    "bestSets": []
  },
  "10340": {
    "id": 10340,
    "name": "Hisuian Zoroark",
    "isMega": false,
    "elo": 9666,
    "winRate": 49.5,
    "appearances": 134176,
    "wins": 66439,
    "losses": 67737,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 58,
        "games": 4585
      },
      {
        "name": "Mega Scizor",
        "winRate": 54.3,
        "games": 10166
      },
      {
        "name": "Tsareena",
        "winRate": 53.7,
        "games": 5213
      },
      {
        "name": "Aegislash",
        "winRate": 52.3,
        "games": 21165
      },
      {
        "name": "Corviknight",
        "winRate": 51.8,
        "games": 5517
      }
    ],
    "bestSets": []
  },
  "10341": {
    "id": 10341,
    "name": "Hisuian Decidueye",
    "isMega": false,
    "elo": 9708,
    "winRate": 47.3,
    "appearances": 46877,
    "wins": 22192,
    "losses": 24685,
    "bestPartners": [
      {
        "name": "Quaquaval",
        "winRate": 51.3,
        "games": 5449
      },
      {
        "name": "Mega Delphox",
        "winRate": 50.4,
        "games": 10811
      },
      {
        "name": "Kingambit",
        "winRate": 50.4,
        "games": 10811
      },
      {
        "name": "Drampa",
        "winRate": 50.4,
        "games": 10811
      },
      {
        "name": "Empoleon",
        "winRate": 50.1,
        "games": 5437
      }
    ],
    "bestSets": []
  },
  "478-mega": {
    "id": 478,
    "name": "Mega Froslass",
    "isMega": true,
    "elo": 9784,
    "winRate": 54.3,
    "appearances": 15075,
    "wins": 8187,
    "losses": 6888,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 58.3,
        "games": 4674
      },
      {
        "name": "Meowscarada",
        "winRate": 58.3,
        "games": 4674
      },
      {
        "name": "Garchomp",
        "winRate": 58.3,
        "games": 4674
      },
      {
        "name": "Greninja",
        "winRate": 56.7,
        "games": 9671
      },
      {
        "name": "Lucario",
        "winRate": 56.7,
        "games": 9671
      }
    ],
    "bestSets": []
  },
  "428-mega": {
    "id": 428,
    "name": "Mega Lopunny",
    "isMega": true,
    "elo": 9779,
    "winRate": 50,
    "appearances": 16645,
    "wins": 8323,
    "losses": 8322,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 5448
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.4,
        "games": 5448
      },
      {
        "name": "Hatterene",
        "winRate": 50.2,
        "games": 5716
      },
      {
        "name": "Dragapult",
        "winRate": 50.2,
        "games": 5716
      },
      {
        "name": "Rotom",
        "winRate": 50.2,
        "games": 5716
      }
    ],
    "bestSets": []
  },
  "130-mega": {
    "id": 130,
    "name": "Mega Gyarados",
    "isMega": true,
    "elo": 9778,
    "winRate": 50.4,
    "appearances": 228789,
    "wins": 115387,
    "losses": 113402,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 66.8,
        "games": 3934
      },
      {
        "name": "Corviknight",
        "winRate": 58.7,
        "games": 4660
      },
      {
        "name": "Slowbro",
        "winRate": 57.1,
        "games": 9341
      },
      {
        "name": "Gliscor",
        "winRate": 54.1,
        "games": 10067
      },
      {
        "name": "Pawmot",
        "winRate": 54,
        "games": 4965
      }
    ],
    "bestSets": []
  },
  "36-mega": {
    "id": 36,
    "name": "Mega Clefable",
    "isMega": true,
    "elo": 9763,
    "winRate": 62.4,
    "appearances": 13098,
    "wins": 8177,
    "losses": 4921,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 67.5,
        "games": 3946
      },
      {
        "name": "Kingambit",
        "winRate": 67.5,
        "games": 3946
      },
      {
        "name": "Metagross",
        "winRate": 67.5,
        "games": 3946
      },
      {
        "name": "Archaludon",
        "winRate": 67.2,
        "games": 8027
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 66.9,
        "games": 4081
      }
    ],
    "bestSets": []
  },
  "248-mega": {
    "id": 248,
    "name": "Mega Tyranitar",
    "isMega": true,
    "elo": 9761,
    "winRate": 50.4,
    "appearances": 322913,
    "wins": 162752,
    "losses": 160161,
    "bestPartners": [
      {
        "name": "Corviknight",
        "winRate": 51.8,
        "games": 5517
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 51.1,
        "games": 10913
      },
      {
        "name": "Excadrill",
        "winRate": 50.6,
        "games": 179626
      },
      {
        "name": "Dragapult",
        "winRate": 50.6,
        "games": 123263
      },
      {
        "name": "Sylveon",
        "winRate": 50.6,
        "games": 5565
      }
    ],
    "bestSets": []
  },
  "229-mega": {
    "id": 229,
    "name": "Mega Houndoom",
    "isMega": true,
    "elo": 9759,
    "winRate": 50.2,
    "appearances": 16717,
    "wins": 8389,
    "losses": 8328,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 5405
      },
      {
        "name": "Whimsicott",
        "winRate": 50.6,
        "games": 5405
      },
      {
        "name": "Dragapult",
        "winRate": 50.6,
        "games": 5405
      },
      {
        "name": "Dragonite",
        "winRate": 50.6,
        "games": 5405
      },
      {
        "name": "Gliscor",
        "winRate": 50.4,
        "games": 5678
      }
    ],
    "bestSets": []
  },
  "214-mega": {
    "id": 214,
    "name": "Mega Heracross",
    "isMega": true,
    "elo": 9756,
    "winRate": 53.9,
    "appearances": 15728,
    "wins": 8474,
    "losses": 7254,
    "bestPartners": [
      {
        "name": "Corviknight",
        "winRate": 58.6,
        "games": 4715
      },
      {
        "name": "Empoleon",
        "winRate": 58.6,
        "games": 4715
      },
      {
        "name": "Archaludon",
        "winRate": 58.6,
        "games": 4715
      },
      {
        "name": "Wash Rotom",
        "winRate": 56,
        "games": 9934
      },
      {
        "name": "Metagross",
        "winRate": 56,
        "games": 9934
      }
    ],
    "bestSets": []
  },
  "127-mega": {
    "id": 127,
    "name": "Mega Pinsir",
    "isMega": true,
    "elo": 9751,
    "winRate": 51.5,
    "appearances": 16020,
    "wins": 8249,
    "losses": 7771,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 56.2,
        "games": 4888
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.6,
        "games": 10391
      },
      {
        "name": "Archaludon",
        "winRate": 52.6,
        "games": 10391
      },
      {
        "name": "Metagross",
        "winRate": 52.6,
        "games": 10517
      },
      {
        "name": "Tyranitar",
        "winRate": 51.5,
        "games": 16020
      }
    ],
    "bestSets": []
  },
  "952-mega": {
    "id": 952,
    "name": "Mega Scovillain",
    "isMega": true,
    "elo": 9743,
    "winRate": 53.2,
    "appearances": 15418,
    "wins": 8208,
    "losses": 7210,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 61,
        "games": 4401
      },
      {
        "name": "Tyranitar",
        "winRate": 55,
        "games": 9763
      },
      {
        "name": "Kingambit",
        "winRate": 55,
        "games": 9763
      },
      {
        "name": "Aerodactyl",
        "winRate": 55,
        "games": 10056
      },
      {
        "name": "Corviknight",
        "winRate": 55,
        "games": 10056
      }
    ],
    "bestSets": []
  },
  "9-mega": {
    "id": 9,
    "name": "Mega Blastoise",
    "isMega": true,
    "elo": 9738,
    "winRate": 50.1,
    "appearances": 44017,
    "wins": 22031,
    "losses": 21986,
    "bestPartners": [
      {
        "name": "Greninja",
        "winRate": 51.5,
        "games": 5545
      },
      {
        "name": "Samurott",
        "winRate": 51.5,
        "games": 5545
      },
      {
        "name": "Feraligatr",
        "winRate": 51.5,
        "games": 5545
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 11082
      },
      {
        "name": "Hydreigon",
        "winRate": 50.2,
        "games": 5597
      }
    ],
    "bestSets": []
  },
  "26-mega-x": {
    "id": 26,
    "name": "Mega Raichu X",
    "isMega": true,
    "elo": 9733,
    "winRate": 47.6,
    "appearances": 15833,
    "wins": 7543,
    "losses": 8290,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 5479
      },
      {
        "name": "Incineroar",
        "winRate": 50.9,
        "games": 5479
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.9,
        "games": 5479
      },
      {
        "name": "Arcanine",
        "winRate": 49.2,
        "games": 10858
      },
      {
        "name": "Corviknight",
        "winRate": 47.6,
        "games": 15833
      }
    ],
    "bestSets": []
  },
  "121-mega": {
    "id": 121,
    "name": "Mega Starmie",
    "isMega": true,
    "elo": 9732,
    "winRate": 54.1,
    "appearances": 15405,
    "wins": 8329,
    "losses": 7076,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 58.1,
        "games": 4683
      },
      {
        "name": "Kommo-o",
        "winRate": 58.1,
        "games": 4683
      },
      {
        "name": "Torkoal",
        "winRate": 58.1,
        "games": 4683
      },
      {
        "name": "Scizor",
        "winRate": 56,
        "games": 9718
      },
      {
        "name": "Drampa",
        "winRate": 54.1,
        "games": 10370
      }
    ],
    "bestSets": []
  },
  "6-mega-x": {
    "id": 6,
    "name": "Mega Charizard X",
    "isMega": true,
    "elo": 9728,
    "winRate": 56.3,
    "appearances": 14531,
    "wins": 8182,
    "losses": 6349,
    "bestPartners": [
      {
        "name": "Kommo-o",
        "winRate": 67.1,
        "games": 3855
      },
      {
        "name": "Archaludon",
        "winRate": 59.7,
        "games": 9086
      },
      {
        "name": "Hydreigon",
        "winRate": 59.7,
        "games": 9086
      },
      {
        "name": "Whimsicott",
        "winRate": 57.5,
        "games": 9300
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 57.5,
        "games": 9300
      }
    ],
    "bestSets": []
  },
  "142-mega": {
    "id": 142,
    "name": "Mega Aerodactyl",
    "isMega": true,
    "elo": 9718,
    "winRate": 48.2,
    "appearances": 16144,
    "wins": 7781,
    "losses": 8363,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.7,
        "games": 5432
      },
      {
        "name": "Empoleon",
        "winRate": 49.5,
        "games": 11071
      },
      {
        "name": "Feraligatr",
        "winRate": 49.5,
        "games": 11071
      },
      {
        "name": "Mow Rotom",
        "winRate": 49.3,
        "games": 5639
      },
      {
        "name": "Meganium",
        "winRate": 48.2,
        "games": 16144
      }
    ],
    "bestSets": []
  },
  "3-mega": {
    "id": 3,
    "name": "Mega Venusaur",
    "isMega": true,
    "elo": 9717,
    "winRate": 53.9,
    "appearances": 15269,
    "wins": 8237,
    "losses": 7032,
    "bestPartners": [
      {
        "name": "Greninja",
        "winRate": 57.5,
        "games": 4790
      },
      {
        "name": "Incineroar",
        "winRate": 57.5,
        "games": 4790
      },
      {
        "name": "Feraligatr",
        "winRate": 56.6,
        "games": 9697
      },
      {
        "name": "Tyranitar",
        "winRate": 56.6,
        "games": 9697
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 55.8,
        "games": 4907
      }
    ],
    "bestSets": []
  },
  "282-mega": {
    "id": 282,
    "name": "Mega Gardevoir",
    "isMega": true,
    "elo": 9716,
    "winRate": 50,
    "appearances": 431302,
    "wins": 215513,
    "losses": 215789,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 51.2,
        "games": 11097
      },
      {
        "name": "Torkoal",
        "winRate": 50.8,
        "games": 16882
      },
      {
        "name": "Venusaur",
        "winRate": 50.8,
        "games": 16882
      },
      {
        "name": "Whimsicott",
        "winRate": 50.5,
        "games": 194493
      },
      {
        "name": "Aegislash",
        "winRate": 50.4,
        "games": 66828
      }
    ],
    "bestSets": []
  },
  "978-mega": {
    "id": 978,
    "name": "Mega Tatsugiri",
    "isMega": true,
    "elo": 9716,
    "winRate": 50,
    "appearances": 16601,
    "wins": 8300,
    "losses": 8301,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 50.3,
        "games": 5616
      },
      {
        "name": "Excadrill",
        "winRate": 50.3,
        "games": 5616
      },
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 5616
      },
      {
        "name": "Klefki",
        "winRate": 50.2,
        "games": 5411
      },
      {
        "name": "Corviknight",
        "winRate": 50.2,
        "games": 11027
      }
    ],
    "bestSets": []
  },
  "445-mega-z": {
    "id": 445,
    "name": "Mega Garchomp Z",
    "isMega": true,
    "elo": 9716,
    "winRate": 50.3,
    "appearances": 16595,
    "wins": 8353,
    "losses": 8242,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 51.3,
        "games": 5474
      },
      {
        "name": "Azumarill",
        "winRate": 51.3,
        "games": 5474
      },
      {
        "name": "Corviknight",
        "winRate": 50.7,
        "games": 11099
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.7,
        "games": 11099
      },
      {
        "name": "Scizor",
        "winRate": 50.5,
        "games": 10970
      }
    ],
    "bestSets": []
  },
  "65-mega": {
    "id": 65,
    "name": "Mega Alakazam",
    "isMega": true,
    "elo": 9713,
    "winRate": 52.5,
    "appearances": 21219,
    "wins": 11134,
    "losses": 10085,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 61,
        "games": 4397
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 55.3,
        "games": 10043
      },
      {
        "name": "Greninja",
        "winRate": 55.3,
        "games": 10043
      },
      {
        "name": "Conkeldurr",
        "winRate": 55.1,
        "games": 10025
      },
      {
        "name": "Azumarill",
        "winRate": 53.1,
        "games": 15573
      }
    ],
    "bestSets": []
  },
  "500-mega": {
    "id": 500,
    "name": "Mega Emboar",
    "isMega": true,
    "elo": 9711,
    "winRate": 46.8,
    "appearances": 15032,
    "wins": 7030,
    "losses": 8002,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 52.2,
        "games": 5380
      },
      {
        "name": "Alolan Raichu",
        "winRate": 52.2,
        "games": 5380
      },
      {
        "name": "Whimsicott",
        "winRate": 51.1,
        "games": 10781
      },
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 5401
      },
      {
        "name": "Greninja",
        "winRate": 49.9,
        "games": 5401
      }
    ],
    "bestSets": []
  },
  "71-mega": {
    "id": 71,
    "name": "Mega Victreebel",
    "isMega": true,
    "elo": 9711,
    "winRate": 50.1,
    "appearances": 16610,
    "wins": 8324,
    "losses": 8286,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 11099
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.2,
        "games": 11099
      },
      {
        "name": "Slowbro",
        "winRate": 50.2,
        "games": 5657
      },
      {
        "name": "Blastoise",
        "winRate": 50.1,
        "games": 16610
      },
      {
        "name": "Empoleon",
        "winRate": 50.1,
        "games": 10953
      }
    ],
    "bestSets": []
  },
  "652-mega": {
    "id": 652,
    "name": "Mega Chesnaught",
    "isMega": true,
    "elo": 9711,
    "winRate": 54.5,
    "appearances": 14949,
    "wins": 8151,
    "losses": 6798,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 66.4,
        "games": 3878
      },
      {
        "name": "Greninja",
        "winRate": 66.4,
        "games": 3878
      },
      {
        "name": "Gengar",
        "winRate": 66.4,
        "games": 3878
      },
      {
        "name": "Charizard",
        "winRate": 57.8,
        "games": 9299
      },
      {
        "name": "Metagross",
        "winRate": 54.5,
        "games": 14949
      }
    ],
    "bestSets": []
  },
  "448-mega": {
    "id": 448,
    "name": "Mega Lucario",
    "isMega": true,
    "elo": 9710,
    "winRate": 49.5,
    "appearances": 38447,
    "wins": 19040,
    "losses": 19407,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 50.6,
        "games": 5587
      },
      {
        "name": "Kingambit",
        "winRate": 50.6,
        "games": 5587
      },
      {
        "name": "Greninja",
        "winRate": 50.3,
        "games": 11036
      },
      {
        "name": "Aerodactyl",
        "winRate": 50.2,
        "games": 10821
      },
      {
        "name": "Charizard",
        "winRate": 50.2,
        "games": 10821
      }
    ],
    "bestSets": []
  },
  "26-mega-y": {
    "id": 26,
    "name": "Mega Raichu Y",
    "isMega": true,
    "elo": 9705,
    "winRate": 50.2,
    "appearances": 16714,
    "wins": 8385,
    "losses": 8329,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.6,
        "games": 11104
      },
      {
        "name": "Arcanine",
        "winRate": 50.6,
        "games": 5455
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.6,
        "games": 5455
      },
      {
        "name": "Charizard",
        "winRate": 50.5,
        "games": 5649
      },
      {
        "name": "Meganium",
        "winRate": 50.5,
        "games": 5649
      }
    ],
    "bestSets": []
  },
  "460-mega": {
    "id": 460,
    "name": "Mega Abomasnow",
    "isMega": true,
    "elo": 9704,
    "winRate": 51,
    "appearances": 16034,
    "wins": 8174,
    "losses": 7860,
    "bestPartners": [
      {
        "name": "Talonflame",
        "winRate": 53.4,
        "games": 5301
      },
      {
        "name": "Archaludon",
        "winRate": 53.4,
        "games": 5301
      },
      {
        "name": "Ninetales",
        "winRate": 53.4,
        "games": 5301
      },
      {
        "name": "Arcanine",
        "winRate": 51.7,
        "games": 10599
      },
      {
        "name": "Gyarados",
        "winRate": 51,
        "games": 16034
      }
    ],
    "bestSets": []
  },
  "970-mega": {
    "id": 970,
    "name": "Mega Glimmora",
    "isMega": true,
    "elo": 9702,
    "winRate": 49.8,
    "appearances": 16484,
    "wins": 8203,
    "losses": 8281,
    "bestPartners": [
      {
        "name": "Abomasnow",
        "winRate": 50,
        "games": 5383
      },
      {
        "name": "Pelipper",
        "winRate": 50,
        "games": 5383
      },
      {
        "name": "Wash Rotom",
        "winRate": 50,
        "games": 5383
      },
      {
        "name": "Whimsicott",
        "winRate": 49.8,
        "games": 10980
      },
      {
        "name": "Scizor",
        "winRate": 49.8,
        "games": 16484
      }
    ],
    "bestSets": []
  },
  "445-mega": {
    "id": 445,
    "name": "Mega Garchomp",
    "isMega": true,
    "elo": 9701,
    "winRate": 51.8,
    "appearances": 21717,
    "wins": 11244,
    "losses": 10473,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 54.6,
        "games": 5106
      },
      {
        "name": "Whimsicott",
        "winRate": 54.6,
        "games": 5106
      },
      {
        "name": "Dragapult",
        "winRate": 54.6,
        "games": 5106
      },
      {
        "name": "Gardevoir",
        "winRate": 54.6,
        "games": 5106
      },
      {
        "name": "Kingambit",
        "winRate": 52.1,
        "games": 16173
      }
    ],
    "bestSets": []
  },
  "149-mega": {
    "id": 149,
    "name": "Mega Dragonite",
    "isMega": true,
    "elo": 9697,
    "winRate": 49.4,
    "appearances": 66484,
    "wins": 32874,
    "losses": 33610,
    "bestPartners": [
      {
        "name": "Drampa",
        "winRate": 50.8,
        "games": 5674
      },
      {
        "name": "Clefable",
        "winRate": 50.6,
        "games": 11016
      },
      {
        "name": "Tyranitar",
        "winRate": 50.6,
        "games": 11016
      },
      {
        "name": "Metagross",
        "winRate": 50.5,
        "games": 11378
      },
      {
        "name": "Hatterene",
        "winRate": 50.3,
        "games": 5342
      }
    ],
    "bestSets": []
  },
  "530-mega": {
    "id": 530,
    "name": "Mega Excadrill",
    "isMega": true,
    "elo": 9696,
    "winRate": 50.7,
    "appearances": 16914,
    "wins": 8578,
    "losses": 8336,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 50.9,
        "games": 5673
      },
      {
        "name": "Toxapex",
        "winRate": 50.9,
        "games": 5673
      },
      {
        "name": "Greninja",
        "winRate": 50.9,
        "games": 5673
      },
      {
        "name": "Altaria",
        "winRate": 50.8,
        "games": 11339
      },
      {
        "name": "Dragapult",
        "winRate": 50.7,
        "games": 11248
      }
    ],
    "bestSets": []
  },
  "115-mega": {
    "id": 115,
    "name": "Mega Kangaskhan",
    "isMega": true,
    "elo": 9693,
    "winRate": 49.5,
    "appearances": 163221,
    "wins": 80849,
    "losses": 82372,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 51,
        "games": 5507
      },
      {
        "name": "Scizor",
        "winRate": 50.9,
        "games": 11164
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.1,
        "games": 5476
      },
      {
        "name": "Mimikyu",
        "winRate": 50,
        "games": 11103
      },
      {
        "name": "Arcanine",
        "winRate": 50,
        "games": 11103
      }
    ],
    "bestSets": []
  },
  "658-mega": {
    "id": 658,
    "name": "Mega Greninja",
    "isMega": true,
    "elo": 9691,
    "winRate": 51.4,
    "appearances": 16089,
    "wins": 8275,
    "losses": 7814,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 52.6,
        "games": 5335
      },
      {
        "name": "Dragapult",
        "winRate": 52.6,
        "games": 5335
      },
      {
        "name": "Metagross",
        "winRate": 52.2,
        "games": 10690
      },
      {
        "name": "Victreebel",
        "winRate": 51.8,
        "games": 5355
      },
      {
        "name": "Charizard",
        "winRate": 51.8,
        "games": 5355
      }
    ],
    "bestSets": []
  },
  "154-mega": {
    "id": 154,
    "name": "Mega Meganium",
    "isMega": true,
    "elo": 9690,
    "winRate": 49.4,
    "appearances": 21969,
    "wins": 10851,
    "losses": 11118,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 50.3,
        "games": 5437
      },
      {
        "name": "Politoed",
        "winRate": 50.3,
        "games": 5437
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.2,
        "games": 5666
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.2,
        "games": 5666
      },
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 16620
      }
    ],
    "bestSets": []
  },
  "376-mega": {
    "id": 376,
    "name": "Mega Metagross",
    "isMega": true,
    "elo": 9685,
    "winRate": 50.3,
    "appearances": 313120,
    "wins": 157557,
    "losses": 155563,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 56.3,
        "games": 4946
      },
      {
        "name": "Hydreigon",
        "winRate": 53.3,
        "games": 10315
      },
      {
        "name": "Infernape",
        "winRate": 52.9,
        "games": 10426
      },
      {
        "name": "Greninja",
        "winRate": 51.5,
        "games": 54075
      },
      {
        "name": "Krookodile",
        "winRate": 51.3,
        "games": 26962
      }
    ],
    "bestSets": []
  },
  "15-mega": {
    "id": 15,
    "name": "Mega Beedrill",
    "isMega": true,
    "elo": 9683,
    "winRate": 48.1,
    "appearances": 15803,
    "wins": 7600,
    "losses": 8203,
    "bestPartners": [
      {
        "name": "Excadrill",
        "winRate": 50.8,
        "games": 5563
      },
      {
        "name": "Wash Rotom",
        "winRate": 49.2,
        "games": 10776
      },
      {
        "name": "Incineroar",
        "winRate": 48.4,
        "games": 10590
      },
      {
        "name": "Garchomp",
        "winRate": 48.4,
        "games": 10590
      },
      {
        "name": "Greninja",
        "winRate": 48.1,
        "games": 15803
      }
    ],
    "bestSets": []
  },
  "655-mega": {
    "id": 655,
    "name": "Mega Delphox",
    "isMega": true,
    "elo": 9680,
    "winRate": 51.5,
    "appearances": 15953,
    "wins": 8217,
    "losses": 7736,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 53.8,
        "games": 5142
      },
      {
        "name": "Greninja",
        "winRate": 53.8,
        "games": 5142
      },
      {
        "name": "Gyarados",
        "winRate": 51.6,
        "games": 10504
      },
      {
        "name": "Kingambit",
        "winRate": 51.5,
        "games": 15953
      },
      {
        "name": "Drampa",
        "winRate": 51.5,
        "games": 15953
      }
    ],
    "bestSets": []
  },
  "6-mega-y": {
    "id": 6,
    "name": "Mega Charizard Y",
    "isMega": true,
    "elo": 9676,
    "winRate": 50.9,
    "appearances": 27262,
    "wins": 13866,
    "losses": 13396,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 55.7,
        "games": 4942
      },
      {
        "name": "Archaludon",
        "winRate": 52.9,
        "games": 10606
      },
      {
        "name": "Garchomp",
        "winRate": 52.9,
        "games": 10606
      },
      {
        "name": "Excadrill",
        "winRate": 51.3,
        "games": 16083
      },
      {
        "name": "Krookodile",
        "winRate": 51.1,
        "games": 21711
      }
    ],
    "bestSets": []
  },
  "208-mega": {
    "id": 208,
    "name": "Mega Steelix",
    "isMega": true,
    "elo": 9675,
    "winRate": 49.8,
    "appearances": 16646,
    "wins": 8292,
    "losses": 8354,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 50.1,
        "games": 11209
      },
      {
        "name": "Blastoise",
        "winRate": 50.1,
        "games": 5446
      },
      {
        "name": "Slowbro",
        "winRate": 50.1,
        "games": 5446
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 5446
      },
      {
        "name": "Altaria",
        "winRate": 50.1,
        "games": 5763
      }
    ],
    "bestSets": []
  },
  "227-mega": {
    "id": 227,
    "name": "Mega Skarmory",
    "isMega": true,
    "elo": 9674,
    "winRate": 50.2,
    "appearances": 22211,
    "wins": 11147,
    "losses": 11064,
    "bestPartners": [
      {
        "name": "Greninja",
        "winRate": 51,
        "games": 5572
      },
      {
        "name": "Heat Rotom",
        "winRate": 51,
        "games": 5572
      },
      {
        "name": "Garchomp",
        "winRate": 50.5,
        "games": 16715
      },
      {
        "name": "Kommo-o",
        "winRate": 50.4,
        "games": 5608
      },
      {
        "name": "Hydreigon",
        "winRate": 50.4,
        "games": 5608
      }
    ],
    "bestSets": []
  },
  "306-mega": {
    "id": 306,
    "name": "Mega Aggron",
    "isMega": true,
    "elo": 9671,
    "winRate": 47.5,
    "appearances": 20633,
    "wins": 9800,
    "losses": 10833,
    "bestPartners": [
      {
        "name": "Dragonite",
        "winRate": 50.4,
        "games": 5346
      },
      {
        "name": "Whimsicott",
        "winRate": 50.4,
        "games": 5346
      },
      {
        "name": "Dragapult",
        "winRate": 50,
        "games": 10818
      },
      {
        "name": "Meganium",
        "winRate": 49.6,
        "games": 5472
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 49.6,
        "games": 5472
      }
    ],
    "bestSets": []
  },
  "80-mega": {
    "id": 80,
    "name": "Mega Slowbro",
    "isMega": true,
    "elo": 9669,
    "winRate": 50.2,
    "appearances": 16509,
    "wins": 8286,
    "losses": 8223,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 51.8,
        "games": 5503
      },
      {
        "name": "Ursaluna",
        "winRate": 51.8,
        "games": 5503
      },
      {
        "name": "Meowscarada",
        "winRate": 51.8,
        "games": 5503
      },
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 10861
      },
      {
        "name": "Infernape",
        "winRate": 50.5,
        "games": 11151
      }
    ],
    "bestSets": []
  },
  "160-mega": {
    "id": 160,
    "name": "Mega Feraligatr",
    "isMega": true,
    "elo": 9662,
    "winRate": 49.4,
    "appearances": 21869,
    "wins": 10811,
    "losses": 11058,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.5,
        "games": 5470
      },
      {
        "name": "Incineroar",
        "winRate": 50.3,
        "games": 10837
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.1,
        "games": 5367
      },
      {
        "name": "Garchomp",
        "winRate": 50.1,
        "games": 5367
      },
      {
        "name": "Kingambit",
        "winRate": 50.1,
        "games": 5367
      }
    ],
    "bestSets": []
  },
  "780-mega": {
    "id": 780,
    "name": "Mega Drampa",
    "isMega": true,
    "elo": 9658,
    "winRate": 50.2,
    "appearances": 16822,
    "wins": 8439,
    "losses": 8383,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 5725
      },
      {
        "name": "Aegislash",
        "winRate": 50.5,
        "games": 11233
      },
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 16822
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.2,
        "games": 16822
      },
      {
        "name": "Talonflame",
        "winRate": 50.2,
        "games": 11314
      }
    ],
    "bestSets": []
  },
  "212-mega": {
    "id": 212,
    "name": "Mega Scizor",
    "isMega": true,
    "elo": 9657,
    "winRate": 52,
    "appearances": 37388,
    "wins": 19439,
    "losses": 17949,
    "bestPartners": [
      {
        "name": "Gardevoir",
        "winRate": 59.3,
        "games": 4674
      },
      {
        "name": "Hatterene",
        "winRate": 59.3,
        "games": 4674
      },
      {
        "name": "Hydreigon",
        "winRate": 58,
        "games": 4585
      },
      {
        "name": "Aegislash",
        "winRate": 58,
        "games": 4585
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 54.3,
        "games": 10166
      }
    ],
    "bestSets": []
  },
  "678-mega": {
    "id": 678,
    "name": "Mega Meowstic",
    "isMega": true,
    "elo": 9656,
    "winRate": 49.8,
    "appearances": 16349,
    "wins": 8137,
    "losses": 8212,
    "bestPartners": [
      {
        "name": "Lucario",
        "winRate": 50,
        "games": 10690
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50,
        "games": 10690
      },
      {
        "name": "Greninja",
        "winRate": 50,
        "games": 10690
      },
      {
        "name": "Kingambit",
        "winRate": 49.8,
        "games": 10972
      },
      {
        "name": "Krookodile",
        "winRate": 49.8,
        "games": 10972
      }
    ],
    "bestSets": []
  },
  "740-mega": {
    "id": 740,
    "name": "Mega Crabominable",
    "isMega": true,
    "elo": 9655,
    "winRate": 45.6,
    "appearances": 15238,
    "wins": 6945,
    "losses": 8293,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 5341
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.8,
        "games": 5341
      },
      {
        "name": "Charizard",
        "winRate": 49.8,
        "games": 5341
      },
      {
        "name": "Incineroar",
        "winRate": 49.1,
        "games": 10867
      },
      {
        "name": "Starmie",
        "winRate": 48.5,
        "games": 5526
      }
    ],
    "bestSets": []
  },
  "359-mega-z": {
    "id": 359,
    "name": "Mega Absol Z",
    "isMega": true,
    "elo": 9654,
    "winRate": 50.5,
    "appearances": 17051,
    "wins": 8611,
    "losses": 8440,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 5531
      },
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 5531
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.7,
        "games": 5531
      },
      {
        "name": "Dragapult",
        "winRate": 50.7,
        "games": 5531
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.6,
        "games": 11211
      }
    ],
    "bestSets": []
  },
  "359-mega": {
    "id": 359,
    "name": "Mega Absol",
    "isMega": true,
    "elo": 9652,
    "winRate": 49.8,
    "appearances": 16656,
    "wins": 8296,
    "losses": 8360,
    "bestPartners": [
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.9,
        "games": 5694
      },
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 11268
      },
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 11268
      },
      {
        "name": "Ceruledge",
        "winRate": 50.5,
        "games": 5574
      },
      {
        "name": "Dragapult",
        "winRate": 49.8,
        "games": 16656
      }
    ],
    "bestSets": []
  },
  "181-mega": {
    "id": 181,
    "name": "Mega Ampharos",
    "isMega": true,
    "elo": 9650,
    "winRate": 50,
    "appearances": 16786,
    "wins": 8386,
    "losses": 8400,
    "bestPartners": [
      {
        "name": "Aerodactyl",
        "winRate": 50.7,
        "games": 5692
      },
      {
        "name": "Charizard",
        "winRate": 50,
        "games": 16786
      },
      {
        "name": "Incineroar",
        "winRate": 50,
        "games": 11347
      },
      {
        "name": "Arcanine",
        "winRate": 50,
        "games": 11347
      },
      {
        "name": "Whimsicott",
        "winRate": 50,
        "games": 11347
      }
    ],
    "bestSets": []
  },
  "334-mega": {
    "id": 334,
    "name": "Mega Altaria",
    "isMega": true,
    "elo": 9647,
    "winRate": 45.1,
    "appearances": 14480,
    "wins": 6524,
    "losses": 7956,
    "bestPartners": [
      {
        "name": "Orthworm",
        "winRate": 53,
        "games": 5224
      },
      {
        "name": "Scizor",
        "winRate": 53,
        "games": 5224
      },
      {
        "name": "Lucario",
        "winRate": 53,
        "games": 5224
      },
      {
        "name": "Metagross",
        "winRate": 53,
        "games": 5224
      },
      {
        "name": "Kingambit",
        "winRate": 49.4,
        "games": 10433
      }
    ],
    "bestSets": []
  },
  "475-mega": {
    "id": 475,
    "name": "Mega Gallade",
    "isMega": true,
    "elo": 9644,
    "winRate": 49.2,
    "appearances": 16524,
    "wins": 8137,
    "losses": 8387,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.1,
        "games": 5698
      },
      {
        "name": "Kingambit",
        "winRate": 50.1,
        "games": 5698
      },
      {
        "name": "Steelix",
        "winRate": 50.1,
        "games": 5698
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 49.8,
        "games": 11052
      },
      {
        "name": "Aegislash",
        "winRate": 49.4,
        "games": 5354
      }
    ],
    "bestSets": []
  },
  "701-mega": {
    "id": 701,
    "name": "Mega Hawlucha",
    "isMega": true,
    "elo": 9630,
    "winRate": 49.2,
    "appearances": 16228,
    "wins": 7979,
    "losses": 8249,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 51.7,
        "games": 5470
      },
      {
        "name": "Wash Rotom",
        "winRate": 51.7,
        "games": 5470
      },
      {
        "name": "Kingambit",
        "winRate": 50.5,
        "games": 11072
      },
      {
        "name": "Tyranitar",
        "winRate": 49.3,
        "games": 5602
      },
      {
        "name": "Excadrill",
        "winRate": 49.2,
        "games": 16228
      }
    ],
    "bestSets": []
  },
  "302-mega": {
    "id": 302,
    "name": "Mega Sableye",
    "isMega": true,
    "elo": 9620,
    "winRate": 40.1,
    "appearances": 36481,
    "wins": 14636,
    "losses": 21845,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 49.9,
        "games": 5409
      },
      {
        "name": "Charizard",
        "winRate": 47.7,
        "games": 10428
      },
      {
        "name": "Mimikyu",
        "winRate": 47.5,
        "games": 5275
      },
      {
        "name": "Azumarill",
        "winRate": 47.5,
        "games": 5275
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 46.8,
        "games": 5175
      }
    ],
    "bestSets": []
  },
  "94-mega": {
    "id": 94,
    "name": "Mega Gengar",
    "isMega": true,
    "elo": 9619,
    "winRate": 47.8,
    "appearances": 31430,
    "wins": 15036,
    "losses": 16394,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 53.5,
        "games": 5173
      },
      {
        "name": "Hydreigon",
        "winRate": 53.5,
        "games": 5173
      },
      {
        "name": "Greninja",
        "winRate": 51.4,
        "games": 10790
      },
      {
        "name": "Tyranitar",
        "winRate": 51.4,
        "games": 10790
      },
      {
        "name": "Corviknight",
        "winRate": 50.7,
        "games": 5782
      }
    ],
    "bestSets": []
  },
  "448-mega-z": {
    "id": 448,
    "name": "Mega Lucario Z",
    "isMega": true,
    "elo": 9607,
    "winRate": 49.8,
    "appearances": 16299,
    "wins": 8112,
    "losses": 8187,
    "bestPartners": [
      {
        "name": "Gliscor",
        "winRate": 50.9,
        "games": 5696
      },
      {
        "name": "Fan Rotom",
        "winRate": 50.9,
        "games": 5696
      },
      {
        "name": "Charizard",
        "winRate": 50.5,
        "games": 5362
      },
      {
        "name": "Emolga",
        "winRate": 50.5,
        "games": 5362
      },
      {
        "name": "Pelipper",
        "winRate": 50.5,
        "games": 5362
      }
    ],
    "bestSets": []
  },
  "531-mega": {
    "id": 531,
    "name": "Mega Audino",
    "isMega": true,
    "elo": 9599,
    "winRate": 48.8,
    "appearances": 16277,
    "wins": 7950,
    "losses": 8327,
    "bestPartners": [
      {
        "name": "Toxapex",
        "winRate": 50.1,
        "games": 5504
      },
      {
        "name": "Azumarill",
        "winRate": 50.1,
        "games": 5504
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.1,
        "games": 5504
      },
      {
        "name": "Gengar",
        "winRate": 50.1,
        "games": 5504
      },
      {
        "name": "Slowking",
        "winRate": 49.2,
        "games": 5523
      }
    ],
    "bestSets": []
  }
};

/** Best core pairs from simulation */
export const SIM_PAIRS: SimPairData[] = [
  {
    "pokemon1": "Mega Clefable",
    "pokemon2": "Incineroar",
    "winRate": 67.5,
    "games": 3946
  },
  {
    "pokemon1": "Mega Clefable",
    "pokemon2": "Kingambit",
    "winRate": 67.5,
    "games": 3946
  },
  {
    "pokemon1": "Mega Clefable",
    "pokemon2": "Metagross",
    "winRate": 67.5,
    "games": 3946
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Mega Clefable",
    "winRate": 67.2,
    "games": 8027
  },
  {
    "pokemon1": "Mega Charizard X",
    "pokemon2": "Kommo-o",
    "winRate": 67.1,
    "games": 3855
  },
  {
    "pokemon1": "Hydreigon",
    "pokemon2": "Galarian Stunfisk",
    "winRate": 67.1,
    "games": 3855
  },
  {
    "pokemon1": "Mega Clefable",
    "pokemon2": "Hisuian Arcanine",
    "winRate": 66.9,
    "games": 4081
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Gyarados",
    "winRate": 66.8,
    "games": 3934
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Slowbro",
    "winRate": 66.8,
    "games": 3934
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Slowbro",
    "winRate": 66.8,
    "games": 3934
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Chesnaught",
    "winRate": 66.4,
    "games": 3878
  },
  {
    "pokemon1": "Mega Chesnaught",
    "pokemon2": "Greninja",
    "winRate": 66.4,
    "games": 3878
  },
  {
    "pokemon1": "Mega Chesnaught",
    "pokemon2": "Gengar",
    "winRate": 66.4,
    "games": 3878
  },
  {
    "pokemon1": "Excadrill",
    "pokemon2": "Charizard",
    "winRate": 64.7,
    "games": 8206
  },
  {
    "pokemon1": "Charizard",
    "pokemon2": "Hydreigon",
    "winRate": 64.7,
    "games": 8206
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Hisuian Arcanine",
    "winRate": 63.5,
    "games": 8461
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Aegislash",
    "winRate": 63.5,
    "games": 8461
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Archaludon",
    "winRate": 63.5,
    "games": 8314
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Gengar",
    "winRate": 63,
    "games": 12671
  },
  {
    "pokemon1": "Scizor",
    "pokemon2": "Mega Clefable",
    "winRate": 62.4,
    "games": 13098
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Empoleon",
    "winRate": 62.4,
    "games": 8796
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Scizor",
    "winRate": 62.2,
    "games": 21741
  },
  {
    "pokemon1": "Torkoal",
    "pokemon2": "Scovillain",
    "winRate": 61.8,
    "games": 4379
  },
  {
    "pokemon1": "Torkoal",
    "pokemon2": "Leafeon",
    "winRate": 61.8,
    "games": 4379
  },
  {
    "pokemon1": "Torkoal",
    "pokemon2": "Ninetales",
    "winRate": 61.8,
    "games": 4379
  },
  {
    "pokemon1": "Torkoal",
    "pokemon2": "Charizard",
    "winRate": 61.8,
    "games": 4379
  },
  {
    "pokemon1": "Charizard",
    "pokemon2": "Chesnaught",
    "winRate": 61.6,
    "games": 8793
  },
  {
    "pokemon1": "Metagross",
    "pokemon2": "Chesnaught",
    "winRate": 61.6,
    "games": 8793
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Chesnaught",
    "winRate": 61.6,
    "games": 8793
  },
  {
    "pokemon1": "Chesnaught",
    "pokemon2": "Greninja",
    "winRate": 61.6,
    "games": 8793
  },
  {
    "pokemon1": "Chesnaught",
    "pokemon2": "Gengar",
    "winRate": 61.6,
    "games": 8793
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Alcremie",
    "winRate": 61,
    "games": 4475
  },
  {
    "pokemon1": "Rotom",
    "pokemon2": "Alcremie",
    "winRate": 61,
    "games": 4475
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Rotom",
    "winRate": 61,
    "games": 4475
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Mega Scovillain",
    "winRate": 61,
    "games": 4401
  },
  {
    "pokemon1": "Hydreigon",
    "pokemon2": "Mega Alakazam",
    "winRate": 61,
    "games": 4397
  },
  {
    "pokemon1": "Hisuian Arcanine",
    "pokemon2": "Hydreigon",
    "winRate": 61,
    "games": 4397
  },
  {
    "pokemon1": "Conkeldurr",
    "pokemon2": "Hydreigon",
    "winRate": 61,
    "games": 4397
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Hydreigon",
    "winRate": 60.6,
    "games": 22234
  },
  {
    "pokemon1": "Aerodactyl",
    "pokemon2": "Tyranitar",
    "winRate": 60.6,
    "games": 13437
  },
  {
    "pokemon1": "Aerodactyl",
    "pokemon2": "Kingambit",
    "winRate": 60.6,
    "games": 13437
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Aerodactyl",
    "winRate": 60.6,
    "games": 13437
  },
  {
    "pokemon1": "Tyranitar",
    "pokemon2": "Corviknight",
    "winRate": 60.6,
    "games": 13437
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Sandaconda",
    "winRate": 60.5,
    "games": 4647
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Sandaconda",
    "winRate": 60.5,
    "games": 4647
  },
  {
    "pokemon1": "Clawitzer",
    "pokemon2": "Sandaconda",
    "winRate": 60.5,
    "games": 4647
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Samurott",
    "winRate": 60.5,
    "games": 4647
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Samurott",
    "winRate": 60.5,
    "games": 4647
  },
  {
    "pokemon1": "Samurott",
    "pokemon2": "Clawitzer",
    "winRate": 60.5,
    "games": 4647
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Milotic",
    "winRate": 60.5,
    "games": 4647
  }
];

/** Archetype rankings from simulation */
export const SIM_ARCHETYPES: SimArchetypeData[] = [
  {
    "name": "Mega Clefable",
    "elo": 27548,
    "winRate": 62.4,
    "wins": 8177,
    "losses": 4921
  },
  {
    "name": "Charizard Base",
    "elo": 20796,
    "winRate": 64.7,
    "wins": 5309,
    "losses": 2897
  },
  {
    "name": "Mega Charizard",
    "elo": 19468,
    "winRate": 53.7,
    "wins": 16430,
    "losses": 14184
  },
  {
    "name": "Chesnaught Base",
    "elo": 17764,
    "winRate": 61.6,
    "wins": 5413,
    "losses": 3380
  },
  {
    "name": "Sand",
    "elo": 17660,
    "winRate": 50.5,
    "wins": 112448,
    "losses": 110428
  },
  {
    "name": "Scovillain Base",
    "elo": 16620,
    "winRate": 60.5,
    "wins": 5463,
    "losses": 3573
  },
  {
    "name": "Clefable Base",
    "elo": 14052,
    "winRate": 58.5,
    "wins": 5404,
    "losses": 3835
  },
  {
    "name": "Tailwind",
    "elo": 13780,
    "winRate": 50.5,
    "wins": 76017,
    "losses": 74482
  },
  {
    "name": "Hard Trick Room",
    "elo": 13476,
    "winRate": 55,
    "wins": 8189,
    "losses": 6692
  },
  {
    "name": "Pinsir Base",
    "elo": 13092,
    "winRate": 57.6,
    "wins": 5481,
    "losses": 4032
  },
  {
    "name": "Mega Chesnaught",
    "elo": 12324,
    "winRate": 54.5,
    "wins": 8151,
    "losses": 6798
  },
  {
    "name": "Mega Froslass",
    "elo": 11892,
    "winRate": 54.3,
    "wins": 8187,
    "losses": 6888
  },
  {
    "name": "Alcremie Build",
    "elo": 11676,
    "winRate": 54.3,
    "wins": 8080,
    "losses": 6808
  },
  {
    "name": "Mega Starmie",
    "elo": 11524,
    "winRate": 54.1,
    "wins": 8329,
    "losses": 7076
  },
  {
    "name": "Mega Heracross",
    "elo": 11260,
    "winRate": 53.9,
    "wins": 8474,
    "losses": 7254
  },
  {
    "name": "Mega Venusaur",
    "elo": 11140,
    "winRate": 53.9,
    "wins": 8237,
    "losses": 7032
  },
  {
    "name": "Mega Alakazam",
    "elo": 10340,
    "winRate": 53.5,
    "wins": 8388,
    "losses": 7283
  },
  {
    "name": "Sun Hyper Offense",
    "elo": 9780,
    "winRate": 61.8,
    "wins": 2707,
    "losses": 1672
  },
  {
    "name": "Hyper Offense",
    "elo": 9596,
    "winRate": 51,
    "wins": 25024,
    "losses": 24012
  },
  {
    "name": "Mega Scovillain",
    "elo": 9484,
    "winRate": 53.2,
    "wins": 8208,
    "losses": 7210
  },
  {
    "name": "Sandaconda Build",
    "elo": 9372,
    "winRate": 53.1,
    "wins": 8464,
    "losses": 7480
  },
  {
    "name": "Toucannon Build",
    "elo": 9292,
    "winRate": 53.1,
    "wins": 8285,
    "losses": 7311
  },
  {
    "name": "Sun Trick Room",
    "elo": 8628,
    "winRate": 50.5,
    "wins": 48204,
    "losses": 47313
  },
  {
    "name": "Pivot Chain",
    "elo": 8444,
    "winRate": 59.3,
    "wins": 2771,
    "losses": 1903
  },
  {
    "name": "Tsareena Build",
    "elo": 7972,
    "winRate": 52.5,
    "wins": 8362,
    "losses": 7553
  },
  {
    "name": "Beat Up",
    "elo": 7900,
    "winRate": 58.7,
    "wins": 2706,
    "losses": 1906
  },
  {
    "name": "Offense",
    "elo": 7332,
    "winRate": 52.3,
    "wins": 8283,
    "losses": 7554
  },
  {
    "name": "Kleavor Build",
    "elo": 7300,
    "winRate": 52.2,
    "wins": 8519,
    "losses": 7794
  },
  {
    "name": "Dragon Spam",
    "elo": 7012,
    "winRate": 57.3,
    "wins": 2707,
    "losses": 2018
  },
  {
    "name": "Metagross Core",
    "elo": 6748,
    "winRate": 52.1,
    "wins": 8156,
    "losses": 7500
  },
  {
    "name": "Standard",
    "elo": 6676,
    "winRate": 50.2,
    "wins": 96694,
    "losses": 96047
  },
  {
    "name": "Heracross Base",
    "elo": 6116,
    "winRate": 52.7,
    "wins": 5692,
    "losses": 5115
  },
  {
    "name": "Mega Delphox",
    "elo": 5348,
    "winRate": 51.5,
    "wins": 8217,
    "losses": 7736
  },
  {
    "name": "Ampharos Base",
    "elo": 5332,
    "winRate": 52.2,
    "wins": 5704,
    "losses": 5225
  },
  {
    "name": "Mega Pinsir",
    "elo": 5324,
    "winRate": 51.5,
    "wins": 8249,
    "losses": 7771
  },
  {
    "name": "Mega Greninja",
    "elo": 5188,
    "winRate": 51.4,
    "wins": 8275,
    "losses": 7814
  },
  {
    "name": "Aurora Veil",
    "elo": 5084,
    "winRate": 54.5,
    "wins": 2716,
    "losses": 2268
  },
  {
    "name": "Sun",
    "elo": 5012,
    "winRate": 50.5,
    "wins": 22901,
    "losses": 22462
  },
  {
    "name": "Mega Garchomp",
    "elo": 4828,
    "winRate": 50.6,
    "wins": 16811,
    "losses": 16395
  },
  {
    "name": "Tailwind Offense",
    "elo": 4788,
    "winRate": 50.9,
    "wins": 11041,
    "losses": 10630
  },
  {
    "name": "Balance",
    "elo": 4300,
    "winRate": 50.8,
    "wins": 11145,
    "losses": 10795
  },
  {
    "name": "Blastoise Base",
    "elo": 4204,
    "winRate": 51.5,
    "wins": 5652,
    "losses": 5314
  },
  {
    "name": "Mega Abomasnow",
    "elo": 4012,
    "winRate": 51,
    "wins": 8174,
    "losses": 7860
  },
  {
    "name": "Sand Rush",
    "elo": 3740,
    "winRate": 50.4,
    "wins": 17032,
    "losses": 16752
  },
  {
    "name": "Steel Stall",
    "elo": 3684,
    "winRate": 52.6,
    "wins": 2803,
    "losses": 2530
  },
  {
    "name": "Mega Gyarados",
    "elo": 3668,
    "winRate": 50.8,
    "wins": 8225,
    "losses": 7954
  },
  {
    "name": "Slowbro Trick Room",
    "elo": 3644,
    "winRate": 50.8,
    "wins": 8275,
    "losses": 8007
  },
  {
    "name": "Bulky Offense",
    "elo": 3604,
    "winRate": 50.5,
    "wins": 14230,
    "losses": 13967
  },
  {
    "name": "Mega Excadrill",
    "elo": 3436,
    "winRate": 50.7,
    "wins": 8578,
    "losses": 8336
  },
  {
    "name": "Mega Metagross",
    "elo": 3220,
    "winRate": 50.1,
    "wins": 58593,
    "losses": 58378
  }
];

/** Top moves by win rate from simulation */
export const SIM_MOVES: SimMoveData[] = [
  {
    "name": "Beat Up",
    "winRate": 58.7,
    "appearances": 4612
  },
  {
    "name": "Electro Shot",
    "winRate": 56,
    "appearances": 171267
  },
  {
    "name": "Decorate",
    "winRate": 54.3,
    "appearances": 14888
  },
  {
    "name": "Curse",
    "winRate": 54,
    "appearances": 25613
  },
  {
    "name": "Pin Missile",
    "winRate": 53.9,
    "appearances": 15728
  },
  {
    "name": "Rock Blast",
    "winRate": 53.5,
    "appearances": 31324
  },
  {
    "name": "Spiky Shield",
    "winRate": 53.2,
    "appearances": 24661
  },
  {
    "name": "Bullet Seed",
    "winRate": 53.1,
    "appearances": 15596
  },
  {
    "name": "Beak Blast",
    "winRate": 53.1,
    "appearances": 15596
  },
  {
    "name": "Grass Knot",
    "winRate": 53,
    "appearances": 15586
  },
  {
    "name": "High Horsepower",
    "winRate": 52.9,
    "appearances": 41524
  },
  {
    "name": "Wood Hammer",
    "winRate": 52.8,
    "appearances": 56241
  },
  {
    "name": "Megahorn",
    "winRate": 52.7,
    "appearances": 10807
  },
  {
    "name": "Body Press",
    "winRate": 52.5,
    "appearances": 384100
  },
  {
    "name": "Stone Axe",
    "winRate": 52.2,
    "appearances": 16313
  },
  {
    "name": "Coil",
    "winRate": 52,
    "appearances": 32255
  },
  {
    "name": "Trick",
    "winRate": 51.8,
    "appearances": 10704
  },
  {
    "name": "Flash Cannon",
    "winRate": 51.7,
    "appearances": 949678
  },
  {
    "name": "Overheat",
    "winRate": 51.7,
    "appearances": 461420
  },
  {
    "name": "Fire Punch",
    "winRate": 51.7,
    "appearances": 42893
  },
  {
    "name": "Taunt",
    "winRate": 51.7,
    "appearances": 56517
  },
  {
    "name": "Sacred Sword",
    "winRate": 51.5,
    "appearances": 64459
  },
  {
    "name": "Bullet Punch",
    "winRate": 51.4,
    "appearances": 823323
  },
  {
    "name": "Fire Fang",
    "winRate": 51.3,
    "appearances": 123885
  },
  {
    "name": "Ceaseless Edge",
    "winRate": 51.3,
    "appearances": 31850
  },
  {
    "name": "Razor Shell",
    "winRate": 51.3,
    "appearances": 31850
  },
  {
    "name": "Energy Ball",
    "winRate": 51.3,
    "appearances": 99241
  },
  {
    "name": "Bug Bite",
    "winRate": 51.2,
    "appearances": 449793
  },
  {
    "name": "Superpower",
    "winRate": 51.2,
    "appearances": 384284
  },
  {
    "name": "Solar Beam",
    "winRate": 51.2,
    "appearances": 385348
  },
  {
    "name": "X-Scissor",
    "winRate": 51.2,
    "appearances": 72925
  },
  {
    "name": "Dark Pulse",
    "winRate": 51.1,
    "appearances": 671047
  },
  {
    "name": "Quick Attack",
    "winRate": 51.1,
    "appearances": 58660
  },
  {
    "name": "Eruption",
    "winRate": 51,
    "appearances": 219187
  },
  {
    "name": "Meteor Mash",
    "winRate": 51,
    "appearances": 31883
  },
  {
    "name": "Clanging Scales",
    "winRate": 51,
    "appearances": 75278
  },
  {
    "name": "Ice Shard",
    "winRate": 51,
    "appearances": 16034
  },
  {
    "name": "U-turn",
    "winRate": 50.9,
    "appearances": 408892
  },
  {
    "name": "Hydro Pump",
    "winRate": 50.9,
    "appearances": 663612
  },
  {
    "name": "Zen Headbutt",
    "winRate": 50.9,
    "appearances": 678029
  },
  {
    "name": "Heat Wave",
    "winRate": 50.9,
    "appearances": 678159
  },
  {
    "name": "Belly Drum",
    "winRate": 50.8,
    "appearances": 284946
  },
  {
    "name": "Kowtow Cleave",
    "winRate": 50.8,
    "appearances": 782983
  },
  {
    "name": "Earth Power",
    "winRate": 50.8,
    "appearances": 473303
  },
  {
    "name": "Air Slash",
    "winRate": 50.8,
    "appearances": 346999
  },
  {
    "name": "Discharge",
    "winRate": 50.8,
    "appearances": 27159
  },
  {
    "name": "Hidden Power Ground",
    "winRate": 50.8,
    "appearances": 5641
  },
  {
    "name": "Whirlwind",
    "winRate": 50.8,
    "appearances": 5741
  },
  {
    "name": "Ice Beam",
    "winRate": 50.7,
    "appearances": 912986
  },
  {
    "name": "Draco Meteor",
    "winRate": 50.7,
    "appearances": 586284
  }
];

/** Meta tier snapshot from simulation */
export const SIM_META: SimMetaSnapshot = {
  "tier1": [
    "Decidueye",
    "Politoed",
    "Aerodactyl",
    "Mega Froslass",
    "Scizor",
    "Alcremie",
    "Mega Lopunny",
    "Scovillain",
    "Mega Gyarados",
    "Archaludon",
    "Mow Rotom",
    "Dragonite",
    "Mega Clefable",
    "Clefable",
    "Mega Tyranitar",
    "Mega Houndoom",
    "Gourgeist",
    "Rotom"
  ],
  "tier2": [
    "Mega Heracross",
    "Vaporeon",
    "Golurk",
    "Mega Pinsir",
    "Primarina",
    "Mimikyu",
    "Froslass",
    "Mega Scovillain",
    "Stunfisk",
    "Mega Blastoise",
    "Sinistcha",
    "Orthworm",
    "Gyarados",
    "Mega Raichu X",
    "Palafin",
    "Metagross",
    "Mega Starmie",
    "Gardevoir",
    "Noivern",
    "Lucario",
    "Skarmory",
    "Clawitzer",
    "Mega Charizard X",
    "Houndoom",
    "Glaceon",
    "Runerigus",
    "Snorlax",
    "Excadrill",
    "Kingambit",
    "Alakazam",
    "Klefki",
    "Greninja",
    "Mega Aerodactyl",
    "Hisuian Typhlosion",
    "Empoleon",
    "Mega Venusaur"
  ],
  "tier3": [
    "Mega Gardevoir",
    "Chesnaught",
    "Mega Tatsugiri",
    "Mega Garchomp Z",
    "Sylveon",
    "Altaria",
    "Hisuian Samurott",
    "Heracross",
    "Wash Rotom",
    "Raichu",
    "Victreebel",
    "Mega Alakazam",
    "Alolan Raichu",
    "Frost Rotom",
    "Mega Emboar",
    "Mega Victreebel",
    "Mega Chesnaught",
    "Starmie",
    "Mega Lucario",
    "Hatterene",
    "Corviknight",
    "Blastoise",
    "Hisuian Decidueye",
    "Emboar",
    "Steelix",
    "Gliscor",
    "Mega Raichu Y",
    "Alolan Ninetales",
    "Quaquaval",
    "Mega Abomasnow",
    "Galarian Stunfisk",
    "Kangaskhan",
    "Dondozo",
    "Mega Glimmora",
    "Leafeon",
    "Hydreigon",
    "Araquanid",
    "Mega Garchomp",
    "Meowscarada",
    "Mudsdale",
    "Sandaconda",
    "Aegislash",
    "Hippowdon",
    "Tyranitar",
    "Mega Dragonite",
    "Meganium",
    "Mega Excadrill",
    "Emolga",
    "Incineroar",
    "Slowbro",
    "Pawmot",
    "Mr. Rime",
    "Ursaluna",
    "Mega Kangaskhan",
    "Ninetales",
    "Gengar",
    "Tinkaton",
    "Vanilluxe",
    "Mega Greninja",
    "Feraligatr",
    "Kleavor",
    "Pinsir",
    "Mega Meganium",
    "Arcanine"
  ],
  "dominantArchetypes": [
    "Mega Clefable",
    "Charizard Base",
    "Mega Charizard",
    "Chesnaught Base",
    "Sand"
  ],
  "underratedPokemon": [],
  "overratedPokemon": [
    "Meowstic",
    "Beedrill",
    "Galarian Slowbro",
    "Mega Sableye",
    "Espeon"
  ],
  "bestCores": [
    "Mega Clefable + Incineroar",
    "Mega Clefable + Kingambit",
    "Mega Clefable + Metagross",
    "Archaludon + Mega Clefable",
    "Mega Charizard X + Kommo-o"
  ]
};

/** Total battles simulated */
export const SIM_TOTAL_BATTLES = 2000000;

/** Simulation date */
export const SIM_DATE = "2026-03-27T22:19:04.276Z";
