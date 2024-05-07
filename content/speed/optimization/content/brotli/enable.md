---
pcx_content_type: how-to
title: Enable
weight: 1
meta:
    title: Enable Brotli
---

# Enable Brotli

{{<Aside type="warning" header="Deprecation notice">}}

The Brotli setting is deprecated and will be removed on 2024-06-14. After this date, Brotli compression will be enabled by default for all zones.

Enterprise customers can override Cloudflare's default compression behavior using [Compression Rules](/rules/compression-rules/).

{{</Aside>}}

By default, Brotli compression is enabled for domains on Free and Pro plans and disabled for domains on Business and Enterprise plans.

To enable Brotli compression:

1. [Log in to the Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.
2. Go to **Speed** > **Optimization** > **Content Optimization**.
3. For **Brotli**, toggle the switch to **On**.

---

{{<render file="_brotli-compression-warning.md">}}