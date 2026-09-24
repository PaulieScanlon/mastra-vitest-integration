import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { createAnswerRelevancyScorer, createTrajectoryAccuracyScorerCode } from "@mastra/evals/scorers/prebuilt";
import { weatherAgent } from "./agents/weather-agent";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { mentionsTemperatureScorer } from "./scorers/mentions-temperature";

export const mastra = new Mastra({
  agents: { weatherAgent },
  workflows: { weatherWorkflow },
  scorers: {
    answerRelevancyScorer: createAnswerRelevancyScorer({ model: "anthropic/claude-haiku-4-5-20251001" }),
    trajectoryAccuracyScorer: createTrajectoryAccuracyScorerCode({}),
    mentionsTemperatureScorer
  },
  storage: new LibSQLStore({
    id: "mastra-storage",
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!
  })
});
