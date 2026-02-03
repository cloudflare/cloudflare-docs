# Cache Reserve Configuration

## Dashboard Setup

**Minimum steps to enable:**

```bash
# Navigate to dashboard
https://dash.cloudflare.com/caching/cache-reserve

# Click "Enable Storage Sync" or "Purchase" button
```

**Prerequisites:**
- Paid Cache Reserve plan required
- Tiered Cache strongly recommended (Cache Reserve checks for this)

## API Configuration

```typescript
// Enable Cache Reserve
const enableCacheReserve = async (zoneId: string, apiToken: string) => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/cache/cache_reserve`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: 'on' })
    }
  );
  return await response.json();
};

// Check Cache Reserve status
const getCacheReserveStatus = async (zoneId: string, apiToken: string) => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/cache/cache_reserve`,
    {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${apiToken}` }
    }
  );
  return await response.json();
};
```

### Required API Token Permissions

- `Zone Settings Read`
- `Zone Settings Write`
- `Zone Read`
- `Zone Write`

## Cache Rules Integration

Control Cache Reserve eligibility via Cache Rules:

```typescript
// Enable Cache Reserve for static assets with long TTL
const staticAssetRule = {
  action: 'set_cache_settings',
  action_parameters: {
    cache_reserve: {
      eligible: true,
      minimum_file_ttl: 86400 // 24 hours
    },
    edge_ttl: {
      mode: 'override_origin',
      default: 86400
    },
    cache: true
  },
  expression: '(http.request.uri.path matches "\\.(jpg|jpeg|png|gif|webp|pdf|zip)$")'
};

// Disable Cache Reserve for frequently updated content
const dynamicContentRule = {
  action: 'set_cache_settings',
  action_parameters: {
    cache_reserve: { eligible: false }
  },
  expression: '(http.request.uri.path matches "^/api/")'
};

// Cache Reserve for specific origin with minimum 12-hour TTL
const specificOriginRule = {
  action: 'set_cache_settings',
  action_parameters: {
    cache_reserve: {
      eligible: true,
      minimum_file_ttl: 43200 // 12 hours
    },
    edge_ttl: { mode: 'override_origin', default: 43200 },
    cache: true
  },
  expression: '(http.host eq "cdn.example.com")'
};
```

### Creating Rules via API

```typescript
const createCacheRule = async (
  zoneId: string,
  apiToken: string,
  rule: CacheRuleWithReserve
) => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/rulesets/phases/http_request_cache_settings/entrypoint`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rules: [rule] })
    }
  );
  return await response.json();
};
```

## Wrangler Integration

Cache Reserve works automatically with Workers deployed via Wrangler. No special configuration needed.

```jsonc
// wrangler.jsonc
{
  "name": "cache-reserve-worker",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-11", // Use current date for new projects
  
  // Cache Reserve works automatically with standard routes
  "routes": [
    { "pattern": "example.com/*", "zone_name": "example.com" }
  ]
  // No special Cache Reserve configuration needed
  // Enable via Dashboard or API
}
```

### Development and Testing

```bash
# Local development (Cache Reserve not active locally)
npx wrangler dev

# Deploy to production (Cache Reserve active if enabled for zone)
npx wrangler deploy

# View logs (including cache behavior)
npx wrangler tail
```

## See Also

- [README](./README.md) - Overview and core concepts
- [API Reference](./api.md) - Purging and monitoring APIs
- [Patterns](./patterns.md) - Best practices and optimization
- [Gotchas](./gotchas.md) - Common issues and troubleshooting
