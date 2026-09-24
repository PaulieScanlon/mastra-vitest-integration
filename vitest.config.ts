import { defineConfig } from "vitest/config";
import { MastraEvalsReporter } from "@mastra/evals/vitest";

export default defineConfig({
  test: {
    include: ["evals/**/*.test.ts"],
    reporters: ["verbose", new MastraEvalsReporter()],
    setupFiles: ["dotenv/config", "@mastra/evals/vitest/setup"],
    fileParallelism: false
  }
});
