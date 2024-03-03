---
title: Transparent decompression
pcx-content-type: how-to
---

# Transparent decompression

Transparent decompression reduces the size of stored files stored in your buckets. With transparent decompression, compressed files are automatically decompressed, but you can still access and use the files or data in their original format.

## Accept-Encoding

The `Accept-Encoding` request HTTP header indicates support for compressed content. However, if the header is missing, the content will still be decompressed during the request. 

{{<Aside type="note">}}

The `Content-Encoding` header is optional. If an object does not contain the `Content-Encoding` header in the metadata, the object is returned as is. When the `Content-Encoding: gzip` header is set, a `gzip` compressed file is returned if the request from the client contains an `Accept-Encoding: gzip` header. 

{{</Aside>}}

The example below uses a Cloudflare Worker that returns a compressed response. 

```js
---
header: gzip compressed response
---
export default <ExportedHandler> {
  async fetch() {
    // Fetches a random uuid.
    const data = await fetch("https://httpbin.org/uuid")

    // Compresses the data.
    const compressed = data.body.pipeThrough(
      new CompressionStream('gzip')
    );

    // Returns the compressed response.
    return new Response(compressed, {
      headers: {
        'content-encoding': 'gzip'
      },
      // Specifies not to compress content. Content has already been compressed.
      encodeBody: "manual"
    })
  },
};
```

When a curl request is made, transparent decompression makes it possible to view the plain-text response.

```bash
curl http://localhost:8787
{
  "uuid": "58834aa8-c529-43c1-bc16-ae5b2b97daaa"
}
```

If you add the `Accept-Encoding` header to the request to indicate support for compressed content, you should also be able to see the plain text.

```bash
---
header: Request with Accept-Encoding header added
---
curl http://localhost:8787 --header 'accept-encoding: gzip' -o test.gz
file test.gz
test.gz: gzip compressed data, from Unix, original size modulo 2^32 53
```

```bash
---
header: Plain-text response
---
gunzip test.gz && cat test
{
  "uuid": "18b70f66-e84d-4070-8287-d114f4da1293"
}
```

## Transfer-Encoding

When the[`Transfer-Encoding`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding) header is used and the directive is set to `chunked`, the data is sent in a series of chunks and the `Content-Length` is omitted by default.

For version 1.1 of the HTTP protocol, the chunked transfer mechanism is always considered acceptable, even if it is not listed in the `Transfer-Encoding` request header field. The Workers platform always knows whether it has the body size in advance and will choose whether to use `Content-Length` vs. `Transfer-Encoding: chunked` header, which takes precedence over whatever was specified in the request.
