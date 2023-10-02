---
title: Overview
pcx_content_type: concept
weight: 1
meta:
  title: Data Localization Suite
---

# Data Localization Suite

The Data Localization Suite (DLS) is a collection of tools that enable customers to choose the location where Cloudflare inspects and stores data, while maintaining the security and performance benefits of our global network.

{{<Aside type="note">}}

This feature is available as a paid add-on for customers on the Enterprise plan. Reach out to your Customer Success Manager for more information.

{{</Aside>}}

The Data Localization Suite consists of the following products:

- [Key Management](/data-localization/key-management/)
- [Regional Services](/data-localization/regional-services/)
- [Customer Metadata Boundary](/data-localization/metadata-boundary/)

Support by product and region is summarized in the following table:

| Region | Geo Key Manager | Regional Services | Customer Metadata Boundary |
| --- | --- | --- | --- |
| US | &#x2705; | &#x2705; | &#x2705; |
| EU | &#x2705; | &#x2705; | &#x2705; |
| UK | &#x2705;{{<fnref num="25">}} | &#x2705; | Can use EU metadata boundary. |
| Canada | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |
| Australia | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |
| Japan | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |
| India | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |
| ISO 27001 Certified European Union | &#x2705;{{<fnref num="25">}} | &#x2705; | Can use EU metadata boundary. |
| Germany | &#x2705;{{<fnref num="25">}} | &#x2705; | Can use EU metadata boundary. |
| Singapore | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |
| South Korea | &#x2705;{{<fnref num="25">}} | &#x2705; | ✘ |

Overview by product-behavior is summarized in the following table. Below you can find the table legend to help you read the table:

✅ Product works with no caveats <br>
🚧 Product can be used with some caveats <br>
✘ Product cannot be used/ not available <br>
⚫️ Not applicable <br>
**Respects CMB**: indicates whether enabling Customer Metadata Boundary impacts the dataset. If present, messages do not leave the target region (for the accounts that are configured); logs are essentially dropped based on CMB config. <br>
**US and EU**: means that the dataset respects Customer Metadata Boundary and is available in both the US and the EU.

{{<tabs labels="Application Performance | Application Security | Developer Platform | Network Services | Platform | Zero Trust">}}
{{<tab label="application performance" no-code="true">}}

 Product | Geo Key Manager | Regional Services | Customer Metadata Boundary | GraphQL Analytics API Field(s) | Logpush |
| --- | --- | --- | --- | --- | --- |
| Caching/CDN | ✅ | ✅ | ✅ | US and EU `httpRequestsAdaptive` `httpRequestsAdaptiveGroups` | US and EU [HTTP requests](/logs/reference/log-fields/zone/http_requests/) |
| Cache Reserve | ⚫️ | 🚧{{<fnref num="8">}} | ✅ | US and EU `cacheReserveOperationsAdaptiveGroups` `cacheReserveRequestsAdaptiveGroups` `cacheReserveStorageAdaptiveGroups` | US and EU <br> Only the field `CacheReserveUsed` in HTTP requests. |
| DNS | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} | US only `dnsAnalyticsAdaptive` `dnsAnalyticsAdaptiveGroups` | US only and Respects CMB [DNS Logs](/logs/reference/log-fields/zone/dns_logs/) |
| Secondary DNS | ⚫ | ⚫{{<fnref num="26">}} | 🚧{{<fnref num="1">}} | Same as DNS. | Same as DNS. |
| Image Resizing | ✅ | ✅ | 🚧{{<fnref num="1">}} | US only `imageResizingRequests1mGroups` | ✘
| Load Balancing | ✅ | ✅ | 🚧{{<fnref num="1">}} | US only [`loadBalancingRequestsAdaptive`](/load-balancing/reference/load-balancing-analytics/#graphql-analytics) [`loadBalancingRequestsAdaptiveGroups`](/load-balancing/reference/load-balancing-analytics/#graphql-analytics) | ✘
| Stream Delivery | ✅ | ✅ | ✅ | Same as CDN. | US and EU Part of HTTP requests |
| Tiered Caching | ✅ | 🚧{{<fnref num="2">}} | 🚧{{<fnref num="2">}} | US and EU <br> Only the field `upperTierColoName` part of `httpRequestsAdaptive` and `httpRequestsAdaptiveGroups` | US and EU [HTTP requests](/logs/reference/log-fields/zone/http_requests/) |
| Waiting Room | ⚫️ | ✅ | ✅ | US and EU [`waitingRoomAnalyticsAdaptive`](/waiting-room/waiting-room-analytics/#graphql-analytics) [`waitingRoomAnalyticsAdaptiveGroups`](/waiting-room/waiting-room-analytics/#graphql-analytics)| ✘
| Web Analytics / Real User Monitoring (RUM) | ⚫️ | ⚫️ | ✘{{<fnref num="27">}} | US only `rumWebVitalsEventsAdaptive` `rumWebVitalsEventsAdaptiveGroups` `rumPerformanceEventsAdaptiveGroups` `rumPageloadEventsAdaptiveGroups` | ✘
| Zaraz | ✅ | ✅ | ✅ | US and EU `zarazActionsAdaptiveGroups` `zarazTrackAdaptiveGroups` `zarazTriggersAdaptiveGroups` | ✘

{{</tab>}}
{{<tab label="application security" no-code="true">}}

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary | GraphQL Analytics API Field(s) | Logpush |
| --- | --- | --- | --- | --- | --- |
| Advanced Certificate Manager | ⚫️ | ⚫️ | ⚫️ | ✘ | ✘
| Advanced DDoS Protection | ✅ | ✅ | 🚧{{<fnref num="3">}} | US only `dosdAttackAnalyticsGroups` `dosdNetworkAnalyticsAdaptiveGroups` `flowtrackdNetworkAnalyticsAdaptiveGroups` |  US only and Respects CMB [Network Analytics Logs](/logs/reference/log-fields/account/network_analytics_logs/) |
| API Shield | ✅ | ✅ | ✘{{<fnref num="4">}} | US and EU [`apiGatewayGraphqlQueryAnalyticsGroups`](/api-shield/security/graphql-protection/configure/#gather-graphql-statistics) `apiGatewayMatchedSessionIDsAdaptiveGroups` <br> US only `apiRequestSequencesGroups` | US and EU Partially in [HTTP requests](/logs/reference/log-fields/zone/http_requests/) and [Firewall events](/logs/reference/log-fields/zone/firewall_events/) |
| Bot Management | ✅ | ✅ | 🚧{{<fnref num="5">}} | US and EU `httpRequestsAdaptive` [`httpRequestsAdaptiveGroups`](/analytics/graphql-api/migration-guides/graphql-api-analytics/) [`firewallEventsAdaptive`](/analytics/graphql-api/tutorials/querying-firewall-events/) [`firewallEventsAdaptiveGroups`](https://blog.cloudflare.com/how-we-used-our-new-graphql-api-to-build-firewall-analytics/) | US and EU [HTTP requests](/logs/reference/log-fields/zone/http_requests/) |
| DNS Firewall | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} | Same as DNS | US only and Respects CMB [DNS Firewall Logs](/logs/reference/log-fields/account/dns_firewall_logs/) |
| Page Shield | ✅ | ✅ | ✅ | US and EU [`pageShieldReportsAdaptiveGroups`](/page-shield/policies/violations/#get-policy-violations-via-graphql-api) | US only and Respects CMB |
| Rate Limiting | ✅ | ✅ | 🚧{{<fnref num="1">}} | ✘ | US and EU Partially in Firewall events. |
| SSL | ✅ | ✅ | ✅ | US and EU <br> Only the fields `clientSSLProtocol` and `ja3Hash` part of `httpRequestsAdaptive` and `httpRequestsAdaptiveGroups` | US and EU [HTTP requests](/logs/reference/log-fields/zone/http_requests/) |
| Cloudflare for SaaS | ✘ | ✅ | ✅ | US and EU [`clientRequestHTTPHost`](/cloudflare-for-platforms/cloudflare-for-saas/hostname-analytics/#explore-customer-usage) ([GraphQL Tutorial](/analytics/graphql-api/tutorials/end-customer-analytics/)) | US and EU [HTTP requests](/logs/reference/log-fields/zone/http_requests/) |
| Turnstile | ⚫️ | ✘ | ✅ | US and EU [`turnstileAdaptiveGroups`](/turnstile/reference/turnstile-analytics/#graphql) | ✘ |
| WAF/L7 Firewall | ✅ | ✅ | ✅ | US and EU [`firewallEventsAdaptive`](/analytics/graphql-api/tutorials/querying-firewall-events/) [`firewallEventsAdaptiveGroups`](https://blog.cloudflare.com/how-we-used-our-new-graphql-api-to-build-firewall-analytics/) [`firewallEventsAdaptiveByTimeGroups`](/logs/reference/change-notices/2023-02-01-security-fields-updates/) | US and EU [Firewall events](/logs/reference/log-fields/zone/firewall_events/) |
| DMARC Management | ⚫️ | ⚫️ | ✅ | US and EU `dmarcReportsAdaptive` `dmarcReportsSourcesAdaptiveGroups` | ✘ |

{{</tab>}}
{{<tab label="developer platform" no-code="true">}}

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary | GraphQL Analytics API Field(s) | Logpush |
| --- | --- | --- | --- | --- | --- |
| Cloudflare Images | ⚫️ | ✘ | ✘ | US only `imagesRequestsAdaptiveGroups` | ✘ |
| Cloudflare Pages | ✘ | ✅{{<fnref num="11">}} | 🚧{{<fnref num="1">}} |  US only `pagesFunctionsInvocationsAdaptiveGroups` (Page Functions) | ✘ |
| D1 | ⚫️ | ⚫️ | ✅ | US and EU [`d1AnalyticsAdaptiveGroups`](/d1/platform/metrics-analytics/#query-via-the-graphql-api) | ✘ |
| Durable Objects | ⚫️ | ✅{{<fnref num="7">}} | 🚧{{<fnref num="1">}} | US only [`durableObjectsInvocationsAdaptiveGroups`](/durable-objects/platform/graphql-analytics/) [`durableObjectsPeriodicGroups`](/durable-objects/platform/graphql-analytics/) [`durableObjectsStorageGroups`](/durable-objects/platform/graphql-analytics/) [`durableObjectsSubrequestsAdaptiveGroups`](/durable-objects/platform/graphql-analytics/) | ✘ | 
| Email Routing | ⚫️ | ⚫️ | ✅ | US and EU `emailRoutingAdaptive` `emailRoutingAdaptiveGroups` | ✘
| R2 | ⚫️ | 🚧{{<fnref num="32">}} | ✅{{<fnref num="33">}} | US and EU `r2OperationsAdaptiveGroups` `r2StorageAdaptiveGroups` | ✘ |
| Stream | ⚫️ | ✘ | ✘ | US only [`streamMinutesViewedAdaptiveGroups`](/stream/getting-analytics/fetching-bulk-analytics/) [`videoPlaybackEventsAdaptiveGroups`](/stream/getting-analytics/fetching-bulk-analytics/) [`videoBufferEventsAdaptiveGroups`](/stream/getting-analytics/fetching-bulk-analytics/) [`videoQualityEventsAdaptiveGroups`](/stream/getting-analytics/fetching-bulk-analytics/) | ✘ |
| Workers | ✅{{<fnref num="39">}} | ✅{{<fnref num="36">}}  | 🚧{{<fnref num="1">}} | US and EU [`workersAnalyticsEngineAdaptiveGroups`](/analytics/analytics-engine/get-started/#4-query-data-using-graphql-and-sql-api) `workerPlacementAdaptiveGroups` <br> US only [`workersInvocationsAdaptive`](/analytics/graphql-api/tutorials/querying-workers-metrics/) `workersInvocationsScheduled` `workersSubrequestsAdaptiveGroups` | US only and Respects CMB [Workers Trace Events](/logs/reference/log-fields/account/workers_trace_events/) |
| Workers KV | ⚫️ | ✘ | ✘ | ✘ | ✘ |

{{</tab>}}
{{<tab label="network services" no-code="true">}}

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary | GraphQL Analytics API Field(s) | Logpush |
| --- | --- | --- | --- | --- | --- |
| Aegis (Egress IP) | ⚫️ | ⚫️{{<fnref num="28">}} | ⚫️ | ✘ | US and EU <br> Only the field `EdgeServerIP` part of [HTTP requests](/logs/reference/log-fields/zone/http_requests/) |
| Argo Smart Routing | ✅ | ✘{{<fnref num="9">}} | ✘{{<fnref num="10">}} | ✘ | US and EU Partially in [HTTP requests](/logs/reference/log-fields/zone/http_requests/) |
| BYOIP | ⚫️ | ✅ | ⚫️ | ✘ | ✘ |
| Network Error Logging (NEL) / Edge Reachability / Last Mile Insights | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} | US only `nelReportsAdaptiveGroups` | US only <br> [NEL reports](/logs/reference/log-fields/zone/nel_reports/) |
| Magic Firewall | ⚫️ | ⚫️{{<fnref num="35">}} | 🚧{{<fnref num="1">}} | US only [`magicFirewallSamplesAdaptiveGroups`](/magic-firewall/tutorials/graphql-analytics/) [`magicFirewallNetworkAnalyticsAdaptiveGroups`](/magic-firewall/tutorials/graphql-analytics/#example-queries-for-magic-firewall) | US only and Respects CMB [Magic IDS Detections](/logs/reference/log-fields/account/magic_ids_detections/) and [Network Analytics Logs](/logs/reference/log-fields/account/network_analytics_logs/) |
| Magic Network Monitoring | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} | US and EU [`mnmFlowDataAdaptiveGroups`](/magic-network-monitoring/tutorials/graphql-analytics/) | ✘
| Magic Transit | ⚫️ | ⚫️{{<fnref num="35">}} | 🚧{{<fnref num="1">}} | US only [`magicTransitNetworkAnalyticsAdaptiveGroups`](/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) [`flowtrackdNetworkAnalyticsAdaptiveGroups`](/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) [`magicTransitTunnelHealthChecksAdaptiveGroups`](/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-healthcheck-results/) [`magicTransitTunnelTrafficAdaptiveGroups`](/magic-transit/analytics/query-bandwidth/) | US only and Respects CMB [Network Analytics Logs](/logs/reference/log-fields/account/network_analytics_logs/) | 
| Magic WAN | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} | US and EU `MagicWANConnectorMetricsAdaptiveGroups` | US only and Respects CMB [Network Analytics Logs](/logs/reference/log-fields/account/network_analytics_logs/) | 
| Spectrum | ✅ | ✅{{<fnref num="34">}}  | 🚧{{<fnref num="1">}} | US only [`spectrumNetworkAnalyticsAdaptiveGroups`](/analytics/graphql-api/migration-guides/network-analytics-v2/node-reference/) | US only and Respects CMB [Spectrum events](/logs/reference/log-fields/zone/spectrum_events/) |

{{</tab>}}
{{<tab label="platform" no-code="true">}}

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary | GraphQL Analytics API Field(s) | Logpush |
| --- | --- | --- | --- | --- | --- |
| Audit Logs | ⚫️ | ✅ | ⚫️{{<fnref num="29">}} | ✘ |  US only <br> [Audit logs](/logs/reference/log-fields/account/audit_logs/) | 
| GraphQL Analytics API | ⚫️ | ⚫️ | 🚧{{<fnref num="30">}} | [All GraphQL Analytics API datasets](m/analytics/graphql-api/features/discovery/introspection/) | ⚫️ |
| Instant Logs | ⚫️ | ✅ | ✅{{<fnref num="31">}} | ⚫️ | ⚫️ | 
| Logpull | ⚫️ | ⚫️ | 🚧{{<fnref num="12">}} | ⚫️ | ⚫️{{<fnref num="37">}} |
| Logpush | ⚫️ | ✅ | 🚧{{<fnref num="13">}} | US only [`logpushHealthAdaptiveGroups`](/logs/get-started/alerts-and-analytics/#enable-logpush-health-analytics) | [All Logpush datasets](/logs/reference/log-fields/) |

{{</tab>}}
{{<tab label="zero trust" no-code="true">}}

| Product | Geo Key Manager | Regional Services | Customer Metadata Boundary | GraphQL Analytics API Field(s) | Logpush |
| --- | --- | --- | --- | --- | --- |
| Access | 🚧{{<fnref num="14">}} | 🚧{{<fnref num="15">}} | 🚧{{<fnref num="16">}} | US and EU [`accessLoginRequestsAdaptiveGroups`](/analytics/graphql-api/tutorials/querying-access-login-events/) | US only and Respects CMB (for edge non-identity events) <br> [Access requests](/logs/reference/log-fields/account/access_requests/) |
| Area 1 | ⚫️ | ✅{{<fnref num="23">}} | 🚧{{<fnref num="24">}} | ✘{{<fnref num="38">}}  | ✘{{<fnref num="38">}} |
| Browser Isolation | ⚫️ | 🚧{{<fnref num="17">}} | ✅ | US and EU <br> Only the field `isIsolated` part of `GatewayL7RequestsAdaptiveGroups` datset | US and EU <br> Only the field `IsIsolated` in [Gateway HTTP](/logs/reference/log-fields/account/gateway_http/) |
| CASB | ⚫️ | ⚫️ | ✘ | ✘ | US only <br> [CASB Findings](/logs/reference/log-fields/account/casb_findings/) | 
| Cloudflare Tunnel | ⚫️ | 🚧{{<fnref num="18">}} | ⚫️ | ✘ | US only and Respects CMB <br> Only the field `DestinationTunnelID` in [Zero Trust Network Session Logs](/logs/reference/log-fields/account/zero_trust_network_sessions/) |
| DLP | ⚫️{{<fnref num="19">}} | ⚫️{{<fnref num="19">}} | ✘ | Part of Gateway HTTP / Gateway L7 | ✘ | 
| Gateway | 🚧{{<fnref num="20">}} | 🚧{{<fnref num="21">}} | 🚧{{<fnref num="22">}} | US and EU `gatewayL7RequestsAdaptiveGroups` `gatewayL4SessionsAdaptiveGroups` <br> US only `gatewayL4DownstreamSessionsAdaptiveGroups` `gatewayL4UpstreamSessionsAdaptiveGroups` | US and EU [Gateway HTTP](/logs/reference/log-fields/account/gateway_http/), [Gateway Network](/logs/reference/log-fields/account/gateway_network/), and [Gateway DNS](/logs/reference/log-fields/account/gateway_dns/) <br> US only and Respects CMB [Zero Trust Network Session Logs](/logs/reference/log-fields/account/zero_trust_network_sessions/) | 
| WARP | ⚫️ | ⚫️ | 🚧{{<fnref num="1">}} | US and EU `warpDeviceAdaptiveGroups` | US only <br> [Device posture results](/logs/reference/log-fields/account/device_posture_results/) |

{{</tab>}}
{{</tabs>}}

{{<fnsection>}}
{{<fnentry num="1">}}Logs / Analytics not available outside US region when using Customer Metadata Boundary.{{</fnentry>}}
{{<fnentry num="2">}}Regular and Custom Tiered Cache works; Smart Tiered Caching not available with Regional Services.{{</fnentry>}}
{{<fnentry num="3">}}Network Analytics (including DoS analytics) will not be sent outside the region. However, these are only viewable today in US region.{{</fnentry>}}
{{<fnentry num="4">}}API shield will not yet work with Customer Metadata Boundary enabled outside of US region.{{</fnentry>}}
{{<fnentry num="5">}}Some advanced Enterprise features, including the [Anomaly Detection engine](/bots/concepts/bot-score/#anomaly-detection), are not available.{{</fnentry>}}
{{<fnentry num="7">}}[Jurisdiction restrictions for Durable Objects](/durable-objects/platform/data-location/#restrict-durable-objects-to-a-jurisdiction).{{</fnentry>}}
{{<fnentry num="9">}}Argo cannot be used with Regional Services.{{</fnentry>}}
{{<fnentry num="8">}}You can not yet specify region location for object storage.{{</fnentry>}}
{{<fnentry num="10">}}Argo cannot be used with Customer Metadata Boundary.{{</fnentry>}}
{{<fnentry num="11">}}Only when using [Custom Domain](/pages/platform/custom-domains/) set to a region.{{</fnentry>}}
{{<fnentry num="12">}}Logpull not available when using Customer Metadata Boundary outside US region. Logs may be stored and retrieved with [Logs Engine](https://blog.cloudflare.com/announcing-logs-engine/) which is adding region support in 2023.{{</fnentry>}}
{{<fnentry num="13">}}Logpush available with Customer Metadata Boundary for HTTP requests and Firewall events. Please contact your Customer Success Manager if you need to push another dataset.{{</fnentry>}}
{{<fnentry num="14">}}Access App SSL keys can use Geo Key Manager. [Access JWT](/cloudflare-one/identity/authorization-cookie/validating-json/) is not yet localized.{{</fnentry>}}
{{<fnentry num="15">}}Can be localized to US FedRAMP region only. More regions coming in 2023.{{</fnentry>}}
{{<fnentry num="16">}}Customer Metadata Boundary can be used to limit data transfer outside region, but Access User Logs will not be available outside US region.{{</fnentry>}}
{{<fnentry num="17">}}Currently may only be used with US FedRAMP region.{{</fnentry>}}
{{<fnentry num="18">}}Only US FedRAMP region.{{</fnentry>}}
{{<fnentry num="19">}}Uses Gateway and CASB.{{</fnentry>}}
{{<fnentry num="20">}}You can [bring your own certificate](https://blog.cloudflare.com/bring-your-certificates-cloudflare-gateway/) to Gateway but these cannot yet be restricted to a specific region.{{</fnentry>}}
{{<fnentry num="21">}}Gateway HTTP supports Regional Services. Gateway DNS does not yet support regionalization. <br> ICMP proxy and WARP-to-WARP proxy are not available to Regional Services users.{{</fnentry>}}
{{<fnentry num="22">}}Gateway HTTP and Gateway Network can be used with Customer Metadata Boundary and logs are available via Logpush (logs are still not available in the dashboard when setting the region to the EU).{{</fnentry>}}
{{<fnentry num="23">}}[US, EU and India regions](/email-security/deployment/). <br> For Area 1, this is called the **Processing &amp; Inspection Boundary**.{{</fnentry>}}
{{<fnentry num="24">}}Email metadata (`subject`, `from:`, `to:`) can only be stored in US. <br> Customers have the option to obfuscate  metadata from being viewed by Cloudflare. <br> Email message bodies are only stored for emails that are marked with a disposition (like `MALICIOUS` or `SPAM`).{{</fnentry>}}
{{<fnentry num="25">}}Only supported in [Geo Key Manager v2](/ssl/edge-certificates/geokey-manager/).{{</fnentry>}}
{{<fnentry num="26">}}By default, DNS is unencrypted.{{</fnentry>}}
{{<fnentry num="27">}}Web Analytics collects the minimum amount of information. For more information refer to [Data collection and reporting](/analytics/web-analytics/understanding-web-analytics/data-origin-and-collection/#data-collection-and-reporting).{{</fnentry>}}
{{<fnentry num="28">}}Assigned IPv6 is worldwide. <br> Assigned IPv4 is a single data center location decided by customer.{{</fnentry>}}
{{<fnentry num="29">}}Does not contain Customer Logs, but only logs related to the User accessing their Cloudflare Account as a customer of Cloudflare.{{</fnentry>}}
{{<fnentry num="30">}}Most datasets are supported.{{</fnentry>}}
{{<fnentry num="31">}}Live stream of [HTTP requests](/logs/reference/log-fields/zone/http_requests/) directly from the Cloudflare network.{{</fnentry>}}
{{<fnentry num="32">}}Only when using a [Custom Domain](/r2/buckets/public-buckets/#connect-a-bucket-to-a-custom-domain) set to a region and using [jurisdictions with the S3 API](/r2/reference/data-location/#using-jurisdictions-with-the-s3-api).{{</fnentry>}}
{{<fnentry num="33">}}[Jurisdiction restrictions](/r2/reference/data-location/#jurisdictional-restrictions).{{</fnentry>}}
{{<fnentry num="34">}}HTTPS Spectrum Applications only.{{</fnentry>}}
{{<fnentry num="35">}}No decryption on L3.{{</fnentry>}}
{{<fnentry num="36">}}Only when using [Custom Domain or Route](/workers/configuration/routing/) set to a region. Regional Services will not work with Edgeworker Subrequests.{{</fnentry>}}
{{<fnentry num="37">}}Logpull is considered a legacy feature and we recommend using [Logpush](/logs/about/) or [Logs Engine](/logs/r2-log-retrieval/) instead for better performance and functionality.{{</fnentry>}}
{{<fnentry num="38">}}Review [Reporting](/email-security/reporting/) section.{{</fnentry>}}
{{<fnentry num="39">}}Only when using Custom Domain with a [Custom Certificate](/ssl/edge-certificates/custom-certificates/).{{</fnentry>}}
{{</fnsection>}}
