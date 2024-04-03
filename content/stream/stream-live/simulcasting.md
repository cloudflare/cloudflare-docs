---
pcx_content_type: tutorial
title: Simulcast (restream) videos
weight: 5
learning_center:
    title: What is live streaming?
    link: https://www.cloudflare.com/learning/video/what-is-live-streaming/
---

# Simulcast (restream) videos

Simulcasting lets you forward your live stream to third-party platforms such as Twitch, YouTube, Facebook, Twitter, and more. You can simulcast to up to 50 concurrent destinations from each live input. To begin simulcasting, select an input and add one or more Outputs.

{{<render file="_chromecast_limitations.md">}}

## Add an Output using the API

Add an Output to start retransmitting live video. You can add or remove Outputs at any time during a broadcast to start and stop retransmitting.

```bash
---
header: Request
---
curl -X POST \
--data '{"url": "rtmp://a.rtmp.youtube.com/live2","streamKey": "<redacted>"}' \
-H "Authorization: Bearer <API_TOKEN>" \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/<INPUT_UID>/outputs
```

```json
---
header: Response
---
{
  "result": {
    "uid": "6f8339ed45fe87daa8e7f0fe4e4ef776",
    "url": "rtmp://a.rtmp.youtube.com/live2",
    "streamKey": "<redacted>"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Control when you start and stop simulcasting

You can enable and disable individual live outputs via the [API](/api/operations/stream-live-inputs-update-an-output) or [Stream dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs), allowing you to:

- Start a live stream, but wait to start simulcasting to YouTube and Twitch until right before the content begins.
- Stop simulcasting before the live stream ends, to encourage viewers to transition from a third-party service like YouTube or Twitch to a direct live stream.
- Give your own users manual control over when they go live to specific simulcasting destinations.

When a live output is disabled, video is not simulcast to the live output, even when actively streaming to the corresponding live input.

By default, all live outputs are enabled.

### Enable outputs from the dashboard:

1. From Live Inputs in the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs), select an input from the list.
2. Under **Outputs** > **Enabled**, set the toggle to enabled or disabled.


## Manage outputs

| Command      | Method | Endpoint|
|--------------|--------|---------|
| [List outputs](/api/operations/stream-live-inputs-list-live-inputs)| `GET` | `accounts/:account_identifier/stream/live_inputs`|
| [Delete outputs](/api/operations/stream-live-inputs-delete-a-live-input)| `DELETE` |  `accounts/:account_identifier/stream/live_inputs/:live_input_identifier`|

If the associated live input is already retransmitting to this output when you make the `DELETE` request, that output will be disconnected within 30 seconds.
