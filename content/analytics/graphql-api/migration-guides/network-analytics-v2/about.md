---
title: About NAv2
pcx-content-type: concept
weight: 3
meta:
  title: About Network Analytics v2
---

# About Network Analytics v2

## Adaptive Bitrate Sampling

In Network Analytics v1 (NAv1), the data is rolled up into one minute roll-up tables, then one hour roll-ups, and finally one day roll-ups. Users can then query either the `ipFlows1mGroups` node for high-resolution data on traffic and attacks in the past 30 days, or query the `ipFlows1hGroups` or `ipFlows1dGroups` nodes for historical data. However, the data available through these nodes is aggregate data, and that means that the accuracy and cardinality of the results are limited. For example, short traffic spikes will not be visible in the data obtained from these nodes due to the aggregation of samples in the roll-ups.

On the other hand, Network Analytics v2 (NAv2) uses **Adaptive Bitrate (ABR)** sampling. This means that users do not need to choose a node based on their query timeframe. Furthermore, the cardinality and accuracy is preserved even for historical data. Depending on the size of the query, the ABR mechanism will choose the best sampling rate and fetch a response from one of the sample tables encapsulated behind each node.

## Edge Sample Enrichment

Network Analytics v2 provides more accurate data due to the better sampling rate and **Edge Sample Enrichment**. NAv1 samples 1/8,192 packets (that is, one in every 8,192 packets), while NAv2 sampling rates vary depending on the mitigation service. For example, the sampling rate for Magic Firewall events is 1/100 packets, for dosd is 1/10,000 packets, and for flowtrackd it changes dynamically from 1/100 to 1/10,000 packets based on the volume of packets.

The NAv2 data pipeline is also more resilient compared to NAv1. NAv1 uses Core Sample Enrichment, where raw packet samples are sent from all of Cloudflare's edge data centers to the Core data centers. In the Core data centers, the packet samples are cross-referenced with additional databases and infused with the associated customer account ID, attack ID, attack type, and other metadata. Then, the packet samples are inserted into storage. One of the main shortcomings of this method is the potential congestion of samples when cross-referencing information, which could, in rare cases, cause temporary data lag.

To eliminate this potential data lag, NAv2 uses a new data logging pipeline which relies on Edge Sample Enrichment. By delegating the packet sample enrichment and cross-referencing to the edge data centers, we improve the data pipeline's resilience and tolerance against congestion. Using this method, enriched packet samples are immediately stored in Cloudflare's core data centers as soon as they arrive.
