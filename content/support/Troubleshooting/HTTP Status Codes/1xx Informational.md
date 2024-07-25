---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115003013892-1xx-Informational
title: 1xx Informational
---

# 1xx Informational



## Overview

1xx codes are often interim responses for sharing connection status information. Not intended for final request or response action. Requirements from the server:

-   Responses all terminated by the first empty line after status line

-   Not used for HTTP 1.0. Origin server should never send 1xx response to HTTP 1.0 client

Cloudflare will forward all of these responses and never generates this response.

**100 Continue (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Confirmation of the initial request to send a response body. The origin server is willing to accept the request (based on the request headers). This is returned before the client typically sends the response body. This prevents clients from sending unnecessary or unusable data. Required from server: If the client sends `Expect: 100-continue` header, the server must respond immediately with either `100 Continue` and continue to read from the input stream or send another response code. Cloudflare uses Keep-Alive connections so this response should not be necessary

**101 Switching Protocols (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Origin server accepts the client’s request to switch protocols. Client request either contained `Upgrade` in a header field or there was a change in the application protocol being used on this connection. If using Upgrade header field, the server has agreed to upgrade to a protocol that is higher on the client’s priority list than the current protocol being used. Origin server must also respond with a `Upgrade` header field to indicate the new protocol(s) to which the connection is being switched It is assumed that this switch will be advantageous to both the client and the server. Most common use case is with websockets. For information about Cloudflare’s Websockets, refer to [Cloudflare Now Supports Websockets](https://blog.cloudflare.com/cloudflare-now-supports-websockets/).

**102 Processing (**[**RFC2518**](https://tools.ietf.org/html/rfc2518)**)**

Server has received the client’s completed response, but is expecting to take more time to process ( e.g. > 20 seconds). The server must send a final response after the request has been completed. Used for only HTTP 1.1 and higher.

If Cloudflare does not receive a response in 100 seconds or less after a 102, an [Error 522: Connection Timed Out](https://support.cloudflare.com/hc/articles/115003011431#522error) will be generated. 102 responses can be used to prevent [Error 524: A timeout error](https://support.cloudflare.com/hc/articles/115003011431#524error).
