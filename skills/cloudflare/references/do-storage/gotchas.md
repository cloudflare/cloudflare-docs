# DO Storage Gotchas & Troubleshooting

## Concurrency Gates

**Input gate:** No new events while storage op pending (except storage completions)
**Output gate:** Network messages held until storage writes confirm

```typescript
// ✅ NO RACE: Auto serialization
async getUniqueNumber() {
  let val = await this.ctx.storage.get("counter"); // Other requests blocked
  await this.ctx.storage.put("counter", val + 1);
  return val;
}

// ❌ RACE: Concurrent calls from same event
async handler() {
  const [v1, v2] = await Promise.all([this.getUniqueNumber(), this.getUniqueNumber()]); // v1 === v2!
}

// ✅ SAFE: Response waits for write confirm; if write fails, response discarded & restart
async increment() {
  let val = await this.ctx.storage.get("counter");
  this.ctx.storage.put("counter", val + 1); // Don't await
  return new Response(String(val));
}
```

## Transaction Rules

```typescript
// ❌ WRONG: Direct SQL statements
this.sql.exec('BEGIN TRANSACTION');

// ✅ CORRECT: Use transactionSync() or async transaction()
this.ctx.storage.transactionSync(() => { this.sql.exec('UPDATE ...'); });
await this.ctx.storage.transaction(async () => { await this.ctx.storage.put("key", value); });

// ❌ WRONG: Async in transactionSync
this.ctx.storage.transactionSync(async () => { await fetch(...); }); // Error!
```

## Limits

**SQL:** Max cols/table: 100; string/BLOB/row: 2MB; statement: 100KB; params: 100; LIKE/GLOB: 50B
**Storage:** SQLite: 10GB/object, 2MB key+value; KV: Unlimited storage, key 2KiB, value 128KiB

## TypeScript Type Safety

```typescript
// ❌ Types don't validate at runtime
type User = { id: number; name: string };
const user = this.sql.exec<User>('SELECT id FROM users WHERE id = ?', id).one(); // Only has { id }!

// ✅ Query must match type
const user = this.sql.exec<User>('SELECT id, name FROM users WHERE id = ?', id).one();
```

## Alarm Persistence

```typescript
// ❌ deleteAll() doesn't delete alarms
await this.ctx.storage.deleteAll(); // Alarm remains!

// ✅ Delete alarm explicitly
await this.ctx.storage.deleteAlarm();
await this.ctx.storage.deleteAll();
```

## Auto Caching & Bypass

```typescript
// Built-in cache makes simple code fast
async getUniqueNumber() {
  let val = await this.ctx.storage.get("counter"); // Cached after first
  await this.ctx.storage.put("counter", val + 1);  // Instant cache write
  return val;
}

// Bypass opts: allowConcurrency, noCache, allowUnconfirmed
await this.ctx.storage.get("key", { allowConcurrency: true, noCache: true });
```

## Common Errors & Best Practices

**Slow perf:** Use sync KV API (`ctx.storage.kv`) vs async  
**Races:** Check concurrent calls from same event (not protected)  
**High billing:** Check `rowsRead`/`rowsWritten`; verify unused objects call `deleteAll()`  
**Overload:** Single DO soft limit ~1K req/sec; shard

**Do:** Use SQLite-backed; sync KV for simple key-value; don't await writes unnecessarily (output gate protects); use `blockConcurrencyWhile()` for init; delete alarms AND storage when cleaning

**Don't:** Use SQL transaction statements directly; initiate concurrent storage ops from same event; assume TypeScript types validate at runtime
