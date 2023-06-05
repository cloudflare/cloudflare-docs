---
title: AV1 playback (beta)
weight: 7
pcx_content_type: how-to
---

{{<beta>}}AV1 playback{{</beta>}}

Play live video or live recordings using the [AV1 codec](https://aomedia.org/av1-features/).

AV1 is an open, royalty-free video codec that uses 46% less bandwidth than H.264, the most commonly used codec for streaming video. Learn more about AV1 by reading the announcement [blog post](https://blog.cloudflare.com/av1-cloudflare-stream-beta).

{{<Aside>}}
AV1 playback is currently in open beta, and we'd love to hear what you think. Join the Cloudflare Discord [using this invite](https://discord.com/invite/cloudflaredev/) and hop into our [Discord channel](https://discord.com/channels/595317990191398933/893253103695065128) to share feedback and tell us what you're building, and  what kinds of video you’re interested in using AV1 with.
{{</Aside>}}

## Get started

{{<Aside type="warning" header="Prerequisite">}}
Before you can play video using AV1, you must first [start a live stream](/stream/stream-live/start-stream-live/).
{{</Aside>}}

To play your live video or live recording using AV1, add the `?betaCodecSuggestion=av1` query string to the HLS or DASH manifest URL that is provided to your video player, as shown below:

```bash
---
header: Example DASH manifest URL, with betaCodecSuggestion=av1 query parameter
---
https://customer-wi9sckcs7uxt7lh4.cloudflarestream.com/bb2eaea47dd47e87ecde343451b3e8a1/manifest/video.mpd?betaCodecSuggestion=av1
```

You can find the HLS and DASH manifest URLs for a live stream using the [dashboard](/stream/stream-live/watch-live-stream/#use-the-dashboard) or the [Stream API](/stream/stream-live/watch-live-stream/#use-the-api). For more on how to use HLS and DASH URLs with your video player, read [the docs](/stream/viewing-videos/using-own-player/).

Note that while in beta, only live streams or live recordings created after October 1st can be played using AV1.

## Example video

The video below is playing using the AV1 codec.

<figure data-type="stream">
  <div class="AspectRatio" style="--aspect-ratio: calc(16 / 9)">
    <iframe
      class="AspectRatio--content"
      src="https://cool-sf-videos.pages.dev/"
      title="Example Stream video"
      frame-border="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allow-full-screen></iframe>
  </div>
</figure>

## Browser and device support for AV1

- Chrome (Desktop and Android) supports AV1 playback
- Firefox (Desktop) supports AV1 playback
- Safari does not currently support AV1 playback
- Edge only supports AV1 playback if the [AV1 Extension](https://www.microsoft.com/store/productId/9MVZQVXJBQ9V) is installed
- [ExoPlayer](/stream/viewing-videos/using-own-player/android/) (Native Android media player) supports AV1 playback
- [AVPlayer](/stream/viewing-videos/using-own-player/ios/) (Native iOS media player) does not support AV1 playback

Refer to [caniuse](https://caniuse.com/av1) for details on supported web browsers and devices.

## Limitations while in beta

- Only live streams and recordings of live streams can be played using AV1, while in beta.
- The method of requesting an AV1 video using the `?betaCodecSuggestion=av1` query parameter is intended for testing purposes only. You should treat this API as experimental — while in beta, it is subject to change without notice.
- Only live streams or live recordings created after October 1st can be played using AV1.
- To playback video using AV1, you must use your own video player. Read [the docs](/stream/viewing-videos/using-own-player/) on using your own player, or see our [examples](/stream/examples/) of using Stream with the most commonly used video players.
