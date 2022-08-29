---
pcx_content_type: get-started
title: Get started
weight: 2
---

# Get started with Cloudflare Stream

Before you can use Cloudflare Stream, you must firstcomplete the prerequisites. 

## Prerequisites

- [Create a Cloudflare account](/fundamentals/account-and-billing/account-setup/create-account/)
- [Create an API token](/api/tokens/create/)

## Video on demand

You have multiple options to upload your first video:

- Drag and drop the video into the dashboard.
- Add a link to the video.
- Use the Stream API.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/stream).
2. Choose an option to upload your video:
    - To drag and drop a video, select **Quick Upload** and drag your video file into the pane.
    - To use a link, select **Use Link** and under **Video URL**, enter the video URL. Select **Upload**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
In the example below, replace the `API_TOKEN` and `ACCOUNT_ID` values with your credentials.

```bash
curl \
-X POST \
-d '{"url":"https://storage.googleapis.com/stream-example-bucket/video.mp4","meta":{"name":"My First Stream Video"}}' \
-H "Authorization: Bearer <API_TOKEN>" \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/copy
```
 
{{</tab>}}
{{</tabs>}}

After uploading your video, you can [use the Stream player](/stream/viewing-videos/using-the-stream-player/) or [use your own player](/stream/viewing-videos/using-own-player/) to play the video.

In the example below, replace the `src` value with the information related to your account to embed the video.

```html
<iframe
  src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/<VIDEO_UID>/iframe"
  title="Example Stream video"
  frameBorder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen>
</iframe>
```

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

## Stream Live

You can begin live streaming a video from the dashboard or using the Stream API.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
1. To start a live stream using the Stream dashboard, click the **Live Inputs** tab.
2. Click **Create Live Input**.
3. Enter a name for your Live Input and click **Create Live Input**.
4. Under **Connection Information** > **Protocol**, choose **RTMPS** or **SRT**.

After you have created a Live Input, you can retrieve the RTMPS URL and Key, or if you used the SRT protocol, you can view the SRT URL. 

Within seconds of you pushing your live stream to Cloudflare Stream, you should see the live video stream.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
In the example below, replace the `API_TOKEN` and `ACCOUNT_ID` values with your credentials.

```bash
curl \
-X POST \ 
-H "Authorization: Bearer <API_TOKEN>" \https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs 
-D '{"meta": {"name":"My Live Stream"},"recording": { "mode": "automatic", "timeoutSeconds": 10, "requireSignedURLs": false, "allowedOrigins": ["*.example.com"] }}'

```
 
{{</tab>}}
{{</tabs>}}
