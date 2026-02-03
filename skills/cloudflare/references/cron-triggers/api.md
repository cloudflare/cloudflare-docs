# Cron Triggers API

## Basic Handler

```typescript
interface Env {
  // Bindings (KV, R2, D1, secrets, etc.)
}

export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    console.log("Cron executed:", new Date(controller.scheduledTime));
  },
};
```

```javascript
export default {
  async scheduled(controller, env, ctx) {
    console.log("Cron executed:", new Date(controller.scheduledTime));
  },
};
```

```python
from workers import WorkerEntrypoint

class Default(WorkerEntrypoint):
    async def scheduled(self, controller, env, ctx):
        print(f"Cron executed: {controller.scheduledTime}")
```

## ScheduledController

```typescript
interface ScheduledController {
  scheduledTime: number;  // Unix ms when scheduled to run
  cron: string;           // Expression that triggered (e.g., "*/5 * * * *")
  type: string;           // Always "scheduled"
}
```

**Parse time:**
```typescript
const date = new Date(controller.scheduledTime);
console.log(date.toISOString());
```

## Handler Parameters

**`controller: ScheduledController`**
- Access cron expression and scheduled time

**`env: Env`**
- All bindings: KV, R2, D1, secrets, service bindings

**`ctx: ExecutionContext`**
- `ctx.waitUntil(promise)` - Extend execution for async tasks (logging, cleanup, external APIs)
- First `waitUntil` failure recorded in Cron Events

## Multiple Schedules Pattern

```typescript
import { Hono } from "hono";

interface Env {
  MY_KV: KVNamespace;
}

const app = new Hono<{ Bindings: Env }>();
app.get("/", (c) => c.text("API Running"));

export default {
  fetch: app.fetch,

  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    switch (controller.cron) {
      case "*/3 * * * *":
        ctx.waitUntil(updateRecentData(env));
        break;
      
      case "0 * * * *":
        ctx.waitUntil(processHourlyAggregation(env));
        break;
      
      case "0 2 * * *":
        ctx.waitUntil(performDailyMaintenance(env));
        break;
      
      default:
        console.warn(`Unhandled cron: ${controller.cron}`);
    }
  },
};
```

## ctx.waitUntil Usage

Non-blocking async tasks:

```typescript
export default {
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    // Critical path - runs immediately
    const data = await fetchCriticalData();
    
    // Non-blocking background tasks
    ctx.waitUntil(
      Promise.all([
        logToAnalytics(data),
        cleanupOldRecords(env.DB),
        notifyWebhook(env.WEBHOOK_URL, data),
      ])
    );
    
    // Handler returns while waitUntil tasks complete
  },
};
```

## Workflow Integration

Trigger long-running workflows on schedule:

```typescript
import { WorkflowEntrypoint } from "cloudflare:workers";

interface Env {
  MY_WORKFLOW: Workflow;
}

export class DataProcessingWorkflow extends WorkflowEntrypoint {
  async run(event: any, step: any) {
    const data = await step.do("fetch-data", async () => {
      return await fetchLargeDataset();
    });
    
    const processed = await step.do("process-data", async () => {
      return await processDataset(data);
    });
    
    await step.do("store-results", async () => {
      return await storeResults(processed);
    });
  }
}

export default {
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    const instance = await env.MY_WORKFLOW.create({
      params: {
        scheduledTime: controller.scheduledTime,
        cron: controller.cron,
      },
    });
    
    console.log(`Started workflow: ${instance.id}`);
  },
};
```

## Testing Handler

```typescript
// test/scheduled.test.ts
import { describe, it, expect } from "vitest";
import worker from "../src/index";

describe("Scheduled Handler", () => {
  it("processes scheduled event", async () => {
    const env = getMiniflareBindings();
    const ctx = {
      waitUntil: (promise: Promise<any>) => promise,
      passThroughOnException: () => {},
    };
    
    const controller = {
      scheduledTime: Date.now(),
      cron: "*/5 * * * *",
      type: "scheduled" as const,
    };
    
    await worker.scheduled(controller, env, ctx);
    
    const result = await env.MY_KV.get("last_run");
    expect(result).toBeDefined();
  });
});
```

## See Also

- [README.md](./README.md) - Overview
- [patterns.md](./patterns.md) - Use cases, examples
