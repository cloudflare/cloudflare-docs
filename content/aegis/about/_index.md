---
title: How it works
pcx_content_type: concept
weight: 1
meta:
  title: About Cloudflare Aegis
---

# How Cloudflare Aegis works

{{<Aside type="warning">}}
Cloudflare Aegis is available in early access to Enterprise customers. Contact your account team to request access.
{{</Aside>}}

When you use Cloudflare [as a reverse proxy](/fundamentals/concepts/how-cloudflare-works/#how-cloudflare-works-as-a-reverse-proxy), [Cloudflare's globl network](https://www.cloudflare.com/network/) sits between client requests and your origin servers.

```mermaid
flowchart LR
        accTitle: Cloudflare as a reverse proxy
        accDescr: Diagram showing Cloudflare's network between clients and the origin server.
        A[Client] <--> B((Cloudflare))<--> C[(Origin server)]
```

Zooming in to what happens as a request routes through Cloudflare, you can consider two parts of the process: ingress and egress.

```mermaid
flowchart LR
        accTitle: Cloudflare as a reverse proxy
        accDescr: Diagram showing Cloudflare's network between clients and the origin server.
        A[Client] --ingress--> B((Cloudflare))--egress--> C[(Origin server)]
```

