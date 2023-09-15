
---
type: example
summary: Example of sub 1s latency video playback using RTMPS and ffplay
tags:
  - Playback
pcx_content_type: configuration
title: RTMPS playback
weight: 8
layout: example
---

{{<render file="_prereqs_first_start_live_streaming.md">}}

Copy the RTMPS _playback_ key for your live input from the [Stream Dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs) or the [Stream API](/stream/stream-live/start-stream-live/#use-the-api), and paste it into the URL below, replacing `<RTMPS_PLAYBACK_KEY>`:

```sh
---
header: RTMPS playback with ffplay
---
$ ffplay -analyzeduration 1 -fflags -nobuffer -probesize 32 -sync ext 'rtmps://live.cloudflare.com:443/live/<RTMPS_PLAYBACK_KEY>'
```

For more, refer to [Play live video in native apps with less than one second latency](/stream/viewing-videos/using-own-player/#play-live-video-in-native-apps-with-less-than-1-second-latency).