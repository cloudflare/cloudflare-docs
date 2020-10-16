---
order: 2
---

# Fetching per-video analytics

Cloudflare measures the following metrics for every video play:

<TableWrap>

Metric            | Name              | Example | Unit
------------------|-------------------|---------|---------------------
totalTimeViewedMs | Total time viewed | 1000    | Time in milliseconds
totalImpressions  | Total views       | 50      | Impressions

</TableWrap>

You can slice and dice your analytics by the following dimensions:

<TableWrap>

Dimension | Name     | Example
----------|----------|---------------------------------
videoId   | Video ID | 40d67c87c6cd4b889a4fd57805225e85

</TableWrap>

You can also filter the data using the following operators:

<TableWrap>

Operator | Name                     | URL Encoded
---------|--------------------------|------------
==       | Equals                   | %3D%3D
!=       | Does not equals          | !%3D
\>       | Greater Than             | %3E
<        | Less Than                | %3C
\>=      | Greater than or equal to | %3E%3D
<=       | Less than or equal to    | %3C%3D

</TableWrap>

Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions.
The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace.
The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace.

## Analytics request structure

```bash
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/analytics/views?metrics={metrics}&dimensions={dimensions}&filters=videoId==$VIDEOID&since=2018-01-01T16:57:00Z&sort={sort}&until={to-timestamp}&limit={limit}
```

* `metrics` is one or more metrics (such as count) to compute
* `dimensions` can be used to break down the data by given attributes
* `filters` used to filter rows by one or more dimensions (see Filters section below)
* `sort` is the sort order for the result set; sort fields must be included in METRICS or DIMENSIONS
* `to-timestamp` is that end of time interval to query, defaults to current time
* `from-timestamp` is that start of time interval to query, defaults to TO_TS - 6 hours
* `step` is used to select time series resolution when using endpoint:
* `auto` or omitted - selects time step most appropriate to time interval. Other time
  * `year`
  * `quarter`
  * `month`
  * `week`
  * `day`
  * `hour`

## Example analytics query

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/analytics/views?metrics=totalImpressions,totalTimeViewedMs&dimensions=videoId&filters=videoId==$VIDEOID&since=2018-01-01T16:57:00Z" \
    -H "X-Auth-Email: $EMAIL" \
    -H "X-Auth-Key: $APIKEY" \
    -H "Content-Type: application/json"
```

## Example analytics response

```bash
{
  "result": {
    "rows": 1,
    "data": [
      {
        "dimensions": [
          ""
        ],
        "metrics": [
          7,
          37663
        ]
      }
    ],
    "data_lag": 0,
    "min": {
      "totalImpressions": 7,
      "totalTimeViewedMs": 37663
    },
    "max": {
      "totalImpressions": 7,
      "totalTimeViewedMs": 37663
    },
    "totals": {},
    "query": {
      "dimensions": [
        "videoId"
      ],
      "metrics": [
        "totalImpressions",
        "totalTimeViewedMs"
      ],
      "filters": "videoId==$VIDEOID",
      "since": "2018-10-10T13:02:00Z",
      "until": "2018-11-27T20:10:00Z",
      "limit": 10000
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

* Analytics data is found in `.data.metrics`. We are reserving fields such as `min` and `max` for use in the future.
* `totalImpressions` is the number of views on the video
* `totalTimedViewMs` is the amount of time viewed in milliseconds
* In this example, there are 7 `totalImpressions` and 37663 `totalTimeViewedMs`
```bash
    "data": [
      {
        "dimensions": [
          ""
        ],
        "metrics": [
          7,
          37663
        ]
      }
    ],
```
