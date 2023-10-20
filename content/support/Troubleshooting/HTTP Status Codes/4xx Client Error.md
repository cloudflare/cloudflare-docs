---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115003014512-4xx-Client-Error
title: 4xx Client Error
---

# 4xx Client Error



## Overview

4xx codes generally are error responses specifying an issue at the client’s end, potentially a network issue.  

-   4xx codes can be used as a response to any request method.
-   Origin server should include an explanation which should be displayed by User-Agent, with the exception of a `HEAD` request
-   [Custom rules](/waf/custom-rules/) can return any response code in the range 400-499 in your HTML page, if the site owner has created a rule with _Block_ action and configured a custom response code. Refer to custom response](/waf/custom-rules/create-dashboard/#configuring-a-custom-response-for-blocked-requests) for more details.

The following are common 4xx codes and their definitions:

### **401 Unauthorized (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

The request was not sent with the proper authentication credentials

-   Server must send with at least one challenge in the form of a `WWW-Authenticate` header field according to [section 4.1](https://datatracker.ietf.org/doc/html/rfc7235#section-4.1)
-   Client may send a second request with the same credentials and then if the challenge is identical to the one before, an entity will be provided by the server to help the client find what credentials are needed.

### **402 Payment Required (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Not yet implemented by RFC standards but reserved for future use.

### **403 Forbidden (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

If you're seeing a 403 error without Cloudflare branding, this is always returned directly from the origin web server, not Cloudflare, and is generally related to permission rules on your server. The top reasons for this error are:

1. Permission rules you have set on the origin web server (in the Apache .htaccess for example)
2. Mod\_security rules
3. IP deny rules. You need to make sure that [Cloudflare's IP ranges](https://www.cloudflare.com/ips) aren't being blocked

Cloudflare will serve 403 responses if the request violated either a default WAF managed rule enabled for all orange-clouded Cloudflare domains or a WAF managed rule enabled for that particular zone. Read more at [WAF Managed Rules](/waf/managed-rules/).

If you're seeing a 403 response that contains Cloudflare branding in the response body, this is the HTTP response code returned along with many of our security features:

-   [WAF Custom or Managed Rules](/waf/) with the challenge or block action
-   [Security Level](/waf/tools/security-level/), that is set to Medium by default
-   Most [1xxx Cloudflare error codes](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-1xxx-errors/)
-   The [Browser Integrity Check](/waf/tools/browser-integrity-check/)

### **404 Not Found (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Origin server was unable or unwilling to find the resource requested. This usually means the host server could not find the resource. To serve a more permanent version of this error one should use a 410 error code.

These errors typically occur when someone mistypes a URL on your site when there is a broken link from another page, when a page that previously existed is moved or removed, or there is an error when a search engine indexes your site. For a typical site, these errors account for approximately 3% of the total page views, but they’re often untracked by traditional analytics platforms like Google Analytics.

Website owners usually implement a custom page to be served when this error is generated.

Cloudflare does not generate 404s for customer websites, we only proxy the request from the origin server. When seeing a 404 for your Cloudflare powered site you should contact your hosting provider for help.

### **405 Method Not Allowed (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Origin server is aware of the requested resource, but the request method used is not supported.

-   Origin server must also provide an `Allow` header with a list of supported targets for that resource.

An example would be a POST on an unchangeable resource the thus only accepts GET.

### **406 Not Acceptable (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Resource is not available at the origin that adheres to negotiation headers that were  set prior (e.g. via `Accept-Charset` and `Accept-Language` headers)

This status code can be replaced by simply serving the less preferred method to the User-Agent in lieu of generating this error.

### **407 Authentication Required  (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

The client did not send the required authentication with the request.

### **408 Request Timeout  (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

The origin server did not receive the complete request in what it considers a reasonable time.

-   Implied the server does not wish to wait and continue the connection.
-   Not used much because servers typically choose to use the “close” connection option.

### **409 Conflict (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

The request did not complete because of a conflict with the current state of the resource. Typically happens on a PUT request where multiple clients are attempting to edit the same resource.

-   The server _should_ generate a payload that includes enough information for the client to recognize the source of the conflict.
-   Clients can and should retry the request again

Cloudflare will generate and serve a 409 response for a [Error 1001: DNS Resolution Error](https://support.cloudflare.com/hc/articles/360029779472#error1001).

### **410 Gone (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

The resource requested is permanently missing at the origin.

-   The server is suggesting the links reference the resource should be removed.
-   The server is not qualified to use this status code over a 404 response nor required to have this response for any specific period of time.

### **411 Length Required (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Client did not define the `Content-Length` of the request body in the headers and this is required to obtain the resource.

-   Client may resend the request after adding the header field.

### **412 Precondition Failed  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

Server denies the request because the resource failed to meet the conditions specified by the client.

For an example of version control, a client is modifying an existing resource and thus sets the `If-Unmodified-Since` header to match the date that the client downloaded the resource and began edits. If the resource was edited (likely by another client) after this date and before the upload of the edits, this response will be generated since the date of the last edit will come after the date set in `If-Unmodified-Since` by the client.

Cloudflare will serve this response. For more information, refer to: [ETag Headers](/cache/reference/etag-headers/)

### **413 Payload Too Large  (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Refusal from the server to process the request because the payload sent from the client is larger than the server wished to accept. Server has the optional to close the connection.

-   If this refusal would only happen temporarily, then the server should send a `Retry-After`  header to specify when the client should try the request again.

### **414 URI Too Long (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Refusal from the server that the URI was too long to be processed. For example, if a client is attempting a GET request with an unusually long URI after a POST, this could be seen as a security risk and a 414 gets generated.

Cloudflare will generate this response for a URI longer than 32KB

### **415 Unsupported Media Type (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Refusal from the server to process the format of the current payload. One way to identify and fix this issue would be to look at the `Content-Type` or `Content-Encoding` headers sent in the client’s request.

### 416 Range Not Satisfiable ([RFC7233](https://datatracker.ietf.org/doc/html/rfc7233))

The 416 error response code indicates that a server cannot serve the requested ranges. For example:

`HTTP/1.1 416 Range Not Satisfiable`

`Content-Range: bytes */12777`

The most common reason is that the file doesn't include such ranges. Browsers usually either request the entire file again or abort the operation.

### **417 Expectation Failed (**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Failure of server to meet the requirements specified in the `Expect` header of the client’s request.

### **429 Too Many Requests (**[**RFC6585**](https://tools.ietf.org/html/rfc6585)**)**

Client has sent too many requests in the specified amount of time according to the server. Often known as "rate-limiting". Server may respond with information allowing the requester to retry after a specific period of time.

Cloudflare will generate and send this status code when a request is being [rate limited](https://www.cloudflare.com/rate-limiting/). If visitors to your site are receiving these error codes, you will be able to see this in the [Rate Limiting Analytics](/waf/reference/legacy/old-rate-limiting/#analytics).

### **451 Unavailable For Legal Reason (**[**RFC7725**](https://tools.ietf.org/html/rfc7725)**)**

Server is unable to deliver the resource due to legal actions.

Typically search engines (e.g. Google) and ISP (e.g. ATT) are the ones affected by this response code and not the origin server.

-   The response should include an explanation is the response body with details of the legal demand.

### **499 Client Close Request**

nginx specific response code to indicate when the connection has been closed by the client while the server is still processing its request, making server unable to send a status code back.

-   This will be shown in [Cloudflare Logs](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-REST-API) and status code analytics for Enterprise customers.

{{<Aside type="tip">}}
Since Cloudflare was built on nginx, we also have a 499 HTTP code in Cloudflare Logs
and analytics for connections which go away before we have finished
processing the request. It is expected behavior to see these at your
logs intermittently as clients close connections.
{{</Aside>}}

To provide more context, a TCP connection must be established between Cloudflare and the website's Origin server before any higher protocol (in this case is HTTP) started the "conversation". In order to establish a connection, TCP uses a three-way handshake :

* SYN: Cloudflare sends three SYN packets to the origin server.
* SYN+ACK: In response, the origin server replies with an SYN+ACK.
* ACK: Finally, Cloudflare sends an ACK back to the origin server.

At this point, both Cloudflare and the origin server have received an acknowledgment of the connection, and communication is established. However, if the origin server does not send an SYN+ACK back to Cloudflare **within 15 seconds, Cloudflare will retry one more time (another 15 seconds timeout)**.

So, depending on the timeout value on the client-side, there will be 3 different scenarios along with each own status code generated :

* If the client has a shorter timeout (less than 30s), they will give up the connection, and thus Cloudflare logs the 499 error.
* If the client has a higher timeout (more than 30s), once the TCP connection has been successfully established, the HTTP transaction will be continued as per normal. In this case, Cloudflare returns a normal status code (HTTP 200).
* If the client has a higher timeout and Cloudflare was unable to establish the TCP handshake with the Origin server, we will return HTTP 522.

