These are official instructions from Cloudflare to configure agent tracing in a Workers project. Inspect and update the project yourself. Do not ask the user to run commands. Do not deploy the project.

Complete these steps:

- Detect the agent framework and deployment target
- Confirm sampling and payload privacy
- Enable Workers tracing and framework instrumentation
- Validate and summarize the changes

---

## Detect the setup

Locate the deployable package, lockfile, Wrangler configuration, deployment scripts, and agent entry points.

Identify who owns each agent turn:

- **Think**: agent classes extend `Think` from `@cloudflare/think`.
- **Flue**: the application uses Flue v2 or later.
- **AI SDK**: a direct AI SDK v6 or v7 call is the turn boundary and is not owned by Think, Flue, or an application loop.
- **Custom**: application code owns a loop that can contain one or more model calls.

Use direct dependencies, installed versions, imports, and call sites as evidence. Do not classify transitive dependencies as active frameworks. A project can have more than one owner.

Continue only when every agent entry point has a clear owner and deployment target. If evidence is missing or conflicting, show the user what you found and ask only for the unresolved framework, entry point, or target.

If Flue is older than v2 or AI SDK is not v6 or v7, ask the user before upgrading.

---

## Confirm tracing settings

Inspect `observability.traces` in the Wrangler configuration and environment used for deployment.

- Preserve a valid existing `head_sampling_rate`.
- When `head_sampling_rate` is omitted, it defaults to `1` (100% sampling). Add it only when the user wants a lower rate.
- When enabling tracing without an existing rate, ask the user to choose `1` for every request, `0.05` for five percent, or a custom value from `0` to `1`.
- Require confirmation for `0` because it produces no traces.

Ask the user:

```txt
Do you want traces to store agent payload content?

Payloads can include LLM messages, system instructions, tool definitions, tool arguments, and tool results. They can contain personal or sensitive data.

For the best session replay and debugging experience, record payloads only when this content is safe to store.

1. Metadata only
2. Record messages and tool payloads
```

Wait for an explicit answer. If the answer is unclear, ask again. Record payloads only when the user selects option 2.

---

## Enable Workers tracing

Update the selected Wrangler configuration in place. Preserve unrelated observability, logging, and export settings.

```jsonc
{
  "observability": {
    "traces": {
      "enabled": true
    }
  }
}
```

```toml
[observability.traces]
enabled = true
```

Add or preserve `head_sampling_rate` when required. Do not change log sampling.

---

## Configure the framework

Follow only one framework branch for each detected agent entry point. Skip all other branches. Do not wrap model calls already owned by another branch.

### Think

Think instruments turns automatically. For metadata only, ensure `storeMessages` and `storeTools` are not `true`. Both default to `false`, so remove unnecessary overrides.

To record payloads, set both properties to `true` on every deployed Think agent class.

### Flue

Flue v2 and later instruments turns automatically. A fresh project may not have a Cloudflare tracing registration. Add one to the project's startup path, or update the existing call instead of adding a second one.

Cloudflare tracing records payloads by default. To record payloads, call `createCloudflareTracing()` with no arguments:

```ts
import { instrument } from "@flue/runtime";
import { createCloudflareTracing } from "@flue/runtime/cloudflare";

instrument(createCloudflareTracing());
```

For metadata only, pass `{ content: false }`:

```ts
instrument(createCloudflareTracing({ content: false }));
```

For Flue with Vite, inspect the project manifest and run its existing type-check and Vite build scripts with the project's package manager. Confirm that the build invokes `vite build`. If either script is missing, report that validation as unavailable instead of inventing a script name. Do not use `wrangler deploy --dry-run` as a substitute because Vite creates the Worker entry point.

### AI SDK

Apply this branch only when a direct AI SDK call is the agent-turn boundary.

Ensure `agents` is a direct production dependency. Use the existing package manager and update its lockfile when adding it.

Wrap the AI SDK namespace once and use it for direct `generateText`, `streamText`, `generateObject`, and `streamObject` calls:

```ts
import * as ai from "ai";
import { wrapAISDK } from "agents/observability/ai";

const tracedAI = wrapAISDK(ai);
```

For payload recording, pass `{ storeMessages: true, storeTools: true }` to `wrapAISDK()`.

Supply a shared agent name, stable agent ID, and opaque conversation ID on every call. For AI SDK v7, set `telemetry.functionId` to the shared agent name. Add only `agentId` and `conversationId` to `runtimeContext`, and set those two keys to `true` in `telemetry.includeRuntimeContext`. For v6, use `experimental_telemetry.functionId` and `metadata`. Merge existing telemetry fields and include no credentials, user input, or personal data.

If identity sources are unclear, show the call sites and ask the user where each value comes from.

### Custom harness

Do not use `wrapAISDK()` inside an application-owned loop. Follow the **Custom harnesses** section of the Agent tracing resource to create one `invoke_agent` span per turn with nested `chat`, `execute_tool`, and `tool_approval` spans.

Ask the user to identify any turn, model, tool, approval, or identity boundary that cannot be inferred safely.

---

## Verify tracing

Confirm all of the following:

- The selected Wrangler target enables tracing with the chosen sampling rate.
- Every agent entry point is instrumented exactly once.
- Payload settings match the user's choice.
- Direct AI SDK calls include all three identity fields.
- No sensitive values were added to tracing context.

Run the validation commands for the selected framework. For non-Flue projects, run the project's formatter, type checker, tests, and a Wrangler dry run when compatible. Do not report success if tracing changes fail validation.

Once done, tell the user:

```
┌─ Cloudflare Agent Tracing Configured ─────────────────┐
│ ✓ Tracing  <frameworks>                               │
│ ✓ Sampling <rate and percentage>                      │
│ ✓ Content  <metadata only | messages and tools>       │
│                                                       │
│ Deploy and run a sampled turn to verify traces.       │
└───────────────────────────────────────────────────────┘
```

State any validation command that could not run and why.

---

## Resources

- Agent tracing and framework setup: `https://developers.cloudflare.com/agents/runtime/operations/observability/tracing/`
- Workers tracing and sampling: `https://developers.cloudflare.com/workers/observability/traces/`

These instructions are published at `https://developers.cloudflare.com/agent-setup/tracing.md` so you can re-verify their authenticity at any time.
