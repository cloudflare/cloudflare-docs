---
pcx_content_type: changelog
title: Changelog
weight: 11
rss: file
---

# Changelog

## 2023-06-12

As of [`wrangler` v3.1.1`](https://github.com/cloudflare/workers-sdk/releases/tag/wrangler%403.1.1) the [D1 client API](/d1/platform/client-api/) now returns [detailed error messages](/d1/platform/client-api/#errors) within the top-level `Error.message` property, and no longer requires developers to inspect the `Error.cause.message` property.

In order to facilitate a transition from the previous `Error.cause` behaviour, detailed error messages will continue to be populated within `Error.cause` as well as the top-level `Error` object until June 30th, 2023. Future versions of both `wrangler` and the D1 client API will no longer populate `Error.cause` after this date.
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
