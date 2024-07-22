---
title: Enable Splunk
pcx_content_type: how-to
weight: 64
meta:
  title: Enable Logpush to Splunk
---

# Enable Logpush to Splunk

Cloudflare Logpush supports pushing logs directly to Splunk via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

{{<render file="_enable-logpush-job.md">}}

5.  In **Select a destination**, choose **Splunk**.

6. Enter or select the following destination information:
    - **Splunk raw HTTP Event Collector URL**
    - **Channel ID** - This is a random GUID that you can generate using [guidgenerator.com](http://guidgenerator.com/).
    - **Auth Token**
    - **Source Type** - For example, `cloudflare:json`.
    - **Use insecure skip verify option** (not recommended).

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

To set up a Splunk Logpush job:

1. Create a job with the appropriate endpoint URL and authentication parameters.
2. Enable the job to begin pushing logs.

{{<Aside type="note" header="Note">}}

Unlike configuring Logpush jobs for AWS S3, GCS, or Azure, there is no ownership challenge when configuring Logpush to Splunk.

{{</Aside>}}

{{<render file="_enable-read-permissions.md">}}

### 1. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

- **name** (optional) - Use your domain name as the job name.
- **destination_conf** - A log destination consisting of an endpoint URL, channel id, insecure-skip-verify flag, source type, authorization header in the string format below.

  - **\<SPLUNK_ENDPOINT_URL>**: The Splunk raw HTTP Event Collector URL with port. For example: `splunk.cf-analytics.com:8088/services/collector/raw`.
    - Cloudflare expects the HEC network port to be configured to `:443` or `:8088`.
    - Cloudflare expects the Splunk endpoint to be `/services/collector/raw` while configuring and setting up the Logpush job.
    - Ensure you have enabled HEC in Splunk. Refer to [Splunk Analytics Integrations](/analytics/analytics-integrations/splunk/) for information on how to set up HEC in Splunk.
    - You may notice an API request failed with a 504 error, when adding an incorrect URL. Splunk Cloud endpoint URL usually contains `http-inputs-` or similar text before the hostname. Refer to [Send data to HTTP Event Collector on Splunk Cloud Platform](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector#Send_data_to_HTTP_Event_Collector) for more details.
  - **\<SPLUNK_CHANNEL_ID>**: A unique channel ID. This is a random GUID that you can generate by:
    - Using an online tool like the [GUID generator](https://www.guidgenerator.com/).
    - Using the command line. For example: `python -c 'import uuid; print(uuid.uuid4())'`.
  - **\<INSECURE_SKIP_VERIFY>**: Boolean value. Cloudflare recommends setting this value to `false`. Setting this value to `true` is equivalent to using the `-k` option with `curl` as shown in Splunk examples and is **not** recommended. Only set this value to `true` when HEC uses a self-signed certificate.

{{<Aside type="note" header="Note">}}
Cloudflare highly recommends setting this value to <code class="InlineCode">false</code>. Refer to the [Logpush FAQ](/logs/faq/logpush/) for more information.
{{</Aside>}}

- `<SOURCE_TYPE>`: The Splunk source type. For example: `cloudflare:json`.
- `<SPLUNK_AUTH_TOKEN>`: The Splunk authorization token that is URL-encoded. For example: `Splunk%20e6d94e8c-5792-4ad1-be3c-29bcaee0197d`.

```bash
"splunk://<SPLUNK_ENDPOINT_URL>?channel=<SPLUNK_CHANNEL_ID>&insecure-skip-verify=<INSECURE_SKIP_VERIFY>&sourcetype=<SOURCE_TYPE>&header_Authorization=<SPLUNK_AUTH_TOKEN>"
```

- **dataset** - The category of logs you want to receive. Refer to [Log fields](/logs/reference/log-fields/) for the full list of supported datasets.

- **output_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [Log Output Options](/logs/reference/log-output-options/). For timestamp, Cloudflare recommends using `timestamps=rfc3339`.

Example request using cURL:

```bash
curl -s -X POST \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
-d '{
"name":"<DOMAIN_NAME>",
"destination_conf":"splunk://<SPLUNK_ENDPOINT_URL>?channel=<SPLUNK_CHANNEL_ID>&insecure-skip-verify=<INSECURE_SKIP_VERIFY>&sourcetype=<SOURCE_TYPE>&header_Authorization=<SPLUNK_AUTH_TOKEN>", 
"output_options": {
        "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp","EdgeResponseBytes", "EdgeResponseStatus", "EdgeStartTimestamp", "RayID"],
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
        "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp","EdgeResponseBytes", "EdgeResponseStatus", "EdgeStartTimestamp", "RayID"],
        "timestamp_format": "rfc3339"
    },
    "destination_conf": "splunk://<SPLUNK_ENDPOINT_URL>?channel=<SPLUNK_CHANNEL_ID>&insecure-skip-verify=<INSECURE_SKIP_VERIFY>&sourcetype=<SOURCE_TYPE>&header_Authorization=<SPLUNK_AUTH_TOKEN>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

### 2. Enable (update) a job

To enable a job, make a `PUT` request to the Logpush jobs endpoint. Use the job ID returned from the previous step in the URL and send `{"enabled":true}` in the request body.

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
        "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp","EdgeResponseBytes", "EdgeResponseStatus", "EdgeStartTimestamp", "RayID"],
        "timestamp_format": "rfc3339"
    },
    "destination_conf": "splunk://<SPLUNK_ENDPOINT_URL>?channel=<SPLUNK_CHANNEL_ID>&insecure-skip-verify=<INSECURE_SKIP_VERIFY>&sourcetype=<SOURCE_TYPE>&header_Authorization=<SPLUNK_AUTH_TOKEN>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

Refer to the [Logpush FAQ](/logs/faq/logpush/) for troubleshooting information.

### 3. Create WAF custom rule for Splunk HEC endpoint (optional)

If your logpush destination hostname is proxied through Cloudflare, and you have the Cloudflare Web Application Firewall (WAF) turned on, you may be challenged or blocked when Cloudflare makes a request to Splunk HTTP Event Collector (HEC). To make sure this does not happen, you have to create a WAF custom rule that allows Cloudflare to bypass the HEC endpoint.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account. Go to **Security** > **WAF** > **Custom rules**.
2.  Select **Create rule** and enter a descriptive name for it (for example, `Splunk`).
3.  Under **If incoming requests match**, use the **Field**, **Operator**, and **Value** dropdowns to create a rule. After finishing each row, select **And** to create the next row of rules. Refer to the table below for the values you should input:

{{<table-wrap>}}

| Field            | Operator   | Value                                                                 |
| ---------------- | ---------- | --------------------------------------------------------------------- |
| Request Method   | `equals`   | `POST`                                                                |
| Hostname         | `equals`   | Your Splunk endpoint hostname. For example: `splunk.cf-analytics.com` |
| URI Path         | `equals`   | `/services/collector/raw`                                             |
| URI Query String | `contains` | `channel`                                                             |
| AS Num           | `equals`   | `132892`                                                              |
| User Agent       | `equals`   | `Go-http-client/2.0`                                                  |

{{</table-wrap>}}

4. After inputting the values as shown in the table, you should have an Expression Preview with the values you added for your specific rule. The example below reflects the hostname `splunk.cf-analytics.com`.

```txt
(http.request.method eq "POST" and http.host eq "splunk.cf-analytics.com" and http.request.uri.path eq "/services/collector/raw" and http.request.uri.query contains "channel" and ip.geoip.asnum eq 132892 and http.user_agent eq "Go-http-client/2.0")
```

5.  Under the **Then** > **Choose an action** dropdown, select _Skip_.
6.  Under **WAF components to skip**, select _All managed rules_.
7.  Select **Deploy**.

The WAF should now ignore requests made to Splunk HEC by Cloudflare.

{{<Aside type="note" header="Note">}}
To analyze and visualize Cloudflare Logs using the Cloudflare App for Splunk, follow the steps in the [Splunk Analytics integration page](/analytics/analytics-integrations/splunk/).
{{</Aside>}}

---

## More resources

{{<render file="_video-send-network-analytics-logs-to-splunk.md">}}
