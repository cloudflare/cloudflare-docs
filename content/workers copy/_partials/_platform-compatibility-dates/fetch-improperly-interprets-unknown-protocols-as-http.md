---
_build:
  publishResources: false
  render: never
  list: never

name: "`fetch()` improperly interprets unknown protocols as HTTP"
sort_date: "2021-11-10"
enable_date: "2021-11-10"
enable_flag: "fetch_refuses_unknown_protocols"
disable_flag: "fetch_treats_unknown_protocols_as_http"
---

Originally, if the `fetch()` function was passed a URL specifying any protocol other than `http:` or `https:`, it would silently treat it as if it were `http:`. For example, `fetch()` would appear to accept `ftp:` URLs, but it was actually making HTTP requests instead.

Note that Cloudflare Workers supports a non-standard extension to `fetch()` to make it support WebSockets. However, when making an HTTP request that is intended to initiate a WebSocket handshake, you should still use `http:` or `https:` as the protocol, not `ws:` nor `wss:`.

The `ws:` and `wss:` URL schemes are intended to be used together with the `new WebSocket()` constructor, which exclusively supports WebSocket. The extension to `fetch()` is designed to support HTTP and WebSocket in the same request (the response may or may not choose to initiate a WebSocket), and so all requests are considered to be HTTP.
