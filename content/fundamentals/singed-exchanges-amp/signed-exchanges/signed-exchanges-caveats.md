---
pcx_content_type: reference
title: SXGs caveats
weight: 1
meta:
    title: Signed Exchanges caveats
---

# Signed Exchanges caveats

Signed Exchanges strip out cookies and headers from HTTP requests, and can create problems with dynamic or personalized content. This is intentional since Signed Exchanges can be distributed to multiple browsers. Therefore, packaging any personalized or dynamic content into a Signed Exchange could be a security risk. The only request headers that are not stripped out are as follows:

* `User-Agent`
* `Accept`
* `Via`
* `CF-Connecting-IP`
* `True-Client-IP`
* `X-Forwarded-For`
* `CF-RAY`
* `CF-IPCountry`
* `CF-Visitor`
* `CF-Loop`
* `CF-Worker`
* `CF-Threat-Score`
* `X-Bot-Score`
* `X-Static-Bot`
* `X-Threat-Score`
* `X-Tlsclientauth`
* `X-Verified-Bot`

Since Cloudflare cannot be sure whether a signed exchange includes private information or not, a signed exchange will not be generated in the presence of the following [response headers](https://wicg.github.io/webpackage/draft-yasskin-httpbis-origin-signed-exchanges-impl.html#name-stateful-header-fields):

* `Authentication-Control`
* `Authentication-Info`
* `Clear-Site-Data`
* `Optional-WWW-Authenticate`
* `Proxy-Authenticate`
* `Proxy-Authentication-Info`
* `Public-Key-Pins`
* `Sec-WebSocket-Accept`
* `Set-Cookie`
* `Set-Cookie2`
* `SetProfile`
* `Strict-Transport-Security`
* `WWW-Authenticate`

Signed Exchanges will not be created if the response headers contain a `cache-control` header whose value is either:

* `private`
* `no-store`
* `no-cache`
* `max-age=0 `

For example, `cache-control=private` would mean that a signed exchange is not created.

{{<Aside type="note">}}
The possible key for the `cache-control` header could be either: 

* `cache-control`
* `cdn-cache-control`
* `cloudflare-cdn-cache-control`
* `surrogate-control`

For example, `cdn-cache-control=no-cache` would mean that a signed exchange is not created.
{{</Aside>}}