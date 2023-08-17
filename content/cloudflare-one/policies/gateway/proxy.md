---
pcx_content_type: concept
title: Proxy
weight: 14
---

# Gateway proxy

You can forward [HTTP](/cloudflare-one/policies/gateway/initial-setup/http/) and [network](/cloudflare-one/policies/gateway/initial-setup/network/) traffic to Gateway for logging and filtering. Gateway can proxy both outbound traffic and traffic directed to resources connected via a Cloudflare Tunnel, GRE tunnel, or IPsec tunnel.

The Gateway proxy is required for filtering HTTP and network traffic via the WARP client in Gateway with WARP mode. To proxy HTTP traffic without deploying the WARP client, you can configure [PAC files](/cloudflare-one/connections/connect-devices/agentless/pac-files/) on your devices.

## Proxy protocols

Gateway supports proxying TCP, UDP, and ICMP traffic.

### TCP

When the proxy is enabled, Gateway will always forward TCP traffic.

By default, TCP connection attempts will timeout after 30 seconds and idle connections will disconnect after 8 hours.

### UDP

The UDP proxy forwards traffic to internal DNS resolvers. This allows Gateway to inspect all port 443 UDP traffic.

When the UDP proxy is enabled, Gateway will force all HTTP/3 traffic to HTTP/2 to allow inspection. For more information, refer to [HTTP/3 inspection](/cloudflare-one/policies/gateway/http-policies/http3/).

{{<beta heading="h3">}}ICMP{{</beta>}}

The ICMP proxy forwards traffic for diagnostic tools such as `ping` and `traceroute`.

{{<Aside type="warning" header="Limitation">}}Gateway cannot log or filter ICMP traffic.{{</Aside>}}

## Enable the Gateway proxy

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
2. Enable **Proxy** for TCP.
3. (Optional) Depending on your use case, you can enable **UDP** and/or **ICMP**.

If you want to inspect HTTP traffic, we recommend you enable [**TLS decryption**](/cloudflare-one/policies/gateway/http-policies/tls-decryption/) to include HTTPS traffic.
