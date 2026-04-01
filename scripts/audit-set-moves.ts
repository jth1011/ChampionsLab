/**
 * Audit: find moves used in competitive sets (USAGE_DATA) that are missing
 * from the Pokémon's movepool in POKEMON_SEED.
 */
import { POKEMON_SEED } from "../src/lib/pokemon-data";
import { USAGE_DATA } from "../src/lib/usage-data";

const pokemonById = new Map(POKEMON_SEED.map((p: any) => [p.id, p]));

interface Missing {
  pokemon: string;
  pokemonId: number;
  setName: string;
  move: string;
}

const missing: Missing[] = [];

for (const [pidStr, sets] of Object.entries(USAGE_DATA) as any[]) {
  const pokemonId = Number(pidStr);
  const pokemon = pokemonById.get(pokemonId);
  if (!pokemon) continue;

  const movepool = new Set(pokemon.moves.map((m: any) => m.name.toLowerCase()));

  for (const set of sets) {
    for (const move of set.moves) {
      if (!movepool.has(move.toLowerCase())) {
        missing.push({
          pokemon: pokemon.name,
          pokemonId,
          setName: set.name,
          move,
        });
      }
    }
  }
}

// Group by move
const byMove = new Map<string, Missing[]>();
for (const m of missing) {
  const arr = byMove.get(m.move) || [];
  arr.push(m);
  byMove.set(m.move, arr);
}

console.log(`\n=== MOVES IN SETS BUT MISSING FROM MOVEPOOL ===`);
console.log(`Total: ${missing.length} missing move references across ${byMove.size} unique moves\n`);

for (const [move, entries] of [...byMove.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${move} (${entries.length}x):`);
  for (const e of entries) {
    console.log(`    - ${e.pokemon} (${e.pokemonId}) in set "${e.setName}"`);
  }
}
