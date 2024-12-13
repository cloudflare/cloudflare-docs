---
_build:
  publishResources: false
  render: never
  list: never

name: "Allow specifying a custom port when making a subrequest with the fetch() API"
sort_date: "2024-09-02"
enable_date: "2024-09-02"
enable_flag: "allow_custom_ports"
disable_flag: "ignore_custom_ports"
---

When this flag is enabled, and you specify a port when making a subrequest with the [`fetch()` API](/workers/runtime-apis/fetch/), the port number you specify will be used.

When you make a subrequest to a website that uses Cloudflare ("Orange Clouded") — only [ports supported by Cloudflare's reverse proxy](/fundamentals/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy) can be specified. If you attempt to specify an unsupported port, it will be ignored.

When you make a subrequest to a website that doesn't use Cloudflare ("Grey Clouded") - any port can be specified.

For example:

```js
const response = await fetch("https://example.com:8000");
```
With allow_custom_ports the above example would fetch `https://example.com:8000` rather than
`https://example.com:443`.

Note that creating a WebSocket client with a call to `new WebSocket(url)` will also obey this flag.
