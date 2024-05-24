---
title: Modify request header
pcx_content_type: concept
weight: 2
meta:
  title: HTTP request header modification rules
---

# HTTP request header modification rules

Use HTTP request header modification rules to manipulate the headers of HTTP requests sent to your origin server.

```mermaid
flowchart LR
accTitle: Header modifications diagram
accDescr: Header modification rules can change the headers sent to your origin server (request header modifications) or sent your your website visitors (response header modifications).

A[Visitor]
B((Cloudflare))
C[(Origin server)]

A -.-> B == "Includes request<br> header modifications" ==> C
C -.-> B -. "Includes response<br> header modifications" .-> A

style A stroke-width: 2px
style B stroke: orange,fill: orange,color: black
linkStyle 0,2,3 stroke-width: 1px
linkStyle 1 stroke-width: 3px
```
<br>

To modify HTTP headers in the **response** sent to website visitors, refer to [HTTP response header modification rules](/rules/transform/response-header-modification/).

Through HTTP request header modification rules you can:

*   Set the value of an HTTP request header to a literal string value, overwriting its previous value or adding a new header to the request.
*   Set the value of an HTTP request header according to an expression, overwriting its previous value or adding a new header to the request.
*   Remove an HTTP header from the request.

You can create an HTTP request header modification rule [in the dashboard](/rules/transform/request-header-modification/create-dashboard/) or [via API](/rules/transform/request-header-modification/create-api/).

## Important remarks

*   You cannot modify or remove HTTP request headers whose name starts with `x-cf-` or `cf-` except for the `cf-connecting-ip` HTTP request header, which you can remove.

*   You cannot modify the value of any header commonly used to identify the website visitor's IP address, such as `x-forwarded-for`, `true-client-ip`, or `x-real-ip`. Additionally, you cannot remove the `x-forwarded-for` header.

*   You cannot set or modify the value of `cookie` HTTP request headers, but you can remove these headers. Configuring a rule that removes the `cookie` HTTP request header will remove all `cookie` headers in matching requests.

*   If you modify the value of an existing HTTP request header using an expression that evaluates to an empty string (`""`) or an undefined value, the HTTP request header is **removed**.

*   The HTTP request header removal operation will remove all request headers with the provided name.

*   Currently, there is a limited number of HTTP request headers that you cannot modify. Cloudflare may remove restrictions for some of these HTTP request headers when presented with valid use cases. [Create a post in the community](https://community.cloudflare.com) for consideration.

*   To use [claims inside a JSON Web Token (JWT)](/api-shield/security/jwt-validation/transform-rules/), you must first set up a token validation configuration in API Shield.

{{<render file="_troubleshoot-rules-with-trace.md" withParameters="HTTP request header modification rules">}}