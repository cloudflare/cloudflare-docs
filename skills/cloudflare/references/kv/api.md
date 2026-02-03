# KV API Reference

## Read Operations

```typescript
// Single key (string)
const value = await env.MY_KV.get("user:123");

// JSON type (auto-parsed)
const config = await env.MY_KV.get<AppConfig>("config", "json");

// ArrayBuffer for binary
const buffer = await env.MY_KV.get("image", "arrayBuffer");

// Stream for large values
const stream = await env.MY_KV.get("large-file", "stream");

// With cache TTL (min 60s)
const value = await env.MY_KV.get("key", { type: "text", cacheTtl: 300 });

// Bulk get (max 100 keys, counts as 1 operation)
const values = await env.MY_KV.get(["user:1", "user:2", "user:3"]);
// Returns Map<string, string | null>

const configs = await env.MY_KV.get<Config>(["config:app", "config:feature"], "json");
```

## Write Operations

```typescript
// Basic put
await env.MY_KV.put("key", "value");
await env.MY_KV.put("config", JSON.stringify({ theme: "dark" }));

// With expiration (UNIX timestamp)
await env.MY_KV.put("session", token, {
  expiration: Math.floor(Date.now() / 1000) + 3600
});

// With TTL (seconds from now, min 60)
await env.MY_KV.put("cache", data, { expirationTtl: 300 });

// With metadata (max 1024 bytes)
await env.MY_KV.put("user:profile", userData, {
  metadata: { version: 2, lastUpdated: Date.now() }
});

// Combined
await env.MY_KV.put("temp", value, {
  expirationTtl: 3600,
  metadata: { temporary: true }
});
```

## Get with Metadata

```typescript
// Single key
const result = await env.MY_KV.getWithMetadata("user:profile");
// { value: string | null, metadata: any | null }

if (result.value && result.metadata) {
  const { version, lastUpdated } = result.metadata;
}

// Multiple keys
const results = await env.MY_KV.getWithMetadata(["key1", "key2"]);
// Returns Map<string, { value, metadata }>

// With type
const result = await env.MY_KV.getWithMetadata<UserData>("user:123", "json");
```

## Delete Operations

```typescript
await env.MY_KV.delete("key"); // Always succeeds (even if key missing)
```

## List Operations

```typescript
// List all
const keys = await env.MY_KV.list();
// { keys: [...], list_complete: boolean, cursor?: string }

// With prefix
const userKeys = await env.MY_KV.list({ prefix: "user:" });

// Pagination
let cursor: string | undefined;
let allKeys = [];
do {
  const result = await env.MY_KV.list({ cursor, limit: 1000 });
  allKeys.push(...result.keys);
  cursor = result.cursor;
} while (!result.list_complete);
```

## Limits

| Limit | Free | Paid |
|-------|------|------|
| Reads/day | 100,000 | Unlimited |
| Writes/day | 1,000 | Unlimited |
| Writes/second per key | 1 | 1 |
| Operations per Worker | 1,000 | 1,000 |
| Key size | 512 bytes | 512 bytes |
| Value size | 25 MiB | 25 MiB |
| Metadata size | 1024 bytes | 1024 bytes |
| Min cacheTtl | 60s | 60s |
| Bulk get max | 100 keys | 100 keys |

**Note:** Bulk requests count as 1 operation against 1,000 limit.
