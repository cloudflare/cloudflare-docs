---
pcx_content_type: how-to
title: Analytics and logs
weight: 4
---

# Analytics and logs

When you use Cloudflare DNS, you can access data about DNS queries through a variety of sources.

## Analytics

DNS analytics allow you to evaluate aggregate data about DNS queries to your zone.

{{<Aside type="note">}}
If you have [Foundation DNS](/dns/foundation-dns/) and advanced nameservers are enabled, analytics for your zone are available in **DNS** > **Analytics**. Refer to [GraphQL DNS analytics](/dns/foundation-dns/graphql-analytics/) for details.
{{</Aside>}}

For a quick summary, view your DNS analytics in the dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select your zone.
3. Go to **Analytics** > **DNS**.

For more detailed metrics, you can use the [DNS analytics operation](/api/operations/dns-analytics-table) along with the available [Analytics API properties](/dns/reference/analytics-api-properties/).

## Logs

Logs let Enterprise customers view [detailed information](/logs/reference/log-fields/zone/dns_logs/) about individual DNS queries.

For help setting up Logpush, refer to [Get started with Logs](/logs/get-started/).