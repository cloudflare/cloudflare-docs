---
pcx_content_type: tutorial
title: Watch a live stream
weight: 3
---

# Watch a live stream

When an input begins receiving the live stream, a new video with HLS and DASH URLs is automatically created as long as the mode property for the input is set to `automatic`.

## Use the API

A live input can have multiple video UIDs associated with it. To get the video UID representing the current live stream for a given input, make a `GET` request to the `/stream` endpoint. 

To play the video in your browser, use the URL from the `preview` field. To use your own player, use the `hls` or `dash` URLs.

```bash
---
header: Request
---
curl -X GET \
-H "Authorization: Bearer <API_TOKEN>" \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/<LIVE_INPUT_UID>/videos
```

The response contains the HLS/DASH URL that can be used to play the current live video as well as any previously recorded live videos. In the example below, the state of the live video is `live-inprogress` and the state for previously recorded video is `ready`.

```json
---
header: Response
highlight: [4,7,21,28,32,46]
---
{
  "result": [
    {
      "uid": "6b6972f427f51793099c6b427783398e",
      "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/6b6972f427f51793099c6b427783398e/thumbnails/thumbnail.jpg",
      
      "status": {
        "state": "live-inprogress",
        "errorReasonCode": "",
        "errorReasonText": ""
      },
      "meta": {
        "name": "Stream Live Test 23 Sep 21 05:44 UTC"
      },
      "created": "2021-09-23T05:44:30.453838Z",
      "modified": "2021-09-23T05:44:30.453838Z",
      "size": 0,
      "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/6b6972f427f51793099c6b427783398e/watch",
      ...

      "playback": {
        "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/6b6972f427f51793099c6b427783398e/manifest/video.m3u8",
        "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/6b6972f427f51793099c6b427783398e/manifest/video.mpd"
      },
      ...
    },
    {
      "uid": "b236bde30eb07b9d01318940e5fc3eda",
      "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg",
      "thumbnailTimestampPct": 0,
      "readyToStream": true,
      "status": {
        "state": "ready",
        "pctComplete": "100.000000",
        "errorReasonCode": "",
        "errorReasonText": ""
      },
      "meta": {
        "name": "CFTV Staging 22 Sep 21 22:12 UTC"
      },
      "created": "2021-09-22T22:12:53.587306Z",
      "modified": "2021-09-23T00:14:05.591333Z",
      "size": 0,
      "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/watch",
      ...
      "playback": {
        "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8",
        "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.mpd"
      },
    }
  ],
}
```

## Use the dashboard

To get the embed code or HLS Manifest URL for your video:

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Click **Stream** > **Live Inputs**.
3. Click a live input from the list to select it. The page for your live input displays.
4. Locate the **Embed** and **HLS Manifest URL** beneath the video.
5. Determine which option to use and then click **Click to copy** beneath your choice.

## View by live input ID

You can use one of the options below to view a live video by input ID:

- Replace the video ID with the input ID.
- Use the Embed code.
- Use the Manifest URL.

## Live input ID status

You can check whether a live input ID is currently streaming a video or not by making a request to the `lifecycle` endpoint. The Stream player supports using input IDs to check a live stream status, but third party players may require additional support.

```bash
---
header: Request
---
curl -X GET \
-H "Authorization: Bearer <API_TOKEN>" \
https://customer-m033z5x00ks6nunl.cloudflarestream.com/6b6972f427f51793099c6b427783398e/lifecycle
```

In the example below, the response indicates the `ID` is for an input with an active `videoUID`. The `live` status value indicates the input is actively streaming.

```json
---
header: Response for an active live stream
---
{    
    "isInput": true,
    "videoUID": "55b9b5ce48c3968c6b514c458959d6a",
    "live": true
}
```


```json
---
header: Response for an inactive live stream
---
{
    "isInput": true,
    "videoUID": null,
    "live": false
}
```

When viewing a live stream via the live input ID, the `requireSignedURLs` and `allowedOrigins` options in the live input recording settings are used. These settings are independent of the video-level settings.

## Live stream recording playback

After a live stream ends, a recording is automatically generated and available within 60 seconds. To ensure successful video viewing and playback, keep the following in mind:

- If a live stream ends while a viewer is watching, viewers using the Stream player should wait 60 seconds and then reload the player to view the recording of the live stream.
- After a live stream ends, you can check the status of the recording via the API. When the video state is `ready`, you can use one of the manifest URLs to stream the recording.  

While the recording of the live stream is generating, the video may report as `not-found` or `not-started`.

If you are not using the Stream player for live stream recordings, refer to [Record and replay live streams](/stream/stream-live/replay-recordings/) for more information on how to replay a live stream recording.