---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115003014432-HTTP-Status-Codes
title: HTTP Status Codes
---

# HTTP Status Codes



## Overview

The status codes below detail how Cloudflare interprets the Internet standards track protocol for HTTP response codes. Please refer to the current edition of the "Internet Official Protocol Standards" (STD 1) for the standardization state and status of this protocol.

Any HTTP status code that is cacheable by default will also be considered to be cacheable by Cloudflare unless otherwise indicated by the method definition or explicit cache controls. Cloudflare caches HTTP responses similarly to how any request is cached. Cloudflare considers page rules, edge TTL, and origin headers when deciding whether to cache.

___

The terms used when describing Cloudflare HTTP status codes are as follows:

### Server

Any party receiving a request and sending a response. Either the origin or intermediate servers.

### Origin/Host server

The final destination server. This server actually hosts the content of the website.

### Proxy server

The server(s) that sit between the origin server and the client. Cloudflare is a proxy server for example.

### Client

The party making the request. Typically an end user accessing the site on a browser, but may also be an API client or anyone requesting resources from the site.

### Backend

The connections not made to or from the client, but between the proxy server(s) and/or the origin server

### User-Agent

The machine used to send the request. Can be a browser or another program making requests (e.g. restful API requests)

### Payload

The response or request data discluding the headers. Also called response/request body.

___

## HTTP Status Codes

-   [1xx Informational](https://support.cloudflare.com/hc/en-us/articles/115003013892/)
-   [2xx Success](https://support.cloudflare.com/hc/en-us/articles/115003014192)
-   [3xx Redirect](https://support.cloudflare.com/hc/en-us/articles/115003011091/)
-   [4xx Client Error](https://support.cloudflare.com/hc/en-us/articles/115003014512/)
-   [5xx Server Error](https://support.cloudflare.com/hc/en-us/articles/115003011431/)

___

## Related Resources

-   [What Do I Tell Cloudflare What to Cache?](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-CloudFlare-What-to-Cache-)
-   [What does edge TTL mean?](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings)
