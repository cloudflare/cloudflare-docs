---
_build:
  publishResources: false
  render: never
  list: never
---

You can forward [HTTP](/cloudflare-one/policies/gateway/initial-setup/http/) and [network](/cloudflare-one/policies/gateway/initial-setup/network/) traffic to Gateway for logging and filtering. Gateway can proxy both outbound traffic and traffic directed to resources connected via a Cloudflare Tunnel, GRE tunnel, or IPsec tunnel.

The Gateway proxy is required for filtering HTTP and network traffic via the WARP client in Gateway with WARP mode. To proxy HTTP traffic without deploying the WARP client, you can configure [PAC files](/cloudflare-one/connections/connect-devices/agentless/pac-files/) on your devices.
