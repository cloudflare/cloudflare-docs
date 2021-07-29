---
order: 60
pcx-content-type: how-to
---

# Enable Google Cloud Storage

Cloudflare Logpush supports pushing logs directly to Google Cloud Storage via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

Enable Logpush to Google Cloud Storage via the dashboard.

To enable the Cloudflare Logpush service:

1. Log in to the Cloudflare dashboard.

2. Select the Enterprise domain you want to use with Logpush.

3. Go to **Analytics** > **Logs**.

4. Click **Connect a service**. A modal window opens where you will need to complete several steps.

5. Select the data set you want to push to a storage service.

6. Select the data fields to include in your logs. You can add or remove fields later by modifying your settings in **Logs** > **Logpush**.

7. Select **Google Cloud Storage**.

8. Enter or select the following destination information:
     * **Bucket path**
     * **Daily subfolders**
     * For **Grant Cloudflare access to upload files to your bucket**, make sure your bucket has added Cloudflare's IAM as a user (if you did not add it already)

9. Click **Validate access**.
    
10. Enter the **Ownership token** (included in a file or log Cloudflare sends to your provider) and click **Prove ownership**. To find the ownership token, click the **Open** button in the **Overview** tab of the ownership challenge file.

11. Click **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Google Cloud Storage as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Manage via API

Cloudflare uses Google Cloud Identity and Access Management (IAM) to gain access to your bucket. The Cloudflare IAM service account needs admin permission for the bucket.

To enable Logpush to GCS:

1. Create a GCS bucket. *See [instructions from GCS](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console)*.

2. In **Storage** > **Browser** > **Bucket** > **Permissions**, add the member `logpush@cloudflare-data.iam.gserviceaccount.com` with *Storage Object Admin* permission.

<Aside type="note" header="Note">

Logpush will not work if there is a retention policy on your bucket because this policy prevents overwrites. If you're using the policy to enforce deletion, you can use a lifecycle rule instead. *See [object lifecycle management from GCS](https://cloud.google.com/storage/docs/lifecycle)*.
</Aside>
