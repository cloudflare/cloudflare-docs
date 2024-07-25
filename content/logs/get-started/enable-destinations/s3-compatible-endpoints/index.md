---
title: Enable S3-compatible endpoints
pcx_content_type: how-to
weight: 57
meta:
  title: Enable Logpush to S3-compatible endpoints
---

# Enable Logpush to S3-compatible endpoints

Cloudflare Logpush supports pushing logs to S3-compatible destinations via the Cloudflare dashboard or via API, including:

- [Alibaba Cloud OSS](https://www.alibabacloud.com/help/doc-detail/64919.htm#title-37m-7gl-xy2)
- [Backblaze B2](https://www.backblaze.com/b2/docs/s3_compatible_api.html)
- [DigitalOcean Spaces](https://www.digitalocean.com/docs/spaces/)
- [IBM Cloud Object Storage](https://cloud.ibm.com/apidocs/cos/cos-compatibility)
- [JD Cloud Object Storage Service](https://docs.jdcloud.com/en/object-storage-service/introduction-2)
- [Linode Object Storage](https://www.linode.com/products/object-storage/)
- [Oracle Cloud Object Storage](https://docs.cloud.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm)
- On-premise [Ceph Object Gateway](https://docs.ceph.com/en/latest/radosgw/s3/)

For more information about Logpush and the current production APIs, refer to [Cloudflare Logpush](/logs/get-started/) documentation.

## Manage via the Cloudflare dashboard

{{<render file="_enable-logpush-job.md">}}

5.  In **Select a destination**, choose **S3-Compatible**.

6. Enter or select the following destination information:
    - **Bucket** - S3 Compatible bucket name
    - **Path** - bucket location within the storage container
    - **Organize logs into daily subfolders** (recommended) 
    - **Endpoint URL** - The URL without the bucket name or path. Example, `sfo2.digitaloceanspaces.com`.
    - **Bucket region**
    - **Access Key ID**
    - **Secret Access Key**

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

To set up S3-compatible endpoints:

1. Create a job with the appropriate endpoint URL and authentication parameters.
2. Enable the job to begin pushing logs.

{{<Aside type="note" header="Note">}}

Unlike Logpush jobs to Amazon S3, there is no ownership challenge with S3-compatible APIs.

{{</Aside>}}

{{<render file="_enable-read-permissions.md">}}

### 1. Create a job

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

- **name** (optional) - Use your domain name as the job name.
- **destination_conf** - A log destination consisting of an endpoint name, bucket name, bucket path, region, access-key-id, and secret-access-key in the following string format:

```bash
"s3://<BUCKET_NAME>/<BUCKET_PATH>?region=<REGION>&access-key-id=<ACCESS_KEY_ID>&secret-access-key=<SECRET_ACCESS_KEY>&endpoint=<ENDPOINT_URL>"
```

{{<Aside type="note" header="Note">}}

`<ENDPOINT_URL>` is the URL without the bucket name or path. For example: `endpoint=sfo2.digitaloceanspaces.com`.

{{</Aside>}}

- **dataset** - The category of logs you want to receive. Refer to [Log fields](/logs/reference/log-fields/) for the full list of supported datasets.
- **output_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [Log Output Options](/logs/reference/log-output-options/).

Example request using cURL:

```bash
curl -s -X POST \
https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs \
-d '{
"name":"<DOMAIN_NAME>",
"destination_conf":"s3://<BUCKET_NAME>/<BUCKET_PATH>?region=<REGION>&access-key-id=<ACCESS_KEY_ID>&secret-access-key=<SECRET_ACCESS_KEY>&endpoint=<ENDPOINT_URL>",
"output_options": {
    "field_names": ["ClientIP", "ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI","EdgeEndTimestamp", "EdgeResponseBytes", "EdgeResponseStatus", "EdgeStartTimestamp", "RayID"],
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
    "destination_conf": "s3://<BUCKET_NAME>/<BUCKET_PATH>?region=<REGION>&access-key-id=<ACCESS_KEY_ID>&secret-access-key=<SECRET_ACCESS_KEY>&endpoint=<ENDPOINT_URL>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```

### 2. Enable (update) a job

To enable a job, make a `PUT` request to the Logpush jobs endpoint. You will use the job ID returned from the previous step in the URL, and send `{"enabled": true}` in the request body.

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
    "destination_conf": "s3://<BUCKET_NAME>/<BUCKET_PATH>?region=<REGION>&access-key-id=<ACCESS_KEY_ID>&secret-access-key=<SECRET_ACCESS_KEY>&endpoint=<ENDPOINT_URL>",
    "last_complete": null,
    "last_error": null,
    "error_message": null
  },
  "success": true
}
```
