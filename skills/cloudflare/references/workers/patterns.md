# Workers Patterns

## Error Handling

```typescript
class HTTPError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      if (error instanceof HTTPError) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: error.status, headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
```

## CORS

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
// Add corsHeaders to response
```

## Routing

```typescript
const router = { 'GET /api/users': handleGetUsers, 'POST /api/users': handleCreateUser };

const handler = router[`${request.method} ${url.pathname}`];
return handler ? handler(request, env) : new Response('Not Found', { status: 404 });
```

**Production**: Use Hono, itty-router, or Worktop

## Performance

```typescript
// ❌ Sequential
const user = await fetch('/api/user/1');
const posts = await fetch('/api/posts?user=1');

// ✅ Parallel
const [user, posts] = await Promise.all([fetch('/api/user/1'), fetch('/api/posts?user=1')]);
```

## Streaming

```typescript
const stream = new ReadableStream({
  async start(controller) {
    for (let i = 0; i < 1000; i++) {
      controller.enqueue(new TextEncoder().encode(`Item ${i}\n`));
      if (i % 100 === 0) await new Promise(r => setTimeout(r, 0));
    }
    controller.close();
  }
});
```

## Transform Streams

```typescript
response.body.pipeThrough(new TextDecoderStream()).pipeThrough(
  new TransformStream({ transform(chunk, c) { c.enqueue(chunk.toUpperCase()); } })
).pipeThrough(new TextEncoderStream());
```

## Testing

```typescript
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

describe('Worker', () => {
  it('returns 200', async () => {
    const req = new Request('http://localhost/');
    const env = { MY_VAR: 'test' };
    const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
    expect((await worker.fetch(req, env, ctx)).status).toBe(200);
  });
});
```

## Deployment

```bash
npx wrangler deploy              # production
npx wrangler deploy --env staging
npx wrangler versions upload --message "Add feature"
npx wrangler rollback
```

## Monitoring

```typescript
const start = Date.now();
const response = await handleRequest(request, env);
ctx.waitUntil(env.ANALYTICS.writeDataPoint({
  doubles: [Date.now() - start], blobs: [request.url, String(response.status)]
}));
```

## Security

```typescript
// Headers
const security = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "default-src 'self'",
};

// Auth
const auth = request.headers.get('Authorization');
if (!auth?.startsWith('Bearer ')) return new Response('Unauthorized', { status: 401 });
```

## Rate Limiting

See [Durable Objects](../durable-objects/README.md) for stateful rate limiting patterns.

## Gradual Rollouts

```typescript
const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(userId));
const bucket = new Uint8Array(hash)[0] % 100;
if (bucket < rolloutPercent) return newFeature(request);
```

## See Also

- [API](./api.md) - Runtime APIs
- [Gotchas](./gotchas.md) - Common issues
- [Configuration](./configuration.md) - Setup
