## Integration with Tiered Cache

Combine Argo Smart Routing with Tiered Cache for maximum performance:

**Endpoint:** `PATCH /zones/{zone_id}/argo/tiered_caching`

**Benefits:**
- Argo optimizes routing between edge and origin
- Tiered Cache reduces origin requests via cache hierarchy
- Combined: optimal network path + reduced origin load

**Enable Both Services:**
```typescript
async function enableArgoWithTieredCache(
  client: Cloudflare,
  zoneId: string
) {
  // Enable Argo Smart Routing
  await client.argo.smartRouting.edit({
    zone_id: zoneId,
    value: 'on',
  });

  // Enable Tiered Caching
  await client.argo.tieredCaching.edit({
    zone_id: zoneId,
    value: 'on',
  });

  console.log('Argo Smart Routing and Tiered Cache enabled');
}
```

**Architecture Flow:**
```
Visitor → Edge Data Center (Lower-Tier)
         ↓ [Cache Miss]
         Upper-Tier Data Center
         ↓ [Cache Miss + Argo Smart Route]
         Origin Server
```

## Usage-Based Billing Management

### S