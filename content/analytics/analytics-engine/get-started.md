---
title: Get started
pcx_content_type: how-to
weight: 1
meta:
  title: Get started with Workers Analytics Engine
---

# Get started

## 1. Name your dataset and add it to your Worker

Add the following to your `wrangler.toml` file to create a [binding](/workers/configuration/bindings/) to a Workers Analytics Engine dataset. A dataset is like a table in SQL: the rows and columns should have consistent meaning.

```toml
---
filename: wrangler.toml
---
[[analytics_engine_datasets]]
binding = "<BINDING_NAME>"
dataset = "<DATASET_NAME>"
```

## 2. Write data points from your Worker

You can write data points to your Worker by calling the `writeDataPoint()` method that is exposed on the binding that you just created.

```js
async fetch(request, env) {
  env.WEATHER.writeDataPoint({
    'blobs': ["Seattle", "USA", "pro_sensor_9000"], // City, State
    'doubles': [25, 0.5],
    'indexes': ["a3cd45"]
  });
  return new Response("OK!");
}
```

{{<Aside type="note">}}
You do not need to await `writeDataPoint()` — it will return immediately, and the Workers runtime handles writing your data in the background.
{{</Aside>}}

A data point is a structured event that consists of:

- **Blobs** (strings) — The dimensions used for grouping and filtering. Sometimes called labels in other metrics systems.
- **Doubles** (numbers) — The numeric values that you want to record in your data point. 
- **Indexes** — (strings) — Used as a [sampling](/analytics/analytics-engine/sql-api/#sampling) key.

In the example above, suppose you are collecting air quality samples. Each data point written represents a reading from your weather sensor. The blobs define city, state, and sensor model — the dimensions you want to be able to filter queries on later. The doubles define the numeric temperature and air pressure readings. And the index is the ID of your customer. You may want to include [context about the incoming request](/workers/runtime-apis/request/), such as geolocation, to add additional data to your datapoint.

Currently, the `writeDataPoint()` API accepts ordered arrays of values. This means that you must provide fields in a consistent order. While the `indexes` field accepts an array, you currently must only provide a single index. If you attempt to provide multiple indexes, your data point will not be recorded. 

## 3. Query data using the SQL API

You can query the data you have written in two ways:

- [**SQL API**](/analytics/analytics-engine/sql-api) — Best for writing your own queries and integrating with external tools like Grafana.
- [**GraphQL API**](/analytics/graphql-api/) — This is the same API that powers the Cloudflare dashboard.

For the purpose of this example, we will use the SQL API.

### Create an API token

Create an [API Token](https://dash.cloudflare.com/profile/api-tokens) that has the `Account Analytics Read` permission.

### Write your first query

The following query returns the top 10 cities that had the highest average humidity readings when the temperature was above zero:

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

{{<Aside type="note">}}
We are using a custom averaging function to take [sampling](/analytics/analytics-engine/sql-api/#sampling) into account.
{{</Aside>}}

You can run this query by making an HTTP request to the SQL API:

```curl
curl -X POST "https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/analytics_engine/sql" -H "Authorization: Bearer YOUR_API_TOKEN" -d "SELECT blob1 AS city, SUM(_sample_interval * double2) / SUM(_sample_interval) AS avg_humidity FROM WEATHER WHERE double1 > 0 GROUP BY city ORDER BY avg_humidity DESC LIMIT 10"
```

Refer to the [Workers Analytics Engine SQL Reference](/analytics/analytics-engine/sql-reference/) for a full list of supported SQL functionality.

### Working with time series data

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

This query first rounds the `timestamp` field to the nearest five minutes. Then, it groups by that field and city and calculates the average humidity in each city for a five minute period.

Refer to [Querying Workers Analytics Engine from Grafana](/analytics/analytics-engine/grafana/) for more details on how to create efficient Grafana queries against Workers Analytics Engine.

## Further reading

{{<directory-listing folderDirectory="/analytics/analytics-engine/">}}
