# KV Configuration

## Create Namespace

```bash
wrangler kv namespace create MY_NAMESPACE
# Output: { binding = "MY_NAMESPACE", id = "abc123..." }

wrangler kv namespace create MY_NAMESPACE --preview  # For local dev
```

## Workers Binding

**wrangler.jsonc:**
```jsonc
{
  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "abc123xyz789"
    }
  ]
}
```

**wrangler.toml:**
```toml
[[kv_namespaces]]
binding = "MY_KV"
id = "abc123xyz789"
```

## TypeScript Types

```typescript
interface Env { MY_KV: KVNamespace; }

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const value = await env.MY_KV.get("key");
    return new Response(value || "Not found");
  }
} satisfies ExportedHandler<Env>;
```

## CLI Operations

```bash
# Put
wrangler kv key put --binding=MY_KV "key" "value"
wrangler kv key put --binding=MY_KV "key" --path=./file.json --ttl=3600

# Get
wrangler kv key get --binding=MY_KV "key"

# Delete
wrangler kv key delete --binding=MY_KV "key"

# List
wrangler kv key list --binding=MY_KV --prefix="user:"

# Bulk operations (max 10,000 keys per file)
wrangler kv bulk put data.json --binding=MY_KV
wrangler kv bulk get keys.json --binding=MY_KV
wrangler kv bulk delete keys.json --binding=MY_KV --force
```

## Local Development

```bash
wrangler dev                # Local KV (isolated)
wrangler dev --remote       # Remote KV (production)

# Or in wrangler.jsonc:
# "kv_namespaces": [{ "binding": "MY_KV", "id": "...", "remote": true }]
```

## REST API

```typescript
import Cloudflare from 'cloudflare';

const client = new Cloudflare({
  apiEmail: process.env.CLOUDFLARE_EMAIL,
  apiKey: process.env.CLOUDFLARE_API_KEY
});

await client.kv.namespaces.values.update(namespaceId, 'key', {
  account_id: accountId,
  value: 'value'
});
```
