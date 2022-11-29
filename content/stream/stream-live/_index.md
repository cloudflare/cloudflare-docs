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
2. Each live input has a unique Stream Key, that you provide to you the creator who is streaming live video.
3. Creators use this Stream Key to broadcast live video to Cloudflare Stream, over either RTMPS or SRT.
4. Cloudflare Stream encodes this live video at multiple resolutions and delivers it to viewers, using Cloudflare's Global Network. You can play video on your website using the [Stream Player](/stream/viewing-videos/using-the-stream-player/) or using [any video player that supports HLS or DASH](/stream/viewing-videos/using-own-player/).


![Diagram the explains the live stream workflow](/stream/static/live-stream-workflow.png)

## RTMP reconnections

As long as your streaming software reconnects, Stream Live will continue to ingest and stream your live video. Make sure the streaming software you use to push RTMP feeds automatically reconnects if the connection breaks. Some apps like OBS reconnect automatically while other apps like FFmpeg require custom configuration.

## Bitrate estimates at each quality level

Stream transcodes and makes live streams available at multiple quality levels by estimating a live stream's bitrate.These estimates ensure that live video plays at the highest quality a viewer has adequate bandwidth to play.

### How it works

As live video is streamed to Cloudflare, Stream transcodes it to make it available to viewers at multiple quality levels. During transcoding, Stream determines every video segment’s actual bandwidth needs for each quality level. This information provides a bandwidth requirement estimate for each quality level in HLS (`.m3u8`) and DASH (`.mpd`) manifests.

If a live stream contains content with low visual complexity, like a slideshow presentation, the bandwidth estimates provided in the HLS manifest will be lower to ensure as many viewers as possible view the highest quality level because it requires relatively little bandwidth. Conversely, if a live stream contains content with high visual complexity, like live sports with motion and camera panning, the bandwidth estimates provided in the HLS manifest will be higher to ensure viewers with inadequate bandwidth switch down to a lower quality level, and their playback does not buffer.

### How you benefit

The live stream bitrate estimates Stream provides are particularly helpful when you are building a platform or application that allows your end users to create their own live streams, and when end users have their own streaming software and hardware you cannot control. This functionality adapts based on the live video Stream receives rather than just the configuration advertised by the broadcaster. Even in cases where your end users' settings are less than ideal, client video players will not receive excessively high estimates of bandwidth requirements which can cause playback quality to decrease unnecessarily. 

Your end users do not have to be OBS Studio experts in order to get high quality video playback, and no work is required on your end — dynamic live bitrate applies to all live inputs for all Cloudflare Stream customers.

## Billing

Stream Live is billed identically to the rest of Cloudflare Stream.

- You pay $5 per 1000 minutes of recorded video.
- You pay $1 per 1000 minutes of delivered video.

All Stream Live videos are automatically recorded. There is no additional cost for encoding and packaging live videos.

For more, see [Billing for Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360016450871-Billing-for-Cloudflare-Stream).