# Configuration

## wrangler.toml

```toml
name = "my-pages-project"
pages_build_output_dir = "./dist"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

# Bindings
[[kv_namespaces]]
binding = "KV"
id = "abcd1234..."

[[d1_databases]]
binding = "DB"
database_id = "xxxx-xxxx-xxxx-xxxx"
database_name = "production-db"

[[r2_buckets]]
binding = "BUCKET"
bucket_name = "my-bucket"

[[durable_objects.bindings]]
name = "COUNTER"
class_name = "Counter"
script_name = "counter-worker"

[[services]]
binding = "API"
service = "api-worker"

[[queues.producers]]
binding = "QUEUE"
queue = "my-queue"

[[vectorize]]
binding = "VECTORIZE"
index_name = "my-index"

[ai]
binding = "AI"

[[analytics_engine_datasets]]
binding = "ANALYTICS"

# Vars (non-sensitive)
[vars]
API_URL = "https://api.example.com"
ENVIRONMENT = "production"

# Environment overrides
[env.preview]
[env.preview.vars]
API_URL = "https://staging-api.example.com"

[[env.preview.kv_namespaces]]
binding = "KV"
id = "preview-namespace-id"
```

## Build Config

**Git deployment**: Dashboard → Project → Settings → Build settings
- Build command: `npm run build`
- Output directory: `dist` / `out` / `build`
- Environment variables: Set per environment (preview/production)

**Framework detection**: Auto-configures build command + output dir for common frameworks

## Environment Variables

### Local Secrets (.dev.vars)
```bash
# .dev.vars (never commit)
SECRET_KEY="local-secret-key"
API_TOKEN="dev-token-123"
DATABASE_URL="http://localhost:5432"
```

### Production Secrets
```bash
# Interactive
echo "super-secret-value" | npx wrangler pages secret put SECRET_KEY --project-name=my-project

# Per environment
echo "prod-secret" | npx wrangler pages secret put SECRET_KEY --project-name=my-project --env=production

# List
npx wrangler pages secret list --project-name=my-project

# Delete
npx wrangler pages secret delete SECRET_KEY --project-name=my-project
```

Access like bindings: `env.SECRET_KEY`

## Static Config Files

### _redirects
Place in build output (e.g., `dist/_redirects`):

```txt
# Simple (302)
/old-page /new-page

# Permanent (301)
/old-page /new-page 301

# External
/blog https://blog.example.com

# Splat wildcard
/blog/* /news/:splat 301

# Placeholders
/users/:id /members/:id 301

# Proxying (200)
/api/* /api-v2/:splat 200

# Limits: 2,100 total (2,000 static + 100 dynamic), 1,000 char/line
```

**Important**: Redirects don't apply to Functions routes. Functions take precedence.

### _headers
```txt
# Security
/secure/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer

# CORS
/api/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS

# Cache
/static/*
  Cache-Control: public, max-age=31536000, immutable

# Prevent indexing previews
https://:project.pages.dev/*
  X-Robots-Tag: noindex

# Remove header
/special-page
  ! X-Frame-Options

# Limits: 100 rules, 2,000 char/line
```

**Important**: Headers don't apply to Functions responses. Set in Response object.

### _routes.json
Controls which requests invoke Functions (auto-generated for most frameworks):

```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": [
    "/build/*",
    "/static/*",
    "/assets/*",
    "/*.ico",
    "/*.png",
    "/*.jpg",
    "/*.css",
    "/*.js"
  ]
}
```

**Purpose**: Functions are metered; static requests are free. `exclude` takes precedence. Max 100 rules, 100 char/rule.

## TypeScript

Generate types:
```bash
npx wrangler types --path='./functions/types.d.ts'
```

```json
// functions/tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "lib": ["esnext"],
    "types": ["./types.d.ts"]
  }
}
```

## Local Dev

```bash
# Basic
npx wrangler pages dev ./dist

# With bindings
npx wrangler pages dev ./dist --kv KV --d1 DB=local-db-id --r2 BUCKET

# Persistence
npx wrangler pages dev ./dist --persist-to=./.wrangler/state/v3

# Custom port
npx wrangler pages dev ./dist --port=3000

# Live reload
npx wrangler pages dev ./dist --live-reload

# Proxy mode (SSR frameworks)
npx wrangler pages dev -- npm run dev
```

## Limits

- **Functions**: 100k req/day (Free), 10ms CPU, 128MB memory, 1MB script
- **Deployments**: 500/month (Free), 20k files, 25MB/file
- **Config**: 2,100 redirects, 100 header rules, 100 route rules
- **Build**: 20min timeout, no Docker

[Full limits](https://developers.cloudflare.com/pages/platform/limits/)
