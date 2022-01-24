---
title: Individual videos
pcx-content-type: reference
---

# Analytics for individual videos

## Metrics 

Cloudflare measures the following metrics for every video play.

<TableWrap>

Metric              | Name              | Unit                 | Example
--------------------|-------------------|----------------------|--------
`totalTimeViewedMs` | Total time viewed | Time in milliseconds | 1000
`totalImpressions`  | Total views       | Impressions          | 50

</TableWrap>

## Dimensions

You can break down your analytics further with the following dimensions:

<TableWrap>

Dimension | Name     | Example
----------|----------|---------------------------------
`videoId` | Video ID | 40d67c87c6cd4b889a4fd57805225e85

</TableWrap>

## Operators

You can also filter the data using the following operators:

<TableWrap>

Operator | Name                     | URL Encoded
---------|--------------------------|------------
==       | Equals                   | %3D%3D
!=       | Does not equal           | !%3D
\>       | Greater than             | %3E
<        | Less than                | %3C
\>=      | Greater than or equal to | %3E%3D
<=       | Less than or equal to    | %3C%3D

</TableWrap>

- Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all expressions.
- The OR operator is defined using a comma `,` or the OR keyword surrounded by whitespace.
- The AND operator is defined using a semicolon `;` or the AND keyword surrounded by whitespace.

## Request structure

```bash
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/analytics/views?metrics={metrics}&dimensions={dimensions}&filters=videoId==$VIDEOID&since=2018-01-01T16:57:00Z&sort={sort}&until={to-timestamp}&limit={limit}
```

* `metrics` — One or more metrics (such as count) to compute.
* `dimensions` Used to break down the data by given attributes.
* `filters` — Used to filter rows by one or more dimensions.
* `sort` — The sort order for the result set. Sort fields must be included in METRICS or DIMENSIONS.
* `to-timestamp` — The end of the time interval to query. Defaults to current time.
* `from-timestamp` — The start of the time interval to query. Defaults to TO_TS - 6 hours.
* `step` — Used to select time series resolution when using endpoint:
  * `auto` or omitted - Selects the time step most appropriate to time interval. Other times:
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

`totalImpressions` is the number of views on the video, and `totalTimedViewMs` is the amount of time viewed in milliseconds.

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

Analytics data is found in `.data.metrics`, and Cloudflare is reserving fields such as `min` and `max` for use in the future.

In this example, there are seven `totalImpressions` and 37663 `totalTimeViewedMs`.

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
