# Patterns

See [README.md](./README.md), [configuration.md](./configuration.md), [api.md](./api.md).

## High-Traffic Read-Heavy

```typescript
const sql = postgres(env.HYPERDRIVE.connectionString, {max: 5, prepare: true});

// Cacheable: popular content
const posts = await sql`SELECT * FROM posts WHERE published = true ORDER BY views DESC LIMIT 20`;

// Cacheable: user profiles
const [user] = await sql`SELECT id, username, bio FROM users WHERE id = ${userId}`;
```

**Benefits:** Trending/profiles cached (60s), connection pooling handles spikes.

## Mixed Read/Write

```typescript
interface Env {
  HYPERDRIVE_CACHED: Hyperdrive;    // max_age=120
  HYPERDRIVE_REALTIME: Hyperdrive;  // caching disabled
}

// Reads: cached
if (req.method === "GET") {
  const sql = postgres(env.HYPERDRIVE_CACHED.connectionString, {prepare: true});
  const products = await sql`SELECT * FROM products WHERE category = ${cat}`;
}

// Writes: no cache (immediate consistency)
if (req.method === "POST") {
  const sql = postgres(env.HYPERDRIVE_REALTIME.connectionString, {prepare: true});
  await sql`INSERT INTO orders ${sql(data)}`;
}
```

## Analytics Dashboard

```typescript
const client = new Client({connectionString: env.HYPERDRIVE.connectionString});
await client.connect();

// Aggregate queries cached
const dailyStats = await client.query(`
  SELECT DATE(created_at) as date, COUNT(*) as orders, SUM(amount) as revenue
  FROM orders WHERE created_at >= NOW() - INTERVAL '30 days'
  GROUP BY DATE(created_at) ORDER BY date DESC
`);

const topProducts = await client.query(`
  SELECT p.name, COUNT(oi.id) as count, SUM(oi.quantity * oi.price) as revenue
  FROM order_items oi JOIN products p ON oi.product_id = p.id
  WHERE oi.created_at >= NOW() - INTERVAL '7 days'
  GROUP BY p.id, p.name ORDER BY revenue DESC LIMIT 10
`);
```

**Benefits:** Expensive aggregations cached, dashboard instant, reduced DB load.

## Multi-Tenant

```typescript
const tenantId = req.headers.get("X-Tenant-ID");
const sql = postgres(env.HYPERDRIVE.connectionString, {prepare: true});

// Tenant-scoped queries cached separately
const docs = await sql`
  SELECT * FROM documents 
  WHERE tenant_id = ${tenantId} AND deleted_at IS NULL
  ORDER BY updated_at DESC LIMIT 50
`;
```

**Benefits:** Per-tenant caching, shared connection pool, protects DB from multi-tenant load.

## Geographically Distributed

```typescript
// Worker runs at edge nearest user
// Connection setup at edge (fast), pooling near DB (efficient)
const sql = postgres(env.HYPERDRIVE.connectionString, {prepare: true});
const [user] = await sql`SELECT * FROM users WHERE id = ${userId}`;

return Response.json({
  user,
  serverRegion: req.cf?.colo,  // Edge location
});
```

**Benefits:** Edge setup + DB pooling = global → single-region DB without replication.

## Connection Pooling

Operates in **transaction mode**: connection acquired per transaction, `RESET` on return.

**SET statements:**
```typescript
// ✅ Within transaction
await client.query("BEGIN");
await client.query("SET work_mem = '256MB'");
await client.query("SELECT * FROM large_table");  // Uses SET
await client.query("COMMIT");  // RESET after

// ✅ Single statement
await client.query("SET work_mem = '256MB'; SELECT * FROM large_table");

// ❌ Across queries (may get different connection)
await client.query("SET work_mem = '256MB'");
await client.query("SELECT * FROM large_table");  // SET not applied
```

**Best practices:**
```typescript
// ❌ Long transactions block pooling
await client.query("BEGIN");
await processThousands();  // Connection held entire time
await client.query("COMMIT");

// ✅ Short transactions
await client.query("BEGIN");
await client.query("UPDATE users SET status = $1 WHERE id = $2", [status, id]);
await client.query("COMMIT");

// ✅ SET LOCAL within transaction
await client.query("BEGIN");
await client.query("SET LOCAL work_mem = '256MB'");
await client.query("SELECT * FROM large_table");
await client.query("COMMIT");
```

## Performance Tips

**1. Enable prepared statements:**
```typescript
// ✅ Best
const sql = postgres(connectionString, {prepare: true});  // Caching enabled

// ❌ Slower
const sql = postgres(connectionString, {prepare: false}); // Extra round-trips
```

**2. Optimize settings:**
```typescript
const sql = postgres(connectionString, {
  max: 5,             // Limit per Worker
  fetch_types: false, // Skip if not using arrays
  prepare: true,
  idle_timeout: 60,   // Match Worker lifetime
});
```

**3. Cache-friendly queries:**
```typescript
// ✅ Cacheable (deterministic)
await sql`SELECT * FROM products WHERE category = 'electronics' LIMIT 10`;

// ❌ Not cacheable (volatile)
await sql`SELECT * FROM logs WHERE created_at > NOW()`;

// ✅ Make cacheable (parameterize)
const ts = Date.now();
await sql`SELECT * FROM logs WHERE created_at > ${ts}`;
```

**4. Monitor cache hits:**
```typescript
const start = Date.now();
const result = await sql`SELECT * FROM users LIMIT 10`;
const duration = Date.now() - start;
console.log({duration, likelyCached: duration < 10});  // <10ms = cache hit
```

See [gotchas.md](./gotchas.md) for limits, troubleshooting.
