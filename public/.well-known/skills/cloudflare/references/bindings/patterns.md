## Common Anti-Patterns

### ❌ Hardcoding Credentials
```typescript
// DON'T
const apiKey = 'sk_live_abc123';
```
**✅ Use secrets:**
```bash
npx wrangler secret put API_KEY
```

### ❌ Using REST API from Worker
```typescript
// DON'T
await fetch('https://api.cloudflare.com/client/v4/accounts/.../kv/...');
```
**✅ Use bindings:**
```typescript
await env.MY_KV.get('key');
```

### ❌ Polling KV/D1 for Changes
```typescript
// DON'T
setInterval(() => {
  const config = await env.KV.get('config');
}, 1000);
```
**✅ Use Durable Objects for real-time state**

### ❌ Storing Large Data in env.vars
```typescript
// DON'T
{ "vars": { "HUGE_CONFIG": "..." } } // Max 5KB per var
```
**✅ Use KV/R2 for large data**