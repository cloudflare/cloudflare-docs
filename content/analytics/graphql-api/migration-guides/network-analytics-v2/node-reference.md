---
pcx_content_type: reference
title: NAv2 node reference
weight: 4
---

# NAv2 node reference

## Main nodes

Main nodes provide deep packet-level information about traffic and attacks for Spectrum customers and Magic Transit customers.

Use the main node to query traffic and attacks at a high level, as seen at the Cloudflare edge:

| Product       | Main node                                    |
| ------------- | -------------------------------------------- |
| Spectrum      | `spectrumNetworkAnalyticsAdaptiveGroups`     |
| Magic Transit | `magicTransitNetworkAnalyticsAdaptiveGroups` |

To query more specific details about attacks, use the [attack nodes](#attack-nodes).

Each row represents a packet sample. The sample rate of main nodes is 1/10,000 packets.

If you are using both Magic Transit and Spectrum for IP addresses that overlap, you can use only the Magic Transit node.

## Attack nodes

### `dosdAttackAnalyticsGroups`

This node provides information about DDoS attacks detected and mitigated by Cloudflare's main DDoS protection system, the denial of service daemon (`dosd`). This node includes attack metadata such as:

- `startDatetime`
- `endDatetime`
- `attackType`
- `sourceIp`

Each row represents an attack event. Each attack has a unique ID.

The sample rate is dynamic and based on the volume of packets, ranging from 1/100 to 1/10,000 packets.

{{<Aside type="note" header="Adjusting attack mitigation">}}

To adjust mitigation sensitivities and actions, or to define expression filters that exclude or include traffic from mitigation actions, customize the [Network-layer DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/network/).

{{</Aside>}}

### `dosdNetworkAnalyticsAdaptiveGroups`

This node complements the information in the `dosdAttackAnalyticsGroups` node. Provides deep packet-level information about DDoS attack packets mitigated by `dosd`, including fields such as:

- `ipProtocol`
- `ipv4Checksum`
- `ipv4Options`
- `tcpSequenceNumber`
- `tcpChecksum`
- `icmpCode`
- `ruleId`
- `ruleName`
- `attackVector`

Each row represents a packet sample. The sample rate is 1/10,000 packets.

### `flowtrackdNetworkAnalyticsAdaptiveGroups`

This node is only available to Magic Transit customers. Provides metadata about out-of-state TCP DDoS attacks mitigated by `flowtrackd`, Cloudflare’s Advanced TCP Protection system.

`flowtrackd` does not use the following ID fields: attack ID, rule ID, and ruleset ID.

The sample rate is 1/10,000 packets.

### `magicFirewallNetworkAnalyticsAdaptiveGroups`

This node is only available to Magic Transit customers. Provides information about packets that were matched against customer-configured [Magic Firewall](/magic-firewall/) rules.

Each row represents a packet sample that matches a Magic Firewall rule.

Magic Firewall does not use attack IDs, only rule IDs and ruleset IDs.

The sample rate is dynamic and based on the volume of packets, ranging from 1/100 to 1/1,000,000 packets.
