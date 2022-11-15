---
pcx_content_type: how to
title: Get live viewer counts
weight: 2
---

# Live viewer counts for third party players

The Stream player has full support for live viewer counts by default. To get the viewer count for live videos for use with third party players, make a `GET` request to the `/views` endpoint.

```bash
https://customer-<CODE>.cloudflarestream.com/<INPUT_ID>/views
```

Below is a response for a live video with several active viewers:

```json
{ "liveViewers": 113 }
```
