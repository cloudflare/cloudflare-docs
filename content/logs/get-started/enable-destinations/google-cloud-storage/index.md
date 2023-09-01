---
title: Enable Google Cloud Storage
pcx_content_type: how-to
weight: 61
layout: single
meta:
  title: Enable Logpush to Google Cloud Storage
---

# Enable Logpush to Google Cloud Storage

Cloudflare Logpush supports pushing logs directly to Google Cloud Storage (GCS) via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

Enable Logpush to Google Cloud Storage via the dashboard.

To enable the Cloudflare Logpush service:

{{<render file="_enable-logpush-job.md">}}

7. In **Select a destination**, choose **Google Cloud Storage**.

8. Enter or select the following destination information:

    - **Bucket path**
    - **Daily subfolders**
    - For **Grant Cloudflare access to upload files to your bucket**, make sure your bucket has added Cloudflare's IAM as a user (if you did not add it already).

9. Select **Validate access**.

10. Enter the **Ownership token** (included in a file or log Cloudflare sends to your provider) and select **Prove ownership**. To find the ownership token, select **Open** in the **Overview** tab of the ownership challenge file.

11. Select **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Google Cloud Storage as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Create and get access to a GCS bucket

Cloudflare uses Google Cloud Identity and Access Management (IAM) to gain access to your bucket. The Cloudflare IAM service account needs admin permission for the bucket.

{{<render file="_enable-read-permissions.md">}}
<br/>

To enable Logpush to GCS:

1. Create a GCS bucket. Refer to [instructions from GCS](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console).

2. In **Storage** > **Browser** > **Bucket** > **Permissions**, add the member `logpush@cloudflare-data.iam.gserviceaccount.com` with `Storage Object Admin` permission.

{{<Aside type="note" header="Note">}}
To analyze your Cloudflare Logs data using the Google Cloud Platform (GCP), follow the steps in the [Google Cloud Analytics integration page](/fundamentals/data-products/analytics-integrations/google-cloud/).
{{</Aside>}}
