# Wrangler Configuration

Configuration reference for wrangler.jsonc (recommended) and wrangler.toml.

## Config Format

**wrangler.jsonc recommended** (v3.91.0+) - provides schema validation.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-worker",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-01",  // Use current date
  "vars": { "API_KEY": "dev-key" },
  "kv_namespaces": [{ "binding": "MY_KV", "id": "abc123" }]
}
```

## Field Categories

### Top-Level Only
- `keep_vars`, `migrations`, `send_metrics`

### Inheritable (can override per env)
- `name`, `main`, `compatibility_date`, `account_id`
- `workers_dev`, `routes`, `triggers`, `minify`, `observability`

### Non-Inheritable (per-env required)
- `vars`, `kv_namespaces`, `d1_databases`, `r2_buckets`
- `durable_objects`, `vectorize`, `hyperdrive`, `services`, `queues`

## Environments

```jsonc
{
  "name": "my-worker",
  "vars": { "ENV": "dev" },
  "env": {
    "production": {
      "name": "my-worker-prod",
      "vars": { "ENV": "prod" },
      "route": { "pattern": "example.com/*", "zone_name": "example.com" }
    }
  }
}
```

Deploy: `wrangler deploy --env production`

## Routing

```jsonc
// Custom domain (recommended)
{ "routes": [{ "pattern": "api.example.com", "custom_domain": true }] }

// Zone-based
{ "routes": [{ "pattern": "api.example.com/*", "zone_name": "example.com" }] }

// workers.dev
{ "workers_dev": true }
```

## Bindings

```jsonc
// Variables
{ "vars": { "API_URL": "https://api.example.com" } }

// KV
{ "kv_namespaces": [{ "binding": "CACHE", "id": "abc123" }] }

// D1
{ "d1_databases": [{ "binding": "DB", "database_id": "abc-123" }] }

// R2
{ "r2_buckets": [{ "binding": "ASSETS", "bucket_name": "my-assets" }] }

{ "durable_objects": { "bindings": [{ "name": "COUNTER", "class_name": "Counter" }] } }
{ "migrations": [{ "tag": "v1", "new_sqlite_classes": ["Counter"] }] }

// Service Bindings
{ "services": [{ "binding": "AUTH", "service": "auth-worker" }] }

// Queues
{ "queues": {
  "producers": [{ "binding": "TASKS", "queue": "task-queue" }],
  "consumers": [{ "queue": "task-queue", "max_batch_size": 10 }]
} }

// Vectorize
{ "vectorize": [{ "binding": "VECTORS", "index_name": "embeddings" }] }

// Hyperdrive (requires nodejs_compat_v2)
{ "hyperdrive": [{ "binding": "HYPERDRIVE", "id": "hyper-id" }] }

// Workers AI
{ "ai": { "binding": "AI" } }
```

## Advanced

```jsonc
// Cron Triggers
{ "triggers": { "crons": ["0 0 * * *"] } }

// Observability
{ "observability": { "enabled": true, "head_sampling_rate": 0.1 } }

// Runtime Limits
{ "limits": { "cpu_ms": 100 } }

// Auto-Provisioning (Beta) - IDs written back on deploy
{ "kv_namespaces": [{ "binding": "MY_KV" }] }

// Static Assets
{ "assets": { "directory": "./public", "binding": "ASSETS" } }

// mTLS Certificates
{ "mtls_certificates": [{ "binding": "CERT", "certificate_id": "cert-uuid" }] }
```

## See Also

- [README.md](./README.md) - Overview and commands
- [api.md](./api.md) - Programmatic API
- [patterns.md](./patterns.md) - Workflows
- [gotchas.md](./gotchas.md) - Common issues
