---
title: Get started
pcx_content_type: how-to
weight: 2
meta:
  title: Get started with Network Analytics v2
---

# Get started with Network Analytics

{{<Aside type="note" header="Requirements">}}
Network Analytics v2 requires the following:

- A Cloudflare Enterprise plan.
- Cloudflare Magic Transit or Spectrum.
  {{</Aside>}}

## View the Network Analytics dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select an account that has access to Magic Transit or Spectrum.
2. On the account’s **Home** page, navigate to **Analytics** > **Network Analytics**.

## Get Network Analytics data via API

Use the [GraphQL Analytics API](/analytics/graphql-api/) to query data using the available [Network Analytics v2 nodes](/analytics/graphql-api/features/data-sets/#available-datasets).

## Send Network Analytics logs to a third-party service

[Create a Logpush job](/logs/get-started/enable-destinations/) that sends Network analytics logs to your storage service, SIEM, or log management provider.
