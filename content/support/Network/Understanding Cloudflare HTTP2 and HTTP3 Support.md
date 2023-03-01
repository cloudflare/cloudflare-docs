---
source: https://support.cloudflare.com/hc/en-us/articles/200168076-Understanding-Cloudflare-HTTP-2-and-HTTP-3-Support
title: Understanding Cloudflare HTTP2 and HTTP3 Support
                  10 months ago
---

# Understanding Cloudflare HTTP/2 and HTTP/3 Support



## Overview

HTTP/2 and HTTP/3 accelerate page load and are free for all [Cloudflare plans](http://www.cloudflare.com/plans).  HTTP/2 is enabled by default and requires an [SSL certificate at Cloudflare’s edge network](https://support.cloudflare.com/hc/articles/203295200#h_036e2e20-96d8-4199-bb1f-0fbb41b5cdd0). Configure HTTP/2 and HTTP/3 via the Cloudflare **Network** app. Domains on Free plans cannot disable HTTP/2.

A browser and web server automatically negotiate the highest protocol available. Thus, HTTP/3 takes precedence over HTTP/2. 

To determine the protocol used for your connection, enter _example.com_/cdn-cgi/trace from a web browser or client and replace _example.com_ with your domain name. Several lines of data are returned. If _http=h2_ appears in the results, the connection occurred over HTTP/2. Other possible values are _http=http2+quic/99_ for HTTP/3, and _http=http/1.x_ for HTTP/1.x.

___

HTTP/2 improves page load times via:

-   Connection multiplexing - Retrieves multiple resources in a single network request. Responses are sent when resources are available to avoid slowing page rendering.
-   HTTP header compression - Compresses headers and simplifies HTTP requests to avoid resending headers.
-   HTTP/2 Server Push - To improve page load speed, Cloudflare provides additional resources for a client to cache without waiting for additional requests.

Note:

-   Not all browsers support HTTP/2 and use HTTP 1.x instead.
-   Connection multiplexing is on a per-domain basis.

___

## HTTP/3

HTTP/3 enables fast, reliable, and secure connections.  HTTP/3 encrypts Internet transport by default using a protocol from Google called QUIC.   Enable HTTP/3 via the Cloudflare **Network** app. 

For more information, review our [HTTP/3 developer documentation](https://developers.cloudflare.com/http3/).

___

## Server Push

The Server Push feature allows origin web servers to send resources to the client or web browser without waiting to parse HTML for references to additional assets like images, stylesheets, JavaScript, etc.  Server Push avoids the usual HTTP request and response cycle for every script or stylesheet on a page. Server Push is available for all Cloudflare plans.

Server Push extracts URI references within the rel=preload parameter of the **Link** header from your origin server. These additional URIs are then provided to the client.  Example **Link** headers include:

`Link: </images/image.png>; rel=preload;`

`Link: </css/main.css>; rel=preload;`

Server Push is limited to 50 assets per page and 100 per connection.

___

## Related resources

-   [HTTP/3: the past, the present, and the future](https://blog.cloudflare.com/http3-the-past-present-and-future/)
-   [The QUICening](https://blog.cloudflare.com/the-quicening/)
-   [Enjoy a slice of QUIC, and Rust!](https://blog.cloudflare.com/enjoy-a-slice-of-quic-and-rust/)

Browser support information: 

-   [HTTP/2](http://caniuse.com/#feat=http2) 
-   [HTTP/3](https://caniuse.com/#feat=http3)
