---
order: 2
---

# Using own player

There could be cases where you might need more control over the Stream player for your use case. Stream is compatible with third-party players that support HLS and DASH manifests with no additional charge.

Some use cases that might benefit from a third-party player include:

- Native mobile playback
- Features the Stream player does not support
- Specific UI needs such as branding

## Manifest files

Every video uploaded on Stream has HLS and DASH manifests available to use. These are standard formats for streaming media that have broad support.

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

### Recommendations

Use the manifest format which is compatible with your player.

If both manifest formats are compatible, prefer DASH as it has smaller manifests for longer videos.

Playback in the Apple ecosystem, especially iOS, likely requires using HLS.

### Customization with hints

Manifests may be customized using hints. These are query parameters included on the manifest request that indicate a preference. When possible, these will be respected.

If a hint or combination of hints would cause an invalid manifest to be served, all hints are ignored.

Currently, the following hints are available:

<Definitions>

  - `clientBandwidthHint` <Type>float</Type>
    - Require all video representations in the manifest have a bitrate at least the provided Mbps. This can be used to enforce a minimum level of quality at the expense of users on slower connections.

</Definitions>

#### Examples

##### Only display video representations with at least 1.8 Mbps of bandwidth

```txt
https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/manifest/video.mpd?clientBandwidthHint=1.8
```

This removes all video representations with a bitrate less than 1.8Mbps from the manifest.

In this case, a customer is expressing their preference to have their content display at a higher minimum quality.

## Limitations

- [Analytics](/getting-analytics/) are not collected by third-party players, information such as minutes viewed and number of views will not be available on the Stream dashboard.
- Automatic error reporting is not available to third-party players. Please reach out to Cloudflare Support if you experience playback issues with Stream manifest files.
