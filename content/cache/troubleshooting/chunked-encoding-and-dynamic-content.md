---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168386-Why-is-my-dynamic-content-being-sent-with-chunked-encoding-
title: Chunked encoding and dynamic content
---

# Chunked encoding and dynamic content

When something is sent with chunked encoding, Cloudflare will not send along a `Content-Length` header because it will be ignored by default ([RFC 2616, Section 4.4](https://www.rfc-editor.org/rfc/rfc2616#section-4.4)).

Cloudflare applies chunked encoding and gzipping to all dynamic HTML, which applies to any [file extension that is not cached by Cloudflare](/cache/concepts/default-cache-behavior/).

___

## Solution

If you need the `Content-Length` header, you could take one of the following approaches:

- Add a file extension to the resource so that it matches our list of supported file extensions (as long as you are also using `HTTP 1.0` as the protocol).
- Create a [Page Rule](/rules/page-rules/) to **Cache Everything**, which even caches content that does not use a [default file extension](/cache/concepts/default-cache-behavior/).
