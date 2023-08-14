---
pcx_content_type: concept
title: Proxy
weight: 14
---

# Gateway proxy

You can forward traffic to Gateway to filter both outbound traffic as well as traffic directed to resources connected via a Cloudflare Tunnel, GRE tunnel, and/or IPsec tunnel.

## Enable the Gateway proxy

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
2. Enable **Proxy** for TCP.
3. (Optional) Enable **Proxy** for UDP.
4. (Optional) **TLS decryption**.
5. To ensure HTTPS is proxied correctly, enable **TLS decryption**.

## Proxy protocols

### TCP

### UDP

When enabled, all port 443 UDP traffic will be inspected by Gateway.

{{<beta heading="h3">}}ICMP{{</beta>}}
