---
order: 4
pcx-content-type: concept
---

# Route traffic

Cloudflare can route traffic to your Cloudflare Tunnel connection using a [DNS record](/connections/connect-apps/routing-to-tunnel/dns) or Cloudflare’s [Load Balancer](/connections/connect-apps/routing-to-tunnel/lb) product.

You can configure either option from the Cloudflare dashboard by pointing a DNS CNAME record or a Load Balancer pool to the Cloudflare Tunnel subdomain for your connection. You can also associate these records with your Tunnel from `cloudflared` directly.

Cloudflare Tunnel can also be configured to route traffic to multiple hostnames to [multiple services](/connections/connect-apps/configuration/configuration-file/ingress) in your environment.
