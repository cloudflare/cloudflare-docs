---
_build:
  publishResources: false
  render: never
  list: never
---

Because of [how Cloudflare works](/fundamentals/concepts/how-cloudflare-works/), all traffic to [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/) pass through Cloudflare before reaching your origin server. This means that your origin server will stop receiving traffic from individual visitor IP addresses and instead receive traffic from [Cloudflare IP addresses](https://www.cloudflare.com/ips), which are shared by all proxied hostnames.

This setup can cause issues if your origin server blocks or rate limits connections from Cloudflare IP addresses. Because all visitor traffic will appear to come from Cloudflare IP addresses, blocking these IPs — even accidentally — will prevent visitor traffic from reaching your application.

In addition, allowing Cloudflare IPs might be needed to avoid {{<glossary-tooltip term_id="rate limiting">}}rate limiting{{</glossary-tooltip>}} or blocking these requests at your origin server.

For [Magic Transit](/magic-transit/) customers, Cloudflare routes the traffic instead of proxying it. Once Cloudflare starts advertising your IP prefixes, it will accept IP packets destined for your network, process them, and then output these packets to your origin infrastructure.

