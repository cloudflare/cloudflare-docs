---
pcx_content_type: how to
title: Clip videos
---

# Clip videos

With video clipping, also referred to as "trimming" or changing the length of the video, you can change the start and end points of a video so viewers only see a specific "clip" of the video. For example, if you have a 20 minute video but only want to share a five minute clip from the middle of the video, you can clip the video to remove the content before and after the five minute clip.

Refer to the [Video clipping API documentation](/api/operations/stream-video-clipping-clip-videos-given-a-start-and-end-time) for more information.

{{<Aside type="note" header="Note:">}}

Video clipping does not work with recordings of live streams. 

{{</Aside>}}

## Prerequisites

Before you can clip a video, you will need an API token. For more information on creating an API token, refer to [Creating API tokens](/fundamentals/api/get-started/create-token/).

## Required parameters

To clip your video, determine the start and end times you want to use from the existing video to create the new video. Use the `videoUID` and the start end times to make your request.

```json
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
</br></br>

```bash
---
header: Example: Clip a video
highlight: [5,6,7]
---
curl --location --request POST 'https://api.cloudflare.com/client/v4/accounts/<YOUR_ACCOUND_ID_HERE>/stream/clip' \
--header 'Authorization: Bearer <YOUR_TOKEN_HERE>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "clippedFromVideoUID": "0ea62994907491cf9ebefb0a34c1e2c6",
    "startTimeSeconds": 10,
    "endTimeSeconds": 15
    }'
```

You can check whether your video is ready to play after selecting your account from the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/stream). While the clipped video processes, the video status response displays **Queued**. When the clipping process is complete, the video status changes to **Ready** and displays the new name of the clipped video and the new duration.

To receive a notification when your video is done processing and ready to play, you can [subscribe to webhook notifications](/stream/manage-video-library/using-webhooks/).

## Set video name

When you clip a video, you can also specify a new name for the clipped video. In the example below, the `name` field indicates the new name to use for the clipped video.

```json
---
header: Example: Specify a custom name
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

When the video has been clipped and processed, your newly named video displays in your Cloudflare dashboard in the list videos.

## Add a watermark

You can also add a custom watermark to your video. For more information on watermarks and uploading a watermark profile, refer to [Apply watermarks](/stream/edit-videos/applying-watermarks).

```json
---
header: Example: Clip a video, set a new video name, and apply a watermark
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

## Require signed URLs

When clipping a video, you can make a video private and accessible only to certain users by [requiring a signed URL](/stream/viewing-videos/securing-your-stream/).

```json
---
header: Example: Clip a video and require signed URLs
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

## Specify a thumbnail image

You can also specify a thumbnail image for your video using a percentage value. To convert the thumbnail's timestamp from seconds to a percentage, divide the timestamp you want to use by the total duration of the video. For more information about thumbnails, refer to [Display thumbnails](/stream/viewing-videos/displaying-thumbnails).

```json
---
header: Example: Clip a video with a thumbnail generated at the 50% mark
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
