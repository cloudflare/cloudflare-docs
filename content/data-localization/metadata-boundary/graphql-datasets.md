---
pcx_content_type: concept
title: GraphQL datasets 
layout: wide
weight: 2
---

# GraphQL datasets supported

The table below shows a non-exhaustive list of GraphQL Analytics API fields that respect CMB configuration and are available in both the US and the EU or only in the US. 

{{<table-wrap style="font-size: 87%">}}

| Suite/Category | Product | GraphQL Analytics API Field(s) supported in |
| --- | --- | --- | --- |
| Application Performance | Caching/CDN | US and EU <br> `httpRequestsAdaptive` <br> `httpRequestsAdaptiveGroups` <br> `httpRequestsOverviewAdaptiveGroups` <br> US only <br> `httpRequests1mGroups` <br> `httpRequests1hGroups` <br> `httpRequests1dGroups` | 
| | Cache Reserve | US and EU <br> `cacheReserveOperationsAdaptiveGroups` <br> `cacheReserveRequestsAdaptiveGroups` <br> `cacheReserveStorageAdaptiveGroups` |
| | DNS | US only <br> `dnsAnalyticsAdaptive` <br> `dnsAnalyticsAdaptiveGroups` |
| | Image Resizing | US only <br> `imageResizingRequests1mGroups` <br> `imagesRequestsAdaptiveGroups` <br> `imagesUniqueTransformations` | 
| | Load Balancing | US only <br> [`loadBalancingRequestsAdaptive`](/load-balancing/reference/load-balancing-analytics/#graphql-analytics) <br> [`loadBalancingRequestsAdaptiveGroups`](/load-balancing/reference/load-balancing-analytics/#graphql-analytics) <br> `healthCheckEventsAdaptive` <br> `healthCheckEventsAdaptiveGroups` |
| | Stream Delivery | Same as Caching/CDN |
| | Tiered Caching | US and EU <br> Only the field `upperTierColoName` part of `httpRequestsAdaptive` and `httpRequestsAdaptiveGroups` |
| | Secondary DNS | Same as DNS |
| | Waiting Room | US and EU <br> [`waitingRoomAnalyticsAdaptive`](/waiting-room/waiting-room-analytics/#graphql-analytics) <br> [`waitingRoomAnalyticsAdaptiveGroups`](/waiting-room/waiting-room-analytics/#graphql-analytics) |
| | Web Analytics / Real User Monitoring (RUM) | US only <br> `rumWebVitalsEventsAdaptive` <br> `rumWebVitalsEventsAdaptiveGroups` <br> `rumPerformanceEventsAdaptiveGroups` <br> `rumPageloadEventsAdaptiveGroups` |
| | Zaraz | US and EU <br>`zarazActionsAdaptiveGroups` <br> `zarazTrackAdaptiveGroups` <br> `zarazTriggersAdaptiveGroups` |  |
| Application Security | Advanced Certificate Manager | US and EU <br> Only the fields `clientSSLProtocol` and `ja3Hash` part of `httpRequestsAdaptive` and `httpRequestsAdaptiveGroups` | |
| | Advanced DDoS Protection | US and EU <br> [`dosdAttackAnalyticsGroups`](/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) <br> [`dosdNetworkAnalyticsAdaptiveGroups`](/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) <br> [`flowtrackdNetworkAnalyticsAdaptiveGroups`](/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) <br> `advancedTcpProtectionNetworkAnalyticsAdaptiveGroups` <br> `advancedDnsProtectionNetworkAnalyticsAdaptiveGroups` |
| | API Shield / API Gateway | US and EU <br> [`apiGatewayGraphqlQueryAnalyticsGroups`](/api-shield/security/graphql-protection/configure/#gather-graphql-statistics) <br> `apiGatewayMatchedSessionIDsAdaptiveGroups` <br> US only <br> `apiRequestSequencesGroups` |
| | Bot Management | US and EU <br>`httpRequestsAdaptive` <br> [`httpRequestsAdaptiveGroups`](/analytics/graphql-api/migration-guides/graphql-api-analytics/) <br> [`firewallEventsAdaptive`](/analytics/graphql-api/tutorials/querying-firewall-events/) <br> [`firewallEventsAdaptiveGroups`](https://blog.cloudflare.com/how-we-used-our-new-graphql-api-to-build-firewall-analytics/) | |
| | DNS Firewall | Same as DNS |
| | DMARC Management | US and EU <br> `dmarcReportsAdaptive` <br> `dmarcReportsSourcesAdaptiveGroups` | |
| | Page Shield | US and EU <br> [`pageShieldReportsAdaptiveGroups`](/page-shield/policies/violations/#get-policy-violations-via-graphql-api) |
| | SSL | US and EU <br> Only the fields `clientSSLProtocol` and `ja3Hash` part of `httpRequestsAdaptive` and `httpRequestsAdaptiveGroups` |  |
| | SSL 4 SaaS | US and EU <br> [clientRequestHTTPHost](/cloudflare-for-platforms/cloudflare-for-saas/hostname-analytics/#explore-customer-usage) <br> Refer to [GraphQL Tutorial on querying HTTP events by hostname](/analytics/graphql-api/tutorials/end-customer-analytics/) |
| | Turnstile | US and EU <br> [`turnstileAdaptiveGroups`](/turnstile/turnstile-analytics/#graphql) |
| | WAF/L7 Firewall | US and EU <br> [`firewallEventsAdaptive`](/analytics/graphql-api/tutorials/querying-firewall-events/) <br> [`firewallEventsAdaptiveGroups`](https://blog.cloudflare.com/how-we-used-our-new-graphql-api-to-build-firewall-analytics/) <br> `firewallEventsAdaptiveByTimeGroups` |
| Developer Platform | Cloudflare Images | US only <br> `imagesRequestsAdaptiveGroups` |
| | Cloudflare Pages | US only <br> `pagesFunctionsInvocationsAdaptiveGroups` <br> | 
| | Durable Objects | US only <br> [`durableObjectsInvocationsAdaptiveGroups`](/durable-objects/observability/graphql-analytics/) <br> [`durableObjectsPeriodicGroups`](/durable-objects/observability/graphql-analytics/) <br> [`durableObjectsStorageGroups`](/durable-objects/observability/graphql-analytics/) <br> [`durableObjectsSubrequestsAdaptiveGroups`](/durable-objects/observability/graphql-analytics/) |
| | Email Routing | US and EU <br> `emailRoutingAdaptive` <br> `emailRoutingAdaptiveGroups` | | 
| | R2 | US and EU <br> `r2OperationsAdaptiveGroups` <br> `r2StorageAdaptiveGroups` | | 
| | Stream | US only <br> [`streamMinutesViewedAdaptiveGroups`](/stream/getting-analytics/fetching-bulk-analytics/) <br> [`videoPlaybackEventsAdaptiveGroups`](/stream/getting-analytics/fetching-bulk-analytics/) <br> [`videoBufferEventsAdaptiveGroups`](/stream/getting-analytics/fetching-bulk-analytics/) <br> [`videoQualityEventsAdaptiveGroups`](/stream/getting-analytics/fetching-bulk-analytics/) |
| | Workers (deployed on a Zone) | US and EU <br> `workerPlacementAdaptiveGroups` <br> `workersAnalyticsEngineAdaptiveGroups` <br> US only <br> `workersZoneInvocationsAdaptiveGroups` <br> `workersZoneSubrequestsAdaptiveGroups` <br> `workersOverviewRequestsAdaptiveGroups` <br> `workersOverviewDataAdaptiveGroups` <br> [`workersInvocationsAdaptive`](/analytics/graphql-api/tutorials/querying-workers-metrics/) <br> `workersInvocationsScheduled` <br> `workersSubrequestsAdaptiveGroups` |
| Network Services | Network Error Logging (NEL) / Edge Reachability / Last Mile Insights | US only <br> `nelReportsAdaptiveGroups` |
| | Magic Firewall |  US only <br> [`magicFirewallSamplesAdaptiveGroups`](/magic-firewall/tutorials/graphql-analytics/) <br> [`magicFirewallNetworkAnalyticsAdaptiveGroups`](/magic-firewall/tutorials/graphql-analytics/#example-queries-for-magic-firewall) | 
| | Magic Network Monitoring | US only <br> [`mnmFlowDataAdaptiveGroups`](/magic-network-monitoring/tutorials/graphql-analytics/) |
| | Magic Transit | US only <br> [`magicTransitNetworkAnalyticsAdaptiveGroups`](/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) <br> [`flowtrackdNetworkAnalyticsAdaptiveGroups`](/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) <br> [`magicTransitTunnelHealthChecksAdaptiveGroups`](/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-healthcheck-results/) <br> [`magicTransitTunnelTrafficAdaptiveGroups`](/magic-transit/analytics/query-bandwidth/) |
| | Magic WAN | US and EU <br> `MagicWANConnectorMetricsAdaptiveGroups` |
| | Spectrum | US and EU <br> [`spectrumNetworkAnalyticsAdaptiveGroups`](/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) |
| Platform | GraphQL Analytics API | US and EU <br> [All GraphQL Analytics API datasets](/analytics/graphql-api/features/discovery/introspection/) | 
| | Logpush | US only <br> [`logpushHealthAdaptiveGroups`](/logs/get-started/alerts-and-analytics/#enable-logpush-health-analytics) <br> |
| Zero Trust | Access | US and EU <br> [`accessLoginRequestsAdaptiveGroups`](/analytics/graphql-api/tutorials/querying-access-login-events/) | |
| | Browser Isolation | US and EU <br> Only the field `isIsolated` part of `gatewayL7RequestsAdaptiveGroups`  |
| | DLP | Part of Gateway HTTP / Gateway L7 |
| | Gateway | US and EU <br> `gatewayL7RequestsAdaptiveGroups` <br> `gatewayL4SessionsAdaptiveGroups` <br> `gatewayResolverQueriesAdaptiveGroups` <br> `gatewayResolverByCategoryAdaptiveGroups` <br> `gatewayResolverByRuleExecutionPerformanceAdaptiveGroups` <br> US only <br> `gatewayL4DownstreamSessionsAdaptiveGroups` <br> `gatewayL4UpstreamSessionsAdaptiveGroups` |
| | WARP | US and EU <br> `warpDeviceAdaptiveGroups` | |

{{</table-wrap>}}
