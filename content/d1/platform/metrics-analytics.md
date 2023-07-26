---
pcx_content_type: concept
title: Metrics and analytics
---

# Metrics and analytics

D1 exposes database analytics that allow you to inspect query volume, response size, and query latency across all and/or each database in your account.

The metrics displayed in the [Cloudflare dashboard](https://dash.cloudflare.com/) charts are queried from Cloudflare’s [GraphQL Analytics API](/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

D1 currently exports the below metrics:

| Metric                  | GraphQL Field Name         | Description                                                   |
| ----------------------- | -------------------------- | ------------------------------------------------------------- |
| Read Queries (qps)      | `readQueries`              | The number of read queries issued against a database. This is the raw number of read queries, and is not used for billing. |
| Write Queries (qps)     | `writeQueries`             | The number of write queries issued against a database. This is the raw number of write queries, and is not used for billing. |
| Query Response (bytes)  | `queryBatchResponseBytes`  | The total response size of the serialized query response, including any/all column names, rows and metadata. Reported in bytes. |
| Query Latency (ms)      | `queryBatchTimeMs`         | The total query response time, including response serialization, on the server-side. Reported in milliseconds. |

Metrics can be queried (and are retained) for the past 31 days.

## View via the dashboard

Per-database analytics for D1 are available in the Cloudflare dashboard. To view current and historical metrics for a database:

2. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
3. Go to [**Workers & Pages** > **D1**](https://dash.cloudflare.com/?to=/:account/workers/d1).
4. Select an existing database.
5. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your D1 databases via the [GraphQL Analytics API](/analytics/graphql-api/). This API queries the same dataset as the Cloudflare dashboard, and supports GraphQL [introspection](/analytics/graphql-api/features/discovery/introspection/).

D1's GraphQL dataset is `d1AnalyticsAdaptiveGroups` and requires an `accountTag` filter with your Cloudflare account ID.

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
