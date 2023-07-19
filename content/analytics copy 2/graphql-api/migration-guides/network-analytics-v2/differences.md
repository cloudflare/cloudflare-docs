---
title: Main differences
pcx_content_type: concept
weight: 3
meta:
  title: Main differences between Network Analytics v1 and Network Analytics v2
---

# Main differences between Network Analytics v1 and v2

## Aggregated roll-ups versus Adaptive Bit Rate

In Network Analytics v1 (NAv1), the data is rolled up into one minute roll-up tables, then one hour roll-ups, and finally one day roll-ups. Users can then query either the `ipFlows1mGroups` node for high-resolution data on traffic and attacks in the past 30 days, or query the `ipFlows1hGroups` or `ipFlows1dGroups` nodes for historical data. However, the data available through these nodes is aggregate data, and that means that the accuracy and cardinality of the results are limited. For example, short traffic spikes will not be visible in the data obtained from these nodes due to the aggregation of samples in the roll-ups.

On the other hand, Network Analytics v2 (NAv2) uses [Adaptive Bit Rate (ABR)](/analytics/network-analytics/understand/concepts/#adaptive-bit-rate-sampling) sampling. This means that users do not need to choose a node based on their query timeframe. Furthermore, the cardinality and accuracy is preserved even for historical data. Depending on the size of the query, the ABR mechanism will choose the best sampling rate and fetch a response from one of the sample tables encapsulated behind each node.

## Sampling improvements

Network Analytics v2 provides more accurate data due to the better sample rate and [Edge Sample Enrichment](/analytics/network-analytics/understand/concepts/#edge-sample-enrichment). NAv1 samples 1/8,192 packets (that is, one in every 8,192 packets), while NAv2 sample rates vary depending on the mitigation service. For example:

* The sample rate for `dosd` changes dynamically from 1/100 to 1/10,000 packets based on the volume of packets.
* The sample rate for Magic Firewall events changes dynamically from 1/100 to 1/1,000,000 packets based on the number of packets.
* The sample rate for `flowtrackd` is 1/10,000 packets.

The NAv2 data pipeline is also more resilient compared to NAv1. NAv1 uses Core Sample Enrichment, where raw packet samples are sent from all of Cloudflare's edge data centers to the Core data centers. In the Core data centers, the packet samples are cross-referenced with additional databases and infused with the associated customer account ID, attack ID, attack type, and other metadata. Then, the packet samples are inserted into storage. One of the main shortcomings of this method is the potential congestion of samples when cross-referencing information, which could, in rare cases, cause temporary data lag.

To eliminate this potential data lag, NAv2 uses a new data logging pipeline which relies on Edge Sample Enrichment. By delegating the packet sample enrichment and cross-referencing to the edge data centers, we improve the data pipeline's resilience and tolerance against congestion. Using this method, enriched packet samples are immediately stored in Cloudflare's core data centers as soon as they arrive.
