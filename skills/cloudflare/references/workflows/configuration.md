# Workflow Configuration

## Wrangler Setup

**wrangler.toml:**
```toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "2024-10-22"

[[workflows]]
name = "my-workflow"           # Workflow name
binding = "MY_WORKFLOW"        # Env binding
class_name = "MyWorkflow"      # TS class name
# script_name = "other-worker" # For cross-script calls

[limits]
cpu_ms = 300_000  # 5 min max (default 30s)
```

**wrangler.jsonc:**
```jsonc
{
  "name": "my-worker",
  "workflows": [
    { "name": "my-workflow", "binding": "MY_WORKFLOW", "class_name": "MyWorkflow" }
  ],
  "limits": { "cpu_ms": 300000 }
}
```

## Step Configuration

### Basic Step
```typescript
const data = await step.do('step name', async () => {
  return { result: 'value' };
});
```

### Retry Config
```typescript
await step.do('api call', {
  retries: {
    limit: 10,              // Default: 5, or Infinity
    delay: '10 seconds',    // Default: 10000ms
    backoff: 'exponential'  // constant | linear | exponential
  },
  timeout: '30 minutes'     // Per-attempt timeout (default: 10min)
}, async () => {
  const res = await fetch('https://api.example.com/data');
  if (!res.ok) throw new Error('Failed');
  return res.json();
});
```

### Parallel Steps
```typescript
const [user, settings] = await Promise.all([
  step.do('fetch user', async () => this.env.KV.get(`user:${id}`)),
  step.do('fetch settings', async () => this.env.KV.get(`settings:${id}`))
]);
```

### Conditional Steps
```typescript
const config = await step.do('fetch config', async () => 
  this.env.KV.get('flags', { type: 'json' })
);

// ✅ Deterministic (based on step output)
if (config.enableEmail) {
  await step.do('send email', async () => sendEmail());
}

// ❌ Non-deterministic (Date.now outside step)
if (Date.now() > deadline) { /* BAD */ }
```

### Dynamic Steps (Loops)
```typescript
const files = await step.do('list files', async () => 
  this.env.BUCKET.list()
);

for (const file of files.objects) {
  await step.do(`process ${file.key}`, async () => {
    const obj = await this.env.BUCKET.get(file.key);
    return processData(await obj.arrayBuffer());
  });
}
```

## Sleep & Scheduling

```typescript
// Relative
await step.sleep('wait 1 hour', '1 hour');
await step.sleep('wait 30 days', '30 days');
await step.sleep('wait 5s', 5000); // ms

// Absolute
await step.sleepUntil('launch date', Date.parse('24 Oct 2024 13:00:00 UTC'));
await step.sleepUntil('deadline', new Date('2024-12-31T23:59:59Z'));
```

Units: second, minute, hour, day, week, month, year. Max: 365 days.
Sleeping instances don't count toward concurrency.

## Parameters

**Pass from Worker:**
```typescript
const instance = await env.MY_WORKFLOW.create({
  id: crypto.randomUUID(),
  params: { userId: 'user123', email: 'user@example.com' }
});
```

**Access in Workflow:**
```typescript
async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
  const userId = event.payload.userId;
  const instanceId = event.instanceId;
  const createdAt = event.timestamp;
}
```

**CLI Trigger:**
```bash
npx wrangler workflows trigger my-workflow '{"userId":"user123"}'
```

## Multiple Workflows

```typescript
export class UserOnboarding extends WorkflowEntrypoint<Env, UserParams> {
  async run(event, step) { /* ... */ }
}

export class DataProcessing extends WorkflowEntrypoint<Env, DataParams> {
  async run(event, step) { /* ... */ }
}
```

```toml
[[workflows]]
name = "user-onboarding"
binding = "USER_ONBOARDING"
class_name = "UserOnboarding"

[[workflows]]
name = "data-processing"
binding = "DATA_PROCESSING"
class_name = "DataProcessing"
```

## Cross-Script Bindings

**billing-worker** defines workflow:
```toml
[[workflows]]
name = "billing-workflow"
binding = "BILLING"
class_name = "BillingWorkflow"
```

**web-api-worker** calls it:
```toml
[[workflows]]
name = "billing-workflow"
binding = "BILLING"
class_name = "BillingWorkflow"
script_name = "billing-worker"
```

See: [api.md](./api.md), [patterns.md](./patterns.md)
