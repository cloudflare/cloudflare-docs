---
_build:
  publishResources: false
  render: never
  list: never

name: "Enforce WebSocket close reason byte limit"
sort_date: "2026-03-03"
enable_date: "2026-03-03"
enable_flag: "websocket_close_reason_byte_limit"
disable_flag: "no_websocket_close_reason_byte_limit"
---

When `websocket_close_reason_byte_limit` is enabled, `WebSocket.close()` throws a `SyntaxError` `DOMException` if the `reason` string exceeds 123 bytes when UTF-8 encoded, as required by the [WHATWG WebSocket spec](https://websockets.spec.whatwg.org/) and [RFC 6455 Section 5.5](https://www.rfc-editor.org/rfc/rfc6455#section-5.5).

Previously, Workers allowed arbitrarily long close reasons without validation.
