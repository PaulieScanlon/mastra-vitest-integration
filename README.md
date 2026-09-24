# mastra-vitest-integration

Demo project for the [Mastra Vitest integration](https://mastra.ai/docs/evals/vitest-integration). Runs Mastra evals as Vitest tests against a weather agent, a weather workflow and a custom scorer, with the `MastraEvalsReporter` printing a per-gate and per-scorer table after each run.

## What's inside

- `src/mastra/agents/weather-agent.ts`: agent that answers weather questions using `weatherTool`
- `src/mastra/tools/weather-tool.ts`: fetches current conditions from [Open-Meteo](https://open-meteo.com)
- `src/mastra/workflows/weather-workflow.ts`: `fetch-weather` then `plan-activities`, which calls the agent
- `src/mastra/scorers/mentions-temperature.ts`: custom scorer that checks an answer states a temperature
- `evals/weather-agent-expect-evals.test.ts`: agent eval with gates and an answer relevancy threshold
- `evals/weather-workflow-expect-evals.test.ts`: workflow eval with trajectory gates for each step and the nested tool call
- `evals/weather-scorer-run.test.ts`: runs the custom scorer directly against a fixture

## Setup

Copy `.env.example` to `.env` and set:

- `ANTHROPIC_API_KEY`
- `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` for [Turso](https://turso.tech) storage
- `MASTRA_PLATFORM_ACCESS_TOKEN`, `MASTRA_PROJECT_ID` and `MASTRA_PLATFORM_OBSERVABILITY_ENDPOINT` (optional, for deploying to the [Mastra platform](https://mastra.ai/docs/mastra-platform/overview))

Then install:

```shell
npm install
```

## Run the evals

```shell
npm test
```

Runs every file under `evals/` one at a time (`fileParallelism: false`) so the model provider and Open-Meteo aren't hit concurrently. Each file can also be run on its own with the command in its first line.

## CI

`.github/workflows/evals.yml` runs `npm test` on every pull request. Add `ANTHROPIC_API_KEY`, `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` as repository secrets, then require the `evals` check in the branch protection rules for `main` to block merges when an eval fails.

## Studio

```shell
npm run dev
```

Open [http://localhost:4111](http://localhost:4111) to chat to the agent, run the workflow and see persisted eval scores.
