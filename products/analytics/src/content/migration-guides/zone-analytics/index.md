---
title: Zone Analytics to GraphQL Analytics
order: 11
---

# Zone Analytics to GraphQL Analytics

The [Zone Analytics API](https://api.cloudflare.com/#zone-analytics-properties) allows you to get request data by zone. It offers optional `since` and `until` parameters to specify the request time period and a `continuous` parameter to indicate whether the time period should be moved backward to find a period with completely aggregated data.

For example, here is a sample curl call to get data for a two minute period:
```bash
curl -s -H "X-Auth-Email: <REDACTED>" -H "X-Auth-Key: <REDACTED>" -X GET "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/analytics/dashboard?since=2019-09-08T20:00:00Z&until=2019-09-08T20:02:00Z&continuous=false" | jq .
```

<details>
<summary>Response</summary>
<div>

```json
{
  "success": true,
  "query": {
    "since": "2019-09-08T20:00:00Z",
    "until": "2019-09-08T20:02:00Z",
    "time_delta": 1
  },
  "errors": [],
  "messages": [],
  "result": {
    "timeseries": [
      {
        "since": "2019-09-08T20:00:00Z",
        "until": "2019-09-08T20:01:00Z",
        "requests": {
          "all": 15,
          "cached": 12,
          "uncached": 3,
          "ssl": {
            "encrypted": 13,
            "unencrypted": 2
          },
          "http_status": {
            "200": 4,
            "403": 11
          },
          "content_type": {
            "html": 12,
            "png": 3
          },
          "country": {
            "CN": 6,
            "IE": 1,
            "US": 3,
            "VN": 5
          },
          "ip_class": {
            "monitoringService": 4,
            "noRecord": 11
          },
          "ssl_protocol": {
            "TLSv1.2": 13,
            "none": 2
          }
        },
        "bandwidth": {
          "all": 312740,
          "cached": 309930,
          "uncached": 2810,
          "ssl": {
            "encrypted": 309276,
            "unencrypted": 3464
          },
          "ssl_protocol": {
            "TLSv1.2": 13,
            "none": 2
          },
          "content_type": {
            "html": 32150,
            "png": 280590
          },
          "country": {
            "CN": 10797,
            "IE": 98224,
            "US": 185176,
            "VN": 18543
          }
        },
        "threats": {
          "all": 6,
          "type": {
            "user.ban.ctry": 6
          },
          "country": {
            "CN": 6
          }
        },
        "pageviews": {
          "all": 1,
          "search_engine": {
            "pingdom": 1
          }
        },
        "uniques": {
          "all": 11
        }
      },
      {
        "since": "2019-09-08T20:01:00Z",
        "until": "2019-09-08T20:02:00Z",
        "requests": {
          "all": 4,
          "cached": 1,
          "uncached": 3,
          "ssl": {
            "encrypted": 4,
            "unencrypted": 0
          },
          "http_status": {
            "200": 4
          },
          "content_type": {
            "html": 1,
            "png": 3
          },
          "country": {
            "CA": 2,
            "US": 2
          },
          "ip_class": {
            "monitoringService": 4
          },
          "ssl_protocol": {
            "TLSv1.2": 4
          }
        },
        "bandwidth": {
          "all": 283399,
          "cached": 280590,
          "uncached": 2809,
          "ssl": {
            "encrypted": 283399,
            "unencrypted": 0
          },
          "ssl_protocol": {
            "TLSv1.2": 4
          },
          "content_type": {
            "html": 2809,
            "png": 280590
          },
          "country": {
            "CA": 101033,
            "US": 182366
          }
        },
        "threats": {
          "all": 0,
          "type": {},
          "country": {}
        },
        "pageviews": {
          "all": 1,
          "search_engine": {
            "pingdom": 1
          }
        },
        "uniques": {
          "all": 4
        }
      }
    ],
    "totals": {
      "since": "2019-09-08T20:00:00Z",
      "until": "2019-09-08T20:02:00Z",
      "requests": {
        "all": 19,
        "cached": 13,
        "uncached": 6,
        "ssl": {
          "encrypted": 17,
          "unencrypted": 2
        },
        "http_status": {
          "200": 8,
          "403": 11
        },
        "content_type": {
          "html": 13,
          "png": 6
        },
        "country": {
          "CA": 2,
          "CN": 6,
          "IE": 1,
          "US": 5,
          "VN": 5
        },
        "ip_class": {
          "monitoringService": 8,
          "noRecord": 11
        },
        "ssl_protocol": {
          "TLSv1.2": 17,
          "none": 2
        }
      },
      "bandwidth": {
        "all": 596139,
        "cached": 590520,
        "uncached": 5619,
        "ssl": {
          "encrypted": 592675,
          "unencrypted": 3464
        },
        "ssl_protocol": {
          "TLSv1.2": 17,
          "none": 2
        },
        "content_type": {
          "html": 34959,
          "png": 561180
        },
        "country": {
          "CA": 101033,
          "CN": 10797,
          "IE": 98224,
          "US": 367542,
          "VN": 18543
        }
      },
      "threats": {
        "all": 6,
        "type": {
          "user.ban.ctry": 6
        },
        "country": {
          "CN": 6
        }
      },
      "pageviews": {
        "all": 2,
        "search_engine": {
          "pingdom": 2
        }
      },
      "uniques": {
        "all": 15
      }
    }
  }
}
```

</div>
</details>

As you can see from the response, Zone Analytics returns metrics along many dimensions and doesn't give you the option to control what you receive. With GraphQL Analytics, you can ask for only the data that you need. However, if you wanted to get exactly the same metrics and dimensions as you would from Zone Analytics, here is the query you would make:

```txt
{
  viewer {
    zones(filter: {zoneTag: <ZONE_ID>}) {
      httpRequests1mGroups(orderBy: [datetimeMinute_ASC], limit: 100, filter: {datetime_geq: "2019-09-08T20:00:00Z", datetime_lt: "2019-09-08T20:02:00Z"}) {
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

<details>
<summary>Response</summary>
<div>

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

</div>
</details>

Notice that you can specify the request time period using a data set filter (_see [Filtering](/graphql-api/features/filtering/)_). The `continuous` parameter is no longer needed because GraphQL Analytics is designed to provide data as soon as it's available.

Also, if you want to get the totals for a particular period, rather than a breakdown by time period, simply remove the `datetimeMinute` field under `dimensions`.
