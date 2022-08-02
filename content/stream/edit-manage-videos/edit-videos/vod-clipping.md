---
pcx-content-type: how to
title: Clip videos
---

# Clip videos

With video clipping – also referred to as "trimming" or changing the length of the video, you can change the start and end points of a video so your users only see a specific "clip" of the video. For example, if you have a 20 minute video but only need to show the first five minutes, you can clip the video that specific segment.

Before you can use VOD clipping, you will need an API token. For more information on creating an API token, refer to [Creating API tokens](/api/tokens/create/).

## Required parameters

To clip your video, determine the start and end times you want to use from the existing video to create the new video. Use that `videoUID` and the start end times to make your request.

```bash
---
header: Required parameters
---
{
    "clippedFromVideoUID": "0ea62994907491cf9ebefb0a34c1e2c6",
    "startTimeSeconds": 20,
    "endTimeSeconds": 40
}
```

- **`clippedFromVideoUID`**: The unique identifier for the video used to create the new, clipped video.
- **`startTimeSeconds`**: The timestamp from the existing video that indicates when the new video begins.
- **`endTimeSeconds`**: The timestamp from the existing video that indicates when the new video ends.

You can check whether your video is ready to play from the [Cloudflare dashboard](https://dash.cloudflare.com/) under **Stream** > **Videos**. While the clipped video processes, the video status response displays **Queued**. When the clipping process is complete, the video status changes to **Ready** and displays the new name of the clipped video and the new duration.

To receive a notification when your video is done processing and ready to play, you can subscribe to webhook notifications. For more information on webhooks, refer to [Use webhooks](/stream/edit-manage-videos/manage-video-library/using-webhooks/).

## Add a custom video name

When you clip a video, you can also specify a new name for the clipped video. In the request below, the `name` field indicates the new name to use for the clipped video.

```bash
---
header: Example request for specifying a custom name
highlight: [6]
---
{
    "clippedFromVideoUID": "0ea62994907491cf9ebefb0a34c1e2c6",
    "startTimeSeconds": 10,
    "endTimeSeconds": 15,
    "meta": {
      "name": "overriding-filename-clip.mp4"
    }
}
```

When the video clipping is complete, the video with the new name displays in your Cloudflare dashboard in the list videos.

## Use custom watermark profiles

You can clip a video and also add a custom watermark. For more information on watermarks and uploading a watermark profile, refer to [Apply watermarks](/stream/edit-manage-videos/edit-videos).

```bash
---
header: Example request for a clipped video with a custom name and watermark profile
highlight: [5,6,9]
---
{
    "clippedFromVideoUID": "0ea62994907491cf9ebefb0a34c1e2c6",
    "startTimeSeconds": 10,
    "endTimeSeconds": 15,
    "watermark": {
        "uid": "4babd675387c3d927f58c41c761978fe"
    },
    "meta": {
      "name": "overriding-filename-clip.mp4"
    }
}
```

After the video processing is complete, the video displays the watermark you specified on the video.

## Require signed URLs

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
      "name": "signed-urls-demo.mp4"
    }
}
```

After the video clipping is complete, you can open the Cloudflare dashboard and video list to locate your video. When you select the video, the **Settings** tab displays a checkmark next to **Require Signed URLs**.

## Specify thumbnail percentages

You can clip a video and also specify a thumbnail for your video using a percentage value. To convert the thumbnail's timestamp from seconds to a percentage, divide the timestamp you want to use by the total duration of the video. For more information about thumbnails, refer to [Display thumbnails](/stream/edit-manage-videos/edit-videos/displaying-thumbnails).

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
      "name": "thumbnail_percentage.mp4"
    }
}
```
## Example response

The example response below highlights the optional parameters mentioned above. 

```bash
---
header: Example cURL response
highlight: [6,14,21,35,36]
---
{
    "result": {
        "uid": "85b15292b6751af4a7cca9389701485f",
        "creator": null,
        "thumbnail": "https://staging.cloudflarestream.com/85b15292b6751af4a7cca9389701485f/thumbnails/thumbnail.jpg",
        "thumbnailTimestampPct": 0.5,
        "readyToStream": false,
        "status": {
            "state": "queued",
            "errorReasonCode": "",
            "errorReasonText": ""
        },
        "meta": {
            "name": "overriding-filename-clip.mp4",
        },
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