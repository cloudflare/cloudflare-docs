---
pcx_content_type: how-to
title: HTTP/2
weight: 1
---

# HTTP/2

HTTP/2 uses the TCP transport protocol and TLS to secure communications and improves page load times.

{{<Aside type="note">}}

For more background on HTTP/2, visit the [Learning Center](https://www.cloudflare.com/learning/performance/http2-vs-http1.1/).

{{</Aside>}}

## Availability

{{<feature-table id="speed.http2">}}

## Enable HTTP/2

HTTP/2 is enabled by default for all plans (though it does require an [SSL certificate at Cloudflare’s edge network](/ssl/get-started/)).

## Disable HTTP/2

Domains on Free plans cannot disable Cloudflare's HTTP/2 setting.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To disable **HTTP/2** in the dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Speed** > **Optimization**.
4. Go to **Protocol Optimization**.
5. For **HTTP/2**, switch the toggle to **Off**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To disable **HTTP/2** with the API, send a [`PATCH`](/api/operations/zone-settings-edit-single-setting) request with `http2` as the setting name in the URI path, and the `value` parameter set to `"off"`.

{{</tab>}}
{{</tabs>}}