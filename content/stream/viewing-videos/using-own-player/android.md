---
title: Android
weight: 3
---

# Android

Cloudflare Stream can be used with [ExoPlayer](https://exoplayer.dev/), a media player compatible with Android devices that offers different benefits such as:

- A customizable player
- Support for playlists
- Support for DASH and SmoothStreaming
- Support for HLS

{{<render file="_prereqs.md">}}

## Examples

Refer to the [Android example](/stream/examples/android/) to view a working example of Cloudflare Stream and ExoPlayer.

## Use ExoPlayer and HLS

Refer to the code example below for a basic implementation of ExoPlayer using Cloudflare Stream's Manifest URL.


```
implementation 'com.google.android.exoplayer:exoplayer-hls:2.X.X'

SimpleExoPlayer player = new SimpleExoPlayer.Builder(context).build();

// Set the media item to the Cloudflare Stream HLS Manifest URL:
player.setMediaItem(MediaItem.fromUri("https://customer-9cbb9x7nxdw5hb57.cloudflarestream.com/8f92fe7d2c1c0983767649e065e691fc/manifest/video.m3u8"));

player.prepare();
```

