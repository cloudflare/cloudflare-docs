---
title: Cache keys
pcx-content-type: concept
meta:
  title: Cache Keys
---

# Cache Keys

A Cache Key is an identifier that Cloudflare uses for a file in our cache, and the Cache Key Template defines the identifier for a given HTTP request. For example, consider the following HTTP request on a TLS connection:

    GET /logo.jpg HTTP/1.1
    Host: www.cloudflare.com
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36
    Accept: image/jpg

The default Cache Key constructed from this request combines aspects such as Cloudflare Zone ID, scheme, hostname, and path into a Cache Key similar to  `1234:https://www.example.com/foo.jpg`. Zone ID and Path are always included in the Cache Key and cannot be modified.

{{<Aside type="warning" header="Warning">}}

Using Custom Cache Keys may result in cache sharding and reduction of your cache hit ratio.

{{</Aside>}}

To create a Cache Key, see [Create a Custom Cache Key](/cache/how-to/create-cache-keys/).

## Cache Key Template

There are a couple of common reasons to change the Cache Key Template. You might change the Cache Key Template to:

*   Fragment the cache so one URL is stored in multiple files. For example, to store different files based on a specific query string in the URL.
*   Consolidate the cache so different HTTP requests are stored in the same file. For example, to remove the Origin header added to Cloudflare Cache Keys by default.

{{<Aside type="note" header="Note">}}

`$scheme` is the protocol (HTTP or HTTPS) sent to your origin web server and not the protocol received from the visitor. Therefore, setting the Cloudflare [SSL option](https://support.cloudflare.com/hc/articles/200170416) influences caching decisions. For instance, Cloudflare only attempts to connect to your origin web server via HTTP when [Flexible SSL](/ssl/origin-configuration/ssl-modes#flexible) is utilized. Thus, Cloudflare serves the same cached resource for visitor requests via either HTTP or HTTPS since Flexible SSL instructs Cloudflare to connect to an origin solely over HTTP.

{{</Aside>}}

For cross-origin requests, such as one from `anotherdomain.com` to `example.com`, the Origin HTTP request header results in a Cache Key with the `${header:origin}` token populated as `anotherdomain.com::https://www.example.com/something`.

A [Cache Level](/cache/how-to/set-caching-levels/) of Ignore Query String creates the following Cache Key:
`${header:origin}::${scheme}://${host_header}${uri_iqs}`

`${uri_iqs}` is replaced with the request path excluding the query string, so a request for `http://example.com/file.jpg?something=123` creates the following Cache Key:
`::http://example.com/file.jpg`

## Cache Key Settings

The following fields control the Cache Key Template.

### Query String

The query string controls which URL query string parameters go into the Cache Key. You can `include` specific query string parameters or `exclude` them using the respective fields. When you include a query string parameter, the `value` of the query string parameter is used in the Cache Key.

#### Example

If you include the query string foo in a URL like `https://www.example.com/?foo=bar`, then bar appears in the Cache Key. Exactly one of `include` or `exclude` is expected.

#### Usage notes

*   To include all query string parameters (the default behavior), use include: "\*"
*   To ignore query strings, use exclude: "\*"
*   To include most query string parameters but exclude a few, use the exclude field which assumes  the other query string parameters are included.

### Headers

Headers control which headers go into the Cache Key. Similar to Query String, you can include specific headers or exclude default headers.

When you include a header, the header value is included in the Cache Key. For example, if an HTTP request contains an HTTP header like `X-Auth-API-key: 12345`, and you include the `X-Auth-API-Key header` in your Cache Key Template, then `12345` appears in the Cache Key.

To check for the presence of a header without including its actual value, use the `check_presence` option.

Currently, you can only exclude the `Origin` header. The `Origin` header is always included unless explicitly excluded. Including the [Origin header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) in the Cache Key is important to enforce [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS). Additionally, you cannot include the following headers:

*   Headers that have high cardinality and risk sharding the cache
    *   `accept`
    *   `accept-charset`
    *   `accept-encoding`
    *   `accept-datetime`
    *   `accept-language`
    *   `referer`
    *   `user-agent`
*   Headers that re-implement cache or proxy features
    *   `connection`
    *   `content-length`
    *   `cache-control`
    *   `if-match`
    *   `if-modified-since`
    *   `if-none-match`
    *   `if-unmodified-since`
    *   `range`
    *   `upgrade`
*   Headers that are covered by other Cache Key features
    *   `cookie`
    *   `host`
*   Headers that are specific to Cloudflare and prefixed with `cf-`, e.g. `cf-ray`
*   Headers that are already included in the custom Cache Key template, e.g. `origin`

### Host

Host determines which host header to include in the Cache Key.

*   If `resolved: false`, Cloudflare includes the `Host` header in the HTTP request sent to the origin.
*   If `resolved: true`, Cloudflare includes the `Host` header that was resolved to get the `origin IP` for the request. In this scenario, the `Host` header may be different from the header actually sent if the [Cloudflare Resolve Override](https://support.cloudflare.com/hc/articles/206190798) feature is used.

### Cookie

Like `query_string` or `header`, `cookie` controls which cookies appear in the Cache Key. You can either include the cookie value or check for the presence of a particular cookie.

#### Usage notes

You cannot include cookies specific to Cloudflare. Cloudflare cookies are prefixed with `__cf`, e.g. `__cflb`

#### User features

User feature fields add features about the end-user (client) into the Cache Key.

*   `device_type` classifies a request as `mobile`, `desktop`, or `tablet` based on the User Agent
*   `geo` includes the client’s country, derived from the IP address
*   `lang` includes the first language code contained in the `Accept-Language` header sent by the client
