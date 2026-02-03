# Workerd Runtime

V8-based JS/Wasm runtime powering Cloudflare Workers. Use as app server, dev tool, or HTTP proxy.

## When to Use
- Local Workers development (via Wrangler)
- Self-hosted Workers runtime
- Custom embedded runtime
- Debugging runtime-specific issues

## Key Features
- **Standards-based**: Fetch API, Web Crypto, Streams, WebSocket
- **Nanoservices**: Service bindings with local call performance
- **Capability security**: Explicit bindings prevent SSRF
- **Backwards compatible**: Version = max compat date supported

## Architecture
```
Config (workerd.capnp)
├── Services (workers/endpoints)
├── Sockets (HTTP/HTTPS listeners)
└── Extensions (global capabilities)
```

## Quick Start
```bash
workerd serve config.capnp
workerd compile config.capnp myConfig -o binary
workerd test config.capnp
```

## Core Concepts
- **Service**: Named endpoint (worker/network/disk/external)
- **Binding**: Capability-based resource access (KV/DO/R2/services)
- **Compatibility date**: Feature gate (always set!)
- **Modules**: ES modules (recommended) or service worker syntax

## See Also
- [configuration.md](./configuration.md) - Config format, services, bindings
- [api.md](./api.md) - Runtime APIs, C++ embedding
- [patterns.md](./patterns.md) - Multi-service, DO, proxies
- [gotchas.md](./gotchas.md) - Common errors, debugging

## References
- [GitHub](https://github.com/cloudflare/workerd)
- [Compat Dates](https://developers.cloudflare.com/workers/configuration/compatibility-dates/)
- [workerd.capnp](https://github.com/cloudflare/workerd/blob/main/src/workerd/server/workerd.capnp)
