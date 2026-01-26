# Workers Gotchas

## CPU Time Limits

**Standard**: 10ms CPU time  
**Unbound**: 30ms CPU time

**Solutions**:
- Use `ctx.waitUntil()` for background work
- Offload heavy compute to Durable Objects
- Consider Workers AI for ML workloads

## No Persistent State in Worker

Workers are stateless between requests - module-level variables reset unpredictably.

**Solution**: Use KV, D1, or Durable Objects for persistent state.

## Response Bodies Are Streams

```typescript
// ❌ BAD
const response = await fetch(url);
await logBody(response.text());  // First read
return response;  // Body already consumed!

// ✅ GOOD
const response = await fetch(url);
const text = await response.text();
await logBody(text);
return new Response(text, response);
```

## No Node.js Built-ins (by default)

```typescript
// ❌ BAD
import fs from 'fs';  // Not available

// ✅ GOOD - use Workers APIs
const data = await env.MY_BUCKET.get('file.txt');

// OR enable Node.js compat
{ "compatibility_flags": ["nodejs_compat_v2"] }
```

## Fetch in Global Scope Forbidden

```typescript
// ❌ BAD
const config = await fetch('/config.json');  // Error!

export default {
  async fetch() { return new Response('OK'); },
};

// ✅ GOOD
export default {
  async fetch() {
    const config = await fetch('/config.json');  // OK
    return new Response('OK');
  },
};
```

## Limits

| Resource | Limit |
|----------|-------|
| Request size | 100 MB |
| Response size | Unlimited (streaming) |
| CPU time | 10ms (standard) / 30ms (unbound) |
| Subrequests | 1000 per request |
| KV reads | 1000 per request |
| KV write size | 25 MB |
| Environment size | 5 MB |

## Common Errors

### "Error: Body has already been used"

**Cause**: Response body read twice  
**Solution**: Clone response before reading: `response.clone()`

### "Error: Too much CPU time used"

**Cause**: Exceeded CPU limit  
**Solution**: Use `ctx.waitUntil()` for background work

### "Error: Subrequest depth limit exceeded"

**Cause**: Too many nested subrequests  
**Solution**: Flatten request chain, use service bindings

## See Also

- [Patterns](./patterns.md) - Best practices
- [API](./api.md) - Runtime APIs
- [Configuration](./configuration.md) - Setup
