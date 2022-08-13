---
pcx_content_type: how to
title: Get live viewer counts
---

# Live viewer counts for third party players

The Stream player has full support for live viewer counts by default. To get the viewer count for live videos for use with third party players, make a `GET` request to the `/views` endpoint.

```bash
https://videodelivery.net/55b9b5ce48c3968c6b514c458959d6a/views
```

Below is a response for a live video with several active viewers:

```json
{ "liveViewers": 113 }
```
