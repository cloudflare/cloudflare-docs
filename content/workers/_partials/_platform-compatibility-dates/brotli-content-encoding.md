---
_build:
  publishResources: false
  render: never
  list: never

name: "Brotli content encoding support"
sort_date: "2022-11-30"
experimental: true
enable_flag: "brotli_content_encoding"
disable_flag: 
---

When the `brotli_content_encoding` compatibility flag is enabled, the Workers runtime can decompress response bodies encoded using the ([Brotli](https://developer.mozilla.org/en-US/docs/Glossary/Brotli_compression)) compression algorithm.

Previously, if you specified `br` in the `Accept-Encoding` header of a subrequest from a Worker, in most cases, the subrequest would respect this header, and the response body would be encoded as Brotli. However, the Workers runtime was unable to decompress brotli — making it impossible to read the response within a Worker. For example:

```typescript
export default {
  async fetch(request, env) { 
    const headers = new Headers({
      'Accept-Encoding': "br, gzip"
    });
    const response = await fetch("https://developers.cloudflare.com", {method: "GET", headers});
    console.log(await response.text()) // this previously returned compressed bytes
    // ...
  }
}
```
