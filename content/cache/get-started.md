---
title: Get started
pcx_content_type: get-started
weight: 3
meta:
  title: Get started with Cache
---

# Get started with Cache

Cloudflare makes customer websites faster by storing a copy of the website's content on the servers of our globally distributed data centers. Content can be either static or dynamic: static content is “cacheable” or eligible for caching, and dynamic content is “uncacheable” or ineligible for caching. The cached copies of content are stored physically closer to users, optimized to be fast, and do not require recomputing.

Cloudflare caches static content based on the following factors:

* [Caching levels](/cache/how-to/set-caching-levels/)
* [File extension](/cache/concepts/default-cache-behavior/#default-cached-file-extensions)
* Presence of [query strings](/cache/advanced-configuration/query-string-sort/)
* [Origin cache-control headers](/cache/concepts/cache-control/)
* Origin headers that indicate {{<glossary-tooltip term_id="dynamic content">}}dynamic content{{</glossary-tooltip>}}
* Cache rules that bypass cache on cookie

Cloudflare only caches resources within the Cloudflare data center that serve the request. Cloudflare does not cache off-site or third-party resources, such as Facebook or Flickr, or content hosted on [unproxied (grey-clouded)](/dns/manage-dns-records/reference/proxied-dns-records/) DNS records.

## Learn the basics

Discover the benefits of caching with Cloudflare's CDN and understand the default cache behavior.

- [Understand what is a CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)
- [Understand default cache behavior](/cache/concepts/default-cache-behavior/)
- [Understand the default file types Cloudflare caches](/cache/concepts/default-cache-behavior/#default-cached-file-extensions)

## Make more resources cacheable

Configure your settings to cache static HTML or cache anonymous page views of dynamic content.

- [Customize Caching with Cache Rules](/cache/how-to/cache-rules/)
- [Specify which resources to cache](/cache/concepts/customize-cache/)
- [Understand Origin Cache Control](/cache/concepts/cache-control/)
- [Cache by device type (Enterprise only)](/cache/how-to/cache-rules/examples/cache-device-type/)

## Improve cache hit rates

Include or exclude query strings, optimize cache keys, or enable tiered cache to improve hit rates and reduce traffic to your origin.

- [Choose a cache level](/cache/how-to/set-caching-levels/)
- [Enable Tiered Cache with Argo](/cache/how-to/tiered-cache/#enable-tiered-cache)
- [Configure custom cache keys (Enterprise only)](/cache/how-to/cache-keys/)
- [Enable Prefetch URLs (Enterprise only)](/speed/optimization/content/prefetch-urls/)

## Secure your cache configuration

Control resources a client is allowed to load and set access permissions to allow different origins to access your origin’s resources. Protect your site from web cache deception attacks while still caching static assets.

- [Avoid web cache poisoning attacks](/cache/cache-security/avoid-web-poisoning/)
- [Configure Cross-Origin Resource Sharing (CORS)](/cache/cache-security/cors/)
- [Enable Cache Deception Armor](/cache/cache-security/cache-deception-armor/#enable-cache-deception-armor)

## Cloudflare features that can alter your HTML and cacheable objects

To provide Cloudflare services to our customers, we may need to alter your HTML or cached objects to enable the feature or provide optimization.

These code alterations only occur on the cacheable objects found at Cloudflare's edge and do not affect the original source. The changes will also be removed if the specific feature is disabled and the cache is purged.

Review the list of Cloudflare features that function in this manner:

- [Rocket Loader](/speed/optimization/content/rocket-loader/)
- [Polish](/images/polish/)
- [Mirage](/speed/optimization/images/mirage/)
- [Hotlink Protection](/waf/tools/scrape-shield/hotlink-protection/)
- [Email address obfuscation](/waf/tools/scrape-shield/email-address-obfuscation/)
- [Bot Management JavaScript Detections](/bots/reference/javascript-detections/)

## Troubleshoot

Resolve common caching concerns.

- [Learn about Cloudflare's cache response statuses](/cache/concepts/cache-responses/)
- [Investigate Cloudflare's cache response with cURL](/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#troubleshoot-requests-with-curl)
- [Diagnose Always Online issues](/cache/troubleshooting/always-online/)