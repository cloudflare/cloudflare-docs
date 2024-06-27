---
pcx_content_type: how-to
title: Breakout traffic
meta:
    description: Breakout traffic allows you to define which applications should bypass Cloudflare’s security filtering.
---

# Breakout traffic

Breakout traffic allows you to define which applications should bypass Cloudflare’s security filtering, and go directly to the Internet. It works via DNS requests inspection. This means that if your network is caching DNS requests, Breakout traffic will only take effect after you cache entries expire, and your client issues a new DNS request that the Magic WAN Connector can detect. This can take several minutes.

Breakout traffic will not work for applications that use DNS-over-HTTPs.

{{<Aside type="note">}}

We recommend routing all traffic through our global network for comprehensive security filtering and access controls, but there may be specific cases where you want a subset of traffic to bypass Cloudflare’s security filtering and route directly to the Internet. You can scope this breakout traffic to specific applications from the Cloudflare dashboard.

Refer to [Traffic steering](/magic-wan/reference/traffic-steering/) to learn how Cloudflare routes traffic.
{{</Aside>}}

## Add an application

You need to configure Breakout traffic for each of your existing sites, as it is a per-site configuration.

{{<render file="connector/app-aware-policies/_add-app.md" withParameters="Breakout traffic" >}}

6. Select one or more applications that should bypass Cloudflare filtering from the list. You can also use the search box.
7. Select **Add applications**.

The traffic for that application will now go directly to the Internet and bypass Cloudflare filtering.

## Delete an application

{{<render file="connector/app-aware-policies/_delete-app.md" withParameters="Breakout traffic" >}}