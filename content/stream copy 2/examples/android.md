---
type: example
summary: Example of video playback on Android using ExoPlayer
tags:
  - Playback
pcx_content_type: configuration
title: Android (ExoPlayer)
weight: 3
layout: example
meta:
    description: View an example of video playback on Android using ExoPlayer.
---

{{<render file="_prereqs.md">}}

{{<render file="_android_playback_code_snippet.md">}}

### Download and run an example app

1. Download [this example app](https://github.com/googlecodelabs/exoplayer-intro.git) from the official Android developer docs, following [this guide](https://developer.android.com/codelabs/exoplayer-intro#4).
2. Open and run the [exoplayer-codelab-04 example app](https://github.com/googlecodelabs/exoplayer-intro/tree/main/exoplayer-codelab-04) using [Android Studio](https://developer.android.com/studio).
3. Replace the `media_url_dash` URL on [this line](https://github.com/googlecodelabs/exoplayer-intro/blob/main/exoplayer-codelab-04/src/main/res/values/strings.xml#L21) with the DASH manifest URL for your video.

For more, see [read the docs](/stream/viewing-videos/using-own-player/ios/).
