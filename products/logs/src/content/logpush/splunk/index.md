---
title: Enable Splunk
order: 63
---

# Enable Logpush to Splunk

Cloudflare Logpush now supports pushing logs directly to Splunk via API.

To set up a Splunk Logpush job:
1. Create a job with the appropriate endpoint URL and authentication parameters
2. Enable the job to begin pushing logs

<Aside type="note" header="Note">

Note: Unlike configuring Logpush jobs for AWS S3, GCS, or Azure, there is no ownership challenge when configuring Logpush to Splunk.

</Aside>

## 1. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

* `name` (optional) - Use your domain name as the job name.
* `destination_conf` - A log destination consisting of an endpoint URL, channel id, insecure-skip-verify flag, sourcetype, authorization header in the string format below. 

  * `<SPLUNK-ENDPOINT-URL>`: The Splunk raw HTTP Event Collector URL with port. Example: `splunk.cf-analytics.com:8088/services/collector/raw`. 
      * Cloudflare expects the HEC network port to be configured to :443 or :8088. 
      * Cloudflare expects the Splunk endpoint to be /services/collector/raw while configuring and setting up the Logpush job.  
      * Ensure you've enabled HEC in Splunk. Refer to [Splunk Analytics Integrations](https://developers.cloudflare.com/logs/analytics-integrations/splunk) for information on how to set up HEC in Splunk. 
  * `<SPLUNK-CHANNEL-ID>`: A unique channel ID. This is a random GUID that you can generate by:
      * Using an online tool like the [GUID generator](https://www.guidgenerator.com/) 
      * Using command line.  Example: `python -c 'import uuid; print(uuid.uuid4())'` 
  * `<INSECURE-SKIP-VERIFY>`: Boolean value. Cloudflare recommends setting this value to false. Setting this value to true is equivalent to using the `-k` option with curl as shown in Splunk examples and is NOT recommended. Only set this value to true when HEC uses a self-signed certificate.

<Aside type="note" header="Note">
      * Cloudflare highly recommends setting this value to false. Refer to the FAQ below for more information.
</Aside>

  * `<SOURCE-TYPE>`: The Splunk sourcetype. Example: `cloudflare:json`
  * `<SPLUNK-AUTH-TOKEN>`: The Splunk authorization token that’s URL-encoded. Example: `Splunk%20e6d94e8c-5792-4ad1-be3c-29bcaee0197d`   

```bash
"splunk://<SPLUNK-ENDPOINT-URL>?channel=<SPLUNK-CHANNEL-ID>&insecure-skip-verify=<INSECURE-SKIP-VERIFY>&sourcetype=<SOURCE-TYPE>&header_Authorization=<SPLUNK-AUTH-TOKEN>"
```

* `dataset` - The category of logs you want to receive, which is either `http_requests` (default), `spectrum_events`, or `firewall_events`.

* `logpull_options` (optional) - To configure fields, sample rate, and timestamp format, see [Logpush API options](https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options). For timestamp, Cloudflare recommends using `timestamps=rfc3339`

Example request using cURL:

```bash
curl -s -X POST \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs \
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

## 2. Enable (update) a job

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

## FAQs

### Why am I receiving a validating destination error while setting up a Splunk job? 
You could be seeing this error for multiple reasons:
* The Splunk endpoint URL is not correct. Cloudflare only supports Splunk HEC raw endpoint over HTTPS.
* The Splunk authentication token is not correct. Be sure to URL-encode the token. For example, use "%20" for a whitespace.
* The certificate for Splunk Server is not properly configured. Certificates generated by Splunk/third party certificates should have the Common Name field in the certificate match the Splunk server’s domain name. Otherwise you may see errors like: `x509: certificate is valid for SplunkServerDefaultCert, not <your-instance>.splunkcloud.com.`


### What's the insecure-skip-verify parameter?
This flag, if set to true, makes an insecure connection to Splunk. Setting this value to true is equivalent to using the `-k` option with curl as shown in Splunk examples and is NOT recommended. Cloudflare highly recommends setting this flag to false when using the `insecure-skip-verify` parameter.

### Why do we have the insecure-skip-verify parameter if it's not recommended?
Certificates generated by Splunk/third party certificates should have the Common Name field in the certificate match the Splunk server’s domain name. Otherwise you may see errors like: `x509: certificate is valid for SplunkServerDefaultCert, not <your-instance>.splunkcloud.com.` This happens especially with the default certificates generated by Splunk on startup. Pushes will never succeed unless the certificates are fixed. 

The proper way to resolve the issue is to fix the certificates. This flag is only here for those rare scenarios when it’s not possible to have access/permissions to fix the certificates, like with the Splunk cloud instances, which don’t allow changing Splunk server configurations.

### How can I verify that my Splunk HEC is working correctly before setting up a job?
Ensure that you can publish events to your Splunk instance through `curl` without the `-k` flag and with the `insecure-skip-verify` parameter set to `false` as in the following example: 

```bash
curl  "https://<SPLUNK-ENDPOINT-URL>?channel=<SPLUNK-CHANNEL-ID>&insecure-skip-verify=<INSECURE-SKIP-VERIFY>&sourcetype=<SOURCE-TYPE>" \
   -H "Authorization: Splunk <SPLUNK-AUTH-TOKEN>" \
   -d '{"BotScore":99,"BotScoreSrc":"Machine Learning","CacheCacheStatus":"miss","CacheResponseBytes":2478}'
{"text":"Success","code":0}%
```

### Can I use any HEC network port in the destination conf?
No. Cloudflare expects the HEC network port to be configured to :443 or :8088. 

### Does this integrate with the Cloudflare Splunk App?
Yes. See [Cloudflare App for Splunk](https://splunkbase.splunk.com/app/4501/) for more information. As long as you ingest logs using the `cloudflare:json` source type, you can use the Cloudflare Splunk App. 