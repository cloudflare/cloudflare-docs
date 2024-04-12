---
pcx_content_type: concept
title: GraphQL DNS analytics
weight: 4
---

# GraphQL DNS analytics

With advanced nameservers, analytics accessible by [GraphQL](/analytics/graphql-api/) become available.

Once you [enable advanced nameservers](/dns/foundation-dns/setup/), [update your registrar or parent zone](/dns/nameservers/update-nameservers/), and wait for the time-to-live (TTL) of the previous nameservers to expire, you will be able to use the GraphQL DNS analytics on your zone.

## View on the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **DNS** > **Analytics**.

## Explore with the API

Refer to the GraphQL Analytics API documentation for guidance on how to [get started](/analytics/graphql-api/getting-started/).

The DNS analytics has two [schemas](/analytics/graphql-api/getting-started/querying-basics/):

- `dnsAnalyticsAdaptive`: Retrieve information about individual DNS queries.
- `dnsAnalyticsAdaptiveGroups`: Get reports on aggregate information only.

## Time limits

You can configure a maximum time frame over which analytics can be queried of up to 31 days.