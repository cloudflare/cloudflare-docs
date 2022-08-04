---
pcx_content_type: reference
title: Sorting
weight: 13
layout: single
---

# Sorting

You can specify the order of the query result elements using the `orderBy` argument. By default, the results are sorted by the primary key of a dataset (table). If you specify another field to sort on, the primary key is also used in the sorting key, allowing results to remain consistent for pagination.

The default order for an aggregated dataset is by the fields on which the aggregated data is grouped. If you specify a different order, the aggregation group is appended to your specified ordering.

{{<Aside type="note" header="Note">}}
Ordering within nested structures is not supported.
{{</Aside>}}

## Examples

### Raw data sorting

```graphql
firewallEventsAdaptive (orderBy: [clientCountryName_ASC]) {
    clientCountryName
}
```

### Raw data sorting using multiple fields

```graphql
firewallEventsAdaptive (orderBy: [clientCountryName_ASC, datetime_DESC]) {
    clientCountryName
    datetime
}
```

### Group sorting by aggregation function

```graphql
httpRequests1hGroups (orderBy: [sum_bytes_DESC]){
    sum {
        bytes
        requests
    }
    dimensions {
        datetime
    }
}
```
