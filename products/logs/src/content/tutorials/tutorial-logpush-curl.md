---
title: Manage Logpush with cURL
order: 87
---

# Manage Logpush with cURL

You can manage your Cloudflare Logpush service from the command line using cURL.

Before getting started, review:

* [Understanding the Logpush API](/logpush/logpush-configuration-api/understanding-logpush-api)
* [Job object JSON schema](/logpush/logpush-configuration-api/job-json-schema)

## Step 1 - Get ownership challenge

```bash
curl -s -X POST \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/ownership \
-d '{"destination_conf":"s3://<BUCKET_PATH>?region=us-west-2"}' | jq .
```

### Parameters
* *destination_conf* - see [Destination](/logpush/logpush-configuration-api/understanding-logpush-api/#destination) for details

### Response

A challenge file will be written to the destination, and the filename will be in the response (the filename may be expressed as a path if appropriate for your destination). For example:

```bash
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "filename": "burritobot/logs/ownership-challenge.txt",
    "valid": true,
    "message": ""
  }
}
```

You will need to provide the token contained in this file when creating a job in the next step.

<Aside type="note" header="Note">

When using Sumo Logic, you may find it helpful to have [Live Tail](https://help.sumologic.com/05Search/Live-Tail/About-Live-Tail) open to see the challenge file as soon as it's uploaded.
</Aside>

## Step 2 - Create a job

```bash
curl -s -X POST \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs \
-d'{"name":"<DOMAIN_NAME>", "destination_conf":"s3://<BUCKET_PATH>?region=us-west-2", "dataset": "http_requests", "logpull_options":"fields=RayID,EdgeStartTimestamp&timestamps=rfc3339", "ownership_challenge":"00000000000000000000"}' | jq .
```

### Parameters

* *name* (optional) - we suggest using your domain name as the job name; cannot be changed after the job is created
* *destination_conf* - see [Destination](/logpush/logpush-configuration-api/understanding-logpush-api/#destination) for details
* *dataset* - the category of logs you want to receive; either  `http_requests` (default), `spectrum_events`, or `firewall_events`; cannot be changed after the job is created
* *logpull_options* (optional) - see [Options](/logpush/logpush-configuration-api/understanding-logpush-api/#options)
    * Typically includes the desired fields and timestamp format
    * Set the timestamp format to RFC 3339 (`&timestamps=rfc3339`) for:
      * Google BigQuery usage
      * Automated timestamp parsing within Sumo Logic; *see [timestamps from Sumo Logic](https://help.sumologic.com/03Send-Data/Sources/04Reference-Information-for-Sources/Timestamps%2C-Time-Zones%2C-Time-Ranges%2C-and-Date-Formats) for details*
* *ownership_challenge* - challenge token required to prove destination ownership

### Response

In the response, you get a newly-created job ID. For example:

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "id": 146,
    "dataset": "http_requests",
    "enabled": false,
    "name": "<DOMAIN_NAME>",
    "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
    "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

Note that you can validate the `logpull_options` parameter before including it in your job configuration:

```bash
curl -s -X POST https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/validate/origin -d '{"logpull_options": "fields=EdgeStartTimestamp,RayID,CacheCacheStatus&timestamps=rfc3339", "dataset": "http_requests"}' | jq .
```

### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "message": "",
    "valid": true
  },
  "success": true
}
```

## Step 3 - Enable (update) a job

Start by retrieving information about a specific job, using a job ID:

```bash
curl -s -X GET \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/146 | jq .
```

### Response

```json
{
 "errors": [],
 "messages": [],
 "result": {
     "id": 146,
     "dataset": "http_requests",
     "enabled": false,
     "name": "<DOMAIN_NAME>",
     "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
     "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2",
     "last_complete": null,
     "last_error": null,
     "error_message": null
 },
 "success": true
}
```

Note that by default a job is not enabled (`"enabled": false`).

If you don't remember your job ID, you can retrieve it using your zone ID:

```bash
curl -s -X GET \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs | jq .
```

Next, to enable the job, send an update request:

```bash
curl -s -X PUT \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/146 -d'{"enabled":true}' | jq .
```

### Response

```json
{
 "errors": [],
 "messages": [],
 "result": {
     "id": 146,
     "dataset": "http_requests",
     "enabled": true,
     "name": "<DOMAIN_NAME>",
     "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
     "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2",
     "last_complete": null,
     "last_error": null,
     "error_message": null
 },
 "success": true
}
```

Once the job is enabled, you will start receiving logs within a few minutes and then in batches as soon as possible until you disable the job. For zones with very high request volume, it may take several hours before you start receiving logs for the first time.

In addition to modifying *enabled*, you can also update the value for *logpull_options*. To modify *destination_conf*, you will need to request an ownership challenge and provide the associated token with your update request. You can also delete your current job and create a new one.

Once a job has been enabled and has started executing, the *last_complete* field will show the time when the last batch of logs was successfully sent to the destination:

### Request to get job by ID and see *last_complete* info

```bash
curl -s -X GET \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>logpush/jobs/146 | jq .
```

### Response

```json
{"errors": [],
 "messages": [],
 "result": {
     "id": 146,
     "dataset": "http_requests",
     "enabled": true,
     "name": "<DOMAIN_NAME>",
     "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
     "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2",
     "last_complete": "2018-08-09T21:26:00Z",
     "last_error": null,
     "error_message": null
 },
 "success": true
}
```

## Step 4 - Delete a job

```bash
curl -s -X DELETE \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/146 | jq .
```

Be careful when deleting a job because this action cannot be reversed.

### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {},
  "success": true
}
```

## Step 5 - Retrieve your job

Retrieve a specific job, using the job ID:

```bash
curl -s -X GET https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/146 | jq .
```

### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [
    {
     "id": 146,
     "dataset": "http_requests",
     "enabled": true,
     "name": "<DOMAIN_NAME>",
     "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
     "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2",
     "last_complete": null,
     "last_error": null,
     "error_message": null
    }
  ],
  "success": true
}
```

Retrieve all jobs for all data sets:

```bash
curl -s -X GET https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs | jq .
```

### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "id": 8029,
      "dataset": "spectrum_events",
      "enabled": true,
      "name": "<DOMAIN_NAME>",
      "logpull_options": "fields=Application,ClientAsn,ClientIP,ColoCode,Event,OriginIP,Status",
      "destination_conf": "s3://<BUCKET_PATH_SPECTRUM_EVENTS>?region=us-west-2",
      "last_complete": "2019-10-01T00:25:00Z",
      "last_error": null,
      "error_message": null
    },
    {
      "id": 7826,
      "dataset": "http_requests",
      "enabled": false,
      "name": "<DOMAIN_NAME>",
      "logpull_options": "fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&timestamps=rfc3339&sample=0.06",
      "destination_conf": "s3://<BUCKET_PATH_HTTP_REQUESTS>?region=us-west-2",
      "last_complete": "2019-09-24T21:15:00Z",
      "last_error": null,
      "error_message": null
    },
```
