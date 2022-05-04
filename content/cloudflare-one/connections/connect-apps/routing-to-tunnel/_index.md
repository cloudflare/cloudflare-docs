---
pcx-content-type: concept
title: Route traffic
weight: 5
---

# Route traffic

Cloudflare can route traffic to your Cloudflare Tunnel connection using a [DNS record](/cloudflare-one/connections/connect-apps/routing-to-tunnel/dns/) or Cloudflare’s [Load Balancer](/cloudflare-one/connections/connect-apps/routing-to-tunnel/lb/) product.

You can configure either option from the Cloudflare dashboard by pointing a DNS CNAME record or a Load Balancer pool to the Cloudflare Tunnel subdomain for your connection. You can also associate these records with your Tunnel from `cloudflared` directly.

Cloudflare Tunnel can also be configured to route traffic to multiple hostnames to [multiple services](/cloudflare-one/connections/connect-apps/configuration/local-management/ingress/) in your environment.
