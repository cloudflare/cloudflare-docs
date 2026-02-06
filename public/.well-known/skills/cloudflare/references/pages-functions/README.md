# Cloudflare Pages Functions

Serverless functions on Cloudflare Pages using Workers runtime. Full-stack dev with file-based routing.

## File-Based Routing

```
/functions
  ├── index.js              → /
  ├── api.js                → /api
  ├── users/
  │   ├── index.js          → /users/
  │   ├── [user].js         → /users/:user
  │   └── [[catchall]].js   → /users/*
  └── _middleware.js        → runs on all routes
```

**Rules:**
- `index.js` → directory root
- Trailing slash optional
- Specific routes precede catch-alls
- Falls back to static if no match

## Dynamic Routes

**Single segment** `[param]` → string:
```js
// /functions/users/[user].js
export function onRequest(context) {
  return new Response(`Hello ${context.params.user}`);
}
// Matches: /users/nevi
```

**Multi-segment** `[[param]]` → array:
```js
// /functions/users/[[catchall]].js
export function onRequest(context) {
  return new Response(JSON.stringify(context.params.catchall));
}
// Matches: /users/nevi/foobar → ["nevi", "foobar"]
```

## Key Features

- **Method handlers:** `onRequestGet`, `onRequestPost`, etc.
- **Middleware:** `_middleware.js` for cross-cutting concerns
- **Bindings:** KV, D1, R2, Durable Objects, Workers AI, Service bindings
- **TypeScript:** Full type support via `@cloudflare/workers-types`
- **Advanced mode:** Use `_worker.js` for custom routing logic

## See Also

- [configuration.md](./configuration.md) - Routes, headers, redirects, wrangler config
- [api.md](./api.md) - EventContext, handlers, bindings
- [patterns.md](./patterns.md) - Auth, CORS, rate limiting, forms, caching
- [gotchas.md](./gotchas.md) - Common issues, debugging, limits
