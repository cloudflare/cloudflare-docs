# Gotchas & Best Practices

## State
DO: `setState()` (auto-syncs), serializable, limit size | DON'T: Mutate directly, large objects (SQL), functions/circular
```ts
// ❌ this.state.count++ | ✅ this.setState({...this.state, count: this.state.count + 1})
```

## SQL
DO: Parameterized, create in `onStart()`, types | DON'T: Direct interpolation, assume exists
```ts
// ❌ this.sql`...WHERE id = '${userId}'` | ✅ this.sql`...WHERE id = ${userId}`
```

## WebSocket
DO: `conn.accept()`, errors, cleanup | DON'T: Forget accept (timeout), assume persist, sensitive in state
```ts
async onConnect(conn: Connection, ctx: ConnectionContext) { conn.accept(); conn.setState({userId: "123"}); }
```

## Scheduling
1000 tasks/agent, 1min min, persist. Clean old, descriptive names, handle failures
```ts
async checkSchedules() { if ((await this.getSchedules()).length > 800) console.warn("Near limit!"); }
```

## AI
Optimize: AI Gateway cache, rate limit, stream | Error: try/catch, fallback, quota/timeout
```ts
try { return await this.env.AI.run(model, {prompt}); } catch (e) { return {error: "Unavailable"}; }
```

## Perf
State: Batch `setState()`, low-freq, SQL for large | Conns: Limit broadcast, selective, backpressure

## Debug
`npx wrangler dev` (local), `npx wrangler tail` (remote)
Issues: "Agent not found" (DO binding), State not sync (`setState()`), Timeout (`conn.accept()`), SQL (create in `onStart()`)

## Security
DO: Validate, sanitize, auth WS, env secrets | DON'T: Trust headers, expose sensitive, unauth
```ts
async onConnect(conn: Connection, ctx: ConnectionContext) {
  const token = ctx.request.headers.get("Authorization");
  if (!await this.validateToken(token)) { conn.close(4001, "Unauthorized"); return; }
  conn.accept();
}
```

## Limits
CPU: 30s/req, Mem: 128MB/inst, Storage: SQL shares DO quota, Conns: no limit (watch mem), Schedules: 1000/agent

## Migration
`new_sqlite_classes`, test staging, no downgrade w/SQL, careful state
```toml
[[migrations]]
tag = "v1"
new_sqlite_classes = ["MyAgent"]
```
