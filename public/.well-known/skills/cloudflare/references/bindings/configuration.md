## Wrangler Configuration Patterns

### JSON vs TOML

**JSON (Recommended for new projects):**
```jsonc
// wrangler.jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-worker",
  "main": "src/index.ts",
  "compatibility_date": "2024-01-01",
  "vars": {
    "API_URL": "https://api.example.com"
  }
}
```

**TOML (Legacy):**
```toml
# wrangler.toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
API_URL = "https://api.example.com"
```

### Environment-Specific Configuration

```jsonc
{
  "name": "my-worker",
  "main": "src/index.ts",
  "compatibility_date": "2024-01-01",
  
  // Production bindings
  "vars": {
    "ENV": "production"
  },
  "kv_namespaces": [
    {
      "binding": "CACHE",
      "id": "prod-kv-id"
    }
  ],
  
  // Environment overrides
  "env": {
    "staging": {
      "vars": {
        "ENV": "staging"
      },
      "kv_namespaces": [
        {
          "binding": "CACHE",
          "id": "staging-kv-id