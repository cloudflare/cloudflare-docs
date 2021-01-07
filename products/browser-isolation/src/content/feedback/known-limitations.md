---
title: Known limitations
order: 3
---

# Known limitations

## Webpage compatibility
Our Network Vector Rendering (NVR) technology allows us to deliver a secure remote computing experience without the bandwidth limitations of video streams. While we expect most websites to work perfectly, some browser features and web technologies are unsupported and will be implemented in future:

- Webcam / Microphone support is unavailable.
- Websites that use WebGL may not function.
- Netflix and Spotify Web Player are unavailable.
- Browser extensions are currently unsupported.

If one of these limitations affects you, please let us know by [submitting feedback](/feedback).

## Browser plugins / extensions

Browser extensions / plugins are not compatible with isolated pages at this time. We intend to support them in future, let us know what plugins you would like supported by [submitting feedback](/feedback).

## Device / Browser support

- Modern Chromium, Google Chrome, Mozilla Firefox, Safari, Edge (Chromium) and Opera should work.
- Internet Explorer 11 and below is unsupported.
- Brave Browser requires Site Shield and Cookie blocking to be disabled.

### Browser dependencies

We are still defining our minimum requirements but expect Browser Isolation to work on most modern web browsers. Under the hood the browser needs to support:

- [Web Assembly](https://caniuse.com/?search=wasm)
- [WebRTC](https://caniuse.com/?search=webrtc)
- [LocalStorage](https://caniuse.com/?search=localstorage)

### Safari

Safari's default configuration is susceptible to "[Maximum Sessions Reached](/feedback/faq#why-do-i-see-a-maximum-sessions-reached)" alerts. To workaround this behaviour open Safari → Preferences → Privacy and uncheck **Prevent cross-site tracking**.