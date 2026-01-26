# KV Patterns & Best Practices

## API Response Caching

```typescript
async function getCachedData(env: Env, key: string, fetcher: () => Promise<any>): Promise<any> {
  const cached = await env.MY_KV.get(key, "json");
  if (cached) return cached;
  
  const data = await fetcher();
  await env.MY_KV.put(key, JSON.stringify(data), { expirationTtl: 300 });
  return data;
}

const apiData = await getCachedData(
  env,
  "cache:users",
  () => fetch("https://api.example.com/users").then(r => r.json())
);
```

## Session Management

```typescript
interface Session { userId: string; expiresAt: number; }

async function createSession(env: Env, userId: string): Promise<string> {
  const sessionId = crypto.randomUUID();
  const expiresAt = Date.now() + (24 * 60 * 60 * 1000);
  
  await env.SESSIONS.put(
    `session:${sessionId}`,
    JSON.stringify({ userId, expiresAt }),
    { expirationTtl: 86400, metadata: { createdAt: Date.now() } }
  );
  
  return sessionId;
}

async function getSession(env: Env, sessionId: string): Promise<Session | null> {
  const data = await env.SESSIONS.get<Session>(`session:${sessionId}`, "json");
  if (!data || data.expiresAt < Date.now()) return null;
  return data;
}
```

## Feature Flags

```typescript
async function getFeatureFlags(env: Env): Promise<Record<string, boolean>> {
  return await env.CONFIG.get<Record<string, boolean>>(
    "features:flags",
    { type: "json", cacheTtl: 600 }
  ) || {};
}

export default {
  async fetch(request, env): Promise<Response> {
    const flags = await getFeatureFlags(env);
    if (flags.beta_feature) return handleBetaFeature(request);
    return handleStandardFlow(request);
  }
};
```

## Rate Limiting

```typescript
async function rateLimit(env: Env, identifier: string, limit: number, windowSeconds: number): Promise<boolean> {
  const key = `ratelimit:${identifier}`;
  const now = Date.now();
  const data = await env.MY_KV.get<{ count: number, resetAt: number }>(key, "json");
  
  if (!data || data.resetAt < now) {
    await env.MY_KV.put(key, JSON.stringify({ count: 1, resetAt: now + windowSeconds * 1000 }), { expirationTtl: windowSeconds });
    return true;
  }
  
  if (data.count >= limit) return false;
  
  await env.MY_KV.put(key, JSON.stringify({ count: data.count + 1, resetAt: data.resetAt }), { expirationTtl: Math.ceil((data.resetAt - now) / 1000) });
  return true;
}
```

## A/B Testing

```typescript
async function getVariant(env: Env, userId: string, testName: string): Promise<string> {
  const assigned = await env.AB_TESTS.get(`test:${testName}:user:${userId}`);
  if (assigned) return assigned;
  
  const test = await env.AB_TESTS.get<{ variants: string[], weights: number[] }>(`test:${testName}:config`, { type: "json", cacheTtl: 3600 });
  if (!test) return "control";
  
  const hash = await hashString(userId);
  const random = (hash % 100) / 100;
  let cumulative = 0, variant = test.variants[0];
  
  for (let i = 0; i < test.variants.length; i++) {
    cumulative += test.weights[i];
    if (random < cumulative) { variant = test.variants[i]; break; }
  }
  
  await env.AB_TESTS.put(`test:${testName}:user:${userId}`, variant, { expirationTtl: 2592000 });
  return variant;
}
```

## Coalesce Cold Keys

```typescript
// ❌ BAD: Many individual keys
await env.KV.put("user:123:name", "John");
await env.KV.put("user:123:email", "john@example.com");

// ✅ GOOD: Single coalesced object
await env.USERS.put("user:123:profile", JSON.stringify({
  name: "John",
  email: "john@example.com",
  role: "admin"
}));

// Benefits: Hot key cache, single read, reduced operations
// Trade-off: Harder to update individual fields
```

## Hierarchical Keys

```typescript
// Use prefixes for organization
"user:123:profile"
"user:123:settings"
"cache:api:users"
"session:abc-def"
"feature:flags:beta"

const userKeys = await env.MY_KV.list({ prefix: "user:123:" });
```
