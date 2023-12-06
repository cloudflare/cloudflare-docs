---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168386-Why-is-my-dynamic-content-being-sent-with-chunked-encoding-
title: Chunked encoding and dynamic content
---

# Chunked encoding and dynamic content

When something is sent with chunked encoding, Cloudflare will not send along a `Content-Length` header because it will be ignored by default ([RFC 2616, Section 4.4](https://www.rfc-editor.org/rfc/rfc2616#section-4.4)).

Cloudflare applies chunked encoding and gzipping to all dynamic HTML, which applies to any [file extension that is not cached by Cloudflare](/cache/concepts/default-cache-behavior/).

{{<Aside type="note">}}

Another reason you would not see a `Content-Length` header would be if you are sending HTTP 1.1 from your web server. For version 1.1 of the HTTP protocol, the chunked transfer mechanism is considered to be always acceptable, even if not listed in the TE request header field, and when used with other transfer mechanisms, should always be applied last to the transferred data and never more than one time. So in this case you will need to make sure you are sending HTTP 1.0 as the protocol from your web server if you specifically need the `Content-Length` header.

{{</Aside>}}

___

## Solution

If you need the `Content-Length` header, you could take one of the following approaches:

- Add a file extension to the resource so that it matches our list of supported file extensions (as long as you are also using `HTTP 1.0` as the protocol).
- Create a [Page Rule](/rules/page-rules/) to **Cache Everything**, which even caches content that does not use a [default file extension](/cache/concepts/default-cache-behavior/).
