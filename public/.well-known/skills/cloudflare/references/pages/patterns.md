# Patterns

## API Routes

```typescript
// functions/api/todos/[id].ts
export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const todo = await env.DB.prepare('SELECT * FROM todos WHERE id = ?').bind(params.id).first();
  if (!todo) return new Response('Not found', { status: 404 });
  return Response.json(todo);
};

export const onRequestPut: PagesFunction<Env> = async ({ env, params, request }) => {
  const body = await request.json();
  await env.DB.prepare('UPDATE todos SET title = ?, completed = ? WHERE id = ?')
    .bind(body.title, body.completed, params.id).run();
  return Response.json({ success: true });
};

export const onRequestDelete: PagesFunction<Env> = async ({ env, params }) => {
  await env.DB.prepare('DELETE FROM todos WHERE id = ?').bind(params.id).run();
  return new Response(null, { status: 204 });
};
```

## Auth Middleware

```typescript
// functions/_middleware.ts
const auth: PagesFunction<Env> = async (context) => {
  if (context.request.url.includes('/public/')) return context.next();
  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return new Response('Unauthorized', { status: 401 });
  
  try {
    const payload = await verifyJWT(authHeader.substring(7), context.env.JWT_SECRET);
    context.data.user = payload;
    return context.next();
  } catch (err) {
    return new Response('Invalid token', { status: 401 });
  }
};
export const onRequest = [auth];
```

## CORS

```typescript
// functions/api/_middleware.ts
const corsHeaders = {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization'};
const cors: PagesFunction = async (context) => {
  if (context.request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  const response = await context.next();
  Object.entries(corsHeaders).forEach(([k, v]) => response.headers.set(k, v));
  return response;
};
export const onRequest = [cors];
```

## Form Handling

```typescript
// functions/api/contact.ts
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const formData = await request.formData();
  await env.QUEUE.send({name: formData.get('name'), email: formData.get('email'), message: formData.get('message')});
  return new Response('<h1>Thanks!</h1>', { headers: { 'Content-Type': 'text/html' } });
};
```

## Background Tasks

```typescript
export const onRequestPost: PagesFunction = async ({ request, waitUntil }) => {
  const data = await request.json();
  waitUntil(fetch('https://api.example.com/webhook', {method: 'POST', body: JSON.stringify(data)}));
  return Response.json({ queued: true });
};
```

## Error Handling

```typescript
// functions/_middleware.ts
const errorHandler: PagesFunction = async (context) => {
  try {
    return await context.next();
  } catch (error) {
    console.error('Error:', error);
    if (context.request.url.includes('/api/')) return Response.json({ error: error.message }, { status: 500 });
    return new Response(`<html><body><h1>Error</h1><p>${error.message}</p></body></html>`, { status: 500, headers: { 'Content-Type': 'text/html' } });
  }
};
export const onRequest = [errorHandler];
```

## Caching

```typescript
// functions/api/data.ts
export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const url = new URL(request.url);
  const cacheKey = `data:${url.pathname}`;
  const cached = await env.KV.get(cacheKey, 'json');
  if (cached) return Response.json(cached, { headers: { 'X-Cache': 'HIT' } });
  
  const data = await env.DB.prepare('SELECT * FROM data WHERE path = ?').bind(url.pathname).first();
  await env.KV.put(cacheKey, JSON.stringify(data), {expirationTtl: 3600});
  return Response.json(data, {headers: {'X-Cache': 'MISS', 'Cache-Control': 'public, max-age=3600'}});
};
```

## Framework Integration

```bash
npm create cloudflare@latest my-app -- --framework=<framework>
# next, svelte, remix, nuxt, astro, qwik
```
[Framework Guides](https://developers.cloudflare.com/pages/framework-guides/)

## Monorepo

Dashboard → Project → Settings → Build settings → Root directory

Set to subproject path (e.g., `apps/web`). Only builds when files in that dir change.

## Best Practices

### Performance
1. Exclude static from Functions via `_routes.json`
2. Cache with KV (API responses, rendered content)
3. Use Cache API: `await caches.default.match(request)`
4. Minimize Function size: tree-shake, dynamic imports, keep < 1MB

### Security
1. Set security headers in `_headers` for static
2. Use secrets, never commit to wrangler.toml
3. Validate all inputs
4. Rate limit with KV/DO

### Workflow
1. Preview deployments per branch/PR
2. Local dev: `npx wrangler pages dev ./dist`
3. Environment-specific configs in `wrangler.toml`
4. Rollbacks: Dashboard → Deployments → Rollback (instant)
