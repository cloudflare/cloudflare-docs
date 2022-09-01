---
pcx_content_type: get-started
title: Get started
weight: 2
---

# Get started with Cloudflare Stream

{{<Aside type="note" header="Before you get started:">}}

You must first [create a Cloudflare account](/fundamentals/account-and-billing/account-setup/create-account/) and [create an API token](/api/tokens/create/) to begin using Stream.

{{</Aside>}}

You can start using Cloudflare Stream by starting a live stream or uploading a video.

Whether you choose to start a live stream or upload a video, viewing a video is the same for both options.

## Upload your first video

Upload your video from the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/stream).
 
To use the API, replace the `API_TOKEN` and `ACCOUNT_ID` values with your credentials in the example below.

```bash
curl \
-X POST \
-d '{"url":"https://storage.googleapis.com/stream-example-bucket/video.mp4","meta":{"name":"My First Stream Video"}}' \
-H "Authorization: Bearer <API_TOKEN>" \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/copy
```

Next, [watch your video](/stream/get-started/#watch-your-video).

## Start a live stream

[Create a live input](https://dash.cloudflare.com/?to=/:account/stream/inputs/create) and choose **RTMPS** or **SRT**.

After you create a Live Input, you can retrieve the **RTMPS URL** and **RTMPS Key**, or if you used the SRT protocol, you can view the **SRT URL**. 
 
To use the API, replace the `API_TOKEN` and `ACCOUNT_ID` values with your credentials in the example below.

```bash
curl \
-X POST \ 
-H "Authorization: Bearer <API_TOKEN>" \https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs 
-D '{"meta": {"name":"My Live Stream"},"recording": { "mode": "automatic", "timeoutSeconds": 10, "requireSignedURLs": false, "allowedOrigins": ["*.example.com"] }}'
```

Within seconds of you pushing your live stream to Cloudflare Stream, you should see the live video stream.

## Watch your video

1. From the [Stream dashboard](https://dash.cloudflare.com/?to=/:account/stream), select your video from the list.
2. From the **Settings** tab, select **Click to copy** for the **HLS Manifest URL** or **Dash Manifest URL**.
3. Paste the URL in your browser.

To use the API, replace the `API_TOKEN`, `ACCOUNT_ID`, and `<LIVE_INPUT_UID>` values with your credentials in the example below.

```bash
curl \
-X GET "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/<LIVE_INPUT_UID>/videos" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json"
```

The HLS and DASH Manifest URLs can also be used to view previously recorded live videos. 