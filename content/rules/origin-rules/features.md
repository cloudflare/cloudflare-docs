---
title: Available features
pcx_content_type: concept
weight: 2
meta:
  title: Available Origin Rules features
---

# Available features

The following sections describe the features currently supported by Origin Rules.

## Host Header Override

This feature allows you to rewrite the HTTP `Host` header of incoming requests.

A common use case for this functionality is when your content is hosted on a third-party server that only accepts `Host` headers with their own server names. In this situation, you must update the `Host` HTTP header in incoming requests from `Host: example.com` to `Host: thirdpartyserver.example.net`.

You must specify a valid hostname in a Host Header Override that is either:

* A hostname on the same Cloudflare account (possibly on a different zone).
* A hostname for which Cloudflare is not proxying traffic (gray-clouded).

For more information, refer to the [API instructions](/rules/origin-rules/create-api/) and the [API parameter reference](/rules/origin-rules/parameters/#host-header-override-parameters).

{{<Aside type="note" header="Host header overrides when using load balancing">}}

If you have configured load balancing through Cloudflare and you wish to override the HTTP `Host` header per origin or for a given monitor, refer to [Override HTTP Host headers](/load-balancing/additional-options/override-http-host-headers/) in the Load Balancing documentation for more information.

{{</Aside>}}

## Resolve Override

This feature allows you to override the resolved hostname of incoming requests.

A common use case for this functionality is when you are serving an application from the URI (for example, `mydomain.com/app`). In this case, the `app` may be hosted on a different server or by a third party. Resolve Override allows you to redirect requests to this endpoint to the server for that third-party application.

You must specify a valid hostname in a Resolve Override that is either:

* A hostname on the same Cloudflare account (possibly on a different zone).
* A hostname for which Cloudflare is not proxying traffic (gray-clouded).

For more information, refer to the [API instructions](/rules/origin-rules/create-api/) and the [API parameter reference](/rules/origin-rules/parameters/#resolve-override-and-destination-port-override-parameters).

## Destination Port Override

This feature allows you to override the destination port of a request.

When you configure Destination Port Override, you can redirect incoming requests to a different port. For example, you could override the destination port for requests received for `mydomain.com` so that they are served by the application running on port 9000 (`mydomain.com:9000`).

The destination port must be between 1 and 65,535.

For more information, refer to the [API instructions](/rules/origin-rules/create-api/) and the [API parameter reference](/rules/origin-rules/parameters/#resolve-override-and-destination-port-override-parameters).

## SNI Override

This feature allows you to override the Server Name Indication (SNI) [^1] value of a request. For more information, refer to [What is SNI (Server Name Indication)?](https://www.cloudflare.com/learning/ssl/what-is-sni/) in the Learning Center.

The SNI Override value must be a valid hostname on the same Cloudflare account (possibly on a different zone).

For more information, refer to the [API instructions](/rules/origin-rules/create-api/) and the [API parameter reference](/rules/origin-rules/parameters/#sni-override-parameters).

{{<Aside type="note" header="Notes">}}
* Currently, you can only use a static value in an SNI Override.
* An SNI Override will take precedence over [SNI rewrites of custom origins](/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/custom-origin/#sni-rewrites) when using Cloudflare for SaaS.
{{</Aside>}}

[^1]: SNI allows a server to host multiple TLS Certificates for multiple websites using a single IP address. SNI adds the website hostname in the TLS handshake to inform the server which website to present when using shared IPs.