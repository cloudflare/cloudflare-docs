---
title: Stream live video
pcx_content_type: navigation
weight: 4
layout: single
---

# Stream live video

Cloudflare Stream lets you or your users stream live video, and play live video in your website or app, without managing and configuring any of your own infrastructure.

## How Stream works

Stream handles video streaming end-to-end, from ingestion through delivery.

1. For each live stream, you create a unique live input, either using the Stream Dashboard or API.
2. Each live input has a unique Stream Key, that you provide to the creator who is streaming live video.
3. Creators use this Stream Key to broadcast live video to Cloudflare Stream, over either RTMPS or SRT.
4. Cloudflare Stream encodes this live video at multiple resolutions and delivers it to viewers, using Cloudflare's Global Network. You can play video on your website using the [Stream Player](/stream/viewing-videos/using-the-stream-player/) or using [any video player that supports HLS or DASH](/stream/viewing-videos/using-own-player/).


![Diagram the explains the live stream workflow](/stream/static/live-stream-workflow.png)

## RTMP reconnections

As long as your streaming software reconnects, Stream Live will continue to ingest and stream your live video. Make sure the streaming software you use to push RTMP feeds automatically reconnects if the connection breaks. Some apps like OBS reconnect automatically while other apps like FFmpeg require custom configuration.

## Bitrate estimates at each quality level (bitrate ladder)

Cloudflare Stream transcodes and makes live streams available to viewers at multiple quality levels. This is commonly referred to as [Adaptive Bitrate Streaming (ABR)](https://www.cloudflare.com/learning/video/what-is-adaptive-bitrate-streaming).

With ABR, client video players need to be provided with estimates of how much bandwidth will be needed to play each quality level (ex: 1080p). Stream creates and updates these estimates dynamically by analyzing the bitrate of your users' live streams. This ensures that live video plays at the highest quality a viewer has adequate bandwidth to play, even in cases where the broadcaster's software or hardware provides incomplete or inaccurate information about the bitrate of their live content.

### How it works

If a live stream contains content with low visual complexity, like a slideshow presentation, the bandwidth estimates provided in the HLS and DASH manifests will be lower —  a stream like this has a low bitrate and requires relatively little bandwidth, even at high resolution.  This ensures that as many viewers as possible view the highest quality level.

Conversely, if a live stream contains content with high visual complexity, like live sports with motion and camera panning, the bandwidth estimates provided in the manifest will be higher — a stream like this has a high bitrate and requires more bandwidth. This ensures that viewers with inadequate bandwidth switch down to a lower quality level, and their playback does not buffer.

### How you benefit

If you're building a creator platform or any application where your end users create their own live streams, your end users likely use streaming software or hardware that you cannot control. In practice, these live streaming setups often send inaccurate or incomplete information about the bitrate of a given live stream, or are misconfigured by end users.

Stream adapts based on the live video that we actually receive, rather than blindly trusting the advertised bitrate. This means that even in cases where your end users' settings are less than ideal, client video players will still receive the most accurate bitrate estimates possible, ensuring the highest quality video playback for your viewers, while avoiding pushing configuration complexity back onto your users.

## Transition from live playback to a recording

Recordings are available for live streams within 60 seconds after a live stream ends. 

You can check a video's status to determine if it's ready to view by making a [`GET` request to the `stream` endpoint](/stream/stream-live/watch-live-stream/#use-the-api) and viewing the `state` or by [using the Cloudflare dashboard](/stream/stream-live/watch-live-stream/#use-the-dashboard).

After the live stream ends, you can [replay live stream recordings](/stream/stream-live/replay-recordings/) in the `ready` state by using one of the playback URLs.

## Billing

Stream Live is billed identically to the rest of Cloudflare Stream.

- You pay $5 per 1000 minutes of recorded video.
- You pay $1 per 1000 minutes of delivered video.

All Stream Live videos are automatically recorded. There is no additional cost for encoding and packaging live videos.

For more, see [Billing for Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360016450871-Billing-for-Cloudflare-Stream).
