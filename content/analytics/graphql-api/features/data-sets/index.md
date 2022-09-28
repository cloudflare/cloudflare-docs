---
pcx_content_type: reference
title: Datasets (tables)
weight: 3
layout: single
---

# Datasets (tables)

Cloudflare Analytics offers a range of datasets, including both general and product-specific datasets. Datasets use a consistent naming scheme that explicitly identifies the type of data they return:

*   **Domain** - Each dataset is named after the domain it describes and is associated with a set of nodes. Data nodes are typically named after the domain they represent. Product-specific data nodes incorporate the name of the relevant product, as in `loadBalancingRequests`. Network Analytics data nodes incorporate the `ipFlows` label.

*   **Aggregated data** - Nodes that represent aggregated data include the `Groups` suffix. For example, the `loadBalancingRequestsGroups` node represents aggregated data for Load Balancing requests. Aggregated data returns in an array of `...Group` objects. If the data represented by a node is aggregated prior to query time, the aggregation period is also specified. For example, `requests1mGroups` represents data aggregated into a collection of minute-wise roll-up reports.

*   **Raw data** - Raw data nodes, such as `loadBalancingRequests`, are not aggregated and so do not incorporate the `Groups` suffix. Raw data returns in arrays containing objects of the relevant data type. For example, a query to `loadBalancingRequests` returns an array of `LoadBalancingRequest` objects.

*   **Adaptive Sampling** - Nodes that represent data acquired using adaptive sampling incorporate the `Adaptive` suffix. (For details, refer to [Sampling](/analytics/graphql-api/sampling/)).

Detailed descriptions of nodes, their structure, and supported queries are available directly from the GraphQL Analytics API via **introspection** (refer to [Get started: Querying basics](/analytics/graphql-api/getting-started/querying-basics/)). For more on using introspection to ask a GraphQL schema for information about the queries it supports, refer to the [GraphQL documentation](https://graphql.org/learn/introspection/).

## Available datasets

The following datasets (and associated nodes) are available in Cloudflare Analytics:

{{<table-wrap>}}

| Dataset (product)          | Node                                                                                                                           |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| Firewall Activity Log       | `firewallEventsAdaptive` `firewallEventsAdaptiveByTimeGroups`                                                                  |
| Firewall Analytics          | `firewallEventsAdaptiveGroups`                                                                                                 |
| Gateway Analytics               | `gatewayL4SessionsAdaptiveGroups` `gatewayL7RequestsAdaptiveGroups` `gatewayResolverQueriesAdaptiveGroups` `gatewayResolverByCategoryAdaptiveGroups`              |
| Health Check Analytics      | `healthCheckEventsAdaptive` `healthCheckEventsAdaptiveGroups`                                                                  |
| HTTP Requests               | `httpRequestsAdaptiveGroups` `httpRequests1mGroups` `httpRequests1hGroups`  `httpRequests1dGroups`                             |
| Image Resizing Analytics    | `imageResizingRequests1mGroups`                                                                                                |
| Load Balancing Analytics    | `loadBalancingRequestsAdaptive` `loadBalancingRequestsAdaptiveGroups`                                                          |
| Logpush Health Analytic    | `logpushHealthAdaptiveGroups`                                                                                           |
| Magic Firewall Analytics    | `magicFirewallSamplesAdaptiveGroups`                                                                                           |
| Network Analytics v2<br/> for Magic Transit customers | `magicTransitNetworkAnalyticsAdaptiveGroups` `dosdNetworkAnalyticsAdaptiveGroups` `dosdAttackAnalyticsGroups` `flowtrackdNetworkAnalyticsAdaptiveGroups` `magicFirewallNetworkAnalyticsAdaptiveGroups` |
| Network Analytics v2<br/> for Spectrum customers<br/> (Enterprise plans only) | `spectrumNetworkAnalyticsAdaptiveGroups` `dosdNetworkAnalyticsAdaptiveGroups` `dosdAttackAnalyticsGroups` |
| SYN Attacks (DoS Analytics) | `synAvgPps1mGroups`                                                                                                            |
| Workers Metrics             | `workersInvocationsAdaptive`                                                                                                   |

{{</table-wrap>}}

## Beta datasets

Beta datasets are available to Enterprise customers for testing and exploration. Do not rely on beta data nodes, since they are subject to change or removal without notice.

{{<table-wrap>}}

| Dataset (product) | Node                                                                                                        |
| :----------------- | :---------------------------------------------------------------------------------------------------------- |
| Web Analytics      | `rumPageloadEventsAdaptiveGroups` `rumPerformanceEventsAdaptiveGroups` `rumWebVitalsEventsAdaptiveGroups`   |
| Waiting Room      | `waitingRoomAnalyticsAdaptive` `waitingRoomAnalyticsAdaptiveGroups`   |

{{</table-wrap>}}

## Deprecated data nodes

The following data nodes are deprecated. To avoid disruption, migrate to replacement nodes before the sunset date.

{{<table-wrap>}}

| Node                         | Replacement node                     | Sunset date       |
| ---------------------------- | ------------------------------------ | ----------------- |
| `httpRequestsCacheGroups`    | `httpRequestsAdaptiveGroups`         | March 1, 2021     |
| `httpRequests1mByColoGroups` | `httpRequestsAdaptiveGroups`         | September 1, 2021 |
| `httpRequests1dByColoGroups` | `httpRequestsAdaptiveGroups`         | September 1, 2021 |
| `firewallRulePreviewGroups`  | `httpRequestsAdaptiveGroups`         | March 1, 2021     |
| `healthCheckEvents`          | `healthCheckEventsAdaptive`          | March 1, 2021     |\
| `healthCheckEventsGroups`    | `healthCheckEventsAdaptiveGroups`    | March 1, 2021     |\
| `loadBalancingRequests`      | `loadBalancingRequestsAdaptive`      | September 30, 2021     |
| `loadBalancingRequestsGroups`| `loadBalancingRequestsAdaptiveGroups`| September 30, 2021     |
| `ipFlows1mGroups`<br/> `ipFlows1hGroups`<br/> `ipFlows1dGroups`<br/> `ipFlows1mAttacksGroups` | `spectrumNetworkAnalyticsAdaptiveGroups`<br/> `magicTransitNetworkAnalyticsAdaptiveGroups`<br/> `dosdNetworkAnalyticsAdaptiveGroups`<br/> `dosdAttackAnalyticsGroups`<br/> `flowtrackdNetworkAnalyticsAdaptiveGroups`<br/> `magicFirewallNetworkAnalyticsAdaptiveGroups` | March 31, 2022 |

{{</table-wrap>}}

## Working with datasets

### Aggregated fields

This example illustrates the structure for Groups:

```graphql
type WhateverGroup {
    count # No subfields, it is just the group size. Not available for roll-up tables.
    sum {
        # fields that support summing (numbers, maps of numbers)
    }
    avg {
        # fields that support averaging (numbers)
    }
    uniq {
        # fields that support uniqueing (numbers, strings, enums, IPs, dates, etc.)
    }
}
```

Unique values are not available as a dimension but can be queried as demonstrated in this example:

```graphql
{
  # Get number of bytes and unique IPs in each minute.
  httpRequests1mGroups {
    sum {
      bytes
    }
    uniq {
      uniques # unique IPs
    }
    dimensions {
      datetimeMinute
    }
  }

  # Count the number of events in each hour.
  firewallEventsAdaptiveGroups {
    count
    dimensions {
      datetimeHour
    }
  }
}
```

### Schema type definitions

Every exposed table has a GraphQL type definition. Type definitions observe the following rules:

*   Regular fields represent themselves.
*   Every field, including nested fields, has a type and represents a list of that type.
*   The `enum` type represents an enumerated field.

Here is an example type definition for `ContentTypeMapElem`:

```graphql
type ContentTypeMapElem {
    edgeResponseContentType: UInt32!
    requests: UInt64!
    bytes: UInt64!
}

# An array of httpRequestsGroup is the result of httpRequests1hGroups or
# httpRequests1mGroups query.
type httpRequestsGroup {
    date: Date!
    timeslot: DateTime!
    requests: UInt64!
    contentTypeMap: [ContentTypeMapElem!]!
    # ... other fields
}

enum TrustedClientCategory {
    UNKNOWN
    REAL_BROWSER
    HONEST_BOT
}

# An array of Request is the result of httpRequests query.
type Request {
    trustedClientCategory: TrustedClientCategory!
    # ... other fields
}
///
```
