---
title: Get started
pcx_content_type: how-to
weight: 2
meta:
  title: Get started with Network Analytics v2
  description: Learn how to view and use data from Network Analytics v2.
---

# Get started with Network Analytics

{{<render file="_network-analytics-requirements.md">}}

## View the Network Analytics dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select an account that has access to Magic Transit or Spectrum.

2. Go to Account Home > **Analytics & Logs** > **Network Analytics**.

3. Configure the displayed data. You can [adjust the time range](/analytics/network-analytics/configure/time-range/), [select the main metric](/analytics/network-analytics/configure/displayed-data/#select-high-level-metric) (total packets or total bytes), [apply filters](/analytics/network-analytics/configure/displayed-data/#apply-filters), and more.

## Get Network Analytics data via API

Use the [GraphQL Analytics API](/analytics/graphql-api/) to query data using the available [Network Analytics v2 nodes](/analytics/graphql-api/features/data-sets/).

## Send Network Analytics logs to a third-party service

[Create a Logpush job](/logs/get-started/enable-destinations/) that sends Network analytics logs to your storage service, SIEM, or log management provider.
