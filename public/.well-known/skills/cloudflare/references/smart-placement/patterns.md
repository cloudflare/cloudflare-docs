# Smart Placement Patterns

## Backend Worker with Database Access

```typescript
// Smart Placement runs close to database - multiple round trips benefit
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const user = await env.DATABASE.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
    const orders = await env.DATABASE.prepare('SELECT * FROM orders WHERE user_id = ?').bind(userId).all();
    return Response.json({ user, orders });
  }
};
```

```toml
name = "backend-api"; [placement]; mode = "smart"; [[d1_databases]]; binding = "DATABASE"
```

## Frontend + Backend Split

**Frontend (no Smart Placement):** Runs at edge for fast user response
**Backend (Smart Placement):** Runs close to database

```typescript
// Frontend - forwards API requests to backend
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname.startsWith('/api/')) return env.BACKEND.fetch(request);
    return env.ASSETS.fetch(request);
  }
};

// Backend - database operations
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return Response.json(await env.DATABASE.prepare('SELECT * FROM table').all());
  }
};
```

## External API Integration

```typescript
// Smart Placement runs closer to external API - multiple calls benefit
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const apiUrl = 'https://api.partner.com';
    const headers = { 'Authorization': `Bearer ${env.API_KEY}` };
    const [profile, transactions] = await Promise.all([
      fetch(`${apiUrl}/profile`, { headers }),
      fetch(`${apiUrl}/transactions`, { headers })
    ]);
    return Response.json({ profile: await profile.json(), transactions: await transactions.json() });
  }
};
```

```toml
[placement]; mode = "smart"; hint = "enam"  # If API in East North America
```

## Multi-Service Aggregation

```typescript
// Aggregates data from multiple services in same region
export default {
  async fetch(request: Request, env: Env) {
    const [orders, inventory, shipping] = await Promise.all([
      fetch('https://orders.internal.api'), fetch('https://inventory.internal.api'), fetch('https://shipping.internal.api')
    ]);
    return Response.json({ orders: await orders.json(), inventory: await inventory.json(), shipping: await shipping.json() });
  }
};
```

## SSR with Backend Data

```typescript
// Frontend SSR (edge) - render close to user
export default {
  async fetch(request: Request, env: Env) {
    const data = await env.BACKEND.fetch('/api/page-data');
    return new Response(renderPage(await data.json()), { headers: { 'Content-Type': 'text/html' } });
  }
};

// Backend (Smart Placement) - fetch data close to database
export default {
  async fetch(request: Request, env: Env) {
    return Response.json(await env.DATABASE.prepare('SELECT * FROM pages WHERE id = ?').bind(pageId).first());
  }
};
```

## API Gateway

```typescript
// Gateway at edge - quick auth, forward to backend
export default {
  async fetch(request: Request, env: Env) {
    if (!request.headers.get('Authorization')) return new Response('Unauthorized', { status: 401 });
    return env.BACKEND_API.fetch(request);
  }
};

// Backend with Smart Placement - heavy DB operations
export default {
  async fetch(request: Request, env: Env) {
    return Response.json(await performDatabaseOperations(env.DATABASE));
  }
};
```

## Best Practices

1. **Split Full-Stack Apps:** Frontend at edge, backend with Smart Placement
2. **Use Service Bindings:** Connect frontend/backend Workers efficiently
3. **Monitor Request Duration:** Compare before/after metrics
4. **Enable for Backend Logic:** APIs, data aggregation, server-side processing
5. **Don't Enable for Pure Edge:** Auth, redirects, static content
6. **Test Before Production:** Deploy to staging, verify metrics
7. **Consider Placement Hints:** Guide Smart Placement if you know backend location
8. **Wait for Analysis:** 15+ minutes after enabling
9. **Check Placement Status:** Verify `SUCCESS` via API
10. **Combine with Caching:** Cache frequently accessed data

## Anti-Patterns

❌ **Enabling on static content Workers**
❌ **Monolithic full-stack Worker with Smart Placement** (hurts frontend performance)
❌ **Not monitoring placement status** after deploy

✅ **Split architecture:** Frontend (edge) + Backend (Smart Placement)
✅ **Verify status** via API and metrics
