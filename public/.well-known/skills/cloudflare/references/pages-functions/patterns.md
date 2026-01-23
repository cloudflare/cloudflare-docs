# Common Patterns

## Middleware

```javascript
// functions/_middleware.js - global
// functions/users/_middleware.js - scoped to /users/*

// Single
export async function onRequest(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

// Chained (runs in array order)
export const onRequest = [errorHandling, authentication, logging];
```

**Best practices:**
- First middleware = error handler (wraps others)
- Use `context.next()` to pass control
- Share state via `context.data`

## Authentication

```typescript
async function authMiddleware(context: EventContext<Env>) {
  const token = context.request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return new Response('Unauthorized', { status: 401 });
  
  const session = await context.env.KV.get(`session:${token}`);
  if (!session) return new Response('Invalid token', { status: 401 });
  
  context.data.user = JSON.parse(session);
  return context.next();
}

export const onRequest = [authMiddleware];
```

## CORS

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export async function onRequestOptions(context) {
  return new Response(null, { headers: corsHeaders });
}

export async function onRequest(context) {
  const response = await context.next();
  Object.entries(corsHeaders).forEach(([k, v]) => response.headers.set(k, v));
  return response;
}
```

## Rate Limiting

```typescript
interface Env { RATE_LIMIT: KVNamespace; }

async function rateLimitMiddleware(context: EventContext<Env>) {
  const clientIP = context.request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `ratelimit:${clientIP}`;
  const count = parseInt(await context.env.RATE_LIMIT.get(key) || '0');
  
  if (count >= 100) return new Response('Rate limit exceeded', { status: 429 });
  
  await context.env.RATE_LIMIT.put(key, (count + 1).toString(), { expirationTtl: 3600 });
  return context.next();
}
```

## Forms

```typescript
export async function onRequestPost(context) {
  const contentType = context.request.headers.get('content-type') || '';
  
  if (contentType.includes('application/json')) {
    const data = await context.request.json();
    return Response.json({ received: data });
  }
  
  if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await context.request.formData();
    return Response.json({ received: Object.fromEntries(formData) });
  }
  
  if (contentType.includes('multipart/form-data')) {
    const formData = await context.request.formData();
    const file = formData.get('file') as File;
    if (file) {
      await context.env.BUCKET.put(file.name, file.stream());
      return Response.json({ uploaded: file.name });
    }
  }
  
  return new Response('Unsupported content type', { status: 400 });
}
```

## Caching

```typescript
export async function onRequest(context) {
  const cache = caches.default;
  const cacheKey = new Request(context.request.url, context.request);
  
  let response = await cache.match(cacheKey);
  if (!response) {
    response = new Response('Hello World');
    response.headers.set('Cache-Control', 'public, max-age=3600');
    context.waitUntil(cache.put(cacheKey, response.clone()));
  }
  
  return response;
}
```

## Redirects

```typescript
export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // Old paths
  if (url.pathname === '/old-page') {
    return Response.redirect(`${url.origin}/new-page`, 301);
  }
  
  // Force HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }
  
  return context.next();
}
```

## Advanced Mode (_worker.js)

For complex routing, replace `/functions` with `_worker.js`:

```typescript
interface Env {
  ASSETS: Fetcher;
  KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Custom API
    if (url.pathname.startsWith('/api/')) {
      return new Response('API response');
    }
    
    // Static assets
    return env.ASSETS.fetch(request);
  }
} satisfies ExportedHandler<Env>;
```

**When to use:**
- Existing Worker too complex for file-based routing
- Need full routing control
- Framework-generated Workers (Next.js, SvelteKit)

**Important:**
- Module Worker syntax required
- `/functions` ignored
- Manually call `env.ASSETS.fetch()` for static files
- `passThroughOnException()` unavailable

## See Also

- [README.md](./README.md) - Overview
- [api.md](./api.md) - EventContext, bindings
- [gotchas.md](./gotchas.md) - Common issues
