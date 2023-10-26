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

This behavior allows Cloudflare to [optimize, cache, and protect](/fundamentals/concepts/how-cloudflare-works/) all requests to your application, as well as protect your origin server from [DDoS attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/).

Because requests to proxied hostnames go through Cloudflare before reaching your origin server, all requests will appear to be coming from Cloudflare's IP addresses (and could potentially be blocked or rate limited). If you use proxied records, you may need to adjust your server configuration to [allow Cloudflare IPs](/fundamentals/setup/allow-cloudflare-ip-addresses/).

Cloudflare Anycast IPs used to proxy traffic on your domain are assigned automatically. These IPs might change at any time for operational reasons.
If you need to allowlist Cloudflare IPs on your infrastructure or hosting provider, include the full list of [Cloudflare Anycast IPs](https://www.cloudflare.com/ips/).

As an Enterprise customer, you have the option to get [static IPs](/spectrum/about/static-ip/) or [bring your own IPs (BYOIP)](/byoip/).