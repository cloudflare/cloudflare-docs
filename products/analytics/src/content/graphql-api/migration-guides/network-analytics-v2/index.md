---
order: 13
type: overview
pcx-content-type: reference
---

# Network Analytics v1 to Network Analytics v2

In early 2020, Cloudflare released the first version of the Network Analytics dashboard and its corresponding API. The second version was made available on September 13, 2021. Users should only use the newer version, Network Analytics v2 (NAv2). Network Analytics v1 (NAv1) is planned to be deprecated on March 31, 2022.

## Before you start

Learn more about the [concepts introduced in Network Analytics v2](/graphql-api/migration-guides/network-analytics-v2/about).

## Feature comparison

The following table compares the features of NAv1 and NAv2:

<TableWrap>

| Feature | NAv1 | NAv2 |
|---------|------|------|
| Sampling rate | 1/8,192 packets | Varies between 1/100 and 1/10,000 packets,<br/> depending on the mitigation service |
| Sampling method | Core Sample Enrichment | [Edge Sample Enrichment](/graphql-api/migration-guides/network-analytics-v2/about#edge-sample-enrichment) |
| Historical data retention method | Aggregated roll-ups | [Adaptive Bitrate](/graphql-api/migration-guides/network-analytics-v2/about#adaptive-bitrate-sampling) |
| Retention period | 1-min roll-ups: 30 days<br/>1-hour roll-ups: 6 months<br/>1-day roll-ups: 1 year<br/>Attack roll-ups: 1 year | All nodes: 90 days |
| Attack mitigation systems | dosd and gatebot | dosd, gatebot, flowtrackd\*, and Magic Firewall\* |
| Examples of new fields | n/a | Rule ID<br/>GRE tunnel ID<br/>Packet size |

</TableWrap>

_* Applicable only for Magic Transit customers._

<Aside type="note">

The `attackId` field value may be different between NAv1 and NAv2 for the same attack.

</Aside>

## Node comparison

NAv2 uses the same API endpoint but makes use of new nodes. While NAv1 has three nodes for aggregated roll-ups for all traffic and attacks, and one node for attacks, NAv2 has one node for all traffic and attacks, and four separate nodes for attacks that vary based on the mitigation system.

<TableWrap>

| Node type      | NAv1 | NAv2 for Magic Transit | NAv2 for Spectrum |
|----------------|------|------------------------|-------------------|
| Main node(s)   | `ipFlows1mGroups`<br/>`ipFlows1hGroups`<br/>`ipFlows1dGroups` | `magicTransitNetworkAnalyticsAdaptiveGroups` | `spectrumNetworkAnalyticsAdaptiveGroups` |
| Attack node(s) | `ipFlows1mAttacksGroups` | `dosdNetworkAnalyticsAdaptiveGroups`<br/> `dosdAttackAnalyticsAdaptiveGroups`<br/> `flowtrackdNetworkAnalyticsAdaptiveGroups`<br/> `magicFirewallNetworkAnalyticsAdaptiveGroups` | `dosdNetworkAnalyticsAdaptiveGroups`<br/> `dosdAttackAnalyticsAdaptiveGroups` |

</TableWrap>

Each row represents one packet sample. The data is sampled at Cloudflare’s edge at [various rates](/graphql-api/migration-guides/network-analytics-v2/node-reference). You can also query the sample rate from the nodes using the `sample_interval` field.

For reference information on NAv2 nodes, refer to the [NAv2 node reference](/graphql-api/migration-guides/network-analytics-v2/node-reference).

## Schema comparison

Refer to [NAv1 to NAv2 schema map](/graphql-api/migration-guides/network-analytics-v2/schema-map) for a mapping of schema fields from NAv1 nodes to NAv2 nodes. Follow this recommended mapping when migrating to NAv2.

## Example

The following example queries the top 20 logs of traffic dropped by mitigation systems different from Magic Firewall within a given time range, ordered by destination IP address.

```graphql
{
  viewer
  {
    accounts(filter: {accountTag: "<REDACTED>"})
    {
      magicTransitNetworkAnalyticsAdaptiveGroups(
        filter: {
          datetime_gt: "2021-10-01T00:00:00Z",
          datetime_lt: "2021-10-05T00:00:00Z",
          outcome_like: "drop",
          mitigationSystem_neq: "magic-firewall"
        },
        limit: 20,
        orderBy: [ipDestinationAddress_ASC])
      {
        dimensions {
          outcome
          mitigationSystem
          ipSourceAddress
          ipDestinationAddress
          ipProtocol
          destinationPort
        }
      }
    }
  }
}
```
