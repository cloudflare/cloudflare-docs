# Functions API

## File-Based Routing

```
/functions
  /index.ts                    → example.com/
  /api
    /users.ts                  → example.com/api/users
    /users
      /[id].ts                 → example.com/api/users/:id
      /[[catchall]].ts         → example.com/api/users/*
  /_middleware.ts              → Runs before all routes
```

**Rules**: `[param]` = single segment, `[[param]]` = multi-segment wildcard, more specific wins, falls back to static assets.

## Request Handlers

```typescript
import type { PagesFunction } from '@cloudflare/workers-types';

interface Env {
  DB: D1Database;
  KV: KVNamespace;
}

// All methods
export const onRequest: PagesFunction<Env> = async (context) => {
  return new Response('All methods');
};

// Method-specific
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env, params, data } = context;
  
  const user = await env.DB.prepare(
    'SELECT * FROM users WHERE id = ?'
  ).bind(params.id).first();
  
  return Response.json(user);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const body = await context.request.json();
  return Response.json({ success: true });
};

// Also: onRequestPut, onRequestPatch, onRequestDelete, onRequestHead, onRequestOptions
```

## Context Object

```typescript
interface EventContext<Env, Params, Data> {
  request: Request;              // Incoming HTTP request
  env: Env;                      // Bindings (KV, D1, R2, etc.)
  params: Params;                // Dynamic route parameters
  data: Data;                    // Shared data from middleware
  functionPath: string;          // Current function path
  waitUntil: (promise: Promise<any>) => void;  // Background tasks
  next: (input?: RequestInfo, init?: RequestInit) => Promise<Response>;
  passThroughOnException: () => void;  // Fallback on error (not in advanced mode)
}
```

## Dynamic Routes

### Single Segment
```typescript
// functions/users/[id].ts
export const onRequestGet: PagesFunction = async ({ params }) => {
  // /users/123 → params.id = "123"
  return Response.json({ userId: params.id });
};
```

### Multi-Segment
```typescript
// functions/files/[[path]].ts
export const onRequestGet: PagesFunction = async ({ params }) => {
  // /files/docs/api/v1.md → params.path = ["docs", "api", "v1.md"]
  const filePath = (params.path as string[]).join('/');
  return new Response(filePath);
};
```

## Middleware

```typescript
// functions/_middleware.ts
import type { PagesFunction } from '@cloudflare/workers-types';

// Single
export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();
  response.headers.set('X-Custom-Header', 'value');
  return response;
};

// Chained (runs in order)
const errorHandler: PagesFunction = async (context) => {
  try {
    return await context.next();
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
};

const auth: PagesFunction = async (context) => {
  const token = context.request.headers.get('Authorization');
  if (!token) return new Response('Unauthorized', { status: 401 });
  
  context.data.userId = await verifyToken(token);
  return context.next();
};

export const onRequest = [errorHandler, auth];
```

**Scope**:
- `functions/_middleware.ts` → ALL requests (including static)
- `functions/api/_middleware.ts` → `/api/*` only

## Bindings Usage

```typescript
export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  // KV
  const cached = await env.KV.get('key', 'json');
  await env.KV.put('key', JSON.stringify({ data: 'value' }), {
    expirationTtl: 3600
  });
  
  // D1
  const result = await env.DB.prepare(
    'SELECT * FROM users WHERE id = ?'
  ).bind(userId).first();
  
  // R2
  const object = await env.BUCKET.get('file.txt');
  const content = await object?.text();
  
  // Queue
  await env.QUEUE.send({ event: 'user.signup', userId: 123 });
  
  // AI
  const aiResponse = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
    prompt: 'Hello world'
  });
  
  return Response.json({ success: true });
};
```

## Advanced Mode

Full Workers API, bypasses file-based routing:

```javascript
// functions/_worker.js
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Custom routing
    if (url.pathname.startsWith('/api/')) {
      return new Response('API response');
    }
    
    // REQUIRED: Serve static assets
    return env.ASSETS.fetch(request);
  }
};
```

**When to use**: WebSockets, complex routing, scheduled handlers, email handlers.

## getRequestContext (Framework SSR)

Access bindings in framework code (Next.js, SvelteKit, etc.):

```typescript
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET(request: Request) {
  const { env, cf, ctx } = getRequestContext();
  
  const data = await env.DB.prepare(
    'SELECT * FROM users'
  ).all();
  
  return Response.json(data);
}
```

**Note**: Adapter-specific. Check framework docs:
- Next.js: `@cloudflare/next-on-pages`
- SvelteKit: `@sveltejs/adapter-cloudflare`
- Remix: `@remix-run/cloudflare-pages`
