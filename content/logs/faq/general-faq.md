---
pcx_content_type: faq
tittle: General FAQ
weight: 1
meta:
    description: Review frequently asked questions about Cloudflare Logs.
---

[❮ Back to FAQ](/logs/faq/)

# General FAQ

## Once a request has passed through the Cloudflare network, how soon are the logs available?

When using **Logpush**, logs are pushed in batches as soon as possible. For example, if you receive a file at 10:10, the file consists of logs that were processed before 10:10.

When using **Logpull**, logs become available in approximately one to five minutes. Cloudflare requires that calls to the **Logpull API** to be for time periods of at least one minute in the past. For example, if it is 9:43 now, you can ask for logs processed between 9:41 and 9:42. The response will include logs for requests that passed through our network between 9:41 and 9:42 and potentially earlier. It is normal for Cloudflare's processing to take between three and four minutes, so when you ask for that same time period, you may also see logs of requests that passed through our network at 9:39 or earlier.

These timings are only a guideline, not a guarantee, and may depend on network conditions, the request volume for your domain, and other factors. Although we try to get the logs to you as fast as possible, we prioritize not losing log data over speed. On rare occasions, you may see a longer delay. In this case, you do not need to take any action. The logs will be available as soon as they are processed.

## Are logs available for customers who are not on an Enterprise plan?

Not yet, but we are planning to make them available to other customer plans in the future.

## When pulling or pushing logs, I occasionally come across a time period with no data, even though I am sure my domain received requests at that time. Is this an expected behavior?

Yes. The time period for which you pull or receive logs is based on our processing time, not the time the requests passed through our network. Empty responses do not mean there were no requests during that time period, just that we did not process any logs for your domain during that time.

## Can I receive logs in a format other than JSON?

Not at this time. Talk to your Cloudflare account team or [Cloudflare Support](https://support.cloudflare.com/hc/en-us/articles/200172476-Contacting-Cloudflare-Support) if you are interested in other formats and we will consider them for the future.

## Is it possible to track cache purge requests in the logs?

Only 2 types of cache purge requests can be found in the logs:
- Purge Everything requests are logged in the [Audit Log](/logs/reference/log-fields/account/audit_logs/).
- For the Purge by URL requests, an entry is logged in the [HTTP Request](/logs/reference/log-fields/zone/http_requests/) where the Cache Status is **PURGE**.
