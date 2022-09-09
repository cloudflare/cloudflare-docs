---
pcx_content_type: reference
title: SXGs caveats
weight: 3
meta:
    title: Signed exchanges caveats
---

# Signed exchanges caveats

## Allowed request headers

Signed exchanges remove cookies and headers from HTTP requests, which can create problems with dynamic or personalized content. This is intentional since signed exchanges can be distributed to multiple browsers. Therefore, packaging any personalized or dynamic content into a signed exchange could be a security risk. The only request headers that are not removed are the following:

* `AMP-Cache-Transform`
* `Accept`
* `From`
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

## Response headers

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

Signed exchanges will not be created if the response headers contain a `cache-control` header whose value is either:

* `private`
* `no-store`
* `no-cache`
* `max-age=0 `

For example, `cache-control=private` would mean that a signed exchange is not created.

{{<Aside type="note">}}
The `cache-control` response header can have one of the following names:

* `cache-control`
* `cdn-cache-control`
* `cloudflare-cdn-cache-control`
* `surrogate-control`

For example, `cdn-cache-control=no-cache` would mean that a signed exchange is not created.
{{</Aside>}}