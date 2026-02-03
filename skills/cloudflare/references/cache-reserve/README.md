# Cloudflare Cache Reserve

**Persistent cache storage built on R2 for long-term content retention**

## Overview

Cache Reserve is Cloudflare's persistent, large-scale cache storage layer built on R2. It acts as the ultimate upper-tier cache, storing cacheable content for extended periods (30+ days) to maximize cache hits, reduce origin egress fees, and shield origins from repeated requests for long-tail content.

## Core Concepts

### What is Cache Reserve?

- **Persistent storage layer**: Built on R2, sits above tiered cache hierarchy
- **Long-term retention**: 30-day default retention, extended on each access
- **Automatic operation**: Works seamlessly with existing CDN, no code changes required
- **Origin shielding**: Dramatically reduces origin egress by serving cached content longer
- **Usage-based pricing**: Pay only for storage + read/write operations

### Cache Hierarchy

```
Visitor Request
    ↓
Lower-Tier Cache (closest to visitor)
    ↓ (on miss)
Upper-Tier Cache (closest to origin)
    ↓ (on miss)
Cache Reserve (R2 persistent storage)
    ↓ (on miss)
Origin Server
```

### How It Works

1. **On cache miss**: Content fetched from origin �� written to Cache Reserve + edge caches simultaneously
2. **On edge eviction**: Content may be evicted from edge cache but remains in Cache Reserve
3. **On subsequent request**: If edge cache misses but Cache Reserve hits → content restored to edge caches
4. **Retention**: Assets remain in Cache Reserve for 30 days since last access (configurable via TTL)

## Asset Eligibility

Cache Reserve only stores assets meeting **ALL** criteria:

- Cacheable per Cloudflare's standard rules
- Minimum 10-hour TTL (36000 seconds)
- `Content-Length` header present
- Original files only (not transformed images)

### Not Eligible

- Assets with TTL < 10 hours
- Responses without `Content-Length` header
- Image transformation variants (original images are eligible)
- Responses with `Set-Cookie` headers
- Responses with `Vary: *` header
- Assets from R2 public buckets on same zone
- O2O (Orange-to-Orange) setup requests

## Quick Start

```bash
# Enable via Dashboard
https://dash.cloudflare.com/caching/cache-reserve
# Click "Enable Storage Sync" or "Purchase" button
```

**Prerequisites:**
- Paid Cache Reserve plan required
- Tiered Cache strongly recommended

## Essential Commands

```bash
# Check Cache Reserve status
curl -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/cache_reserve" \
  -H "Authorization: Bearer $API_TOKEN"

# Enable Cache Reserve
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/cache_reserve" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value": "on"}'

# Check asset cache status
curl -I https://example.com/asset.jpg | grep -i cache
```

## See Also

- [Configuration](./configuration.md) - Setup, API, and Cache Rules
- [API Reference](./api.md) - Purging, monitoring, and management APIs
- [Patterns](./patterns.md) - Best practices and architecture patterns
- [Gotchas](./gotchas.md) - Common issues, troubleshooting, limits
