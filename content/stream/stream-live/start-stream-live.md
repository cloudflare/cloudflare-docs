---
pcx_content_type: tutorial
title: Start a live stream
weight: 1
---

# Start a live stream

You can start a live stream using the Stream dashboard or the API. After you subscribe to Stream, you can create Live Inputs and begin sending your live video to Cloudflare Stream using RTMPS or SRT. SRT supports newer video codecs and makes using accessibility features, such as captions and multiple audio tracks, easier.

{{<render file="_srt-supported-modes.md">}}

## Use the dashboard

**Step 1:** [Create a live input via the Stream Dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs/create).

![Create live input field from dashboard](/images/stream/create-live-input-from-stream-dashboard.png)

**Step 2:** Copy the RTMPS URL and key, and use them with your live streaming application. We recommend using [Open Broadcaster Software (OBS)](https://obsproject.com/) to get started.

![Example of RTMPS URL field](/images/stream/copy-rtmps-url-from-stream-dashboard.png)

**Step 3:** Go live and preview your live stream in the Stream Dashboard

In the Stream Dashboard, within seconds of going live, you will see a preview of what your viewers will see. To add live video playback to your website or app, refer to [Play videos](/stream/viewing-videos).

## Use the API

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

[API Reference Docs for `/live_inputs`](/api/operations/stream-live-inputs-create-a-live-input)

{{<definitions>}}

- `mode` {{<type>}}string{{</type>}} {{<prop-meta>}}default: `off`{{</prop-meta>}}

  - When the mode property is set to `automatic`, the live stream will be automatically available for viewing using HLS/DASH. In addition, the live stream will be automatically recorded for later replays. By default, recording mode is set to `off`, and the input will not be recorded or available for playback.

- `timeoutSeconds` {{<type>}}integer{{</type>}} {{<prop-meta>}}default: `0`{{</prop-meta>}}

  -  The `timeoutSeconds` property specifies how long a live feed can be disconnected before it results in a new video being created.

- `requireSignedURLs` {{<type>}}boolean{{</type>}} {{<prop-meta>}}default: `false`{{</prop-meta>}}

  - The `requireSignedURLs` property indicates if signed URLs are required to view the video. This setting is applied by default to all videos recorded from the input. In addition, if viewing a video via the live input ID, this field takes effect over any video-level settings.

- `deleteRecordingAfterDays` {{<type>}}integer{{</type>}} {{<prop-meta>}}default: `null` (any){{</prop-meta>}}

  - Specifies a date and time when the recording, not the input, will be deleted. This property applies from the time the recording is made available and ready to stream. After the recording is deleted, it is no longer viewable and no longer counts towards storage for billing. Minimum value is `30`.

  When the stream ends, a `scheduledDeletion` timestamp is calculated using the `deleteRecordingAfterDays` value if present.

  Note that if the value is added to a live input while a stream is live, the property will only apply to future streams. 

- `allowedOrigins` {{<type>}}integer{{</type>}} {{<prop-meta>}}default: `null` (any){{</prop-meta>}}

  - The `allowedOrigins` property can optionally be invoked to provide a list of allowed origins. This setting is applied by default to all videos recorded from the input. In addition, if viewing a video via the live input ID, this field takes effect over any video-level settings.

{{</definitions>}}

## Manage live inputs

You can update live inputs by making a `PUT` request:

```sh
---
header: Request
---
$ curl -X PUT \
-H "Authorization: Bearer <API_TOKEN>" \
-D '{"meta": {"name":"test stream 1"},"recording": { "mode": "automatic", "timeoutSeconds": 10 }}' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/:input_id
```

Delete a live input by making a `DELETE` request:

```sh
---
header: Request
---
$ curl -X DELETE \
-H "Authorization: Bearer <API_TOKEN>" \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/:input_id
```

## Recommendations, requirements and limitations

### Recommendations

- Your creators should use an appropriate bitrate for their live streams, typically well under 12Mbps (12000Kbps). High motion, high frame rate content typically should use a higher bitrate, while low motion content like slide presentations should use a lower bitrate.
- Your creators should use a [GOP duration](https://en.wikipedia.org/wiki/Group_of_pictures) (keyframe interval) of between 2 to 10 seconds. The default in most encoding software and hardware, including Open Broadcaster Software (OBS), is within this range. Setting a lower GOP duration will reduce latency for viewers, while also reducing encoding efficiency. Setting a higher GOP duration will improve encoding efficiency, while increasing latency for viewers. This is a tradeoff inherent to video encoding, and not a limitation of Cloudflare Stream. 

### Requirements

- Closed GOPs are required. This means that if there are any B frames in the video, they should always refer to frames within the same GOP. This setting is the default in most encoding software and hardware, including [OBS Studio](https://obsproject.com/).
- Stream Live only supports H.264 video and AAC audio codecs as inputs. This requirement does not apply to inputs that are relayed to Stream Connect outputs. Stream Live supports ADTS but does not presently support LATM.
- Clients must be configured to reconnect when a disconnection occurs. Stream Live is designed to handle reconnection gracefully by continuing the live stream.

### Limitations

- Watermarks cannot yet be used with live videos.
- If a live video exceeds seven days in length, the recording will be truncated to seven days. Only the first seven days of live video content will be recorded.
