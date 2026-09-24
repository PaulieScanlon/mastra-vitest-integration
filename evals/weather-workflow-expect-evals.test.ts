// npx vitest run evals/weather-workflow-expect-evals.test.ts
import { test } from "vitest";
import { expectEvals } from "@mastra/evals/vitest";
import { createTrajectoryAccuracyScorerCode } from "@mastra/evals/scorers/prebuilt";
import { mastra } from "../src/mastra";

test("weather workflow runs fetch-weather then plan-activities", { timeout: 60_000 }, async () => {
  await expectEvals({
    target: mastra.getWorkflow("weatherWorkflow"),
    data: [{ input: { city: "London" } }],
    gates: [
      createTrajectoryAccuracyScorerCode({
        expectedTrajectory: [{ stepType: "workflow_step", name: "fetch-weather", status: "success" }]
      }),
      createTrajectoryAccuracyScorerCode({
        expectedTrajectory: [{ stepType: "workflow_step", name: "plan-activities", status: "success" }]
      }),
      createTrajectoryAccuracyScorerCode({
        expectedTrajectory: [
          {
            stepType: "workflow_step",
            name: "plan-activities",
            children: { steps: [{ stepType: "tool_call", name: "weatherTool" }] }
          }
        ]
      })
    ]
  }).toPass();
});
