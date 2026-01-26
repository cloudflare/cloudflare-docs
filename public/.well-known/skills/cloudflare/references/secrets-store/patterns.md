# Patterns

## Secret Rotation

Design for rotation with fallback:

```typescript
interface Env {
  PRIMARY_KEY: { get(): Promise<string> };
  FALLBACK_KEY?: { get(): Promise<string> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    let key = await env.PRIMARY_KEY.get();
    let resp = await fetch("https://api.example.com", {
      headers: { "Authorization": `Bearer ${key}` }
    });
    
    // Fallback during rotation
    if (!resp.ok && env.FALLBACK_KEY) {
      key = await env.FALLBACK_KEY.get();
      resp = await fetch("https://api.example.com", {
        headers: { "Authorization": `Bearer ${key}` }
      });
    }
    
    return resp;
  }
}
```

Rotation workflow:
1. Create new secret (`api_key_v2`)
2. Add fallback binding
3. Deploy & verify
4. Update primary binding
5. Deploy
6. Remove old secret

## Encryption with KV

```typescript
interface Env {
  CACHE: KVNamespace;
  ENCRYPTION_KEY: { get(): Promise<string> };
}

async function encryptValue(value: string, key: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw", enc.encode(key), { name: "AES-GCM" }, false, ["encrypt"]
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv }, keyMaterial, enc.encode(value)
  );
  
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  return btoa(String.fromCharCode(...combined));
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const key = await env.ENCRYPTION_KEY.get();
    const encrypted = await encryptValue("sensitive-data", key);
    await env.CACHE.put("user:123:data", encrypted);
    return Response.json({ ok: true });
  }
}
```

## HMAC Signing

```typescript
interface Env {
  HMAC_SECRET: { get(): Promise<string> };
}

async function signRequest(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const secret = await env.HMAC_SECRET.get();
    const payload = await request.text();
    const signature = await signRequest(payload, secret);
    return Response.json({ signature });
  }
}
```

## Audit & Monitoring

```typescript
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const startTime = Date.now();
    try {
      const apiKey = await env.API_KEY.get();
      const resp = await fetch("https://api.example.com", {
        headers: { "Authorization": `Bearer ${apiKey}` }
      });
      
      ctx.waitUntil(
        fetch("https://log.example.com/log", {
          method: "POST",
          body: JSON.stringify({
            event: "secret_used",
            secret_name: "API_KEY",
            timestamp: new Date().toISOString(),
            duration_ms: Date.now() - startTime,
            success: resp.ok
          })
        })
      );
      return resp;
    } catch (error) {
      ctx.waitUntil(
        fetch("https://log.example.com/log", {
          method: "POST",
          body: JSON.stringify({
            event: "secret_access_failed",
            secret_name: "API_KEY",
            error: error instanceof Error ? error.message : "Unknown"
          })
        })
      );
      return new Response("Error", { status: 500 });
    }
  }
}
```

## Migration

### From Worker Secrets

Before:
```typescript
// wrangler secret put API_KEY
const key = env.API_KEY; // Direct access
```

After:
```toml
secrets_store_secrets = [
  { binding = "API_KEY", store_id = "abc123", secret_name = "shared_key" }
]
```
```typescript
const key = await env.API_KEY.get(); // Async access
```

Steps:
1. Create secret in Secrets Store
2. Add `secrets_store_secrets` binding
3. Update code to `await env.BINDING.get()`
4. Test staging
5. Deploy
6. Delete old: `wrangler secret delete API_KEY`

### Sharing Across Workers

```toml
# worker-1/wrangler.toml
secrets_store_secrets = [
  { binding = "SHARED_DB", store_id = "abc123", secret_name = "postgres_url" }
]

# worker-2/wrangler.toml
secrets_store_secrets = [
  { binding = "DB_CONN", store_id = "abc123", secret_name = "postgres_url" }
]
```

Both access same secret, different binding names.

## Integration

### D1 Database

```typescript
interface Env {
  DB: D1Database;
  DB_CREDENTIALS: { get(): Promise<string> };
}

export default {
  async fetch(request: Request, env: Env) {
    const creds = await env.DB_CREDENTIALS.get();
    const { username, password } = JSON.parse(creds);
    // Use with D1
    return Response.json({ ok: true });
  }
}
```

### Service Bindings

```typescript
// auth-worker: Signs JWT with Secrets Store
interface Env { JWT_SECRET: { get(): Promise<string> }; }

// api-worker: Calls auth service
interface Env { AUTH: Fetcher; }
const authResp = await env.AUTH.fetch(new Request("https://auth/verify"));
```

See: [api.md](./api.md), [gotchas.md](./gotchas.md)
