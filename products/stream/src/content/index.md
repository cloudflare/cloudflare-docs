---
order: 0
title: Getting started
---

# Cloudflare Stream

Cloudflare Stream provides end-to-end video infrastructure at scale. Stream handles storage, encoding and adaptive bitrate playback for you so you can focus your core idea.

To get started with Stream, simply visit the Stream Dashboard in your Cloudflare account or [sign up](https://dash.cloudflare.com/sign-up/stream). Your stream videos are not attached to an domain in your Cloudflare account and you don't need a domain on Cloudflare to use Stream.

<ButtonGroup>
  <Button type="primary" href="https://dash.cloudflare.com/?to=/:account/stream">Visit the Stream dashboard</Button>
  <Button type="secondary" href="https://api.cloudflare.com/#stream-videos-properties">View API reference</Button>
</ButtonGroup>

----------

# Getting started

## Make your first API request

To make your first request to the Stream API, you must obtain these pieces of information:

1. Your Cloudflare Account ID
1. A Cloudflare Account API Token

### Step 1: Uploading your first video
Stream provides multiple ways to upload videos. For this example, we will upload an MP4 file that is stored in a storage bucket onto Stream. The MP4 file can be found here:

To make your first request, simply take the cURL command below and replace the API token, and account id placeholders with your credentials.

```bash
curl \
-X POST \
-d '{"url":"https://storage.googleapis.com/stream-example-bucket/video.mp4","meta":{"name":"My First Stream Video"}}' \
-H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/copy
```

This cURL command tells the Stream API to download the MP4 file and make it available for streaming. When executed, you will see a response similar to this:

```json
{
  "result": {
    "uid": "8d717d9d1b0920ea247a4eebd747b1fd",
    "preview": "https://watch.cloudflarestream.com/8d717d9d1b0920ea247a4eebd747b1fd",
    "thumbnail": "https://videodelivery.net/8d717d9d1b0920ea247a4eebd747b1fd/thumbnails/thumbnail.jpg",
    "readyToStream": false,
    "status": {
      "state": "downloading"
    },
    "meta": {
      "downloaded-from": "https://storage.googleapis.com/stream-example-bucket/video.mp4",
      "name": "My First Stream Video"
    },
    "created": "2020-10-16T20:20:17.872170843Z",
    "size": 9032701,
   //...
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Step 2: Wait until the video is ready to stream

Because Stream must download and process the video, the video might not be available for a few seconds depending on the length of your video. You should poll the Stream API until `readyToStream` is `true`, or use [webhooks](/uploading-videos/using-webhooks) to be notified when a video is ready for streaming.

Use the video UID from the first step to poll the video:

```bash
curl \
-H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$VIDEO_UID
```

```json
---
highlight: [6]
---
{
  "result": {
    "uid": "8d717d9d1b0920ea247a4eebd747b1fd",
    "preview": "https://watch.cloudflarestream.com/8d717d9d1b0920ea247a4eebd747b1fd",
    "thumbnail": "https://videodelivery.net/8d717d9d1b0920ea247a4eebd747b1fd/thumbnails/thumbnail.jpg",
    "readyToStream": true,
    "status": {
      "state": "ready"
    },
    "meta": {
      "downloaded-from": "https://storage.googleapis.com/stream-example-bucket/video.mp4",
      "name": "My First Stream Video"
    },
    "created": "2020-10-16T20:20:17.872170843Z",
    "size": 9032701,
   //...
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Step 3: Stream the video!

The `uid` of the video can be used refer to the video after uploading and can be used to play it using the [Stream video player](/viewing-videos/using-the-stream-player).

```html
<iframe
  src="https://iframe.videodelivery.net/$VIDEO_UID"
  title="Example Stream video"
  frameBorder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen>
</iframe>
```

Stream player is also available as a [React](https://www.npmjs.com/package/@cloudflare/stream-react) or [Angular](https://www.npmjs.com/package/@cloudflare/stream-angular) components.

<!--
Update to Stream component once available
https://github.com/cloudflare/cloudflare-docs-engine/issues/281
-->
<figure data-type="stream">
  <div className="AspectRatio" style={{"--aspect-ratio": "calc(16 / 9)"}}>
    <iframe
      className="AspectRatio--content"
      src="https://iframe.videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81?muted=true"
      title="Example Stream video"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen></iframe>
  </div>
</figure>

### Next steps

 - [Securing your Stream](/viewing-videos/securing-your-stream)
 - [Displaying thumbnails to your video](/viewing-videos/securing-your-stream)
 - [Programatically controling the video player](/viewing-videos/using-the-player-api)
 - [Uploading without a API token](/uploading-videos/direct-creator-uploads)
