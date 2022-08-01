---
pcx_content_type: how-to
title: Enable Cloudflare R2 
weight: 40
layout: single
---

# Enable Logpush to Cloudflare R2

Cloudflare Logpush supports pushing logs directly to R2 via the Cloudflare dashboard or via API. 

Before getting started:

- Create an R2 bucket and set up R2 API tokens.

    1. Navigate to the R2 UI > **Create bucket**.

    2. Click **Manage R2 API Tokens**.
    
    3. Select **Create API token**.

    4. Under **Permission**, select **Edit** permissions for your token.

    5. Copy the Secret Access Key and Access Key ID. You will need these when setting up your Logpush job.

- Ensure that you have the following permissions:

    - R2 write, Logshare Edit.

- Alternatively, create a Cloudflare API token with the following permissions:

    - Zone scope, logs edit permissions.

    - Account scope, R2 write permissions.

## Manage via the Cloudflare dashboard

Enable Logpush to R2 via the dashboard.

1.  Log in to the Cloudflare dashboard.

2.  Select the Enterprise domain you want to use with Logpush.

3.  Go to **Analytics** > **Logs**.

4.  Click **Connect a service** and a modal window will open.

5.  Select the dataset you want to push to a storage service.

6.  Select the data fields to include in your logs. Add or remove fields later by modifying your settings in **Logs** > **Logpush**.

7.  Select R2.

8.  Enter the following destination information:
    - Bucket path
    - R2 access key id
    - R2 secret access key

9.  Click **Validate access**.

10.  Click **Save and Start Pushing** to finish enabling the Logpush job.

## Manage via API

To create a job, make a `POST` request to the Logpush jobs endpoint with the following fields:

- **name** (optional) - Use your domain name as the job name.
- **destination_conf** - A log destination consisting of an endpoint name, bucket name, access key id and secret key.

{{<Aside type="note" header="Note">}}
We recommend adding the `{DATE}` parameter in the `destination_conf` to separate your logs into daily subfolders.
{{</Aside>}}

```bash
r2://<BUCKET_PATH>/{DATE}?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>
```

- **dataset** - The category of logs you want to receive. Refer to [Log fields](/logs/reference/log-fields/) for the full list of supported datasets.
- **logpull_options** (optional) - To configure fields, sample rate, and timestamp format, refer to [API configuration options](/logs/get-started/api-configuration/#options).

Example request using cURL:

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs' \
-H 'X-Auth-Key: <API_KEY>' \
-H 'X-Auth-Email: <EMAIL>' \
-H 'Content-Type: application/json' \
-d '{
"name": "<DOMAIN_NAME>",
"logpull_options": "fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID&timestamps=rfc3339",
"destination_conf": "r2://<BUCKET_PATH>/{DATE}?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>",
"dataset": "http_requests",
"enabled": true
}'| jq .
```