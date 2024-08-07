---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/206049798-Setting-up-Response-Buffering
title: Response Buffering
---

# Response Buffering

If your domain sends many small packets, it may be faster to buffer the file and deliver the full payload all at once (instead of streaming it).

## Availability

{{<feature-table id="network.response_buffering">}}

## How it works

By default, Cloudflare **streams** data. This means that each packet is sent as it becomes available. Streaming can improve the delivery of large files. If the responses are cached there will still be some buffering.

If your domain sends many small packets, however, it might be faster to **buffer** the file. This approach waits to send the full file until all packets are ready, preventing a client browser from having to re-assemble packets.

## Enable Response Buffering

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **Response Buffering** in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **Network**.
3.  For **Response Buffering**, switch the toggle to **On**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable **Response Buffering** with the API, send a [`PATCH`](/api/operations/zone-settings-edit-single-setting) request with `response_buffering` as the setting name in the URI path, and the `value` parameter set to `"on"`.

{{</tab>}}
{{</tabs>}}
