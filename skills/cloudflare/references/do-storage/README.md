# Cloudflare Durable Objects Storage

Persistent storage API for Durable Objects with SQLite and KV backends, PITR, and automatic concurrency control.

## Overview

DO Storage provides:
- SQLite-backed (recommended) or KV-backed
- SQL API + synchronous/async KV APIs
- Automatic input/output gates (race-free)
- 30-day point-in-time recovery (PITR)
- Transactions and alarms

**Use cases:** Stateful coordination, real-time collaboration, counters, sessions, rate limiters

## Quick Start

```typescript
export class Counter extends DurableObject {
  sql: SqlStorage;
  
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS data(key TEXT PRIMARY KEY, value INTEGER)');
  }
  
  async increment(): Promise<number> {
    this.sql.exec('INSERT OR REPLACE INTO data VALUES (?, ?) RETURNING value', 'counter', 
      (this.sql.exec('SELECT value FROM data WHERE key = ?', 'counter').one()?.value || 0) + 1);
  }
}
```

## Storage Backends

| Backend | Create Method | APIs | PITR |
|---------|---------------|------|------|
| SQLite (recommended) | `new_sqlite_classes` | SQL + sync KV + async KV | ✅ |
| KV (legacy) | `new_classes` | async KV only | ❌ |

## Core APIs

- **SQL API** (`ctx.storage.sql`): Full SQLite with extensions (FTS5, JSON, math)
- **Sync KV** (`ctx.storage.kv`): Synchronous key-value (SQLite only)
- **Async KV** (`ctx.storage`): Asynchronous key-value (both backends)
- **Transactions** (`transactionSync()`, `transaction()`)
- **PITR** (`getBookmarkForTime()`, `onNextSessionRestoreBookmark()`)
- **Alarms** (`setAlarm()`, `alarm()` handler)

## In This Reference

- [configuration.md](./configuration.md) - wrangler.jsonc migrations, SQLite vs KV setup
- [api.md](./api.md) - SQL exec/cursors, KV methods, transactions, alarms, PITR
- [patterns.md](./patterns.md) - Schema migrations, caching, rate limiting, batch processing
- [gotchas.md](./gotchas.md) - Concurrency gates, transaction rules, SQL limits, async pitfalls

## See Also

- [durable-objects](../durable-objects/) - DO fundamentals and coordination patterns
- [workers](../workers/) - Worker runtime for DO stubs
- [d1](../d1/) - Shared database alternative to per-DO storage
