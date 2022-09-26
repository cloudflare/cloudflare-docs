---
pcx_content_type: reference
title: HTTP request headers
---

# HTTP request headers

Cloudflare passes all HTTP request headers to your origin web server and adds additional headers as specified below.

## CF-Connecting-IP

`CF-Connecting-IP` provides the client IP address connecting to Cloudflare to the origin web server.
This header will only be sent on the traffic from Cloudflare's edge to your origin web server.

For guidance on logging your visitor’s original IP address, refer to [Restoring original visitor IPs](https://support.cloudflare.com/hc/articles/200170786).

Alternatively, if you do not wish to receive the `CF-Connecting-IP` header or any HTTP header that may contain the visitor's IP address, [enable the **Remove visitor IP headers** Managed Transform](/rules/transform/managed-transforms/configure/).

## True-Client-IP (Enterprise plan only)

`True-Client-IP` provides the original client IP address to the origin web server. `True-Client-IP` is only available on an Enterprise plan. In the example below, `203.0.113.1` is the original visitor IP address. For example: `True-Client-IP: 203.0.113.1`

There is no difference between the `True-Client-IP` and `CF-Connecting-IP` headers besides the name of the header. Some Enterprise customers with legacy devices need `True-Client-IP` to avoid updating firewalls or load-balancers to read a custom header name.

To add a `True-Client-IP` HTTP header to requests, [enable the **Add "True-Client-IP" header** Managed Transform](/rules/transform/managed-transforms/configure/).

Alternatively, if you do not wish to receive the `True-Client-IP` header or any HTTP header that may contain the visitor's IP address, [enable the **Remove visitor IP headers** Managed Transform](/rules/transform/managed-transforms/configure/).

{{<Aside type="warning">}}

If you are using Cloudflare in a stacked CDN and authenticating HTTP requests based on the IP address value in the `True-Client-IP` header, you must add a `True-Client-IP` header to your requests. If you do not add this header, its value can be spoofed to any value.

{{</Aside>}}

## X-Forwarded-For

`X-Forwarded-For` maintains proxy server and original visitor IP addresses. If there was no existing `X-Forwarded-For` header in the request sent to Cloudflare, `X-Forwarded-For` has an identical value to the `CF-Connecting-IP` header. For example: `X-Forwarded-For: 203.0.113.1`.

If an `X-Forwarded-For` header was already present in the request to Cloudflare, Cloudflare appends the IP address of the HTTP proxy to the header: `X-Forwarded-For: 203.0.113.1,198.51.100.101,198.51.100.102`

In the examples above, `203.0.113.1` is the original visitor IP address and `198.51.100.101` and `198.51.100.102` are proxy server IP addresses provided to Cloudflare via the `X-Forwarded-For` header.

If you do not wish to receive the `X-Forwarded-For` header or any HTTP header that may contain the visitor's IP address, [enable the **Remove visitor IP headers** Managed Transform](/rules/transform/managed-transforms/configure/).

{{<Aside type="note">}}

To restore the original visitor IP address at your origin web server, Cloudflare recommends that your logs or applications look at `CF-Connecting-IP` or `True-Client-IP` instead of `X-Forwarded-For`. `CF-Connecting-IP` and `True-Client-IP` both have a consistent format containing only one IP address.

{{</Aside>}}

## X-Forwarded-Proto

`X-Forwarded-Proto` is used to identify the protocol (HTTP or HTTPS) that Cloudflare uses to connect to origin web server. By default, it is `http`. Certain [encryption mode](/ssl/origin-configuration/ssl-modes/) may change this header to `https` if the connection is encrypted.


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

# Considerations for Spectrum

When using Spectrum with a TCP application, these headers are not visible at the origin as they are HTTP headers. If you wish to utilize these in your application, there are two options:

- Use an HTTP or HTTPS Spectrum app instead of TCP
- Use the Proxy Protocol feature - see [Enable Proxy protocol · Cloudflare Spectrum docs](https://developers.cloudflare.com/spectrum/how-to/enable-proxy-protocol/) for more information.

