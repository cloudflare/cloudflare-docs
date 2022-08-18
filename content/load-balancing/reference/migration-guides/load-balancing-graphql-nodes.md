---
pcx_content_type: configuration
title: Migrate to new GraphQL nodes
weight: 1
---

# Migrate to new GraphQL nodes

After 30 September 2021, Cloudflare will make the following changes to the Load Balancing GraphQL schema:

*   Deprecate nodes:
    *   `loadBalancingRequestsGroups` will be deprecated for `loadBalancingRequestsAdaptiveGroups`
    *   `loadBalancingRequests` will be deprecated for `loadBalancingRequestsAdaptive`
*   Deprecate the `date` field (replace it with the existing `datetime` field)
*   Add the `sampleInterval` field

## Example query

The following example:

*   Replaces `loadBalancingRequestsGroups` with `loadBalancingRequestsAdaptiveGroups`
*   Replaces `date` with `datetime`
*   Uses the new `sampleInterval` field

```json
query {
  viewer {
    zones(filter: { zoneTag: "your Zone ID" }) {
      loadBalancingRequestsAdaptiveGroups(
        filter: {
          datetime_gt: "2021-06-12T04:00:00Z",
          datetime_lt: "2021-06-13T06:00:00Z"
        }
      ) {
        dimensions {
          datetime
          coloCode
          ...
        }
        avg {
          sampleInterval
        }
      }
    }
  }
}
```
