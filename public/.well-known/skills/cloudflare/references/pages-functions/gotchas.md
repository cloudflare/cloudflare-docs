# Gotchas & Debugging

## Common Issues

### Functions Not Invoking

All requests serve static, functions never run.

**Fix:**
- `/functions` in correct location (project root)
- Check `pages_build_output_dir` in wrangler.json
- Files have `.js` or `.ts` extension
- `_routes.json` not excluding paths

### Binding Not Available

`context.env.MY_BINDING is undefined`

**Fix:**
- Binding in wrangler.json or dashboard
- Name matches exactly (case-sensitive)
- Local dev: pass flags OR configure wrangler.json
- Redeploy after changes

### TypeScript Errors

Type errors for `context.env`

**Fix:**
```typescript
interface Env { MY_BINDING: KVNamespace; }

export const onRequest: PagesFunction<Env> = async (context) => {
  // context.env.MY_BINDING now typed
};
```

### Middleware Not Running

`_middleware.js` not executing

**Fix:**
- Named exactly `_middleware.js`
- In correct directory for route scope
- `onRequest` or method handler exported
- Use `context.next()` to pass control

### Environment Variables Missing

`context.env.VAR_NAME is undefined`

**Fix:**
- `vars` in wrangler.json
- Secrets: `.dev.vars` locally, dashboard/wrangler.json for prod
- Redeploy after changes

## Debugging

### Console Logging

```typescript
export async function onRequest(context) {
  console.log('Request:', context.request.method, context.request.url);
  console.log('Headers:', Object.fromEntries(context.request.headers));
  
  const response = await context.next();
  console.log('Response status:', response.status);
  return response;
}
```

### Wrangler Tail

```bash
# Stream real-time logs
npx wrangler pages deployment tail

# Filter
npx wrangler pages deployment tail --status error
```

### Source Maps

```jsonc
// wrangler.json
{ "upload_source_maps": true }
```

## Limits

- **CPU:** 10ms (Free), 50ms (Paid)
- **Memory:** 128 MB
- **Script size:** 10 MB compressed
- **Env vars:** 5 KB per var, 64 max
- **Requests:** 100k free/day, $0.50/million after

## Best Practices

**Performance:**
- Minimize deps for cold starts
- KV for infrequent reads, D1 for relational, R2 for large files
- Set `Cache-Control` headers
- Use prepared statements, batch operations
- Handle errors gracefully

**Security:**
- Never commit secrets
- Use secrets (encrypted) not vars for sensitive data
- Validate all input
- Sanitize before DB ops
- Implement auth middleware
- Set appropriate CORS headers
- Rate limit per-IP

## Migration

### From Workers

```typescript
// Worker
export default {
  fetch(request, env) { }
}

// Pages Function
export function onRequest(context) {
  const { request, env } = context;
}
```

In `_worker.js`: `return env.ASSETS.fetch(request)` for static assets.

### From Other Platforms

- `/functions/api/users.js` → `/api/users`
- Dynamic routes: `[param]` not `:param`
- Replace deps with Workers APIs or `nodejs_compat` flag

## Resources

- [Docs](https://developers.cloudflare.com/pages/functions/)
- [Workers APIs](https://developers.cloudflare.com/workers/runtime-apis/)
- [Examples](https://github.com/cloudflare/pages-example-projects)
- [Discord](https://discord.gg/cloudflaredev)

## See Also

- [README.md](./README.md) - Overview
- [configuration.md](./configuration.md) - wrangler.json
- [api.md](./api.md) - EventContext, bindings
- [patterns.md](./patterns.md) - Common patterns
