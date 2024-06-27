---
pcx_content_type: how-to
title: HTTP/2 to Origin
---

# HTTP/2 to Origin

A protocol is a set of rules governing the exchange or transmission of data between devices. One of the most important protocols that run on the human-computer interaction layer, where applications can access the network services, is HTTP (Hypertext Transfer Protocol).

HTTP is a well established protocol that has several versions, and each version adds features that improve performance over the older one. HTTP/1.1 and HTTP/2 are widely deployed on the Internet today. HTTP/1.1 has been around for more than a decade, but in 2015 the IETF (Internet Engineering Task Force) introduced HTTP/2, which introduces several features to reduce page load times. To know more about the differences between HTTP/1.1 and HTTP/2, please refer to [HTTP/2 versus HTTP/1.1](https://www.cloudflare.com/learning/performance/http2-vs-http1.1/).

## Availability

{{<feature-table id="speed.http2_to_origin">}}

## Disable HTTP/2 to Origin

At Cloudflare, HTTP/2 connection to the origin is enabled by default.

If you wish to disable HTTP/2 to Origin, you can follow these steps:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2.  Choose the domain that will use HTTP/2 to Origin.
3.  Select **Speed > Optimization**.
4.  Navigate to the **Protocol Optimization** tab and under **HTTP/2 to Origin** set the toggle to **Off**.

## Protocol compatibility

Note that if the origin does not support HTTP/2, Cloudflare will initiate an HTTP/1.1 connection.
We connect to servers who announce support of HTTP/2 connections via [ALPN](https://blog.cloudflare.com/introducing-http2). 

If you are unsure if your server supports HTTP/2, we suggest checking your origin server’s documentation or using a testing tool for HTTP/2 implementation (for example, [h2spec](https://github.com/summerwind/h2spec)). 

{{<Aside type="note" header="Note">}}
Connection multiplexing is currently being rolled out. It has been enabled by default on Free, Pro and Business zones. Enterprise zones will be enabled at a later date.
{{</Aside>}}


