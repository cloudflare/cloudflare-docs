---
title: Data Sets (tables)
order: 2
---

# Data Sets (tables)

Cloudflare Analytics offers a range of data sets, including both general and product-specific data sets. Data sets use a consistent naming scheme that explicitly identifies the type of data they return:

- **Domain.** Each data set is named after the domain it describes and is associated with a set of nodes. Data nodes are typically named after the domain they represent. Product-specific data nodes incorporate the name of the relevant product, as in `loadBalancingRequests`. Network Analytics data nodes incorporate the `ipFlows` label.

- **Aggregated data.** Nodes that represent aggregated data include the the `Groups` suffix. For example, the `loadBalancingRequestsGroups` node represents aggregated data for Load Balancing requests. Aggregated data returns in an array of `...Group` objects. If the data represented by a node is aggregated prior to query time, the aggregation period is also specified. For example, `requests1mGroups` represents data aggregated into a collection of minute-wise roll-up reports.

- **Raw data.** Raw data nodes, such as `loadBalancingRequests`, are not aggregated and so do not incorporate the `Groups` suffix. Raw data returns in arrays containing objects of the relevant data type. For example, a query to `loadBalancingRequests` returns an array of _LoadBalancingRequest_ objects.

- **Adaptive Sampling.** Nodes that represent data acquired using adaptive sampling incorporate the `Adaptive` suffix. (For details, see _[Sampling](/graphql-api/sampling/)_).

Detailed descriptions of nodes, their structure, and supported queries are available directly from the GraphQL Analytics API via **introspection** (see _[Getting started: Querying basics](https://developers.cloudflare.com/analytics/graphql-api/getting-started/#querying-basics)_). For more on using introspection to ask a GraphQL schema for information about the queries it supports, see the [GraphQL documentation](https://graphql.org/learn/introspection/).

## Available data sets

The following data sets (and associated nodes) are available in Cloudflare Analytics:

<TableWrap>

| Data set (product)          | Node                                                                                                                           |
| :-------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| Firewall Activity Log       | `firewallEventsAdaptive` `firewallEventsAdaptiveByTimeGroups`                                                                  |
| Firewall Analytics          | `firewallEventsAdaptiveGroups`                                                                                                 |
| Health Check Analytics      | `healthCheckEventsAdaptive` `healthCheckEventsAdaptiveGroups`                                                                  |
| HTTP Requests               | `httpRequestsAdaptiveGroups` `httpRequests1mGroups` `httpRequests1hGroups`  `httpRequests1dGroups`                             |
| Image Resizing Analytics    | `imageResizingRequests1mGroups`                                                                                                |
| Load Balancing Analytics    | `loadBalancingRequestsAdaptive` `loadBalancingRequestsAdaptiveGroups`                                                          |
| Network Analytics           | `ipFlows1mGroups` `ipFlows1hGroups` `ipFlows1dGroups` `ipFlows1mAttacksGroups`                                                 |
| SYN Attacks (DoS Analytics) | `synAvgPps1mGroups`                                                                                                            |
| Workers Metrics             | `workersInvocationsAdaptive`                                                                                                   |

</TableWrap>

## Beta data sets

Beta data sets are available to Enterprise customers for testing and exploration. Do not rely on beta data nodes, since they are subject to change or removal without notice.

<TableWrap>

| Data set (product) | Node                                                                                                   |
| :----------------- | :----------------------------------------------------------------------------------------------------- |
| Browser Insights   | `browserInsightsAdaptiveGroups` `browserInsightsResourceAdaptiveGroups` `webVitalsAdaptiveGroups`      |

</TableWrap>

## Deprecated data nodes

The following data nodes are deprecated. To avoid disruption, migrate to replacement nodes before the sunset date.

<TableWrap>

| Node                         | Replacement node                     | Sunset date   |
| ---------------------------- | ------------------------------------ | ------------- |
| `httpRequestsCacheGroups`    | `httpRequestsAdaptiveGroups`         | March 1, 2021 |
| `httpRequests1mByColoGroups` | `httpRequestsAdaptiveGroups`         | March 1, 2021 |
| `httpRequests1dByColoGroups` | `httpRequestsAdaptiveGroups`         | March 1, 2021 |
| `firewallRulePreviewGroups`  | `httpRequestsAdaptiveGroups`         | March 1, 2021 |
| `healthCheckEvents`          | `healthCheckEventsAdaptive`          | March 1, 2021 |   
| `healthCheckEventsGroups`    | `healthCheckEventsAdaptiveGroups`    | March 1, 2021 |  
| `loadBalancingRequests`      | `loadBalancingRequestsAdaptive`      | March 1, 2021 | 
| `loadBalancingRequestsGroups`| `loadBalancingRequestsAdaptiveGroups`| March 1, 2021 |

</TableWrap>

## Working with data sets

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

- Regular fields represent themselves.
- Every field, including nested fields, has a type and represents a list of that type.
- The `enum` type represents an enumerated field.

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
