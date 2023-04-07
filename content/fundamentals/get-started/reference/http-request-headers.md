---
pcx_content_type: reference
title: HTTP request headers
---

# HTTP request headers

Cloudflare passes all HTTP request headers to your origin web server and adds additional headers as specified below.

## Accept-Encoding

For incoming requests, the value of this header will always be set to `gzip`. If the client set a different value, such as `*` or `br`, it will be overwritten and the original value will be available in `request.cf.clientAcceptEncoding`.

## CF-Connecting-IP

`CF-Connecting-IP` provides the client IP address connecting to Cloudflare to the origin web server.
This header will only be sent on the traffic from Cloudflare's edge to your origin web server.

For guidance on logging your visitor’s original IP address, refer to [Restoring original visitor IPs](https://support.cloudflare.com/hc/articles/200170786).

Alternatively, if you do not wish to receive the `CF-Connecting-IP` header or any HTTP header that may contain the visitor's IP address, [enable the **Remove visitor IP headers** Managed Transform](/rules/transform/managed-transforms/configure/).

### CF-Connecting-IP in Worker subrequests

In same-zone Worker subrequests, the value of `CF-Connecting-IP` reflects the value of `x-real-ip` (the client’s IP). `x-real-ip` can be altered by the user in their Worker script.

In cross-zone subrequests from one Cloudflare customer zone to another Cloudflare customer zone, the `CF-Connecting-IP` value will be set to the Worker client IP address `'2a06:98c0:3600::103'` for security reasons.

For Worker subrequests destined for a non-Cloudflare customer zone, the `CF-Connecting-IP` and `x-real-ip` headers will both reflect the client's IP address, with only the `x-real-ip` header able to be altered.

When no Worker subrequest is triggered, `cf-connecting-ip` reflects the client's IP address and the `x-real-ip` header is stripped.

## CF-Connecting-IPv6

Cloudflare provides free IPv6 support to all domains without requiring additional configuration or hardware. To support migrating to IPv6, Cloudflare's [Pseudo IPv4](https://support.cloudflare.com/hc/en-us/articles/229666767) provides an IPv6 to IPv4 translation service for all Cloudflare domains.

If Pseudo IPv4 is set to `Overwrite Headers` - Cloudflare overwrites the existing `Cf-Connecting-IP` and `X-Forwarded-For` headers with a pseudo IPv4 address while preserving the real IPv6 address in `CF-Connecting-IPv6` header.

## CF-EW-Via

This header is used for loop detection, similar to the `CDN-Loop` [header](https://blog.cloudflare.com/preventing-request-loops-using-cdn-loop/).

## CF-Pseudo-IPv4

If Pseudo IPv4 is set to `Add Header` - Cloudflare automatically adds the `CF-Pseudo-IPv4` header with a Class E IPv4 address hashed from the original IPv6 address.

## True-Client-IP (Enterprise plan only)

`True-Client-IP` provides the original client IP address to the origin web server. `True-Client-IP` is only available on an Enterprise plan. In the example below, `203.0.113.1` is the original visitor IP address. For example: `True-Client-IP: 203.0.113.1`

There is no difference between the `True-Client-IP` and `CF-Connecting-IP` headers besides the name of the header. Some Enterprise customers with legacy devices need `True-Client-IP` to avoid updating firewalls or load-balancers to read a custom header name.

To add a `True-Client-IP` HTTP header to requests, [enable the **Add "True-Client-IP" header** Managed Transform](/rules/transform/managed-transforms/configure/).

Alternatively, if you do not wish to receive the `True-Client-IP` header or any HTTP header that may contain the visitor's IP address, [enable the **Remove visitor IP headers** Managed Transform](/rules/transform/managed-transforms/configure/).

{{<Aside type="warning">}}

If you are using Cloudflare in a stacked CDN and authenticating HTTP requests based on the IP address value in the `True-Client-IP` header, you must add a `True-Client-IP` header to your requests. If you do not add this header, its value can be spoofed to any value.

{{</Aside>}}

## X-Forwarded-For

`X-Forwarded-For` maintains proxy server and original visitor IP addresses. If there was no existing `X-Forwarded-For`header in the request sent to Cloudflare, `X-Forwarded-For` has an identical value to the `CF-Connecting-IP` header.

For example, if the original visitor IP address is `203.0.113.1` and the request sent to Cloudflare does not contain an `X-Forwarded-For` header, then Cloudflare will send `X-Forwarded-For: 203.0.113.1` to the origin.

If, on the other hand, an `X-Forwarded-For` header was already present in the request to Cloudflare, Cloudflare will append the IP address of the HTTP proxy connecting to Cloudflare to the header. For example, if the original visitor IP address is `203.0.113.1` and a request is proxied through two proxies: proxy A with an IP address of `198.51.100.101` and proxy B with an IP address of `198.51.100.102` before being proxied to Cloudflare, then Cloudflare will send `X-Forwarded-For: 203.0.113.1,198.51.100.101,198.51.100.102` to the origin. Proxy A will append the original visitor's IP address (`203.0.113.1`) to `X-Forwarded-For` before proxying the request to proxy B which, in turn, will append Proxy A's IP address (`198.51.100.101`) to `X-Forwarded-For` before proxying the request to Cloudflare. And finally, Cloudflare will append proxy B's IP address (`198.51.100.102`) to `X-Forwarded-For` before proxying the request to the origin.

If you do not wish to receive the `X-Forwarded-For` header or any HTTP header that may contain the visitor's IP address, [enable the **Remove visitor IP headers** Managed Transform](/rules/transform/managed-transforms/configure/).

{{<Aside type="note">}}

To restore the original visitor IP address at your origin web server, Cloudflare recommends that your logs or applications look at `CF-Connecting-IP` or `True-Client-IP` instead of `X-Forwarded-For`. `CF-Connecting-IP` and `True-Client-IP` both have a consistent format containing only one IP address.

{{</Aside>}}

## X-Forwarded-Proto

`X-Forwarded-Proto` is used to identify the protocol (HTTP or HTTPS) that Cloudflare uses to connect to origin web server. By default, it is `http`. Certain [encryption mode](/ssl/origin-configuration/ssl-modes/) may change this header to `https` if the connection is encrypted.

For incoming requests, the value of this header will be set to the protocol the client used (`http` or `https`). If the client set a different value, it will be overwritten.

## X-Real-IP

For incoming requests, the value of this header will be set to the client's IP address. If the client set a different value, it will be overwritten. The value has the same semantics as [`CF-Connecting-IP`](/fundamentals/get-started/reference/http-request-headers/#cf-connecting-ip) and [`True-Client-IP`](/fundamentals/get-started/reference/http-request-headers/#true-client-ip-enterprise-plan-only).

## CF-RAY

The `CF-ray` header (otherwise known as a [Ray ID](/fundamentals/get-started/reference/cloudflare-ray-id/)) is a hashed value that encodes information about the data center and the visitor’s request. For example: `CF-RAY: 230b030023ae2822-SJC`.

Add the [`CF-Ray` header to your origin web server logs](https://support.cloudflare.com/hc/articles/203118044#h_f7a7396f-ec41-4c52-abf5-a110cadaca7c) to match requests proxied to Cloudflare to requests in your server logs.

Enterprise customers can also see all requests via [Cloudflare Logs](/logs/).

## CF-IPCountry

The `CF-IPCountry` header contains a two-character country code of the originating visitor’s country. Besides the  [ISO-3166-1 alpha-2 codes](https://www.iso.org/iso-3166-country-codes.html), Cloudflare uses the `XX` country code when the country information is unknown.

To add this header to requests, along with other HTTP headers with location information for the visitor's IP address, [enable the **Add visitor location headers** Managed Transform](/rules/transform/managed-transforms/configure/).

## CF-Visitor

Currently, this header is a JSON object, containing only one key called “scheme”. The header will be either HTTP or HTTPS, and it is only relevant if you need to enable Flexible SSL in your Cloudflare settings. For example: `CF-Visitor: { \"scheme\":\"https\"}`.

## CDN-Loop

`CDN-Loop` allows Cloudflare to specify how many times a request can enter Cloudflare's network before it is blocked as a looping request. For example: `CDN-Loop: cloudflare`

## CF-Worker

The `CF-Worker` request header is added to an edge Worker subrequest that identifies the host that spawned the subrequest. This is useful when you want to protect yourself against cross-zone worker subrequests. For example: `CF-Worker: example.com`.

You can add `CF-Worker` header on server logs similar to the way you add the [`CF-RAY`](https://support.cloudflare.com/hc//articles/203118044#h_f7a7396f-ec41-4c52-abf5-a110cadaca7c) header. To do that, add `$http_cf_worker` in the log format file: `log_format cf_custom "CF-Worker:$http_cf_worker"'`

`CF-Worker` is added to all Worker subrequests sent via `fetch()`. It is set to the name of the zone which owns the Worker making the subrequest. For example, a Worker script on route for `foo.example.com/*` from `example.com` will have all subrequests with the header:

`CF-Worker`: `example.com`

The intended purpose of this header is to provide a means for recipients (for example, origins, load balancers, other Workers) to recognize, filter, and route traffic generated by Workers on specific zones.

{{<Aside type="note">}}

When configuring firewall rules, do not match on this header. Firewall rules are applied before Cloudflare adds the `CF-Worker` header. Instead, use the [`cf.worker.upstream_zone`](/ruleset-engine/rules-language/fields/#standard-fields) dynamic field, which contains the same value and exists for the same purpose.

{{</Aside>}}

## Connection

For incoming requests, the value of this header will always be set to `Keep-Alive`. If the client set a different value, such as `close`, it will be overwritten. Note that is also the case when the client uses HTTP/2 or HTTP/3 to connect.


## Considerations for Spectrum

When using Spectrum with a TCP application, these headers are not visible at the origin as they are HTTP headers. If you wish to utilize these in your application, there are two options:

- Use an HTTP or HTTPS Spectrum app instead of TCP
- Use the [Proxy Protocol feature](/spectrum/how-to/enable-proxy-protocol/)
