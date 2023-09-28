---
title: Detecting bots
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

When a request reaches Cloudflare, we run that request through a variety of detection engines to determine whether it came from a bot.

These detections run on all requests coming into the Cloudflare global network, not just for applications using Bot Management.

This means that:

- Adding bot management does not add latency to requests.
- Our bot management platform benefits from the millions of sites and trillions of requests that flow through Cloudflare every day.

{{<render file="_bm-bot-detection-engines.md" productFolder="bots" >}}

### `___cf_bm cookie`

{{<render file="_bots-cookie.md" productFolder="bots" >}}