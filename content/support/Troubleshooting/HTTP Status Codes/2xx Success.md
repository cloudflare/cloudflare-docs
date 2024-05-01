---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115003014192-2xx-Success
title: 2xx Success
---

# 2xx Success



## Overview

**2xx** codes indicate success — meaning that a client's action was received, understood, and accepted.

___

## 200 - OK

A **200** response means the request has succeeded.

The response payload will vary based on the request method:

-   **GET**: Headers and data corresponding to the requested resource
-   **HEAD**: Only headers corresponding the requested resource
-   **POST**: Status of or results obtained from the action

A 200 response **should** always have a payload, but is not required. Occasionally, an origin server may generate a 200 with a zero length. To adhere to RFC standards, the server should generate a 204 code (exception CONNECT).

200 responses are cacheable by default for proxy servers and browsers. If not specified by Cloudflare [cache controls](https://support.cloudflare.com/hc/en-us/articles/202775670), [static resources](/cache/concepts/default-cache-behavior/) with this response will cache default for 2 hours at our edge.  

___

## 201 - Created

A **201** response means that the request was successful and one or more new resources were created.

Typically, you will find the new resource's location in the server's response (either the **Location** header or the request's URI).

Refer to [RFC 7231](https://tools.ietf.org/html/rfc7231#section-7.2) for a discussion on validator header fields in a 201 response, such as **ETag** and **Last-Modified.**

___

## 203 - Non-authoritative information

A **203** response means that the request was successful but the response did not come directly from the origin server. The response was instead delivered by a proxy or intermediate server.

Servers use this response to tell a client that this resource has been cached at a proxy.

Cloudflare does not cache 203 responses. For details about Cloudflare handles 203 responses, refer to [HTTP request headers](/fundamentals/reference/http-request-headers/).

___

## 204 - No content

A **204** response means that the request was successful but there is no content to return.

Commonly, servers provide this response when a document editor "saves" an action to the origin server. It lets the client know the save was successful.

204 responses never contain payloads and Cloudflare does not cache these responses.

___

## 205 - Reset content

A **205** response tells the client to return to its previous state after a request. This response occurs after someone submits a form or other data and lets the client know to refresh the page or allow another submission.

205 responses should never return a payload.

___

## 206 - Partial content

A **206** response means that the request was partially successful. Use this response to decrease latency when clients are processing larger files that might require split or interrupted downloads.

This request should also return either:

-   A partial payload that includes the **Content-Range** header that indicates the range and the data present in that range
-   A multipart payload that **does not** include the **Content-Range** header on the top-level HTTP response, but includes **Content-Type** and **Content-Range** headers on each individual part

For more details, refer to [RFC 7233 Section 4.1](https://tools.ietf.org/html/rfc7233#page-10).
