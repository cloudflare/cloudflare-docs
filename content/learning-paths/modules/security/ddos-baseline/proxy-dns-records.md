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

Proxied traffic also benefits from the default optimizations of the Cloudflare [cache](/cache/). Cloudflare caches [certain types of resources](/cache/concepts/default-cache-behavior/#default-cached-file-extensions) automatically, which both speeds up your application's performance and reduces the overall number of requests.

### Hides origin IP address

Proxying your DNS records in Cloudflare also hides the IP address of your origin server (because requests to your application resolve to Cloudflare Anycast IP addresses instead).

This obscurity makes it harder for someone to connect directly to your origin, which - by extension - also makes it harder to target your origin with a DDoS attack.

## How to do it

Before proxying your records, you should likely [allow Cloudflare IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/) at your origin to prevent requests from being blocked.

Then, [update your Cloudflare DNS records](/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) so their **Proxy status** is **Proxied**.

![Proxy status affects how Cloudflare treats traffic intended for specific DNS records](/images/dns/proxy-status-screenshot.png)