---
order: 13
pcx-content-type: reference
---

# Network Analytics v1 to Network Analytics v2

In early 2020, Cloudflare released the first version of the Network Analytics dashboard and its corresponding API. The second version was made available on September 13, 2021. Users should only use the newer version, Network Analytics v2 (NAv2). **Network Analytics v1 is planned to be deprecated on TBD.**

## Adaptive Bitrate Sampling

In Network Analytics v1 (NAv1), the data is rolled up into one minute roll-up tables, then one hour roll-ups, and finally one day roll-ups. Users can then query either the `ipFlows1mGroups` node for high-resolution data on traffic and attacks in the past 30 days, or query the `ipFlows1hGroups` or `ipFlows1dGroups` nodes for historical data, which came at a cost of cardinality loss and accuracy loss due to the aggregated results. For example, traffic spikes would be lost in historical data due to the aggregation of samples in the roll-ups.

On the other hand, Network Analytics v2 (NAv2) uses Adaptive Bitrate (ABR) sampling. This means that users do not need to choose a node based on their query timeframe. Furthermore, the cardinality and accuracy is preserved even for historical data. Depending on the size of the query, the ABR mechanism will choose the best sampling rate and fetch a response from one of the five tables encapsulated behind each node. The five tables vary based on the packet sampling rate: 1/1, 1/4, 1/16, 1/64, and 1/256.

## Improved resilience and additional advantages

Network Analytics v2 provides more accurate data due to the better sampling rate. NAv1 samples 1/8192 packets (that is, one in every 8192 packets), while NAv2 samples 1/1000 packets.

In addition, the NAv2 data pipeline is more resilient compared to NAv1. NAv1 uses Core Sample Enrichment, where raw packet samples are sent from all of Cloudflare's edge data centers to the Core data centers. In the Core data centers, the packet samples are cross-referenced with additional databases and infused with the associated customer account ID, attack ID, attack type, and additional metadata. Then, the packet samples are stored. One of the main shortcomings of this method is the potential congestion of samples when cross-referencing information.

To eliminate this potential bottleneck, NAv2 uses a new data logging pipeline which relies on Edge Sample Enrichment. By delegating the packet sample enrichment and cross-referencing to the edge data centers, we improve the data pipelines resilience and tolerance against TBD. Using this method, enriched packet samples are immediately stored in Cloudflare's core data centers as soon as they arrive.

## Feature comparison

The following table compares the features of NAv1 and NAv2:

<TableWrap>

| Feature | NAv1 | NAv2 |
|---------|------|------|
| Sampling rate | 1/8192 packets | 1/1000 packets |
| Sampling method | Core sample enrichment | Edge sample enrichment |
| Historical data retention method | Aggregated roll-ups | Adaptive Bitrate |
| Retention period | 1-min roll-ups: 30 days<br/>1-hour roll-ups: 6 months<br/>1-day roll-ups: 1 year<br/>Attack roll-ups: 1 year | All nodes: 90 days |
| Attack mitigation systems | dosd and gatebot | dosd, gatebot, flowtrackd\* and Magic Firewall\* |
| Examples of new fields | n/a | Rule ID<br/>GRE tunnel ID<br/>Packet size |

</TableWrap>

<sup>*</sup> Applicable only for Magic Transit customers.

## Node comparison

NAv2 uses the same API endpoint but makes use of new nodes. While NAv1 has three nodes for aggregated roll-ups for all traffic and attacks, and one node for attacks, NAv2 has one node for all traffic and attacks, and four separate nodes for attacks that vary based on the mitigation system.

<TableWrap>

|                | NAv1 | NAv2 for Magic Transit | NAv2 for Spectrum |
|----------------|------|------------------------|-------------------|
| Main node(s)   | `ipFlows1mGroups`<br/>`ipFlows1hGroups`<br/>`ipFlows1dGroups` | `magicTransitNetworkAnalyticsAdaptiveGroups` | `spectrumNetworkAnalyticsAdaptiveGroups` |
| Attack node(s) | `ipFlows1mAttacksGroups` | `dosdNetworkAnalyticsAdaptiveGroups`<br/> `dosdAttackAnalyticsAdaptiveGroups`<br/> `flowtrackdNetworkAnalyticsAdaptiveGroups`<br/> `magicFirewallNetworkAnalyticsAdaptiveGroups` | `dosdNetworkAnalyticsAdaptiveGroups`<br/> `dosdAttackAnalyticsAdaptiveGroups` |

</TableWrap>

Each row represents one packet sample. The data is sampled at Cloudflare's edge at a rate of 1/1000 packets, and there are five tables that vary based on additional sampling. Therefore, the results need to be multiplied by 1,000 and by the table sample rate. **TBD Is this accurate? How does a user know the table sample rate?**

### Main nodes

Spectrum customers and Magic Transit customers should use the main node to query traffic and attacks in high level:

* Main node (Spectrum customers): `spectrumNetworkAnalyticsAdaptiveGroups`
* Main node (Magic Transit customers): `magicTransitNetworkAnalyticsAdaptiveGroups`

You can use this main node to query all your ingress traffic and attacks as seen at the Cloudflare edge. To query more specific details about attacks, use the attack nodes.

Note: If you are using both Magic Transit and Spectrum for IP addresses that overlap, you can use only the Magic Transit node. **Needs to be verified.**

### Attack nodes

#### `dosdAttackAnalyticsAdaptiveGroups`

Provides information about DDoS attacks detected and mitigated by Cloudflare's main DDoS protection system, the denial of service daemon (dosd). This node includes attack metadata such as:

* `attackStartDateTime`
* `attackEndDatetime`
* `attackType`
* `attackSourceIp`

<Aside type="note">  

You can customize the [L3/4 DDoS Managed Ruleset](https://developers.cloudflare.com/waf/ddos-l34-mitigation) to adjust the mitigation sensitivities and actions, and to define expression filters that exclude or include traffic from mitigation actions.

</Aside>

#### `dosdNetworkAnalyticsAdaptiveGroups`

Complements the information in the `dosdAttackAnalyticsAdaptiveGroups` node. Provides more in-depth packet-level information about the attack such as:

* `ipProtocol`
* `ipv4Checksum`
* `ipv4Options`
* `tcpSequenceNumber`
* `tcpChecksum`
* `icmpCode`

#### `flowtrackdNetworkAnalyticsAdaptiveGroups`

This node is only available to Magic Transit customers. Provides details about advanced TCP attacks that were detected and mitigated by Cloudflare’s TCP Flow Tracking Daemon (flowtrackd).

#### `magicFirewallNetworkAnalyticsAdaptiveGroups`

This node is only available to Magic Transit customers. Provides information about packets that were matched against Magic Firewall rules.

<Aside type="note">

Refer to [NAv1 to NAv2 schema map](/graphql-api/migration-guides/network-analytics-v2/schema-map) for a mapping of schema fields from NAv1 nodes to NAv2 nodes. It is recommended that you follow this mapping to migrate to NAv2.

</Aside>

## Example

TBD