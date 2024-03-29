---
pcx_content_type: how-to
title: Live Instant Clipping
---

# {{<inline-pill style="beta">}} Live Instant Clipping

Stream supports generating clips of live streams and recordings so creators and viewers alike can highlight short, engaging pieces of a longer broadcast or recording. Live instant clips can be created by end-users and do not result in additional storage fees or new entries in the video library.

{{<Aside type="note" header="Note:">}}

Clipping works differently for uploaded / on-demand videos; see [Clip Videos]({{< ref video-clipping >}}).

{{</Aside>}}

## Prerequisites

When configuring a [Live Input]({{< ref start-stream-live >}}), ensure "Live Playback and Recording" (`mode`) is enabled.

API keys are not needed to generate a preview or clip, but are needed to create Live Inputs or look up Video IDs.

Live instant clips are generated dynamically from the recording of a live stream. When generating clips by manifest or MP4, always reference the Video ID, not the Live Input ID. If the recording is deleted, the instant clip will no longer be available.

## Preview Manifest

To help users replay and seek recent content to pick the boundaries for a clip, request a preview manifest by adding a `duration` parameter to the HLS manifest URL:

```text
---
header: Preview Manifest
---
https://customer-<CODE>.cloudflarestream.com/<VIDEO_ID>/manifest/video.m3u8?duration=5m
```

{{<definitions>}}
- `duration` {{<type>}}string{{</type>}} duration of the preview, up to 5 minutes as either a number of seconds ("30s") or minutes ("3m")
{{</definitions>}}

When the preview manifest is delivered, inspect the `clip-start-seconds` header to know when the preview started relative to the start of the live stream broadcast. This is useful for applications which allow a user to select a range from the preview, because the clip will need to reference the broadcast start time, not the preview start time.

This manifest can be played and seeked using any HLS-compatible player.

## Clip Manifest

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

## Clip MP4 Download

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
