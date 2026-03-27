// Full ML simulation — runs for 5 minutes with all 136 Pokémon
import { runMLSimulation, formatReport } from "../src/lib/engine/ml-runner";

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  CHAMPIONS LAB — FULL ML SIMULATION (5 MINUTES)");
  console.log("  136 Pokémon + 55 Megas | All Regional Forms");
  console.log("═══════════════════════════════════════════════════════\n");
  
  const startTime = Date.now();
  
  const report = await runMLSimulation({
    durationMs: 300000,  // 5 minutes
    batchSize: 50,
    iterationsPerBattle: 10,
    onProgress: (progress) => {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      process.stdout.write(
        `\r  [${mins}:${secs.toString().padStart(2, '0')}] Battles: ${progress.battlesCompleted} | Speed: ${progress.battlesPerSecond.toFixed(1)}/s | Insights: ${progress.recentInsights.length}`
      );
    },
    onInsight: (insight) => {
      console.log(`\n  ⚡ [INSIGHT] ${insight.description}`);
    },
  });

  console.log("\n\n" + formatReport(report));
  
  const totalTime = Math.round((Date.now() - startTime) / 1000);
  console.log(`\nCompleted in ${Math.floor(totalTime / 60)}m ${totalTime % 60}s`);
}

main().catch(console.error);
