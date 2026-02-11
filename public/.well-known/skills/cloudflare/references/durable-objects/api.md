# Durable Objects API

## Class Structure

```typescript
import { DurableObject } from "cloudflare:workers";

export class MyDO extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    // Initialize storage/run migrations before any requests
    ctx.blockConcurrencyWhile(async () => {
      await this.migrate();
    });
  }
  async myMethod(arg: string): Promise<string> { return arg; }
  async alarm() { }
  async webSocketMessage(ws: WebSocket, msg: string | ArrayBuffer) { }
}
```

## Concurrency Model

### Input/Output Gates

DOs are single-threaded but async/await allows request interleaving. The runtime uses **gates** to prevent data races:

**Input gates** block new events while synchronous JS executes. Awaiting async ops opens the gate, allowing interleaving. Storage operations provide special protection.

**Output gates** hold outgoing network messages until pending storage writes complete—clients never see confirmation of unpersisted data.

### Write Coalescing

Multiple storage writes without intervening `await` are automatically batched into a single atomic transaction:

```typescript
async transfer(fromId: string, toId: string, amount: number) {
  // All three writes commit together atomically
  this.ctx.storage.sql.exec("UPDATE accounts SET balance = balance - ? WHERE id = ?", amount, fromId);
  this.ctx.storage.sql.exec("UPDATE accounts SET balance = balance + ? WHERE id = ?", amount, toId);
  this.ctx.storage.sql.exec("INSERT INTO transfers (from_id, to_id, amount) VALUES (?, ?, ?)", fromId, toId, amount);
}
```

### blockConcurrencyWhile()

Guarantees no other events process until callback completes. **Use sparingly**—only for initialization/migrations.

```typescript
constructor(ctx: DurableObjectState, env: Env) {
  super(ctx, env);
  ctx.blockConcurrencyWhile(async () => {
    const version = this.ctx.storage.sql.exec<{ version: number }>("PRAGMA user_version").one()?.version ?? 0;
    if (version < 1) {
      this.ctx.storage.sql.exec(`CREATE TABLE IF NOT EXISTS data (...); PRAGMA user_version = 1;`);
    }
  });
}
```

**Anti-pattern**: Using `blockConcurrencyWhile()` on every request or across I/O (fetch, KV, R2) severely degrades throughput. For regular requests, rely on input/output gates and write coalescing.

### Optimistic Locking (Non-Storage I/O)

Input gates only protect during storage ops. External I/O like `fetch()` allows interleaving. Use check-and-set:

```typescript
async updateFromExternal(key: string) {
  const version = this.ctx.storage.sql.exec<{ v: number }>("SELECT version as v FROM data WHERE key = ?", key).one()?.v;
  const externalData = await fetch("https://api.example.com/data");  // Other requests can interleave here
  const newVersion = this.ctx.storage.sql.exec<{ v: number }>("SELECT version as v FROM data WHERE key = ?", key).one()?.v;
  
  if (version !== newVersion) throw new Error("Concurrent modification");
  this.ctx.storage.sql.exec("UPDATE data SET value = ?, version = version + 1 WHERE key = ?", await externalData.text(), key);
}
```

## SQLite Storage

```typescript
// Query
const cursor = this.ctx.storage.sql.exec("SELECT * FROM users WHERE age > ?", 18);
cursor.toArray()          // All rows
cursor.one()              // 1 row or throw
cursor.raw().toArray()    // [[1, 'Alice']]
cursor.rowsRead, cursor.rowsWritten, cursor.columnNames
this.ctx.storage.sql.databaseSize

// Schema
this.ctx.storage.sql.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");
```

## KV Storage

```typescript
// Sync (SQLite only)
this.ctx.storage.kv.get/put/delete("key", value)
this.ctx.storage.kv.list({ prefix: "user:" })

// Async
await this.ctx.storage.get/put/delete("key", value)
await this.ctx.storage.put({ k1: "a", k2: "b" })  // Batch 128 max
await this.ctx.storage.list({ prefix: "user:", start: "user:100", limit: 50 })
await this.ctx.storage.deleteAll()
```

## Transactions

```typescript
// Sync
this.ctx.storage.transactionSync(() => { /* SQL ops */ });

// Async
await this.ctx.storage.transaction(async (txn) => {
  await txn.get/put/delete("key", value);  // Throw to rollback
});
```

## Point-in-Time Recovery

```typescript
await this.ctx.storage.getCurrentBookmark()
await this.ctx.storage.getBookmarkForTime(Date.now() - 86400000)
await this.ctx.storage.onNextSessionRestoreBookmark(bookmark)  // Call ctx.abort() after
```

## Alarms

```typescript
await this.ctx.storage.setAlarm(Date.now() + 3600000)
await this.ctx.storage.getAlarm()
await this.ctx.storage.deleteAlarm()
async alarm() { /* runs when fires */ }
```

## WebSockets

```typescript
async fetch(req: Request): Promise<Response> {
  const [client, server] = Object.values(new WebSocketPair());
  this.ctx.acceptWebSocket(server, ["room:123"]);
  server.serializeAttachment({ userId: "abc" });
  return new Response(null, { status: 101, webSocket: client });
}

async webSocketMessage(ws: WebSocket, msg: string | ArrayBuffer) {
  const data = ws.deserializeAttachment();
  for (const c of this.ctx.getWebSockets()) c.send(msg);
}

// Management: getWebSockets(), getTags(ws), ws.send/close()
```
