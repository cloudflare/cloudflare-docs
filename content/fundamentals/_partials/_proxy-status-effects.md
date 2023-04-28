---
_build:
  publishResources: false
  render: never
  list: never
---

### Without Cloudflare

Without Cloudflare, DNS lookups for your application's URL return the IP address of your [origin server](https://www.cloudflare.com/learning/cdn/glossary/origin-server/).

| URL | Returned IP address |
| --- | --- |
| `example.com` | `192.0.2.1` |

When using Cloudflare with [unproxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/), DNS lookups for unproxied domains or subdomains also return your origin's IP address.

Another way of thinking about this concept is that visitors directly connect with your origin server.

```mermaid
        flowchart LR
        accTitle: Connections without Cloudflare
        A[Visitor] <-- Connection --> B[Origin server]
```

### With Cloudflare

With Cloudflare — meaning your domain or subdomain is using [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/) — DNS lookups for your application's URL will resolve to [Cloudflare Anycast IPs](https://www.cloudflare.com/ips/) instead of their original DNS target.

| URL | Returned IP address |
| --- | --- |
| `example.com` | `104.16.77.250` |

This means that all requests intended for proxied hostnames will go to Cloudflare first and then be forwarded to your origin server.

```mermaid
        flowchart LR
        accTitle: Connections with Cloudflare
        A[Visitor] <-- Connection --> B[Cloudflare global network] <-- Connection --> C[Origin server]
```