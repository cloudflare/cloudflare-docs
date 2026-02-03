## Wrangler CLI Integration

Wrangler uses Cloudflare API internally:

```bash
# Configure authentication
wrangler login
# Or
export CLOUDFLARE_API_TOKEN='token'

# Common commands that use API
wrangler deploy              # Uploads worker via API
wrangler kv:key put          # KV operations
wrangler r2 bucket create    # R2 operations
wrangler d1 execute          # D1 operations
wrangler pages deploy        # Pages operations

# Get API configuration
wrangler whoami              # Shows authenticated user
```