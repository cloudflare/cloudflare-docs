# Function API

## EventContext

```typescript
interface EventContext<Env = any> {
  request: Request;              // Incoming request
  functionPath: string;          // Request path
  waitUntil(promise: Promise<any>): void;  // Background work
  passThroughOnException(): void;          // Fallback on error
  next(input?: Request | string, init?: RequestInit): Promise<Response>;
  env: Env;                      // Bindings, vars, secrets
  params: Record<string, string | string[]>;  // Route params
  data: any;                     // Middleware shared data
}
```

## Handlers

```typescript
// Generic (fallback)
export async function onRequest(context: EventContext): Promise<Response> {
  return new Response('Any method');
}

// Method-specific (takes precedence)
export async function onRequestGet(context: EventContext): Promise<Response> {
  return new Response('GET request');
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const body = await context.request.json();
  return Response.json({ received: body });
}

// Also: onRequestPut, onRequestPatch, onRequestDelete, onRequestHead, onRequestOptions
```

## Bindings

### KV

```typescript
interface Env { TODO_LIST: KVNamespace; }

export const onRequest: PagesFunction<Env> = async (context) => {
  await context.env.TODO_LIST.put('Task:123', 'Buy milk');
  const task = await context.env.TODO_LIST.get('Task:123');
  await context.env.TODO_LIST.delete('Task:123');
  const keys = await context.env.TODO_LIST.list({ prefix: 'Task:' });
  
  // With options
  await context.env.TODO_LIST.put('session', data, { expirationTtl: 3600 });
  const value = await context.env.TODO_LIST.get('key', { type: 'json' });
  
  return new Response(task);
};
```

### D1

```typescript
interface Env { DB: D1Database; }

export const onRequest: PagesFunction<Env> = async (context) => {
  // Prepared statements
  const result = await context.env.DB.prepare('SELECT * FROM users WHERE id = ?')
    .bind(123)
    .first();
  
  // Batch
  const data = await context.env.DB.batch([
    context.env.DB.prepare('SELECT * FROM users'),
    context.env.DB.prepare('SELECT * FROM posts')
  ]);
  
  return Response.json(result);
};
```

### R2

```typescript
interface Env { BUCKET: R2Bucket; }

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const key = url.pathname.slice(1);
  
  // GET
  const obj = await context.env.BUCKET.get(key);
  if (!obj) return new Response('Not found', { status: 404 });
  
  // PUT
  await context.env.BUCKET.put(key, context.request.body, {
    httpMetadata: { contentType: 'application/octet-stream' }
  });
  
  // DELETE
  await context.env.BUCKET.delete(key);
  
  return new Response(obj.body);
};
```

### Durable Objects

```typescript
interface Env { COUNTER: DurableObjectNamespace; }

export const onRequest: PagesFunction<Env> = async (context) => {
  const id = context.env.COUNTER.idFromName('global-counter');
  const stub = context.env.COUNTER.get(id);
  return stub.fetch(context.request);
};
```

### Workers AI

```typescript
interface Env { AI: Ai; }

export const onRequest: PagesFunction<Env> = async (context) => {
  const answer = await context.env.AI.run(
    '@cf/meta/llama-3.1-8b-instruct',
    { prompt: 'Hello, World?' }
  );
  return Response.json(answer);
};
```

### Service Bindings

```typescript
interface Env { AUTH_SERVICE: Fetcher; }

export const onRequest: PagesFunction<Env> = async (context) => {
  // Forward request
  return context.env.AUTH_SERVICE.fetch(context.request);
  
  // Custom request
  const req = new Request('https://internal/verify', {
    method: 'POST',
    body: JSON.stringify({ token: 'xyz' })
  });
  return context.env.AUTH_SERVICE.fetch(req);
};
```

### Environment Variables

```typescript
interface Env {
  API_KEY: string;
  ENVIRONMENT: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const apiKey = context.env.API_KEY;
  const isProd = context.env.ENVIRONMENT === 'production';
  return new Response('OK');
};
```

## TypeScript

```bash
npm install -D @cloudflare/workers-types
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ES2022",
    "lib": ["ES2021"],
    "types": ["@cloudflare/workers-types"]
  }
}
```

```typescript
import type { PagesFunction, EventContext } from '@cloudflare/workers-types';

interface Env {
  KV: KVNamespace;
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // context.env fully typed
  return new Response('OK');
};
```

## See Also

- [README.md](./README.md) - Overview
- [configuration.md](./configuration.md) - wrangler.json
- [patterns.md](./patterns.md) - Common patterns
