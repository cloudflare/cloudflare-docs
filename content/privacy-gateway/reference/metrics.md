---
title: Privacy Gateway Metrics
pcx_content_type: reference
weight: 1
---

# Querying Privacy Gateway Metrics
Privacy Gateway now supports enhanced monitoring through our GraphQL API, providing detailed insights into your gateway traffic and performance. To access these metrics, ensure you have:
- A relay gateway proxy implementation where Cloudflare acts as the oblivious relay party.
- An API token with Analytics Read permissions.
We offer two GraphQL nodes to retrieve metrics: `ohttpMetricsAdaptive` and `ohttpMetricsAdaptiveGroups`. The first node provides comprehensive request data, while the second facilitates grouped analytics.

## ohttpMetricsAdaptive
The `ohttpMetricsAdaptive` node is designed for detailed insights into individual OHTTP requests with adaptive sampling. This node can help in understanding the performance and load on your server and client setup.

### Key Arguments
{{<definitions>}}
- `filter` {{<prop-meta>}}required{{</prop-meta>}}
  - Apply filters to narrow down your data set. `accountTag` is a required filter.
- `limit`  {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify the maximum number of records to return.
- `orderBy` {{<prop-meta>}}optional{{</prop-meta>}}
  - Choose how to sort your data, with options for various dimensions and metrics.
{{</definitions>}}

### Available Fields
{{<definitions>}}
- `bytesToClient` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The number of bytes returned to the client.
- `bytesToGateway` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Total bytes received from the client.
- `colo` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Airport code of the Cloudflare data center that served the request.
- `datetime` {{<type>}}Time{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The date and time when the event was recorded.
- `gatewayStatusCode` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Status code returned by the gateway.
- `relayStatusCode` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Status code returned by the relay.
{{</definitions>}}


This node is useful for a granular view of traffic, helping you identify patterns, performance issues, or anomalies in your data flow.

## ohttpMetricsAdaptiveGroups
The `ohttpMetricsAdaptiveGroups` node allows for aggregated analysis of OHTTP request metrics with adaptive sampling. This node is particularly useful for identifying trends and patterns across different dimensions of your traffic and operations.

### Key Arguments
{{<definitions>}}
- `filter` {{<prop-meta>}}required{{</prop-meta>}}
  - Apply filters to narrow down your data set. `accountTag` is a required filter.
- `limit`  {{<prop-meta>}}optional{{</prop-meta>}}
  - Specify the maximum number of records to return.
- `orderBy` {{<prop-meta>}}optional{{</prop-meta>}}
  - Choose how to sort your data, with options for various dimensions and metrics.
{{</definitions>}}


### Available Fields
{{<definitions>}}
- `count` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The number of records that meet the criteria.
- `dimensions` {{<prop-meta>}}optional{{</prop-meta>}}
  - Specifies the grouping dimensions for your data.
- `sum` {{<prop-meta>}}optional{{</prop-meta>}}
  - Aggregated totals for various metrics, per dimension.
{{</definitions>}}


**Dimensions**

You can group your metrics by various dimensions to get a more segmented view of your data:
{{<definitions>}}
- `colo` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The airport code of the Cloudflare data center.
- `date` {{<type>}}Date{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The date of OHTTP request metrics.
- `datetimeFifteenMinutes` {{<type>}}Time{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Timestamp truncated to fifteen minutes.
- `datetimeFiveMinutes` {{<type>}}Time{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Timestamp truncated to five minutes.
- `datetimeHour` {{<type>}}Time{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Timestamp truncated to the hour.
- `datetimeMinute` {{<type>}}Time{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  -  Timestamp truncated to the minute.
- `endpoint` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The appId that generated traffic.
- `gatewayStatusCode` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Status code returned by the gateway.
- `relayStatusCode` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Status code returned by the relay.
{{</definitions>}}

**Sum Fields**

Sum fields offer a cumulative view of various metrics over your selected time period:
{{<definitions>}}
- `bytesToClient` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Total bytes sent from the gateway to the client.
- `bytesToGateway` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Total bytes from the client to the gateway.
- `clientRequestErrors` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Total number of client request errors.
- `gatewayResponseErrors` {{<type>}}int{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Total number of gateway response errors.
{{</definitions>}}

Utilize the ohttpMetricsAdaptiveGroups node to gain comprehensive, aggregated insights into your traffic patterns, helping you optimize performance and user experience.