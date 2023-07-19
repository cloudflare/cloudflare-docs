---
title: Concepts
pcx_content_type: concept
weight: 2
meta:
  title: Network Analytics v2 concepts
---

# Concepts

## Adaptive Bit Rate sampling

With Adaptive Bit Rate (ABR) sampling, every analytics query that supports ABR will be calculated at a resolution matching the query. Depending on the size of your query, the ABR mechanism will choose the best sampling rate and fetch a response from one of the sample tables encapsulated behind each [Network Analytics v2 node](/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/). The cardinality and accuracy are preserved even for historical data.

For more background information on Adaptive Bit Rate sampling, refer to the [Explaining Cloudflare's ABR Analytics](https://blog.cloudflare.com/explaining-cloudflares-abr-analytics/) blog post.

## Edge Sample Enrichment

Network Analytics v2 (NAv2) can provide accurate data due to the sample rate and to Edge Sample Enrichment.

NAv2 sample rates vary depending on the mitigation service. For example:

* The sample rate for `dosd` changes dynamically from 1/100 to 1/10,000 packets based on the volume of packets.
* The sample rate for Magic Firewall events changes dynamically from 1/100 to 1/1,000,000 packets based on the number of packets.
* The sample rate for `flowtrackd` is 1/10,000 packets.

NAv2 uses a data logging pipeline that relies on Edge Sample Enrichment. By delegating the packet sample enrichment and cross-referencing to the edge data centers, the data pipeline’s resilience and tolerance against congestion are improved. Using this method, enriched packet samples are immediately stored in Cloudflare’s core data centers as soon as they arrive.
