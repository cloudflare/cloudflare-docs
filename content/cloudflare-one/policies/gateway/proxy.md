---
pcx_content_type: concept
title: Proxy
weight: 14
---

# Gateway proxy

You can forward [HTTP](/cloudflare-one/policies/gateway/initial-setup/http/) and [network](/cloudflare-one/policies/gateway/initial-setup/network/) traffic to Gateway for logging and filtering. Gateway can proxy both outbound traffic and traffic directed to resources connected via a Cloudflare Tunnel, GRE tunnel, or IPsec tunnel.

The Gateway proxy is required for filtering HTTP and network traffic via the WARP client in Gateway with WARP mode. To proxy HTTP traffic without deploying the WARP client, you can configure [PAC files](/cloudflare-one/connections/connect-devices/agentless/pac-files/) on your devices.

## Proxy protocols

### TCP

The default timings for proxy connections are:

- Connect timeout: 30 seconds
- Idle timeout: 8 hours

### UDP

To proxy traffic to internal DNS resolvers, select **UDP**. When enabled, all port 443 UDP traffic will be inspected by Gateway.

{{<beta heading="h3">}}ICMP{{</beta>}}

To proxy traffic for diagnostic tools such as `ping` and `traceroute`

{{<Aside>}}Gateway will proxy ICMP traffic, but it will not log or filter it.{{</Aside>}}

## Enable the Gateway proxy

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
2. Enable **Proxy** for [TCP](#tcp).
3. (Optional) Enable **Proxy** for [UDP](#udp).
4. (Optional) Enable **Proxy** for [ICMP](#icmp).

Additionally, if you choose to filter HTTP traffic, we recommend you also enable **TLS decryption** to ensure HTTPS is properly filtered.
