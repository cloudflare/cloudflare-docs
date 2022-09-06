---
pcx_content_type: overview
title: FAQs
weight: 8
meta:
    title: Workers for Platforms - FAQs
---

# FAQs

## Script Limits

For our Workers for Platforms customers, we’re able to provide an unlimited number of scripts. The way we’re able to achieve this is by pruning inactive scripts that are not actively receiving live traffic and requests from our edge to cold storage. That means that once a request is made to a script that’s been pruned, there will be a slight “cold start” for us to fetch the script. Consequent requests will be fast as the script will be cached on our edge, and placed back in hot storage.

## Bindings
Workers bindings (KV, R2, D1, etc.) can be used with the dispatch Worker or any namespaced Workers. 


## Analytics 
Cloudflare's [GraphQL Analytics API](/analytics/graphql-api) can be used to get metrics by Dispatch Namespace. Use the  `dispatchNamespaceName` dimension in the `workersInvocationsAdaptive` node to query usage by namespace.
