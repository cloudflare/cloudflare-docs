---
title: Enable Splunk
order: 63
pcx-content-type: how-to
---

import EnableReadPermissions from "../../../_partials/_enable-read-permissions.md"

# Enable Logpush to Splunk

Cloudflare Logpush supports pushing logs directly to Splunk via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

Enable Logpush to Splunk via the dashboard.

To enable the Cloudflare Logpush service:

1. Log in to the Cloudflare dashboard.

1. Select the Enterprise domain you want to use with Logpush.

1. Go to **Analytics** > **Logs**.

1. Click **Connect a service**. A modal window opens where you will need to complete several steps.

1. Select the data set you want to push to a storage service.

1. Select the data fields to include in your logs. You can add or remove fields later by modifying your settings in **Logs** > **Logpush**.

1. Select **Splunk**.

1. Enter or select the following destination information:
     * **Splunk raw HTTP Event Collector URL**
     * **Channel ID**
     * **Auth Token**
     * **Source Type**
     * **Use insecure skip verify option**

1. Click **Validate access**.

1. Click **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Splunk as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Manage via API

To set up a Splunk Logpush job:
1. Create a job with the appropriate endpoint URL and authentication parameters
1. Enable the job to begin pushing logs

<Aside type="note" header="Note">

Unlike configuring Logpush jobs for AWS S3, GCS, or Azure, there is no ownership challenge when configuring Logpush to Splunk.

</Aside>

<EnableReadPermissions/>

### 1. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

* `name` (optional) - Use your domain name as the job name.
* `destination_conf` - A log destination consisting of an endpoint URL, channel id, insecure-skip-verify flag, sourcetype, authorization header in the string format below. 

  * `<SPLUNK-ENDPOINT-URL>`: The Splunk raw HTTP Event Collector URL with port. Example: `splunk.cf-analytics.com:8088/services/collector/raw`. 
      * Cloudflare expects the HEC network port to be configured to :443 or :8088. 
      * Cloudflare expects the Splunk endpoint to be /services/collector/raw while configuring and setting up the Logpush job.  
      * Ensure you've enabled HEC in Splunk. Refer to [Splunk Analytics Integrations](https://developers.cloudflare.com/fundamentals/data-products/analytics-integrations/splunk) for information on how to set up HEC in Splunk. 
  * `<SPLUNK-CHANNEL-ID>`: A unique channel ID. This is a random GUID that you can generate by:
      * Using an online tool like the [GUID generator](https://www.guidgenerator.com/) 
      * Using command line.  Example: `python -c 'import uuid; print(uuid.uuid4())'` 
  * `<INSECURE-SKIP-VERIFY>`: Boolean value. Cloudflare recommends setting this value to `false`. Setting this value to `true` is equivalent to using the `-k` option with `curl` as shown in Splunk examples and is **not** recommended. Only set this value to `true` when HEC uses a self-signed certificate.

<Aside type="note" header="Note">
Cloudflare highly recommends setting this value to <code class="InlineCode">false</code>. Refer to the <a href="/faq#logpush-faq">Logpush FAQ</a> for more information.
</Aside>

  * `<SOURCE-TYPE>`: The Splunk sourcetype. Example: `cloudflare:json`
  * `<SPLUNK-AUTH-TOKEN>`: The Splunk authorization token that’s URL-encoded. Example: `Splunk%20e6d94e8c-5792-4ad1-be3c-29bcaee0197d`   

```bash
"splunk://<SPLUNK-ENDPOINT-URL>?channel=<SPLUNK-CHANNEL-ID>&insecure-skip-verify=<INSECURE-SKIP-VERIFY>&sourcetype=<SOURCE-TYPE>&header_Authorization=<SPLUNK-AUTH-TOKEN>"
```

* `dataset` - The category of logs you want to receive, which is either `http_requests` (default), `spectrum_events`, or `firewall_events`.

* `logpull_options` (optional) - To configure fields, sample rate, and timestamp format, see [Logpush API options](/get-started/logpush-configuration-api/understanding-logpush-api#options). For timestamp, Cloudflare recommends using `timestamps=rfc3339`

Example request using cURL:

```bash
curl -s -X POST \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs \
-H "X-Auth-Email: user@example.com" \
-H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
-d '{"name":"<DOMAIN_NAME>",
"destination_conf":"splunk://<SPLUNK-ENDPOINT-URL>?channel=<SPLUNK-CHANNEL-ID>&insecure-skip-verify=<INSECURE-SKIP-VERIFY>&sourcetype=<SOURCE-TYPE>&header_Authorization=<SPLUNK-AUTH-TOKEN>",  "logpull_options":"fields=RayID,EdgeStartTimestamp&timestamps=rfc3339", "dataset":"http_requests"}' | jq .
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
    "destination_conf": "splunk://<SPLUNK-ENDPOINT-URL>?channel=<SPLUNK-CHANNEL-ID>&insecure-skip-verify=<INSECURE-SKIP-VERIFY>&sourcetype=<SOURCE-TYPE>&header_Authorization=<SPLUNK-AUTH-TOKEN>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

### 2. Enable (update) a job

To enable a  job, make a `PUT` request to the Logpush jobs endpoint. Use the job ID returned from the previous step in the URL and send `{"enabled":true}` in the request body.

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
    "destination_conf": "splunk://<SPLUNK-ENDPOINT-URL>?channel=<SPLUNK-CHANNEL-ID>&insecure-skip-verify=<INSECURE-SKIP-VERIFY>&sourcetype=<SOURCE-TYPE>&header_Authorization=<SPLUNK-AUTH-TOKEN>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

Refer to the [Logpush FAQ](../../../faq#logpush-faq) for troubleshooting information.

### 3. Create WAF rule for Splunk HEC endpoint (optional)

If you have the Cloudflare Web Application Firewall (WAF) turned on, you may see a CAPTCHA challenge when Cloudflare makes a request to Splunk HTTP Event Collector (HEC). To make sure this does not happen, you have to create a WAF rule that allows Cloudflare to bypass the HEC endpoint.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account. Go to the **Firewall**.
1. Click **Create firewall rule** and enter a descriptive name for it (for example, Splunk).
1. Under **When incoming requests match...**, use the **Field**, **Operator**, and **Value** dropdowns to create a rule. After finishing each row, click **And** to create the next row of rules. Refer to the table below for the values you should input:

  <TableWrap>

  Field | Operator | Value
  ------|----------|------
  Request Method | `equals` | `POST`
  Hostname | `equals` | Your Splunk endpoint hostname. Example: `splunk.cf-analytics.com`
  URI Path | `equals` | `/services/collector/raw`
  URI Query String | `contains` | `channel`
  AS Num | `equals` | `132892`
  User Agent | `equals` | `Go-http-client/2.0`

  </TableWrap>

1. After inputting the values as shown in the table, you should have an Expression Preview with the values you added for your specific rule. The example below reflects the hostname `splunk.cf-analytics.com`.

  ```txt
  (http.request.method eq "POST" and http.host eq "splunk.cf-analytics.com" and http.request.uri.path eq "/services/collector/raw" and http.request.uri.query contains "channel" and ip.geoip.asnum eq 132892 and http.user_agent eq "Go-http-client/2.0")
  ```

1. Under the **Then...** > **Choose an action** dropdown, select _Bypass_.
1. In the **Choose a feature** dropdown, select _WAF Managed Rules_.
1. Click **Deploy**.

The WAF should now ignore requests made to Splunk HEC by Cloudflare.