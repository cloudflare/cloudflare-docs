---
pcx_content_type: how-to
title: HTTP/3 (with QUIC)
weight: 1
---

# HTTP/3 (with QUIC)

HTTP/3 uses QUIC, which is a secure-by-default transport protocol. HTTP/3 improves page load times in a similar way to HTTP/2. However, the QUIC transport protocol solves TCP's head-of-line blocking problem, meaning that performance over lossy networks can be better.

{{<Aside type="note">}}

For more background on HTTP/3, visit the [Learning Center](https://www.cloudflare.com/learning/performance/what-is-http3/).

{{</Aside>}}

## Availability

{{<feature-table id="speed.http3">}}

## Enable HTTP/3

HTTP/3 is available to all plans (though it does require an [SSL certificate at Cloudflare’s edge network](/ssl/get-started/)).

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **HTTP/3** in the dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Speed** > **Optimization**.
4. Go to **Protocol Optimization**.
5. For **HTTP/3**, switch the toggle to **On**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable **HTTP/3** with the API, send a [`PATCH`](/api/operations/zone-settings-edit-single-setting) request with `http3` as the setting name in the URI path, and the `value` parameter set to `"on"`.

{{</tab>}}
{{</tabs>}}