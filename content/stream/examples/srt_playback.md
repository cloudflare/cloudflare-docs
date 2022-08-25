
---
type: example
summary: Example of sub 1s latency video playback using SRT and ffplay
tags:
  - Playback
pcx_content_type: configuration
title: SRT playback
weight: 9
layout: example
---

{{<render file="_prereqs_first_start_live_streaming.md">}}

Copy the **SRT Playback URL** for your live input from the [Stream Dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs) or the [Stream API](/stream/stream-live/start-stream-live/#using-the-api), and paste it into the URL below, replacing `<SRT_PLAYBACK_URL>`:

```bash
---
header: SRT playback with ffplay
---
ffplay -analyzeduration 1 -fflags -nobuffer -probesize 32 -sync ext '<SRT_PLAYBACK_URL>'
```

For more, see [read the docs](/stream/viewing-videos/using-own-player/#play-live-video-in-native-apps-with-less-than-1-second-latency).