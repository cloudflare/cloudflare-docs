---
title: Nested Structures
order: 16
---

# Nested Structures

Two kinds of nested structures that behave in special ways are supported: **arrays** and **maps**. Fields of either of these types are arrays; when they're part part of query result, which is already an array of objects, they become nested arrays.

## Arrays

Arrays behave as a special kind of single value. There is no way to paginate through, filter, filter by, group, or group by the array.

On the other hand, you can choose which fields of the underlying type you want fetched.

For example, given arrays like this:

````javascript
type SubRequest {
    url: String!
    status: Int
}

type Request {
    date: Date!
    datetime: DateTime!
    subRequests: [SubRequest!]!
}
````

You can run a query to get the status by subrequest:
````javascript
{
    requests {
        date
        subRequests {
            # discard the url, only need the status
            status
        }
    }
}
````

The results would be:
````javascript
{
    "requests": [
        {
            "date": "2018-01-01",
            "subRequests": [{"status": 404}, {"status": 200}, {"status": 404}]
        },
        {
            "date": "2018-01-01",
            "subRequests": [{"status": 200}]
        }
    ]
}
````

## Maps

Maps behave like arrays, but can be grouped using the `sum` function. They are used in aggregated data sets, such as `httpRequest1dGroups`.

Example maps:
````javascript
type URLStatsMapElem {
    url: String!
    requests: Int
    bytes: Int
}

type Request {
    date: Date!
    datetime: DateTime!
    urlStatsMap: [URLStatsMapElem!]!
}
````

Query:
````javascript
{
    requests {
        sum {
            urlStatsMap {
                url
                requests
                bytes
            }
        }
        dimensions {
            date
        }
    }
}
````

Response:
````javascript
{
    "requests": [
        {
            "sum": {
                "urlStatsMap": [
                    {
                        "url": "hello-world.org/1",
                        "requests": 123,
                        "bytes": 1024
                    },
                    {
                        "url": "hello-world.org/10",
                        "requests": 1230,
                        "bytes": 10240
                    }
                ]
            }
            "dimensions" {
                "date": "2018-10-19"
            }
        },
        ...
    ]
}
````

## Examples

Query array fields in raw data sets:
````javascript
query NestedFields($zoneTag: string, $dateStart: string, $dateEnd: string, $datetimeStart: string, $datetimeEnd: string) {
      viewer {
        zones(filter: {zoneTag: $zoneTag}) {
          events(limit: 2, filter: {datetime_geq: $datetimeStart,datetime_leq: $datetimeEnd}){
            matches {
              ruleId
              action
              source
            }
          }
        }
      }
}
````

Example response:
````javascript
{
  "data": {
    "viewer": {
      "zones": [
        {
          "events": [
            {
              "matches": [
                {
                  "action": "allow",
                  "ruleId": "rule-id-one",
                  "source": "asn"
                },
                {
                  "action": "block",
                  "ruleId": "rule-id-two",
                  "source": "asn"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
````

Query maps fields in aggregated data sets:
````javascript
query MapCapacity($zoneTag: string, $dateStart: string, $dateEnd: string, $datetimeStart: string, $datetimeEnd: string) {
    viewer {
        zones(filter: {zoneTag: $zoneTag}) {
            httpRequests1mGroups(
                limit: 10,
                filter: {date_geq: $dateStart, date_leq: $dateEnd, datetime_geq: $datetimeStart, datetime_lt: $datetimeEnd}) {
                sum {
                    countryMap {
                        clientCountryName
                        requests
                        bytes
                        threats
                    }
                }
                dimensions {
                    datetimeHour
                }
            }
        }
    }
}
````

Example response:
````javascript
{
  "data": {
    "viewer": {
      "zones": [
        {
          "httpRequests1mGroups": [
            {
              "dimensions": {
                "datetime": "2019-03-08T17:00:00Z"
              },
              "sum": {
                "countryMap": [
                  {
                    "bytes": 51911317,
                    "clientCountryName": "XK",
                    "requests": 4492,
                    "threats": 0
                  },
                  {
                    "bytes": 1816103586,
                    "clientCountryName": "T1",
                    "requests": 132423,
                    "threats": 0
                  },
                  ...
                ]
              }
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
````