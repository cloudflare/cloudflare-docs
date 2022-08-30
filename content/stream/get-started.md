---
pcx_content_type: get-started
title: Get started
weight: 2
---

# Get started with Cloudflare Stream

You have multiple options to upload your first video:

- Drag and drop the video into the dashboard.
- Add a link to the video.
- Use the Stream API.

{{<Aside type="note" header="Note:">}}

Before you can use Cloudflare Stream, you must first [create a Cloudflare account](/fundamentals/account-and-billing/account-setup/create-account/) and [create an API token](/api/tokens/create/).

{{</Aside>}}

## 1. Upload your first video

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/stream).
2. Choose an option to upload your video:
    - To drag and drop a video, select **Quick Upload** and drag your video file into the pane.
    - To use a link, select **Use Link** and under **Video URL**, enter the video URL. Select **Upload**.
 
To use the API, replace the `API_TOKEN` and `ACCOUNT_ID` values with your credentials in the example below.

```bash
curl \
-X POST \
-d '{"url":"https://storage.googleapis.com/stream-example-bucket/video.mp4","meta":{"name":"My First Stream Video"}}' \
-H "Authorization: Bearer <API_TOKEN>" \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/copy
```

## 2. Start a live stream

1. From the [Stream dashboard](https://dash.cloudflare.com/?to=/:account/stream), click the **Live Inputs** tab.
2. Click **Create Live Input**.
3. Enter a name for your Live Input and click **Create Live Input**.
4. Under **Connection Information** > **Protocol**, choose **RTMPS** or **SRT**.

After you have created a Live Input, you can retrieve the RTMPS URL and Key, or if you used the SRT protocol, you can view the SRT URL. 
 
To use the API, replace the `API_TOKEN` and `ACCOUNT_ID` values with your credentials in the example below.

```bash
curl \
-X POST \ 
-H "Authorization: Bearer <API_TOKEN>" \https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs 
-D '{"meta": {"name":"My Live Stream"},"recording": { "mode": "automatic", "timeoutSeconds": 10, "requireSignedURLs": false, "allowedOrigins": ["*.example.com"] }}'
```

Within seconds of you pushing your live stream to Cloudflare Stream, you should see the live video stream.

## 3. Watch your live stream

After the live input begins receiving the live stream, you can use the HLS or DASH URL to view the current live video. 

1. From the [Stream dashboard](https://dash.cloudflare.com/?to=/:account/stream), locate your video inthe videos list and select it.
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