---
pcx-content-type: reference
title: Analytics
weight: 0
---

# Analytics

Cloudflare measures the following metrics for every connection.

{{<table-wrap>}}

| Metric         | Name                                | Example | Unit                 |
| -------------- | ----------------------------------- | ------- | -------------------- |
| count          | Count of total events               | 1000    | Count                |
| bytesIngress   | Sum of ingress bytes                | 1000    | Sum                  |
| bytesEgress    | Sum of egress bytes                 | 1000    | Sum                  |
| durationAvg    | Average connection duration         | 1.0     | Time in milliseconds |
| durationMedian | Median connection duration          | 1.0     | Time in milliseconds |
| duration90th   | 90th percentile connection duration | 1.0     | Time in milliseconds |
| duration99th   | 99th percentile connection duration | 1.0     | Time in milliseconds |

{{</table-wrap>}}

## Additional dimensions

You can divide your analytics further by the following dimensions.

{{<table-wrap>}}

| Dimension | Name                          | Example                                                    |
| --------- | ----------------------------- | ---------------------------------------------------------- |
| event     | Connection Event              | connect, progress, disconnect, originError, clientFiltered |
| appID     | Application ID                | 40d67c87c6cd4b889a4fd57805225e85                           |
| coloName  | Colo Name                     | SFO                                                        |
| ipVersion | IP version used by the client | 4, 6                                                       |

{{</table-wrap>}}

## Operators for filtering

Use the operators below to filter data.

{{<table-wrap>}}

| Operator | Name                     | URL Encoded |
| -------- | ------------------------ | ----------- |
| \==      | Equals                   | %3D%3D      |
| !=       | Does not equals          | !%3D        |
| \>       | Greater Than             | %3E         |
| <        | Less Than                | %3C         |
| \>=      | Greater than or equal to | %3E%3D      |
| <=       | Less than or equal to    | %3C%3D      |

{{</table-wrap>}}

Filters can be combined using OR and AND boolean logic.

- AND takes precedence over OR in all expressions.
- OR operator is defined using a comma `,` or the OR keyword surrounded by whitespace.
- AND operator is defined using a semicolon `;` or the AND keyword surrounded by whitespace.

## Analytics request structure
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/api/v4/zones/{zone_id}/spectrum/analytics/events/summary?metrics=METRICS&amp;dimensions=DIMENSIONS&amp;filters=FILTERS&amp;since=FROM_TS&amp;sort=SORT&amp;until=TO_TS&amp;limit=LIMIT</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/api/v4/zones/{zone_id}/spectrum/analytics/events/bytime?metrics=METRICS&amp;dimensions=DIMENSIONS&amp;filters=FILTERS&amp;since=FROM_TS&amp;sort=SORT&amp;until=TO_TS&amp;limit=LIMIT</span></div></span></span></span></code></pre>{{</raw>}}

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
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -X GET </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/zones/{zone_id}/spectrum/analytics/events/summary?metrics=count&amp;dimensions=event,appID&amp;since=2018-01-01T16:57:00Z&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Email: you@email.com&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   -H </span><span class="CodeBlock--token-string">&quot;X-Auth-Key: 0000&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   -H </span><span class="CodeBlock--token-string">&quot;Content-Type: application/json&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
