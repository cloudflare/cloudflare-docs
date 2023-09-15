---
pcx_content_type: how-to
title: Manage creators
---

# Associate videos with creators

You can set the creator field with an internal user ID at the time a tokenized upload URL is requested. When the video is uploaded, the creator property is automatically set to the internal user ID which can be used for analytics data or when searching for videos by a specific creator.

For basic uploads, you will need to add the Creator ID after you upload the video.

## Upload from URL

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/copy" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json" \
     --data '{"url":"https://example.com/myvideo.mp4","creator": "<CREATOR_ID>","thumbnailTimestampPct":0.529241,"allowedOrigins":["example.com"],"requireSignedURLs":true,"watermark":{"uid":"ea95132c15732412d22c1476fa83f27a"}}'
```

**Response**

```json
---
highlight: [35]
---
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "allowedOrigins": [
      "example.com"
    ],
    "created": "2014-01-02T02:20:00Z",
    "duration": 300,
    "input": {
      "height": 1080,
      "width": 1920
    },
    "maxDurationSeconds": 300,
    "meta": {},
    "modified": "2014-01-02T02:20:00Z",
    "uploadExpiry": "2014-01-02T02:20:00Z",
    "playback": {
      "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.m3u8",
      "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.mpd"
    },
    "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/watch",
    "readyToStream": true,
    "requireSignedURLs": true,
    "size": 4190963,
    "status": {
      "state": "ready",
      "pctComplete": "100.000000",
      "errorReasonCode": "",
      "errorReasonText": ""
    },
    "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/thumbnails/thumbnail.jpg",
    "thumbnailTimestampPct": 0.529241,
    "creator": "<CREATOR_ID>",
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "liveInput": "fc0a8dc887b16759bfd9ad922230a014",
    "uploaded": "2014-01-02T02:20:00Z",
    "watermark": {
      "uid": "ea95132c15732412d22c1476fa83f27a",
      "size": 29472,
      "height": 600,
      "width": 400,
      "created": "2014-01-02T02:20:00Z",
      "downloadedFrom": "https://company.com/logo.png",
      "name": "Marketing Videos",
      "opacity": 0.75,
      "padding": 0.1,
      "scale": 0.1,
      "position": "center"
    }
  }
}
```
## Set default creators for videos

You can associate videos with a single creator by setting a default creator ID value, which you can later use for searching for videos by creator ID or for analytics data.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs"
–header ‘X-Auth-Email: --’
–header ‘X-Auth-Key: --’
–data ‘{“DefaultCreator”:“1234”}’
```

If you have multiple creators who start live streams, [create a live input](/stream/get-started/#step-1-create-a-live-input) for each creator who will live stream and then set a `DefaultCreator` value per input. Setting the default creator ID for each input ensures that any recorded videos streamed from the creator's input will inherit the `DefaultCreator` value. 

At this time, you can only manage the default creator ID values via the API.

## Update creator in existing videos

To update the creator property in existing videos, make a POST request to the video object endpoint with a JSON payload specifying the creator property as show in the example below.

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>" \
  -H "Authorization: Bearer <AUTH_TOKEN>" \
  -d '{"creator":"test123"}'  
```

## Direct creator upload

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/direct_upload" \
     -H "Authorization: Bearer <AUTH_TOKEN>" \
     -H "Content-Type: application/json" \
     --data '{"maxDurationSeconds":300,"expiry":"2021-01-02T02:20:00Z","creator": "<CREATOR_ID>", "thumbnailTimestampPct":0.529241,"allowedOrigins":["example.com"],"requireSignedURLs":true,"watermark":{"uid":"ea95132c15732412d22c1476fa83f27a"}}'
```

**Response**

```json
---
highlight: [8]
---
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "uploadURL": "www.example.com/samplepath",
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "creator": "<CREATOR_ID>",
    "watermark": {
      "uid": "ea95132c15732412d22c1476fa83f27a",
      "size": 29472,
      "height": 600,
      "width": 400,
      "created": "2014-01-02T02:20:00Z",
      "downloadedFrom": "https://company.com/logo.png",
      "name": "Marketing Videos",
      "opacity": 0.75,
      "padding": 0.1,
      "scale": 0.1,
      "position": "center"
    }
  }
}
```

## Get videos by Creator ID

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream?after=2014-01-02T02:20:00Z&before=2014-01-02T02:20:00Z&include_counts=false&creator=<CREATOR_ID>&limit=undefined&asc=false&status=downloading,queued,inprogress,ready,error" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json"
```

**Response**

```json
---
highlight: [36]
---
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "allowedOrigins": [
        "example.com"
      ],
      "created": "2014-01-02T02:20:00Z",
      "duration": 300,
      "input": {
        "height": 1080,
        "width": 1920
      },
      "maxDurationSeconds": 300,
      "meta": {},
      "modified": "2014-01-02T02:20:00Z",
      "uploadExpiry": "2014-01-02T02:20:00Z",
      "playback": {
        "hls": "https://customer-<CODE>.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.m3u8",
        "dash": "https://customer-<CODE>.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.mpd"
      },
      "preview": "https://customer-<CODE>.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/watch",
      "readyToStream": true,
      "requireSignedURLs": true,
      "size": 4190963,
      "status": {
        "state": "ready",
        "pctComplete": "100.000000",
        "errorReasonCode": "",
        "errorReasonText": ""
      },
      "thumbnail": "https://customer-<CODE>.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/thumbnails/thumbnail.jpg",
      "thumbnailTimestampPct": 0.529241,
      "creator": "some-creator-id",
      "uid": "ea95132c15732412d22c1476fa83f27a",
      "liveInput": "fc0a8dc887b16759bfd9ad922230a014",
      "uploaded": "2014-01-02T02:20:00Z",
      "watermark": {
        "uid": "ea95132c15732412d22c1476fa83f27a",
        "size": 29472,
        "height": 600,
        "width": 400,
        "created": "2014-01-02T02:20:00Z",
        "downloadedFrom": "https://company.com/logo.png",
        "name": "Marketing Videos",
        "opacity": 0.75,
        "padding": 0.1,
        "scale": 0.1,
        "position": "center"
      }
    }
  ],
  "total": "35586",
  "range": "1000"
}
```

## tus

Add the Creator ID via the `Upload-Creator` header. For more information, refer to [Using tus](/stream/uploading-videos/direct-creator-uploads/#advanced-upload-flow-using-tus-for-large-videos).

## Query by Creator ID with GraphQL

After you set the creator property, you can use the [GraphQL API](/analytics/graphql-api/) to filter by a specific creator. Refer to [Fetching bulk analytics](/stream/getting-analytics/fetching-bulk-analytics) for more information about available metrics and filters.
