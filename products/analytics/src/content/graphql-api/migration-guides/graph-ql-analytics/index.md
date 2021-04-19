---
title: httpRequestsByColoGroups to httpRequestsAdaptiveGroups
order: 10
---

# httpRequestsByColoGroups to httpRequestsAdaptiveGroups

This guide shares considerations when migrating from the deprecated `httpRequestsByColoGroups` API to the `httpRequestsAdaptiveGroups` API.

Below is a query from the Cloudflare dashboard that shows how to access number of requests per colocation, bandwidth, and unique visitors with `httpRequestsAdaptiveGroups`.

```code
query {
    ZapTimeseriesBydatetimeFifteenMinutesGroupedBycoloCode($zoneTag: string, $filter: ZoneHttpRequestsAdaptiveGroupsFilter_InputObject) {
  viewer {
    zones(filter: {zoneTag: $zoneTag}) {
      series: httpRequestsAdaptiveGroups(limit: 5000, filter: $filter) {
        count
        avg {
          sampleInterval
          __typename
        }
        sum {
          edgeResponseBytes
          visits
          __typename
        }
        dimensions {
          metric: coloCode
          ts: datetimeFifteenMinutes
        }
      }
    }
  }
}


```

This query says:

- Given ???.
- Fetch `count`, `sum(edgeResponseBytes)`, and `visits` colos analytics for `zoneTag` with a time range that starts on `2020-12-10T00:00:00Z`.

A few points to note:

- Instead of `requests`, the `httpRequestsAdaptiveGroups` query reports `count`. This means number of requests per colocation.
- The `httpRequestsAdaptiveGroups` query reports `sum(edgeResponseBytes)` instead of `bandwidth`. This is the same metric that `httpRequestsByColoGroups` reported as `bandwidth`.
- `unique visitors per colocation` is not supported in `httpRequestsAdaptiveGroups`, but the `httpRequestsAdaptiveGroups` API does support `visits`. 