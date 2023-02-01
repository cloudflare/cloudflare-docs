---
pcx_content_type: faq
tittle: Logpull API
weight: 3
meta:
    description: Review frequently asked questions about the Logpull API.
---

[❮ Back to FAQ](/logs/faq/)

# Logpull API

## How long are logs retained?

Cloudflare makes logs available for at least three days and up to seven days. If you need your logs for a longer time period, download and store them locally.

## I am asking for logs for the time window of 16:10-16:13. However, the timestamps in the logs show requests that are before this time period. Why does that happen?

When you make a call for the time period of 16:10-16:13, you are actually asking for the logs that were received and processed by our system during that time (hence the endpoint name, `logs/received`). The received time is the time the logs are written to disk. There is some delay between the time the request hits the Cloudflare edge and the time it is received and processed. The **request time** is what you see in the log itself: **EdgeStartTimestamp** and **EdgeEndTimestamp** tell you when the edge started and stopped processing the request.

The advantage of basing the responses on the **time received** rather than the request or edge time is not needing to worry about late-arriving logs. As long as you are calling our API for continuous time segments, you will always get all of your logs without making duplicate calls. If we based the response on request time, you could never be sure that all the logs for that request time had been processed.