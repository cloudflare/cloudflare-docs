---
pcx_content_type: how-to
title: Record and replay live streams
weight: 4
---

# Record and replay live streams

Live streams are automatically recorded, and available instantly once a live stream ends. To get a list of recordings for a given input ID, make a [`GET` request to `/live_inputs/<UID>/videos`](/api/operations/stream-live-inputs-retrieve-a-live-input) and filter for videos where `state` is set to `ready`:

```bash
---
header: Request
---
curl -X GET \
-H "Authorization: Bearer <API_TOKEN>" \
https://dash.cloudflare.com/api/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/<LIVE_INPUT_UID>/videos
```

```json
---
header: Response
highlight: [10]
---
{
  "result": [
...
    {
      "uid": "6b6972f427f51793099c6b427783398e",
      "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/6b6972f427f51793099c6b427783398e/thumbnails/thumbnail.jpg",
      "thumbnailTimestampPct": 0,
      "readyToStream": true,
      "status": {
        "state": "ready",
        "pctComplete": "100.000000",
        "errorReasonCode": "",
        "errorReasonText": ""
      },
      "meta": {
        "name": "Stream Live Test 22 Sep 21 22:12 UTC"
      },
      "created": "2021-09-22T22:12:53.587306Z",
      "modified": "2021-09-23T00:14:05.591333Z",
      "size": 0,
      "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/6b6972f427f51793099c6b427783398e/watch",
      "allowedOrigins": [],
      "requireSignedURLs": false,
      "uploaded": "2021-09-22T22:12:53.587288Z",
      "uploadExpiry": null,
      "maxSizeBytes": null,
      "maxDurationSeconds": null,
      "duration": 7272,
      "input": {
        "width": 640,
        "height": 360
      },
      "playback": {
        "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/6b6972f427f51793099c6b427783398e/manifest/video.m3u8",
        "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/6b6972f427f51793099c6b427783398e/manifest/video.mpd"
      },
      "watermark": null,
      "liveInput": "34036a0695ab5237ce757ac53fd158a2"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```
