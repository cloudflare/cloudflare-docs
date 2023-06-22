---
pcx_content_type: concept
title: API configuration
weight: 42
---

# API configuration

## Endpoints

The table below summarizes the job operations available for both Logpush and Edge Log Delivery jobs. Make sure that Account-scoped datasets use `/accounts/<account_identifier>` and Zone-scoped use `/zone/<zone_identifier>`. For more information, refer to the [Log fields](/logs/reference/log-fields/) page.

The `<zone_identifier>` argument is the zone id (hexadecimal string). The `<account_identifier>` argument is the organization id (hexadecimal string). These arguments can be found using [API's zones endpoint](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).
The `<job_identifier>` argument is the numeric job id. The `<dataset>` argument indicates the log category (such as `http_requests`, `spectrum_events`, `firewall_events`, `nel_reports`, or `dns_logs`).

{{<table-wrap>}}

| Operation | Description | API |
|---|---|---|
| `POST` | Create job | [Zone-scoped job](/api/operations/post-zones-zone_identifier-logpush-jobs) / [Account-scoped job](/api/operations/post-accounts-account_identifier-logpush-jobs) |
| `GET` | Retrieve job | [Zone-scoped job](/api/operations/get-zones-zone_identifier-logpush-jobs-job_identifier) / [Account-scoped job](/api/operations/get-accounts-account_identifier-logpush-jobs-job_identifier) |
| `GET` | Retrieve all jobs for all datasets | [Zone-scoped jobs](/api/operations/get-zones-zone_identifier-logpush-jobs) / [Account-scoped jobs](/api/operations/get-accounts-account_identifier-logpush-jobs) |
| `GET` | Retrieve all jobs for a dataset  | [Zone-scoped jobs](/api/operations/get-zones-zone_identifier-logpush-datasets-dataset-jobs) / [Account-scoped jobs](/api/operations/get-accounts-account_identifier-logpush-datasets-dataset-jobs) |
| `GET` | Retrieve all available fields for a dataset  | [Zone-scoped fields](/api/operations/get-zones-zone_identifier-logpush-datasets-dataset-fields) / [Account-scoped fields](/api/operations/get-accounts-account_identifier-logpush-datasets-dataset-fields) |
| `PUT` | Update job | [Zone-scoped job](/api/operations/put-zones-zone_identifier-logpush-jobs-job_identifier) / [Account-scoped job](/api/operations/put-accounts-account_identifier-logpush-jobs-job_identifier) |
| `DELETE` | Delete job | [Zone-scoped job](/api/operations/delete-zones-zone_identifier-logpush-jobs-job_identifier) / [Account-scoped job](/api/operations/delete-accounts-account_identifier-logpush-jobs-job_identifier) |
| `POST` | Check whether destination exists | [Zone-scoped job](/api/operations/post-zones-zone_identifier-logpush-validate-destination-exists) / [Account-scoped job](/api/operations/delete-accounts-account_identifier-logpush-validate-destination-exists) |
| `POST` | Get ownership challenge | [Zone-scoped job](/api/operations/post-zones-zone_identifier-logpush-ownership) / [Account-scoped job](/api/operations/post-accounts-account_identifier-logpush-ownership) |
| `POST` | Validate ownership challenge | [Zone-scoped job](/api/operations/post-zones-zone_identifier-logpush-ownership-validate) / [Account-scoped job](/api/operations/post-accounts-account_identifier-logpush-ownership-validate) |
| `POST` | Validate log options | [Zone-scoped job](/api/operations/post-zones-zone_identifier-logpush-validate-origin) / [Account-scoped job](/api/operations/post-accounts-account_identifier-logpush-validate-origin) |

{{</table-wrap>}}

For concrete examples, refer to the tutorials in [Logpush examples](/logs/tutorials/examples/).

## Connecting

The Logpush API requires credentials like any other Cloudflare API.

```bash
$ curl -s -H "X-Auth-Email: <EMAIL>" -H "X-Auth-Key: <API_KEY>" \
    'https://api.cloudflare.com/client/v4/zones/{zone_identifier}/logpush/jobs'
```

## Ownership

Before creating a new job, ownership of the destination must be proven.

To issue an ownership challenge token to your destination:

```bash
$ curl -s -X POST https://api.cloudflare.com/client/v4/zones/{zone_identifier}/logpush/ownership \
-H "X-Auth-Email: <EMAIL>" \ 
-H "X-Auth-Key: <API_KEY>" \
-H "Content-Type: application/json" \ 
--data '{"destination_conf":"s3://<BUCKET_PATH>?region=us-west-2"}' | jq .
```

A challenge file will be written to the destination, and the filename will be in the response (the filename may be expressed as a path, if appropriate for your destination):

```json
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

{{<Aside type="note" header="Note">}}
As of May 2022, defining a unique destination for a Logpush job will no longer be required. As this constraint has been removed, you can now have more than one job writing to the same destination.
{{</Aside>}}

*  **Cloudflare R2**: bucket path + account ID + R2 access key ID + R2 secret access key; for example: `r2://<BUCKET_PATH>?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>`
*   **AWS S3**: bucket + optional directory + region + optional encryption parameter (if required by your policy); for example: `s3://bucket/[dir]?region=<REGION>[&sse=AES256]`
*   **Datadog**: Datadog endpoint URL + Datadog API key + optional parameters; for example: `datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=<SERVICE>&host=<HOST>&ddtags=<TAGS>`
*   **Google Cloud Storage**: bucket + optional directory; for example: `gs://bucket/[dir]`
*   **Microsoft Azure**: service-level SAS URL with `https` replaced by `azure` + optional directory added before query string; for example: `azure://<BlobContainerPath>/[dir]?<QueryString>`
*   **New Relic** New Relic endpoint URL which is `https://log-api.newrelic.com/log/v1` for US or `https://log-api.eu.newrelic.com/log/v1` for EU + a license key + a format; for example: for US `"https://log-api.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare"` and for EU `"https://log-api.eu.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare"`
*   **Splunk**: Splunk endpoint URL + Splunk channel ID + insecure-skip-verify flag + Splunk sourcetype + Splunk authorization token; for example: `splunk://<SPLUNK_ENDPOINT_URL>?channel=<SPLUNK_CHANNEL_ID>&insecure-skip-verify=<INSECURE_SKIP_VERIFY>&sourcetype=<SOURCE_TYPE>&header_Authorization=<SPLUNK_AUTH_TOKEN>`
*   **Sumo Logic**: HTTP source address URL with `https` replaced by `sumo`; for example: `sumo://<SumoEndpoint>/receiver/v1/http/<UniqueHTTPCollectorCode>`

For R2, S3, Google Cloud Storage, and Azure, logs can be separated into daily subdirectories by using the special string `{DATE}` in the URL path; for example: `s3://mybucket/logs/{DATE}?region=us-east-1&sse=AES256` or `azure://myblobcontainer/logs/{DATE}?[QueryString]`. It will be substituted with the date in `YYYYMMDD` format, like `20180523`.

For more information on the value for your cloud storage provider, consult the following conventions:

*   [AWS S3 CLI](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html) (S3Uri path argument type)
*   [Google Cloud Storage CLI](https://cloud.google.com/storage/docs/gsutil) (Syntax for accessing resources)
*   [Microsoft Azure Shared Access Signature](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview)
*   [Sumo Logic HTTP Source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)

To check if a destination is already in use:

```bash
$ curl -s -XPOST https://api.cloudflare.com/client/v4/zones/{zone_identifier}/logpush/validate/destination/exists -d '{"destination_conf":"s3://foo"}' | jq .
```

Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "exists": false
  },
  "success": true
}
```

## Job object

{{<Aside type="note" header="Note">}}

For a detailed description, refer to the [API documentation](/api/operations/get-zones-zone_identifier-logpush-jobs).

{{</Aside>}}

## Kind

The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs. For Logpush jobs, this parameter can be left empty or omitted. For Edge Log Delivery jobs, set `"kind": "edge"`. Currently, Edge Log Delivery is only supported for the `http_requests` dataset.

{{<Aside type="note" header="Note">}}

The kind parameter cannot be used to update existing Logpush jobs. You can only specify the kind parameter when creating a new job. 

{{</Aside>}}

```bash
curl -s -X POST 'https://api.cloudflare.com/client/v4/zones/{zone_identifier}/logpush/jobs' \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
-d '{
 "name":"<DOMAIN_NAME>",
 "destination_conf":"s3://<BUCKET_PATH>?region=us-west-2",
 "dataset": "http_requests",
 "logpull_options":"fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&timestamps=rfc3339",
 "kind":"edge"
}' | jq .
```

## Options

Logpull_options has been replaced with Custom Log Formatting output_options. Please refer to the [Log Output Options](/logs/reference/log-output-options/) documentation for instructions on configuring these options and updating your existing jobs to use these options.

If you are still using logpull_options, here are the options that you can customize:

1.  **Fields** (optional): Refer to [Log fields](/logs/reference/log-fields/) for the currently available fields. The list of fields is also accessible directly from the API: `https://api.cloudflare.com/client/v4/zones/{zone_identifier}/logpush/datasets/{dataset}/fields`. Default fields: `https://api.cloudflare.com/client/v4/zones/{zone_identifier}/logpush/datasets/{dataset}/fields/default`.
2.  **Timestamp format** (optional): The format in which timestamp fields will be returned. Value options: `unixnano` (default), `unix`, `rfc3339`.
3.  **Redaction for CVE-2021-44228** (optional): This option will replace every occurrence of `${` with `x{`.  To enable it, set `CVE-2021-44228=true`.

{{<Aside type="note" header="Note">}}
The **CVE-2021-44228** parameter can only be set through the API at this time. Updating your Logpush job through the dashboard will set this option to false.
{{</Aside>}}

To check if the selected **logpull_options** are valid:

```bash
$ curl -s -XPOST https://api.cloudflare.com/client/v4/zones/{zone_identifier}/logpush/validate/origin 
-d '{ "logpull_options":"fields=RayID,ClientIP,EdgeStartTimestamp&timestamps=rfc3339&CVE-2021-44228=true”,
"dataset": "http_requests", 
}' | jq .
```

Response

```json
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

## Filter

Use filters to select the events to include and/or remove from your logs. For more information, refer to [Filters](/logs/reference/filters/).

## Sampling rate

Value can range from `0.0` (exclusive) to `1.0` (inclusive). `sample=0.1` means `return 10% (1 in 10) of all records`. The default value is `1`, meaning logs will be unsampled. 

## Max Upload Parameters

These parameters can be used to gain control of batch size in the case that a destination has specific requirements. Files will be sent based on whichever parameter is hit first. If these options are not set, the system uses our internal defaults of 30s, 100k records, or the destinations globally defined limits.

1.  **max_upload_bytes** (optional): The maximum uncompressed file size of a batch of logs. This setting value must be between 5MB and 1GB. Note that you cannot set a minimum file size; this means that log files may be much smaller than this batch size.
2.  **max_upload_records** (optional): The maximum number of log lines per batch. This setting must be between 1000 and 1,000,000 lines. Note that you cannot specify a minimum number of log lines per batch; this means that log files may contain many fewer lines than this.
3.  **max_upload_interval_seconds** (optional): The maximum interval in seconds for log batches. This setting must be between 30 and 300 seconds. Note that you cannot specify a minimum interval for log batches; this means that log files may be sent in shorter intervals than this.

{{<Aside type="note" header="Note">}}
Parameters **max_upload_bytes** and **max_upload_records** are not configurable for Edge Log Delivery.
{{</Aside>}}

## Custom fields

You can add custom fields to your HTTP request log entries in the form of HTTP request headers, HTTP response headers, and cookies. Custom fields configuration applies to all the Logpush jobs in a zone that use the HTTP requests dataset. To learn more, refer to [Custom fields](/logs/reference/custom-fields/).

## Audit

The following Logpush actions are recorded in **Cloudflare Audit Logs**: create, update, and delete job.
