// Quick ML simulation test (30 seconds)
import { runMLSimulation, formatReport } from "../src/lib/engine/ml-runner";

async function main() {
  console.log("Starting 30-second ML simulation...\n");
  
  const report = await runMLSimulation({
    durationMs: 30000,  // 30 seconds
    batchSize: 20,
    iterationsPerBattle: 5,
    onProgress: (progress) => {
      process.stdout.write(`\r  Battles: ${progress.battlesCompleted} | Speed: ${progress.battlesPerSecond}/s | Insights: ${progress.recentInsights.length}`);
    },
    onInsight: (insight) => {
      console.log(`\n  [NEW INSIGHT] ${insight.description}`);
    },
  });

  console.log("\n\n" + formatReport(report));
}

main().catch(console.error);
