---
title: Overview
order: 1
pcx-content-type: concept
---

# Caching

Cloudflare makes customer websites faster by storing a copy of the website’s content on our servers. Content is either static or dynamic: static content is “cacheable” or eligible for caching, and dynamic content is “uncacheable” or ineligible for caching. The copies are physically closer to users, and the copies are optimized to be fast and do not require recomputing. 

Cloudflare caches static content based on the following factors:

- Cache level set at a zone or page rule
- File extension
- Presence of query strings
- Origin cache-control headers
- Origin headers that indicate dynamic content
- Page rules that bypass cache on cookie

Cloudflare only caches resources within the Cloudflare data center that serve the request. Cloudflare does not cache off-site or third-party resources, such as Facebook or Flickr, or content hosted on unproxied (grey-clouded) DNS records.
