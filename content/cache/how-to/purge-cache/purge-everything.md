---
title: ​Purge everything
pcx_content_type: how-to
weight: 2
---

# Purge everything

To maintain optimal site performance, Cloudflare strongly recommends using single-file (by URL) purging instead of a complete cache purge.

Purging everything immediately clears all resources from your CDN cache in all Cloudflare data centers. Each new request for a purged resource returns to your origin server to validate the resource. If Cloudflare cannot validate the resource, Cloudflare fetches the latest version from the origin server and replaces the cached version. When a site with heavy traffic contains a lot of assets, requests to your origin server can increase substantially and result in slow site performance.

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Select **Caching** > **Configuration**.
3. Under **Purge Cache**, select **Purge Everything**. A warning window appears.
4. If you agree, select **Purge Everything**.