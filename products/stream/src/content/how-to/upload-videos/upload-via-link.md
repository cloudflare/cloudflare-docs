---
order: 1
pcx-content-type: tutorial
---

# Upload via link

If you have videos stored in a cloud storage bucket, you can pass an HTTP link for the file, and Stream will fetch the file and make it available for streaming.

## 1: Make an API call with the URL

Make an HTTP request to the Stream API with the video's URL using the information below.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-videos-upload-a-video-from-a-url">Upload a video from a URL</a>
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/copy</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

## 2: Poll the API or wait for a webhook

Because Stream must download and encode the video, the video might not be available for a few seconds to a few minutes depending on the length of your video. You should poll the Stream API until `readyToStream` is `true`, or you can use [webhooks](/how-to/use-webhooks) to be notified when the video is ready for streaming.

## 3: View the video

Use the video's `uid` to refer to the video after it uploads or use the `uid` to play the video using the [Stream video player](/how-to/view-videos/stream-player).

If you are using your own player or rendering the video in a mobile app, refer to [View videos with third-party players](/viewing-videos/using-the-player-api).

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
