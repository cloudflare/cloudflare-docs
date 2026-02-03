# D1 Configuration

## wrangler.toml Setup

```toml
name = "your-worker-name"; main = "src/index.ts"; compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"                    # Env variable name
database_name = "your-db-name"    # Human-readable name
database_id = "your-database-id"  # UUID from dashboard/CLI
migrations_dir = "migrations"     # Optional

# Multiple databases
[[d1_databases]]
binding = "ANALYTICS_DB"; database_name = "analytics-db"; database_id = "yyy-yyy-yyy"
```

## TypeScript Types

```typescript
interface Env { DB: D1Database; ANALYTICS_DB?: D1Database; }

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const result = await env.DB.prepare('SELECT * FROM users').all();
    return Response.json(result.results);
  }
}
```

## Migrations

File structure: `migrations/0001_initial_schema.sql`, `0002_add_posts.sql`, etc.

### Example Migration

```sql
-- migrations/0001_initial_schema.sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_published ON posts(published);
```

### Running Migrations

```bash
wrangler d1 execute <db-name> --local --file=./migrations/0001_schema.sql    # Local
wrangler d1 execute <db-name> --remote --file=./migrations/0001_schema.sql   # Production
wrangler d1 execute <db-name> --remote --command="SELECT * FROM users"      # Direct

# Track migrations: CREATE TABLE schema_version (version INT PRIMARY KEY, name TEXT, applied_at INT)
```

## Indexing Strategy

```sql
-- Index frequently queried columns
CREATE INDEX idx_users_email ON users(email);

-- Composite indexes for multi-column queries
CREATE INDEX idx_posts_user_published ON posts(user_id, published);

-- Covering indexes (include queried columns)
CREATE INDEX idx_users_email_name ON users(email, name);

-- Partial indexes for filtered queries
CREATE INDEX idx_active_users ON users(email) WHERE active = 1;

-- Check if query uses index
EXPLAIN QUERY PLAN SELECT * FROM users WHERE email = ?;
```

## Drizzle ORM

```typescript
// drizzle.config.ts
export default {
  schema: './src/schema.ts', out: './migrations', dialect: 'sqlite', driver: 'd1-http',
  dbCredentials: { accountId: process.env.CLOUDFLARE_ACCOUNT_ID!, databaseId: process.env.D1_DATABASE_ID!, token: process.env.CLOUDFLARE_API_TOKEN! }
} satisfies Config;

// schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull()
});

// worker.ts
import { drizzle } from 'drizzle-orm/d1';
import { users } from './schema';
export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.DB);
    return Response.json(await db.select().from(users));
  }
}
```

## Local Development

```bash
wrangler dev --persist-to=./.wrangler/state  # Persist across restarts
# Local DB: .wrangler/state/v3/d1/<database-id>.sqlite
sqlite3 .wrangler/state/v3/d1/<database-id>.sqlite  # Inspect
```
