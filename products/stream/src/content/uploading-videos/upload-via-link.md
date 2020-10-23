---
order: 1
---

# Upload via link

If you have videos stored in a cloud storage bucket, you can simply pass a HTTP link for the file. Stream will fetch the file and make it available for streaming.

By using [webhooks](/uploading-videos/using-webhooks) you can receive a notification when the video is ready to be played or if it errors.

## Step 1: Make an API call with the link

Make a HTTP request to the Stream API with the URL of the video.

```bash
curl \
-X POST \
-d '{"url":"https://storage.googleapis.com/zaid-test/Watermarks%20Demo/cf-ad-original.mp4","meta":{"name":"My First Stream Video"}}' \
-H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUND_ID/stream/copy
```

```json
{
  "result": {
    "uid": "4544715edbe00808d89aec0a3a765c40",
    "thumbnail": "https://videodelivery.net/4544715edbe00808d89aec0a3a765c40/thumbnails/thumbnail.jpg",
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
    "preview": "https://watch.cloudflarestream.com/4544715edbe00808d89aec0a3a765c40",
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
      "hls": "https://videodelivery.net/4544715edbe00808d89aec0a3a765c40/manifest/video.m3u8",
      "dash": "https://videodelivery.net/4544715edbe00808d89aec0a3a765c40/manifest/video.mpd"
    },
    "watermark": null
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Step 2: Poll the API or wait for a [webhook](/uploading-videos/using-webhooks)

Because Stream must download and encode the video, the video might not be available for a few seconds to a few minutes depending on the length of your video. You should poll the Stream API until `readyToStream` is `true`, or use [webhooks](/uploading-videos/using-webhooks) to be notified when a video is ready for streaming.

## Step 3: View the video

The `uid` of the video can be used refer to the video after uploading and can be used to play it using the [Stream video player](/viewing-videos/using-the-stream-player).

If you're using your own player or rendering the video in a mobile app, view information on [using your own player](/viewing-videos/using-the-player-api).

<!--
Update to Stream component once available
https://github.com/cloudflare/cloudflare-docs-engine/issues/281
-->
<figure data-type="stream">
  <div className="AspectRatio" style={{"--aspect-ratio": "calc(16 / 9)"}}>
    <iframe
      className="AspectRatio--content"
      src="https://iframe.videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81?mute=true"
      title="Example Stream video"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen/>
  </div>
</figure>

<Link to="https://api.cloudflare.com/#stream-videos-upload-a-video-from-a-url" className="Button Button-is-primary">View detailed API reference</Link>