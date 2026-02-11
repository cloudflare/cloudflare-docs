# Cloudflare Workers for Platforms

Multi-tenant platform with isolated customer code execution at scale.

## Use Cases

- Multi-tenant SaaS running customer code
- AI-generated code execution in secure sandboxes
- Programmable platforms with isolated compute
- Edge functions/serverless platforms
- Website builders with static + dynamic content
- Unlimited app deployment at scale

**NOT for general Workers** - only for Workers for Platforms architecture.

## Architecture

**4 Components:**
1. **Dispatch Namespace** - Container for unlimited customer Workers, automatic isolation, untrusted mode
2. **Dynamic Dispatch Worker** - Entry point, routes requests, enforces platform logic (auth, limits, validation)
3. **User Workers** - Customer code in isolated sandboxes, API-deployed, optional bindings (KV/D1/R2/DO)
4. **Outbound Worker** (optional) - Intercepts external fetch, controls egress, logs subrequests

**Request Flow:**
```
Request → Dispatch Worker → Determines user Worker → env.DISPATCHER.get("customer") 
→ User Worker executes (Outbound Worker for external fetch) → Response → Dispatch Worker → Client
```

## Key Features

- Unlimited Workers per namespace (no script limits)
- Automatic tenant isolation
- Custom CPU/subrequest limits per customer
- Hostname routing (subdomains/vanity domains)
- Egress/ingress control
- Static assets support
- Tags for bulk operations

## Quick Start

See [configuration.md](./configuration.md), [api.md](./api.md), [patterns.md](./patterns.md), [gotchas.md](./gotchas.md)

## Refs

- [Docs](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/)
- [Starter Kit](https://github.com/cloudflare/templates/tree/main/worker-publisher-template)
- [VibeSDK](https://github.com/cloudflare/vibesdk)
