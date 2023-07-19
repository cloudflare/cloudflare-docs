---
pcx_content_type: reference
title: Datasets (tables)
weight: 3
layout: single
---

# Datasets (tables)

Cloudflare Analytics offers a range of datasets, including both general and
product-specific ones. Datasets use a consistent naming scheme that explicitly
identifies the type of data they return:

* **Domain** - Each dataset is named after the field it describes and is
  associated with a set of nodes. Product-specific data nodes incorporate the
  name of the relevant product, for instance `loadBalancingRequests*` nodes.

* **Adaptive Sampling** - Nodes that represent data acquired using adaptive
  sampling incorporate the `Adaptive` suffix. For more details, please see
  [sampling][1].

* **Aggregated data** - Nodes that represent aggregated data include the
  `Groups` suffix. For example, the `loadBalancingRequestsAdaptiveGroups` node
  represents aggregated data for Load Balancing requests. Aggregated data is
  returned in an array of `...Group` objects. Please note: we have a node that
  currently excluded from that naming convention - `workersInvocationsAdaptive`
  (beta).

* **Raw data** - Raw data nodes, such as `loadBalancingRequestsAdaptive`, are
  not aggregated and so do not incorporate the `Groups` suffix. Raw data is
  returned in arrays containing objects of the relevant data type. For example,
  a query to `loadBalancingRequestsAdaptive` returns a variety of
  `LoadBalancingRequest` objects.

To find out more information about datasets, availability, beta, and deprecation
statuses, please refer to GraphQL [discovery][2] features.

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

* Regular fields represent themselves.
* Every field, including nested fields, has a type and represents a list of that type.
* The `enum` type represents an enumerated field.

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
```

[1]: </analytics/graphql-api/sampling/>
[2]: </analytics/graphql-api/features/discovery/>
