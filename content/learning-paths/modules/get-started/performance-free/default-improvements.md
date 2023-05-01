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

{{<render file="_cache-basic-diagram.md">}}
<br/>

For more details, refer to the [Cloudflare learning center](https://www.cloudflare.com/learning/cdn/what-is-caching/).

</div>
</details>

### How to do it

Before proxying your records, you should likely [allow Cloudflare IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/) at your origin to prevent requests from being blocked.

Then, [update your Cloudflare DNS records](/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) so their **Proxy status** is **Proxied**.