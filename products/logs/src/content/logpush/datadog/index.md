---
title: Enable Datadog
order: 58
---

# Enable Logpush to Datadog

Cloudflare Logpush now supports pushing logs directly to Datadog via API.

To set up a Datadog Logpush job:
1. Create a job with the appropriate endpoint URL and authentication parameters
2. Enable the job to begin pushing logs

<Aside type="note" header="Note">

Note: Unlike configuring Logpush jobs for AWS S3, GCS, or Azure, there is no ownership challenge when configuring Logpush to Datadog. 

</Aside>

## 1. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:
* `name` (optional) - Use your domain name as the job name.
* `destination_conf` - A log destination consisting of an endpoint URL, authorization header, and zero or more optional parameters that Datadog supports in the string format below. 

  * `<DATADOG-ENDPOINT-URL>`: The Datadog http logs intake endpoint, which is 'http-intake.logs.datadoghq.com/v1/input' 
  * `<DATADOG-API-KEY>`: The Datadog API token. For example, '20e6d94e8c57924ad1be3c29bcaee0197d"
  * `service`, `host`, `ddsource`, `ddtags`: Optional parameters allowed by Datadog

```bash
"datadog://<DATADOG-ENDPOINT-URL>?header_DD-API-KEY=<DATADOG-API-KEY>&service=<SERVICE>&host=<HOST>&ddsource=<SOURCE>"
```

* `dataset` - the category of logs you want to receive. See [Log fields](https://developers.cloudflare.com/logs/log-fields) for the full list of supported datasets. 
* `logpull_options` (optional) - To configure fields, sample rate, and timestamp format, see [Logpush API options](https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options)

Example request using cURL:

```bash
curl -s -X POST \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs \
-H "X-Auth-Email: user@example.com" \
-H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
-d '{"name":"<DOMAIN_NAME>",
"destination_conf":"datadog://<DATADOG-ENDPOINT-URL>?header_DD-API-KEY=<DATADOG-API-KEY>",  "logpull_options":"fields=RayID,EdgeStartTimestamp&timestamps=rfc3339", "dataset":"http_requests"}' | jq .
```

Response:

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "id": 100,
    "dataset": "http_requests",
    "enabled": false,
    "name": "<DOMAIN_NAME>",
    "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
    "destination_conf": "datadog://<DATADOG-ENDPOINT-URL>?header_DD-API-KEY=<DATADOG-API-KEY>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

## 2. Enable (update) a job

To enable a  job, make a `PUT` request to the Logpush jobs endpoint. You’ll use the job ID returned from the previous step in the URL and send `{"enabled": true}` in the request body.

Example request using cURL:

```bash
curl -s -X PUT \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/100 -d'{"enabled":true}' | jq .
```

Response:

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "id": 100,
    "dataset": "http_requests",
    "enabled": true,
    "name": "<DOMAIN_NAME>",
    "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
    "destination_conf": "datadog://<DATADOG-ENDPOINT-URL>?header_DD-API-KEY=<DATADOG-API-KEY>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

## Troubleshooting

### I am observing errors pushing to Datadog after I modify an existing job for another destination to push logs to Datadog.
Datadog destination is exclusive to new jobs and might not be backward compatible with older jobs. Create new jobs if you expect to send your logs directly to Datadog instead of modifying already existing ones.
