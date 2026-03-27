import * as fs from "fs";
import * as path from "path";

// These are the teams where the team name explicitly says "Mega [PokemonName]"
// and that pokemon is in the team. Each entry: [teamId, pokemonId]
const MEGA_MEMBERS: Array<[string, number]> = [
  ["t7", 448],   // Mega Lucario Offense => Lucario
  ["t8", 376],   // Mega Metagross Core => Metagross
  ["t11", 6],    // Mega Charizard Y Sun => Charizard
  ["t12", 149],  // Mega Dragonite Bulky => Dragonite
  ["t13", 115],  // Mega Kangaskhan Rush => Kangaskhan
  ["t15", 130],  // Mega Gyarados Setup => Gyarados
  ["t16", 212],  // Mega Scizor Pivot => Scizor
  ["t19", 334],  // Mega Altaria Fairy => Altaria
  ["t21", 229],  // Mega Houndoom Dark => Houndoom
  ["t22", 214],  // Mega Heracross Trick Room => Heracross
  ["t23", 94],   // Mega Gengar Trap => Gengar
  ["t25", 359],  // Mega Absol Anti-Meta => Absol
  ["t31", 71],   // Mega Victreebel Sun => Victreebel
  ["t32", 208],  // Mega Steelix Sand => Steelix
  ["e1", 15],    // Mega Beedrill HO => Beedrill
  ["e6", 65],    // Mega Alakazam Offense => Alakazam
  ["e9", 127],   // Mega Pinsir HO => Pinsir
  ["e15", 181],  // Mega Ampharos TR => Ampharos
  ["e21", 306],  // Mega Aggron Tank => Aggron
  ["e29", 428],  // Mega Lopunny HO => Lopunny
  ["e32", 460],  // Mega Abomasnow Hail => Abomasnow
  ["e36", 475],  // Mega Gallade Offense => Gallade
];

const filePath = path.join(__dirname, "../src/lib/winning-teams.ts");
let content = fs.readFileSync(filePath, "utf-8");

let count = 0;

for (const [teamId, pokemonId] of MEGA_MEMBERS) {
  // Find the team block by id, then within it find the pokemonId and add isMega: true
  // Pattern: within the team block for `id: "teamId"`, find `pokemonId: NUM, name: "..."}`
  // and replace with `pokemonId: NUM, name: "...", isMega: true}`
  
  // Find the team block
  const teamIdPattern = `id: "${teamId}"`;
  const teamIdx = content.indexOf(teamIdPattern);
  if (teamIdx === -1) {
    console.log(`WARNING: Team ${teamId} not found`);
    continue;
  }
  
  // Find the next team block or end of array to limit our search
  const nextTeamIdx = content.indexOf('\n  {', teamIdx + 1);
  const teamBlock = nextTeamIdx === -1 ? content.slice(teamIdx) : content.slice(teamIdx, nextTeamIdx);
  
  // Find the pokemon member with the right ID
  const memberPattern = `pokemonId: ${pokemonId}, name:`;
  const memberIdx = teamBlock.indexOf(memberPattern);
  if (memberIdx === -1) {
    console.log(`WARNING: Pokemon ${pokemonId} not found in team ${teamId}`);
    continue;
  }
  
  // Find the closing brace of this member object
  const absIdx = teamIdx + memberIdx;
  const closeBrace = content.indexOf('}', absIdx);
  if (closeBrace === -1) {
    console.log(`WARNING: No closing brace for pokemon ${pokemonId} in team ${teamId}`);
    continue;
  }
  
  // Check if isMega already exists
  const memberSlice = content.slice(absIdx, closeBrace);
  if (memberSlice.indexOf('isMega') !== -1) {
    console.log(`SKIP: Pokemon ${pokemonId} in team ${teamId} already has isMega`);
    continue;
  }
  
  // Insert `, isMega: true` before the closing brace
  // The member looks like: { pokemonId: 448, name: "Lucario" }
  // We want:              { pokemonId: 448, name: "Lucario", isMega: true }
  content = content.slice(0, closeBrace) + ', isMega: true' + content.slice(closeBrace);
  count++;
  console.log(`OK: Marked ${pokemonId} as mega in team ${teamId}`);
}

fs.writeFileSync(filePath, content, "utf-8");
console.log(`\nDone. Updated ${count} team members.`);
