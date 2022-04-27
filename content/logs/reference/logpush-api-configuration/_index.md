---
pcx-content-type: concept
title: Logpush API configuration
weight: 42
---

# Logpush API configuration

## Endpoints

The table below summarizes the job operations available. All the examples in this page are for zone-scoped datasets. Account-scoped datasets should use `/accounts/<ACCOUNT_ID>` instead of `/zone/<ZONE_ID>`. For more information, refer to the [Log fields](/logs/reference/log-fields/) page.

The `<ZONE_ID>` argument is the zone id (hexadecimal string). The `<ACCOUNT_ID>` argument is the organization id (hexadecimal string). These arguments can be found using [API's zones endpoint](https://api.cloudflare.com/#getting-started-resource-ids).
The `<JOB_ID>` argument is the numeric job id. The `<DATASET>` argument indicates the log category (such as `http_requests`, `spectrum_events`, `firewall_events`, `nel_reports`, or `dns_logs`).

{{<table-wrap>}}

| Operation | Description | URL |
|---|---|---|
| `POST` | Create job | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs`](https://api.cloudflare.com/#logpush-jobs-create-logpush-job) |
| `GET` | Retrieve job | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/<JOB_ID>`](https://api.cloudflare.com/#logpush-jobs-logpush-job-details) |
| `GET` | Retrieve all jobs for all datasets | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs`](https://api.cloudflare.com/#logpush-jobs-list-logpush-jobs) |
| `GET` | Retrieve all jobs for a dataset  | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/datasets/<DATASET>/jobs`](https://api.cloudflare.com/#logpush-jobs-list-logpush-jobs-for-a-dataset) |
| `GET` | Retrieve all available fields for a dataset  | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/datasets/<DATASET>/fields`](https://api.cloudflare.com/#logpush-jobs-fields) |
| `PUT` | Update job | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/<JOB_ID>`](https://api.cloudflare.com/#logpush-jobs-update-logpush-job) |
| `DELETE` | Delete job | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/<JOB_ID>`](https://api.cloudflare.com/#logpush-jobs-delete-logpush-job) |
| `POST` | Check whether destination exists | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/validate/destination/exists`](https://api.cloudflare.com/#logpush-jobs-check-destination-exists) |
| `POST` | Get ownership challenge | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/ownership`](https://api.cloudflare.com/#logpush-jobs-get-ownership-challenge) |
| `POST` | Validate ownership challenge | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/ownership/validate`](https://api.cloudflare.com/#logpush-jobs-validate-ownership-challenge) |
| `POST` | Validate log options | [`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/validate/origin`](https://api.cloudflare.com/#logpush-jobs-validate-origin) |

{{</table-wrap>}}

For concrete examples, see the tutorial [Manage Logpush with cURL](/logs/reference/logpush-api-configuration/examples/example-logpush-curl/).

## Connecting

The Logpush API requires credentials like any other Cloudflare API.

```bash
$ curl -s -H "X-Auth-Email: <EMAIL>" -H "X-Auth-Key: <API_KEY>" \
    'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs'
```

## Ownership

Before creating a new job, ownership of the destination must be proven.

To issue an ownership challenge token to your destination:

```bash
$ curl -s -X POST https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/ownership \
-H "X-Auth-Email: <EMAIL>" \ 
-H "X-Auth-Key: <API_KEY>" \
-H "Content-Type: application/json" \ 
--data '{"destination_conf":"s3://<BUCKET_PATH>?region=us-west-2"}' | jq .
```

A challenge file will be written to the destination, and the filename will be in the response (the filename may be expressed as a path, if appropriate for your destination):

```bash
{
  "errors": [],
  "messages": [],
  "result": {
    "valid": true,
    "message": "",
    "filename": "<path-to-challenge-file>.txt"
  },
  "success": true
}
```

You will need to provide the token contained in the file when creating a job.

{{<Aside type="note" header="Note">}}

When using Sumo Logic, you may find it helpful to have [Live Tail](https://help.sumologic.com/05Search/Live-Tail/About-Live-Tail) open to see the challenge file as soon as it's uploaded.

{{</Aside>}}

## Destination

You can specify your cloud service provider destination via the required **destination\_conf** parameter.

*   **AWS S3**: bucket + optional directory + region + optional encryption parameter (if required by your policy); for example: `s3://bucket/[dir]?region=<REGION>[&sse=AES256]`
*   **Datadog**: Datadog endpoint URL + Datadog API key + optional parameters; for example: `datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=<SERVICE>&host=<HOST>&ddtags=<TAGS>`
*   **Google Cloud Storage**: bucket + optional directory; for example: `gs://bucket/[dir]`
*   **Microsoft Azure**: service-level SAS URL with `https` replaced by `azure` + optional directory added before query string; for example: `azure://<BlobContainerPath>/[dir]?<QueryString>`
*   **New Relic** New Relic endpoint URL which is `https://log-api.newrelic.com/log/v1` for US or `https://log-api.eu.newrelic.com/log/v1` for EU + a license key + a format; for example: for US `"https://log-api.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare"` and for EU `"https://log-api.eu.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare"`
*   **Splunk**: Splunk endpoint URL + Splunk channel ID + insecure-skip-verify flag + Splunk sourcetype + Splunk authorization token; for example: `splunk://<SPLUNK_ENDPOINT_URL>?channel=<SPLUNK_CHANNEL_ID>&insecure-skip-verify=<INSECURE_SKIP_VERIFY>&sourcetype=<SOURCE_TYPE>&header_Authorization=<SPLUNK_AUTH_TOKEN>`
*   **Sumo Logic**: HTTP source address URL with `https` replaced by `sumo`; for example: `sumo://<SumoEndpoint>/receiver/v1/http/<UniqueHTTPCollectorCode>`

For S3, Google Cloud Storage, and Azure, logs can be separated into daily subdirectories by using the special string `{DATE}` in the URL path; for example: `s3://mybucket/logs/{DATE}?region=us-east-1&sse=AES256` or `azure://myblobcontainer/logs/{DATE}?[QueryString]`. It will be substituted with the date in `YYYYMMDD` format, like `20180523`.

For more information on the value for your cloud storage provider, consult the following conventions:

*   [AWS S3 CLI](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html) (S3Uri path argument type)
*   [Google Cloud Storage CLI](https://cloud.google.com/storage/docs/gsutil) (Syntax for accessing resources)
*   [Microsoft Azure Shared Access Signature](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview)
*   [Sumo Logic HTTP Source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)

To check if a destination is already in use:

```bash
$ curl -s -XPOST https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/validate/destination/exists -d '{"destination_conf":"s3://foo"}' | jq .
```

Response

```bash
{
  "errors": [],
  "messages": [],
  "result": {
    "exists": false
  },
  "success": true
}
```

There can be only one job writing to each unique destination. For S3 and GCS, a destination is defined as bucket + path. This means two jobs can write to the same bucket, but must write to different subdirectories in that bucket.

## Job object

{{<Aside type="info" header="Note">}}

For a detailed description, refer to [Logpush job object definition](https://api.cloudflare.com/#logpush-jobs-properties).

{{</Aside>}}

## Options

Logpush repeatedly pulls logs on your behalf and uploads them to your destination.

Log options, such as fields or sampling rate, are configured in the **logpull\_options** job parameter (refer to [Logpush job object definition](https://api.cloudflare.com/#logpush-jobs-properties)). For example, the following query gets data from the Logpull API:

```bash
curl -sv \
    -H'X-Auth-Email: <EMAIL>' \
    -H'X-Auth-Key: <API_KEY>' \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received?start=2018-08-02T10:00:00Z&end=2018-08-02T10:01:00Z&fields=RayID,EdgeStartTimestamp"
```

In Logpush, the Logpull options would be: `"logpull_options": "fields=RayID,EdgeStartTimestamp"`. Refer to [Logpull API parameters](/logs/logpull/requesting-logs/#parameters) for more info.

If you do not change any options, you will receive logs with default fields that are unsampled (i.e., `sample=1`).

The four options that you can customize are:

1.  **Fields**: Refer to [Log fields](/logs/reference/log-fields/) for the currently available fields. The list of fields is also accessible directly from the API: `https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/datasets/<DATASET>/fields`. Default fields: `https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/datasets/<DATASET>/fields/default`.
2.  **Sampling rate**: Value can range from `0.001` to `1.0` (inclusive). `sample=0.1` means `return 10% (1 in 10) of all records`.
3.  **Timestamp format**: The format in which timestamp fields will be returned. Value options: `unixnano` (default), `unix`, `rfc3339`.
4.  **Optional redaction for CVE-2021-44228**: This option will replace every occurrence of `${` with `x{`.  To enable it, set `CVE-2021-44228=true`.
5.  **max_upload_bytes** (optional): The maximum uncompressed file size of a batch of logs. This must be at least 5 MB. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.
6.  **max_upload_records** (optional): The maximum number of log lines per batch. This must be at least 1000 lines or more. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.

{{<Aside type="note" header="Note">}}
The **CVE-2021-44228** parameter can only be set through the API at this time. Updating your Logpush job through the dashboard will set this option to false.
{{</Aside>}}

To check if **logpull\_options** are valid:

```bash
$ curl -s -XPOST https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/validate/origin -d '{"logpull_options":"fields=RayID,ClientIP,EdgeStartTimestamp&timestamps=rfc3339&CVE-2021-44228=true","dataset": "http_requests"}' | jq .
```

Response

```bash
{
  "errors": [],
  "messages": [],
  "result": {
    "valid": true,
    "message": "",
  },
  "success": true
}
```

## Custom fields

You can add custom fields to your HTTP request log entries in the form of HTTP request headers, HTTP response headers, and cookies. Custom fields configuration applies to all the Logpush jobs in a zone that use the HTTP requests dataset. To learn more, refer to [Configure custom fields](/logs/reference/logpush-api-configuration/custom-fields/).

## Audit

The following actions are recorded in **Cloudflare Audit Logs**: create, update, and delete job.
