import { POKEMON_SEED } from "../src/lib/pokemon-data";

interface MegaEntry {
  id: number;
  name: string;
  formName: string;
  stats: Record<string, number>;
  bst: number;
  abilities: string[];
  types: string[];
  isChampions: boolean;
}

const megas: MegaEntry[] = [];

for (const p of POKEMON_SEED) {
  if (p.hasMega && p.forms) {
    for (const f of p.forms) {
      if (f.isMega) {
        const s = f.baseStats;
        megas.push({
          id: p.id,
          name: p.name,
          formName: f.name,
          stats: s,
          bst: s.hp + s.attack + s.defense + s.spAtk + s.spDef + s.speed,
          abilities: f.abilities.map((a: any) => a.name),
          types: f.types,
          isChampions: !!(f.abilities[0] as any)?.isChampions,
        });
      }
    }
  }
}

console.log("=== ALL MEGA POKEMON IN DATA ===\n");
for (const m of megas) {
  const tag = m.isChampions ? " [CHAMPIONS]" : "";
  console.log(`#${m.id} ${m.formName}${tag}`);
  console.log(`  Types: ${m.types.join("/")}`);
  console.log(`  Ability: ${m.abilities.join(", ")}`);
  console.log(`  HP:${m.stats.hp} Atk:${m.stats.attack} Def:${m.stats.defense} SpA:${m.stats.spAtk} SpD:${m.stats.spDef} Spe:${m.stats.speed} (BST:${m.bst})`);
  console.log();
}

console.log(`Total: ${megas.length} mega forms`);
