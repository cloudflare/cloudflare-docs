---
title: Proxy DNS records
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

The first - and often easiest - step of DDoS protection is making sure your DNS records are [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare.

## How it works

{{<render file="_proxy-status-effects.md" productFolder="fundamentals">}}

## How it helps

### DDoS protection

When your traffic is proxied through Cloudflare, Cloudflare can automatically stop [DDoS attacks](/ddos-protection/about/) from ever reaching your application (and your origin server).

### Caching

Proxied traffic also benefits from the default optimizations of the Cloudflare [cache](/cache/). Cloudflare caches [certain types of resources](/cache/about/default-cache-behavior/#default-cached-file-extensions) automatically, which both speeds up your application's performance and reduces the overall number of requests.

### Hides origin IP address

Proxying your DNS records in Cloudflare also hides the IP address of your origin server (because requests to your application resolve to Cloudflare Anycast IP addresses instead).

This obscurity makes it harder for someone to connect directly to your origin, which - by extension - also makes it harder to target your origin with a DDoS attack.

## Additional resources

For more information about how to proxy DNS records and potential limitations, refer to [Proxy status](/dns/manage-dns-records/reference/proxied-dns-records/).