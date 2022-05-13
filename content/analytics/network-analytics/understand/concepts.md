---
title: Concepts
pcx-content-type: concept
weight: 2
meta:
  title: Network Analytics concepts
---

# Concepts

## Adaptive Bit Rate sampling

Network Analytics v2 (NAv2) uses [Adaptive Bit Rate (ABR) sampling](https://blog.cloudflare.com/explaining-cloudflares-abr-analytics/). With ABR, every analytics query that supports ABR will be calculated at a resolution matching the query. Depending on the size of your query, the ABR mechanism will choose the best sampling rate and fetch a response from one of the sample tables encapsulated behind each NAv2 node. The cardinality and accuracy are preserved even for historical data.

## Edge Sample Enrichment

Network Analytics v2 can provide accurate data due to the sample rate and to Edge Sample Enrichment.

NAv2 sample rates vary depending on the mitigation service. For example:

* The sample rate for dosd is 1/10,000 packets.
* The sample rate for Magic Firewall events changes dynamically from 1/100 to 1/1,000,000 packets based on the number of packets.
* The sample rate for flowtrackd changes dynamically from 1/100 to 1/10,000 packets based on the volume of packets.

NAv2 uses a data logging pipeline that relies on Edge Sample Enrichment. By delegating the packet sample enrichment and cross-referencing to the edge data centers, the data pipeline’s resilience and tolerance against congestion are improved. Using this method, enriched packet samples are immediately stored in Cloudflare’s core data centers as soon as they arrive.