---
title: FAQ
pcx_content_type: faq
weight: 9
meta:
  title: Frequently asked questions about Cloudflare Stream
---

# Frequently asked questions about Cloudflare Stream

- [Stream](#stream)
- [Stream Live](#stream-live)

## Stream

### What formats and quality levels are delivered through Cloudflare Stream?

Cloudflare decides on which bitrate, resolution, and codec is best for you. We deliver all videos to industry standard H264 codec. We use a few different adaptive streaming levels from 360p to 1080p to ensure smooth streaming for your audience watching on different devices and bandwidth constraints.

### Does Stream support multi-audio tracks?

Stream does not currently support multi-audio tracks. For files with multiple audio tracks, Stream uses the first available audio track.

### Can I download original video files from Stream?

You cannot download the _exact_ input file that you uploaded. However, depending on your use case, you can use the [Downloadable Videos](/stream/viewing-videos/download-videos/) feature to get encoded MP4s for use cases like offline viewing.

### Is there a limit to the amount of videos I can upload?

- By default, a video upload can be at most 30 GB.

- By default, you can have up to 120 videos in the `inprogress`, `queued` or `downloading` state at the same time. Videos in the `error`, `ready` or `pendingupload` state do not count toward this limit. If you need the concurrency limit raised, please [contact Cloudflare support](https://support.cloudflare.com/hc/articles/200172476) explaining your use case and why you would like the limit raised.

{{<Aside type="note">}}

The limit to the number of videos only applies to videos being uploaded to Cloudflare Stream. This limit is not related to the number of end users streaming videos.

{{</Aside>}}

- An account cannot upload videos if the total video duration exceeds the video storage capacity purchased.

Limits apply to Direct Creator Uploads at the time of upload URL creation.

Uploads over these limits will receive a 429 (Too Many Requests) or 413 (Payload too large) HTTP status codes with more information in the response body. Please write to Cloudflare support or your customer success manager for higher limits.

### Can I embed videos on Stream even if my domain is not on Cloudflare?

Yes. Stream videos can be embedded on any domain, even domains not on Cloudflare.

### What input file formats are supported?

Users can upload video in the following file formats:

MP4, MKV, MOV, AVI, FLV, MPEG-2 TS, MPEG-2 PS, MXF, LXF, GXF, 3GP, WebM, MPG, QuickTime

### What frame rates (FPS) are supported?

Cloudflare Stream supports video file uploads for any FPS, however videos will be re-encoded for 70 FPS playback. If the original video file has a frame rate lower than 70 FPS, Stream will re-encode at the original frame rate.

If the frame rate is variable we will drop frames (e.g. if there are more than 1 frames within 1/30 seconds, we will drop the extra frames within that period).

### What browsers does Stream work on?

You can embed the Stream player on the following platforms:

{{<table-wrap>}}

| Browser | Version                             |
| ------- | ----------------------------------- |
| Chrome  | Supported since Chrome version 88+  |
| Firefox | Supported since Firefox version 87+ |
| Edge    | Supported since Edge 89+            |
| Safari  | Supported since Safari version 14+  |
| Opera   | Supported since Opera version 75+   |

{{</table-wrap>}}

{{<Aside type="note" header="Note">}}

Cloudflare Stream is not available on Chromium, as Chromium does not support H.264 videos.

{{</Aside>}}

{{<table-wrap>}}

| Mobile Platform       | Version                                                                  |
| --------------------- | ------------------------------------------------------------------------ |
| Chrome on Android     | Supported on Chrome 90                                                   |
| UC Browser on Android | Supported on version 12.12+                                              |
| Samsung Internet      | Supported on 13+                                                         |
| Safari on iOS         | Supported on iOS 13.4+. Speed selector supported when not in fullscreen. |

{{</table-wrap>}}

### What are the recommended upload settings for video uploads?

If you are producing a brand new file for Cloudflare Stream, we recommend you use the following settings:

- MP4 containers, AAC audio codec, H264 video codec, 30 or below frames per second
- moov atom should be at the front of the file (Fast Start)
- H264 progressive scan (no interlacing)
- H264 high profile
- Closed GOP
- Content should be encoded and uploaded in the same frame rate it was recorded
- Mono or Stereo audio (Stream will mix audio tracks with more than 2 channels down to stereo)

Below are bitrate recommendations for encoding new videos for Stream:

{{<table-wrap>}}

| Resolution | Recommended bitrate |
| ---------- | ------------------- |
| 1080p      | 8 Mbps              |
| 720p       | 4.8 Mbps            |
| 480p       | 2.4 Mbps            |
| 360p       | 1 Mbps              |

{{</table-wrap>}}

### If I cancel my stream subscription, are the videos deleted?

Videos are removed if the subscription is not renewed within 30 days.

### I use Content Security Policy (CSP) on my website. What domains do I need to add to which directives?

If your website uses [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) directives, depending on your configuration, you may need to add Cloudflare Stream's domains to particular directives, in order to allow videos to be viewed or uploaded by your users.

If you use the provided [Stream Player](/stream/viewing-videos/using-the-stream-player/), `videodelivery.net` and `*.cloudflarestream.com` must be included in the `frame-src` or `default-src` directive to allow the player's `<iframe>` element to load.

```http
Content-Security-Policy: frame-src 'self' videodelivery.net *.cloudflarestream.com
```

If you use your **own** Player, add `*videodelivery.net` and `*.cloudflarestream.com` to the `media-src`, `img-src` and `connect-src` CSP directives to allow video files and thumbnail images to load.

```http
Content-Security-Policy: media-src 'self' videodelivery.net *.cloudflarestream.com; img-src 'self' *.videodelivery.net *.cloudflarestream.com; connect-src 'self' *.videodelivery.net *.cloudflarestream.com
```

If you allow users to upload their own videos directly to Cloudflare Stream, add `*videodelivery.net` and `*.cloudflarestream.com` to the `connect-src` CSP directive.

```http
Content-Security-Policy: connect-src 'self' *.videodelivery.net *.cloudflarestream.com
```

## Stream Live

### Do I need a separate Stream Live subscription to use Stream Live?

As long as you have a Cloudflare Stream subscription, you can use all the features of Stream Live. You do not need to add another subscription.

### How does billing work for Stream Live?

Stream Live billing works the same way as Stream On-demand:

- You pay $5 per 1000 minutes of recorded video.
- You pay $1 per 1000 minutes of delivered video.

All Stream Live videos are automatically recorded. There is no additional cost for encoding and packaging live videos.

### How many live inputs can I create? Are there any other limits?

Some limits apply to the Stream Live Beta:

- You can create up to 1000 live inputs per account.
- You can configure up to 50 outputs per live input.
- You should use a maximum recommended bitrate of 12000 kbps.

If your use case requires the limits to be increased, please contact support.

### How does Stream Live handle RTMP reconnections?

As long as your streaming software reconnects, Stream Live will continue to ingest and stream your live video. Make sure the streaming software you use to push RTMP feeds automatically reconnects if the connection breaks. Some apps like OBS reconnect automatically while other apps like FFmpeg require custom configuration.
