---
pcx_content_type: how-to
title: HTTP/2 to Origin
---

# HTTP/2 to Origin

A protocol is a set of rules governing the exchange or transmission of data between devices. One of the most important protocols that run on the human-computer interaction layer, where applications can access the network services, is HTTP (Hypertext Transfer Protocol).

HTTP is a well established protocol that has several versions, and each version adds features that improve performance over the older one. HTTP/1.1 and HTTP/2 are widely deployed on the Internet today. HTTP/1.1 has been around for more than a decade, but in 2015 the IETF (Internet Engineering Task Force) introduced HTTP/2, which introduces several features to reduce page load times. To know more about the differences between HTTP/1.1 and HTTP/2, please refer to [HTTP/2 versus HTTP/1.1](https://www.cloudflare.com/learning/performance/http2-vs-http1.1/).

## Availability

{{<feature-table id="speed.http2_to_origin">}}

## Enable HTTP/2 to Origin

At Cloudflare, HTTP/2 connection is enabled by default for Free, Pro and Business customers. It will also be gradually enabled for Enterprise customers from March 19, 2024. For more details, refer to the warning below. 

Follow these steps to enable HTTP/2 to Origin:
It will also be gradually enabled for Enterprise customers from March 19, 2024, see below. 
Please follow these steps to enable it:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2.  Choose the domain that will use HTTP/2 to Origin.
3.  Select **Speed > Optimization**.
4.  Navigate to the **Protocol Optimization** tab and under **HTTP/2 to Origin** set the toggle to On.

If the toggle is disabled, or the origin does not support HTTP/2, Cloudflare will initiate an HTTP/1.1 connection.

{{<Aside type="warning" header="Important">>}}
Starting March 19, 2024, we plan to gradually enable HTTP/2 to origin by default for all Enterprise customers. 

We will connect to servers who announce support of HTTP/2 connections via [ALPN](https://blog.cloudflare.com/introducing-http2). 
If you are unsure if your server supports HTTP/2, we suggest checking your origin server’s documentation or using a testing tool for HTTP/2 implementation (for example, [h2spec](https://github.com/summerwind/h2spec)). For servers that do not announce HTTP/2 support, nothing will change from how Cloudflare connects to your origin server today. 

If you do not want Cloudflare to connect to your origin via HTTP/2 you can either disable ALPN HTTP/2 support on your origin server, or set [origin_max_http_version to “1” via the API](/api/operations/zone-cache-settings-change-origin-max-http-version-setting) by March 19, 2024.

Once the HTTP/2 to origin is enabled, you can navigate to **Speed > Optimization > Protocol Optimization** in the Cloudflare dashboard and set the toggle to **Off** to disable it. 
{{</Aside>}}

{{<Aside type="note" header="Note">}}
At the moment, connection multiplexing is not supported by our implementation but will soon be available.
{{</Aside>}}


