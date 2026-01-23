# Hyperdrive

Accelerates database queries from Workers via connection pooling, edge setup, query caching.

## Key Features

- **Connection Pooling**: Persistent connections eliminate TCP/TLS/auth handshakes (~7 round-trips)
- **Edge Setup**: Connection negotiation at edge, pooling near origin
- **Query Caching**: Auto-cache non-mutating queries (default 60s TTL)
- **Support**: PostgreSQL, MySQL + compatibles (CockroachDB, Timescale, PlanetScale, Neon, Supabase)

## Architecture

```
Worker → Edge (setup) → Pool (near DB) → Origin
         ↓ cached reads
         Cache
```

## Quick Start

```bash
# Create config
npx wrangler hyperdrive create my-db \
  --connection-string="postgres://user:pass@host:5432/db"

# wrangler.jsonc
{
  "compatibility_flags": ["nodejs_compat"],
  "hyperdrive": [{"binding": "HYPERDRIVE", "id": "<ID>"}]
}
```

```typescript
import { Client } from "pg";

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const client = new Client({
      connectionString: env.HYPERDRIVE.connectionString,
    });
    await client.connect();
    const result = await client.query("SELECT * FROM users WHERE id = $1", [123]);
    await client.end();
    return Response.json(result.rows);
  },
};
```

## When to Use

✅ Global access to single-region DBs, high read ratios, popular queries, connection-heavy loads
❌ Write-heavy, real-time data (<1s), single-region apps close to DB

## See Also

- [configuration.md](./configuration.md) - Setup, wrangler config
- [api.md](./api.md) - Binding APIs, query patterns
- [patterns.md](./patterns.md) - Use cases, ORMs
- [gotchas.md](./gotchas.md) - Limits, troubleshooting

[Docs](https://developers.cloudflare.com/hyperdrive/) | [Discord #hyperdrive](https://discord.cloudflare.com)
