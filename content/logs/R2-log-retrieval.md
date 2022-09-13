---
pcx_content_type: how-to
title: R2 Log Retrieval (beta)
weight: 117
---

# R2 Log Retrieval (beta)

Cloudflare’s Log Retrieval API allows you to query logs from R2 by providing a time range. This functionality is available in beta via the API documented here.

## Before getting started

- Set up a [Logpush to R2](/logs/get-started/enable-destinations/r2/) job.
- Create an [R2 access key](/r2/data-access/s3-compatibility/tokens/) with at least R2 read permissions.
- Ensure that you have Logshare read permissions.
- Alternatively, create a Cloudflare API token with the following permissions:
    - Account scope
    - Logs read permissions

## Authentication

The following headers are required for all API calls:
- `X-Auth-Email` - the Cloudflare account email address associated with the domain
- `X-Auth-Key` - the Cloudflare API key

Alternatively, API tokens with Logs edit permissions can also be used for authentication:
- `Authorization: Bearer <API_TOKEN>`

## List files

List relevant R2 objects containing logs matching the provided query parameters, using the endpoint `GET /accounts/{accountId}/logs/list`.

### Query parameters

- `start` (required) string <date-time> (TimestampRFC3339) - Start time in RFC3339 format, for example `start=2022-06-06T16:00:00Z`.

- `end` (required) string <date-time> (TimestampRFC3339) - End time in RFC3339 format, for example `end=2022-06-06T16:00:00Z`.

- `bucket` (required) string (Bucket) - R2 bucket name, for example `bucket=cloudflare-logs`.

- `prefix` string (Prefix) - R2 bucket prefix logs are stored under, for example `prefix=http_requests/example.com/{DATE}`.

- `limit` number (Limit) - Maximum number of results to return, for example `limit=100`.

### Header parameters

- `R2-Access-Key-Id` (required) string (AccessKeyId) - For example, `29a92f1a6e6887d79f3401a41`.

- `R2-Secret-Access-Key` (required) string (SecretAccessKey) - For example, `869b6e19534a6715ab69a07d76492d673f8134d`.

## Retrieve Logs

Stream logs stored in R2 that match the provided query parameters, using the endpoint `GET /accounts/{accountId}/logs/retrieve`.

### Query parameters

- `start` (required) string <date-time> (TimestampRFC3339) - Start time in RFC3339 format, for example `start=2022-06-06T16:00:00Z`

- `end` (required) string <date-time> (TimestampRFC3339) - End time in RFC3339 format, for example `end=2022-06-06T16:00:00Z`

- `bucket` (required) string (Bucket) - R2 bucket name, for example `bucket=cloudflare-logs`

- `prefix` string (Prefix) - R2 bucket prefix logs are stored under, for example `prefix=http_requests/exmaple.com/{DATE}`

### Header parameters

- `R2-Access-Key-Id` (required) string (AccessKeyId) - For example, `29a92f1a6e6887d79f3401a41`

- `R2-Secret-Access-Key` (required) string (SecretAccessKey) - For example, `869b6e19534a6715ab69a07d76492d673f8134d`

## Example API request

```bash
curl -s -g -X GET  'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logs/retrieve?start=2022-06-01T16:00:00Z&end=2022-06-01T16:05:00Z&bucket=cloudflare-logs&prefix=http_requests/exmaple.com/{DATE}' \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \ 
-H "R2-Access-Key-Id: R2_ACCESS_KEY_ID" \
-H "R2-Secret-Access-Key: R2_SECRET_ACCESS_KEY" | jq .
```

Results can be piped to a file using `> logs.json`.

Additionally, if you want to receive the raw GZIP bytes without them being transparently decompressed by your client, include the header `-H 'Accept-Encoding: gzip'`.

## Limits

HTTP status code `422` will be returned if the time range between the start and end parameters is too wide.

```json
{
    "result": null,
    "success": false,
    "messages": [],
    "errors": [
        {
            "code": 1002,
            "message": "Time range returned too many results. Try reducing the time range and try again."
        }
    ]
```

Try querying a shorter time range if you are running into this limit.

## FAQs

- What is the time delay between when an event happens and when I can query for it?

Logpush delivers logs in batches as soon as possible, generally in less than one minute. After this, logs can be accessed using the retrieval API.

- Does R2 have retention controls?

R2 does not currently have retention controls in place. You can query back as far as when you created the Logpush job.

- Which datasets is the retrieval API compatible with?

The retrieval API is compatible with all the datasets we support. The full list is available on the [Log fields](/logs/reference/log-fields/) section.
