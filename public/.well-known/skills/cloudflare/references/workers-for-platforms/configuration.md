# Configuration

## Dispatch Namespace Binding

### wrangler.jsonc
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "dispatch_namespaces": [{
    "binding": "DISPATCHER",
    "namespace": "production"
  }]
}
```

### wrangler.toml
```toml
[[dispatch_namespaces]]
binding = "DISPATCHER"
namespace = "production"
```

### With Outbound Worker
```jsonc
{
  "dispatch_namespaces": [{
    "binding": "DISPATCHER",
    "namespace": "production",
    "outbound": {
      "service": "outbound-worker",
      "parameters": ["customer_context"]
    }
  }]
}
```

## Wrangler Commands

```bash
wrangler dispatch-namespace list
wrangler dispatch-namespace get production
wrangler dispatch-namespace create production
wrangler dispatch-namespace delete staging
wrangler dispatch-namespace rename old new
```

## Custom Limits

Set CPU time and subrequest limits per invocation:

```typescript
const userWorker = env.DISPATCHER.get(
  workerName,
  {},
  {
    limits: { 
      cpuMs: 10,        // Max CPU ms
      subRequests: 5    // Max fetch() calls
    }
  }
);
```

Handle limit violations:
```typescript
try {
  return await userWorker.fetch(request);
} catch (e) {
  if (e.message.includes("CPU time limit")) {
    return new Response("CPU limit exceeded", { status: 429 });
  }
  throw e;
}
```

## Static Assets

Deploy HTML/CSS/images with Workers. See [api.md](./api.md#static-assets) for upload process.

### Wrangler
```jsonc
{
  "name": "customer-site",
  "main": "./src/index.js",
  "assets": {
    "directory": "./public",
    "binding": "ASSETS"
  }
}
```

```bash
npx wrangler deploy --name customer-site --dispatch-namespace production
```

## Bindings

Supported: KV, D1, R2, Durable Objects, Analytics Engine, Service, Assets

Add via API metadata (see [api.md](./api.md#deploy-with-bindings)):
```json
{
  "bindings": [
    {"type": "kv_namespace", "name": "USER_KV", "namespace_id": "..."},
    {"type": "r2_bucket", "name": "STORAGE", "bucket_name": "..."},
    {"type": "d1", "name": "DB", "id": "..."}
  ]
}
```

Preserve existing bindings:
```json
{
  "bindings": [{"type": "r2_bucket", "name": "STORAGE", "bucket_name": "new"}],
  "keep_bindings": ["kv_namespace", "d1"]
}
```

## Tags

Organize/search Workers (max 8/script):

```bash
# Set tags
curl -X PUT ".../tags" -d '["customer-123", "pro", "production"]'

# Filter by tag
curl ".../scripts?tags=production%3Ayes"

# Delete by tag
curl -X DELETE ".../scripts?tags=customer-123%3Ayes"
```

Common patterns: `customer-123`, `free|pro|enterprise`, `production|staging`

See [README.md](./README.md), [api.md](./api.md), [patterns.md](./patterns.md), [gotchas.md](./gotchas.md)
