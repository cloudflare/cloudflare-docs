---
pcx-content-type: reference
title: GraphQL billing analytics
---

# GraphQL billing analytics

For a detailed breakdown of billing of minutes viewed for your account, you can use GraphQL to view Billing Analytics for Stream. Before you can view the billing analytics, you must have Account Analytics Read permission.

For additional information on using GraphQL, refer to [Get started with GraphQL Analytics API](/analytics/graphql-api/getting-started/).

## Available metrics

{{<table-wrap>}}

| Metric            | Description    |
| ----------------- | -------------- |
| date | The date the event occurerd at Cloudflare's edge. |
| datetime | The date and time the event occurred at Cloudflare's edge. |
| mediaType | The source of the minutes viewed. |
| UID | A video's unique ID. |

{{</table-wrap>}}
