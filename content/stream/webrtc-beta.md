---
pcx_content_type: navigation
weight: 8
title: WebRTC (beta)
---

{{<beta>}}WebRTC{{</beta>}}

Sub-second latency live streaming (using WHIP) and playback (using WHEP) to unlimited concurrent viewers.

WebRTC is ideal for when you need live video to playback in near real-time, such as:

- When the outcome of a live event is time-sensitive (live sports, financial news)
- When viewers interact with the live stream (live Q&A, auctions, etc.)
- When you want your end users to be able to easily go live or create their own video content, from a web browser or native app

{{<Aside>}}
WebRTC streaming is currently in beta, and we'd love to hear what you think. Join the Cloudflare Discord server [using this invite](https://discord.com/invite/cloudflaredev/) and hop into our [Discord channel](https://discord.com/channels/595317990191398933/893253103695065128) to let us know what you're building with WebRTC!
{{</Aside>}}

## Step 1: Create a live input

[Use the Stream Dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs/create), or make a POST request to the [`/live_inputs` API endpoint](/api/operations/stream-live-inputs-create-a-live-input)

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

Paste this URL into the provided [WHIP example code](https://github.com/cloudflare/workers-sdk/blob/main/templates/stream/webrtc/src/whip.html#L13), which you can [run in your web browser on Stackblitz](https://workers.new/stream/webrtc-whip):

```javascript
---
header: Simplified example code
highlight: [4]
---
// Add a <video> element to the HTML page this code runs in:
// <video id="input-video" autoplay muted></video>

import WHIPClient from "./WHIPClient.js"; // an example WHIP client, see https://github.com/cloudflare/workers-sdk/blob/main/templates/stream/webrtc/src/WHIPClient.ts

const url = "<WEBRTC_URL_FROM_YOUR_LIVE_INPUT>"; // add the webRTC URL from your live input here
const videoElement = document.getElementById("input-video");
const client = new WHIPClient(url, videoElement);
```

Once the creator grants permission to their camera and microphone, live video and audio will automatically start being streamed to Cloudflare, using WebRTC.

You can also use this URL with any client that supports the [WebRTC-HTTP ingestion protocol (WHIP)](https://www.ietf.org/id/draft-ietf-wish-whip-06.html). See [supported WHIP clients](#supported-whip-and-whep-clients) for a list of clients we have tested and confirmed compatibility with Cloudflare Stream.

## Step 3: Play live video using WHEP

Copy the URL from the `webRTCPlayback` key in the API response (see above), or directly from the [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/stream/inputs). There are no limits on the number of concurrent viewers.

Paste this URL into the provided [WHEP example code](https://github.com/cloudflare/workers-sdk/blob/main/templates/stream/webrtc/src/whep.html#L13), which you [can run in your browser on Stackblitz](https://workers.new/stream/webrtc-whep).

```javascript
---
header: Simplified example code
highlight: [4]
---
// Add a <video> element to the HTML page this code runs in:
// <video id="output-video" autoplay muted></video>

import WHEPClient from "./WHEPClient.js"; // an example WHEP client, see https://github.com/cloudflare/workers-sdk/blob/main/templates/stream/webrtc/src/WHEPClient.ts

const url = "<WEBRTC_URL_FROM_YOUR_LIVE_INPUT>"; // add the webRTCPlayback URL from your live input here
const videoElement = document.getElementById("output-video");
const client = new WHEPClient(url, videoElement);
```

As long as the creator is actively streaming, viewers should see their broadcast in their browser, with less than 1 second of latency.

You can also use this URL with any client that supports the [WebRTC-HTTP egress protocol (WHEP)](https://www.ietf.org/archive/id/draft-murillo-whep-01.html). See [supported WHEP clients](#supported-whip-and-whep-clients) for a list of clients we have tested and confirmed compatibility with Cloudflare Stream.

## Using WebRTC in native apps

If you are building a native app, the example code above can run within a [WkWebView (iOS)](https://developer.apple.com/documentation/webkit/wkwebview), [WebView (Android)](https://developer.android.com/reference/android/webkit/WebView) or using [react-native-webrtc](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/BasicUsage.md). If you need to use WebRTC without a webview, you can use Google's Java and Objective-C native implementations of WebRTC APIs, available [here](https://webrtc.googlesource.com/src/+/refs/heads/main/sdk).

## Debugging WebRTC

- **Chrome**: Navigate to `chrome://webrtc-internals` tov view detailed logs and graphs.
- **Firefox**: Navigate to `about:webrtc` to view information about WebRTC sessions, similar to Chrome.
- **Safari**: To enable WebRTC logs, from the inspector, open the settings tab (cogwheel icon), and set WebRTC logging to "Verbose" in the dropdown menu.

## Supported WHIP and WHEP clients

Beyond the [example WHIP client](https://github.com/cloudflare/workers-sdk/blob/main/templates/stream/webrtc/src/WHIPClient.ts) and [example WHEP client](https://github.com/cloudflare/workers-sdk/blob/main/templates/stream/webrtc/src/WHEPClient.ts) used in the examples above, we have tested and confirmed that the following clients are compatible with Cloudflare Stream:

### WHIP

- [@eyevinn/whip-web-client](https://www.npmjs.com/package/@eyevinn/whip-web-client) (Typescript)
- [whip-go](https://github.com/ggarber/whip-go) (Go)
- [gst-plugins-rs](https://gitlab.freedesktop.org/gstreamer/gst-plugins-rs) (Gstreamer plugins, written in Rust)
- [Larix Broadcaster](https://softvelum.com/larix/) (free apps for iOS and Android with WebRTC based on Pion, SDK available)

### WHEP

- [@eyevinn/webrtc-player](https://www.npmjs.com/package/@eyevinn/webrtc-player) (Typescript)
- [@eyevinn/wrtc-egress](https://www.npmjs.com/package/@eyevinn/wrtc-egress) (Typescript)
- [gst-plugins-rs](https://gitlab.freedesktop.org/gstreamer/gst-plugins-rs) (Gstreamer plugins, written in Rust)

As more WHIP and WHEP clients are published, we are committed to supporting them and being fully compliant with the both protocols.

## Supported codecs

- [VP9](https://developers.google.com/media/vp9) (recommended for highest quality)
- [VP8](https://en.wikipedia.org/wiki/VP8)
- [h264](https://en.wikipedia.org/wiki/Advanced_Video_Coding) (Constrained Baseline Profile Level 3.1, referred to as `42e01f` in the SDP offer's `profile-level-id` parameter.)

## Conformance with WHIP and WHEP specifications


Cloudflare Stream fully supports all aspects of the [WHIP](https://www.ietf.org/id/draft-ietf-wish-whip-06.html) and [WHEP](https://www.ietf.org/archive/id/draft-murillo-whep-01.html) specifications, including:

- [Trickle ICE](https://datatracker.ietf.org/doc/rfc8838/)
- [Server and client offer modes](https://www.ietf.org/archive/id/draft-murillo-whep-01.html#section-3) for WHEP

You can find the specific version of WHIP and WHEP being used in the `protocol-version` header in WHIP and WHEP API responses. The value of this header references the IETF draft slug for each protocol. Currently, Stream uses `draft-ietf-wish-whip-06` (expected to be the final WHIP draft revision) and `draft-murillo-whep-01` (the most current WHEP draft).

## Limitations while in beta

- [Recording](/stream/stream-live/watch-live-stream/#replaying-recordings) is not yet supported (coming soon)
- [Simulcasting](/stream/stream-live/simulcasting) (restreaming) is not yet supported (coming soon)
- [Live viewer counts](/stream/getting-analytics/live-viewer-count/) are not yet supported (coming soon)
- [Analytics](/stream/getting-analytics/fetching-bulk-analytics/) are not yet supported (coming soon)
- WHIP and WHEP must be used together — we do not yet support streaming using RTMP/SRT and playing using WHEP, or streaming using WHIP and playing using HLS or DASH. (coming soon)
- Once generally available, WebRTC streaming will be priced just like the rest of Cloudflare Stream, based on minutes stored and minutes of video delivered.
