---
title: HTTP Requests by Colo Groups to HTTP Requests by Adaptive Groups
order: 10
---

# httpRequests1mByColoGroups/httpRequests1dByColoGroups to httpRequestsAdaptiveGroups

This guide shares considerations when migrating from the deprecated `httpRequests1mByColoGroups` and `httpRequests1dByColoGroups` GraphQL API nodes to the `httpRequestsAdaptiveGroups` GraphQL API node.

Previously you accessed data for the five data centers that had the most number of requests with the deprecated `httpRequests1mByColoGroups` GraphQL API node as in the following example:

```graphql
{
    viewer {
        zones(filter: {zoneTag: $zoneTag}) {
            series: httpRequests1mByColoGroups(
                limit: 5,
                orderBy: [ sum_requests_DESC ],
                filter: {
                    datetime_geq: $start
                    datetime_lt: $end
                }
            ) {
                sum {
                    requests
                    bytes
                }
                dimensions {
                    coloCode
                }
            }
        }
    }
}
```

Example response:
```json
{
  "data": {
    "viewer": {
      "zones": [
        {
          "series": [
            {
              "dimensions": {
                "coloCode": "LHR"
              },
              "sum": {
                "bytes": 18260055,
                "requests": 4404
              }
            },
            {
              "dimensions": {
                "coloCode": "AMS"
              },
              "sum": {
                "bytes": 17563009,
                "requests": 4302
              }
            },
            {
              "dimensions": {
                "coloCode": "CDG"
              },
              "sum": {
                "bytes": 17200434,
                "requests": 4032
              }
            },
            {
              "dimensions": {
                "coloCode": "PTY"
              },
              "sum": {
                "bytes": 10400209,
                "requests": 2707
              }
            },
            {
              "dimensions": {
                "coloCode": "JIB"
              },
              "sum": {
                "bytes": 9040105,
                "requests": 2601
              }
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

With the deprecation of the `httpRequests1mByColoGroups` and `httpRequests1dByColoGroups` GraphQL API nodes, the query to access the same data (`count`, `sum(edgeResponseBytes)`, and `visits` in the `httpRequestsAdaptiveGroups` GraphQL API node) looks like the following example:

```graphql
{
    viewer {
        zones(filter: {zoneTag: $zoneTag}) {
            series: httpRequestsAdaptiveGroups(
                limit: 5,
                orderBy: [ count_DESC ],
                filter: {
                    datetime_geq: $start
                    datetime_lt: $end
                }
            ) {
                count
                avg {
                    sampleInterval
                }
                sum {
                    visits
                    edgeResponseBytes
                }
                dimensions {
                    coloCode
                }
            }
        }
    }
}
```

Example response:
```json
{
  "data": {
    "viewer": {
      "zones": [
        {
          "series": [
            {
              "avg": {
                "sampleInterval": 10
              },
              "count": 4350,
              "dimensions": {
                "coloCode": "LHR"
              },
              "sum": {
                "edgeResponseBytes": 17860000,
                "visits": 4120
              }
            },
            {
              "avg": {
                "sampleInterval": 10
              },
              "count": 4210,
              "dimensions": {
                "coloCode": "AMS"
              },
              "sum": {
                "edgeResponseBytes": 17110000,
                "visits": 3910
              }
            },
            {
              "avg": {
                "sampleInterval": 10
              },
              "count": 3890,
              "dimensions": {
                "coloCode": "CDG"
              },
              "sum": {
                "edgeResponseBytes": 17050000,
                "visits": 3700
              }
            },
            {
              "avg": {
                "sampleInterval": 10
              },
              "count": 2550,
              "dimensions": {
                "coloCode": "PTY"
              },
              "sum": {
                "edgeResponseBytes": 10286000,
                "visits": 2130
              }
            },
            {
              "avg": {
                "sampleInterval": 10
              },
              "count": 2410,
              "dimensions": {
                "coloCode": "JIB"
              },
              "sum": {
                "edgeResponseBytes": 9029000,
                "visits": 2080
              }
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

This query says:

- Given the indicated zones, `limit`, and time range,
- Fetch the total number of requests (as `count`), the total amount of response
  bytes (as `edgeResponseBytes` of `sum` object), and the total number of
  `visits` per data center (as `metric` of `dimensions` object).

A few points to note:

- Instead of `requests`, the `httpRequestsAdaptiveGroups` query reports `count`, which indicates the number of requests per data center.
- The `httpRequestsAdaptiveGroups` node reports `sum(edgeResponseBytes)` instead of `bandwidth`. Although `httpRequestsByColoGroups` reported this metric as `bandwidth`, calling it `bandwidth` was not an accurate representation of the returned data. 
- `unique visitors per colocation` is not supported in `httpRequestsAdaptiveGroups`, but the `httpRequestsAdaptiveGroups` API does support `visits`. A visit is defined as a page view that originated from a different website or direct link. Cloudflare checks where the HTTP referer does not match the hostname. One visit can consist of multiple page views.