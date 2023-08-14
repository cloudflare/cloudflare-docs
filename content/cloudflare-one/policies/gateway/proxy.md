---
pcx_content_type: concept
title: Proxy
weight: 14
---

# Gateway proxy

You can forward traffic to Gateway to filter both outbound traffic as well as traffic directed to resources connected via a Cloudflare Tunnel, GRE tunnel, and/or IPsec tunnel.

The proxy is required for filtering HTTP and network traffic via Gateway.

To proxy traffic agentlessly, you can use [PAC files](/cloudflare-one/connections/connect-devices/agentless/pac-files/).

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
