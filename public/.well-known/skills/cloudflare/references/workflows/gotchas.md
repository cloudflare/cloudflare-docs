# Gotchas & Debugging

## Timeout Issues

### Step Timeout
- **Default**: 10 min/attempt
- **CPU Limit**: 30s default, max 5min (wrangler.toml `limits.cpu_ms = 300_000`)

```typescript
await step.do('long operation', {timeout: '30 minutes'}, async () => { /* ... */ });
```

### waitForEvent Timeout
- **Default**: 24h, **Max**: 365d, **Throws on timeout**

```typescript
try {
  const event = await step.waitForEvent('wait', { type: 'approval', timeout: '1h' });
} catch (e) { /* Timeout - proceed with default */ }
```

## Limits

| Limit | Free | Paid |
|-------|------|------|
| CPU per step | 10ms | 30s (default), 5min (max) |
| Step state | 1 MiB | 1 MiB |
| Instance state | 100 MB | 1 GB |
| Steps per workflow | 1,024 | 1,024 |
| Executions/day | 100k | Unlimited |
| Concurrent instances | 25 | 10k |
| State retention | 3d | 30d |

Note: `step.sleep()` doesn't count toward step limit

## Debugging

### Logs
```typescript
await step.do('process', async () => {
  console.log('Logged once per successful step'); // ✅
  return result;
});
console.log('Outside step'); // ⚠️ May duplicate on restart
```

### Instance Status
```bash
npx wrangler workflows instances describe my-workflow instance-id
```

```typescript
const instance = await env.MY_WORKFLOW.get('instance-id');
const status = await instance.status();
// status: queued | running | paused | errored | terminated | complete | waiting | waitingForPause | unknown
```

## Common Pitfalls

### Non-Deterministic Step Names
```typescript
// ❌ BAD: await step.do(`step-${Date.now()}`, ...)
// ✅ GOOD: await step.do(`step-${event.instanceId}`, ...)
```

### State in Variables
```typescript
// ❌ BAD: let total = 0; await step.do('step 1', async () => { total += 10; }); // Lost on hibernation
// ✅ GOOD: const total = await step.do('step 1', async () => 10); // Persisted
```

### Non-Deterministic Conditionals
```typescript
// ❌ BAD: if (Date.now() > deadline) { await step.do(...) }
// ✅ GOOD: const isLate = await step.do('check', async () => Date.now() > deadline); if (isLate) { await step.do(...) }
```

### Large Step Returns
```typescript
// ❌ BAD: return await fetchHugeDataset(); // 5 MiB
// ✅ GOOD: Store in R2, return { key }
```

### Idempotency Ignored
```typescript
// ❌ BAD: await step.do('charge', async () => await chargeCustomer(...)); // Charges on retry
// ✅ GOOD: Check if already charged first
```

### Instance ID Collision
```typescript
// ❌ BAD: await env.MY_WORKFLOW.create({ id: userId, params: {} }); // Reuses IDs
// ✅ GOOD: await env.MY_WORKFLOW.create({ id: `${userId}-${Date.now()}`, params: {} });
```

### Missing await
```typescript
// ❌ BAD: step.do('task', ...); // Fire-and-forget
// ✅ GOOD: await step.do('task', ...);
```

## Pricing

| Metric | Free | Paid |
|--------|------|------|
| Requests | 100k/day | 10M/mo + $0.30/M |
| CPU time | 10ms/invoke | 30M CPU-ms/mo + $0.02/M CPU-ms |
| Storage | 1 GB | 1 GB/mo + $0.20/GB-mo |

Storage: Includes all instances (running/errored/sleeping/completed). Retention: 3d (Free), 30d (Paid)

## TypeScript Types

```typescript
import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent, NonRetryableError } from 'cloudflare:workers';

interface Env { MY_WORKFLOW: Workflow<MyParams>; KV: KVNamespace; DB: D1Database; }

export class MyWorkflow extends WorkflowEntrypoint<Env, MyParams> {
  async run(event: WorkflowEvent<MyParams>, step: WorkflowStep) {
    const user = await step.do('fetch', async () => await this.env.KV.get<User>(`user:${event.payload.userId}`, { type: 'json' }));
  }
}
```

## References

- [Official Docs](https://developers.cloudflare.com/workflows/)
- [Get Started Guide](https://developers.cloudflare.com/workflows/get-started/guide/)
- [Workers API](https://developers.cloudflare.com/workflows/build/workers-api/)
- [REST API](https://developers.cloudflare.com/api/resources/workflows/)
- [Examples](https://developers.cloudflare.com/workflows/examples/)
- [Limits](https://developers.cloudflare.com/workflows/reference/limits/)
- [Pricing](https://developers.cloudflare.com/workflows/reference/pricing/)

See: [README.md](./README.md), [configuration.md](./configuration.md), [api.md](./api.md), [patterns.md](./patterns.md)
