---
pcx-content-type: reference
title: HTTP request headers
---

# HTTP request headers

Cloudflare passes all HTTP request headers to your origin web server and adds additional headers as specified below.

## CF-Connecting-IP

`CF-Connecting-IP` provides the client IP address connecting to Cloudflare to the origin web server.
This header will only be sent on the traffic from Cloudflare's edge to your origin webserver.

For guidance on using `CF-Connecting-IP`, refer to [Restoring original visitor IPs](https://support.cloudflare.com/hc/articles/200170786).

## True-Client-IP (Enterprise plan only)

`True-Client-IP` provides the original client IP address to the origin web server. `True-Client-IP` is only available on our Enterprise plan. In the example below, `203.0.113.1` is the original visitor IP address. For example: `True-Client-IP: 203.0.113.1`

There is no difference between the `True-Client-IP` and `CF-Connecting-IP` headers besides the name of the header. Some Enterprise customers with legacy devices need `True-Client-IP` to avoid updating firewalls or load-balancers to read a custom header name.

For guidance on using `True-Client-IP`, refer to [Restoring original visitor IPs](https://support.cloudflare.com/hc/articles/200170786).

{{<Aside type="warning">}}

If you are using Cloudflare in a stacked CDN and authenticating HTTP requests based on the IP address value in the `True-Client-IP` header, you must [enable `True-Client-IP`](https://support.cloudflare.com/hc/articles/206776727#h_4bf7CC7xR9dZJjR4y6wwcG). If you do not enable this feature, the `True-Client-IP` header can be spoofed to any value. Alternatively, if you do not want to receive the `True-Client-IP` header, use a [Transform Rule](/rules/transform/) to remove this HTTP request header.

{{</Aside>}}

## X-Forwarded-For

`X-Forwarded-For` maintains proxy server and original visitor IP addresses. If there was no existing `X-Forwarded-For` header in the request sent to Cloudflare, `X-Forwarded-For` has an identical value to the `CF-Connecting-IP` header. For example: `X-Forwarded-For: 203.0.113.1`.

If an `X-Forwarded-For` header was already present in the request to Cloudflare, Cloudflare appends the IP address of the HTTP proxy to the header: `X-Forwarded-For: 203.0.113.1,198.51.100.101,198.51.100.102`

In the examples above, `203.0.113.1` is the original visitor IP address and `198.51.100.101` and `198.51.100.102` are proxy server IP addresses provided to Cloudflare via the `X-Forwarded-For` header.

{{<Aside type="note">}}

To restore the original visitor IP address at your origin web server, Cloudflare recommends that your logs or applications look at `CF-Connecting-IP` or `True-Client-IP` instead of `X-Forwarded-For`.  `CF-Connecting-IP` and `True-Client-IP` both have a consistent format containing only one IP.

{{</Aside>}}

## CF-RAY

The `CF-ray` header (otherwise known as a [Ray ID](/fundamentals/get-started/reference/cloudflare-ray-id/)) is a hashed value that encodes information about the data center and the visitor’s request. For example: `CF-RAY: 230b030023ae2822-SJC`.

Add the [`CF-Ray` header to your origin web server logs](https://support.cloudflare.com/hc/articles/203118044#h_f7a7396f-ec41-4c52-abf5-a110cadaca7c) to match requests proxied to Cloudflare to requests in your server logs. 

Enterprise customers can also see all requests via [Cloudflare Logs](/logs/).

## CF-IPCountry

`CF-IPCountry` contains a two character country code of the originating visitor’s country. XX is used for unknown country information. This header is added to requests by enabling [Cloudflare IP Geolocation](https://support.cloudflare.com/hc/articles/200168236) in the dashboard. For example: `CF-IPCountry: US`.

## CF-Visitor

Currently, this header is a JSON object, containing only one key called “scheme”. The header will be either HTTP or HTTPS, and it is only relevant if you need to enable Flexible SSL in your Cloudflare settings. For example: `CF-Visitor: { \"scheme\":\"https\"}`.

## CDN-Loop

`CDN-Loop` allows Cloudflare to specify how many times a request can enter Cloudflare's network before it is blocked as a looping request. For example: `CDN-Loop: cloudflare`

## CF-Worker

The `CF-Worker` request header is added to an edge Worker subrequest that identifies the host that spawned the subrequest. This is useful when you want to protect yourself against cross-zone worker subrequests. For example: `CF-Worker: example.com`.

You can add `CF-Worker` header on server logs similar to the way you add the [`CF-RAY`](https://support.cloudflare.com/hc//articles/203118044#h_f7a7396f-ec41-4c52-abf5-a110cadaca7c) header. To do that, add `$http_cf_worker` in the log format file: `log_format cf_custom "CF-Worker:$http_cf_worker"'`
