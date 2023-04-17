---
type: example
summary: Example of video playback on iOS using AVPlayer
tags:
  - Playback
pcx_content_type: configuration
title: iOS (AVPlayer)
weight: 2
layout: example
---

{{<render file="_prereqs.md">}}

{{<render file="_ios_playback_code_snippet.md">}}

### Download and run an example app

1. Download [this example app](https://developer.apple.com/documentation/avfoundation/offline_playback_and_storage/using_avfoundation_to_play_and_persist_http_live_streams) from Apple's developer docs
2. Open and run the app using [Xcode](https://developer.apple.com/xcode/).
3. Search in Xcode for `m3u8`, and open the `Streams` file
4. Replace the value of `playlist_url` with the HLS manifest URL for your video.

![Screenshot of a video with Cloudflare watermark at top right](/images/stream/ios-example-screenshot-edit-hls-url.png)

5. Click the Play button in Xcode to run the app, and play your video.

For more, see [read the docs](/stream/viewing-videos/using-own-player/ios/).