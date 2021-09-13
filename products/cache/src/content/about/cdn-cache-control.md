---
title: CDN-Cache-Control
pcx-content-type: concept
---

# CDN-Cache-Control

`CDN-Cache-Control` is a response header field set on the origin to separately control the behavior of CDN caches from other intermediaries that might handle a response. You can set the `CDN-Cache-Control` or `Cloudflare-CDN-Cache-Control` response header using the same directives used with the [Cache-Control](/about/cache-control)
.
## Header precedence

You have several options available to determine how `CDN-Cache-Control` directives interact with `Cache-Control directives`. 

An origin can:

- Return the `CDN-Cache-Control` response header which Cloudflare evaluates to make caching decisions. `Cache-Control`, if also returned by the origin, is proxied as is and does not affect caching decisions made by Cloudflare. Additionally, `CDN-Cache-Control` is proxied downstream in case there are other CDNs between Cloudflare and the browser.

- Return the `Cloudflare-CDN-Cache-Control` response header. This results in the same behavior as the origin returning `CDN-Cache-Control` except Cloudflare does not proxy `Cloudflare-CDN-Cache-Control` downstream because it’s a header only used to control Cloudflare. This option is beneficial if you want only Cloudflare to have a different caching behavior while all other downstream servers rely on `Cache-Control` or if you do not want Cloudflare to proxy the `CDN-Cache-Control` header downstream.

- Return both `Cloudflare-CDN-Cache-Control` and `CDN-Cache-Control` response headers. In this case, Cloudflare only looks at `Cloudflare-CDN-Cache-Control` when making caching decisions because it is the most specific version of `CDN-Cache-Control` and proxies `CDN-Cache-Control` downstream. Only forwarding `CDN-Cache-Control` in this situation is beneficial if you want Cloudflare to have a different caching behavior than other CDNs downstream.

## Interaction with other Cloudflare features

### Edge Cache TTL page rule

The Edge Cache TTL page rule overrides the amount of time an asset is cached on the edge (Cloudflare data centers). This page rule overrides directives in `Cloudflare-CDN-Cache-Control/CDN-Cache-Control` which manage how long an asset is cached on the edge. You can set this page rule from the rules section of the dashboard. 

### Browser Cache TTL page rule

The Browser Cache TTL page rule overrides the amount of time an asset is cached by browsers/servers downstream of Cloudflare. Browser Cache TTL only modifies the `Cache-Control` response header. This page rule does not modify `Cloudflare-CDN-Cache-Control/CDN-Cache-Control` response headers.

### Other Origin Response Headers

The origin returns the `Expires` response header which specifies the amount of time before an object is considered stale to the browser. This response header does not affect the caching decision at Cloudflare when `Cloudflare-CDN-Cache-Control/CDN-Cache-Control` is in use.

### Cloudflare Default cache values

In situations where Cloudflare does not receive `Cloudflare-CDN-Cache-Control`, `CDN-Cache-Control`, or `Cache-Control` values, cacheable assets use the general [default values](/about/default-cache-behavior).

## When to use CDN-Cache-Control

### Manage cached assets TTLs

Use `CDN-Cache-Control` when you want to manage cached asset’s TTLs separately for origin caches, CDN caches, and browser caches. Previously, this scenario required creating page rules, but `CDN-Cache-Control` accomplishes the desired behavior through origin-set response headers. The example below shows how you could manage your cached asset’s TTLs.

Headers: 
- `Cache-Control: max-age=14400, s-maxage=84000`
- `Cloudflare-CDN-Cache-Control: max-age=24400`
- `CDN-Cache-Control: 18000`

Cache behavior: 

<table>
  <tbody>
    <th colspan="5" rowspan="1">
      Caches
    </th>
    <th colspan="5" rowspan="1">
      Cache TTL (seconds)
    </th>
    <tr>
      <td colspan="5" rowspan="1">
        Origin Server Cache
      </td>
      <td colspan="5" rowspan="1">
        14400
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        Network Shared Cache
      </td>
      <td colspan="5" rowspan="1">
        84000
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        Cloudflare Edge
      </td>
      <td colspan="5" rowspan="1">
        24400
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        Other CDNs
      </td>
      <td colspan="5" rowspan="1">
        18000
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        Browser Cache
      </td>
      <td colspan="5" rowspan="1">
        14400
      </td>
    </tr>
  </tbody>
</table>

### Specify when to serve stale content

Use `CDN-Cache-Control` headers in conjunction with `Cache-Control` headers to specify when to serve stale content in the case of error or during revalidation. The example below shows how you might set your headers and directives to apply to CDNs when handling errors.

Headers:
- `Cache-Control: stale-if-error=400`
- `Cloudflare-CDN-Cache-Control: stale-if-error=60`
- `CDN-Cache-Control: stale-if-error=200`

Behavior in response to 5XX error:

<table>
  <tbody>
    <th colspan="5" rowspan="1">
      Caches
    </th>
    <th colspan="5" rowspan="1">
      Stale served (seconds) in response to error
    </th>
    <tr>
      <td colspan="5" rowspan="1">
        Origin Cache Layer/Network Cache/Browser Cache
      </td>
      <td colspan="5" rowspan="1">
        400 (if it assumes the directive applies)
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        Cloudflare Edge
      </td>
      <td colspan="5" rowspan="1">
        60
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        Other CDN
      </td>
      <td colspan="5" rowspan="1">
        200
      </td>
    </tr>
  </tbody>
</table>
