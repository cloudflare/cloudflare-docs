# API Reference

## Binding API

### Basic Access

**CRITICAL**: Async `.get()` required - secrets NOT directly available.

```typescript
interface Env {
  API_KEY: { get(): Promise<string> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const apiKey = await env.API_KEY.get();
    return fetch("https://api.example.com", {
      headers: { "Authorization": `Bearer ${apiKey}` }
    });
  }
}
```

### Multiple Secrets

```typescript
const [stripeKey, sendgridKey] = await Promise.all([
  env.STRIPE_KEY.get(),
  env.SENDGRID_KEY.get()
]);
```

### Anti-Patterns

```typescript
// ❌ Missing .get()
const key = env.API_KEY;

// ❌ Module-level cache
const CACHED_KEY = await env.API_KEY.get(); // Fails

// ✅ Request-scope cache
export default {
  async fetch(request: Request, env: Env) {
    const key = await env.API_KEY.get(); // OK - reuse in request
    const r1 = await fetchWithAuth(key, "/ep1");
    const r2 = await fetchWithAuth(key, "/ep2");
    return Response.json({ r1, r2 });
  }
}
```

## REST API

Base: `https://api.cloudflare.com/client/v4`

### Auth

```bash
curl -H "Authorization: Bearer $CF_TOKEN" \
  https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores
```

### Store Operations

```bash
# List
GET /accounts/{account_id}/secrets_store/stores

# Create
POST /accounts/{account_id}/secrets_store/stores
{"name": "my-store"}

# Delete
DELETE /accounts/{account_id}/secrets_store/stores/{store_id}
```

### Secret Operations

```bash
# List
GET /accounts/{account_id}/secrets_store/stores/{store_id}/secrets

# Create (single)
POST /accounts/{account_id}/secrets_store/stores/{store_id}/secrets
{
  "name": "my_secret",
  "value": "secret_value",
  "scopes": ["workers"],
  "comment": "Optional"
}

# Create (batch)
POST /accounts/{account_id}/secrets_store/stores/{store_id}/secrets
[
  {"name": "secret_one", "value": "val1", "scopes": ["workers"]},
  {"name": "secret_two", "value": "val2", "scopes": ["workers", "ai-gateway"]}
]

# Get metadata
GET /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}

# Update
PATCH /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}
{"value": "new_value", "comment": "Updated"}

# Delete (single)
DELETE /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}

# Delete (batch)
DELETE /accounts/{account_id}/secrets_store/stores/{store_id}/secrets
{"secret_ids": ["id-1", "id-2"]}

# Duplicate
POST /accounts/{account_id}/secrets_store/stores/{store_id}/secrets/{secret_id}/duplicate
{"name": "new_name"}

# Quota
GET /accounts/{account_id}/secrets_store/quota
```

### Responses

Success:
```json
{
  "success": true,
  "result": {
    "id": "secret-id-123",
    "name": "my_secret",
    "created": "2025-01-11T12:00:00Z",
    "scopes": ["workers"]
  }
}
```

Error:
```json
{
  "success": false,
  "errors": [{"code": 10000, "message": "Name exists"}]
}
```

## TypeScript Helpers

```typescript
interface SecretsStoreBinding {
  get(): Promise<string>;
}

interface Env {
  STRIPE_API_KEY: SecretsStoreBinding;
  DATABASE_URL: SecretsStoreBinding;
  WORKER_SECRET: string; // Regular Worker secret (direct access)
}

// Fallback helper
async function getSecretWithFallback(
  primary: SecretsStoreBinding,
  fallback?: SecretsStoreBinding
): Promise<string> {
  try {
    return await primary.get();
  } catch (error) {
    if (fallback) return await fallback.get();
    throw error;
  }
}

// Batch helper
async function getAllSecrets(
  secrets: Record<string, SecretsStoreBinding>
): Promise<Record<string, string>> {
  const entries = await Promise.all(
    Object.entries(secrets).map(async ([k, v]) => [k, await v.get()])
  );
  return Object.fromEntries(entries);
}
```

See: [configuration.md](./configuration.md), [patterns.md](./patterns.md), [gotchas.md](./gotchas.md)
