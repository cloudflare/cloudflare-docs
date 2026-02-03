# Gotchas

## Functions Not Running

1. **Check `_routes.json`**: May be excluding Function routes
2. **Verify file naming**: Must be `.js` or `.ts`, NOT `.jsx` or `.tsx`
3. **Check build output**: Functions dir must be at root of output dir
4. **Functions precedence**: Functions always override redirects/static

## 404 on Static Assets

1. **Build output dir**: Verify setting matches actual build output
2. **Functions catching requests**: Use `_routes.json` to exclude static paths
3. **Advanced mode**: Must call `env.ASSETS.fetch()` or static won't serve

## Bindings Not Working

1. **wrangler.toml syntax**: Check for TOML errors
2. **Binding IDs**: Verify correct (especially for KV/D1/R2)
3. **Local dev**: Check `.dev.vars` exists and has correct values
4. **Regenerate types**: `npx wrangler types --path='./functions/types.d.ts'`
5. **Environment**: Production bindings ≠ preview bindings (set separately)

## Build Failures

1. **Build logs**: Check in Dashboard → Deployments → Build log
2. **Build command**: Verify correct for framework
3. **Output directory**: Must match actual build output
4. **Node version**: Check compatibility (set via `.nvmrc` or env var)
5. **Environment variables**: Review in Settings → Environment variables
6. **Timeout**: 20min max. Long builds may fail.
7. **Memory**: Build can OOM on large projects

## Deployment Fails

1. **File count**: Max 20,000 files per deployment
2. **File size**: Max 25MB per file
3. **Build errors**: Check build output in logs
4. **wrangler.toml validation**: `npx wrangler pages project validate`
5. **Bindings**: Verify all referenced bindings exist

## Middleware Not Running

1. **File location**: Must be `_middleware.ts` (underscore prefix)
2. **Export**: Must export `onRequest` or method-specific handlers
3. **Must call `next()`**: Or return Response directly
4. **Scope**: `functions/_middleware.ts` applies to ALL (including static)
5. **Order**: Array order matters: `[errorHandler, auth, logging]`

## Headers Not Applied

1. **Functions responses**: `_headers` only applies to static assets
2. **Set in code**: Functions must set headers via Response object
3. **Syntax**: Check `_headers` file syntax (path, then indented headers)
4. **Limits**: Max 100 header rules

## Redirects Not Working

1. **Functions take precedence**: Redirects don't apply to Function routes
2. **Syntax**: Check `_redirects` file format
3. **Limits**: Max 2,100 redirects (2,000 static + 100 dynamic)
4. **Query strings**: Preserved automatically
5. **Testing**: Preview deployments to test before production

## TypeScript Errors

1. **Generate types**: `npx wrangler types` before dev
2. **tsconfig**: Point `types` to generated file
3. **Env interface**: Must match wrangler.toml bindings
4. **Type imports**: `import type { PagesFunction } from '@cloudflare/workers-types'`

## Local Dev Issues

1. **Port conflicts**: Use `--port=3000` to change
2. **Bindings**: Must pass via CLI flags or wrangler.toml
3. **Persistence**: Use `--persist-to` to keep data between restarts
4. **Hot reload**: May need manual restart for some changes
5. **HTTPS**: Local dev uses HTTP, production uses HTTPS (affects cookies, etc.)

## Preview vs Production

1. **Different bindings**: Set separately in Dashboard
2. **Different env vars**: Configure per environment
3. **Branch deploys**: Every branch gets preview deployment
4. **URLs**: `https://branch.project.pages.dev` vs `https://project.pages.dev`

## Performance Issues

1. **Function invocations**: Exclude static assets via `_routes.json`
2. **Cold starts**: First request after deploy may be slower
3. **CPU time**: 10ms limit per request (can hit on complex operations)
4. **Memory**: 128MB limit (watch for large JSON parsing)
5. **Bundle size**: Keep Functions < 1MB compressed

## Framework-Specific

### Next.js
- Use `@cloudflare/next-on-pages` adapter
- Some features unsupported (ISR, Middleware with waitUntil in body)
- Check [compatibility](https://github.com/cloudflare/next-on-pages/blob/main/docs/compatibility.md)

### SvelteKit
- Use `@sveltejs/adapter-cloudflare`
- Set `platform: 'cloudflare'` in svelte.config.js

### Remix
- Use `@remix-run/cloudflare-pages`
- Check server context for bindings

## Debugging

```typescript
// Log everything
console.log('Request:', {
  method: request.method,
  url: request.url,
  headers: Object.fromEntries(request.headers),
});
console.log('Env:', Object.keys(env));
console.log('Params:', params);
console.log('Data:', data);
```

**View logs**:
```bash
npx wrangler pages deployment tail --project-name=my-project
```

## Common Errors

**"Module not found"**: Check build output, ensure dependencies bundled

**"Binding not found"**: Verify wrangler.toml and regenerate types

**"Request exceeded CPU limit"**: Optimize hot paths, use Workers for heavy compute

**"Script too large"**: Tree-shake, dynamic imports, code-split

**"Too many subrequests"**: Max 50 subreqs per request, batch where possible

**"KV key not found"**: Check namespaces match (production vs preview)

**"D1 error"**: Verify database_id, check migrations applied

## Limits Reference

- **Functions**: 100k req/day (Free), 10ms CPU, 128MB memory, 1MB script
- **Deployments**: 500/month (Free), 20k files, 25MB/file
- **Config**: 2,100 redirects, 100 headers, 100 routes
- **Build**: 20min timeout
- **Subrequests**: 50/request
- **Request size**: 100MB

[Full limits](https://developers.cloudflare.com/pages/platform/limits/)

## Getting Help

1. Check [Pages Docs](https://developers.cloudflare.com/pages/)
2. Search [Discord #functions](https://discord.com/channels/595317990191398933/910978223968518144)
3. Review [Workers Examples](https://developers.cloudflare.com/workers/examples/)
4. Check framework-specific docs/adapters
