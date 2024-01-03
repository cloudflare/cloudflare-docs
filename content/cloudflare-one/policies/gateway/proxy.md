---
pcx_content_type: concept
title: Proxy
weight: 14
---

# Gateway proxy

{{<render file="gateway/_proxy.md" productFolder="cloudflare-one">}}

## Proxy protocols

Gateway supports proxying TCP, UDP, and ICMP traffic.

### TCP

When the proxy is enabled, Gateway will always forward TCP traffic.

By default, TCP connection attempts will timeout after 30 seconds and idle connections will disconnect after 8 hours.

### UDP

The UDP proxy forwards UDP traffic such as VoIP, [internal DNS requests](/cloudflare-one/connections/connect-networks/private-net/cloudflared/private-dns/), and thick client applications.

When the UDP proxy is enabled, Gateway will force all HTTP/3 traffic to HTTP/2 to allow inspection. Otherwise, HTTP/3 traffic will bypass inspection. For more information, refer to [HTTP/3 inspection](/cloudflare-one/policies/gateway/http-policies/http3/).

{{<heading-pill style="beta" heading="h3">}}ICMP{{</heading-pill>}}

The ICMP proxy forwards traffic for diagnostic tools such as `ping` and `traceroute`.

{{<Aside type="warning" header="Limitation">}}Gateway cannot log or filter ICMP traffic.{{</Aside>}}

## Enable the Gateway proxy

{{<render file="gateway/_enable-gateway-proxy.md" productFolder="cloudflare-one">}}
