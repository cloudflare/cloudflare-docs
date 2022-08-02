---
pcx-content-type: how to
title: Clip videos
---

## Clip videos on Demand (VOD)

With Video on Demand (VOD) clipping, you can trim a video down to a specific segment. For example, if you have a three hour video but only need a 20 second segment, you can clip the video that specific segment.

Before you can use VOD clipping, you will need an API token. For more information on getting an API token, refer to [Creating API tokens](/api/tokens/create/).

```bash
---
header: Example cURL request for clipping
---

curl --location --request POST 'https://api.staging.cloudflare.com/client/v4/accounts/<YOUR_ACCOUND_ID_HERE>/stream/clip' \
--header 'Authorization: Bearer <YOUR_TOKEN_HERE>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "clippedFromVideoUID": "0ea62994907491cf9ebefb0a34c1e2c6",
    "startTimeSeconds": 10,
    "endTimeSeconds": 15,
    "meta": {
      "filetype": "video/mp4",
      "name": "overriding-filename-clip.mp4",
      "relativePath": "null",
      "type": "video/mp4"
    }
}'
```

You can check on the status of the video clipping from the [Cloudflare dashboard](https://dash.cloudflare.com/) under **Stream** > **Videos**. 

## Clip standard videos

To clip your video, determine the start and end time in seconds for your video. Use that `videoUID` and the start end times to make your request.

```bash
---
header: Video clipping required parameters
---
{
    "clippedFromVideoUID": "0ea62994907491cf9ebefb0a34c1e2c6",
    "startTimeSeconds": 20,
    "endTimeSeconds": 40
}
```

```bash
---
header: Example cURL response for clipping
---
{
    "result": {
        "uid": "85b15292b6751af4a7cca9389701485f",
        "creator": null,
        "thumbnail": "https://staging.cloudflarestream.com/85b15292b6751af4a7cca9389701485f/thumbnails/thumbnail.jpg",
        "thumbnailTimestampPct": 0,
        "readyToStream": false,
        "status": {
            "state": "queued",
            "errorReasonCode": "",
            "errorReasonText": ""
        },
        "meta": {},
        "created": "2022-07-18T17:16:44.528685Z",
        "modified": "2022-07-18T17:16:44.528685Z",
        "size": 0,
        "preview": "https://staging.cloudflarestream.com/85b15292b6751af4a7cca9389701485f/watch",
        "allowedOrigins": [],
        "requireSignedURLs": false,
        "uploaded": null,
        "uploadExpiry": null,
        "maxSizeBytes": null,
        "maxDurationSeconds": null,
        "duration": -1,
        "input": {
            "width": -1,
            "height": -1
        },
        "playback": {
            "hls": "https://staging.cloudflarestream.com/85b15292b6751af4a7cca9389701485f/manifest/video.m3u8",
            "dash": "https://staging.cloudflarestream.com/85b15292b6751af4a7cca9389701485f/manifest/video.mpd"
        },
        "watermark": null,
        "clippedFrom": "0ea62994907491cf9ebefb0a34c1e2c6"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

As the video clipping processes, the video status shows **Queued**. When the clipping process is complete, the video status changes to **Ready** and displays the new video duration under the video name.

## Clip and use custom video names

When you clip a video, you can also specify a new name for the clipped video. In the request below, the `name` field indicates the new name to use for the clipped video.

```bash
---
header: Example for specifying a custom name
highlight: [7]
---
{
    "clippedFromVideoUID": "0ea62994907491cf9ebefb0a34c1e2c6",
    "startTimeSeconds": 10,
    "endTimeSeconds": 15,
    "meta": {
      "filetype": "video/mp4",
      "name": "overriding-filename-clip.mp4",
      "relativePath": "null",
      "type": "video/mp4"
    }
}
```

```bash
---
header: Example response with new name for clipped video 
---
{
    "result": {
        "uid": "2bfcd6e7dfaafb37da76a53d4b3f698e",
        "creator": null,
        "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/2bfcd6e7dfaafb37da76a53d4b3f698e/thumbnails/thumbnail.jpg",
        "thumbnailTimestampPct": 0,
        "readyToStream": false,
        "status": {
            "state": "queued",
            "errorReasonCode": "",
            "errorReasonText": ""
        },
        "meta": {
            "name": "overriding-filename-clip.mp4"
        },
        "created": "2022-07-18T17:22:28.413566Z",
        "modified": "2022-07-18T17:22:28.413566Z",
        "size": 0,
        "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/2bfcd6e7dfaafb37da76a53d4b3f698e/watch",
        "allowedOrigins": [],
        "requireSignedURLs": false,
        "uploaded": null,
        "uploadExpiry": null,
        "maxSizeBytes": null,
        "maxDurationSeconds": null,
        "duration": -1,
        "input": {
            "width": -1,
            "height": -1
        },
        "playback": {
            "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/2bfcd6e7dfaafb37da76a53d4b3f698e/manifest/video.m3u8",
            "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/2bfcd6e7dfaafb37da76a53d4b3f698e/manifest/video.mpd"
        },
        "watermark": null,
        "clippedFrom": "85b15292b6751af4a7cca9389701485f"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

When the video clipping is complete, the video with the new name displays in your Cloudflare dashboard in the list videos.

## Clip and use custom watermark profiles

You can clip a video and also add a custom watermark. For more information on watermarks and uploading a watermark profile, refer to [Apply watermarks](/stream/edit-manage-videos/edit-videos).

```bash
---
header: Example request for a clipped video with a custom name and watermark profile
highlight: [5,6,10]
---
{
    "clippedFromVideoUID": "0ea62994907491cf9ebefb0a34c1e2c6",
    "startTimeSeconds": 10,
    "endTimeSeconds": 15,
    "watermark": {
        "uid": "4babd675387c3d927f58c41c761978fe"
    },
    "meta": {
      "filetype": "video/mp4",
      "name": "overriding-filename-clip.mp4",
      "type": "video/mp4"
    }
}
```

```bash
---
header: Example response with custom name and watermark profile
---
{
    "result": {
        "uid": "02aa69233eb13c47068cb6b9bb8ab2b1",
        "creator": null,
        "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/02aa69233eb13c47068cb6b9bb8ab2b1/thumbnails/thumbnail.jpg",
        "thumbnailTimestampPct": 0,
        "readyToStream": false,
        "status": {
            "state": "queued",
            "errorReasonCode": "",
            "errorReasonText": ""
        },
        "meta": {
            "name": "overriding-filename-clip.mp4"
        },
        "created": "2022-07-18T19:30:37.365699Z",
        "modified": "2022-07-18T19:30:37.365699Z",
        "size": 0,
        "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/02aa69233eb13c47068cb6b9bb8ab2b1/watch",
        "allowedOrigins": [],
        "requireSignedURLs": false,
        "uploaded": null,
        "uploadExpiry": null,
        "maxSizeBytes": null,
        "maxDurationSeconds": null,
        "duration": -1,
        "input": {
            "width": -1,
            "height": -1
        },
        "playback": {
            "hls": "https://customer-m033z5x00ks6nunlcloudflarestream.com/02aa69233eb13c47068cb6b9bb8ab2b1/manifest/video.m3u8",
            "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/02aa69233eb13c47068cb6b9bb8ab2b1/manifest/video.mpd"
        },
        "watermark": null,
        "clippedFrom": "0ea62994907491cf9ebefb0a34c1e2c6"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

After the video processing is complete, the video displays the watermark you specified on the video.

## Clip and use require signed URLs

You can clip a video and also require a signed URL, which makes a video private and accessible only to certain users. For more information about signed URLs, refer to [Secure your Stream](/stream/viewing-videos/securing-your-stream/).

```bash
---
header: Example request with a required signed URL
highlight: [5]
---
{
    "clippedFromVideoUID": "0ea62994907491cf9ebefb0a34c1e2c6",
    "startTimeSeconds": 10,
    "endTimeSeconds": 15,
    "requireSignedURLs": true,
    "meta": {
      "filetype": "video/mp4",
      "name": "signed-urls-demo.mp4",
      "type": "video/mp4"
    }
}
```

```bash
---
header: Example response with a required signed URL
---
{     
    "result": {
        "uid": "da32c97cbedb1abfd432b55282fa7a2a",
        "creator": null,
        "thumbnail": "https://staging.cloudflarestream.com/da32c97cbedb1abfd432b55282fa7a2a/thumbnails/thumbnail.jpg",
        "thumbnailTimestampPct": 0,
        "readyToStream": false,
        "status": {
            "state": "queued",
            "errorReasonCode": "",
            "errorReasonText": ""
        },
        "meta": {
            "name": "signed-urls-demo.mp4"
        },
        "created": "2022-07-18T19:36:28.683824Z",
        "modified": "2022-07-18T19:36:28.683824Z",
        "size": 0,
        "preview": "https://staging.cloudflarestream.com/da32c97cbedb1abfd432b55282fa7a2a/watch",
        "allowedOrigins": [],
        "requireSignedURLs": true,
        "uploaded": null,
        "uploadExpiry": null,
        "maxSizeBytes": null,
        "maxDurationSeconds": null,
        "duration": -1,
        "input": {
            "width": -1,
            "height": -1
        },
        "playback": {
            "hls": "https://staging.cloudflarestream.com/da32c97cbedb1abfd432b55282fa7a2a/manifest/video.m3u8",
            "dash": "https://staging.cloudflarestream.com/da32c97cbedb1abfd432b55282fa7a2a/manifest/video.mpd"
        },
        "watermark": null,
        "clippedFrom": "0ea62994907491cf9ebefb0a34c1e2c6"
    },
    "success": true,
    "errors": [],
    "messages": [] 
}
```

After the video clipping is complete, you can open the Cloudflare dashboard and video list to locate your video. When you select the video, the **Settings** tab displays a checkmark next to **Require Signed URLs**.

## Clip and specify thumbnail percentages

You can clip a video and also specify a thumbnail for your video using a percentage value. To convert the thumbnail's timestamp from seconds to a percentage, divide the timestamp you want to use by the total duration of the video. For more information about thumbnails, refer to [Display thumbnails](/stream/edit-manage-videos/displaying-thumbnails).

```bash
---
header: Example request for a clipped video with a thumbnail requested at the 50% mark
highlight: [5]
---
{
    "clippedFromVideoUID": "0ea62994907491cf9ebefb0a34c1e2c6",
    "startTimeSeconds": 10,
    "endTimeSeconds": 15,
    "thumbnailTimestampPct": 0.5,
    "meta": {
      "filetype": "video/mp4",
      "name": "thumbnail_percentage.mp4",
      "type": "video/mp4"
    }
}
```

```bash
---
header: Example response for a clipped video with a thumbnail requested at the 50% mark
---
{
    "result": {
        "uid": "3555733dcab47c83b7e774392200f115",
        "creator": null,
        "thumbnail": "https://staging.cloudflarestream.com/3555733dcab47c83b7e774392200f115/thumbnails/thumbnail.jpg",
        "thumbnailTimestampPct": 0.5,
        "readyToStream": false,
        "status": {
            "state": "queued",
            "errorReasonCode": "",
            "errorReasonText": ""
        },
        "meta": {
            "name": "thumbnail_percentage.mp4"
        },
        "created": "2022-07-18T19:39:23.012211Z",
        "modified": "2022-07-18T19:39:23.012211Z",
        "size": 0,
        "preview": "https://staging.cloudflarestream.com/3555733dcab47c83b7e774392200f115/watch",
        "allowedOrigins": [],
        "requireSignedURLs": false,
        "uploaded": null,
        "uploadExpiry": null,
        "maxSizeBytes": null,
        "maxDurationSeconds": null,
        "duration": -1,
        "input": {
            "width": -1,
            "height": -1
        },
        "playback": {
            "hls": "https://staging.cloudflarestream.com/3555733dcab47c83b7e774392200f115/manifest/video.m3u8",
            "dash": "https://staging.cloudflarestream.com/3555733dcab47c83b7e774392200f115/manifest/video.mpd"
        },
        "watermark": null,
        "clippedFrom": "0ea62994907491cf9ebefb0a34c1e2c6"
    },
    "success": true,
    "errors": [],
    "messages": []
}
```
