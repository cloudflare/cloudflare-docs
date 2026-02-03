# Configuration

See [README.md](./README.md) for overview.

## Create Config

**PostgreSQL:**
```bash
# Basic
npx wrangler hyperdrive create my-db \
  --connection-string="postgres://user:pass@host:5432/db"

# Custom cache
npx wrangler hyperdrive create my-db \
  --connection-string="postgres://..." \
  --max-age=120 --swr=30

# No cache
npx wrangler hyperdrive create my-db \
  --connection-string="postgres://..." \
  --caching-disabled=true
```

**MySQL:**
```bash
npx wrangler hyperdrive create my-db \
  --connection-string="mysql://user:pass@host:3306/db"
```

## wrangler.jsonc

```jsonc
{
  "compatibility_date": "2024-09-23",
  "compatibility_flags": ["nodejs_compat"],
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "<HYPERDRIVE_ID>",
      "localConnectionString": "postgres://user:pass@localhost:5432/dev"
    }
  ]
}
```

**Multiple configs:**
```jsonc
{
  "hyperdrive": [
    {"binding": "HYPERDRIVE_CACHED", "id": "<ID1>"},
    {"binding": "HYPERDRIVE_NO_CACHE", "id": "<ID2>"}
  ]
}
```

## Management

```bash
npx wrangler hyperdrive list
npx wrangler hyperdrive get <ID>
npx wrangler hyperdrive update <ID> --max-age=180
npx wrangler hyperdrive delete <ID>
```

## Config Options

| Option | Default | Notes |
|--------|---------|-------|
| `--caching-disabled` | `false` | Disable caching |
| `--max-age` | `60` | Cache TTL (max 3600s) |
| `--swr` | `15` | Stale-while-revalidate |
| `--origin-connection-limit` | 20/100 | Free/paid |
| `--access-client-id` | - | Tunnel auth |
| `--access-client-secret` | - | Tunnel auth |
| `--sslmode` | `require` | PostgreSQL only |

## Private DB via Tunnel

```
Worker → Hyperdrive → Access → Tunnel → Private Network → DB
```

**Setup:**
```bash
# 1. Create tunnel
cloudflared tunnel create my-db-tunnel

# 2. Configure hostname in Zero Trust dashboard
#    Domain: db-tunnel.example.com
#    Service: TCP -> localhost:5432

# 3. Create service token (Zero Trust > Service Auth)
#    Save Client ID/Secret

# 4. Create Access app (db-tunnel.example.com)
#    Policy: Service Auth token from step 3

# 5. Create Hyperdrive
npx wrangler hyperdrive create my-private-db \
  --host=db-tunnel.example.com \
  --user=dbuser --password=dbpass --database=prod \
  --access-client-id=<ID> --access-client-secret=<SECRET>
```

**⚠️ Don't specify `--port` with Tunnel** - port configured in tunnel service settings.

## Local Dev

**Option 1: Local (RECOMMENDED):**
```bash
# Env var (takes precedence)
export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="postgres://user:pass@localhost:5432/dev"
npx wrangler dev

# wrangler.jsonc
{"hyperdrive": [{"binding": "HYPERDRIVE", "localConnectionString": "postgres://..."}]}
```

**Remote DB locally:**
```bash
# PostgreSQL
export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="postgres://user:pass@remote:5432/db?sslmode=require"

# MySQL
export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="mysql://user:pass@remote:3306/db?sslMode=REQUIRED"
```

**Option 2: Remote execution:**
```bash
npx wrangler dev --remote  # Uses deployed config, affects production
```

See [api.md](./api.md), [patterns.md](./patterns.md), [gotchas.md](./gotchas.md).
