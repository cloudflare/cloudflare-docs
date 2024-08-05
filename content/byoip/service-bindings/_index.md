---
title: Service bindings
pcx_content_type: concept
weight: 6
---

# IP address service bindings

In the IP management context, service binding refers to the association of an IP (or a range of IPs) to specific Cloudflare services.

Currently, if you have BYOIP configured with [Magic Transit](/magic-transit/), you can use the [service bindings](/api/operations/ip-address-management-service-bindings-list-service-bindings) endpoints to add CDN or Spectrum capabilities on top of Magic Transit.

## API

(Links to the API docs)

## Limitations

(Cannot use both Spectrum _and_ CDN)
(Need to keep Magic Transit as base/ spanning all addresses in the prefix)
(Propagation is not immediate)