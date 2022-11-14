---
pcx_content_type: concept
title: Dynamic live bitrate
weight: 5
---

# Dynamic live bitrate

Dynamic live bitrate provides client video players with more accurate bandwidth estimates for each quality level. These estimates ensure that live video plays at the highest quality a viewer has adquate bandwidth to play.

## How it works

As live video is streamed to Cloudflare, Stream transcodes it to make it available to viewers at mulitple quality levels. During transcoding, Stream determines every video segment’s actual bandwidth needs for each quality level. This information provides a bandwidth requirement estimate for each quality level in HLS (`.m3u8`) and DASH (`.mpd`) manifests.

If a live stream contains content with low visual complexity, like a slideshow presentation, the bandwidth estimates provided in the HLS manifest will be lower to ensure as many viewers as possible view the highest quality level because it requires relatively little bandwidth. Conversely, if a live stream contains content with high visual complexity, like live sports with motion and camera panning, the bandwidth estimates provided in the HLS manifest will be higher to ensure viewers with inadequate bandwidth switch down to a lower quality level, and their playback does not buffer.

## Use cases for dynamic live bitrate

Dynamic live bitrate is particularly helpful when you are building a platform or application that allows your end users to create their own live streams, and end users have their own streaming software and hardware you cannot control. This functionality adapts based on the live video Stream receives rather than just the configuration advertised by the broadcaster. Even in cases where your end users' settings are less than ideal, client video players will not receive excessively high estimates of bandwidth requirements which can cause playback quality to decrease unnecessarily. 

## Availability

Your end users do not have to be OBS Studio experts in order to get high quality video playback, and no work is required on your end — dynamic live bitrate applies to all live inputs for all Cloudflare Stream customers.