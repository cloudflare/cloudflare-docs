---
order: 7
pcx-content-type: tutorial
---

# Watch live streams

When an input begins receiving the live stream, a live HLS/DASH video is automatically created as long as the mode property for the input is set to automatic.

One live input can have multiple video ids associated with it. In order to get the video id representing the current live stream for a given input, make a GET request to the /stream endpoint:

`GET /api/v4/accounts/{account}/stream?type=live&live_input_id={live-input-uid}`

The response will contain the HLS/DASH URL that can be used to play the live video:

```json
{
  "result": {
    "uid": "55b9b5ce48c3968c6b51f4c458959d6a",
    "thumbnail": "https://videodelivery.net/55b9b5ce48c3968c6b51f4c458959d6a/thumbnails/thumbnail.jpg",
    "thumbnailTimestampPct": 0,
    "readyToStream": false,
    "status": {
      "state": "live-inprogress",
      "errorReasonCode": "",
      "errorReasonText": ""
    },
    "meta": {
      "name": "CFTV Staging 23 Sep 21 05:44 UTC"
    },
    "created": "2021-09-23T05:44:30.453838Z",
    "modified": "2021-09-23T05:44:30.453838Z",
    "size": 0,
    "preview": "https://watch.videodelivery.net/55b9b5ce48c3968c6b51f4c458959d6a",
    "allowedOrigins": [],
    "requireSignedURLs": false,
    "uploaded": "2021-09-23T05:44:30.453812Z",
    "uploadExpiry": null,
    "maxSizeBytes": null,
    "maxDurationSeconds": null,
    "duration": -1,
    "input": {
      "width": -1,
      "height": -1
    },
    "playback": {
      "hls": "https://videodelivery.net/55b9b5ce48c3968c6b51f4c458959d6a/manifest/video.m3u8",
      "dash": "https://videodelivery.net/55b9b5ce48c3968c6b51f4c458959d6a/manifest/video.mpd"
    },
    "watermark": null,
    "liveInput": "34036a0695ab5237ce757ac53fd158a2"
  },
  "success": true,
  "errors": [],
  "messages": []
}
````

## Replaying Recordings
Live streams are automatically recorded. To get a list of recorded streams for a given input id, make a GET request with the type parameter set to “vod”:

`GET /api/v4/accounts/{account}/stream?type=vod&live_input_id={live-input-uid}`