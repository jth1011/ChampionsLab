import { POKEMON_SEED } from "../src/lib/pokemon-data";
import { WINNING_TEAMS } from "../src/lib/winning-teams";

const megaMap = new Map<number, string[]>();
POKEMON_SEED.filter(p => p.hasMega).forEach(p => {
  const formNames = p.forms?.filter(f => f.isMega).map(f => f.name) || [];
  megaMap.set(p.id, formNames);
});

// For each team, determine which member is the mega based on team name
const megaTeams: Array<{ teamId: string; teamName: string; megaId: number; megaName: string }> = [];
const unmatchedTeams: string[] = [];

for (const team of WINNING_TEAMS) {
  const nameLower = team.name.toLowerCase();
  if (nameLower.indexOf("mega") === -1) continue;

  let megaMember = null;
  for (const m of team.pokemon) {
    if (megaMap.has(m.pokemonId)) {
      const lowerName = m.name.toLowerCase();
      if (nameLower.indexOf(lowerName) !== -1) {
        megaMember = m;
        break;
      }
    }
  }

  if (megaMember) {
    megaTeams.push({ teamId: team.id, teamName: team.name, megaId: megaMember.pokemonId, megaName: megaMember.name });
  } else {
    unmatchedTeams.push(`${team.id}: "${team.name}"`);
  }
}

console.log("=== TEAMS WITH IDENTIFIED MEGA ===");
megaTeams.forEach(t => console.log(`${t.teamId}: "${t.teamName}" => MEGA: ${t.megaName} (ID:${t.megaId})`));
console.log(`\nTotal: ${megaTeams.length}`);

if (unmatchedTeams.length > 0) {
  console.log("\n=== UNMATCHED (team says Mega but no member matches) ===");
  unmatchedTeams.forEach(t => console.log(t));
}

// Also check teams WITHOUT "mega" in name that might still have a mega
console.log("\n=== NON-MEGA-NAMED TEAMS WITH MEGA-CAPABLE POKEMON ===");
for (const team of WINNING_TEAMS) {
  const nameLower = team.name.toLowerCase();
  if (nameLower.indexOf("mega") !== -1) continue;
  const megaMembers = team.pokemon.filter(m => megaMap.has(m.pokemonId));
  if (megaMembers.length > 0) {
    console.log(`${team.id}: "${team.name}" has mega-capable: ${megaMembers.map(m => m.name).join(", ")}`);
  }
}
