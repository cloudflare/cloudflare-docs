# Cloudflare Tunnel

Secure outbound-only connections between infrastructure and Cloudflare's global network.

## Overview

Cloudflare Tunnel (formerly Argo Tunnel) enables:
- **Outbound-only connections** - No inbound ports or firewall changes
- **Public hostname routing** - Expose local services to internet
- **Private network access** - Connect internal networks via WARP
- **Zero Trust integration** - Built-in access policies

**Architecture**: Tunnel (persistent object) → Connector (`cloudflared` process) → Origin services

## Quick Start

```bash
# Install cloudflared
brew install cloudflared  # macOS

# Authenticate
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create my-tunnel

# Route DNS
cloudflared tunnel route dns my-tunnel app.example.com

# Run tunnel
cloudflared tunnel run my-tunnel
```

## Core Commands

```bash
# Tunnel lifecycle
cloudflared tunnel create <name>
cloudflared tunnel list
cloudflared tunnel info <name>
cloudflared tunnel delete <name>

# DNS routing
cloudflared tunnel route dns <tunnel> <hostname>
cloudflared tunnel route list

# Private network
cloudflared tunnel route ip add 10.0.0.0/8 <tunnel>

# Run tunnel
cloudflared tunnel run <name>
```

## Configuration Example

```yaml
# ~/.cloudflared/config.yml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json

ingress:
  - hostname: app.example.com
    service: http://localhost:8000
  - hostname: api.example.com
    service: https://localhost:8443
    originRequest:
      noTLSVerify: true
  - service: http_status:404
```

## In This Reference

- [configuration.md](./configuration.md) - Config file options, ingress rules, TLS settings
- [api.md](./api.md) - Cloudflare API, remotely-managed tunnels, programmatic control
- [patterns.md](./patterns.md) - Docker, Kubernetes, HA, service types, use cases
- [gotchas.md](./gotchas.md) - Troubleshooting, limitations, best practices

## See Also

- [workers](../workers/) - Workers with Tunnel integration
- [access](../access/) - Zero Trust access policies
- [warp](../warp/) - WARP client for private networks
