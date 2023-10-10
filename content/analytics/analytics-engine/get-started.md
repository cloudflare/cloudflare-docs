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

* Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
* Go to **Workers & Pages**.
* In **Overview**, find **Analytics Engine** in the right side bar and select **Set up**.
* Select **Enable Analytics Engine**

## 2. Configure your dataset and binding in Wrangler

All data in Workers Analytics Engine is written to a dataset. A dataset is conceptually like a table in SQL: the rows and columns should have consistent meaning.

To access your dataset from the Workers runtime, you need to create a binding using [Wrangler](/workers/wrangler/configuration/). A binding is like an [environment variable](/workers/configuration/environment-variables/) that you can use in the Workers runtime which enables you to write to a dataset. A dataset is created implicitly after you define your binding and begin writing to it from a Worker.

In this guide, we will show you how to start using a dataset.

{{<Aside type="note">}}
  
To define an Analytics Engine binding you must be using at least version 2.6.0 of [Wrangler](/workers/wrangler/install-and-update/).

{{</Aside>}}

Add the binding to your `wrangler.toml` file, for example:

```toml
---
filename: wrangler.toml
---
[[analytics_engine_datasets]]
binding = "<BINDING_NAME>"
```

By default, the dataset name is the same as the binding name.

* The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables).
* For example, `binding = "MY_DATASET"` or `binding = "metricsDataset"` would both be valid names for the binding.
* Your binding is available in your Worker at `env.<BINDING_NAME>` and exposes the `writeDataPoint` method.

If you want, you can also specify the dataset name:

```toml
---
filename: wrangler.toml
---
[[analytics_engine_datasets]]
binding = "<BINDING_NAME>"
dataset = "<DATASET_NAME>"
```

Save the changes that you made to your `wrangler.toml` file. Redeploy your Worker by running `npx wrangler deploy` from the Terminal window to update the changes. In the dashboard, you can also verify if your deployment was successful.

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

Besides writing static data points, a common use case of Workers Analytics Engine is to capture information about incoming HTTP requests.

In the runtime API documentation, you can find  information about the [variables](/workers/runtime-apis/request/). Because these variables are already available in the runtime, you will not need to define them. In other words, you can directly use `request.cf.<variable name>` as a blob or double field. Using this adaptation of this Worker [example](/workers/examples/geolocation-hello-world/) template, you can write the geolocation variables to Analytics Engine.

```js
env.<EXAMPLE_DATASET>.writeDataPoint({
  'blobs': [ 
    request.cf.colo, 
    request.cf.country, 
    request.cf.city, 
    request.cf.region, 
    request.cf.timezone
  ],
  'doubles': [
    request.cf.metroCode, 
    request.cf.longitude, 
    request.cf.latitude
  ],
  'indexes': [
    request.cf.postalCode
  ] 
});
```

In our initial version, developers are responsible for **providing fields in a consistent order**, so that they have the same semantics when querying. In a future iteration, we plan to let developers name their blobs and doubles in the binding, and then use these names when writing data points in the runtime.

## 4. Query data using GraphQL and SQL API

Data can be queried using either [GraphQL](/analytics/graphql-api/) or the [SQL API](/analytics/analytics-engine/sql-api/).

The GraphQL API powers our dashboard and is better suited for building interactive dashboards. At this time, the GraphQL API exposes a highly simplified schema, though we plan to support a richer schema over time.

SQL API is better suited for writing ad hoc queries and integrating with external tools like Grafana. At this time, the SQL API only supports the `SELECT` statement and a limited subset of SQL functionality.

The SQL API is available as an HTTP endpoint at `https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/analytics_engine/sql` using the `POST` and `GET` method. You need to include an `Authorization: Bearer _____` token where the underscores should be replaced with a Cloudflare [API Token](https://dash.cloudflare.com/profile/api-tokens) that has the `Account Analytics Read` permission.

If you prefer a graphical interface, you can use [Postman](https://www.postman.com/) to connect to the SQL API endpoint and run your query. Postman is an application that can be used to test APIs. You can use the endpoint mentioned above using the `POST` and `GET` methods.

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

This query first rounds the `timestamp` field to the nearest five minutes. Then, it groups by that field and city and calculates the average humidity in each city for a five minute period.

Refer to [Querying Workers Analytics Engine from Grafana](/analytics/analytics-engine/grafana/) for more details on how to create efficient Grafana queries against Workers Analytics Engine.

## Limits

The following limits apply to Analytics Engine:

* Analytics Engine will accept up to twenty blobs, twenty doubles, and one index per request.
* The total size of all blobs in a request must not exceed 5120 bytes.
* Each index must not be more than 96 bytes.
* There is also a limit of 25 writes (`writeDataPoint` invocations) per client HTTP request.

## Data retention

* Data will be stored in Workers Analytics Engine for three months. In the future, we plan to offer longer retention periods.
