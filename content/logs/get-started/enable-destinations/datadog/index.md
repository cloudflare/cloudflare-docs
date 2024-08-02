---
title: Enable Datadog
pcx_content_type: how-to
weight: 59
meta:
  title: Enable Logpush to Datadog
---

# Enable Logpush to Datadog

Cloudflare Logpush supports pushing logs directly to Datadog via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

{{<render file="_enable-logpush-job.md">}}

5.  In **Select a destination**, choose **Datadog**.

6. Enter or select the following destination information:
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

    - **Service**, **Hostname**, **Datadog ddsource field**, and **ddtags** fields can be set as URL parameters. For more information, refer to the [Logs section](https://docs.datadoghq.com/api/latest/logs/) in Datadog's documentation. While these parameters are optional, they can be useful for indexing or processing logs. Note that the values of these parameters may contain special characters, which should be URL encoded.

When you are done entering the destination details, select **Continue**.

7. Select the dataset to push to the storage service.

8. In the next step, you need to configure your logpush job:
    - Enter the **Job name**.
    - Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](/logs/reference/filters/) for more information. Not all datasets have this option available.
    - In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.

9. In **Advanced Options**, you can:
    - Choose the format of timestamp fields in your logs (`RFC3339`(default),`Unix`, or `UnixNano`).
    - Select a [sampling rate](/logs/get-started/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.
    - Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.

10. Select **Submit** once you are done configuring your logpush job.

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
- **output_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [Log Output Options](/logs/reference/log-output-options/).

Example request using cURL:

```bash
curl -s -X POST \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
"name":"<DOMAIN_NAME>",
"destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=<SERVICE>&host=<HOST>&ddtags=<TAGS>",
"output_options": {
    "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp", "EdgeResponseBytes", "EdgeResponseStatus" ,"EdgeStartTimestamp", "RayID"],
    "timestamp_format": "rfc3339"
},
"dataset": "http_requests"}' | jq .
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
    "output_options": {
        "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp", "EdgeResponseBytes", "EdgeResponseStatus" ,"EdgeStartTimestamp", "RayID"],
        "timestamp_format": "rfc3339"
    },
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
    "output_options": {
        "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp", "EdgeResponseBytes", "EdgeResponseStatus" ,"EdgeStartTimestamp", "RayID"],
        "timestamp_format": "rfc3339"
    },
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
To analyze and visualize Cloudflare metrics using the Cloudflare Integration tile for Datadog, follow the steps in the [Datadog Analytics integration page](/analytics/analytics-integrations/datadog/).
{{</Aside>}}
