---
pcx_content_type: concept
title: Observability
---

# Observability

## Logs

Learn how to access logs with Workers for Platforms.

### Workers Trace Events Logpush

Workers Trace Events logpush is used to get raw Workers execution logs. Refer to [Logpush](/workers/platform/logpush/) for more information.

Logpush can be enabled for an entire namespace or a single Worker. To capture logs for all of the user Workers in your namespace:

1. [Create a Logpush job](/workers/platform/logpush/#create-a-logpush-job) for your account.
2. [Enable logging](/workers/platform/logpush/#enable-logging-on-your-worker) on your dispatch Worker.

Logs for both the dispatch Worker and for any user Workers are collected. Logs are automatically collected for all new Workers added to a dispatch namespace.

All logs will get forwarded to the Logpush job that you have setup for your account. Logpush filters can be used on the `Outcome` or `Script Name` field to include or exclude specific values or send logs to different destinations. 

## Analytics

There are two ways for you to review your Workers for Platforms analytics.

### Workers Analytics Engine

[Workers Analytics Engine](/analytics/analytics-engine/) can be used with Workers for Platforms to provide analytics to end users. It can be used to expose events relating to a Workers invocation or custom user-defined events. Platforms can write/query events by script tag to get aggregates over a user’s usage. 

### GraphQL Analytics API

Use Cloudflare’s [GraphQL Analytics API](/analytics/graphql-api) to get metrics relating to your Dispatch Namespaces. Use the `dispatchNamespaceName` dimension in the `workersInvocationsAdaptive` node to query usage by namespace.
