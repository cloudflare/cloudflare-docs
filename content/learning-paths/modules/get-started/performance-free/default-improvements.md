---
title: Default improvements
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

Cloudflare provides a variety of speed improvements by default.

---

## DNS resolution

When your site is using Cloudflare, your site always benefits from Cloudflare's [lightning-fast DNS resolution](https://blog.cloudflare.com/tag/network-performance-update/).

## Caching

When your DNS records are [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare, Cloudflare caches [certain types of resources](/cache/about/default-cache-behavior/#default-cached-file-extensions) automatically (which improves application performance).

<details>
<summary>How does caching improve performance?</summary>
<div>

Caching is the process of storing copies of files in a cache, or temporary storage location, so that they can be accessed more quickly.

When Cloudflare stores content in its cache, the request never needs to go to your application or origin server, which reduces the number of requests and ges content to the user more quickly.

{{<render file="_cache-basic-diagram.md">}}
<br/>

For more details, refer to the [Cloudflare learning center](https://www.cloudflare.com/learning/cdn/what-is-caching/).

</div>
</details>