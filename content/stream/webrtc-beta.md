---
pcx_content_type: navigation
weight: 8
title: WebRTC (beta)
---

{{<beta>}}WebRTC{{</beta>}}

Sub-second latency live streaming (using WHIP) and playback (using WHEP) to unlimited concurrent viewers.

WebRTC is ideal for when you need live video to playback in near real-time, such as:

- When the outcome of a live event is time-sensitive (live sports, financial news)
- When viewers interact with the live stream (live Q&A, live betting, gambling, and auctions)
- When you want your end users to be able to easily go live or create their own video content, from a web browser or native app

{{<Aside>}}
WebRTC streaming is currently in beta, and we'd love to hear what you think. Join our [Discord channel](https://discord.com/channels/595317990191398933/893253103695065128) and let us know what you're buliding with WebRTC!
{{</Aside>}}

## Step 1: Create a live input

[Use the Stream Dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs/create), or make a POST request to the [`/live_inputs` API endpoint](https://api.cloudflare.com/#stream-live-inputs-create-a-live-input)

```bash
---
header: Create a live input using the Stream API
---
curl -X POST \
-H "Authorization: Bearer <API_TOKEN>" \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs
```

```json
---
header: API response from a POST request to /live_inputs
highlight: [5]
---
{
  "uid": "1a553f11a88915d093d45eda660d2f8c",
 ...
  "webRTC": {
    "url": "https://customer-<CODE>.cloudflarestream.com/<SECRET>/webRTC/publish"
  },
  "webRTCPlayback": {
    "url": "https://customer-<CODE>.cloudflarestream.com/<INPUT_UID>/webRTC/play"
  },
...
}
```

## Step 2: Go live using WHIP

Every live input has a unique URL that one creator can be stream to. This URL should *only* be shared with the creator — anyone with this URL has the ability to stream live video to this live input.

Copy the URL from the `webRTC` key in the API response (see above), or directly from the [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs).

Paste this URL into the provided [WHIP example code](https://github.com/cloudflare/templates/blob/main/stream/webrtc/src/whip.html#L13), which you can [run in your web browser on Stackblitz](https://workers.new/stream/webrtc-whip):

```javascript
---
header: Simplified example code
highlight: [4]
---
// Add a <video> element to the HTML page this code runs in:
// <video id="input-video" autoplay muted></video>

import WHIPClient from "./WHIPClient.js"; // an example WHIP client, see https://github.com/cloudflare/templates/tree/main/stream/webrtc/src/WHIPClient.ts

const url = "<WEBRTC_URL_FROM_YOUR_LIVE_INPUT>"; // add the webRTC URL from your live input here
const videoElement = document.getElementById("input-video");
const client = new WHIPClient(url, videoElement);
```

Once the creator grants permission to their camera and microphone, live video and audio will automatically start being streamed to Cloudflare, using WebRTC.

You can also use this URL with any client that supports the [WebRTC-HTTP ingestion protocol (WHIP)](https://www.ietf.org/id/draft-ietf-wish-whip-04.html), such as [Gstreamer](https://gstreamer.freedesktop.org/) or [whip-js](https://github.com/medooze/whip-js). There is active development and discussion around [supporting WHIP in OBS Studio](https://github.com/obsproject/obs-studio/pull/7192). 

{{<Aside>}}
[Trickle ICE](https://datatracker.ietf.org/doc/rfc8838/) is not yet supported, but will be supported soon. Some WHIP clients require Trickle ICE.
{{</Aside>}}

## Step 3: Play live video using WHEP

Copy the URL from the `webRTCPlayback` key in the API response (see above), or directly from the [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs). There are no limits on the number of concurrent viewers.

Paste this URL into the provided WHEP example code, which you [can run in your browser on Stackblitz](https://workers.new/stream/webrtc-whep).

```javascript
---
header: Simplified example code
highlight: [4]
---
// Add a <video> element to the HTML page this code runs in:
// <video id="input-video" autoplay muted></video>

import WHEPClient from "./WHEPClient.js"; // an example WHEP client, see https://github.com/cloudflare/templates/tree/main/stream/webrtc/src/WHEPClient.ts

const url = "<WEBRTC_URL_FROM_YOUR_LIVE_INPUT>"; // add the webRTCPlayback URL from your live input here
const videoElement = document.getElementById("input-video");
const client = new WHEPClient(url, videoElement);
```

As long as the creator is actively streaming, viewers should see their broadcast in their browser, with less than 1 second of latency.

You can also use this URL with any client that supports the [WebRTC-HTTP egress protocol (WHEP)](https://www.ietf.org/id/draft-murillo-whep-00.html).

## Using WebRTC in native apps

If you are building a native app, the example code above can run within a [WkWebView (iOS)](https://developer.apple.com/documentation/webkit/wkwebview), [WebView (Android)](https://developer.android.com/reference/android/webkit/WebView) or using [react-native-webrtc](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/BasicUsage.md). If you need to use WebRTC without a webview, you can use Google's Java and Objective-C native implementations of WebRTC APIs, available [here](https://webrtc.googlesource.com/src/+/refs/heads/main/sdk).

## Debugging WebRTC

- **Chrome**: Navigate to `chrome://webrtc-internals` tov view detailed logs and graphs.
- **Firefox**: Navigate to `about:webrtc` to view information about WebRTC sessions, similar to Chrome.
- **Safari**: To enable WebRTC logs, from the inspector, open the settings tab (cogwheel icon), and set WebRTC logging to "Verbose" in the dropdown menu.

## Limitations while in beta

- [Recording](/stream/stream-live/replay-recordings/) is not yet supported (coming soon)
- [Simulcasting](/stream/stream-live/simulcasting) (restreaming) is not yet supported (coming soon)
- [Live viewer counts](/stream/getting-analytics/live-viewer-count/) are not yet supported (coming soon)
- [Analytics](/stream/getting-analytics/fetching-bulk-analytics/) are not yet supported (coming soon)
- Though we don't anticipate major API changes, while in beta, the WHIP and WHEP protocol versions used by our APIs is subject to change without notice. You can find the version in the `protocol-version` header in API responses. The value of this header references the IETF draft slug for each protocol, for example, `draft-ietf-wish-whip-04` and `draft-murillo-whep-00`.
- Once generally available, WebRTC streaming will be priced just like the rest of Cloudflare Stream, based on minutes stored and minutes of video delivered.