---
pcx_content_type: how-to
title: Enable
weight: 1
meta:
    title: Enable Brotli
---

# Enable Brotli

{{<Aside type="warning" header="Warning">}}

The Brotli setting will be removed on 2024-08-15. After this date, Brotli compression will be enabled by default for all zones.

Enterprise customers can override Cloudflare's default compression behavior using [Compression Rules](/rules/compression-rules/).

{{</Aside>}}

By default, Brotli compression is enabled for all domains. It is only editable for domains on Enterprise plans.

To enable Brotli compression:

1. [Log in to the Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.
2. Go to **Speed** > **Optimization** > **Content Optimization**.
3. For **Brotli**, toggle the switch to **On**.

---

{{<render file="_brotli-compression-warning.md">}}
