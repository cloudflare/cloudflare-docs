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
  // This example also assumes you have set `request_endpoint` to  id available to your worker
  env.USAGE_INDEXED_BY_CUSTOMER_ID.writeDataPoint({
    "indexes": [customer_id],
    "blobs": {
      customer_id,
      request_endpoint
    }
  });
```

SaaS customer activity often follows an exponential pattern: one customer may do 100 million requests per second, while another does 100 requests a day. If all data is sampled together, the usage of bigger customers can cause smaller customers data to be sampled to zero. Analytics Engine allows you to prevent that: in the example code above we supply the customer's unique ID as the index, causing Analytics Engine to sample your customers' individual activity.

## Viewing usage

You can start viewing customer data either using Grafana (for visualisations) or as JSON (for your own tools.) Other areas of the Analytics Engine documentation explain this in-depth.

Look at customer usage over all endpoints:

```sql
SELECT
  blob1 AS customer_id,
  sum(_sample_interval) AS count
FROM
  usage_indexed_by_customer_id
GROUP BY customer_id
```

If run in Grafana, this query returns a graph showing an accurate estimation of the usage of each customer. The `sum(_sample_interval)` accounts for the sampling - see other Analytics Engine documentation. This query gives you an answer to "which customers are most active?"

The example `writeDataPoint` call above writes an endpoint name. If you do that, you can break down customer activity by endpoint:

```sql
SELECT
  blob1 AS customer_id,
  blob2 AS request_endpoint,
  sum(_sample_interval) AS count
FROM
  usage_indexed_by_customer_id
GROUP BY customer_id, request_endpoint
```

This can give you insights into what endpoints different customers are using. This can be useful for business purposes (e.g. understanding customer needs) as well for for your engineers to see activity and behaviour (observability).

## Billing customers

Billing customers based on Analytics Engine data means that bills are a (reliable) approximation of usage, rather than being exact. Because Analytics Engine samples, you can only approximate customer usage. This is actually a feature: because Analytics Engine makes it cheap to capture customer usage, you're able to cheaply bill on how much customer usage really costs, rather than having to charge a flat fee and struggling for cheap insights into customer's actual usage.

To bill customers, you'll want to take the usage queries above and make a backend system run those queries and calculate the customer charge based on the data returned.
