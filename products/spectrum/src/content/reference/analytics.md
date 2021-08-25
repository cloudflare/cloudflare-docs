---
order: 
pcx-content-type: reference
---

# Analytics

Cloudflare measures the following metrics for every connection.

<TableWrap>

Metric                    | Name                                | Example                  | Unit
--------------------------|-------------------------------------|--------------------------|--------------------------
count                     | Count of total events               | 1000                     | Count
bytesIngress              | Sum of ingress bytes                | 1000                     | Sum
bytesEgress               | Sum of egress bytes                 | 1000                     | Sum
durationAvg               | Average connection duration         | 1.0                      | Time in milliseconds
durationMedian            | Median connection duration          | 1.0                      | Time in milliseconds
duration90th              | 90th percentile connection duration | 1.0                      | Time in milliseconds
duration99th              | 99th percentile connection duration | 1.0                      | Time in milliseconds

</TableWrap>

## Additional dimensions

You can divide your analytics further by the following dimensions.

<TableWrap>

Dimension                 | Name                            | Example
--------------------------|---------------------------------|--------------------------
event                     | Connection Event                | connect, progress, disconnect, originError, clientFiltered
appID                     | Application ID                  | 40d67c87c6cd4b889a4fd57805225e85
coloName                  | Colo Name                       | SFO
ipVersion                 | IP version used by the client   | 4, 6

</TableWrap>

## Operators for filtering

Use the operators below to filter data.

<TableWrap>

Operator                  | Name                            | URL Encoded
--------------------------|---------------------------------|--------------------------
==                        | Equals                          | %3D%3D
!=                        | Does not equals                 | !%3D
\>                        | Greater Than                    | %3E
<                         | Less Than                       | %3C
\>=                       | Greater than or equal to        | %3E%3D
<=                        | Less than or equal to           | %3C%3D

</TableWrap>

Filters can be combined using OR and AND boolean logic. 

- AND takes precedence over OR in all expressions.
- OR operator is defined using a comma `,` or the OR keyword surrounded by whitespace.
- AND operator is defined using a semicolon `;` or the AND keyword surrounded by whitespace.

## Analytics request structure

```txt
/api/v4/zones/{zone_id}/spectrum/analytics/events/summary?metrics=METRICS&dimensions=DIMENSIONS&filters=FILTERS&since=FROM_TS&sort=SORT&until=TO_TS&limit=LIMIT
/api/v4/zones/{zone_id}/spectrum/analytics/events/bytime?metrics=METRICS&dimensions=DIMENSIONS&filters=FILTERS&since=FROM_TS&sort=SORT&until=TO_TS&limit=LIMIT
```

- METRICS is one or more metrics (such as count) to compute
- DIMENSIONS can be used to break down the data by given attributes
- FILTERS used to filter rows by one or more dimensions (see Filters section below)
- SORT is the sort order for the result set; sort fields must be included in METRICS or DIMENSIONS
- TO_TS is that end of time interval to query, defaults to current time
- FROM_TS is that start of time interval to query, defaults to TO_TS - 6 hours
- STEP is used to select time series resolution when using endpoint:
- auto or omitted - selects time step most appropriate to time interval
  - year
  - quarter
  - month
  - week
  - day
  - hour

## Analytics query example

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/spectrum/analytics/events/summary?metrics=count&dimensions=event,appID&since=2018-01-01T16:57:00Z" \
   -H "X-Auth-Email: you@email.com" \
   -H "X-Auth-Key: 0000" \
   -H "Content-Type: application/json"
```
