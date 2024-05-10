---
pcx_content_type: concept
title: Public hostnames
weight: 5
---

# Public hostnames

With Cloudflare Tunnel, you can expose your HTTP resources to the Internet via a public hostname. For example, you can add a route that points `docs.example.com` to `localhost:8080`. Anyone can now view your local application by going to `docs.example.com` in their web browser.

Cloudflare can route traffic to your Cloudflare Tunnel connection using a [DNS record](/cloudflare-one/connections/connect-networks/routing-to-tunnel/dns/) or [Cloudflare Load Balancer](/cloudflare-one/connections/connect-networks/routing-to-tunnel/lb/). You can configure either option from the Cloudflare dashboard by pointing a DNS `CNAME` record or a load balancer pool to the Cloudflare Tunnel subdomain for your connection. You can also associate these records with your tunnel from `cloudflared` directly.
