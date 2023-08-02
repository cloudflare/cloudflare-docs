---
title: HTTP/2 to Origin
pcx_content_type: how-to
---

# HTTP/2 to Origin

A protocol is a set of rules governing the exchange or transmission of data between devices. One of the most important protocols that run on the human-computer interaction layer, where applications can access the network services, is HTTP (Hypertext Transfer Protocol).

HTTP is a well established protocol that has several versions, and each version adds features that improve performance over the older one. HTTP/1.1 and HTTP/2 are widely deployed on the Internet today. HTTP/1.1 has been around for more than a decade, but in 2015 the IETF (Internet Engineering Task Force) introduced HTTP/2, which introduces several features to reduce page load times. To know more about the differences between HTTP/1.1 and HTTP/2, please refer to [HTTP/2 versus HTTP/1.1](https://www.cloudflare.com/learning/performance/http2-vs-http1.1/).

## Enable HTTP/2 to Origin

At Cloudflare, HTTP/2 connection is enabled by default for Free, Pro and Business customers. Enterprise customers will need to enable this behavior, if they want to use HTTP/2. Please follow these steps to enable it:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2.  Choose the domain that will use HTTP/2 to Origin.
3.  Select **Speed > Optimization**.
4.  Navigate to the **Protocol Optimization** tab and under **HTTP/2 to Origin** set the toggle to On.

If the toggle is disabled, or the origin does not support HTTP/2, Cloudflare will initiate an HTTP/1.1 connection.

{{<Aside type="note" header="Note">}}

At the moment, connection multiplexing is not supported by our implementation but will soon be available.

{{</Aside>}}
