---
title: Enable New Relic
pcx_content_type: how-to
weight: 64
meta:
  title: Enable Logpush to New Relic
---

# Enable Logpush to New Relic

Cloudflare Logpush supports pushing logs directly to New Relic via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

{{<render file="_enable-logpush-job.md">}}

5. In **Select a destination**, choose **New Relic**.

6. Enter the **New Relic Logs Endpoint**:

    {{<tabs labels="US | EU">}}
  {{<tab label="US" no-code="true">}}

* `"https://log-api.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare"`

  {{</tab>}}
  {{<tab label="EU" no-code="true">}}

* `"https://log-api.eu.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare"`

  {{</tab>}}
    {{</tabs>}}

    Use the region that matches the one that has been set on your New Relic account. The **License key** field can be found on the New Relic dashboard. It can be retrieved by following [these steps](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#manage-license-key).

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

{{<render file="_enable-read-permissions.md">}}

### 1. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

- **name** (optional) - Use your domain name as the job name.

- **logpull_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [API configuration options](/logs/get-started/api-configuration/#options).

   {{<Aside type="note" header="Note">}}
   To query Cloudflare logs, New Relic requires fields to be sent as a Unix Timestamp.
   {{</Aside>}}

- **destination_conf** - A log destination consisting of an endpoint URL, a license key and a format in the string format below.

  - `<NR_ENDPOINT_URL>`: The New Relic HTTP logs intake endpoint, which is `https://log-api.newrelic.com/log/v1` for US or `https://log-api.eu.newrelic.com/log/v1` for the EU, depending on the region that has been set on your New Relic account.
  - `<NR_LICENSE_KEY>`: This key can be found on the New Relic dashboard and it can be retrieved by following [these steps](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#manage-license-key).
  - `format`: The format is `cloudflare`.

    US: `"https://log-api.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare"`

    EU: `"https://log-api.eu.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare"`

- **max_upload_records** (optional) - The maximum number of log lines per batch. This must be at least 1,000 lines or more. Note that there is no way to specify a minimum number of log lines per batch. This means that log files may contain many fewer lines than specified.

- **max_upload_bytes** (optional) - The maximum uncompressed file size of a batch of logs. This must be at least 5 MB. Note that there is no way to set a minimum file size. This means that log files may be much smaller than this batch size. Nevertheless, it is recommended to set this parameter to 5,000,000.

- **dataset** - The category of logs you want to receive. Refer to [Log fields](/logs/reference/log-fields/) for the full list of supported datasets.

Example request using cURL:

```bash
curl -s https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs -X POST -d '
{
  "name": "<DOMAIN_NAME>",
  "logpull_options": "fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&timestamps=unix",
  "destination_conf": "https://log-api.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare",
  "max_upload_bytes": 5000000,
  "dataset": "http_requests",
  "enabled": true
}' \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" | jq .
```

Response:

```json
{
   "errors" : [],
   "messages" : [],
   "result" : {
      "dataset" : "http_requests",
      "destination_conf" : "https://log-api.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare",
      "enabled" : true,
      "error_message" : null,
      "frequency" : "high",
      "id" : 100,
      "kind" : "",
      "last_complete" : null,
      "last_error" : null,
      "logpull_options" : "fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&timestamps=unix",
      "logstream" : true,
      "max_upload_bytes" : 5000000,
      "name" : "<DOMAIN_NAME>"
   },
   "success" : true
}
```

### 2. Enable (update) a job

To enable a job, make a `PUT` request to the Logpush jobs endpoint. You will use the job ID returned from the previous step in the URL and send `{"enabled": true}` in the request body.

Example request using cURL:

```bash
curl -s -X PUT \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/100 -d'{"enabled":true}' \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" | jq .
```

Response:

```json
{
   "errors" : [],
   "messages" : [],
   "result" : {
      "dataset" : "http_requests",
      "destination_conf" : "https://log-api.newrelic.com/log/v1?Api-Key=<NR_LICENSE_KEY>&format=cloudflare",
      "enabled" : true,
      "error_message" : null,
      "frequency" : "high",
      "id" : 100,
      "kind" : "",
      "last_complete" : "null",
      "last_error" : null,
      "logpull_options" : "fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&timestamps=unix",
      "logstream" : true,
      "max_upload_bytes" : 5000000,
      "name" : "<DOMAIN_NAME>"
   },
   "success" : true
}
```

 {{<Aside type="note" header="Note">}}
To analyze and visualize Cloudflare metrics using the Cloudflare Network Logs quickstart, follow the steps in the [New Relic Analytics integration page](/analytics/analytics-integrations/new-relic/).
{{</Aside>}}