/**
 * Fix missing moves: adds moves referenced in USAGE_DATA sets
 * that are missing from the Pokémon's movepool in pokemon-data.ts.
 * Uses move-data.ts (engine) as the source of truth for move attributes.
 */
import { POKEMON_SEED } from "../src/lib/pokemon-data";
import { USAGE_DATA } from "../src/lib/usage-data";
import { MOVE_DATA } from "../src/lib/engine/move-data";
import * as fs from "fs";
import * as path from "path";

const pokemonById = new Map(POKEMON_SEED.map((p: any) => [p.id, p]));

// Build a map: pokemonId -> Set of missing move names
const missingByPokemon = new Map<number, Set<string>>();

for (const [pidStr, sets] of Object.entries(USAGE_DATA) as any[]) {
  const pokemonId = Number(pidStr);
  const pokemon = pokemonById.get(pokemonId);
  if (!pokemon) continue;

  const movepool = new Set(pokemon.moves.map((m: any) => m.name.toLowerCase()));

  for (const set of sets) {
    for (const move of set.moves) {
      if (!movepool.has(move.toLowerCase())) {
        if (!missingByPokemon.has(pokemonId)) missingByPokemon.set(pokemonId, new Set());
        missingByPokemon.get(pokemonId)!.add(move);
      }
    }
  }
}

// Read the pokemon-data.ts file
const filePath = path.join(__dirname, "..", "src", "lib", "pokemon-data.ts");
let content = fs.readFileSync(filePath, "utf-8");

let totalAdded = 0;
const changes: string[] = [];

for (const [pokemonId, moves] of missingByPokemon) {
  const pokemon = pokemonById.get(pokemonId)!;

  for (const moveName of moves) {
    // Look up move data from engine
    const engineMove = (MOVE_DATA as any)[moveName];
    if (!engineMove) {
      console.log(`  WARNING: ${moveName} not in engine MOVE_DATA, skipping`);
      continue;
    }

    // Build the JSON move entry
    const moveEntry = {
      name: moveName,
      type: engineMove.type,
      category: engineMove.category,
      power: engineMove.basePower || 0,
      accuracy: engineMove.accuracy || 0,
      pp: engineMove.pp || 5,
    };

    const moveJson = JSON.stringify(moveEntry, null, 8).replace(/\n/g, "\n      ");
    // We need to find this pokemon's moves array and append the new move
    // Strategy: find the pokemon by name, then find the closing ] of its moves array

    // Find pattern: "name": "PokemonName" (escaped)
    const nameEscaped = pokemon.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Find this pokemon's moves array - look for the pattern:
    // "name": "PokemonName" ... "moves": [ ... ]
    // We need to insert before the last ] of the moves array

    // Strategy: find "name": "PokemonName", then the next "moves": [, then the matching ]
    const nameRegex = new RegExp(`"name":\\s*"${nameEscaped}"`);
    const nameMatch = content.match(nameRegex);
    if (!nameMatch || nameMatch.index === undefined) {
      console.log(`  WARNING: Could not find "${pokemon.name}" in file`);
      continue;
    }

    // From the name position, find "moves": [
    const afterName = content.indexOf('"moves":', nameMatch.index);
    if (afterName === -1) {
      console.log(`  WARNING: No moves array for ${pokemon.name}`);
      continue;
    }

    // Find the opening [ of the moves array
    const movesArrayStart = content.indexOf("[", afterName);
    if (movesArrayStart === -1) continue;

    // Now find the matching ] - we need to count brackets
    let depth = 0;
    let movesArrayEnd = -1;
    for (let i = movesArrayStart; i < content.length; i++) {
      if (content[i] === "[") depth++;
      else if (content[i] === "]") {
        depth--;
        if (depth === 0) {
          movesArrayEnd = i;
          break;
        }
      }
    }

    if (movesArrayEnd === -1) {
      console.log(`  WARNING: Could not find end of moves array for ${pokemon.name}`);
      continue;
    }

    // Check if move already exists (case-insensitive) in this section of content
    const movesSection = content.substring(movesArrayStart, movesArrayEnd);
    if (movesSection.toLowerCase().includes(`"name": "${moveName.toLowerCase()}"`)) {
      continue; // Already exists
    }

    // Insert the new move before the closing ]
    // Look back from movesArrayEnd to find the last } (end of last move entry)
    const lastBrace = content.lastIndexOf("}", movesArrayEnd);
    if (lastBrace === -1 || lastBrace < movesArrayStart) continue;

    // Insert after the last move entry's }
    const insertPoint = lastBrace + 1;
    const newMoveStr = `,\n      ${moveJson}`;

    content = content.substring(0, insertPoint) + newMoveStr + content.substring(insertPoint);

    totalAdded++;
    changes.push(`  + ${pokemon.name}: ${moveName} (${engineMove.type}/${engineMove.category}/${engineMove.basePower || 0}bp)`);
  }
}

fs.writeFileSync(filePath, content);

console.log(`\nAdded ${totalAdded} moves to pokemon movepools:`);
for (const c of changes.sort()) {
  console.log(c);
}
