---
order: 2
pcx-content-type: reference
---

# View with third-party players

Stream is compatible with third-party players that support HLS and DASH manifests with no additional charge when you need more control over the Stream player.

Some use cases that might benefit from a third-party player include:

- Native mobile playback
- Unsupported Stream features
- Specific UI needs such as branding

## Manifest files

Every video uploaded on Stream contains HLS and DASH manifests available to use, which are standard formats for streaming media with broad support.

The locations of these files can be found in the [Stream API for each video](https://api.cloudflare.com/#stream-videos-video-details).

The `playback` object contains entries for all available playback methods

```json
//...
"playback": {
    "hls": "https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.m3u8",
    "dash": "https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.mpd"
}
//...
```

## Recommendations

Use the manifest format that is compatible with your player. If both manifest formats are compatible, consider DASH as it has smaller manifests for longer videos.

Playback in the Apple ecosystem, especially iOS, likely requires using HLS.

## Customization with hints

Manifests can be customized using hints. These are query parameters included on the manifest request that indicate a preference. When possible, these will be respected.

If a hint or combination of hints would cause an invalid manifest to be served, all hints are ignored.

Currently, the following hints is available.

<Definitions>

  - `clientBandwidthHint` <Type>float</Type>
    - Requires all video representations in the manifest have a bitrate at least the provided Mbps. This can be used to enforce a minimum level of quality at the expense of users on slower connections.

</Definitions>

Refer to the example below to only display video representations with at least 1.8 Mbps of bandwidth.

```txt
https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.mpd?clientBandwidthHint=1.8
```

This removes all video representations with a bitrate less than 1.8Mbps from the manifest. In this case, a customer is expressing their preference to have their content display at a higher minimum quality.

## Use Stream videos as a cover background

If you need complete control over the video element's CSS, you can use a third party player like **hls.js** and the manifest with a video element.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <style>
      body,
      html {
        height: 100%;
        margin: 0;
      }

      #cover-video {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <script src="https://unpkg.com/hls.js/dist/hls.min.js"></script>
    <video autoplay muted loop id="cover-video"></video>
    <script>
      var hls = new Hls();
      hls.loadSource("https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.m3u8");
      hls.attachMedia(document.getElementById("cover-video"));
    </script>
  </body>
</html>
```

## Limitations

- [Analytics](/analytics/) are not collected by third-party players, and information such as minutes viewed and number of views will not be available on the Stream dashboard.
- Automatic error reporting is not available to third-party players. Contact Cloudflare Support if you experience playback issues with Stream manifest files.
