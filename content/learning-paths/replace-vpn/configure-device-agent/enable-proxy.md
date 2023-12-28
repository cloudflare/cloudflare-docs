---
title: Proxy traffic through Gateway
pcx_content_type: overview
weight: 3
layout: learning-unit
---

With Cloudflare Gateway, you can log and filter DNS, network, and HTTP traffic from devices running the WARP client. This includes traffic to the public Internet and traffic directed to your private network. DNS filtering is enabled by default since the WARP client sends DNS queries to Cloudflare's public DNS resolver, [1.1.1.1](/1.1.1.1/). To enable network and HTTP filtering, you will need to allow Cloudflare Gateway to proxy that traffic.

## Enable the proxy

To forward network and HTTP traffic to Gateway:

{{<render file="gateway/_enable-gateway-proxy.md" productFolder="cloudflare-one">}}

To learn more about these settings, refer to [Proxy protocols](/cloudflare-one/policies/gateway/proxy/#proxy-protocols).
