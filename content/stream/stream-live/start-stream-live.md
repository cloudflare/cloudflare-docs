---
pcx_content_type: tutorial
title: Start a live stream
weight: 1
---

# Start a live stream

You can start a live stream using the Stream dashboard or the API. After you subscribe to Stream, you can create Live Inputs and begin sending your live video to Cloudflare Stream using RTMPS or SRT. SRT supports newer video codecs and makes using accessibility features, such as captions and multiple audio tracks, easier.

## Using the dashboard

**Step 1:** [Create a live input via the Stream Dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs/create)

![Screenshot of creating a live input via the Stream Dashboard](/stream/static/create-live-input-from-stream-dashboard.png)

**Step 2:** Copy the RTMPS URL and key, and use them with your live streaming application. We recommend using [Open Broadcaster Software (OBS)](https://obsproject.com/) to get started.

![Screenshot of copying a RTMPS stream key from the Stream Dashboard](/stream/static/copy-rtmps-url-from-stream-dashboard.png)

**Step 3:** Go live and preview your live stream in the Stream Dashboard

In the Stream Dashboard, within seconds of going live, you will see a preview of what your viewers will see. To add live video playback to your website or app, refer to [Play videos](/stream/viewing-videos)

## Using the API

To start a live stream programmatically, make a `POST` request to the `/live_inputs` endpoint:

```bash
---
header: Request
---
curl -X POST \
-H "Authorization: Bearer <API_TOKEN>" \
-D '{"meta": {"name":"test stream"},"recording": { "mode": "automatic" }}' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs
```

```json
---
header: Response
---
{
  "uid": "f256e6ea9341d51eea64c9454659e576",
  "rtmps": {
    "url": "rtmps://live.cloudflare.com:443/live/",
    "streamKey": "MTQ0MTcjM3MjI1NDE3ODIyNTI1MjYyMjE4NTI2ODI1NDcxMzUyMzcf256e6ea9351d51eea64c9454659e576"
  },
  "created": "2021-09-23T05:05:53.451415Z",
  "modified": "2021-09-23T05:05:53.451415Z",
  "meta": {
    "name": "test stream"
  },
  "status": null,
  "recording": {
    "mode": "automatic",
    "requireSignedURLs": false,
    "allowedOrigins": null
  }
}
```

#### Optional API parameters

[API Reference Docs for `/live_inputs`](https://api.cloudflare.com/#stream-live-inputs-create-live-inputs)

{{<definitions>}}

- `mode` {{<type>}}string{{</type>}} {{<prop-meta>}}default: `off`{{</prop-meta>}}

  - When the mode property is set to `automatic`, the live stream will be automatically available for viewing using HLS/DASH. In addition, the live stream will be automatically recorded for later replays. By default, recording mode is set to `off`, and the input will not be recorded or available for playback.

- `timeoutSeconds` {{<type>}}integer{{</type>}} {{<prop-meta>}}default: `0`{{</prop-meta>}}

  -  The `timeoutSeconds` property specifies how long a live feed can be disconnected before it results in a new video being created.

- `requireSignedURLs` {{<type>}}boolean{{</type>}} {{<prop-meta>}}default: `false`{{</prop-meta>}}

  - The `requireSignedURLs` property indicates if signed URLs are required to view the video. This setting is applied by default to all videos recorded from the input. In addition, if viewing a video via the live input ID, this field takes effect over any video-level settings.

- `allowedOrigins` {{<type>}}integer{{</type>}} {{<prop-meta>}}default: `null` (any){{</prop-meta>}}

  - The `allowedOrigins` property can optionally be invoked to provide a list of allowed origins. This setting is applied by default to all videos recorded from the input. In addition, if viewing a video via the live input ID, this field takes effect over any video-level settings.

{{</definitions>}}

## Managing live inputs

You can update live inputs by making a `PUT` request:

```bash
curl -X PUT \ -H "Authorization: Bearer <API_TOKEN>" \https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/:input_id --data '{"meta": {"name":"test stream 1"},"recording": { "mode": "automatic", "timeoutSeconds": 10 }}'
```

Delete a live input by making a `DELETE` request:

```bash
curl -X DELETE \ -H "Authorization: Bearer <API_TOKEN>" \https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/:input_id
```

## Requirements and known limitations

### Requirements

- You must set [GOP duration](https://en.wikipedia.org/wiki/Group_of_pictures) (keyframe interval) to be between 2 to 10 seconds. The default in most encoding software, including Open Broadcaster Software (OBS), is within this range. Setting a lower GOP duration will reduce latency for viewers, while also reducing encoding efficiency. Setting a higher GOP duration will improve encoding efficiency, while increasing latency for viewers. This is a tradeoff inherent to video encoding, and not a limitation of Cloudflare Stream.
- Closed GOPs required. This means that if there are any B frames in the video, they should always refer to frames within the same GOP. This setting is default in most encoding software such as OBS.
- Stream Live only supports H.264 video and AAC audio codecs as inputs. This requirement does not apply to inputs that are relayed to Stream Connect outputs. Stream Live supports ADTS but does not presently support LATM.
- Clients must be configured to reconnect when a disconnection occurs. Stream Live is designed to handle reconnection gracefully by continuing the live stream.

### Known limitations:

- Stream Live currently only supports HLS (HTTP Live Streaming), and recordings are only kept for the last seven days of the stream.
- Watermarks cannot yet be used with live videos.
- If a live video exceeds seven days in length, the recording will be truncated to seven days and not be viewable.
