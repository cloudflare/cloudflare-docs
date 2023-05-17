---
pcx_content_type: concept
title: Custom hostname verification
weight: 1
---

# Custom hostname verification

Before Cloudflare can proxy traffic through a custom hostname, we need to verify your ownership of that custom hostname.

{{<Aside type="note">}}

If a custom hostname is already on Cloudflare, then traffic will only shift to your fallback origin once the [DNS target has changed](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#step-5--have-customer-create-a-cname-record).

{{</Aside>}}

## Options

If minimizing downtime is more important to you, check out our [pre-verification methods](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-verification/txt/).

If ease of use for your customers is more important, review our [real-time verification methods](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-verification/realtime-verification/).