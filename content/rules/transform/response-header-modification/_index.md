---
title: Response Header Modification Rules
pcx-content-type: concept
weight: 4
meta:
  title: HTTP Response Header Modification Rules
---

# HTTP Response Header Modification Rules

You can manipulate the headers included in the HTTP response through HTTP Response Header Modification Rules. Through these rules you can:

*   Set the value of an HTTP response header to a literal string value, overwriting its previous value or adding a new header to the response.
*   Set the value of an HTTP response header according to an expression, overwriting its previous value or adding a new header to the response.
*   Remove an HTTP header from the response.

You can create an HTTP Response Header Modification Rule [in the dashboard](/rules/transform/response-header-modification/create-dashboard/) or [via API](/rules/transform/response-header-modification/create-api/).

To modify HTTP headers in the **request**, refer to [HTTP Request Header Modification Rules](/rules/transform/request-header-modification/).

## Important remarks

*   The response header values are calculated using the field values from the corresponding HTTP request. For example, the value of `ip.src.country` will be the country of the website visitor, not the origin where the response was sent from.

*   You cannot modify or remove HTTP response headers whose name starts with `cf-` or `x-cf-`.

*   You cannot modify the value of certain headers such as `server`, `eh-cache-tag`, or `eh-cdn-cache-control`.

*   The HTTP response header removal operation will remove all response headers with the provided name.

*   If you modify the value of an existing HTTP response header using an expression that evaluates to an empty string (`""`) or an undefined value, the HTTP response header is **removed**.

*   Currently, there is a limited number of HTTP response headers that you cannot modify. Cloudflare may remove restrictions for some of these HTTP response headers when presented with valid use cases. [Create a post in the community](https://community.cloudflare.com) for consideration.
