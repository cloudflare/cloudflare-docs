# Configuration

## wrangler.json / wrangler.toml

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-pages-app",
  "pages_build_output_dir": "./dist",
  "compatibility_date": "2024-01-15",
  "compatibility_flags": ["nodejs_compat"],
  
  "vars": { "API_URL": "https://api.example.com" },
  
  "kv_namespaces": [
    { "binding": "KV", "id": "abc123" }
  ],
  
  "d1_databases": [{
    "binding": "DB",
    "database_name": "production-db",
    "database_id": "xyz789"
  }],
  
  "r2_buckets": [
    { "binding": "BUCKET", "bucket_name": "my-bucket" }
  ],
  
  "durable_objects": {
    "bindings": [{
      "name": "COUNTER",
      "class_name": "Counter",
      "script_name": "counter-worker"
    }]
  },
  
  "services": [
    { "binding": "AUTH", "service": "auth-worker" }
  ],
  
  "ai": { "binding": "AI" },
  
  "vectorize": [{
    "binding": "VECTORIZE",
    "index_name": "my-index"
  }],
  
  "hyperdrive": [{
    "binding": "HYPERDRIVE",
    "id": "hyperdrive-id"
  }],
  
  "analytics_engine_datasets": [{ "binding": "ANALYTICS" }]
}
```

## Environment Overrides

```jsonc
{
  "name": "my-app",
  "vars": { "API_URL": "http://localhost:8787" },
  
  "env": {
    "preview": {
      "vars": { "API_URL": "https://preview.example.com" }
    },
    "production": {
      "vars": { "API_URL": "https://api.example.com" }
    }
  }
}
```

**Rules:**
- Top-level → local dev
- `env.preview` → preview deployments
- `env.production` → production
- **Non-inheritable keys:** If overriding `vars`, `kv_namespaces`, `d1_databases`, etc., ALL must be redefined

## Local Secrets (.dev.vars)

```bash
# .dev.vars (DO NOT COMMIT)
SECRET_KEY="my-secret-value"
API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

- Add `.dev.vars*` to `.gitignore`
- Use `vars` for non-sensitive config
- Environment-specific: `.dev.vars.preview`, `.dev.vars.production`

## _routes.json (Advanced)

Custom routing rules in build output:

```json
{
  "version": 1,
  "include": ["/api/*"],
  "exclude": ["/static/*"]
}
```

## _headers (Static)

```
/static/*
  Cache-Control: public, max-age=31536000
  X-Custom: value

/api/*
  Access-Control-Allow-Origin: *
```

## _redirects (Static)

```
/old-page  /new-page  301
/docs/*    https://docs.example.com/:splat  302
```

## Local Dev

```bash
# Start dev server
npx wrangler pages dev ./dist

# With bindings
npx wrangler pages dev ./dist \
  --kv=KV \
  --d1=DB=database-id \
  --r2=BUCKET \
  --binding=API_KEY=secret123

# Durable Objects (2 terminals)
cd do-worker && npx wrangler dev
cd pages-project && npx wrangler pages dev ./dist \
  --do COUNTER=CounterClass@do-worker
```

## Deployment

```bash
# Git push (auto-deploys)
git push origin main

# CLI
npx wrangler pages deploy ./dist
npx wrangler pages deploy ./dist --branch preview

# Download config from dashboard
npx wrangler pages download config my-project-name
```

## See Also

- [README.md](./README.md) - Overview
- [api.md](./api.md) - EventContext, bindings
