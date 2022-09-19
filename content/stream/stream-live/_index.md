---
title: Stream live video
pcx_content_type: navigation
weight: 6
---

# Stream live video

Use Cloudflare Stream to stream live video and broadcast your own live events or add live video to your own app.  When you use Stream, you get low latency without having to worry about encoding or ingestion fees, finding a CDN, or modifying your configuration; Stream takes care of this for you.

## How Stream works

After you set up a live input, Stream works by using your stream URL and Key along with your broadcasting system to live stream your video. Refer to the diagram below to learn how each item interacts with each other to produce a live stream.

![Diagram the explains the live stream workflow](/stream/static/live-stream-workflow.png)

## Latency

You can use different streaming protocol options with Stream. Stream supports RTMPS and SRT.

**RTMPS and SRT**
- Provides 10+ second latency.
- RTMP is ideal when broadcasting to users with low bandwith.
- SRT is ideal for broadcasting high quality video to users with unreliable networks.
- Both options allow you to record video for later playback.
