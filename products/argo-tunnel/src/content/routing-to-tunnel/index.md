---
order: 3
---

# Route to Argo Tunnel

Cloudflare can route traffic to your Argo Tunnel connection using a [DNS record](/routing-to-tunnel/dns) or Cloudflare’s [Load Balancer](/routing-to-tunnel/lb) product.

You can configure either option from the Cloudflare dashboard by pointing a DNS CNAME record or a Load Balancer pool to the Argo Tunnel subdomain for your connection. You can also associate these records with your Tunnel from `cloudflared` directly.
