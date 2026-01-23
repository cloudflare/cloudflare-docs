# Workers Runtime APIs

## Fetch Handler

```typescript
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === 'POST' && url.pathname === '/api') {
      const body = await request.json();
      return new Response(JSON.stringify({ id: 1 }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return fetch(request);  // Subrequest to origin
  },
};
```

## Execution Context

```typescript
ctx.waitUntil(logAnalytics(request));  // Background work, don't block response
ctx.passThroughOnException();  // Failover to origin on error
```

**Never** `await` background operations - use `ctx.waitUntil()`.

## Bindings

```typescript
// KV
await env.MY_KV.get('key');
await env.MY_KV.put('key', 'value', { expirationTtl: 3600 });

// R2
const obj = await env.MY_BUCKET.get('file.txt');
await env.MY_BUCKET.put('file.txt', 'content');

// D1
const result = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(1).first();

// Queues
await env.MY_QUEUE.send({ timestamp: Date.now() });

// Secrets/vars
const key = env.API_KEY;
```

## Cache API

```typescript
const cache = caches.default;
let response = await cache.match(request);

if (!response) {
  response = await fetch(request);
  response = new Response(response.body, response);
  response.headers.set('Cache-Control', 'max-age=3600');
  ctx.waitUntil(cache.put(request, response.clone()));  // Clone before caching
}
```

## HTMLRewriter

```typescript
return new HTMLRewriter()
  .on('a[href]', {
    element(el) {
      const href = el.getAttribute('href');
      if (href?.startsWith('http://')) {
        el.setAttribute('href', href.replace('http://', 'https://'));
      }
    }
  })
  .transform(response);
```

**Use cases**: A/B testing, analytics injection, link rewriting

## WebSockets

```typescript
const [client, server] = Object.values(new WebSocketPair());

server.accept();
server.addEventListener('message', event => {
  server.send(`Echo: ${event.data}`);
});

return new Response(null, { status: 101, webSocket: client });
```

## Durable Objects

```typescript
export class Counter {
  private value = 0;
  
  constructor(private state: DurableObjectState) {
    state.blockConcurrencyWhile(async () => {
      this.value = (await state.storage.get('value')) || 0;
    });
  }
  
  async fetch(request: Request): Promise<Response> {
    if (new URL(request.url).pathname === '/increment') {
      await this.state.storage.put('value', ++this.value);
    }
    return new Response(String(this.value));
  }
}

// Usage: const stub = env.COUNTER.get(env.COUNTER.idFromName('global'));
```

**When to use**: Real-time collaboration, rate limiting, strongly consistent state

## Other Handlers

```typescript
// Cron: async scheduled(event, env, ctx) { ctx.waitUntil(doCleanup(env)); }
// Queue: async queue(batch) { for (const msg of batch.messages) { await process(msg.body); msg.ack(); } }
// Tail: async tail(events, env) { for (const e of events) if (e.outcome === 'exception') await log(e); }
```

## Service Bindings

```typescript
return env.SERVICE_B.fetch(request);  // Worker-to-worker RPC, zero latency
```

## See Also

- [Configuration](./configuration.md) - Binding setup
- [Patterns](./patterns.md) - Common workflows
- [KV](../kv/README.md), [D1](../d1/README.md), [R2](../r2/README.md), [Durable Objects](../durable-objects/README.md), [Queues](../queues/README.md)
