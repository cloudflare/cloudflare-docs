---
order: 4
---

# Route to a Tunnel

Cloudflare can route traffic to your Argo Tunnel connection using a [DNS record](/connections/connect-apps/routing-to-tunnel/dns) or Cloudflare’s [Load Balancer](/connections/connect-apps/routing-to-tunnel/lb) product.

You can configure either option from the Cloudflare dashboard by pointing a DNS CNAME record or a Load Balancer pool to the Argo Tunnel subdomain for your connection. You can also associate these records with your Tunnel from `cloudflared` directly.

Argo Tunnel can also [be configured](/connections/connect-apps/configuration/ingress) to route traffic to multiple hostnames to multiple services in your environment.