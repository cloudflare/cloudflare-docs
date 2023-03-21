---
title: Usage-based billing for your SaaS product
pcx_content_type: how-to
weight: 1
meta:
  title: Usage-based billing for your SaaS product
---

# Usage-based billing for your Software-as-a-Service product

Many Cloudflare customers run software-as-a-service products with multiple customers. A big concern for such companies is understanding the cost of each customer, and understanding customer behaviour more widely.

Keeping data on every web request used by a customer can be expensive, as can attributing page views to customers. At Cloudflare we have solved this problem with the same in-house technologies now available to you through Analytics Engine.

## Recording data on usage

Analytics Engine is designed for use with Cloudflare Workers. If you already use Cloudflare Workers to serve requests, you can start sending data into Analytics Engine in just a few lines of code:

```javascript
  [...]

  // This examples assumes you give a unique ID to each of your SaaS customers, and the Worker has
  // assigned it to the variable named `customer_id`
  const { pathname } = new URL(request.url);
  env.USAGE_INDEXED_BY_CUSTOMER_ID.writeDataPoint({
    "indexes": [customer_id],
    "blobs": [pathname]
  });
```

SaaS customer activity often follows an exponential pattern: one customer may do 100 million requests per second, while another does 100 requests a day. If all data is sampled together, the usage of bigger customers can cause smaller customers data to be sampled to zero. Analytics Engine allows you to prevent that: in the example code above we supply the customer's unique ID as the index, causing Analytics Engine to sample your customers' individual activity.

## Viewing usage

You can start viewing customer data either using Grafana (for visualisations) or as JSON (for your own tools). Other areas of the Analytics Engine documentation explain this in-depth.

Look at customer usage over all endpoints:

```sql
SELECT
  index1 AS customer_id,
  sum(_sample_interval) AS count
FROM
  usage_indexed_by_customer_id
GROUP BY customer_id
```

If run in Grafana, this query returns a graph summarising the usage of each customer. The `sum(_sample_interval)` accounts for the sampling - see other Analytics Engine documentation. This query gives you an answer to "which customers are most active?"

The example `writeDataPoint` call above writes an endpoint name. If you do that, you can break down customer activity by endpoint:

```sql
SELECT
  index1 AS customer_id,
  blob1 AS request_endpoint,
  sum(_sample_interval) AS count
FROM
  usage_indexed_by_customer_id
GROUP BY customer_id, request_endpoint
```

This can give you insights into what endpoints different customers are using. This can be useful for business purposes (for example, understanding customer needs) as well for for your engineers to see activity and behaviour (observability).

## Billing customers

Analytics Engine can be used to bill customers based on a reliable approximation of usage. In order to get the best approximation, when generating bills we suggest executing one query per customer. This can result in less sampling than querying multiple customers at once.

```sql
SELECT
  index1 AS customer_id,
  blob1 AS request_endpoint,
  sum(_sample_interval) AS usage_count
FROM
  usage_indexed_by_customer_id
WHERE
  customer_id = 'substitute_customer_id_here'
  AND timestamp >= '2023-03-01 00:00:00'
  AND timestamp < '2023-04-01 00:00:00'
GROUP BY customer_id, request_endpoint
```

Running this query once for each customer at the end of each month could give you the data to produce a bill. This is just an example: most likely you'll want to adjust this example to how you want to bill.

When producing a bill, most likely you will also want to provide the daily costs. The following query breaks down usage by day:

```sql
SELECT
  index1 AS customer_id,
  toStartOfInterval(timestamp, INTERVAL '1' DAY) AS date,
  blob1 AS request_endpoint,
  sum(_sample_interval) AS request_count
FROM
  usage_indexed_by_customer_id
WHERE
  customer_id = 'x'
  AND timestamp >= '2023-03-01 00:00:00'
  AND timestamp < '2023-04-01 00:00:00'
GROUP BY customer_id, date, request_endpoint
```

You will want to take the usage queries above, adapt them for how you charge customers, and make a backend system run those queries and calculate the customer charges based on the data returned.
