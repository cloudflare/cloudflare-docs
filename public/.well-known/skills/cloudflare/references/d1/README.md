# Cloudflare D1 Database

Expert guidance for Cloudflare D1, a serverless SQLite database designed for horizontal scale-out across multiple databases.

## Overview

D1 is Cloudflare's managed, serverless database with:
- SQLite SQL semantics and compatibility
- Built-in disaster recovery via Time Travel (30-day point-in-time recovery)
- Horizontal scale-out architecture (10 GB per database)
- Worker and HTTP API access
- Pricing based on query and storage costs only

**Architecture Philosophy**: D1 is optimized for per-user, per-tenant, or per-entity database patterns rather than single large databases.

## Quick Start

```bash
# Create database
wrangler d1 create <database-name>

# Execute migration
wrangler d1 execute <db-name> --remote --file=./migrations/0001_schema.sql

# Local development
wrangler dev
```

## Core Query Methods

```typescript
// .all() - Returns all rows; .first() - First row or null; .first(col) - Single column value
// .run() - INSERT/UPDATE/DELETE; .raw() - Array of arrays (efficient)
const { results, success, meta } = await env.DB.prepare('SELECT * FROM users WHERE active = ?').bind(true).all();
const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
```

## Batch Operations

```typescript
// Multiple queries in single round trip (atomic transaction)
const results = await env.DB.batch([
  env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(1),
  env.DB.prepare('SELECT * FROM posts WHERE author_id = ?').bind(1),
  env.DB.prepare('UPDATE users SET last_access = ? WHERE id = ?').bind(Date.now(), 1)
]);
```

## Platform Limits

| Limit | Value |
|-------|-------|
| Database size | 10 GB per database |
| Row size | 1 MB maximum |
| Query timeout | 30 seconds |
| Batch size | 10,000 statements |
| Time Travel retention | 30 days |

## CLI Commands

```bash
# Database management
wrangler d1 create <db-name>
wrangler d1 list
wrangler d1 delete <db-name>

# Execute queries
wrangler d1 execute <db-name> --remote --command="SELECT * FROM users"
wrangler d1 execute <db-name> --local --file=./migrations/0001_schema.sql

# Backups
wrangler d1 export <db-name> --remote --output=./backup.sql
wrangler d1 time-travel restore <db-name> --timestamp="2024-01-15T14:30:00Z"

# Development
wrangler dev --persist-to=./.wrangler/state
```

## In This Reference

- [configuration.md](./configuration.md) - wrangler.toml setup, TypeScript types, binding configuration
- [api.md](./api.md) - D1Database API, prepared statements, batch operations, testing
- [patterns.md](./patterns.md) - Pagination, bulk operations, caching, multi-tenant patterns
- [gotchas.md](./gotchas.md) - SQL injection prevention, error handling, performance pitfalls

## See Also

- [workers](../workers/) - Worker runtime and fetch handler patterns
- [kv](../kv/) - Workers KV for caching D1 results
- [r2](../r2/) - R2 for storing binary data instead of D1 BLOBs
- [queues](../queues/) - Queue writes to D1 for high-throughput scenarios
- [durable-objects](../durable-objects/) - Coordinate D1 writes with strong consistency
