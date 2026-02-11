# Workers Types

## How to Retrieve Current Types

Prefer generated types over baked-in knowledge. Types change with compatibility dates and new bindings. The repo you are working in may have an older `@cloudflare/workers-types` version — **always validate against the latest published types**.

### Primary: fetch latest `@cloudflare/workers-types`

```bash
# Fetch the latest type definitions to a temp directory
mkdir -p /tmp/workers-types-latest && \
  npm pack @cloudflare/workers-types --pack-destination /tmp/workers-types-latest && \
  tar -xzf /tmp/workers-types-latest/cloudflare-workers-types-*.tgz -C /tmp/workers-types-latest
# Types are now at /tmp/workers-types-latest/package/index.d.ts
```

Search this file for the specific type, class, or interface under review. Do not guess type names — look them up.

### Alternative: `wrangler types`

If working in a project with a wrangler config, `npx wrangler types` generates a `.d.ts` file with a typed `Env` interface derived from the config. This is useful for binding types but reflects the locally installed wrangler version.

### Fallback: local `node_modules`

Read `node_modules/@cloudflare/workers-types/index.d.ts` if the above approaches are unavailable. Note the installed version and flag if it appears significantly outdated.

The package provides date-versioned entrypoints (e.g., `2023-07-01/`) and `latest/`. Check the project's `tsconfig.json` to determine which entrypoint is in use.

## What to Validate

### Env interface

- Every binding must have a specific type. Flag `any`, `unknown`, `object`, or `Record<string, unknown>` on bindings.
- Binding types that accept generic parameters (like Durable Object namespaces, Queues, Service bindings for RPC) must include them. Read the type definition to confirm which types are generic.
- Binding names must match the wrangler config exactly (see `references/wrangler-config.md`).

### Handler and class signatures

Workers code uses several base classes and handler patterns. The correct signatures change over time — **always verify against the current type definitions** rather than assuming.

Verify:

- The correct import path (most Workers platform classes import from `"cloudflare:workers"`)
- The generic type parameter on base classes (e.g., `<Env>`)
- Binding access pattern: `env.X` in module export handlers, `this.env.X` in classes extending platform base classes
- `ExecutionContext` as the third param in module export handlers (needed for `ctx.waitUntil()`)

### Return types

- `fetch()` handlers must return `Promise<Response>`
- `scheduled()` handlers must return `Promise<void>`
- Verify other handler return types against the type definitions

## Type Integrity Rules

These are principles, not API-specific. They do not go stale.

### No `any`

Never use `any` for binding types, handler parameters, or API responses. The type system exists to catch binding mismatches, incorrect API usage, and missing null checks. Using `any` defeats all of this.

### No double-casting

`as unknown as T` hides real type incompatibilities. If a cast is needed, the underlying design needs fixing — a missing generic parameter, a wrong import, or an actual API mismatch. Investigate instead of casting.

### Justify every suppression

`@ts-ignore` and `@ts-expect-error` must include a comment explaining why suppression is necessary. Prefer `@ts-expect-error` (fails when the error is fixed) over `@ts-ignore` (silently persists forever).

### Prefer `satisfies` over `as`

`satisfies` validates structure at compile time without widening the type. `as` silently allows incorrect structure. Use `satisfies` for config objects, handler exports, and any value where you want to confirm a shape.

### Validate, do not assert

When receiving untyped data (JSON responses, parsed bodies, external input), validate it with a schema or narrow it with type guards. Do not assert it into a type with `as`.

## Common Mistakes to Check

Look for these patterns and verify against the current type definitions:

- Generic parameters omitted on binding types that require them
- `Response` or `Request` type conflicts between Workers types and DOM `lib.dom.d.ts` — check tsconfig `lib` and `types` settings
- Missing handler parameters (especially `ExecutionContext` as third param)
- `JSON.parse()` results used without validation or type narrowing
- Binding access using `env.X` inside a class body (should be `this.env.X`) or `this.env.X` in a module export handler (should be `env.X`)
