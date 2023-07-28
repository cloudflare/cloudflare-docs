---
title: Origin Cache-Control
pcx_content_type: concept
meta:
  title: Origin Cache Control
---

# Origin Cache Control

Set `Cache-Control` headers to tell Cloudflare how to handle content from the origin.

When a user sends an HTTP request, the user’s request URL is matched against a [list of cacheable file extensions](/cache/concepts/default-cache-behavior/#default-cached-file-extensions). If the request matches an extension on this list, Cloudflare serves the resource from cache if it is present. If the content is stale in Cloudflare’s cache, Cloudflare attempts to revalidate the content with the origin before serving the response to the client.

In the response, Cloudflare first examines its caches in multiple network locations for content. If the resource is not present in the cache, Cloudflare requests the resource from your origin web server to fill the cache. The response is then sent to the client who initiated the request.

At this point, Cloudflare’s cache logic examines the HTTP response received from your origin server. Based on how Cloudflare interprets request headers, the response is either deemed cacheable and written to disk for use with the next request for the same resource, or the request is deemed un-cacheable which means the next request misses the cache and repeats this flow.

## Cache-control directives

A `Cache-Control` header can include a number of directives, and the directive dictates who can cache a resource along with how long those resources can be cached before they must be updated.

{{<Aside type="note" header="Note">}}

For more information about Cache-Control directives at origin servers, refer to the [Mozilla Cache-Control documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control).

{{</Aside>}}

If multiple directives are passed together, each directive is separated by a comma. If the directive takes an argument, it follows the directive separated by an equal sign. For example: `max-age=86400`.

Directives can be broken down into four groups: cacheability, expiration, revalidation, and other.

### Cacheability

Cacheability refers to whether or not a resource should enter a cache, and the directives below indicate a resource’s cacheability.

- `public` — Indicates any cache may store the response, even if the response is normally non-cacheable or cacheable only within a private cache.
- `private` — Indicates the response message is intended for a single user (for example, a browser cache) and must not be stored by a shared cache like Cloudflare or a corporate proxy.
- `no-store` — Indicates any cache (i.e., a client or proxy cache) must not store any part of either the immediate request or response.

### Expiration

Expiration refers to how long a resource should remain in the cache, and the directives below affect how long a resource stays in the cache.

{{<Aside type="note" header="Note">}}

Cloudflare respects whichever value is higher: the [Browser Cache TTL](/cache/how-to/edge-browser-cache-ttl/) in Cloudflare or the `max-age` header. You can also simultaneously specify a Cloudflare Edge Cache TTL different than a Browser’s Cache TTL respectively via the `s-maxage` and `max-age` Cache-Control headers.

When using Origin Cache-Control and setting `max-age=0`, Cloudflare prefers to cache and revalidate. With Origin Cache-Control off and `max-age=0`, Cloudflare will bypass cache.

When setting `no-cache` with Origin Cache-Control off, Cloudflare does not cache. When setting `no-cache` with Origin Cache-Control on, Cloudflare caches and always revalidates.

{{</Aside>}}

- `max-age=seconds` — Indicates the response is stale after its age is greater than the specified number of seconds. Age is defined as the time in seconds since the asset was served from the origin server. The `seconds` argument is an unquoted integer.
- `s-maxage=seconds` — Indicates that in shared caches, the maximum age specified by this directive overrides the maximum age specified by either the `max-age` directive or the `Expires` header field. The `s-maxage` directive also implies the semantics of the proxy-revalidate response directive. Browsers ignore `s-maxage`.
- `no-cache` — Indicates the response cannot be used to satisfy a subsequent request without successful validation on the origin server. This allows an origin server to prevent a cache from using the origin to satisfy a request without contacting it, even by caches that have been configured to send stale responses.

Ensure the HTTP `Expires` header is set in your origin server to use Greenwich Mean Time (GMT) as stipulated in [RFC 2616](https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3 '3.3.1 Full Date').

### Revalidation

Revalidation determines how the cache should behave when a resource expires, and the directives below affect the revalidation behavior.

- `must-revalidate` — Indicates that once the resource is stale, a cache (client or proxy) must not use the response to satisfy subsequent requests without successful validation on the origin server.
- `proxy-revalidate` — Has the same meaning as the `must-revalidate` response directive except that it does not apply to private client caches.
- `stale-while-revalidate=seconds` — When present in an HTTP response, indicates caches may serve the response in which it appears after it becomes stale, up to the indicated number of seconds since the resource expired. If [Always Online](/cache/how-to/always-online/) is enabled, then the `stale-while-revalidate` and `stale-if-error` directives are ignored. This directive is not supported when using the Cache API methods `cache.match` or `cache.put`. For more information, refer to the [Worker's documentation for Cache API](/workers/platform/limits/#cache-api).
- `stale-if-error=seconds` — Indicates that when an error is encountered, a cached stale response may be used to satisfy the request, regardless of other freshness information. This directive is not supported when using the Cache API methods `cache.match` or `cache.put`. For more information, refer to the [Worker's documentation for Cache API](/workers/platform/limits/#cache-api).

The `stale-if-error` directive is ignored if [Always Online](/cache/how-to/always-online/) is enabled or if an explicit in-protocol directive is passed. Examples of explicit in-protocol directives include a `no-store` or `no-cache cache` directive, a `must-revalidate` cache-response-directive, or an applicable `s-maxage` or `proxy-revalidate` cache-response-directive.

### Other

Additional directives that influence cache behavior are listed below.

- `no-transform` — Indicates that an intermediary — regardless of whether it implements a cache — must not transform the payload.
- `vary` — Cloudflare does not consider vary values in caching decisions. Nevertheless, vary values are respected when [Vary for images](/cache/advanced-configuration/vary-for-images/) is configured and when the vary header is [`vary: accept-encoding`](/speed/optimization/content/brotli/).
- `immutable` — Indicates to clients the response body does not change over time. The resource, if unexpired, is unchanged on the server. The user should not send a conditional revalidation for it (for example, `If-None-Match` or `If-Modified-Since`) to check for updates, even when the user explicitly refreshes the page. This directive has no effect on public caches like Cloudflare, but does change browser behavior.

## Origin Cache-Control behavior

The table below lists directives and their behaviors when Origin Cache-Control is disabled and when it's enabled.

<table>
  <tbody>
    <th colspan="5" rowspan="1">
      Directive
    </th>
    <th colspan="5" rowspan="1">
      Origin Cache-control disabled behavior
    </th>
    <th colspan="5" rowspan="1">
      Origin Cache-control enabled behavior
    </th>
    <tr>
      <td colspan="5" rowspan="1">
        <code>s-maxage=0</code>
      </td>
      <td colspan="5" rowspan="1">
        Will not cache
      </td>
      <td colspan="5" rowspan="1">
        Caches and always revalidates
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>max-age=0</code>
      </td>
      <td colspan="5" rowspan="1">
        Will not cache
      </td>
      <td colspan="5" rowspan="1">
        Caches and always revalidates
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>no-cache</code>
      </td>
      <td colspan="5" rowspan="1">
        Will not cache
      </td>
      <td colspan="5" rowspan="1">
        Caches and always revalidates. Does not serve stale.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>no-cache=&lt;headers&gt;</code>
      </td>
      <td colspan="5" rowspan="1">
        Will not cache at all
      </td>
      <td colspan="5" rowspan="1">
        Caches if headers mentioned in <code>no-cache=&lt;headers&gt;</code> do not exist. Always
        revalidates if any header mentioned in <code>no-cache=&lt;headers&gt;</code> is present.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>Private=&lt;headers&gt;</code>
      </td>
      <td colspan="5" rowspan="1">
        Will not cache at all
      </td>
      <td colspan="5" rowspan="1">
        Does not cache <code>&lt;headers&gt;</code> values mentioned in <code>Private=&lt;headers&gt;</code> directive.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>must-revalidate</code>
      </td>
      <td colspan="5" rowspan="1">
        Cache directive is ignored and stale is served.
      </td>
      <td colspan="5" rowspan="1">
        Does not serve stale. Must revalidate for CDN but not for browser.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>proxy-revalidate</code>
      </td>
      <td colspan="5" rowspan="1">
        Cache directive is ignored and stale is served.
      </td>
      <td colspan="5" rowspan="1">
        Does not serve stale. Must revalidate for CDN but not for browser.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>no-transform</code>
      </td>
      <td colspan="5" rowspan="1">
        May (un)Gzip, Polish, email filter, etc.
      </td>
      <td colspan="5" rowspan="1">
        Does not transform body.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>s-maxage=delta, delta>1</code>
      </td>
      <td colspan="5" rowspan="1">
        Same as <code>max-age</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>Max-age</code> and <code>proxy-revalidate</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>immutable</code>
      </td>
      <td colspan="5" rowspan="1">
        Not proxied downstream
      </td>
      <td colspan="5" rowspan="1">
        Proxied downstream. Browser facing, does not impact caching proxies.
      </td>
    </tr>
  </tbody>
</table>

Certain scenarios also affect Origin Cache-Control behavior when it is enabled or disabled.

<table>
  <tbody>
    <th colspan="5" rowspan="1">
      Condition
    </th>
    <th colspan="5" rowspan="1">
      Origin Cache-control disabled behavior
    </th>
    <th colspan="5" rowspan="1">
      Origin Cache-control enabled behavior
    </th>
    <tr>
      <td colspan="5" rowspan="1">
        Presence of <code>Authorization</code> header
      </td>
      <td colspan="5" rowspan="1">
        Content may be cached
      </td>
      <td colspan="5" rowspan="1">
        Content is cached only if <code>must-revalidate</code>, <code>public</code>, or <code>s-maxage</code> is also present
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        Use of <code>no-cache</code> header
      </td>
      <td colspan="5" rowspan="1">
        In logs, <code>cacheStatus=miss</code>
      </td>
      <td colspan="5" rowspan="1">
        In logs, <code>cacheStatus=bypass</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        Origin response has <code>Set-Cookie</code> header and default cache level is used
      </td>
      <td colspan="5" rowspan="1">
        Content may be cached with stripped <code>set-cookie</code> header
      </td>
      <td colspan="5" rowspan="1">
        Content is not cached
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        Browser Cache TTL is set
      </td>
      <td colspan="5" rowspan="1">
        Cache-Control returned to eyeball does not include <code>private</code>
      </td>
      <td colspan="5" rowspan="1">
        If origin returns <code>private</code> in Cache-Control then preserve it
      </td>
    </tr>
  </tbody>
</table>

## Examples

Review the examples below to learn which directives to use with the Cache-Control header to control specific caching behavior.

<details>
  <summary>Cache a static asset</summary>
  <div>
    <code>Cache-Control: public, max-age=86400</code>
  </div>
</details>

<details>
  <summary>Ensure a secret asset is never cached</summary>
  <div>
    <code>Cache-Control: no-store</code>
  </div>
</details>

<details>
  <summary>Cache assets on browsers but not on proxy caches</summary>
  <div>
    <code>Cache-Control: private, max-age=3600</code>
  </div>
</details>

<details>
  <summary>Cache assets in client and proxy caches, but prefer revalidation when served</summary>
  <div>
    <code>Cache-Control: public, no-cache</code>
  </div>
</details>

<details>
  <summary>Cache assets in proxy caches but REQUIRE revalidation by the proxy when served</summary>
  <div>
    <code>Cache-Control: public, no-cache, proxy-revalidate</code> or
    <code>Cache-Control: public, s-maxage=0</code>
  </div>
</details>

<details>
  <summary>Cache assets in proxy caches, but REQUIRE revalidation by any cache when served</summary>
  <div>
    <code>Cache-Control: public, no-cache, must-revalidate</code>
  </div>
</details>

<details>
  <summary>
    Cache assets, but ensure the proxy does not modify it
  </summary>
  <div>
    <code>Cache-Control: public, no-transform</code>

This configuration also disables transformation like gzip or brotli compression from our edge to your visitors if the original payload was served uncompressed.

  </div>
</details>

<details>
  <summary>
    Cache assets with revalidation, but allow stale responses if origin server is unreachable
  </summary>
  <div>
    <code>Cache-Control: public, max-age=3600, stale-if-error=60</code>

With this configuration, Cloudflare attempts to revalidate the content with the origin server after it has been in cache for 3600 seconds (one hour). If the server returns an error instead of proper revalidation responses, Cloudflare continues serving the stale resource for a total of one minute beyond the expiration of the resource.

  </div>
</details>

<details>
  <summary>
    Cache assets for different amounts of time on Cloudflare and in visitor browsers
  </summary>
  <div>
    <code>Cache-Control: public, max-age=7200, s-maxage=3600</code>
  </div>
</details>

<details>
  <summary>
    Cache an asset and serve while asset is being revalidated
  </summary>
  <div>
    <code>Cache-Control: max-age=600, stale-while-revalidate=30</code>

This configuration indicates the asset is fresh for 600 seconds. The asset can be served stale for up to an additional 30 seconds to parallel requests for the same resource while the initial synchronous revalidation is attempted.

  </div>
</details>

## Interaction with other Cloudflare features

### Edge Cache TTL

[Edge Cache TTL](/cache/how-to/edge-browser-cache-ttl/#edge-cache-ttl) Page Rules override `s-maxage` and disable revalidation directives if present. When Origin Cache-Control is enabled at Cloudflare, the original Cache-Control header passes downstream from our edge even if Edge Cache TTL overrides are present. Otherwise, when Origin Cache-Control is disabled at Cloudflare (the default), Cloudflare overrides the origin cache control.

### Browser Cache TTL

[Browser Cache TTL](/cache/how-to/edge-browser-cache-ttl/#browser-cache-ttl) Page Rules override `max-age` settings passed downstream from our edge, typically to your visitor's browsers.

### Polish

[Polish](/images/polish/) is disabled when the `no-transform` directive is present.

### Gzip and Other Compression

Compression is disabled when the `no-transform` directive is present. If the original asset fetched from the origin is compressed, it is served compressed to the visitor. If the original asset is uncompressed, compression is not applied.
