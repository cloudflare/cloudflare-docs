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

1\. Permission rules you have set or an error in the .htaccess rules you have set 2. Mod\_security rules. 3. IP Deny rules Since Cloudflare can not access your server directly, please contact your hosting provider for assistance with resolving 403 errors and fixing rules. You should make sure that [Cloudflare's IPs](https://www.cloudflare.com/ips) aren't being blocked. 

Cloudflare will serve 403 responses if the request violated either a default WAF managed rule enabled for all orange-clouded Cloudflare domains or a WAF managed rule enabled for that particular zone. Read more at [Understanding WAF managed rules (Web Application Firewall)](https://support.cloudflare.com/hc/en-us/articles/200172016). Cloudflare will also serve a 403 Forbidden response for SSL connections to sub/domains that aren't covered by any Cloudflare or uploaded SSL certificate.

If you're seeing a 403 response that contains Cloudflare branding in the response body, this is the HTTP response code returned along with many of our security features:

-   WAF managed rules/firewall rules challenge and block pages
-   Basic Protection level challenges
-   Most 1xxx Cloudflare error codes
-   The Browser Integrity Check
-   If you're attempting to access a second level of subdomains (eg-`*.*.example.com`) through Cloudflare using the Cloudflare-issued certificate, a HTTP 403 error will be seen in the browser as these host names are not present on the certificate.

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

Cloudflare will serve this response. For more information, refer to: [ETag Headers](https://support.cloudflare.com/hc/en-us/articles/218505467)

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

Cloudflare will generate and send this status code when a request is being [rate limited](https://www.cloudflare.com/rate-limiting/). If visitors to your site are receiving these error codes, you will be able to see this in the [Rate Limiting Analytics](https://support.cloudflare.com/hc/articles/115001635128#7Cy9dajZBWM5pm9aIP5mMD).

### **451 Unavailable For Legal Reason (**[**RFC7725**](https://tools.ietf.org/html/rfc7725)**)**

Server is unable to deliver the resource due to legal actions.

Typically search engines (e.g. Google) and ISP (e.g. ATT) are the ones affected by this response code and not the origin server.

-   The response should include an explanation is the response body with details of the legal demand.

### **499 Client Close Request**

Nginx specific response code to indicate when the connection has been closed by the client while the server is still processing its request, making server unable to send a status code back.

-   This will be shown in [Cloudflare Logs](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-REST-API) and status code analytics for Enterprise customers.

{{<Aside type="tip">}}
Since Cloudflare was built on NGINX, we also have a 499 HTTP code in ELS
and analytics for connections which go away before we have finished
processing the request. It is expected behavior to see these at your
logs intermittently as clients close connections.
{{</Aside>}}
