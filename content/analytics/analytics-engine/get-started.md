---
title: Get started
pcx-content-type: how-to
weight: 1
meta:
  title: Get started with Workers Analytics Engine
---

# Get started with Workers Analytics Engine

There are three steps to get started with Workers Analytics Engine:

## 1. Configure your dataset and binding in Wrangler

All data in Workers Analytics Engine is written to a dataset. A dataset is conceptually like a “table” in SQL; the rows and columns should have consistent meaning.

To get started using the Workers Analytics Engine, you need to create a dataset and a binding that associates a given Worker with a dataset. This is done by editing [wrangler.toml](/workers/wrangler/configuration/). For example:

```bash
[analytics_engine]
bindings = [
    { name = "<EVENT_NAME>" }
]
```

## 2. Write data from the Workers Runtime API

Once a binding is declared in Wrangler and your worker is deployed, you get a new [environment variable](/workers/platform/environment-variables/) in the Workers runtime that represents your Workers Analytics Engine dataset. This variable has a method, `writeDataPoint()`. A data point is a structured event which consists of a vector of labels and a vector of metrics.

A metric is just a number type field that can be aggregated in some way – for example, it could be summed, averaged, or quantiled. A label is a string type field that can be used for grouping or filtering.

For example, suppose you are collecting air quality samples. Each data point would represent a reading from your weather sensor. Metrics might include numbers like the temperature or air pressure reading. The labels could include the location of the sensor and the hardware identifier of the sensor.

This is how it translates into code:

```bash
  async fetch(request: Request, env) {
    env.WEATHER.writeDataPoint({
      labels: ["Seattle", "USA", "pro_sensor_9000”],
      metrics: [25, 0.5]
    });
    return new Response("OK!");
  }
```

In our initial version, developers are responsible for **providing fields in a consistent order**, so that they have the same semantics when querying. In a future iteration, we plan to let developers name their labels and metrics in the binding, and then use these names when writing data points in the runtime.

## 3. Query data using GraphQL and SQL API.

Data can be queried using either GraphQL or SQL API.

The GraphQL UI powers our dashboard and is better suited for building interactive dashboards. At this time, the GraphQL API exposes a highly simplified schema, though we plan to support a richer schema over time.

SQL API is better suited for writing ad hoc queries and integrating with external tools like Grafana. At this time, the SQL API only supports the `SELECT` statement and a limited subset of SQL functionality.

The SQL API is available as an HTTP rest endpoint at `/v4/$accountTag/analytics_engine/sql` using the `POST` and `GET` method.

### Example of querying data with the SQL API

In the following example, we use the SQL API to query the top 10 cities that had the highest average humidity readings when the temperature was above 0:

```bash
SELECT label_1 as city, avg(metric_2) as avg_humidity
FROM analytics_engine
WHERE 
  dataset = 'WEATHER'
  AND metric_1 > 0
ORDER BY avg_humidity DESC
LIMIT 10
```

Note that, for our initial version, labels and metrics are accessed via names that have 1-based indexing. In the future, when we let developers name labels and metrics in their binding, these names will also be available via the SQL API.

### Working with time series

Workers Analytics Engine is optimized for powering time series analytics that can be visualized using tools like Grafana. Every event written from the runtime is automatically populated with a `datetime` field. It is expected that most time series will round, and then GROUP BY the `datetime`. For example:

```bash
SELECT
  intDiv(datetime, 300) * 300 as t, 
  label_1 as city, 
  avg(metric_2) as avg_humidity, 
FROM analytics_engine
WHERE 
  dataset = 'WEATHER'
  AND timestamp >= now() - 86400
  AND metric_1 > 0
GROUP BY t, city
ORDER BY t, avg_humidity desc
```

This query first rounds the datetime field to the nearest five minutes. Then we group by that field and city and calculate the average humidity in each city for a five minute period. 