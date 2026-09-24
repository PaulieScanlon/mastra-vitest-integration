// npx vitest run evals/weather-agent-expect-evals.test.ts
import { test } from "vitest";
import { expectEvals } from "@mastra/evals/vitest";
import { checks } from "@mastra/evals/checks";
import { mastra } from "../src/mastra";

test("weather agent calls the tool and answers relevantly", { timeout: 60_000 }, async () => {
  await expectEvals({
    target: mastra.getAgent("weatherAgent"),
    data: [{ input: "What's the weather in London?" }],
    gates: [checks.calledTool("weatherTool"), checks.noToolErrors(), checks.includes("London")],
    scorers: [{ scorer: mastra.getScorer("answerRelevancyScorer"), threshold: 0.7 }]
  }).toPass(0.8);
});
