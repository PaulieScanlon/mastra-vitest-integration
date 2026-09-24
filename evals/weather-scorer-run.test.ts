// npx vitest run evals/weather-scorer-run.test.ts
import { test, expect } from "vitest";
import { createAgentTestRun, createTestMessage } from "@mastra/evals/scorers/utils";
import { mastra } from "../src/mastra";

test("scores 1 when the answer states a temperature", async () => {
  const testRun = createAgentTestRun({
    inputMessages: [createTestMessage({ content: "What's the weather in London?", role: "user" })],
    output: [createTestMessage({ content: "It's 15.7°C and clear in London.", role: "assistant" })]
  });

  const result = await mastra.getScorer("mentionsTemperatureScorer").run({
    input: testRun.input,
    output: testRun.output
  });

  expect(result.score).toBe(1);
});
