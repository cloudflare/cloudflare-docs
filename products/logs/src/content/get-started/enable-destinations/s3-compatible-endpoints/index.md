---
order: 56
pcx-content-type: how-to
---

import EnableReadPermissions from "../../../_partials/_enable-read-permissions.md"

# Enable S3-compatible endpoints

Cloudflare Logpush supports pushing logs to S3-compatible destinations via the Cloudflare dashboard or via API, including:

* [Alibaba Cloud OSS](https://www.alibabacloud.com/help/doc-detail/64919.htm#title-37m-7gl-xy2)
* [Backblaze B2](https://www.backblaze.com/b2/docs/s3_compatible_api.html)
* [Digital Ocean Spaces](https://www.digitalocean.com/docs/spaces/)
* [IBM Cloud Object Storage](https://cloud.ibm.com/apidocs/cos/cos-compatibility)
* [JD Cloud Object Storage Service](https://docs.jdcloud.com/en/object-storage-service/introduction-2)
* [Linode Object Storage](https://www.linode.com/products/object-storage/)
* [Oracle Cloud Object Storage](https://docs.cloud.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm)
* On-premise [Ceph Object Gateway](https://docs.ceph.com/en/latest/radosgw/s3/)

For more information about Logpush and the current production APIs, see the [Cloudflare Logpush](/get-started/) documentation.

## Manage via the Cloudflare dashboard

Enable Logpush to an S3-compatible destination via the dashboard.

To enable the Cloudflare Logpush service:

1. Log in to the Cloudflare dashboard.

1. Select the Enterprise domain you want to use with Logpush.

1. Go to **Analytics** > **Logs**.

1. Click **Connect a service**. A modal window opens where you will need to complete several steps.

1. Select the data set you want to push to a storage service.

1. Select the data fields to include in your logs. You can add or remove fields later by modifying your settings in **Logs** > **Logpush**.

1. Select **S3-Compatible**.

1. Enter or select the following destination information:
     * **S3 Compatible Bucket Path**
     * **Bucket region**
     * **Access Key ID**
     * **Secret Access Key**
     * **Endpoint URL**

1. Click **Validate access**.

1. Click **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists the S3-compatible destination as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Manage via API

To set up S3-compatible endpoints:
1. Create a job with the appropriate endpoint URL and authentication parameters.
1. Enable the job to begin pushing logs.

See below for detailed instructions.

<Aside type="note" header="Note">

Unlike Logpush jobs to Amazon S3, there is no ownership challenge with S3-compatible APIs.

</Aside>

<EnableReadPermissions/>

### 1. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:
* `name` (optional) - Use your domain name as the job name.
* `destination_conf` - A log destination consisting of an endpoint name, bucket name, bucket path, region, access-key-id, and secret-access-key in the following string format:

```bash
"s3://<BUCKET-NAME>/<BUCKET-PATH>?region=<REGION>&access-key-id=<ACCESS-KEY-ID>&secret-access-key=<SECRET-ACCESS-KEY>&endpoint=<ENDPOINT-URL>"
```
<Aside type="note" header="Note">

`<ENDPOINT-URL>` is the url without the bucket name or path. Example: `endpoint=sfo2.digitaloceanspaces.com`
</Aside>

* `dataset` - the category of logs you want to receive; either `http_requests` (default), `spectrum_events` or `firewall_events`
* `logpull_options` (optional) - To configure fields, sample rate, and timestamp format, see [Logpush API options](/get-started/logpush-configuration-api/understanding-logpush-api#options)

Example request using cURL:

```bash
curl -s -X POST \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs \
-d '{"name":"<DOMAIN_NAME>",
"destination_conf":"s3://<BUCKET-NAME>/<BUCKET-PATH>?region=<REGION>&access-key-id=<ACCESS-KEY-ID>&secret-access-key=<SECRET-ACCESS-KEY>&endpoint=<ENDPOINT-URL>", "logpull_options":"fields=RayID,EdgeStartTimestamp&timestamps=rfc3339", "dataset":"http_requests"}' | jq .
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
    "destination_conf": "s3://<BUCKET-NAME>/<BUCKET-PATH>?region=<REGION>&access-key-id=<ACCESS-KEY-ID>&secret-access-key=<SECRET-ACCESS-KEY>&endpoint=<ENDPOINT-URL>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

### 2. Enable (update) a job

To enable a  job, make a `PUT` request to the Logpush jobs endpoint. You’ll use the job ID returned from the previous step in the URL, and send `{"enabled": true}` in the request body.

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
    "destination_conf": "s3://<BUCKET-NAME>/<BUCKET-PATH>?region=<REGION>&access-key-id=<ACCESS-KEY-ID>&secret-access-key=<SECRET-ACCESS-KEY>&endpoint=<ENDPOINT-URL>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```
