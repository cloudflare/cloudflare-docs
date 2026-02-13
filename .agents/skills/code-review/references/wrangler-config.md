# Wrangler Config Validation

## Schema Retrieval

The authoritative schema is bundled with the `wrangler` npm package as `config-schema.json`. It is a JSON Schema (draft-07) document defining the full `RawConfig` type.

**Always fetch the latest published schema** — the repo you are working in may have an older wrangler version pinned. To retrieve the latest:

```bash
# Fetch the latest schema to a temp directory
mkdir -p /tmp/wrangler-latest && \
  npm pack wrangler --pack-destination /tmp/wrangler-latest && \
  tar -xzf /tmp/wrangler-latest/wrangler-*.tgz -C /tmp/wrangler-latest
# Schema is now at /tmp/wrangler-latest/package/config-schema.json
```

If that fails, fall back to reading `./node_modules/wrangler/config-schema.json` from the current project — but note the version may be outdated.

Do not guess field names or structures — look them up in the schema.

## Format

- **JSONC** (`wrangler.jsonc`) — preferred for new projects. Supports comments.
- **JSON** (`wrangler.json`) — valid but no comments.
- **TOML** (`wrangler.toml`) — legacy format. Acceptable in existing content; only flag in new content.

## What to Validate

### Required fields

For executable examples, verify the config includes `name`, `compatibility_date`, and `main`. Check the schema for current required fields — these may change.

### Binding declarations

Every binding type has a specific top-level key and required sub-fields defined in the schema. Do not memorize these — read the schema's `RawConfig.properties` to find the correct key name and shape for each binding type.

Common validation errors:

- Wrong top-level key (e.g., `kv` instead of the correct key — check the schema)
- Missing required sub-fields within a binding declaration
- Mixing up singular vs plural key names

### Binding-code consistency

The `binding` or `name` field value in config must exactly match the property name used in code via `env.X`.

Check:

1. Every `env.X` reference in code has a corresponding binding declaration in config
2. Every binding in config is referenced in code (warn on unused)
3. Names match exactly (case-sensitive)
4. For Durable Objects: the `class_name` value matches the exact exported class name

### Durable Object migrations

New DO classes require a `migrations` entry in the config. Missing migrations cause deployment failures. Read the schema to confirm the current migration format and required fields.

### Secrets

Secrets must never appear in config files. They are set via `wrangler secret put`. If a `vars` block contains values that look like secrets (API keys, tokens, passwords), flag it.

### Environment overrides

The `env` key supports per-environment config overrides. Some fields inherit from the top level; others must be redeclared. Consult the schema for inheritance rules rather than assuming.

## Common Config Mistakes

These are procedural checks — verify each when reviewing config:

| Check                      | What to look for                                                |
| -------------------------- | --------------------------------------------------------------- |
| Missing `$schema`          | Config should reference the wrangler schema via `$schema` field |
| Stale `compatibility_date` | In docs, use `$today` placeholder for auto-replacement          |
| Missing DO migrations      | Every new DO class needs a migration entry                      |
| Binding name mismatch      | Config `binding`/`name` must exactly match `env.X` in code      |
| Secrets in config          | Never in `vars` — use `wrangler secret put`                     |
| Wrong binding key          | Verify the top-level key name against the schema                |
| Missing entrypoint         | `main` is required for executable examples                      |
| `class_name` mismatch      | Must match the exported class name, not the binding name        |
