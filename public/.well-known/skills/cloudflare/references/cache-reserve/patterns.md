# Cache Reserve Patterns

## Best Practices

### 1. Always Enable Tiered Cache

```typescript
// Cache Reserve is designed for use WITH Tiered Cache
const configuration = {
  tieredCache: 'enabled',    // Required for optimal performance
  cacheReserve: 'enabled',   // Works best with Tiered Cache
  
  hierarchy: [
    'Lower-Tier Cache (visitor)',
    'Upper-Tier Cache (origin region)',
    'Cache Reserve (persistent)',
    'Origin'
  ]
};
```

### 2. Set Appropriate Cache-Control Headers

```typescript
// Origin response headers for Cache Reserve eligibility
const originHeaders = {
  'Cache-Control': 'public, max-age=86400', // 24 hours minimum 10 hours
  'Content-Length': '1024000', // Required for eligibility
  'Cache-Tag': 'images,product-123', // Optional: For purging
  'ETag': '"abc123"', // Optional: Support revalidation
  'Last-Modified': 'Wed, 21 Oct 2025 07:28:00 GMT',
  
  // Avoid: Prevents caching
  // 'Set-Cookie': 'session=xyz',  // Remove or use private directive
  // 'Vary': '*',                  // Not compatible
};
```

### 3. Use Cache Rules for Fine-Grained Control

```typescript
// Different TTLs for different content types
const cacheRules = [
  {
    description: 'Long-term cache for immutable assets',
    expression: '(http.request.uri.path matches "^/static/.*\\.[a-f0-9]{8}\\.")',
    action_parameters: {
      cache_reserve: { eligible: true },
      edge_ttl: { mode: 'override_origin', default: 2592000 }, // 30 days
      cache: true
    }
  },
  {
    description: 'Moderate cache for regular images',
    expression: '(http.request.uri.path matches "\\.(jpg|png|webp)$")',
    action_parameters: {
      cache_reserve: { eligible: true },
      edge_ttl: { mode: 'override_origin', default: 86400 }, // 24 hours
      cache: true
    }
  },
  {
    description: 'Exclude API from Cache Reserve',
    expression: '(http.request.uri.path matches "^/api/")',
    action_parameters: { cache_reserve: { eligible: false }, cache: false }
  }
];
```

### 4. Ensuring Cache Reserve Eligibility in Workers

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await fetch(request);
    
    if (response.ok) {
      const headers = new Headers(response.headers);
      
      // Set minimum 10-hour cache
      headers.set('Cache-Control', 'public, max-age=36000');
      
      // Remove Set-Cookie if present (prevents caching)
      headers.delete('Set-Cookie');
      
      // Ensure Content-Length is present
      if (!headers.has('Content-Length')) {
        const blob = await response.blob();
        headers.set('Content-Length', blob.size.toString());
        
        return new Response(blob, {
          status: response.status,
          statusText: response.statusText,
          headers
        });
      }
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }
    
    return response;
  }
};
```

### 5. Hostname Best Practices

```typescript
// ✅ CORRECT: Use Worker's hostname for efficient caching
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return await fetch(request); // Keep the Worker's hostname
  }
};

// ❌ WRONG: Overriding hostname causes unnecessary DNS lookups
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    url.hostname = 'different-host.com'; // Avoid this!
    return await fetch(url.toString());
  }
};
```

## Architecture Patterns

### Multi-Tier Caching + Immutable Assets

```typescript
// Optimal: L1 (visitor) → L2 (region) → L3 (Cache Reserve) → Origin
// Each miss backfills all upstream layers

// Immutable asset optimization with content hashing
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const isImmutable = /\.[a-f0-9]{8,}\.(js|css|jpg|png|woff2)$/.test(url.pathname);
    
    const response = await fetch(request);
    
    if (isImmutable) {
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
      return new Response(response.body, { status: response.status, headers });
    }
    
    return response;
  }
};
```

## Cost Optimization

```typescript
// Typical savings: 50-80% reduction in origin egress
// Origin cost (AWS: $0.09/GB) vs Cache Reserve ($0.015/GB-month + $0.36/M reads)

// 1. Set appropriate TTLs
const optimizeTTL = {
  tooShort: 3600,    // 1 hour - not eligible
  optimal: 86400,    // 24 hours - reduces rewrites
  tooLong: 2592000   // 30 days - use cautiously
};

// 2. Cache high-value, stable assets: images, media, fonts, archives
// 3. Exclude frequently changing: /api/, user-specific, JSON data
// 4. Note: Cache Reserve requests uncompressed from origin, compresses for visitors
```

## See Also

- [README](./README.md) - Overview and core concepts
- [Configuration](./configuration.md) - Setup and Cache Rules
- [API Reference](./api.md) - Purging and monitoring
- [Gotchas](./gotchas.md) - Common issues and troubleshooting
