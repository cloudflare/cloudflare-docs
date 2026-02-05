# D1 Gotchas & Troubleshooting

## SQL Injection Prevention (CRITICAL)

```typescript
// ❌ NEVER: String interpolation - SQL injection vulnerability
await env.DB.prepare(`SELECT * FROM users WHERE id = ${userId}`).all(); // DANGEROUS!

// ✅ ALWAYS: Prepared statements with bind()
await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).all();
```

Attacker could pass `1 OR 1=1` to dump table or `1; DROP TABLE users;--` to delete data.

## Common Errors

**Missing Table:** "no such table" → Run migrations first  
**Unique Constraint:** "UNIQUE constraint failed" → Catch and return 409  
**Query Timeout:** 30s exceeded → Break into smaller queries or add indexes

## N+1 Query Problem

```typescript
// ❌ BAD: N+1 queries (multiple round trips)
for (const post of posts.results) {
  const author = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(post.user_id).first();
}

// ✅ GOOD: Single JOIN or batch()
const postsWithAuthors = await env.DB.prepare(`
  SELECT posts.*, users.name FROM posts JOIN users ON posts.user_id = users.id
`).all();
```

## Missing Indexes

```sql
EXPLAIN QUERY PLAN SELECT * FROM users WHERE email = ?;  -- Check for "USING INDEX"
CREATE INDEX idx_users_email ON users(email);  -- Add if missing
```

## Limits to Watch

| Limit | Value | Impact |
|-------|-------|--------|
| Database size | 10 GB | Design for multiple DBs per tenant |
| Row size | 1 MB | Store large files in R2, not D1 |
| Query timeout | 30s | Break long queries into smaller chunks |
| Batch size | 10,000 statements | Split large batches |

## Local vs Remote

Local uses `.wrangler/state/v3/d1/<database-id>.sqlite`. Always test migrations locally before remote.

## Data Types

**Boolean:** SQLite uses INTEGER (0/1) not boolean - bind 1 or 0, not true/false  
**Date/Time:** Use TEXT (ISO 8601) or INTEGER (unix timestamp), not native DATE/TIME

## Best Practices

- ✅ Use prepared statements with bind() - ALWAYS
- ✅ Create indexes on frequently queried columns
- ✅ Use batch() for multiple queries (reduces latency)
- ✅ Design for horizontal scaling (multiple small DBs vs single large DB)
- ✅ Test migrations locally before applying remotely
- ✅ Monitor query performance via meta.duration
- ❌ Don't store binary data directly (use R2 for blobs)
- ❌ Don't use single large database (scale horizontally instead)
- ❌ Don't run long transactions (30s timeout)
