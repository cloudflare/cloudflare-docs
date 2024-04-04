---
pcx_content_type: how-to
title: Live instant clipping
---

{{<heading-pill style="beta" heading="h1">}}Live Instant Clipping{{</heading-pill>}}

Stream supports generating clips of live streams and recordings so creators and viewers alike can highlight short, engaging pieces of a longer broadcast or recording. Live instant clips can be created by end users and do not result in additional storage fees or new entries in the video library.

{{<Aside type="note" header="Note:">}}

Clipping works differently for uploaded / on-demand videos. For more information, refer to [Clip videos](/stream/edit-videos/video-clipping/).

{{</Aside>}}

## Prerequisites

When configuring a [Live input](/stream/stream-live/start-stream-live/), ensure "Live Playback and Recording" (`mode`) is enabled.

API keys are not needed to generate a preview or clip, but are needed to create Live Inputs.

Live instant clips are generated dynamically from the recording of a live stream. When generating clips manifests or MP4s, always reference the Video ID, not the Live Input ID. If the recording is deleted, the instant clip will no longer be available.

## Preview manifest

To help users replay and seek recent content, request a preview manifest by adding a `duration` parameter to the HLS manifest URL:

```text
---
header: Preview Manifest
---
https://customer-<CODE>.cloudflarestream.com/<VIDEO_ID||INPUT_ID>/manifest/video.m3u8?duration=5m
```

{{<definitions>}}
- `duration` {{<type>}}string{{</type>}} duration of the preview, up to 5 minutes as either a number of seconds ("30s") or minutes ("3m")
{{</definitions>}}

When the preview manifest is delivered, inspect the headers for two properties:

{{<definitions>}}
- `preview-start-seconds` {{<type>}}float{{</type>}} seconds into the start of the live stream or recording that the preview manifest starts. Useful in applications that allow a user to select a range from the preview because the clip will need to reference its offset from the _broadcast_ start time, not the _preview_ start time.
- `stream-media-id` {{<type>}}string{{</type>}} the video ID of the live stream or recording. Useful in applications that render the player using an _input_ ID because the clip URL should reference the _video_ ID.
{{</definitions>}}

This manifest can be played and seeked using any HLS-compatible player.

### Reading headers

Reading headers when loading a manifest requires adjusting how players handle
the response. For example, if using [HLS.js](https://github.com/video-dev/hls.js)
and the default loader, override the `pLoader` (playlist loader) class:

``` js
let currentPreviewStart;
let currentPreviewVideoID;

// Override the pLoader (playlist loader) to read the manifest headers:
class pLoader extends Hls.DefaultConfig.loader {
  constructor(config) {
    super(config);
    var load = this.load.bind(this);
    this.load = function (context, config, callbacks) {
      if (context.type == 'manifest') {
        var onSuccess = callbacks.onSuccess;
        // copy the existing onSuccess handler to fire it later.

        callbacks.onSuccess = function (response, stats, context, networkDetails) {
          // The fourth argument here is undocumented in HLS.js but contains
          // the response object for the manifest fetch, which gives us headers:

          currentPreviewStart =
            parseFloat(networkDetails.getResponseHeader('preview-start-seconds'));
          // Save the start time of the preview manifest

          currentPreviewVideoID =
            networkDetails.getResponseHeader('stream-media-id');
          // Save the video ID in case the preview was loaded with an input ID

          onSuccess(response, stats, context);
          // And fire the exisint success handler.
        };
      }
      load(context, config, callbacks);
    };
  }
}

// Specify the new loader class when setting up HLS
const hls = new Hls({
  pLoader: pLoader,
});
```

## Clip manifest

To play a clip of a live stream or recording, request a clip manifest with a duration and a start time, relative to the start of the live stream.

```text
---
header: Clip Manifest
---
https://customer-<CODE>.cloudflarestream.com/<VIDEO_ID>/manifest/clip.m3u8?time=600s&duration=30s
```

{{<definitions>}}
- `time` {{<type>}}string{{</type>}} start time of the clip in seconds, from the start of the live stream or recording
- `duration` {{<type>}}string{{</type>}} duration of the clip in seconds, up to 60 seconds max
{{</definitions>}}

This manifest can be played and seeked using any HLS-compatible player.

## Clip MP4 download

An MP4 of the clip can also be generated dynamically to be saved and shared on other platforms.

```text
---
header: Clip MP4 Download
---
https://customer-<CODE>.cloudflarestream.com/<VIDEO_ID>/clip.mp4?time=600s&duration=30s&filename=clip.mp4
```

{{<definitions>}}
- `time` {{<type>}}string{{</type>}} start time of the clip in seconds, from the start of the live stream or recording (example: "500s")
- `duration` {{<type>}}string{{</type>}} duration of the clip in seconds, up to 60 seconds max (example: "60s")
- `filename` {{<type>}}string{{</type>}} _(optional)_ a filename for the clip
{{</definitions>}}
