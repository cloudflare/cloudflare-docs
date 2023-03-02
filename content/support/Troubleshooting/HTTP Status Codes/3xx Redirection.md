---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115003011091-3xx-Redirection
title: 3xx Redirection
---

# 3xx Redirection



## Overview

3xx codes are a class of responses that suggest the User-Agent must follow another course of action to obtain the complete requested resource.

Redirect Location should be set in either:

1.  `Location` header field in the response, useful for automatic redirecting
2.  The payload of the response with a hyperlink (optional) to correction location

**300 Multiple Choices** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Multiple options for the resource that the client may follow. For instance, it could be used to present different format options for video, list files with different [extensions](https://en.wikipedia.org/wiki/File_extensions), or [word sense disambiguation](https://en.wikipedia.org/wiki/Word_sense_disambiguation).

**301 Moved Permanently** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Permanent URL redirect for the resource requested. The target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.

Cloudflare is able to generate these responses, thus avoiding the need to send a request to the origin server’s response through the use of Page rules. Read more How Cloudflare can help generate redirects at [Page Rules URL Forwarding](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

**302 Found (aka Temporary Redirect)  (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Similar to a 301 redirect, but is intended for temporary purposes only. User-Agent may automatically follow the `Location` header, but should not replace the current URI  with it as a 301.

Cloudflare is able to generate these responses, thus avoiding the need to send a request to the origin server’s response through the use of Page rules. Read more How Cloudflare can help generate redirects at [Page Rules URL Forwarding](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

**303 See Other (since HTTP/1.1)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

User-Agent should follow this redirect with a GET request. _Note: differs from 301 in that the  resource at the redirect is not necessarily equivalent to what was requested_

-   Intended to be used in response to a `POST/DELETE` request to signal the origin server received data correctly and to allow appropriate cache behaviour.
-   The original 303 response is not cacheable, but the response to the 2nd request (`GET`) may be since it’s under a different URI.

**304 Not Modified  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

Signal to the client that the requested resource is available and valid in the cache. The origin server has not modified the resource that the request inquired about. Client can receive the payload for the specified resource without connecting to the origin server again thus it is redirecting the request to use the stored resource.  Requirements on a cache that receives a 304 response are defined in  [Section 4.3.4 of \[RFC7234\]](https://tools.ietf.org/html/rfc7234#section-4.3.4).

Prior to this response, the client sent a conditional GET or HEAD request specifying what resource it currently has stored. Server is giving the client the “OK” to use this resource as the most updated version in order to reduce the amount of data transmission between client and server.

-   Must not have message body

-   Must contain any of the headers that would have been set prior to the mirrored 200 response: `Cache-Control, Content-Location, Date,  ETag, Expires,` or `Vary.`

When a request is made to Cloudflare that is stale so must be revalidated at the origin, Cloudflare will send a 304 response to confirm the version in our cache matched the version at origin. The response will include the `CF-Cache-Status: REVALIDATED` header. and Cloudflare confirms the version using the `If-Modified-Since` header. For more information, refer to [ETag Headers](https://support.cloudflare.com/hc/en-us/articles/218505467).

**305 Use Proxy (deprecated)  (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Request must be fulfilled through proxy URI specified in Location header instead of through the origin. This status code has been deprecated due to security risks.

**306 Switch Proxy (deprecated) (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Notification that following requests must come must be directed to the proxy specified.

**307 Temporary Redirect (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

A redirect similar to a 302 response except that the request method (e.g. GET, POST..) must not differ from what was used in the original request if automatically following the redirect.

-   User-Agent may automatically follow the `Location` header, but should not replace the original URI  

**308 Permanent Redirect (**[**RFC 7538**](https://tools.ietf.org/html/rfc7538#section-3)**)**

Permanent redirect similar to a 301 except the request method (e.g. GET, POST..) must not differ from what was used in the original request if automatically following the redirect.

-   User-Agent should automatically follow the `Location` header
-   User-Agent should replace the original URI  with the updated one in the Location or payload
