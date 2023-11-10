---
pcx_content_type: changelog
title: Changelog
weight: 20
rss: file
---

# Changelog

## 2023-11-08

### Metadata API changes

Vectorize now supports distinct `returnMetadata` and `returnValues` arguments when querying an index, replacing the now-deprecated `returnVectors` argument. This allows you to return metadata without needing to return the vector values, reducing the amount of unnecessary data returned from a query. Both `returnMetadata` and `returnValues` default to false.

For example, to return only the metadata from a query, set `returnMetadata: true`.

```ts
let matches = await env.YOUR_INDEX.query(queryVector, { topK: 5, returnMetadata: true })
```

New Workers projects created on or after 2023-11-08 or that [update the compatibility date](/workers/configuration/compatibility-dates/) for an existing project will use the new return type.

## 2023-10-03

### Increased indexes per account limits

You can now create up to 100 Vectorize indexes per account. Read the [limits documentation](/vectorize/platform/limits/) for details on other limits, many of which will increase during the beta period.

## 2023-09-27

### Vectorize now in open beta

Vectorize, Cloudflare's vector database, is [now in open beta](https://blog.cloudflare.com/vectorize-vector-database-open-beta/). Vectorize allows you to store and efficiently query vector embeddings from AI/ML models from [Workers AI](/workers-ai/), OpenAI, and other embeddings providers or machine-learning workflows.

To get started with Vectorize, [see the guide](/vectorize/get-started/).
