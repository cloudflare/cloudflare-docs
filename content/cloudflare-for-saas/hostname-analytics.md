---
pcx_content_type: reference
title: Analytics
weight: 7
---

# Analytics

You can use custom hostname analytics for two general purposes: exploring how your customers use your product and sharing the benefits provided by Cloudflare with your customers.

These analytics include **Site Analytics**, **Bot Analytics**, **Cache Analytics**, **Firewall Analytics**, and [any other datasets](/analytics/graphql-api/features/data-sets/) with the `clientRequestHTTPHost` field.

{{<Aside type="note">}}

The plan of your Cloudflare for SaaS application determines the analytics available for your custom hostnames.

{{</Aside>}}

## Explore customer usage

Use custom hostname analytics to help your organization with billing and infrastructure decisions, answering questions like:

- "How many total requests is your service getting?"
- "Is one customer transferring significantly more data than the others?"
- "How many global customers do you have and where are they distributed?"

If you see one customer is using more data than another, you might increase their bill. If requests are increasing in a certain geographic region, you might want to increase the origin servers in that region.

To access custom hostname analytics, either [use the dashboard](https://support.cloudflare.com/hc/articles/360037684111) and filter by the `Host` field or [use the GraphQL API](/analytics/graphql-api/) and filter by the `clientRequestHTTPHost` field. For more details, refer to our tutorial on [Querying HTTP events by hostname with GraphQL](/analytics/graphql-api/tutorials/end-customer-analytics/).

## Share Cloudflare data with your customers

With custom hostname analytics, you can also share site information with your customers, including data about:

- How many pageviews their site is receiving.
- Whether their site has a large percentage of bot traffic.
- How fast their site is.

Build custom dashboards to share this information by specifying an individual custom hostname in `clientRequestHTTPHost` field of [any dataset](/analytics/graphql-api/features/data-sets/) that includes this field.
