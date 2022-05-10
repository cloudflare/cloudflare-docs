---
title: Request Header Modification Rules
pcx-content-type: concept
weight: 3
meta:
  title: HTTP Request Header Modification Rules
---

# HTTP Request Header Modification Rules

You can manipulate the headers of incoming HTTP requests through HTTP Request Header Modification Rules. Through these rules you can:

*   Set the value of an HTTP request header to a literal string value, overwriting its previous value or adding a new header to the request.
*   Set the value of an HTTP request header according to an expression, overwriting its previous value or adding a new header to the request.
*   Remove an HTTP header from the request.

You can create an HTTP Request Header Modification Rule [in the dashboard](/rules/transform/request-header-modification/create-dashboard/) or [via API](/rules/transform/request-header-modification/create-api/).

To modify HTTP headers in the **response**, refer to [HTTP Response Header Modification Rules](/rules/transform/response-header-modification/).

## Important remarks

*   You cannot modify or remove HTTP request headers whose name starts with `x-cf-` or `cf-` except for the `cf-connecting-ip` HTTP request header, which you can remove.

*   You cannot modify the value of any header commonly used to identify the website visitor's IP address, such as `x-forwarded-for`, `true-client-ip`, or `x-real-ip`.

*   If you modify the value of an existing HTTP request header using an expression that evaluates to an empty string (`""`) or an undefined value, the HTTP request header is **removed**.

*   The HTTP request header removal operation will remove all request headers with the provided name.

*   Currently, there is a limited number of HTTP request headers that you cannot modify. Cloudflare may remove restrictions for some of these HTTP request headers when presented with valid use cases. [Create a post in the community](https://community.cloudflare.com) for consideration.
