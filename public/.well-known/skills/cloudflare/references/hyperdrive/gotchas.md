# Gotchas

See [README.md](./README.md), [configuration.md](./configuration.md), [api.md](./api.md), [patterns.md](./patterns.md).

## Limits

**Config:**
| Limit | Free | Paid |
|-------|------|------|
| Max configs | 10 | 25 |
| Username/DB name | 63 bytes | 63 bytes |

**Connections:**
| Limit | Free | Paid |
|-------|------|------|
| Connection timeout | 15s | 15s |
| Idle timeout | 10min | 10min |
| Max origin connections | ~20 | ~100 |

**Queries:**
| Limit | Value |
|-------|-------|
| Max duration | 60s |
| Max cached response | 50MB |

**Note:** Queries >60s terminated. Responses >50MB returned but not cached.

## Common Errors

```typescript
try {
  const result = await client.query("SELECT * FROM users");
} catch (error: any) {
  const msg = error.message || "";

  // Pool exhausted
  if (msg.includes("Failed to acquire a connection")) {
    console.error("Pool exhausted - long transactions?");
    return new Response("Service busy", {status: 503});
  }

  // Connection refused
  if (msg.includes("connection_refused")) {
    console.error("DB refusing - firewall/limits?");
    return new Response("DB unavailable", {status: 503});
  }

  // Timeout
  if (msg.includes("timeout") || msg.includes("deadline exceeded")) {
    console.error("Query timeout - exceeded 60s");
    return new Response("Query timeout", {status: 504});
  }

  // Auth failure
  if (msg.includes("password authentication failed")) {
    console.error("Auth failed - check credentials");
    return new Response("Config error", {status: 500});
  }

  // SSL/TLS
  if (msg.includes("SSL") || msg.includes("TLS")) {
    console.error("TLS issue - check sslmode");
    return new Response("Connection security error", {status: 500});
  }

  console.error("Unknown DB error:", error);
  return new Response("Internal error", {status: 500});
}
```

## Monitor Connections

**PostgreSQL:**
```sql
-- Show Hyperdrive connections
SELECT usename, application_name, client_addr, state
FROM pg_stat_activity 
WHERE application_name = 'Cloudflare Hyperdrive';

-- Count active
SELECT COUNT(*) FROM pg_stat_activity WHERE application_name = 'Cloudflare Hyperdrive';
```

## Troubleshooting

**Connection refused:**
1. Check firewall allows Cloudflare IPs
2. Verify DB listening on port
3. Confirm service running
4. Check credentials

**Pool exhausted:**
1. Reduce transaction duration
2. Avoid long queries (>60s)
3. Don't hold connections during external calls
4. Upgrade to paid plan

**SSL/TLS failed:**
1. Add `sslmode=require` (Postgres) or `sslMode=REQUIRED` (MySQL)
2. Upload CA cert if self-signed
3. Verify DB has SSL enabled
4. Check cert expiry

**Queries not cached:**
1. Verify non-mutating (SELECT)
2. Check for volatile functions (NOW(), RANDOM())
3. Confirm caching not disabled
4. Use `wrangler dev --remote` to test
5. Check `prepare=true` for postgres.js

**Query timeout (>60s):**
1. Optimize with indexes
2. Reduce dataset (LIMIT)
3. Break into smaller queries
4. Use async processing

**Local DB connection:**
1. Verify `localConnectionString` correct
2. Check DB running
3. Confirm env var name matches binding
4. Test with psql/mysql client

**Env var not working:**
1. Format: `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING>`
2. Binding matches wrangler.jsonc
3. Variable exported in shell
4. Restart wrangler dev

## Migration Checklist

- [ ] Create config via Wrangler
- [ ] Add binding to wrangler.jsonc
- [ ] Enable `nodejs_compat` flag
- [ ] Set `compatibility_date` >= `2024-09-23`
- [ ] Update code to `env.HYPERDRIVE.connectionString` (Postgres) or properties (MySQL)
- [ ] Configure `localConnectionString`
- [ ] Set `prepare: true` (postgres.js) or `disableEval: true` (mysql2)
- [ ] Test locally with `wrangler dev`
- [ ] Deploy + monitor pool usage
- [ ] Validate cache with `wrangler dev --remote`
- [ ] Update firewall (Cloudflare IPs)
- [ ] Configure observability

## Supported Databases

**PostgreSQL:**
- PostgreSQL 11+
- CockroachDB, Timescale, Materialize
- Neon, Supabase

Recommended: `pg` >= 8.16.3

**MySQL:**
- MySQL 5.7+
- PlanetScale

Recommended: `mysql2` >= 3.13.0

**SSL/TLS:**
- PostgreSQL `sslmode`: `require`, `verify-ca`, `verify-full`
- MySQL `sslMode`: `REQUIRED`, `VERIFY_CA`, `VERIFY_IDENTITY`

## When NOT to Use

❌ Write-heavy workloads (limited cache benefit)
❌ Real-time data requirements (<1s freshness)
❌ Single-region apps close to DB
❌ Very simple apps (overhead unjustified)
❌ DB with strict connection limits already exceeded

**Alternatives:**
- D1 - Cloudflare native distributed SQL
- Durable Objects - Stateful Workers
- KV - Global key-value
- R2 - Object storage

## Resources

- [Docs](https://developers.cloudflare.com/hyperdrive/)
- [Getting Started](https://developers.cloudflare.com/hyperdrive/get-started/)
- [Wrangler Reference](https://developers.cloudflare.com/hyperdrive/reference/wrangler-commands/)
- [Supported DBs](https://developers.cloudflare.com/hyperdrive/reference/supported-databases-and-features/)
- [Discord #hyperdrive](https://discord.cloudflare.com)
- [Limit Increase Form](https://forms.gle/ukpeZVLWLnKeixDu7)
