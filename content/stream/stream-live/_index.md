---
title: Stream live video
pcx_content_type: navigation
weight: 4
---

# Stream live video

Cloudflare Stream lets you or your users stream live video, and play live video in your website or app, without managing and configuring any of your own infrastructure.

## How Stream works

Stream handles video streaming end-to-end, from ingestion through delivery.

1. For each live stream, you create a unique live input, either using the Stream Dashboard or API.
2. Each live input has a unique Stream Key, that you provide to you the creator who is streaming live video.
3. Creators use this Stream Key to broadcast live video to Cloudflare Stream, over either RTMPS or SRT.
4. Cloudflare Stream encodes this live video at multiple resolutions and delivers it to viewers, using Cloudflare's Global Network. You can play video on your website using the [Stream Player](/stream/viewing-videos/using-the-stream-player/) or using [any video player that supports HLS or DASH](/stream/viewing-videos/using-own-player/).


![Diagram the explains the live stream workflow](/stream/static/live-stream-workflow.png)

### How does Stream Live handle RTMP reconnections?

As long as your streaming software reconnects, Stream Live will continue to ingest and stream your live video. Make sure the streaming software you use to push RTMP feeds automatically reconnects if the connection breaks. Some apps like OBS reconnect automatically while other apps like FFmpeg require custom configuration.

### How does billing work for Stream Live?

Stream Live is billed identically to the rest of Cloudflare Stream.

- You pay $5 per 1000 minutes of recorded video.
- You pay $1 per 1000 minutes of delivered video.

All Stream Live videos are automatically recorded. There is no additional cost for encoding and packaging live videos.

For more, see [Billing for Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360016450871-Billing-for-Cloudflare-Stream).