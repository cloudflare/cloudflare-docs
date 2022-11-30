---
pcx_content_type: reference
title: Signed exchanges
weight: 1
meta:
    title: Signed exchanges (SXGs)
---

# Signed exchanges (SXGs)

Signed exchanges (SXG) is an open standard that makes it possible to cryptographically authenticate the origin of a resource independently of how it is delivered. This authentication allows for a variety of use cases. For example, with SXGs, a search engine can download signed exchanges while users are navigating their search pages. Thus, when a user selects a link to a website, the search engine can serve a cached version of that web page instead of fetching content from the origin server, improving performance.

This performance improvement also has consequences for SEO. SXGs improve [Core Web Vitals](/analytics/web-analytics/understanding-web-analytics/core-web-vitals/), such as the Largest Contentful Paint (LCP). Cloudflare found that SXGs improve LCP for 85% of the sites tested and time to first byte (TTFB) for 98% of websites.

For more information about signed exchanges, [refer to our blog post](https://blog.cloudflare.com/automatic-signed-exchanges/).

## Availability

{{<feature-table id="speed.automatic_signed_exchanges">}}