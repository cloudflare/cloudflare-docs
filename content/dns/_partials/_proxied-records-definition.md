---
_build:
  publishResources: false
  render: never
  list: never
---

When you proxy specific DNS records through Cloudflare - specifically `A`, `AAAA`, or `CNAME` records  — DNS queries for these will resolve to Cloudflare Anycast IPs instead of their original DNS target. This means that all requests intended for proxied hostnames will go to Cloudflare first and then be forwarded to your origin server.

```mermaid
flowchart LR
accTitle: Connections with Cloudflare
A[Visitor] <-- Connection --> B[Cloudflare global network] <-- Connection --> C[Origin server]
```
<br/>

This behavior allows Cloudflare to [optimize, cache, and protect](/fundamentals/get-started/concepts/how-cloudflare-works/) all requests to your application, as well as protect your origin server from [DDoS attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/).