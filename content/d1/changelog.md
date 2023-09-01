---
pcx_content_type: changelog
title: Changelog
weight: 11
rss: file
---

# Changelog

## 2023-08-19

### Row count now returned per query

D1 now returns a count of `rows_written` and `rows_read` for every query executed, allowing you to assess the cost of query for both [pricing](/d1/platform/pricing/) and [index optimization](/d1/learning/using-indexes/) purposes.

The `meta` object returned in [D1's Client API](/d1/platform/client-api/) contains a total count of the rows read (`rows_read`) and rows written (`rows_written`) by that query. For example, a query that performs a full table scan (for example, `SELECT * FROM users`) from a table with 5000 rows would return a `rows_read` value of `5000`:

```json
"meta": {
  "duration": 0.20472300052642825,
  "size_after": 45137920,
  "rows_read": 5000,
  "rows_written": 0
}
```

Refer to [D1 pricing documentation](/d1/platform/pricing/) to understand how reads and writes are measured. D1 remains free to use during the alpha period.

## 2023-08-09

### Bind D1 from the Cloudflare dashboard

You can now [bind a D1 database](/d1/get-started/#3-bind-your-worker-to-your-d1-database) to your Workers directly in the [Cloudflare dashboard](https://dash.cloudflare.com). To bind D1 from the Cloudflare dashboard, select your Worker project -> **Settings** -> **Variables** -> and select **D1 Database Bindings**.

Note: If you have previously deployed a Worker with a D1 database binding with a version of `wrangler` prior to `3.5.0`, you must upgrade to [`wrangler v3.5.0`](https://github.com/cloudflare/workers-sdk/releases/tag/wrangler%403.5.0) first before you can edit your D1 database bindings in the Cloudflare dashboard. New Workers projects do not have this limitation.

Legacy D1 alpha users who had previously prefixed their database binding manually with `__D1_BETA__` should remove this as part of this upgrade. Your Worker scripts should call your D1 database via `env.BINDING_NAME` only. Refer to the latest [D1 getting started guide](/d1/get-started/#3-bind-your-worker-to-your-d1-database) for best practices.

We recommend all D1 alpha users begin using wrangler `3.5.0` (or later) to benefit from improved TypeScript types and future D1 API improvements.

## 2023-08-01

### Per-database limit now 500 MB

Databases using D1's [new storage subsystem](/d1/changelog/#new-default-storage-subsystem) can now grow to 500 MB each, up from the previous 100 MB limit. This applies to both existing and newly created databases.

Refer to [Limits](/d1/platform/limits/) to learn about D1's limits.


## 2023-07-27

### New default storage subsystem

Databases created via the Cloudflare dashboard and Wrangler (as of `v3.4.0`) now use D1's new storage subsystem by default. The new backend can [be 6 - 20x faster](https://blog.cloudflare.com/d1-turning-it-up-to-11/) than D1's original alpha backend.

To understand which storage subsystem your database uses, run `wrangler d1 info YOUR_DATABASE` and inspect the version field in the output.

Databases with `version: beta` use the new storage backend and support the [Time Travel](/d1/learning/time-travel/) API. Databases with `version: alpha` only use D1's older, legacy backend.

### Time Travel

[Time Travel](/d1/learning/time-travel/) is now available. Time Travel allows you to restore a D1 database back to any minute within the last 30 days (Workers Paid plan) or 7 days (Workers Free plan), at no additional cost for storage or restore operations.

Refer to the [Time Travel](/d1/learning/time-travel/) documentation to learn how to travel backwards in time.

Databases using D1's [new storage subsystem](https://blog.cloudflare.com/d1-turning-it-up-to-11/) can use Time Travel. Time Travel replaces the [snapshot-based backups](/d1/learning/backups/) used for legacy alpha databases.

## 2023-06-28

### Metrics and analytics

You can now view [per-database metrics](/d1/platform/metrics-analytics/) via both the [Cloudflare dashboard](https://dash.cloudflare.com/) and the [GraphQL Analytics API](/analytics/graphql-api/).

D1 currently exposes read & writes per second, query response size, and query latency percentiles.

## 2023-06-16

### Generated columns documentation

New documentation has been published on how to use D1's support for [generated columns](/d1/learning/generated-columns/) to define columns that are dynamically generated on write (or read). Generated columns allow you to extract data from [JSON objects](/d1/learning/querying-json/) or use the output of other SQL functions.

## 2023-06-12

### Deprecating Error.cause

As of [`wrangler v3.1.1`](https://github.com/cloudflare/workers-sdk/releases/tag/wrangler%403.1.1) the [D1 client API](/d1/platform/client-api/) now returns [detailed error messages](/d1/platform/client-api/#errors) within the top-level `Error.message` property, and no longer requires developers to inspect the `Error.cause.message` property.

To facilitate a transition from the previous `Error.cause` behaviour, detailed error messages will continue to be populated within `Error.cause` as well as the top-level `Error` object until approximately July 14th, 2023. Future versions of both `wrangler` and the D1 client API will no longer populate `Error.cause` after this date.

## 2023-05-19

### New experimental backend

D1 has a new experimental storage back end that dramatically improves query throughput, latency and reliability. The experimental back end will become the default back end in the near future. To create a database using the experimental backend, use `wrangler` and set the `--experimental-backend` flag when creating a database: 

```sh
$ wrangler d1 create your-database --experimental-backend
```

Read more about the experimental back end in the [announcement blog](https://blog.cloudflare.com/d1-turning-it-up-to-11/).

### Location hints

You can now provide a [location hint](/d1/learning/data-location/) when creating a D1 database, which will influence where the leader (writer) is located. By default, D1 will automatically create your database in a location close to where you issued the request to create a database. In most cases this allows D1 to choose the optimal location for your database on your behalf.

## 2023-05-17

### Query JSON

[New documentation](/d1/learning/querying-json/) has been published that covers D1's extensive JSON function support. JSON functions allow you to parse, query and modify JSON directly from your SQL queries, reducing the number of round trips to your database, or data queried.
