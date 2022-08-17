---
title: Use your own player
weight: 1
layout: single
---

# Use your own player

Cloudflare Stream is compatible with all video players that support HLS and DASH, which are standard formats for streaming media with broad support across all web browsers, mobile operating systems and media streaming devices.

Refer to the guides below for more information.

* [Web](/stream/viewing-videos/using-own-player/web/)
* [iOS (AVPlayer)](/stream/viewing-videos/using-own-player/ios/)
* [Android (ExoPlayer)](/stream/viewing-videos/using-own-player/android/)

## Fetch HLS and Dash manifests

### URL 

Each video and live stream has its own unique HLS and DASH manifest. You can access the manifest by replacing `<UID>` with the UID of your video or live input, and replacing `<CODE>` with your unique customer code, in the URLs below:

```text
---
header: HLS
---
https://customer-<CODE>.cloudflarestream.com/<UID>/manifest/video.m3u8
```

```text
---
header: DASH
---
https://customer-<CODE>.cloudflarestream.com/<UID>/manifest/video.mpd
```

### Dashboard

1. Log into [Stream Dashboard](https://dash.cloudflare.com/?to=/:account/stream).
2. From the list of videos, locate your video and select it.
3. From the **Settings** tab, locate the **HLS Manifest URL** and **Dash Manifest URL**.
4. Select **Click to copy** under the option you want to use.

### API

Refer to the [Stream video details API documentation](https://api.cloudflare.com/#stream-videos-video-details) to learn how to fetch the manfest URLs using the Cloudflare API.

## Customize manifests by specifying available client bandwidth

Each HLS and DASH manifest provides multiple resolutions of your video or live stream. Your player contains adaptive bitrate logic to estimate the viewer's available bandwidth, and select the optimal resolution to play. Each player has different logic that makes this decision, and most have configuration options to allow you to customize or override either bandwidth or resolution.

If your player lacks such configuration options or you need to override them, you can add the `clientBandwidthHint` query param to the request to fetch the manifest file. This should be used only as a last resort — we recommend first using customization options provided by your player. Remember that while you may be developing your website or app on a fast internet connection, and be tempted to use this setting to force high quality playback, many of your viewers are likely connecting over slower mobile networks.

{{<definitions>}}

*   `clientBandwidthHint` {{<type>}}float{{</type>}}
    *   Return only the video representation closest to the provided bandwidth value (in Mbps). This can be used to enforce a specific quality level. If you specify a value that would cause an invalid or empty manifest to be served, the hint is ignored.

{{</definitions>}}


Refer to the example below to display only the video representation with a bitrate closest to 1.8 Mbps.

```txt
---
header: Example
---
https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.mpd?clientBandwidthHint=1.8
```

## Limitations

[Client-size Analytics](/stream/getting-analytics/#client-side-analytics) are not available if you use your own player.
