---
pcx_content_type: concept
title: Metrics and analytics
weight: 10
---

# Metrics and analytics

D1 exposes database analytics that allow you to inspect query volume, query latency, and storage size across all and/or each database in your account.

The metrics displayed in the [Cloudflare dashboard](https://dash.cloudflare.com/) charts are queried from Cloudflare’s [GraphQL Analytics API](/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

D1 currently exports the below metrics:

| Metric                  | GraphQL Field Name         | Description                                                   |
| ----------------------- | -------------------------- | ------------------------------------------------------------- |
| Read Queries (qps)      | `readQueries`              | The number of read queries issued against a database. This is the raw number of read queries, and is not used for billing. |
| Write Queries (qps)     | `writeQueries`             | The number of write queries issued against a database. This is the raw number of write queries, and is not used for billing. |
| Rows read (count) | `rowsRead` | The number of rows read (scanned) across your queries. See [Pricing](/d1/platform/pricing/) for more details on how rows are counted. |
| Rows written (count) | `rowsWritten` | The number of rows written across your queries. |
| Query Response (bytes)  | `queryBatchResponseBytes`  | The total response size of the serialized query response, including any/all column names, rows and metadata. Reported in bytes. |
| Query Latency (ms)      | `queryBatchTimeMs`         | The total query response time, including response serialization, on the server-side. Reported in milliseconds. |
| Storage (Bytes)      | `databaseSizeBytes`         | Maximum size of a database. Reported in bytes. |

Metrics can be queried (and are retained) for the past 31 days.

### Row counts

D1 returns the number of rows read, rows written (or both) in response to each individual query via [the client API](/d1/build-with-d1/d1-client-api/#return-object).

Row counts are a precise count of how many rows were read (scanned) or written by that query.
Inspect row counts to understand the performance and cost of a given query, including whether you can reduce the rows read [using indexes](/d1/build-with-d1/use-indexes/). Use query counts to understand the total volume of traffic against your databases and to discern which databases are actively in-use.   

Refer to the [Pricing documentation](/d1/platform/pricing/) for more details on how rows are counted.

## View metrics in the dashboard

Per-database analytics for D1 are available in the Cloudflare dashboard. To view current and historical metrics for a database:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to [**Workers & Pages** > **D1**](https://dash.cloudflare.com/?to=/:account/workers/d1).
3. Select an existing database.
4. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your D1 databases via the [GraphQL Analytics API](/analytics/graphql-api/). This API queries the same datasets as the Cloudflare dashboard, and supports GraphQL [introspection](/analytics/graphql-api/features/discovery/introspection/).

D1's GraphQL datasets require an `accountTag` filter with your Cloudflare account ID and include:

- `d1AnalyticsAdaptiveGroups`
- `d1StorageAdaptiveGroups`
- `d1QueriesAdaptiveGroups`

### Examples

To query the sum of `readQueries`, `writeQueries` for a given `$databaseId`, grouping by `databaseId` and `date`:

```graphql
query {
	viewer {
		accounts(filter: { accountTag: $accountId }) {
			d1AnalyticsAdaptiveGroups(
				limit: 10000
				filter: {
					date_geq: $startDate
					date_leq: $endDate
					databaseId: $databaseId
				}
				orderBy: [date_DESC]
			) {
				sum {
					readQueries
					writeQueries
				}
				dimensions {
					date
					databaseId
				} 
			}
		}
	}
}
```

To query both the average `queryBatchTimeMs` and the 90th percentile `queryBatchTimeMs` per database:

```graphql
query {
	viewer {
		accounts(filter: { accountTag: $accountId }) {
			d1AnalyticsAdaptiveGroups(
				limit: 10000
				filter: {
					date_geq: $startDate
					date_leq: $endDate
					databaseId: $databaseId
				}
				orderBy: [date_DESC]
			) {
				quantiles {
					queryBatchTimeMsP90
				}
				dimensions {
					date
					databaseId
				} 
			}
		}
	}
}
```

To query your account-wide `readQueries` and `writeQueries`:

```graphql
query {
	viewer {
		accounts(filter: { accountTag: $accountId }) {
			d1AnalyticsAdaptiveGroups(
				limit: 10000
				filter: {
					date_geq: $startDate
					date_leq: $endDate
					databaseId: $databaseId
				}
			) {
				sum {
					readQueries
					writeQueries
				}
			}
		}
	}
}
```

## Query insights
D1 exposes metrics that let you understand and debug query performance. These metrics can be accessed via GraphQL's `d1QueriesAdaptiveGroups` or `wrangler d1 insights`command.

- Query strings are captured to make it easier to analyze metrics across query executions. Bound [parameters](/d1/build-with-d1/d1-client-api/#parameter-binding) are not captured to remove any sensitive information.
- Experimental wrangler command options and output can change. Run `wrangler d1 insights --help` to view the current command.

### Examples

To find top 10 queries by execution count:

```sh
$ npx wrangler d1 insights <database_name> --sort-type=sum --sort-by=count --count=10
```

To find top 10 queries by average execution time:

```sh
$ npx wrangler d1 insights <database_name> --sort-type=avg --sort-by=time --count=10
```

To find top 10 queries by rows written in last 7 days:

```sh
$ npx wrangler d1 insights <database_name> --sort-type=sum --sort-by=writes --count=10 --timePeriod=7d
```
