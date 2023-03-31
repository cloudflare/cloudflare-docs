---
pcx_content_type: how-to
title: Logs Engine
weight: 117
---

# Logs Engine

Logs Engine gives you the ability to store your logs in R2 and query them directly.

## Store logs in R2

- Set up a [Logpush to R2](/logs/get-started/enable-destinations/r2/) job.
- Create an [R2 access key](/r2/api/s3/tokens/) with at least R2 read permissions.
- Ensure that you have Logshare read permissions.
- Alternatively, create a Cloudflare API token with the following permissions:
    - Account scope
    - Logs read permissions

## Query logs

You can use the API to query and download your logs by time range or RayID.

## Authentication

The following headers are required for all API calls:
- `X-Auth-Email` - the Cloudflare account email address associated with the domain
- `X-Auth-Key` - the Cloudflare API key

Alternatively, API tokens with Logs edit permissions can also be used for authentication:
- `Authorization: Bearer <API_TOKEN>`

### Required headers

In addition to the required authentication headers mentioned, the following headers are required for the API to access logs stored in your R2 bucket. 

`R2-access-key-id` (required) - [R2 Access Key Id](/r2/api/s3/tokens/)
`R2-secret-access-key` (required) - [R2 Secret Access Key](/r2/api/s3/tokens/)

## List files

List relevant R2 objects containing logs matching the provided query parameters, using the endpoint `GET /accounts/{accountId}/logs/list`.

### Query parameters

- `start` (required) string <date-time> (TimestampRFC3339) - Start time in RFC 3339 format, for example `start=2022-06-06T16:00:00Z`.

- `end` (required) string <date-time> (TimestampRFC3339) - End time in RFC 3339 format, for example `end=2022-06-06T16:00:00Z`.

- `bucket` (required) string (Bucket) - R2 bucket name, for example `bucket=cloudflare-logs`.

- `prefix` string (Prefix) - R2 bucket prefix logs are stored under, for example `prefix=http_requests/example.com/{DATE}`.

- `limit` number (Limit) - Maximum number of results to return, for example `limit=100`.

## Retrieve logs by time range

Stream logs stored in R2 that match the provided query parameters, using the endpoint `GET /accounts/{accountId}/logs/retrieve`.

### Query parameters

- `start` (required) string <date-time> (TimestampRFC3339) - Start time in RFC 3339 format, for example `start=2022-06-06T16:00:00Z`

- `end` (required) string <date-time> (TimestampRFC3339) - End time in RFC 3339 format, for example `end=2022-06-06T16:00:00Z`

- `bucket` (required) string (Bucket) - R2 bucket name, for example `bucket=cloudflare-logs`

- `prefix` string (Prefix) - R2 bucket prefix logs are stored under, for example `prefix=http_requests/example.com/{DATE}`

### Example API request

```bash
curl -s -g -X GET  'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logs/retrieve?start=2022-06-01T16:00:00Z&end=2022-06-01T16:05:00Z&bucket=cloudflare-logs&prefix=http_requests/example.com/{DATE}' \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \ 
-H "R2-Access-Key-Id: R2_ACCESS_KEY_ID" \
-H "R2-Secret-Access-Key: R2_SECRET_ACCESS_KEY" | jq .
```

Results can be piped to a file using `> logs.json`.

Additionally, if you want to receive the raw GZIP bytes without them being transparently decompressed by your client, include the header `-H 'Accept-Encoding: gzip'`.

## ​Retrieve logs by RayID

Using your logs stored in R2 - the Logpull RayID Lookup feature allows you to query an indexed time range for the presence of an RayID and return the matching result. This feature is available to users with the Logpull RayID Lookup beta subscription.

The ability to look up a RayID is a two-step process. First, a time range needs to be indexed before being able to request a record by the RayID.

Indexes will automatically expire after seven days of no usage.

### Index a time range

Before executing your query, you can specify the time range you would like to index in order to narrow down the scope of the query. In the following example, we index one minute of logs stored in the R2 bucket `"cloudflare-logs"` under the prefix `"http_requests/{DATE}"`.

### Example API request

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logs/rayids/index' \
    -H 'Authorization: Bearer <API_TOKEN>' \
    -H 'R2-Access-Key-Id: <R2_ACCESS_KEY_ID>' \
    -H 'R2-Secret-Access-Key: <R2_SECRET_ACCESS_KEY>' \
    -H 'Content-Type: application/json' \
    --data-raw '{
    "start":"2022-08-16T20:30:00Z",
    "end":"2022-08-16T20:31:00",
    "bucket": "cloudflare-logs",
    "prefix": "http_requests/example.com/{DATE}"
}'
```

## Lookup a RayID

After indexing a time range, perform a `GET` request with the RayID. If a matching result is found in the indexed time range, the record will be returned. Note that the parameters have moved from the request body and into the URL. The `-g` flag is required to avoid the `{DATE}` parameter from being misinterpreted by cURL.

### Example API request

```bash
curl -g -X GET 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logs/rayids/<RAY_ID>?bucket=cloudflare-logs&prefix=http_requests/example.com/{DATE}' \
    -H 'Authorization: Bearer <API_TOKEN>' \
    -H 'R2-Access-Key-Id: <R2_ACCESS_KEY_ID>' \
    -H 'R2-Secret-Access-Key: <R2_SECRET_ACCESS_KEY>'
```

## Troubleshooting

<details>
<summary>I am getting an error when accessing the API</summary>
<div>

- **Error**: Time range returned too many results. Try reducing the time range and try again.

HTTP status code `422` will be returned if the time range between the start and end parameters is too wide. Try querying a shorter time range if you are running into this limit.


- **Error**: Provided token does not have the required features enabled.

Contact your account representative to have the beta Logpull RayID Lookup subscription added to your account.

- **Error**: Time range returned too many results. Try reducing the time range and try again.

High volume zones can produce many log files in R2. Try reducing your start and end time range until you find a duration that works best for your log volume. 

</div>
</details>

<details>
<summary>How do I know what time range to index?</summary>
<div>

Currently, there is no process to index logs as they arrive. If you have the RayID and know the time the request was made, try indexing the next 5-10 minutes of logs after the request was completed. 

</div>
</details>

<details>
<summary>What is the time delay between when an event happens and when I can query for it?</summary>
<div>

Logpush delivers logs in batches as soon as possible, generally in less than one minute. After this, logs can be accessed using Logs Engine.

</div>
</details>

<details>
<summary>Does R2 have retention controls?</summary>
<div>

R2 does not currently have retention controls in place. You can query back as far as when you created the Logpush job.

</div>
</details>

<details>
<summary>Which datasets is Logs Engine compatible with?</summary>
<div>

The retrieval API is compatible with all the datasets we support. The full list is available on the [Log fields](/logs/reference/log-fields/) section.

</div>
</details>
