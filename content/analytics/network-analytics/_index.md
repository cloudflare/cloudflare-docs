---
title: Cloudflare Network Analytics
pcx_content_type: overview
weight: 3
meta:
  title: Cloudflare Network Analytics v2
layout: single
---

# Cloudflare Network Analytics

Cloudflare Network Analytics v2 provides near real-time visibility into network and transport-layer traffic patterns and DDoS attacks. Network Analytics visualizes packet and bit-level data, the same data available via the Network Analytics v2 dataset of the GraphQL Analytics API.

{{<render file="_network-analytics-requirements.md">}}

For a technical deep-dive into Network Analytics v2, refer to our [blog post](https://blog.cloudflare.com/building-network-analytics-v2/).

## Remarks

The Network Analytics logs refer to IP traffic of Magic Transit customer prefixes/leased IP addresses or Spectrum applications. These logs are not directly associated with the [zones](/fundamentals/get-started/concepts/accounts-and-zones/#zones) in your Cloudflare account.

## Related resources

* [Cloudflare GraphQL API](/analytics/graphql-api/)
* [Migrating from Network Analytics v1 to Network Analytics v2](/analytics/graphql-api/migration-guides/network-analytics-v2/)
* [Cloudflare Network Analytics v1](/analytics/network-analytics/reference/network-analytics-v1/)
