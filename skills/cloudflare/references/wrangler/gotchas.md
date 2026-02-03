# Wrangler Common Issues

Pitfalls, limits, and troubleshooting.

## Common Gotchas

### Binding IDs vs Names
- Bindings use `binding` (code name) and `id`/`database_id`/`bucket_name` (resource ID)
- Preview bindings need separate IDs: `preview_id`, `preview_database_id`

### Environment Inheritance
- Non-inheritable keys (bindings, vars) must be redefined per environment
- Inheritable keys (routes, compatibility_date) can be overridden

### Local vs Remote Dev
- `wrangler dev` (default): Local simulation, fast, limited accuracy
- `wrangler dev --remote`: Remote execution, slower, production-accurate

### Compatibility Dates
Always set `compatibility_date` to avoid unexpected runtime changes:
```jsonc
{ "compatibility_date": "2025-01-01" }
```

### Durable Objects Need script_name
With `getPlatformProxy`, always specify `script_name`:
```jsonc
{
  "durable_objects": {
    "bindings": [
      { "name": "MY_DO", "class_name": "MyDO", "script_name": "my-worker" }
    ]
  }
}
```

### Secrets in Local Dev
Secrets set with `wrangler secret put` only work in deployed Workers. For local dev, use `.dev.vars`.

### Node.js Compatibility
Some bindings (Hyperdrive with `pg`) require Node.js compatibility:
```jsonc
{ "compatibility_flags": ["nodejs_compat_v2"] }
```

## Troubleshooting

### Authentication Issues
```bash
wrangler logout
wrangler login
wrangler whoami
```

### Configuration Errors
```bash
wrangler check  # Validate config
```
Use wrangler.jsonc with `$schema` for validation.

### Binding Not Available
- Check binding exists in config
- For environments, ensure binding defined for that env
- Local dev: some bindings need `--remote`

### Deployment Failures
```bash
wrangler tail              # Check logs
wrangler deploy --dry-run  # Validate
wrangler whoami            # Check account limits
```

### Local Development Issues
```bash
rm -rf .wrangler/state     # Clear local state
wrangler dev --remote      # Use remote bindings
wrangler dev --persist-to ./local-state  # Custom persist location
```

## Resources

- Docs: https://developers.cloudflare.com/workers/wrangler/
- Config: https://developers.cloudflare.com/workers/wrangler/configuration/
- Commands: https://developers.cloudflare.com/workers/wrangler/commands/
- Examples: https://github.com/cloudflare/workers-sdk/tree/main/templates
- Discord: https://discord.gg/cloudflaredev

## See Also

- [README.md](./README.md) - Commands
- [configuration.md](./configuration.md) - Config
- [api.md](./api.md) - Programmatic API
- [patterns.md](./patterns.md) - Workflows
