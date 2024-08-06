---
title: Service bindings
pcx_content_type: concept
weight: 6
---

# IP address service bindings

Within IP address management, service binding refers to the association of an IP (or a range of IPs) to specific Cloudflare services.

## Scope

Currently, if you have BYOIP configured with [Magic Transit](/magic-transit/), you can use the [service bindings](/api/operations/ip-address-management-service-bindings-list-service-bindings) endpoints to add CDN or Spectrum capabilities on top of Magic Transit.

### CDN (Cache)

Adding the CDN service binding ensures that any HTTP requests received via designated IPs are directed into the CDN pipeline for [Layer 7 processing](/fundamentals/concepts/how-cloudflare-works/#how-cloudflare-works-as-a-reverse-proxy) as they land on the Cloudflare network.

Refer to [Use BYOIP with Magic Transit and CDN](/byoip/service-bindings/magic-transit-with-cdn/) to learn how to set this up.

### Spectrum

## API

(Links to the API docs)

## Limitations

(Cannot use both Spectrum _and_ CDN)
(Need to keep Magic Transit as base/ spanning all addresses in the prefix)
(Propagation is not immediate)