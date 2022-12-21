---
pcx_content_type: concept
title: Analytics
---

# Analytics

There are two ways for you to review your Workers for Platforms analytics.

## Workers Analytics Engine

[Workers Analytics Engine](/analytics/analytics-engine/) can be used with Workers for Platforms to provide analytics to end users. It can be used to expose events relating to a Workers invocation or custom user-defined events. Platforms can write/query events by script tag to get aggregates over a user’s usage. 

## GraphQL Analytics API

Use Cloudflare’s [GraphQL Analytics API](/analytics/graphql-api) to get metrics relating to your Dispatch Namespaces. Use the `dispatchNamespaceName` dimension in the `workersInvocationsAdaptive` node to query usage by namespace.
