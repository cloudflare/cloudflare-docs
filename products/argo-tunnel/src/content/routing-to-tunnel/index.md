---
order: 4
---

# Route to a Tunnel

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Cloudflare can route traffic to your Argo Tunnel connection using a [DNS record](/routing-to-tunnel/dns) or Cloudflare’s [Load Balancer](/routing-to-tunnel/lb) product.

You can configure either option from the Cloudflare dashboard by pointing a DNS CNAME record or a Load Balancer pool to the Argo Tunnel subdomain for your connection. You can also associate these records with your Tunnel from `cloudflared` directly.

Argo Tunnel can also [be configured](/configuration/ingress) to route traffic to multiple hostnames to multiple services in your environment.