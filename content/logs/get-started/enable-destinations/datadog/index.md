---
title: Enable Datadog
pcx_content_type: how-to
weight: 59
layout: single
meta:
  title: Enable Logpush to Datadog
---

# Enable Logpush to Datadog

Cloudflare Logpush supports pushing logs directly to Datadog via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

Enable Logpush to Datadog via the dashboard.

To enable the Cloudflare Logpush service:

{{<render file="_enable-logpush-job.md">}}

7. In **Select a destination**, choose **Datadog**.

8. Enter or select the following destination information:

    - **Datadog URL Endpoint**, which can be either one below. You can find the difference at [Datadog API reference](https://docs.datadoghq.com/api/latest/logs/).

    {{<tabs labels="V1 | V2">}}
  {{<tab label="v1" no-code="true">}}

* `https://http-intake.logs.datadoghq.com/v1/input`

  {{</tab>}}
  {{<tab label="v2" no-code="true">}}

* `https://http-intake.logs.datadoghq.com/api/v2/logs`

  {{</tab>}}
    {{</tabs>}}

    - **Datadog API Key**, can be retrieved by following [these steps](https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token).

9. Select **Validate access**.

10. Select **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Datadog as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Manage via API

To set up a Datadog Logpush job:

1. Create a job with the appropriate endpoint URL and authentication parameters.
2. Enable the job to begin pushing logs.

{{<Aside type="note" header="Note">}}

Unlike configuring Logpush jobs for AWS S3, GCS, or Azure, there is no ownership challenge when configuring Logpush to Datadog.

{{</Aside>}}

{{<render file="_enable-read-permissions.md">}}

### 1. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

- **name** (optional) - Use your domain name as the job name.
- **destination_conf** - A log destination consisting of an endpoint URL, authorization header, and zero or more optional parameters that Datadog supports in the string format below.

  - `<DATADOG_ENDPOINT_URL>`: The Datadog HTTP logs intake endpoint, which can be either one below. You can find the difference at [Datadog API reference](https://docs.datadoghq.com/api/latest/logs/).

  {{<tabs labels="V1 | V2">}}
  {{<tab label="v1" no-code="true">}}

`https://http-intake.logs.datadoghq.com/v1/input`

  {{</tab>}}
  {{<tab label="v2" no-code="true">}}

`https://http-intake.logs.datadoghq.com/api/v2/logs`

  {{</tab>}}
  {{</tabs>}}

  - `<DATADOG_API_KEY>`: The Datadog API token can be retrieved by following [these steps](https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token). For example, `20e6d94e8c57924ad1be3c29bcaee0197d`.
  - `ddsource`: Set to `cloudflare`.
  - `service`, `host`, `ddtags`: Optional parameters allowed by Datadog.

```bash
"datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=<SERVICE>&host=<HOST>&ddtags=<TAGS>"
```

- **dataset** - The category of logs you want to receive. Refer to [Log fields](/logs/reference/log-fields/) for the full list of supported datasets.
- **logpull_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [API configuration options](/logs/get-started/api-configuration/#options).

Example request using cURL:

```bash
curl -s -X POST \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
-d '{"name":"<DOMAIN_NAME>",
"destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=<SERVICE>&host=<HOST>&ddtags=<TAGS>", "logpull_options": "fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&timestamps=rfc3339", "dataset": "http_requests"}' | jq .
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
    "logpull_options": "fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&timestamps=rfc3339",
    "destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

### 2. Enable (update) a job

To enable a job, make a `PUT` request to the Logpush jobs endpoint. You will use the job ID returned from the previous step in the URL and send `{"enabled": true}` in the request body.

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
    "logpull_options": "fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&timestamps=rfc3339",
    "destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

{{<Aside type="note" header="Note">}}
The Datadog destination is exclusive to new jobs and might not be backward compatible with older jobs. Create new jobs if you expect to send your logs directly to Datadog instead of modifying already existing ones. If you try to modify an existing job for another destination to push logs to Datadog, you may observe errors.
{{</Aside>}}

{{<Aside type="note" header="Note">}}
To analyze and visualize Cloudflare metrics using the Cloudflare Integration tile for Datadog, follow the steps in the [Datadog Analytics integration page](/fundamentals/data-products/analytics-integrations/datadog/).
{{</Aside>}}
