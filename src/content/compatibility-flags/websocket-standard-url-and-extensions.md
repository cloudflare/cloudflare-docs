---
_build:
  publishResources: false
  render: never
  list: never

name: "`WebSocket` follows the spec for its URL and `extensions`"
sort_date: "2026-11-17"
enable_flag: "websocket_standard_url_and_extensions"
disable_flag: "websocket_legacy_url_and_extensions"
---

This flag makes [the `WebSocket` API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) follow the [WebSockets standard](https://websockets.spec.whatwg.org/#the-websocket-interface) in three places:

- `new WebSocket(url)` accepts `http:` and `https:` URLs and connects to them as `ws:` and `wss:`. It used to throw a `SyntaxError` for any scheme other than `ws:` or `wss:`.
- `url` returns the URL as parsed by the [URL standard](https://url.spec.whatwg.org/), so `new WebSocket("https://EXAMPLE.com")` has the `url` `"wss://example.com/"`. It used to return the string passed to the constructor. The URL the connection requests is built from that parsed form, so its path is normalized the same way.
- Once the connection is open, `protocol` and `extensions` are the empty string when the server selected no subprotocol or extension. They used to be `null`.

Workers have no base URL, so a relative URL still throws a `SyntaxError`.
