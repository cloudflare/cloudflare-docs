---
pcx_content_type: concept
title: Metrics and analytics
---

# Metrics and analytics

R2 exposes analytics that allow you to inspect the requests and storage of the buckets in your account.

The metrics displayed for a bucket in the [Cloudflare dashboard](https://dash.cloudflare.com/) are queried from Cloudflare’s [GraphQL Analytics API](/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

R2 currently has two datasets:

| Dataset                 | GraphQL Dataset Name        | Description                                                   |
| ----------------------- | --------------------------- | ------------------------------------------------------------- |
| Operations              | `r2OperationsAdaptiveGroups`| This dataset consists of the operations taken buckets of an account.  |
| Storage                 | `r2StorageAdaptiveGroups`   | This dataset consists of the storage of buckets an account.   |

### Operations Dataset

| Field | Description |
| ----- | ----------- |
| actionType | The name of the operation performed. |
| actionStatus | The status of the operation. Can be `success`, `userError`, or `internalError`. |
| bucketName | The bucket this operation was performed on if applicable. For buckets with a jurisdiction specified, you must include the jurisdiction followed by an underscore before the bucket name. For example: eu_your-bucket-name |
| objectName | The object this operation was performed on if applicable. |
| responseStatusCode | The http status code returned by this operation. |
| datetime | The time of the request. |



### Storage Dataset

| Field | Description |
| ----- | ----------- |
| bucketName | The bucket this storage value is for. For buckets with a jurisdiction specified, you must include the jurisdiction followed by an underscore before the bucket name. For example: eu_your-bucket-name |
| payloadSize | The size of the objects in the bucket. |
| metadataSize | The size of the metadata of the objects in the bucket. |
| objectCount | The number of objects in the bucket. |
| uploadCount | The number of pending multipart uploads in the bucket. |
| datetime | The time that this storage value represents. |


Metrics can be queried (and are retained) for the past 31 days. These datasets require an `accountTag` filter with your Cloudflare account ID.

## View via the dashboard

Per-database analytics for R2 are available in the Cloudflare dashboard. To view current and historical metrics for a database:

2. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
3. Go to the [R2 tab](https://dash.cloudflare.com/?to=/:account/workers/r2) and select your bucket. 
5. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your R2 databases via the [GraphQL Analytics API](/analytics/graphql-api/). This API queries the same dataset as the Cloudflare dashboard, and supports GraphQL [introspection](/analytics/graphql-api/features/discovery/introspection/).

## Examples

### Operations

To query the volume of each operation type on a bucket for a given time period you can run a query as such

```graphql
query {
	viewer {
		accounts(filter: { accountTag: $accountId }) {
			r2OperationsAdaptiveGroups(
				limit: 10000
				filter: {
					datetime_geq: $startDate
					datetime_leq: $endDate
					bucketName: $bucketName 
				}
			) {
				sum {
					requests
				}
				dimensions {
					actionType
				} 
			}
		}
	}
}
```

The `bucketName` field can be removed to get an account level overview of operations. The volume of operations can be broken down even further by adding more dimensions to the query.

### Storage

To query the storage of a bucket over a given time period you can run a query as such.

```graphql
query {
	viewer {
		accounts(filter: { accountTag: $accountId }) {
			r2StorageAdaptiveGroups(
				limit: 10000
				filter: {
					datetime_geq: $startDate
					datetime_leq: $endDate
					bucketName: $bucketName 
				}
				orderBy: [datetime_DESC]
			) {
				max {
					objectCount,
					uploadCount,
					payloadSize,
					metadataSize
				}
				dimensions {
					datetime
				} 
			}
		}
	}
}
```
