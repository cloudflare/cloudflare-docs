---
pcx-content-type: reference
title: Optimize site speed
weight: 1
---

# Optimize site speed

Cloudflare offers a variety of features designed to improve latency and page load time and — by extension — user experience and [SEO](/fundamentals/get-started/task-guides/improve-seo/).

## Default optimizations

Cloudflare provides [lightning fast DNS resolution](https://www.cloudflare.com/dns/), so you likely will see speed improvements by [onboarding your domain to Cloudflare](/dns/zone-setups/full-setup/).

## One-click optimizations

Once domain is onboarded and your DNS records are [proxied through Cloudflare](/dns/manage-dns-records/reference/proxied-dns-records/), Cloudflare offers the following one-click options for speeding up your site:

- [Auto Minify](https://support.cloudflare.com/hc/articles/200168196): Removes unnecessary characters from HTML, JavaScript, and CSS files.
- [Brotli](https://support.cloudflare.com/hc/articles/200168396): Applies gzip and brotli compression to some types of content.
- [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056): Defers JavaScript loading until after page content.
- [HTTP 2/3](https://support.cloudflare.com/hc/articles/200168076): Accelerates page load times by using a faster protocol for HTTP.
- [Polish](/images/polish/) and [Mirage](https://support.cloudflare.com/hc/articles/219178057): Resize images hosted on your server (Polish) and lazy load all images in a browser (Mirage).
- [Argo Smart Routing](https://support.cloudflare.com/hc/articles/115000224552) (paid add-on): Routes requests across the fastest network path available.

## Optimization with minimal setup

Simply by using [Bulk Redirects](/rules/bulk-redirects) or [Page Rules](https://support.cloudflare.com/hc/articles/4729826525965) for URL forwarding, you can perform redirects at Cloudflare's edge network instead of at your origin server.

With a few clicks, you can also adjust your [cache settings](/cache/get-started/) to make resources more cacheable and improve cache hit rates.

## Dedicated products

Cloudflare offers a several products dedicated to improving site speed and availability:

- [Image Optimization](/images/): Optimize image storage and delivery.
- [Load Balancing](/load-balancing/): Distribute traffic across your origin servers.
- [Network Interconnect](/network-interconnect/): Connect your network infrastructure directly with Cloudflare.
- [Pages](/pages/): Build and deploy dynamic front-end applications.
- [Railgun](/railgun/): Improve caching for dynamic content.
- [Workers](/workers/): Build serverless functions.
- [Zaraz](/zaraz/): Load third-party tools without slowing down your website.

## SEO optimizations

For more guidance on optimizing SEO, refer to [Improve SEO with Cloudflare](/fundamentals/get-started/task-guides/improve-seo/).