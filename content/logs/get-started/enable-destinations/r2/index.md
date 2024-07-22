---
pcx_content_type: how-to
title: Enable Cloudflare R2
weight: 40
---

# Enable Logpush to Cloudflare R2

Cloudflare Logpush supports pushing logs directly to R2 via the Cloudflare dashboard or via API.

For more information about R2, refer to the [Cloudflare R2](/r2/) documentation.

Before getting started:

- Create an R2 bucket and set up R2 API tokens.

    1. Go to the R2 UI > **Create bucket**.

    2. Select **Manage R2 API Tokens**.

    3. Select **Create API token**.

    4. Under **Permission**, select **Edit** permissions for your token.

    5. Copy the Secret Access Key and Access Key ID. You will need these when setting up your Logpush job.

- Ensure that you have the following permissions:

    - R2 write, Logshare Edit.

## Manage via the Cloudflare dashboard

{{<render file="_enable-logpush-job.md">}}

5. In **Select a destination**, choose **R2 Object Storage**.

6. Enter or select the following destination details:
    - **Bucket** - R2 bucket name
    - **Path** - bucket location, for example, `cloudflare-logs/http_requests/example.com`
    - **Organize logs into daily subfolders** (recommended)
    - Under **Authentication** add your **R2 Access Key ID** and **R2 Secret Access Key**. Refer to [Manage R2 API tokens](https://dash.cloudflare.com/b54f07a6c269ecca2fa60f1ae4920c99/r2/api-tokens) for more information.

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

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

- **name** (optional) - Use your domain name as the job name.
- **destination_conf** - A log destination consisting of bucket path, account ID, R2 access key ID and R2 secret access key.

{{<Aside type="note" header="Note">}}
We recommend adding the `{DATE}` parameter in the `destination_conf` to separate your logs into daily subfolders.
{{</Aside>}}

```bash
r2://<BUCKET_PATH>/{DATE}?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>
```

- **dataset** - The category of logs you want to receive. Refer to [Log fields](/logs/reference/log-fields/) for the full list of supported datasets.
- **output_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [API configuration options](/logs/get-started/api-configuration/#options).

Example request using cURL:

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs' \
-H 'X-Auth-Key: <API_KEY>' \
-H 'X-Auth-Email: <EMAIL>' \
-H 'Content-Type: application/json' \
-d '{
"name": "<DOMAIN_NAME>",
"output_options": {
    "field_names": ["ClientIP", "ClientRequestHost", "ClientRequestMethod", "ClientRequestURI", "EdgeEndTimestamp","EdgeResponseBytes", "EdgeResponseStatus", "EdgeStartTimestamp", "RayID"],
    "timestamp_format": "rfc3339"
},
"destination_conf": "r2://<BUCKET_PATH>/{DATE}?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>",
"dataset": "http_requests",
"enabled": true
}'| jq .
```
