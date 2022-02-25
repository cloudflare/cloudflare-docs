---
order: 40
pcx-content-type: reference
---

# Sampling

## Overview

In a small number of cases, the analytics provided on the Cloudflare dashboard and GraphQL Analytics API are based on a _sample_—a subset of the data set. In these cases, Cloudflare Analytics returns an estimate derived from the sampled value. For example, suppose that during an attack the sampling rate is 10% and 5,000 events are sampled. Cloudflare will estimate 50,000 total events (5,000 × 10) and report this value in Analytics.

## Sampled data sets

Cloudflare Analytics builds the following data sets from sampled data:

<TableWrap>

| Data set                  | Nodes                                                                              |
| :-------------------------| :--------------------------------------------------------------------------------- |
| Firewall Activity Log     | `firewallEventsAdaptive` `firewallEventsAdaptiveByTimeGroups`                      |
| Firewall Analytics        | `firewallEventsAdaptiveGroups`                                                     |
| Firewall Rule Preview     | `firewallRulePreviewGroups`                                                        |
| Network Analytics         | `ipFlows1mGroups`\*<br/> `ipFlows1hGroups`\*<br/> `ipFlows1dGroups`\*<br/> `ipFlows1mAttacksGroups`\* |
| Network Analytics v2<br/> for Magic Transit customers | `magicTransitNetworkAnalyticsAdaptiveGroups`<br/> `dosdNetworkAnalyticsAdaptiveGroups`<br/> `dosdAttackAnalyticsAdaptiveGroups`<br/> `flowtrackdNetworkAnalyticsAdaptiveGroups`<br/> `magicFirewallNetworkAnalyticsAdaptiveGroups` |
| Network Analytics v2<br/> for Spectrum customers<br/> (Enterprise plans only) | `spectrumNetworkAnalyticsAdaptiveGroups`<br/> `dosdNetworkAnalyticsAdaptiveGroups`<br/> `dosdAttackAnalyticsAdaptiveGroups` |
| Workers Metrics           | `workersInvocationsAdaptive`                                                       |
| Magic Firewall Analytics  | `magicFirewallSamplesAdaptiveGroups`                                               |

</TableWrap>

_* These nodes are deprecated. Refer to [Data Sets](/graphql-api/features/data-sets#deprecated-data-nodes) for more information._

The presence of sampled data is called out in the Cloudflare dashboard and in the description of the data set in the API.

## Why sampling is applied

Analytics is designed to provide requested data, at the appropriate level of detail, as quickly as possible. Sampling allows Cloudflare to deliver analytics within seconds, even when data sets scale quickly and unpredictably, such as a burst of Firewall events generated during an attack. And because the volume of underlying data is large, the value estimated from the sample should still be statistically significant–meaning you can rely on sampled data with a high degree of confidence. Without sampling, it might take several minutes or longer to answer a query—a long time to wait when validating mitigation efforts.

## Types of sampling

### Adaptive sampling

Cloudflare almost always uses _adaptive sampling_, which means the sample rate fluctuates depending on the volume of data ingested or queried. If the number of records is relatively small, sampling is not used. However, as the volume of records grows larger, progressively lower sample rates are applied. Firewall Analytics and the Firewall Event Log follow this model. Data nodes that use adaptive sampling are easy to identify by the `Adaptive` suffix in the node name, as in `firewallEventsAdaptive`.

### Fixed sampling

The following data nodes are based on fixed sampling, where the sample rate does not vary:

<TableWrap>

| Data set | Rate | Notes |
| :------- | ---: | :---- |
| Firewall Rules Preview<br /><p><b>Nodes:</b><br />`firewallRulePreviewGroups`</p> | 1% | Use with caution. A 1% sample rate does not provide accurate estimates for data sets smaller than a certain threshold, a scenario the Cloudflare Dashboard calls out explicitly but the API does not. |
| Network Analytics<br /><p><b>Nodes:</b><br />`ipFlows1mGroups`<br />`ipFlows1hGroups`<br />`ipFlows1dGroups`<br />`ipFlows1mAttacksGroups`</p> | 0.012% | Sampling rate is in terms of packet count (1 of every 8,192 packets). |
| Network Analytics v2<br /><p><b>Nodes:</b><br />`dosdNetworkAnalyticsAdaptiveGroups`<br />`dosdAttackAnalyticsAdaptiveGroups`<br />`flowtrackdNetworkAnalyticsAdaptiveGroups`<br />`magicFirewallNetworkAnalyticsAdaptiveGroups`<br />`magicTransitNetworkAnalyticsAdaptiveGroups`<br />`spectrumNetworkAnalyticsAdaptiveGroups`</p> | Depends on the node | Sample rate is 1/100 for Magic Firewall, 1/10,000 for dosd, and dynamic for flowtrackd. Refer to the [NAv2 migration guide](/graphql-api/migration-guides/network-analytics-v2#node-comparison) for details. |

</TableWrap>

## Access to raw data

Because sampling is primarily adaptive and automatically adjusts to provide an accurate estimate, the sampling rate cannot be directly controlled. Enterprise customers have access to raw data via Cloudflare Logs.
