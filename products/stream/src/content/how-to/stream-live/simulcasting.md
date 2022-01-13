---
order: 8
pcx-content-type: how-to
---

# Simulcasting

Simulcasting lets you forward your live stream to third-party platforms such as YouTube Live and Facebook Live. To begin simulcasting, select an input and add one or more Outputs:

![Begin simulcasting](../../static/simulcasting.png)

## Create an Output via the Dashboard

1. Log in to your Cloudflare account.
1. From **Menu**, under **Products** click **Stream**.
1. Click the **Live Inputs** tab.
1. On the **Live Inputs** page, click a live input from the list.
1. On the live input page, under **Outputs** click **Create Output**.
1. Enter the information for your output.
1. When you are done, click **Create Output**.

## Add an Output via the API

Add an Output to start retransmitting live video. You can add or remove Outputs at any time during a broadcast to start and stop retransmitting.

```bash
curl -X POST \
--data '{"url": "rtmp://a.rtmp.youtube.com/live2","streamKey": "<redacted>"}' \
-H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/live_inputs/$INPUT_UID/outputs
```

​Example response

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

## Manage outputs

To get a list of outputs, call the `/outputs` endpoint.

```bash
curl -H "Authorization: Bearer $TOKEN" \ https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/live_inputs/$INPUT_UID/outputs
```

To delete an output, make a `DELETE` request to the `/outputs` endpoint with the output ID.

```bash
curl -X DELETE \ -H "Authorization: Bearer $TOKEN" \https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/live_inputs/$INPUT_UID/outputs/$OUTPUT_UID
```

If the associated live input is already retransmitting to this output when you make the `DELETE` request, that output will be disconnected within 30 seconds.