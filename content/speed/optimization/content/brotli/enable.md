---
pcx_content_type: how-to
title: Enable
weight: 1
meta:
    title: Enable Brotli
---

# Enable Brotli

{{<Aside type="warning" header="Warning">}}

Brotli compression will be enabled by default for all zones on 2024-08-15. The Brotli setting will be gradually removed until then.

Enterprise customers can override Cloudflare's default compression behavior using [Compression Rules](/rules/compression-rules/).

{{</Aside>}}

By default, Brotli compression is enabled for domains on Free and Pro plans and disabled for domains on Business and Enterprise plans.

To enable Brotli compression:

1. [Log in to the Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.
2. Go to **Speed** > **Optimization** > **Content Optimization**.
3. For **Brotli**, toggle the switch to **On**.

---

{{<render file="_brotli-compression-warning.md">}}
