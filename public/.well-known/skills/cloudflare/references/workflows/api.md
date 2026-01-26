# Workflow APIs

## Step APIs

```typescript
// step.do()
const result = await step.do('step name', async () => { /* logic */ });
const result = await step.do('step name', { retries, timeout }, async () => {});

// step.sleep()
await step.sleep('description', '1 hour');
await step.sleep('description', 5000); // ms

// step.sleepUntil()
await step.sleepUntil('description', Date.parse('2024-12-31'));

// step.waitForEvent()
const data = await step.waitForEvent<PayloadType>('wait', {type: 'webhook-type', timeout: '24h'}); // Default 24h, max 365d
try { const event = await step.waitForEvent('wait', { type: 'approval', timeout: '1h' }); } catch (e) { /* Timeout */ }
```

## Instance Management

```typescript
// Create single
const instance = await env.MY_WORKFLOW.create({id: crypto.randomUUID(), params: { userId: 'user123' }}); // id optional, auto-generated if omitted

// Batch (max 100, idempotent: skips existing IDs)
const instances = await env.MY_WORKFLOW.createBatch([{id: 'user1', params: {name: 'John'}}, {id: 'user2', params: {name: 'Jane'}}]);

// Get & Status
const instance = await env.MY_WORKFLOW.get('instance-id');
const status = await instance.status(); // {status: 'queued' | 'running' | 'paused' | 'errored' | 'terminated' | 'complete' | 'waiting' | 'waitingForPause' | 'unknown', error?, output?}

// Control
await instance.pause(); await instance.resume(); await instance.terminate(); await instance.restart();

// Send Events
await instance.sendEvent({type: 'approval', payload: { approved: true }}); // Must match waitForEvent type
```

## Triggering Workflows

```typescript
// From Worker
export default { async fetch(req, env) { const instance = await env.MY_WORKFLOW.create({id: crypto.randomUUID(), params: { userId: 'user123' }}); return Response.json({ id: instance.id }); }};

// From Queue
export default { async queue(batch, env) { for (const msg of batch.messages) { await env.MY_WORKFLOW.create({id: `job-${msg.id}`, params: msg.body}); } }};

// From Cron
export default { async scheduled(event, env) { await env.CLEANUP_WORKFLOW.create({id: `cleanup-${Date.now()}`, params: { timestamp: event.scheduledTime }}); }};

// From Another Workflow (non-blocking)
export class ParentWorkflow extends WorkflowEntrypoint<Env, Params> {
  async run(event, step) {
    const child = await step.do('start child', async () => await this.env.CHILD_WORKFLOW.create({id: `child-${event.instanceId}`, params: {}}));
  }
}
```

## Error Handling

```typescript
import { NonRetryableError } from 'cloudflare:workflows';

// NonRetryableError
await step.do('validate', async () => {
  if (!event.payload.paymentMethod) throw new NonRetryableError('Payment method required');
  const res = await fetch('https://api.example.com/charge', { method: 'POST' });
  if (res.status === 401) throw new NonRetryableError('Invalid credentials'); // Don't retry
  if (!res.ok) throw new Error('Retryable failure'); // Will retry
  return res.json();
});

// Catching Errors
try { await step.do('risky op', async () => { throw new NonRetryableError('Failed'); }); } catch (e) { await step.do('cleanup', async () => {}); }

// Idempotency
await step.do('charge', async () => {
  const sub = await fetch(`https://api/subscriptions/${id}`).then(r => r.json());
  if (sub.charged) return sub; // Already done
  return await fetch(`https://api/subscriptions/${id}`, {method: 'POST', body: JSON.stringify({ amount: 10.0 })}).then(r => r.json());
});
```

## Wrangler CLI

```bash
npm create cloudflare@latest my-workflow -- --template "cloudflare/workflows-starter"
npx wrangler deploy
npx wrangler workflows list
npx wrangler workflows trigger my-workflow '{"userId":"user123"}'
npx wrangler workflows instances list my-workflow
npx wrangler workflows instances describe my-workflow instance-id
npx wrangler workflows instances pause/resume/terminate my-workflow instance-id
```

## REST API

```bash
# Create
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/workflows/{workflow_name}/instances" -H "Authorization: Bearer {token}" -d '{"id":"custom-id","params":{"userId":"user123"}}'

# Status
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/status" -H "Authorization: Bearer {token}"

# Send Event
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}/events" -H "Authorization: Bearer {token}" -d '{"type":"approval","payload":{"approved":true}}'
```

## Bindings

```typescript
type Env = {MY_WORKFLOW: Workflow; KV: KVNamespace; DB: D1Database; BUCKET: R2Bucket; AI: Ai; VECTORIZE: VectorizeIndex;};

await step.do('use bindings', async () => {
  const kv = await this.env.KV.get('key');
  const db = await this.env.DB.prepare('SELECT * FROM users').first();
  const file = await this.env.BUCKET.get('file.txt');
  const ai = await this.env.AI.run('@cf/meta/llama-2-7b-chat-int8', { prompt: 'Hi' });
});
```

See: [configuration.md](./configuration.md), [patterns.md](./patterns.md)
