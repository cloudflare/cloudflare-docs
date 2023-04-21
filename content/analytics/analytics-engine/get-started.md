---
title: Get started
pcx_content_type: how-to
weight: 1
meta:
  title: Get started with Workers Analytics Engine
---

# Get started with Workers Analytics Engine

There are four steps to get started with Workers Analytics Engine:

## 1. Enable Analytics Engine for your account

* Log into the Cloudflare dashboard.
* Navigate to the **Workers** page.
* Click **Set up** in the right hand side bar.
* Click **Enable Analytics Engine**

## 2. Configure your dataset and binding in Wrangler

All data in Workers Analytics Engine is written to a dataset. A dataset is conceptually like a table in SQL: the rows and columns should have consistent meaning.

To access your dataset from the Workers runtime, you need to create a binding using [Wrangler](/workers/wrangler/configuration/). A binding is like an [environment variable](/workers/platform/environment-variables/) that you can use in the Workers runtime which enables you to write to a dataset. A dataset is created implicitly after you define your binding and begin writing to it from a Worker.

In this guide, we will show you how to start using a dataset.

To define an Analytics Engine binding you must be using at least version 2.6.0 of Wrangler.
Add the binding to your `wrangler.toml` file, for example:

```toml
analytics_engine_datasets = [
    { binding = "<BINDING_NAME>" }
]
```

By default, the dataset name is the same as the binding name. If you want, you can also specify the dataset name:

```toml
analytics_engine_datasets = [
    { binding = "<BINDING_NAME>", dataset = "<DATASET_NAME>" }
]
```

## 3. Write data from your Worker

Once a binding is declared in Wrangler and your worker is deployed, you get a new environment variable in the Workers runtime that represents your Workers Analytics Engine dataset. This variable has a method, `writeDataPoint()`. A data point is a structured event which consists of a vector of blobs and a vector of doubles. Calls to `writeDataPoint` will return immediately while processing of the data point continues in the background.

A double is just a number type field that can be aggregated in some way – for example, it could be summed, averaged, or quantiled. A blob is a string type field that can be used for grouping or filtering. Indexes are strings that will be used as a [sampling](/analytics/analytics-engine/sql-api/#sampling) key.

For example, suppose you are collecting air quality samples. Each data point would represent a reading from your weather sensor. Doubles might include numbers like the temperature or air pressure reading. The blobs could include the location of the sensor and the hardware identifier of the sensor.

This is how it translates into code:

```js
  async fetch(request, env) {
    env.WEATHER.writeDataPoint({
      'blobs': ["Seattle", "USA", "pro_sensor_9000"],
      'doubles': [25, 0.5],
      'indexes': ["a3cd45"] // Sensor ID
    });
    return new Response("OK!");
  }
```

In our initial version, developers are responsible for **providing fields in a consistent order**, so that they have the same semantics when querying. In a future iteration, we plan to let developers name their blobs and doubles in the binding, and then use these names when writing data points in the runtime.

## 4. Query data using GraphQL and SQL API

Data can be queried using either [GraphQL](/analytics/graphql-api/) or the [SQL API](/analytics/analytics-engine/sql-api/).

The GraphQL API powers our dashboard and is better suited for building interactive dashboards. At this time, the GraphQL API exposes a highly simplified schema, though we plan to support a richer schema over time.

SQL API is better suited for writing ad hoc queries and integrating with external tools like Grafana. At this time, the SQL API only supports the `SELECT` statement and a limited subset of SQL functionality.

The SQL API is available as an HTTP endpoint at `https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/analytics_engine/sql` using the `POST` and `GET` method. You need to include an `Authorization: Bearer _____` token where the underscores should be replaced with a Cloudflare [API Token](https://dash.cloudflare.com/profile/api-tokens) that has the `Account Analytics Read` permission.

### Example of querying data with the SQL API

In the following example, we use the SQL API to query the top 10 cities that had the highest average humidity readings when the temperature was above zero.

Here is how we represent that as SQL. We are using a custom averaging function to take into account [sampling](/analytics/analytics-engine/sql-api/#sampling):

```sql
SELECT 
  blob1 AS city,
  SUM(_sample_interval * double2) / SUM(_sample_interval) AS avg_humidity
FROM WEATHER 
WHERE double1 > 0 
GROUP BY city 
ORDER BY avg_humidity DESC
LIMIT 10
```

You can then perform the query using any HTTP client. Here is an example of doing it using cURL:

```curl
curl -X POST "https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/analytics_engine/sql" -H "Authorization: Bearer YOUR_API_TOKEN" -d "SELECT blob1 AS city, SUM(_sample_interval * double2) / SUM(_sample_interval) AS avg_humidity FROM WEATHER WHERE double1 > 0 GROUP BY city ORDER BY avg_humidity DESC LIMIT 10"
```

Note that, for our initial version, blobs and doubles are accessed via names that have 1-based indexing. In the future, when developers will be able to name blobs and doubles in their binding, these names will also be available via the SQL API.

Refer to the [SQL API docs](/analytics/analytics-engine/sql-api/) for more information on connecting to and querying SQL API and the [Workers Analytics Engine SQL Reference](/analytics/analytics-engine/sql-reference/) for a full list of supported SQL functionality.

### Working with time series

Workers Analytics Engine is optimized for powering time series analytics that can be visualized using tools like Grafana. Every event written from the runtime is automatically populated with a `timestamp` field. It is expected that most time series will round, and then `GROUP BY` the `timestamp`. For example:

```sql
SELECT
  intDiv(toUInt32(timestamp), 300) * 300 AS t, 
  blob1 AS city, 
  SUM(_sample_interval * double2) / SUM(_sample_interval) AS avg_humidity
FROM WEATHER
WHERE
  timestamp >= NOW() - INTERVAL '1' DAY
  AND double1 > 0
GROUP BY t, city
ORDER BY t, avg_humidity DESC
```

This query first rounds the `timestamp` field to the nearest five minutes. Then we group by that field and city, and calculate the average humidity in each city for a five minute period.

Refer to [Querying Workers Analytics Engine from Grafana](/analytics/analytics-engine/grafana/) for more details on how to create efficient Grafana queries against Workers Analytics Engine.

## Limits

Cloudflare will accept up to twenty blobs, twenty doubles, and one index per request. The total size of all blobs in a request must not exceed 5120 bytes and the index must not be more than 32 bytes. Finally, there is also a limit of 25 writes per request.
