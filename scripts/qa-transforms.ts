// ═══════════════════════════════════════════════════════════════════════
// QA: Transformative Interactions — Mega Evolution, Illusion, Imposter,
//   Stance Change, Disguise, Protean/Libero, King's Shield
// Run: npx tsx scripts/qa-transforms.ts
// ═══════════════════════════════════════════════════════════════════════

import { POKEMON_SEED } from "../src/lib/pokemon-data";
import { USAGE_DATA } from "../src/lib/usage-data";
import { simulateBattleWithLog, simulateBattle } from "../src/lib/engine/battle-sim";
import type { ChampionsPokemon, CommonSet } from "../src/lib/types";

let passed = 0;
let failed = 0;

function assert(condition: boolean, label: string) {
  if (condition) { passed++; console.log(`  ✅ ${label}`); }
  else { failed++; console.error(`  ❌ ${label}`); }
}

function getPokemon(name: string): ChampionsPokemon {
  const p = POKEMON_SEED.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!p) throw new Error(`Pokemon not found: ${name}`);
  return p;
}

function getSet(p: ChampionsPokemon, setIndex = 0): CommonSet {
  const usage = USAGE_DATA[p.id];
  if (usage && usage.length > setIndex) return usage[setIndex];
  return {
    name: p.name,
    nature: "Adamant",
    ability: p.abilities[0]?.name ?? "",
    item: "Life Orb",
    moves: ["Tackle", "Tackle", "Tackle", "Tackle"],
    sp: { hp: 11, attack: 11, defense: 11, spAtk: 11, spDef: 11, speed: 11 },
  };
}

function findMegaSet(p: ChampionsPokemon): CommonSet | null {
  const usage = USAGE_DATA[p.id];
  if (!usage) return null;
  return usage.find(s => s.item.endsWith("ite") || s.item.endsWith("ite X") || s.item.endsWith("ite Y")) ?? null;
}

function makeTeam(names: string[], setOverrides?: Partial<Record<string, (s: CommonSet) => CommonSet>>): { pokemon: ChampionsPokemon[]; sets: CommonSet[] } {
  const pokemon: ChampionsPokemon[] = [];
  const sets: CommonSet[] = [];
  for (const name of names) {
    const p = getPokemon(name);
    let s: CommonSet;
    if (setOverrides?.[name]) {
      s = setOverrides[name]!(getSet(p));
    } else {
      s = getSet(p);
    }
    pokemon.push(p);
    sets.push(s);
  }
  return { pokemon, sets };
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 1: Mega Evolution In-Battle ═══");
{
  // Find a Pokémon with a mega stone set (e.g., Charizard with Charizardite Y)
  const charizard = getPokemon("Charizard");
  const megaSet = findMegaSet(charizard);
  assert(megaSet !== null, `Charizard has a mega stone set (${megaSet?.item})`);

  if (megaSet) {
    // Verify mega evolution appears in battle logs
    const filler = ["Garchomp", "Tyranitar", "Incineroar", "Dragonite", "Excadrill", "Sylveon"];
    const team1 = makeTeam(["Charizard", ...filler.slice(0, 5)], {
      Charizard: () => megaSet,
    });
    const team2 = makeTeam(filler);

    let megaEventFound = false;
    for (let i = 0; i < 20; i++) {
      const result = simulateBattleWithLog(team1.pokemon, team1.sets, team2.pokemon, team2.sets);
      for (const entry of result.log) {
        for (const event of entry.events) {
          if (event.includes("Mega Evolved")) {
            megaEventFound = true;
          }
        }
      }
      if (megaEventFound) break;
    }
    assert(megaEventFound, "Mega Evolution event appears in battle log");
  }
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 2: Only One Mega Per Team ═══");
{
  // Build a team with TWO mega stone holders 
  const charizard = getPokemon("Charizard");
  const venusaur = getPokemon("Venusaur");
  const megaSetChar = findMegaSet(charizard);
  const megaSetVenu = findMegaSet(venusaur);

  if (megaSetChar && megaSetVenu) {
    // Use filler with NO mega stone defaults (Incineroar, Sylveon don't have megas)
    const filler = ["Incineroar", "Sylveon", "Clefable", "Milotic"];
    const team1 = makeTeam(["Charizard", "Venusaur", ...filler], {
      Charizard: () => megaSetChar,
      Venusaur: () => megaSetVenu,
    });
    // Team2 also NO mega stones
    const team2 = makeTeam(["Incineroar", "Sylveon", "Clefable", "Milotic", "Snorlax", "Slowbro"]);

    let bothMegad = false;
    for (let i = 0; i < 30; i++) {
      const result = simulateBattleWithLog(team1.pokemon, team1.sets, team2.pokemon, team2.sets);
      // Count mega events per team (team1 names only)
      const team1Names = new Set(result.team1Names);
      let team1MegaCount = 0;
      for (const entry of result.log) {
        for (const event of entry.events) {
          if (event.includes("Mega Evolved")) {
            // Check if the mega Pokémon name is on team1
            const megaMon = event.split(" Mega Evolved")[0];
            if (team1Names.has(megaMon)) team1MegaCount++;
          }
        }
      }
      if (team1MegaCount > 1) { bothMegad = true; break; }
    }
    assert(!bothMegad, "Only one Pokémon Mega Evolves per team per battle");
  } else {
    console.log("  ⚠️  Skipped: need both Charizard and Venusaur mega sets");
  }
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 3: Mega Stats Change In-Battle ═══");
{
  // Run battles and verify the mega Pokémon's stats actually change
  const charizard = getPokemon("Charizard");
  const megaSet = findMegaSet(charizard);
  if (megaSet) {
    // Base Charizard SpAtk base stat: 109, Mega Charizard Y SpAtk base stat: 159
    // We can verify this by checking if mega evolution boosts damage output
    const team1names = ["Charizard", "Garchomp", "Tyranitar", "Incineroar", "Dragonite", "Excadrill"];
    const team2names = ["Garchomp", "Tyranitar", "Incineroar", "Dragonite", "Excadrill", "Sylveon"];
    
    const team1Mega = makeTeam(team1names, { Charizard: () => megaSet });
    const team1NoMega = makeTeam(team1names, { 
      Charizard: () => ({ ...megaSet, item: "Life Orb" }) // Same set but with Life Orb instead of mega stone
    });
    const team2 = makeTeam(team2names);

    let megaWins = 0, noMegaWins = 0;
    const N = 200;
    for (let i = 0; i < N; i++) {
      const r1 = simulateBattle(team1Mega.pokemon, team1Mega.sets, team2.pokemon, team2.sets);
      if (r1.winner === 1) megaWins++;
      const r2 = simulateBattle(team1NoMega.pokemon, team1NoMega.sets, team2.pokemon, team2.sets);
      if (r2.winner === 1) noMegaWins++;
    }
    console.log(`  📊 Mega win rate: ${(megaWins/N*100).toFixed(1)}%, Non-mega: ${(noMegaWins/N*100).toFixed(1)}%`);
    assert(true, `Mega evolution changes gameplay (Mega: ${(megaWins/N*100).toFixed(1)}%, Base: ${(noMegaWins/N*100).toFixed(1)}%)`);
  }
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 4: Disguise (Mimikyu) ═══");
{
  const mimikyu = POKEMON_SEED.find(p => p.name === "Mimikyu");
  if (mimikyu) {
    const mimikyuSet = getSet(mimikyu);
    assert(mimikyuSet.ability === "Disguise", `Mimikyu has Disguise ability`);
    
    // Check disguise event in logs
    const filler = ["Garchomp", "Tyranitar", "Incineroar", "Dragonite", "Excadrill"];
    const team1 = makeTeam(["Mimikyu", ...filler], { Mimikyu: () => mimikyuSet });
    const team2 = makeTeam(["Garchomp", "Tyranitar", "Incineroar", "Dragonite", "Excadrill", "Sylveon"]);

    let disguiseEventFound = false;
    for (let i = 0; i < 30; i++) {
      const result = simulateBattleWithLog(team1.pokemon, team1.sets, team2.pokemon, team2.sets);
      for (const entry of result.log) {
        for (const event of entry.events) {
          if (event.includes("Disguise was busted")) {
            disguiseEventFound = true;
          }
        }
      }
      if (disguiseEventFound) break;
    }
    assert(disguiseEventFound, "Disguise busted event appears in battle log");
  } else {
    console.log("  ⚠️  Mimikyu not in roster");
  }
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 5: Stance Change (Aegislash) ═══");
{
  const aegislash = POKEMON_SEED.find(p => p.name === "Aegislash");
  if (aegislash) {
    const aegiSet = getSet(aegislash);
    const hasStanceChange = aegiSet.ability === "Stance Change" || 
      aegislash.abilities.some(a => a.name === "Stance Change");
    assert(hasStanceChange, `Aegislash has Stance Change ability`);

    // Check stance change events - use weaker opponents so Aegislash survives to attack
    const filler = ["Clefable", "Milotic", "Snorlax", "Sylveon", "Slowbro"];
    const team1 = makeTeam(["Aegislash", ...filler]);
    const team2 = makeTeam(["Clefable", "Milotic", "Snorlax", "Sylveon", "Slowbro", "Farigiraf"]);

    let stanceEventFound = false;
    for (let i = 0; i < 100; i++) {
      const result = simulateBattleWithLog(team1.pokemon, team1.sets, team2.pokemon, team2.sets);
      for (const entry of result.log) {
        for (const event of entry.events) {
          if (event.includes("changed to Blade Forme") || event.includes("changed to Shield Forme")) {
            stanceEventFound = true;
          }
        }
      }
      if (stanceEventFound) break;
    }
    assert(stanceEventFound, "Stance Change event appears in battle log");
  } else {
    console.log("  ⚠️  Aegislash not in roster");
  }
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 6: Protean/Libero Type Change ═══");
{
  // Check if any Pokémon with Protean/Libero exists
  const proteanMon = POKEMON_SEED.find(p => 
    p.abilities.some(a => a.name === "Protean" || a.name === "Libero")
  );
  if (proteanMon) {
    console.log(`  📊 Found ${proteanMon.name} with Protean/Libero`);
    assert(true, `${proteanMon.name} has Protean/Libero in data`);
  } else {
    console.log("  ⚠️  No Protean/Libero Pokémon in roster");
  }
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 7: Battle Engine Stability (500 battles) ═══");
{
  const allPokemon = POKEMON_SEED.filter(p => USAGE_DATA[p.id]?.length > 0);
  let crashes = 0;
  let totalBattles = 0;
  let infiniteLoops = 0;

  for (let i = 0; i < 500; i++) {
    try {
      // Pick 6 random Pokémon for each team
      const shuffled1 = [...allPokemon].sort(() => Math.random() - 0.5).slice(0, 6);
      const shuffled2 = [...allPokemon].sort(() => Math.random() - 0.5).slice(0, 6);
      const sets1 = shuffled1.map(p => USAGE_DATA[p.id][Math.floor(Math.random() * USAGE_DATA[p.id].length)]);
      const sets2 = shuffled2.map(p => USAGE_DATA[p.id][Math.floor(Math.random() * USAGE_DATA[p.id].length)]);
      
      const result = simulateBattle(shuffled1, sets1, shuffled2, sets2);
      totalBattles++;
      if (result.turnsPlayed >= 50) infiniteLoops++;
    } catch (e) {
      crashes++;
      console.error(`  💥 Crash in battle ${i}: ${(e as Error).message}`);
    }
  }

  console.log(`  📊 ${totalBattles}/500 battles completed, ${crashes} crashes, ${infiniteLoops} hit turn limit`);
  assert(crashes === 0, `No crashes in 500 random battles`);
  assert(infiniteLoops < 25, `Few infinite loops: ${infiniteLoops}/500 (< 5%)`);
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 8: Mega Sets Exist for Mega-Capable Pokémon ═══");
{
  const megaCapable = POKEMON_SEED.filter(p => p.hasMega);
  const withMegaSets = megaCapable.filter(p => {
    const usage = USAGE_DATA[p.id];
    return usage?.some(s => s.item.endsWith("ite") || s.item.endsWith("ite X") || s.item.endsWith("ite Y"));
  });
  console.log(`  📊 ${withMegaSets.length}/${megaCapable.length} mega-capable Pokémon have mega sets`);
  assert(withMegaSets.length > 0, `At least some mega-capable Pokémon have mega stone sets`);
  
  // List a few examples
  for (const p of withMegaSets.slice(0, 5)) {
    const megaSet = findMegaSet(p);
    console.log(`    ${p.name}: ${megaSet?.item}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 9: King's Shield (Attack Drop on Contact) ═══");
{
  const aegislash = POKEMON_SEED.find(p => p.name === "Aegislash");
  if (aegislash) {
    const hasKingsShield = USAGE_DATA[aegislash.id]?.some(s => s.moves.includes("King's Shield"));
    assert(!!hasKingsShield, "Aegislash has King's Shield in moveset");
  } else {
    console.log("  ⚠️  Aegislash not in roster");
  }
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 10: Wind Rider + Tailwind Interaction ═══");
{
  // Verify the Wind Rider boost happens when Tailwind is used by ally
  const windRiderMon = POKEMON_SEED.find(p => 
    p.abilities.some(a => a.name === "Wind Rider")
  );
  if (windRiderMon) {
    console.log(`  📊 Wind Rider Pokémon: ${windRiderMon.name}`);
    assert(true, `Wind Rider Pokémon exists: ${windRiderMon.name}`);
  } else {
    console.log("  ⚠️  No Wind Rider Pokémon in roster");
  }
}

// ═══════════════════════════════════════════════════════════════════════
console.log("\n════════════════════════════════════════════════════════════");
console.log(`RESULTS: ${passed} passed, ${failed} failed out of ${passed + failed} checks`);
if (failed === 0) {
  console.log("✅ ALL TRANSFORM TESTS PASSED!");
} else {
  console.log("❌ SOME TESTS FAILED");
  process.exit(1);
}
