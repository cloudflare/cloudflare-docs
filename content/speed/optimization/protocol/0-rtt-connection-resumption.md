---
pcx_content_type: reference
title: 0-RTT Connection Resumption
weight: 5
---

# 0-RTT Connection Resumption

Zero round trip time resumption (0-RTT) improves performance for clients who have previously connected to your website.

This feature particularly benefits end users who visit your application regularly or who use mobile networks.

For more details on what 0-RTT is, how it works, and potential limitations, refer to [our blog](https://blog.cloudflare.com/even-faster-connection-establishment-with-quic-0-rtt-resumption/).

## Availability

{{<feature-table id="network.0_rtt">}}

## Enable 0-RTT Connection Resumption

By default, 0-RTT Connection Resumption is not enabled on your Cloudflare application.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable 0-RTT Connection Resumption in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Navigate to **Speed > Optimization**.
3.  Navigate to the **Protocol Optimization** tab and under **0-RTT Connection Resumption**, switch the toggle to **On**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To adjust your 0-RTT Connection Resumption settings with the API, send a [`PATCH`](/api/operations/zone-settings-change-0-rtt-session-resumption-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).
 
{{</tab>}}
{{</tabs>}}
