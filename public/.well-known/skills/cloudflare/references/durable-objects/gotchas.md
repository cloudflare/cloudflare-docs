# Durable Objects Gotchas

## Limits

| Resource | Free | Paid |
|----------|------|------|
| Storage per DO | 10GB (SQLite) | 10GB (SQLite) |
| Total storage | 5GB | Unlimited |
| DO classes | 100 | 500 |
| Requests/sec/DO | ~1000 | ~1000 |
| CPU time | 30s default, 300s max | 30s default, 300s max |
| WebSocket message | 32MiB | 32MiB |
| SQL columns | 100 | 100 |
| SQL statement | 100KB | 100KB |
| Key+value size | 2MB | 2MB |

## Billing Gotchas

### Duration Billing Trap
DOs bill for **wall-clock time** while active, not CPU time. WebSocket open 8 hours = 8 hours duration billing, even if DO processed 50 small messages.

**Fix**: Use Hibernatable WebSockets API. DO sleeps while maintaining connections, only wakes (and bills) when messages arrive.

### storage.list() on Every Request
Storage reads are cheap but not free. Calling `storage.list()` or multiple `storage.get()` on every request adds up.

**Fix**: Profile actual usage. Options:
- `storage.get(['key1', 'key2', 'key3'])` - cheapest if only need specific keys
- `storage.list()` once on wake, cache in memory - cheapest if serving many requests per wake cycle
- Single `storage.get('allData')` with combined object - cheapest if often need multiple keys together

### Alarm Recursion
Scheduling `setAlarm()` every 5 minutes = 288 wake-ups/day × minimum billable duration. Across thousands of DOs, you're waking them all whether work exists or not.

**Fix**: Only schedule alarms when actual work is pending. Check if alarm is needed before setting.

### WebSocket Never Closes
If users close browser tabs without proper disconnect and you don't handle it, connection stays "open" from DO's perspective, preventing hibernation.

**Fix**:
1. Handle `webSocketClose` and `webSocketError` events
2. Implement heartbeat/ping-pong to detect dead connections
3. Use Hibernatable WebSockets API properly

### Singleton vs Sharding
Global singleton DO handling all traffic = bottleneck + continuous duration billing (never hibernates).

| Design | Cost Pattern |
|--------|--------------|
| One global DO | Never hibernates, continuous billing |
| Per-user DO | Each only wakes for their requests, most hibernate |
| Per-user-per-hour | Many cold starts, many minimum durations |

**Fix**: Use per-entity DOs (per-user, per-room, per-document). They hibernate between activity.

### Batching Reads
Five separate `storage.get()` calls > one `storage.get(['k1','k2','k3','k4','k5'])`. Each operation has overhead.

**Fix**: Batch reads/writes. Writes without intervening `await` are automatically coalesced into single atomic transaction.

### Hibernation State Loss
In-memory state is **lost** when DO hibernates or evicts. Waking DO reconstructs from storage.

**Fix**:
1. Store all important state in SQLite storage
2. Use `blockConcurrencyWhile()` in constructor to load state on wake
3. Cache in memory for current wake cycle only
4. Accept every wake is potentially "cold"

### Fan-Out Tax
Event notifying 1,000 DOs = 1,000 DO invocations billed immediately. Queue pattern doesn't reduce invocations but provides retries and batching.

**Fix**: For time-sensitive, accept cost. For deferrable, use Queues for retry/dead-letter handling.

### Idempotency Key Explosion
Creating one DO per idempotency key (used once) = millions of single-use DOs that persist until deleted.

**Fix**:
1. Hash idempotency keys into N sharded buckets
2. Store records as rows in single DO's SQLite table
3. Implement TTL cleanup via alarms
4. Consider if KV is sufficient (if strong consistency not needed)

### Storage Compaction
Individual writes billed per-operation. Writing 100 events individually = 100× the write operations vs batching.

**Fix**: Batch writes. Multiple `INSERT` statements without intervening `await` coalesce into single transaction.

### waitUntil() Behavior
`ctx.waitUntil()` keeps DO alive (billed) until promises resolve. Waiting for slow external calls = paying for wait time.

**Fix**: For true background work, use alarms or Queues instead of `waitUntil()`.

### KV vs DO Storage
For read-heavy, write-rare, eventually-consistent-OK data: **KV is cheaper**.

| | KV | DO Storage |
|-|----|----|
| Reads | Global edge cache, cheap | Every read hits DO compute |
| Writes | ~60s propagation | Immediate consistency |
| Use case | Config, sessions, cache | Read-modify-write, coordination |

## Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| DO overloaded (503) | Single DO bottleneck | Shard across DOs with random/deterministic IDs |
| Storage quota exceeded | Write failures | Upgrade plan or cleanup via alarms |
| CPU exceeded | Terminated mid-request | Increase `limits.cpu_ms` or chunk work |
| WebSockets disconnect | Eviction | Use hibernation + reconnection logic |
| Migration failed | Deploy error | Check tag uniqueness, class names, use `--dry-run` |
| RPC not found | Old compatibility_date | Update to >= 2024-04-03 or use fetch |
| One alarm limit | Need multiple timers | Use event queue pattern (store events, single alarm) |
| Constructor expensive | Slow cold starts | Lazy load in methods, cache after first load |

## RPC vs Fetch

| | RPC | Fetch |
|-|-----|-------|
| Type safety | Full TypeScript support | Manual parsing |
| Simplicity | Direct method calls | HTTP request/response |
| Performance | Slightly faster | HTTP overhead |
| Requirement | compatibility_date >= 2024-04-03 | Always works |
| Use case | **Default choice** | Legacy, proxying |

```typescript
// RPC (recommended)
const result = await stub.myMethod(arg);

// Fetch (legacy)
const response = await stub.fetch(new Request("http://do/endpoint"));
```

## Migration Gotchas

- Tags must be unique and sequential
- No rollback mechanism
- `deleted_classes` **destroys ALL data** permanently
- Test with `--dry-run` before production deploy
- Transfers between scripts need coordination
- Renames preserve data and IDs

## Debugging

```bash
npx wrangler dev              # Local development
npx wrangler dev --remote     # Test against production DOs
npx wrangler tail             # Stream logs
npx wrangler durable-objects list
npx wrangler durable-objects info <namespace> <id>
```

```typescript
// Storage diagnostics
this.ctx.storage.sql.databaseSize  // Current storage usage
cursor.rowsRead                    // Rows scanned
cursor.rowsWritten                 // Rows modified
```
