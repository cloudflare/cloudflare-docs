# Smart Placement Configuration

## wrangler.toml Setup

```toml
# Basic Smart Placement
[placement]
mode = "smart"

# With placement hint (preferred region)
[placement]
mode = "smart"
hint = "wnam"  # West North America
```

## wrangler.json/wrangler.jsonc

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "placement": {
    "mode": "smart",
    "hint": "wnam"  // Optional region hint
  }
}
```

## Placement Mode Values

- `"smart"` - Enable Smart Placement optimization
- Not specified - Default behavior (run at edge closest to user)

## Placement Hints

Optional region hints guide Smart Placement decisions:
- `"wnam"` - West North America
- `"enam"` - East North America  
- `"weur"` - Western Europe
- `"eeur"` - Eastern Europe
- `"apac"` - Asia Pacific

**Note:** Hints are suggestions, not guarantees. Smart Placement makes final decision based on performance data.

## Frontend + Backend Split Configuration

### Frontend Worker (No Smart Placement)

```toml
# frontend-worker/wrangler.toml
name = "frontend"
main = "frontend-worker.ts"

# No [placement] - runs at edge

[[services]]
binding = "BACKEND"
service = "backend-api"
```

### Backend Worker (Smart Placement Enabled)

```toml
# backend-api/wrangler.toml
name = "backend-api"
main = "backend-worker.ts"

[placement]
mode = "smart"

[[d1_databases]]
binding = "DATABASE"
database_id = "xxx"
```

## Requirements & Limitations

### Requirements
- **Wrangler version:** 2.20.0+
- **Analysis time:** Up to 15 minutes
- **Traffic requirements:** Consistent multi-location traffic
- **Workers plan:** All plans (Free, Paid, Enterprise)

### What Smart Placement Affects
- ✅ **Affects:** `fetch` event handlers only
- ❌ **Does NOT affect:** RPC methods, named entrypoints, Workers without fetch handlers

### Baseline Traffic
Smart Placement automatically routes 1% of requests WITHOUT optimization as baseline for performance comparison.

## Dashboard Configuration

**Enable via Dashboard:**
1. Navigate to **Workers & Pages** in Cloudflare dashboard
2. Select your Worker
3. Go to **Settings** → **General**
4. Under **Placement**, select **Smart**
5. Wait 15 minutes for analysis
6. Check **Metrics** tab for request duration charts

## TypeScript Environment Types

```typescript
interface Env {
  // Backend Worker binding (Smart Placement enabled)
  BACKEND: Fetcher;
  DATABASE: D1Database;
  CACHE: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const data = await env.DATABASE.prepare('SELECT * FROM table').all();
    return Response.json(data);
  }
} satisfies ExportedHandler<Env>;
```

## Local Development

```bash
# Smart Placement does NOT affect local development
wrangler dev

# Local dev always runs in single location
# Test Smart Placement by deploying to staging
wrangler deploy --env staging
```

Smart Placement only activates in production deployments.
