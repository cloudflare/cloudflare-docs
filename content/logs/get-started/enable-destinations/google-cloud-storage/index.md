---
title: Enable Google Cloud Storage
pcx_content_type: how-to
weight: 61
meta:
  title: Enable Logpush to Google Cloud Storage
---

# Enable Logpush to Google Cloud Storage

Cloudflare Logpush supports pushing logs directly to Google Cloud Storage (GCS) via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

{{<render file="_enable-logpush-job.md">}}

5. In **Select a destination**, choose **Google Cloud Storage**. 

6. Enter or select the following destination details:
    - **Bucket** - GCS bucket name
    - **Path** - bucket location within the storage container
    - **Organize logs into daily subfolders** (recommended) 
    - For **Grant Cloudflare access to upload files to your bucket**, make sure your bucket has added Cloudflare’s IAM as a user with a [Storage Object Admin role](https://cloud.google.com/storage/docs/access-control/iam-roles).

When you are done entering the destination details, select **Continue**.

7. To prove ownership, Cloudflare will send a file to your designated destination. To find the token, select the **Open** button in the **Overview** tab of the ownership challenge file, then paste it into the Cloudflare dashboard to verify your access to the bucket. Enter the **Ownership Token** and select **Continue**. 

8. Select the dataset to push to the storage service.

9. In the next step, you need to configure your logpush job:
    - Enter the **Job name**.
    - Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](/logs/reference/filters/) for more information. Not all datasets have this option available.
    - In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.

10. In **Advanced Options**, you can:
    - Choose the format of timestamp fields in your logs (`RFC3339`(default),`Unix`, or `UnixNano`).
    - Select a [sampling rate](/logs/get-started/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.
    - Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.

11. Select **Submit** once you are done configuring your logpush job.

## Create and get access to a GCS bucket

Cloudflare uses Google Cloud Identity and Access Management (IAM) to gain access to your bucket. The Cloudflare IAM service account needs admin permission for the bucket.

{{<render file="_enable-read-permissions.md">}}
<br/>

To enable Logpush to GCS:

1. Create a GCS bucket. Refer to [instructions from GCS](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console).

2. In **Storage** > **Browser** > **Bucket** > **Permissions**, add the member `logpush@cloudflare-data.iam.gserviceaccount.com` with `Storage Object Admin` permission.

{{<Aside type="note" header="Note">}}
To analyze your Cloudflare Logs data using the Google Cloud Platform (GCP), follow the steps in the [Google Cloud Analytics integration page](/analytics/analytics-integrations/google-cloud/).
{{</Aside>}}
