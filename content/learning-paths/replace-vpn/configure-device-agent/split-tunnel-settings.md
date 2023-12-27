---
title: Define Split Tunnel settings
pcx_content_type: overview
weight: 4
layout: learning-unit
---

This will determine which traffic WARP does and does not proxy. If you added private network routes in the 10.0.0.0 range, ensure that these IP addresses are included in WARP.

## Best practices

How should I configure my split tunnels?
If you intend to run in an equivalent ‘full tunnel’ mode when using Cloudflare Zero Trust, meaning you will be sending all internal and external destination traffic through the Cloudflare Network, you should opt for Exclude mode for your split tunnel rules. This will mean that you will be proxying everything through the WARP tunnel with the exception of IPs and hosts defined explicitly within the split tunnel list, which will be excluded from your routing table. If you intend to only use WARP to proxy private destination traffic, you can operate in ‘Include’ mode, in which you explicitly define which IP ranges and domains should be included in your routing table. For example, if you will only proxy private traffic, and your private network resources all live within 10.0.0.0/8, your Include-mode split tunnel table should include 10.0.0.0/8. It should also include cloudflareaccess.com and cloudflareclient.com.

## Update Split Tunnels mode

{{<render file="warp/_change-split-tunnels-mode.md" productFolder="cloudflare-one">}}

## Add a route

{{<render file="warp/_add-split-tunnels-route.md" productFolder="cloudflare-one">}}

