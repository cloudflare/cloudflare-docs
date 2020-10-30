---
title: Understanding the Logpush API
order: 61
---

# Understanding the Logpush API

## Endpoints

The table below summarizes the job operations available.

The `<zone_id>` argument is the zone id (hexadecimal string), which can be found using [API's zones endpoint](https://api.cloudflare.com/#getting-started-resource-ids).
The `<job>` argument is the numeric job id. The `<dataset>` argument indicates the log category (either `http_requests` or `spectrum_events`).

<TableWrap>

| Operation | Description | URL |
|---|---|---|
| POST | Create job | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/jobs</em> |
| GET | Retrieve job | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/jobs/&lt;job&gt;</em> |
| GET | Retrieve all jobs for all data sets | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/jobs</em> |
| GET | Retrieve all jobs for a data set  | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/datasets/&lt;dataset&gt;/jobs</em> |
| GET | Retrieve all available fields for a data set  | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/datasets/&lt;dataset&gt;/fields</em> |
| GET | Retrieve all default fields for a data set  | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/datasets/&lt;dataset&gt;/fields/default</em> |
| PUT | Update job | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/jobs/&lt;job&gt;</em> |
| DELETE | Delete job | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/jobs/&lt;job&gt;</em> |
| POST | Check whether destination exists | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/validate/destination/exists</em> |
| POST | Get ownership challenge | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/ownership</em> |
| POST | Validate ownership challenge | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/ownership/validate</em> |
| POST | Validate log options | <em>https://api.cloudflare.com/client/v4/zones/&lt;zone_id&gt;/logpush/validate/origin</em> |

</TableWrap>

For concrete examples, see the tutorial [Manage Logpush with cURL](/tutorials/tutorial-logpush-curl/).

## Connecting

The Logpush API requires credentials like any other Cloudflare API.

```bash
$ curl -s -H "X-Auth-Email: <REDACTED>" -H "X-Auth-Key: <REDACTED>" \
    'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs'
```

## Ownership

Before creating a new job, ownership of the destination must be proven.

To issue an ownership challenge token to your destination:

```bash
$ curl -s -XPOST https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/ownership -d '{"destination_conf":"s3://<BUCKET_PATH>?region=us-west-2"}' | jq .
```

A challenge file will be written to the destination, and the filename will be in the response (the filename may be expressed as a path if appropriate for your destination):

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

<Aside type="note" header="Note">

When using Sumo Logic, you may find it helpful to have [Live Tail](https://help.sumologic.com/05Search/Live-Tail/About-Live-Tail) open to see the challenge file as soon as it's uploaded.
</Aside>

## Destination

You can specify your cloud service provider destination via the required `destination_conf` parameter.

* **AWS S3**: bucket + optional directory + region + optional encryption parameter (if required by your policy); for example: `s3://bucket/[dir]?region=<region>[&sse=AES256]`
* **Google Cloud Storage**: bucket + optional directory; for example: `gs://bucket/[dir]`
* **Microsoft Azure**: service-level SAS URL with `https` replaced by `azure` + optional directory added before query string; for example: `azure://[BlobContainerPath]/[dir]?[QueryString]`
* **Sumo Logic**: HTTP source address URL with `https` replaced by `sumo`; for example: `sumo://[SumoEndpoint]/receiver/v1/http/[UniqueHTTPCollectorCode]`

For S3, Google Cloud Storage, and Azure, logs can be separated into daily subdirectories by using the special string `{DATE}` in the URL path; for example: `s3://mybucket/logs/{DATE}?region=us-east-1&sse=AES256` or `azure://myblobcontainer/logs/{DATE}?[QueryString]`. It will be substituted with the date in `YYYYMMDD` format, like `20180523`.

For more information on the value for your cloud storage provider, consult the following conventions:

* [AWS S3 CLI](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html) (S3Uri path argument type)
* [Google Cloud Storage CLI](https://cloud.google.com/storage/docs/gsutil) (Syntax for accessing resources)
* [Microsoft Azure Shared Access Signature](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview)
* [Sumo Logic HTTP Source](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)

To check if a destination is already in use:

```bash
$ curl -s -XPOST https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/validate/destination/exists -d '{"destination_conf":"s3://foo"}' | jq .
```

### Response

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

There can be only 1 job writing to each unique destination. For S3 and GCS, a destination is defined as bucket + path. This means two jobs can write to the same bucket, but must write to different subdirectories in that bucket.

## Job object

<Aside type="info" header="Info">

See a detailed description of the [Logpush object JSON schema](/logpush/logpush-configuration-api/job-json-schema/).
</Aside>

## Options

Logpush repeatedly pulls logs on your behalf and uploads them to your destination.

Log options, such fields or sampling rate, are configured in the `logpull_options` job parameter (*see [Logpush job object schema](/logpush/logpush-configuration-api/job-json-schema/)*). If you're migrating from the Logpull API, `logpull_options` is simply the query  string for the API call. For example, the following query gets data from the Logpull API:

```bash
curl -sv \
    -H'X-Auth-Email: <REDACTED>' \
    -H'X-Auth-Key: <REDACTED>' \
    "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/received?start=2018-08-02T10:00:00Z&end=2018-08-02T10:01:00Z&fields=RayID,EdgeStartTimestamp"
```

In Logpush, the *Logpull options* would be: `"logpull_options": "fields=RayID,EdgeStartTimestamp"`. *See [Logpull API parameters](/logpull-api/requesting-logs/#parameters)* for more info.

If you don't change any options, you will receive logs with default fields that are unsampled (i.e., `sample=1`).

The three options that you can customize are:

1. Fields; *see [Log fields](/log-fields/)* for the currently available fields. The list of fields is also accessible directly from the API: `https://api.cloudflare.com/client/v4/zones/<zone_id>/logpush/datasets/<dataset>/fields`. Default fields: `https://api.cloudflare.com/client/v4/zones/<zone_id>/logpush/datasets/<dataset>/fields/default`.
2. Sampling rate; value can range from 0.001 to 1.0 (inclusive). `sample=0.1` means return 10% (1 in 10) of all records.
3. Timestamp format; the format in which timestamp fields will be returned. Value options: unixnano (default), unix, rfc3339.

To check if `logpull_options` is valid:

```bash
$ curl -s -XPOST https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/validate/origin -d '{"logpull_options":"fields=RayID,ClientIP,EdgeStartTimestamp&timestamps=rfc3339","dataset": "http_requests"}' | jq .
```

### Response

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

## Audit

The following actions are recorded in **Cloudflare Audit Logs**: create, update, and delete job.
