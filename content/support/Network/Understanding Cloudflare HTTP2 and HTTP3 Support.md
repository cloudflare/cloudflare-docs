---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168076-Understanding-Cloudflare-HTTP-2-and-HTTP-3-Support
title: Understanding Cloudflare HTTP2 and HTTP3 Support
---

# Understanding Cloudflare HTTP/2 and HTTP/3 Support

HTTP/2 and HTTP/3 accelerate page load. They are both free for all [Cloudflare plans](https://www.cloudflare.com/plans) but require an [SSL certificate at Cloudflare’s edge network](/ssl/get-started/). Configure HTTP/2 and HTTP/3 via the Cloudflare **Speed** > **Optimization** > **Protocol Optimization**. HTTP/2 is enabled by default and domains on Free plans cannot disable it.

A browser and web server automatically negotiate the highest protocol available. Thus, when both HTTP/3 and HTTP/2 are enabled, HTTP/3 takes precedence. 

To determine the protocol used for your connection, enter `example.com/cdn-cgi/trace` from a web browser or client and replace `example.com` with your domain name. Several lines of data are returned. If `http=http/2` appears in the results, the connection occurred over HTTP/2. Other possible values are `http=http/3` for HTTP/3, and `http=http/1.x` for HTTP/1.x.

___

## HTTP/2

HTTP/2 uses the TCP transport protocol and TLS to secure communications. It improves page load times via:

-   Request and response multiplexing - A single network connection can be used to fetch multiple resources. Responses are prioritized to ensure important assets are sent first, which impreoves page rendering times.
-   HTTP header compression - can reduce the number of bytes required to exchange headers, which speeds up requests and responses.

Note:

-   How browsers choose which requests to multiplexing in a single connection is a complex topic. Typically a connection applies to a single domain. However, HTTP/2 supports [connection coalescing](https://www.rfc-editor.org/rfc/rfc9113.html#name-connection-reuse), where clients can carry out additional checks and if they pass, requests for different domains can also be multiplexed.

___

## HTTP/3

HTTP/3 uses QUIC, which is a secure-by-default transport protocol. HTTP/3 improves page load times in a similar way to HTTP/2. However, the QUIC transport protocol solves TCP's head-of-line blocking problem, meaning that performance over lossy networks can be better. Enable HTTP/3 via the Cloudflare **Speed** > **Optimization** > **Protocol Optimization**.

For more information, refer to the [Cloudflare Learning Center](https://www.cloudflare.com/learning/performance/what-is-http3/).

___

## Server Push

The Server Push feature allows origin web servers to send resources to the client or web browser without waiting to for the client to discover they are needed. In practice, this protocol feature was hard to leverage and could sometimes make page load times worse. [Early Hints](/cache/advanced-configuration/early-hints/) has emerged as a replacement solution that avoids some of the pitfalls of Server Push.

Server Push is available for all Cloudflare plans but only over HTTP/2. Cloudflare does not support Server Push for HTTP/3.

Server Push extracts URI references within the rel=preload parameter of the **Link** header from your origin server. The linked URIs are used to fetch a resource that is then pushed to the client.  Example **Link** headers include:

`Link: </images/image.png>; rel=preload;`

`Link: </css/main.css>; rel=preload;`

Server Push is limited to 50 assets per page and 100 per connection.

___

## Related resources

-   [HTTP/3: the past, the present, and the future](https://blog.cloudflare.com/http3-the-past-present-and-future/)
-   [The QUICening](https://blog.cloudflare.com/the-quicening/)
-   [Enjoy a slice of QUIC, and Rust!](https://blog.cloudflare.com/enjoy-a-slice-of-quic-and-rust/)

Browser support information: 

-   [HTTP/2](https://caniuse.com/#feat=http2) 
-   [HTTP/3](https://caniuse.com/#feat=http3)
