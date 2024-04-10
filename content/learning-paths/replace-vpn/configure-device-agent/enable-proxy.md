---
title: Proxy traffic through Gateway
pcx_content_type: overview
weight: 3
layout: learning-unit
---

{{<render file="zero-trust/_enable-proxy-intro.md">}}

## Enable the proxy

{{<render file="tunnel/_enable-gateway-proxy.md" productFolder="cloudflare-one">}}

Cloudflare will now proxy traffic from enrolled devices, except for the traffic excluded in your [split tunnel settings](/cloudflare-one/connections/connect-networks/private-net/cloudflared/#3-route-private-network-ips-through-warp). For more information on how Gateway forwards traffic, refer to [Gateway proxy](/cloudflare-one/policies/gateway/proxy/).
