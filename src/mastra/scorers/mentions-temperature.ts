import { createScorer } from "@mastra/core/evals";
import { getAssistantMessageFromRunOutput } from "@mastra/evals/scorers/utils";

const TEMPERATURE_PATTERN = /-?\d+(\.\d+)?\s?°\s?[CF]\b/;

export const mentionsTemperatureScorer = createScorer({
  id: "mentions-temperature",
  description: "Checks the answer states a temperature in °C or °F",
  type: "agent"
})
  .preprocess(({ run }) => {
    const response = getAssistantMessageFromRunOutput(run.output) ?? "";
    return { response, match: response.match(TEMPERATURE_PATTERN)?.[0] };
  })
  .generateScore(({ results }) => {
    return results.preprocessStepResult?.match ? 1 : 0;
  })
  .generateReason(({ results, score }) => {
    if (score === 1) {
      return `Answer states a temperature: ${results.preprocessStepResult?.match}`;
    }
    return "Answer does not state a temperature in °C or °F";
  });
