# Cache Reserve Gotchas

## Common Issues and Solutions

### Issue: Assets Not Being Cached in Cache Reserve

**Diagnostics:**

```typescript
const debugEligibility = {
  checks: [
    'Verify asset is cacheable (cf-cache-status header)',
    'Check TTL >= 10 hours',
    'Confirm Content-Length header present',
    'Review Cache Rules configuration',
    'Check for Set-Cookie or Vary: * headers'
  ],
  
  tools: [
    'curl -I https://example.com/asset.jpg',
    'Check cf-cache-status header',
    'Review Cloudflare Trace output',
    'Check Logpush CacheReserveUsed field'
  ]
};
```

**Solutions:**

```typescript
// 1. Ensure minimum TTL (10+ hours)
response.headers.set('Cache-Control', 'public, max-age=36000');

// Or via Cache Rule:
const rule = {
  action_parameters: {
    edge_ttl: { mode: 'override_origin', default: 36000 }
  }
};

// 2. Add Content-Length
response.headers.set('Content-Length', bodySize.toString());

// 3. Remove blocking headers
response.headers.delete('Set-Cookie');
response.headers.set('Vary', 'Accept-Encoding'); // Not *
```

### Issue: High Class A Operations Costs

**Cause**: Frequent cache misses, short TTLs, or frequent revalidation

**Solutions:**

```typescript
// 1. Increase TTL for stable content
const optimizedTTL = {
  before: 3600,  // 1 hour (not eligible)
  after: 86400   // 24 hours (eligible + fewer rewrites)
};

// 2. Enable Tiered Cache (reduces direct Cache Reserve misses)

// 3. Use stale-while-revalidate (via fetch, not cache.put)
response.headers.set(
  'Cache-Control',
  'public, max-age=86400, stale-while-revalidate=86400'
);
```

### Issue: Purge Not Working as Expected

**Understanding purge behavior:**

```typescript
const purgeBehavior = {
  byURL: {
    cacheReserve: 'Immediately removed',
    edgeCache: 'Immediately removed',
    cost: 'Free'
  },
  
  byTag: {
    cacheReserve: 'Revalidation triggered, NOT removed',
    edgeCache: 'Immediately removed',
    storage: 'Continues until TTL expires',
    cost: 'Storage costs continue'
  }
};

// Solution: Use purge by URL for immediate removal
await purgeByURL(['https://example.com/asset.jpg']);

// Or: Disable + clear for complete removal
await disableCacheReserve(zoneId, token);
await clearAllCacheReserve(zoneId, token);
```

### Issue: Cache Reserve Disabled But Can't Clear

**Error**: "Cache Reserve must be OFF before clearing data"

**Solution:**

```typescript
const clearProcess = async (zoneId: string, token: string) => {
  // Step 1: Check current state
  const status = await getCacheReserveStatus(zoneId, token);
  
  // Step 2: Disable if enabled
  if (status.result.value !== 'off') {
    await disableCacheReserve(zoneId, token);
  }
  
  // Step 3: Wait briefly for propagation
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Step 4: Clear data
  const clearResult = await clearAllCacheReserve(zoneId, token);
  
  // Step 5: Monitor clear progress (can take up to 24 hours)
  let clearStatus;
  do {
    await new Promise(resolve => setTimeout(resolve, 60000));
    clearStatus = await getClearStatus(zoneId, token);
  } while (clearStatus.result.state === 'In-progress');
};
```

## Troubleshooting

### Diagnostic Commands

```bash
# Check Cache Reserve status
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/cache_reserve" \
  -H "Authorization: Bearer $API_TOKEN" | jq

# Check asset cache status
curl -I https://example.com/asset.jpg | grep -i cache
```

### Common Header Patterns

```typescript
// Successful: HIT + max-age >= 36000 + content-length present
// Not eligible: TTL < 10hrs | missing content-length | has set-cookie | vary: *
```

## Limits

### Minimum Requirements Checklist

- [ ] Paid Cache Reserve plan active
- [ ] Tiered Cache enabled (strongly recommended)
- [ ] Assets cacheable per standard rules
- [ ] TTL >= 10 hours (36000 seconds)
- [ ] Content-Length header present
- [ ] No Set-Cookie header (or using private directive)
- [ ] No Vary: * header
- [ ] Not an image transformation variant

### Key Limits

```typescript
const limits = {
  minTTL: 36000,              // 10 hours in seconds
  retentionDefault: 2592000,  // 30 days in seconds
  maxFileSize: Infinity,      // Same as R2 limits
  purgeClearTime: 86400000,   // Up to 24 hours in milliseconds
};
```

### API Endpoints

```typescript
const endpoints = {
  status: 'GET /zones/:zone_id/cache/cache_reserve',
  enable: 'PATCH /zones/:zone_id/cache/cache_reserve',
  disable: 'PATCH /zones/:zone_id/cache/cache_reserve',
  clear: 'POST /zones/:zone_id/cache/cache_reserve_clear',
  clearStatus: 'GET /zones/:zone_id/cache/cache_reserve_clear',
  purge: 'POST /zones/:zone_id/purge_cache',
  cacheRules: 'PUT /zones/:zone_id/rulesets/phases/http_request_cache_settings/entrypoint'
};
```

## Additional Resources

- **Official Docs**: https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/
- **API Reference**: https://developers.cloudflare.com/api/resources/cache/subresources/cache_reserve/
- **Cache Rules**: https://developers.cloudflare.com/cache/how-to/cache-rules/
- **Workers Cache API**: https://developers.cloudflare.com/workers/runtime-apis/cache/
- **R2 Documentation**: https://developers.cloudflare.com/r2/
- **Smart Shield**: https://developers.cloudflare.com/smart-shield/
- **Tiered Cache**: https://developers.cloudflare.com/cache/how-to/tiered-cache/

## See Also

- [README](./README.md) - Overview and core concepts
- [Configuration](./configuration.md) - Setup and Cache Rules
- [API Reference](./api.md) - Purging and monitoring
- [Patterns](./patterns.md) - Best practices and optimization
