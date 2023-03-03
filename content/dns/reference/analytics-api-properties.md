---
pcx_content_type: reference
title: Analytics API properties
weight: 1
---

# Analytics API properties

This page describes API properties that you can use in [API requests for DNS analytics](https://developers.cloudflare.com/api/operations/dns-analytics-table).

## Metrics

A metric is a numerical value based on an attribute of the data, for example a query count.

In API requests, metrics are set in the `metrics` parameter. If you need to list multiple metrics, separate them with commas.

{{<table-wrap>}}

| Metric             | Name                                | Example | Unit                 |
| -------------------| ----------------------------------- | ------- | -------------------- |
| queryCount         | Query count                         | `1000`    | Count                |
| uncachedCount      | Uncached query count                | `1`       | Count                |
| staleCount         | Stale query count                   | `1`       | Count                |
| responseTimeAvg    | Average response time               | `1.0`     | Time in milliseconds |
| responseTimeMedian | Median response time                | `1.0`     | Time in milliseconds |
| responseTime90th   | 90th percentile response time       | `1.0`     | Time in milliseconds |
| responseTime99th   | 99th percentile response time       | `1.0`     | Time in milliseconds |

{{</table-wrap>}}

## Dimensions

Dimensions can be used to break down the data by given attributes.

In API requests, dimensions are set in the `dimensions` parameter. If you need to list multiple dimensions, separate them with commas.

{{<table-wrap>}}

| Dimension          | Name                 | Example     | Notes                                                                                    |
|--------------------|----------------------|-------------|------------------------------------------------------------------------------------------|
| queryName          | Query Name           | `example.com` |                                                                                          |
| queryType          | Query Type           | `AAAA`        | [Types defined by IANA](http://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4). Unknown types are empty.                                          |
| responseCode       | Response Code        | `NOERROR`     | [Response codes defined by IANA](http://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6). Always uppercase.                                       |
| responseCached     | Response Cached      | `Cached`      | Either `Cached` or `Uncached`.                                                               |
| coloName           | Colo Name            | `SJC`         | PoP code.                                                                                |
| origin             | Origin               | `2001:db8::1` | Origin used to resolve the query. Empty if N/A or if the query was answered from cache. |
| dayOfWeek          | Day Of Week          | `1`           | Break down by day of week. Monday is `1`, and Sunday is `7`.                               |
| tcp                | TCP                  | `1`           | Either `1` or `0` depending on the protocol used.                                            |
| ipVersion          | IP Version           | `6`           | IP protocol version used (currently `4` or `6`).                                             |
| querySizeBucket    | Query Size Bucket    | `16-31`       | Query size bucket by multiples of 16.                                                    |
| responseSizeBucket | Response Size Bucket | `16-31`       | Response size bucket by multiples of 16.                                                 |

{{</table-wrap>}}

## Filters

Filters use the form `dimension operator expression`, where each part corresponds to the following:
- **Dimension**: Specifies the [dimension](#dimensions) to filter on. For example, `queryName`.
- **Operator**: Defines the type of filter match to use. Operators are specific to dimensions.
- **Expression**: States the values to include or exclude from the results. Expressions use regular expression (regex) syntax.

### Filter operators

{{<table-wrap>}}

| Operator | Name                     | Example                | Description                                                            | URL Encoded |
|----------|--------------------------|------------------------|------------------------------------------------------------------|-------------|
| `==`       | Equals                   | `queryName==example.com` | Return results where query name is exactly `example.com`.            | `%3D%3D`      |
| `!=`       | Does not equal           | `responseCode!=NOERROR`  | Return results where response code is different from `NOERROR`.    | `!%3D`        |
| `>`        | Greater than             | `dimension>1000`        | Return results where a dimension is greater than `1000`.             | `%3E`         |
| `<`        | Less than                | `dimension<1000`        | Return results where a dimension is less than `1000`.              | `%3C`         |
| `>=`       | Greater than or equal to | `dimension>=1000`        | Return results where a dimension is greater than or equal to `1000`. | `%3E%3D`      |
| `<=`       | Less than or equal to    | `dimension<=1000`        | Return results where a dimension is less than or equal to `1000`.  | `%3C%3D`      |

{{</table-wrap>}}

### Combining filters

Combine filters using `OR` and `AND` boolean logic. `AND` takes precedence over `OR` in all expressions.

The `OR` operator is defined using a comma `,` or the `OR` keyword surrounded by whitespace.

<details>
<summary>Examples</summary>
<div>

- `responseCode==NOERROR,responseCode==NXDOMAIN` indicates that response code is either `NOERROR` or `NXDOMAIN`.

- `coloName==SJC OR coloName==LAX` indicates queries in either `SJC` or `LAX`.
  
</div>
</details>

The `AND` operator is defined using a semicolon `;` or the `AND` keyword surrounded by whitespace.

<details>
<summary>Examples</summary>
<div>
  
- `responseCode==NOERROR;queryType==AAAA` indicates that response code is `NOERROR` and query type is `AAAA`.
- `queryType==AAAA AND coloName==SJC` indicates `AAAA` queries in `SJC`.

</div>
</details>

{{<Aside type="note">}}

Note that the semicolon is a reserved character in URLs ([RFC 1738](https://www.rfc-editor.org/rfc/rfc1738)) and should be percent-encoded as `%3B`.

{{</Aside>}}