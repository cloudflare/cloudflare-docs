---
pcx_content_type: faq
title: General FAQ
weight: 1
structured_data: true
meta:
    description: Review frequently asked questions about Cloudflare Logs.
---

[❮ Back to FAQ](/logs/faq/)

# General FAQ

{{<faq-item>}}
{{<faq-question level=2 text="Once a request has passed through the Cloudflare network, how soon are the logs available?" >}}

{{<faq-answer>}}

When using **Logpush**, logs are pushed in batches as soon as possible. For example, if you receive a file at 10:10, the file consists of logs that were processed before 10:10.

When using **Logpull**, logs become available in approximately one to five minutes. Cloudflare requires that calls to the **Logpull API** to be for time periods of at least one minute in the past. For example, if it is 9:43 now, you can ask for logs processed between 9:41 and 9:42. The response will include logs for requests that passed through our network between 9:41 and 9:42 and potentially earlier. Usually Cloudflare's processing takes between three and four minutes, so when you ask for that same time period, you may also see logs of requests that passed through our network at 9:39 or earlier.

These timings are only a guideline, not a guarantee, and may depend on network conditions, the request volume for your domain, and other factors. Although we try to get the logs to you as fast as possible, we prioritize not losing log data over speed. On rare occasions, you may experience a longer delay. In this case, you do not need to take any action. The logs will be available as soon as they are processed.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Are logs available for customers who are not on an Enterprise plan?" >}}

{{<faq-answer>}}

Not yet, but we are planning to make them available to other customer plans in the future.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="When pulling or pushing logs, I occasionally come across a time period with no data, even though I am sure my domain received requests at that time. Is this an expected behavior?" >}}

{{<faq-answer>}}

Yes. The time period for which you pull or receive logs is based on our processing time, not the time the requests passed through our network. Empty responses do not mean there were no requests during that time period, just that we did not process any logs for your domain during that time.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Can I receive logs in a format other than JSON?" >}}

{{<faq-answer>}}

Not at this time. Talk to your Cloudflare account team or [Cloudflare Support](/support/contacting-cloudflare-support/) if you are interested in other formats and we will consider them for the future.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="Is it possible to track cache purge requests in the logs?" >}}

{{<faq-answer>}}

Only 2 types of cache purge requests can be found in the logs:
- Purge Everything requests are logged in the [Audit Log](/logs/reference/log-fields/account/audit_logs/).
- For the Purge by URL requests, an entry is logged in the [HTTP Request](/logs/reference/log-fields/zone/http_requests/) where the Cache Status is **PURGE**.

{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question level=2 text="At which stage are HTTP requests logged?" >}}

{{<faq-answer>}}

Requests are logged only after they successfully reach our proxy.
It means that requests failing during the TCP or TLS handshake between the client and the Cloudflare proxy will not be available in the logs.

{{</faq-answer>}}
{{</faq-item>}}
