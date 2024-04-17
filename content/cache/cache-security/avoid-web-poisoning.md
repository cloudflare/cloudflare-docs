---
title: Avoid web cache poisoning
pcx_content_type: concept
meta:
  title: Avoid Web Cache Poisoning
---

# Avoid Web Cache Poisoning

A cache poisoning attack uses an HTTP request to trick an origin web server into responding with a harmful resource that has the same cache key as a clean request. As a result, the poisoned resource gets cached and served to other users.

A Content Delivery Network (CDN) like Cloudflare relies on cache keys to compare new requests against cached resources. The CDN then determines whether the resource should be served from the cache or requested directly from the origin web server.

## Learn about Cache Poisoning

To deepen your understanding of the risks and vulnerabilities associated with cache poisoning, consult the following resources:

- [Practical Web Cache Poisoning](https://portswigger.net/blog/practical-web-cache-poisoning)
- [How Cloudflare protects customers from cache poisoning](https://blog.cloudflare.com/cache-poisoning-protection/)

## Only cache files that are truly static

Review the caching configuration for your origin web server and ensure you are caching files that are static and do not depend on user input in any way. To learn more about Cloudflare caching, review:

- [Which file extensions does Cloudflare cache for static content?](/cache/concepts/default-cache-behavior/)
- [How Do I Tell Cloudflare What to Cache?](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-everything)

## Do not trust data in HTTP headers

Client-side vulnerabilities are often exploited through HTTP headers, including cross-site scripting (XSS). In general, you should not trust the data in HTTP headers and as such:

- Do not rely on values in HTTP headers if they are not part of your [cache key](/cache/how-to/cache-keys/).
- Never return HTTP headers to users in cached content.

## Do not trust GET request bodies

Cloudflare caches contents of GET request bodies, but they are not included in the cache key. GET request bodies should be considered untrusted and should not modify the contents of a response. If a GET body can change the contents of a response, consider bypassing cache or using a POST request.

## Monitor web security advisories

To keep informed about Internet security threats, Cloudflare recommends that you monitor web security advisories on a regular basis. Some of the more popular advisories include:

- [Drupal Security Advisories](https://www.drupal.org/security)
- [Symfony Security Advisories](https://symfony.com/blog/category/security-advisories)
- [Laminas Security Advisories](https://getlaminas.org/security/advisories)
