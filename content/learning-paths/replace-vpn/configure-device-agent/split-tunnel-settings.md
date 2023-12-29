---
title: Define Split Tunnel settings
pcx_content_type: overview
weight: 5
layout: learning-unit
---

Split tunnel settings determine which traffic WARP does and does not proxy.

## Update Split Tunnels mode

{{<render file="warp/_change-split-tunnels-mode.md" productFolder="cloudflare-one">}}

## Add a route

{{<render file="warp/_add-split-tunnels-route.md" productFolder="cloudflare-one">}}

## Best practices

If you intend to send all internal and external destination traffic through Cloudflare's global network, you should opt for **Exclude IPs and domains** mode. This means that you will be proxying everything through the WARP tunnel with the exception of IPs and hosts defined explicitly within the Split Tunnel list.

If you intend to only use WARP to proxy private destination traffic, you can operate in **Include IPs and domains** mode, in which you explicitly define which IP ranges and domains should be included in the WARP routing table. For example, if you will only proxy private network traffic and your resources all live within `10.0.0.0/8`, add `10.0.0.0/8` to your Split Tunnel include list. Your list should also include the [domains necessary for Cloudflare Zero Trust functionality](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#cloudflare-zero-trust-domains).

To learn more about how the WARP client routes traffic, refer to our [WARP architecture guide](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/).
