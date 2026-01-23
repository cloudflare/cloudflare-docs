# Gotchas

## Security

### Never Log Secret Values

```typescript
// ❌ Logs secret
const secret = await env.API_KEY.get();
console.log(`Using secret: ${secret}`);

// ✅ Log metadata only
console.log("Retrieved API_KEY from Secrets Store");
```

### No Module-Level Caching

```typescript
// ❌ Fails - secrets unavailable during module init
import { env } from "cloudflare:workers";
const CACHED = await env.API_KEY.get();

// ✅ Cache in request scope
export default {
  async fetch(request: Request, env: Env) {
    const key = await env.API_KEY.get(); // Reuse in request
    // ...
  }
}
```

## Troubleshooting

### "Secret not found"

```
Error: Secret 'my_secret' not found in store
```

Fix:
1. `wrangler secrets-store secret list <store-id> --remote`
2. Check `secret_name` matches exactly (case-sensitive)
3. Ensure secret has `workers` scope
4. Verify `store_id` correct

### Local Dev: Production Secrets Inaccessible

```
Error: Cannot access secret 'API_KEY' in local dev
```

Fix:
```bash
# Create local-only (no --remote)
wrangler secrets-store secret create <store-id> --name API_KEY --scopes workers
```

Keep prod/local secrets separate.

### Type Errors

```typescript
// Error: Property 'get' does not exist
const key = await env.API_KEY.get();
```

Fix:
```typescript
interface Env {
  API_KEY: { get(): Promise<string> };
}
```

### "Binding already exists"

```
Error: Binding 'API_KEY' already exists
```

Fix:
1. Remove duplicate from dashboard Settings → Bindings
2. Check `wrangler.toml` vs dashboard conflicts
3. Delete old Worker secret: `wrangler secret delete API_KEY`

### Quota Exceeded

```
Error: Account secret quota exceeded (100/100)
```

Fix:
1. `wrangler secrets-store quota --remote`
2. Delete unused secrets
3. Consolidate duplicates
4. Contact Cloudflare for increase

## Limits

- 100 secrets/account (beta)
- 1 store/account (beta)
- 1024 bytes max/secret
- Production secrets count toward limit (local don't)

## Comparison Table

| Feature | Secrets Store | Worker Secrets |
|---------|---------------|----------------|
| Scope | Account-level | Per-Worker |
| Reusability | Multi-Worker | Single Worker |
| Access | `await env.BINDING.get()` | `env.SECRET_NAME` |
| Management | Centralized | Per-Worker |
| Commands | `secrets-store` | `secret` |
| Local dev | Separate local secrets | `.dev.vars`/`.env` |
| Limits | 100/account | Per-Worker |

## Best Practices

1. **Always async**: `await env.BINDING.get()`
2. **Local vs prod**: Separate secrets (no `--remote` for local)
3. **Type safety**: Define `{ get(): Promise<string> }`
4. **Never log values**: Metadata only
5. **Design for rotation**: Use fallback bindings
6. **Scopes**: Set `workers` scope
7. **Request-scope caching**: OK to cache within request, not module-level
8. **Separate names**: Different names for dev/staging/prod
9. **Quota awareness**: Monitor 100-secret limit
10. **No direct access**: Values never returned after creation

See: [configuration.md](./configuration.md), [api.md](./api.md), [patterns.md](./patterns.md)
