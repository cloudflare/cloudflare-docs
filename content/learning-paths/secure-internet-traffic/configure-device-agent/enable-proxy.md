---
title: Proxy traffic through Gateway
pcx_content_type: overview
weight: 3
layout: learning-unit
---

{{<render file="zero-trust/_enable-proxy-intro.md">}}

## Enable the proxy

1. Go to **Settings** > **Network**.
2. Enable **Proxy** for TCP.
3. (Recommended) To proxy all port `443` traffic, including internal DNS queries, select **UDP**.
4. (Optional) To scan file uploads and downloads for malware, [enable anti-virus scanning](/cloudflare-one/policies/gateway/http-policies/antivirus-scanning/).

Cloudflare will now proxy traffic from enrolled devices, except for the traffic excluded in your [split tunnel settings](/cloudflare-one/connections/connect-networks/private-net/cloudflared/#3-route-private-network-ips-through-warp). For more information on how Gateway forwards traffic, refer to [Gateway proxy](/cloudflare-one/policies/gateway/proxy/).
