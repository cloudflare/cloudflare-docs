---
pcx_content_type: faq
title: Common calculations
weight: 4
structured_data: true
meta:
    description: Learn more about calculating bytes served by the origin and bandwidth usage.
---

[❮ Back to FAQ](/logs/faq/)

# Common calculations

{{<faq-item>}}
{{<faq-question level=2 text="How can I calculate bytes served by the origin from Cloudflare Logs?" >}}

{{<faq-answer>}}

The best way to calculate bytes served by the origin is to use the `CacheResponseBytes` field in Cloudflare Logs, and to filter only requests that come from the origin. Make sure to filter out `OriginResponseStatus` values `0` and `304`, which indicate a revalidated response.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="How do I calculate bandwidth usage for my zone?" >}}

{{<faq-answer>}}

Bandwidth (or data transfer) can be calculated by adding the `EdgeResponseBytes` field in HTTP request logs. There are some types of requests that are not factored into bandwidth calculations. In order to only include relevant requests in calculations, add the filter `ClientRequestSource = 'eyeball'`.

{{</faq-answer>}}
{{</faq-item>}}