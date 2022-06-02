---
title: Available features
pcx-content-type: concept
weight: 2
meta:
  title: Available Origin Rules features
---

# Available features

The following sections describe the features currently supported by Origin Rules.

## Host Header Override

This feature allows you to rewrite the HTTP `Host` header of incoming requests.

A common use case for this functionality is when your content is hosted on an a third party server that only accepts `Host` headers with their own server names. In this situation, you must update the `Host` HTTP header in incoming requests from `Host: example.com` to `Host: thirdpartyserver.example.net`.

You must specify a valid hostname in a Host Header Override.

{{<Aside type="note" header="Host header overrides when using load balancing">}}

If you have configured load balancing through Cloudflare and you wish to override the HTTP `Host` header per origin or for a given monitor, refer to [Override HTTP Host headers](/load-balancing/additional-options/override-http-host-headers/) in the Load Balancing documentation for more information.

{{</Aside>}}

## Resolve Override

This feature allows you to override the hostname or IP address of incoming requests.

A common use case for this functionality is when you are serving an application from the URI (for example, `mydomain.com/app`). In this case, the `app` may be hosted on a different server or by a third party. Resolve Override allows you to redirect requests to this endpoint to the server for that third party application.

You can specify a `CNAME` hostname, which must exist within [Cloudflare DNS](/dns/). Cloudflare recommends that you set the Resolve Override within the same zone name to make sure you have full control of these DNS records.

You must specify a valid hostname in a Resolve Override.

## Destination Port Override

This feature allows you to override the destination port of a request.

When you configure Destination Port Override, you can redirect incoming requests to a different port. For example, you could override the destination port for requests received for `mydomain.com` so that they are served by the application running on port 9000 (`mydomain.com:9000`).

The destination port must be between 1 and 65535.