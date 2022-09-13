---
pcx_content_type: faq
title: FAQs
weight: 8
meta:
    title: Workers for Platforms - FAQs
---

# FAQs

## What are the script limits?
Cloudflare provides an unlimited number of scripts for our Workers for Platforms customers. We achieve this is by pruning inactive scripts that are not actively receiving live traffic and requests from our edge to cold storage. That means that once a request is made to a script that’s been pruned, there will be a slight “cold start” for us to fetch the script. Consequent requests will be fast as the script will be cached on our edge and placed back in hot storage.

## What bindings can I use?
You can use Workers bindings (KV, R2, D1, etc.) with the dispatch Worker or any namespaced Workers.

## What analytics are available for Workers for Platforms? 
Use Cloudflare's [GraphQL Analytics API](/analytics/graphql-api) to get metrics by dispatch namespace. Use the  `dispatchNamespaceName` dimension in the `workersInvocationsAdaptive` node to query usage by namespace.
