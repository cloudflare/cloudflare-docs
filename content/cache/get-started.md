---
title: Get started
pcx-content-type: get-started
weight: 3
meta:
  title: Get started with Cache
---

# Get started with Cache

## Learn the basics

Discover the benefits of caching with Cloudflare’s CDN and understand the default cache behavior.

*   [What is a CDN?](/fundamentals/get-started/cdn)
*   [Understand the default file types Cloudflare caches](/cache/about/default-cache-behavior#default-cached-file-extensions)

## Make more resources cacheable

Configure your settings to cache static HTML or cache anonymous page views of dynamic content.

*   [Speed up your site with caching best practices](https://support.cloudflare.com/hc/en-us/articles/360021023712)
*   [Specify which resources to cache](/cache/best-practices/customize-cache/)
*   [Understand Origin Cache Control](/cache/about/cache-control/)
*   [Cache by device type (Enterprise only)](/cache/how-to/create-page-rules/#cache-by-device-type-enterprise-only)

## Improve cache hit rates

Include or exclude query strings, optimize cache keys, or enable tiered cache to improve hit rates and reduce traffic to your origin.

*   [Choose a cache level](/cache/how-to/set-caching-levels/)
*   [Enable Tiered Cache with Argo](https://support.cloudflare.com/hc/articles/115000224552)
*   [Configure custom cache keys (Enterprise only)](/cache/about/cache-keys/)

## Secure your cache configuration

Control resources a client is allowed to load and set access permissions to allow different origins to access your origin’s resources. Protect your site from web cache deception attacks while still caching static assets.

*   [Avoid web cache poisoning attacks](/cache/best-practices/avoid-web-poisoning/)
*   [Configure Cross-Origin Resource Sharing (CORS)](https://support.cloudflare.com/hc/articles/200308847)
*   [Enable Cache Deception Armor](https://blog.cloudflare.com/web-cache-deception-attack-revisited/)

## Cloudflare features that can alter your HTML and cacheable objects

To provide Cloudflare services to our customers, we may need to alter your HTML or cached objects to enable the feature or provide optimization.

These code alterations only occur on the cacheable objects found at Cloudflare's edge and do not affect the original source. The changes will also be removed if the specific feature is disabled and the cache is purged.

Review the list of Cloudflare features that function in this manner.

*   [Auto Minify](https://support.cloudflare.com/hc/articles/200168196)
*   [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056)
*   [Polish](/images/polish)
*   [Mirage](https://support.cloudflare.com/hc/articles/219178057)
*   [Hotlink Protection](https://support.cloudflare.com/hc/articles/200170026)
*   [Email address obfuscation](https://support.cloudflare.com/hc/articles/200170016)
*   [Bot Management Javascript Detections](/bots/reference/javascript-detections)

## Troubleshoot

Resolve common caching concerns.

*   [Learn about Cloudflare's cache response statuses](/cache/about/default-cache-behavior/#cloudflare-cache-responses)
*   [Investigate Cloudflare's cache response with cURL](https://support.cloudflare.com/hc/articles/203118044#h_0c7f48b3-fc29-4266-8c63-477fe61a11c4)
*   [Diagnose Always Online issues](/cache/best-practices/always-online/)
