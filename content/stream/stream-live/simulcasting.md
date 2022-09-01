---
pcx_content_type: tutorial
title: Simulcast (restream) videos
weight: 5
---

# Simulcast (restream) videos

Simulcasting lets you forward your live stream to third-party platforms such as YouTube Live and Facebook Live. To begin simulcasting, select an input and add one or more Outputs:

## Add an Output using the API

Add an Output to start retransmitting live video. You can add or remove Outputs at any time during a broadcast to start and stop retransmitting.

```bash
curl -X POST \
--data '{"url": "rtmp://a.rtmp.youtube.com/live2","streamKey": "<redacted>"}' \
-H "Authorization: Bearer <API_TOKEN>" \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/<INPUT_UID>/outputs
```

​Example response:

```json
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

## Enable outputs

You can actively control when you broadcast video by enabling or disabling outputs added to a live input. When a live input is in use for streaming and has a disabled output added to it, the video is not restreamed to the output. 

By default, all outputs are enabled.

1. From Live Inputs in the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs), select an input from the list.
2. Under **Outputs** > **Enabled**, set the toggle to enabled or disabled.

## Managing outputs

To get a list of outputs, call the `/outputs` endpoint:

```bash
curl -H "Authorization: Bearer <API_TOKEN>" \ https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/<INPUT_UID>/outputs
```

To delete an output, make a `DELETE` request to the `/outputs` endpoint with the output id:

```bash
curl -X DELETE \ -H "Authorization: Bearer <API_TOKEN>" \https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/<INPUT_UID>/outputs/<OUTPUT_UID>
```

If the associated live input is already retransmitting to this output when you make the `DELETE` request, that output will be disconnected within 30 seconds.
