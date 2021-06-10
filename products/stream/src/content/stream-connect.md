---
order: 5
---
# Stream Connect (Beta)

<Aside>

Note: Stream Connect is currently in closed beta and will be available to all users in coming weeks. [Request an invite](https://docs.google.com/forms/d/1rpRFKDTZTnh0LxysM2_Rky5pYt_rs9pUdSoJr_Ix2pk/edit).

</Aside>

Stream Connect allows you to retransmit your RTMPS feed to one or more outputs that support RTMP or RTMPS. To learn more about the vision and benefits, checkout the [Stream Connect blog post](https://blog.cloudflare.com/restream-with-stream-connect/). 

Stream Connect does not output HLS/DASH at the moment. This will be supported at a later date.

## Quick Start

There are four steps to start using Stream Connect

1. Create a live input that you will transmit to. Upon creating an input, you will receive an RTMPS URL and stream key to use in step 3.
2. Add an output to the live input
3. Configure your streaming software with the RTMP endpoint and stream key from Step 1
4. Start streaming! Stream Connect will automatically ingest the video and push it to the configured outputs

You can do steps 1 and 2 using the API or the [Stream Connect UI](https://dash.cloudflare.com/?to=/:account/stream/inputs)

### Create a live input

Create a live input to get an RTMPS URL to transmit live video to Cloudflare.

#### cURL example
```bash
curl -X POST \
-H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/live_inputs \
--data '{"meta": {"name":"test stream 1"}}'
```

##### Example response

```bash
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "uid": "66be4bf738797e01e1fca35a7bdecdcd",
    "meta": {
      "name": "test stream 1"
    },
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "rtmps": {
      "url": "rtmps://live.cloudflare.com:443/live/",
      "streamKey": "<redacted>"
    }
  }
}
```

### Add an output

Add an Output to start retransmitting live video. You can add or remove Outputs at anytime during a broadcast to start and stop retransmitting.

#### cURL example
```bash
curl -X POST \
--data '{"url": "rtmp://a.rtmp.youtube.com/live2","streamKey": "<redacted>"}' \
-H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/live_inputs/$INPUT_UID/outputs
```

##### Example response

```bash
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

### Start streaming

Use the URL and streamKey returned from input creation in your streaming software.

<Aside type="warning" header="Handling reconnections">
Make sure the streaming software you are using to push RTMP feeds automatically reconnects if the connection breaks. Some apps like OBS reconnect automatically. Other apps like FFmpeg  [require custom configuration](https://stackoverflow.com/questions/59641728/ffmpeg-stream-to-rtmp-output-and-save-to-mp4-at-same-time-with-reconnect#60286591).
  
</Aside>

## Limits

Some limits apply to the Stream Connect Beta:

- Up to 1000 live inputs per-account can be created
- Up to 50 outputs may be configured per live input
- A maximum recomended bitrate of 12000 kbps

These limits can be configured. Please reply to your beta invite email for more information.

### Get details on a live input

#### cURL example

```bash
curl -H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/live_inputs/$INPUT_UID
```

##### Example response

```bash
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "uid": "66be4bf738797e01e1fca35a7bdecdcd",
    "meta": {
      "name": "test stream 1"
    },
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "rtmps": {
      "url": "rtmps://live.cloudflare.com:443/live/",
      "streamKey": "<redacted>"
    }
  }
}
```

### List live inputs

#### cURL example

```bash
curl -H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/live_inputs
```

##### Example response

```bash
{
  "result": [
    {
      "id": "01ad856eb76821fe32749626a4b39edf",
      "created": "2021-04-23T18:57:51.425387Z",
      "modified": "2021-04-23T18:57:51.425387Z",
      "meta": {}
    },
    {
      "id": "45a52d7847c95e8cd3de797f5da77afe",
      "created": "2021-04-23T19:02:22.828507Z",
      "modified": "2021-04-23T19:02:22.828507Z",
      "meta": {}
    },
    {
      "id": "e952c51fdcea70847e728f6145727bb6",
      "created": "2021-05-05T15:02:12.175868Z",
      "modified": "2021-05-05T15:02:12.175868Z",
      "meta": {}
    },
    {
      "id": "66be4bf738797e01e1fca35a7bdecdcd",
      "created": "2021-05-05T20:46:37.056086Z",
      "modified": "2021-05-05T20:46:37.056086Z",
      "meta": {}
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

### List outputs for an input

#### cURL example

```bash
curl -H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/live_inputs/$INPUT_UID/outputs
```

##### Example response
```bash
{
  "result": [
    {
      "uid": "6f8339ed45fe87daa8e7f0fe4e4ef776",
      "url": "rtmp://a.rtmp.youtube.com/live2",
      "streamKey": "<redacted>"
    },
    {
      "uid": "baea4d9c515887b80289d5c33cf01145",
      "url": "rtmp://a.rtmp.youtube.com/live2",
      "streamKey": "<redacted>"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

### Delete an output

Note that if the associated live input is already retransmitting to this output when delete is called, that output will be disconnected within 30 seconds.

#### cURL example

```bash
curl -X DELETE \
-H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/live_inputs/$INPUT_UID/outputs/$OUTPUT_UID
```

### Delete a live input 

Note that if an input is already receiving data to retransmit, the connection will be cut within 30 seconds.

#### cURL example

```bash
curl -X DELETE \
-H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/live_inputs/$INPUT_UID
```
