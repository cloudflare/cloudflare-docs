---
title: SQL API
pcx_content_type: reference
weight: 4
meta:
  title: Workers Analytics Engine SQL API
---

# Workers Analytics Engine SQL API

The Workers Analytics Engine SQL API is an HTTP API that allows executing SQL queries against your Workers Anaytics Engine datasets.

The API is hosted at `https://api.cloudflare.com/client/v4/accounts/<account_id>/analytics_engine/sql`. 

## Authentication

Authentication is done via bearer token. An `Authorization: Bearer <token>` header must be supplied with every request to the API.

Use the dashboard to create a token with permssion to read analytics data on your account:

1. Visit the [API tokens](https://dash.cloudflare.com/profile/api-tokens) page in the Cloudflare dashboard.
2. Select **Create Token**.
3. Select **Create Custom Token**.
4. Complete the **Create Custom Token** form as follows:
   * Give your token a descriptive name.
   * For **Permissions** select _Account_ | _Account Analytics_ | _Read_
   * Optionally configure account and IP restrictions and TTL.
   * Submit and confirm the form to create the token.
5. Make a note of the token string.

## Querying the API

Submit the query text in the body of a `POST` request to the API address. The format of the data returned can be selected using the [`FORMAT` option](/analytics/analytics-engine/sql-reference/#format-clause) in your query.

You can use cURL to test the API as follows, replacing the `<account_id>` with your 32 character account ID (available in the dashboard) and the `<token>` with the token string you generated above.

```sh
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<account_id>/analytics_engine/sql" -H "Authorization: Bearer <token>" -d "SELECT 'Hello Workers Analytics Engine' AS message"
```

If you have already published some data, you might try executing the following to confirm that the dataset has been created in the DB.

```sh
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<account_id>/analytics_engine/sql" -H "Authorization: Bearer <token>" -d "SHOW TABLES"
```

Refer to the Workers Analytics Engine [SQL reference](/analytics/analytics-engine/sql-reference/), for the full supported query syntax.

## Table structure

A new table will automatically be created for each dataset once you start writing events to it from your worker.

The table will have the following columns:

{{<table-wrap>}}

| Name | Type | Description |
|------|------|-------------|
| dataset | string | This column will contain the dataset name in every row. |
| timestamp | DateTime | The timestamp at which the event was logged in your worker. |
| _sample_interval | integer | In case that the data has been sampled, this column indicates what the sample rate is for this row (i.e. how many rows of the original data are represented by this row). Refer to the [sampling](#sampling) section below for more information. |
| index1 | string | The index value that was logged with the event. The value in this column is used as the key for sampling.
| blob1<br>...<br>blob20 | string | The blob values that were logged with the event. |
| double1<br>...<br>double20 | double | The double values that were logged with the event. |

{{</table-wrap>}}

## Sampling

At very high volumes of data, Analytics Engine will downsample data in order to be able to maintain performance. Sampling can occur on write and on read.
Sampling is based on the index of your dataset so that only indexes that receive large numbers of events will be sampled. For example, if your worker serves multiple customers, you might consider making customer ID the index field. This would mean that if one customer starts making a high rate of requests then events from that customer could be sampled while other customers data remains unsampled.

We have tested this system of sampling over a number of years at Cloudflare and it has enabled us to scale our web analytics systems to very high throughput, while still providing statistically meaningful results irrespective of the amount of traffic a website receives.

The rate at which the data is sampled is exposed via the `_sample_interval` column. This means that if you are doing statistical analysis of your data, you may need to take this column into account. For example:

{{<table-wrap>}}

| Original query | Query taking into account sampling |
|----------------|------------------------------------|
| `SELECT COUNT() FROM ... ` | `SELECT SUM(_sample_interval) FROM ...` |
| `SELECT SUM(double1) FROM ...` | `SELECT SUM(_sample_interval * double1) FROM ...` |
| `SELECT AVG(double1) FROM ...` | `SELECT SUM(_sample_interval * double1) / SUM(_sample_interval) FROM ...` |

{{</table-wrap>}}

Additionally, the [QUANTILEWEIGHTED function](/analytics/analytics-engine/sql-reference/#quantileweighted) is designed to be used with sample interval as the third argument.

## Example queries

### Select data with column aliases

Column aliases can be used in queries to give names to the blobs and doubles in your dataset:

```SQL
SELECT
    timestamp,
    blob1 AS location_id,
    double1 AS inside_temp,
    double2 AS outside_temp
FROM temperatures
WHERE timestamp > NOW() - INTERVAL '1' DAY
```

### Aggregation taking into account sample interval

Calculate number of readings taken at each location in the last 7 days. In this case, we are grouping by the index field so an exact count can be calculated even in the case that the data has been sampled:

```SQL
SELECT
    index1 AS location_id,
    SUM(_sample_interval) AS n_readings
FROM temperatures
WHERE timestamp > NOW() - INTERVAL '7' DAY
GROUP BY index1
```

Calculate the average temperature over the last 7 days at each location. Sample interval is taken into account:

```SQL
SELECT
    index1 AS location_id,
    SUM(_sample_interval * double1) / SUM(_sample_interval) AS average_temp
FROM temperatures
WHERE timestamp > NOW() - INTERVAL '7' DAY
GROUP BY index1
```