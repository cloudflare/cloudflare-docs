## Troubleshooting

### Binding Not Found
```
Error: env.MY_KV is undefined
```
**Solutions:**
1. Check binding name matches config
2. Run `npx wrangler types` to regenerate types
3. Verify binding exists in current environment
4. Check for typos in `wrangler.jsonc`

### Type Errors
```
Property 'MY_KV' does not exist on type 'Env'
```
**Solution:** Run `npx wrangler types`

### Preview Binding Required
```
Error: preview_id is required for --remote
```
**Solution:** Add preview_id to config or use local mode

### Stale Binding Values
```
Secret updated but Worker still uses old value
```
**Solution:** Avoid caching `env` values in global scope

## Security Best Practices

1. **Never commit secrets to config files**
   - Use `npx wrangler secret put` for sensitive values
   - Secrets are e