# Cloudflare Workers Smart Placement

Automatic workload placement optimization to minimize latency by running Workers closer to backend infrastructure rather than end users.

## Core Concept

Smart Placement automatically analyzes Worker request duration across Cloudflare's global network and intelligently routes requests to optimal data center locations. Instead of defaulting to the location closest to the end user, Smart Placement can forward requests to locations closer to backend infrastructure when this reduces overall request duration.

### When to Use

**Enable Smart Placement when:**
- Worker makes multiple round trips to backend services/databases
- Backend infrastructure is geographically concentrated
- Request duration dominated by backend latency rather than network latency from user
- Running backend logic in Workers (APIs, data aggregation, SSR with DB calls)

**Do NOT enable for:**
- Workers serving only static content or cached responses
- Workers without significant backend communication
- Pure edge logic (auth checks, redirects, simple transformations)
- Workers without fetch event handlers

### Key Architecture Pattern

**Recommended:** Split full-stack applications into separate Workers:
```
User → Frontend Worker (at edge, close to user)
         ↓ Service Binding
       Backend Worker (Smart Placement enabled, close to DB/API)
         ↓
       Database/Backend Service
```

This maintains fast, reactive frontends while optimizing backend latency.

## Quick Start

```toml
# wrangler.toml
[placement]
mode = "smart"
hint = "wnam"  # Optional: West North America
```

Deploy and wait 15 minutes for analysis. Check status via API or dashboard metrics.

## Requirements

- Wrangler 2.20.0+
- Analysis time: Up to 15 minutes after enabling
- Traffic requirements: Consistent traffic from multiple global locations
- Available on all Workers plans (Free, Paid, Enterprise)

## Placement Status Values

```typescript
type PlacementStatus = 
  | undefined  // Not yet analyzed
  | 'SUCCESS'  // Successfully optimized
  | 'INSUFFICIENT_INVOCATIONS'  // Not enough traffic
  | 'UNSUPPORTED_APPLICATION';  // Made Worker slower (reverted)
```

## CLI Commands

```bash
# Deploy with Smart Placement
wrangler deploy

# Check placement status
curl -H "Authorization: Bearer $TOKEN" \
  https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/services/$WORKER_NAME \
  | jq .result.placement_status

# Monitor
wrangler tail your-worker-name --header cf-placement
```

## In This Reference

- [configuration.md](./configuration.md) - wrangler.toml setup, placement hints, dashboard config
- [api.md](./api.md) - Placement Status API, cf-placement header, monitoring
- [patterns.md](./patterns.md) - Frontend/backend split, database workers, SSR patterns
- [gotchas.md](./gotchas.md) - Troubleshooting INSUFFICIENT_INVOCATIONS, performance issues

## See Also

- [workers](../workers/) - Worker runtime and fetch handlers
- [d1](../d1/) - D1 database that benefits from Smart Placement
- [durable-objects](../durable-objects/) - Durable Objects with backend logic
- [bindings](../bindings/) - Service bindings for frontend/backend split
