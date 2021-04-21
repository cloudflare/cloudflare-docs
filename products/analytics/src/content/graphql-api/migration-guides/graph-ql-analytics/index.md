---
title: httpRequestsByColoGroups to httpRequestsAdaptiveGroups
order: 10
---

# httpRequestsByColoGroups to httpRequestsAdaptiveGroups

This guide shares considerations when migrating from the deprecated `httpRequestsByColoGroups` GraphQL API node to the `httpRequestsAdaptiveGroups` GraphQL API node.

Previously a query that used the `httpRequestsByColoGroups` GraphQL API node to access the number of requests per data center, bandwidth, and unique visitors looked like the following:

```graphql
{
  viewer {
    zones(filter: {zoneTag: <ZONE_ID>}) {
      httpRequests1mGroups(
        orderBy: [datetimeMinute_ASC], 
        limit: 100, 
        filter: {
          datetime_geq: "2019-09-08T20:00:00Z", 
          datetime_lt: "2019-09-08T20:02:00Z"
          }
        ) {
        dimensions {
          datetimeMinute
        }
        sum {
          browserMap {
            pageViews
            uaBrowserFamily
          }
          bytes
          cachedBytes
          cachedRequests
          contentTypeMap {
            bytes
            requests
            edgeResponseContentTypeName
          }
          clientSSLMap {
            requests
            clientSSLProtocol
          }
          countryMap {
            bytes
            requests
            threats
            clientCountryName
          }
          encryptedBytes
          encryptedRequests
          ipClassMap {
            requests
            ipType
          }
          pageViews
          requests
          responseStatusMap {
            requests
            edgeResponseStatus
          }
          threats
          threatPathingMap {
            requests
            threatPathingName
          }
        }
        uniq {
          uniques
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
          "httpRequests1mGroups": [
            {
              "dimensions": {
                "datetimeMinute": "2019-09-08T20:00:00Z"
              },
              "sum": {
                "browserMap": [
                  {
                    "pageViews": 1,
                    "uaBrowserFamily": "PingdomBot"
                  }
                ],
                "bytes": 312740,
                "cachedBytes": 309930,
                "cachedRequests": 12,
                "clientSSLMap": [
                  {
                    "clientSSLProtocol": "none",
                    "requests": 2
                  },
                  {
                    "clientSSLProtocol": "TLSv1.2",
                    "requests": 13
                  }
                ],
                "contentTypeMap": [
                  {
                    "bytes": 280590,
                    "edgeResponseContentTypeName": "png",
                    "requests": 3
                  },
                  {
                    "bytes": 32150,
                    "edgeResponseContentTypeName": "html",
                    "requests": 12
                  }
                ],
                "countryMap": [
                  {
                    "bytes": 10797,
                    "clientCountryName": "CN",
                    "requests": 6,
                    "threats": 6
                  },
                  {
                    "bytes": 98224,
                    "clientCountryName": "IE",
                    "requests": 1,
                    "threats": 0
                  },
                  {
                    "bytes": 185176,
                    "clientCountryName": "US",
                    "requests": 3,
                    "threats": 0
                  },
                  {
                    "bytes": 18543,
                    "clientCountryName": "VN",
                    "requests": 5,
                    "threats": 0
                  }
                ],
                "encryptedBytes": 309276,
                "encryptedRequests": 13,
                "ipClassMap": [
                  {
                    "ipType": "monitoringService",
                    "requests": 4
                  },
                  {
                    "ipType": "noRecord",
                    "requests": 11
                  }
                ],
                "pageViews": 1,
                "requests": 15,
                "responseStatusMap": [
                  {
                    "edgeResponseStatus": 200,
                    "requests": 4
                  },
                  {
                    "edgeResponseStatus": 403,
                    "requests": 11
                  }
                ],
                "threatPathingMap": [
                  {
                    "requests": 6,
                    "threatPathingName": "user.ban.ctry"
                  }
                ],
                "threats": 6
              },
              "uniq": {
                "uniques": 11
              }
            },
            {
              "dimensions": {
                "datetimeMinute": "2019-09-08T20:01:00Z"
              },
              "sum": {
                "browserMap": [
                  {
                    "pageViews": 1,
                    "uaBrowserFamily": "PingdomBot"
                  }
                ],
                "bytes": 283399,
                "cachedBytes": 280590,
                "cachedRequests": 1,
                "clientSSLMap": [
                  {
                    "clientSSLProtocol": "TLSv1.2",
                    "requests": 4
                  }
                ],
                "contentTypeMap": [
                  {
                    "bytes": 280590,
                    "edgeResponseContentTypeName": "png",
                    "requests": 3
                  },
                  {
                    "bytes": 2809,
                    "edgeResponseContentTypeName": "html",
                    "requests": 1
                  }
                ],
                "countryMap": [
                  {
                    "bytes": 101033,
                    "clientCountryName": "CA",
                    "requests": 2,
                    "threats": 0
                  },
                  {
                    "bytes": 182366,
                    "clientCountryName": "US",
                    "requests": 2,
                    "threats": 0
                  }
                ],
                "encryptedBytes": 283399,
                "encryptedRequests": 4,
                "ipClassMap": [
                  {
                    "ipType": "monitoringService",
                    "requests": 4
                  }
                ],
                "pageViews": 1,
                "requests": 4,
                "responseStatusMap": [
                  {
                    "edgeResponseStatus": 200,
                    "requests": 4
                  }
                ],
                "threatPathingMap": [],
                "threats": 0
              },
              "uniq": {
                "uniques": 4
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

With the deprecation of the `httpRequestsByColoGroups` GraphQL API node, the query to access the same data (`count`, `sum(edgeResponseBytes)`, and `visits` in the `httpRequestsAdaptiveGroups` GraphQL API node) looks like the following example: 

```graphql
{
  viewer {
    zones(filter: {zoneTag: $zoneTag}) {
      series: httpRequestsAdaptiveGroups(
        limit: 5,
        orderBy: [ sum_visits_DESC ],
        filter: {
          datetimeFifteenMinutes_geq: $start
          datetimeFifteenMinutes_lt: $end
        }
      ) {
        count
        avg {
          sampleInterval
        }
        sum {
          edgeResponseBytes
          visits
        }
        dimensions {
          metric: coloCode
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
              "count": 7700,
              "dimensions": {
                "metric": "AMS"
              },
              "sum": {
                "edgeResponseBytes": 50078910,
                "visits": 5700
              }
            },
            {
              "avg": {
                "sampleInterval": 10
              },
              "count": 7300,
              "dimensions": {
                "metric": "CDG"
              },
              "sum": {
                "edgeResponseBytes": 47685220,
                "visits": 5230
              }
            },
            {
              "avg": {
                "sampleInterval": 10
              },
              "count": 7530,
              "dimensions": {
                "metric": "LHR"
              },
              "sum": {
                "edgeResponseBytes": 46665180,
                "visits": 5220
              }
            },
            {
              "avg": {
                "sampleInterval": 10
              },
              "count": 5200,
              "dimensions": {
                "metric": "EZE"
              },
              "sum": {
                "edgeResponseBytes": 32085270,
                "visits": 3360
              }
            },
            {
              "avg": {
                "sampleInterval": 10
              },
              "count": 5170,
              "dimensions": {
                "metric": "PTY"
              },
              "sum": {
                "edgeResponseBytes": 31573240,
                "visits": 3220
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
- Fetch `count`, `sum(edgeResponseBytes)`, and `visits` data center analytics by `coloCode`.

A few points to note:

- Instead of `requests`, the `httpRequestsAdaptiveGroups` query reports `count`, which indicates the number of requests per data center.
- The `httpRequestsAdaptiveGroups` query reports `sum(edgeResponseBytes)` instead of `bandwidth`. Although `httpRequestsByColoGroups` reported this metric as `bandwidth`, calling it `bandwidth` was not an accurate representation of the returned data. 
- `unique visitors per colocation` is not supported in `httpRequestsAdaptiveGroups`, but the `httpRequestsAdaptiveGroups` API does support `visits`. A visit is defined as a page view that originated from a different website or direct link. Cloudflare checks where the HTTP referer does not match the hostname. One visit can consist of multiple page views.