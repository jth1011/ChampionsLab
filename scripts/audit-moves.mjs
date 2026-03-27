#!/usr/bin/env node
import fs from "fs";

const c = fs.readFileSync("src/lib/pokemon-data.ts", "utf8");
const idRe = /"id":\s*(\d+),/g;
let m;
const moveCounts = [];

while ((m = idRe.exec(c)) !== null) {
  const id = parseInt(m[1]);
  const start = m.index;
  const nextId = /"id":\s*\d+,/.exec(c.substring(start + 10));
  const end = nextId ? start + 10 + nextId.index : c.length;
  const block = c.substring(start, end);
  const nameMatch = block.match(/"name":\s*"([^"]+)"/);
  const moveMatches = block.match(/"moves":\s*\[([\s\S]*?)\]\s*,?\s*"sprite"/);
  const moveCount = moveMatches ? (moveMatches[1].match(/"name":/g) || []).length : 0;
  moveCounts.push({ id, name: nameMatch?.[1] || "?", moveCount });
}

moveCounts.sort((a, b) => a.moveCount - b.moveCount);
console.log("=== MOVE COUNTS (sorted by count) ===");
moveCounts.forEach((p) => {
  const flag = p.moveCount < 15 ? "LOW " : "    ";
  console.log(`${flag}${p.name.padEnd(24)} ${String(p.moveCount).padStart(3)} moves`);
});
console.log(`\nTotal: ${moveCounts.length} Pokémon`);
console.log(`Average: ${Math.round(moveCounts.reduce((a, b) => a + b.moveCount, 0) / moveCounts.length)} moves`);
console.log(`Min: ${moveCounts[0].name} (${moveCounts[0].moveCount})`);
console.log(`Max: ${moveCounts[moveCounts.length - 1].name} (${moveCounts[moveCounts.length - 1].moveCount})`);
