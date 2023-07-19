---
pcx_content_type: how-to
title: Upload via link
weight: 2
---

# Upload via link

If you have videos stored in a cloud storage bucket, you can simply pass a HTTP link for the file. Stream will fetch the file and make it available for streaming.

By using [webhooks](/stream/manage-video-library/using-webhooks/) you can receive a notification when the video is ready to be played or if it errors.

## Step 1: Make an API call with the link

Make a HTTP request to the Stream API with the URL of the video.

```bash
curl \
-X POST \
-d '{"url":"https://storage.googleapis.com/zaid-test/Watermarks%20Demo/cf-ad-original.mp4","meta":{"name":"My First Stream Video"}}' \
-H "Authorization: Bearer <API_TOKEN>" \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/copy
```

```json
{
  "result": {
    "uid": "b236bde30eb07b9d01318940e5fc3eda",
    "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg",
    "thumbnailTimestampPct": 0,
    "readyToStream": false,
    "status": {
      "state": "downloading"
    },
    "meta": {
      "downloaded-from": "https://storage.googleapis.com/zaid-test/Watermarks%20Demo/cf-ad-original.mp4",
      "name": "My First Stream Video"
    },
    "created": "2020-10-16T20:20:17.872170843Z",
    "modified": "2020-10-16T20:20:17.872170843Z",
    "size": 9032701,
    "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/watch",
    "allowedOrigins": [],
    "requireSignedURLs": false,
    "uploaded": "2020-10-16T20:20:17.872170843Z",
    "uploadExpiry": null,
    "maxSizeBytes": 0,
    "maxDurationSeconds": 0,
    "duration": -1,
    "input": {
      "width": -1,
      "height": -1
    },
    "playback": {
      "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8",
      "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.mpd"
    },
    "watermark": null
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Step 2: Poll the API or wait for a webhook

Because Stream must download and encode the video, the video might not be available for a few seconds to a few minutes depending on the length of your video. You should poll the Stream API until `readyToStream` is `true`, or use [webhooks](/stream/manage-video-library/using-webhooks/) to be notified when a video is ready for streaming.

## Step 3: View the video

The `uid` of the video can be used refer to the video after uploading and can be used to play it using the [Stream video player](/stream/viewing-videos/using-the-stream-player/).

If you're using your own player or rendering the video in a mobile app, view information on [using your own player](/stream/viewing-videos/using-the-stream-player/using-the-player-api/).

<!--
Update to Stream component once available
https://github.com/cloudflare/cloudflare-docs-engine/issues/281
-->

<figure data-type="stream">
  <div class="AspectRatio" style="--aspect-ratio: calc(16 / 9)">
    <iframe
      class="AspectRatio--content"
      src="https://iframe.videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81?mute=true"
      title="Example Stream video"
      frame-border="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allow-full-screen
    />
  </div>
</figure>

<p>{{<button type="primary" href="/api/operations/stream-videos-upload-a-video-from-a-url">}}View detailed API reference{{</button>}}</p>
