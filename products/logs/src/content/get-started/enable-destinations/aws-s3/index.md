---
title: Enable Amazon S3
order: 55
pcx-content-type: how-to
---

import EnableReadPermissions from "../../../_partials/_enable-read-permissions.md"

# Enable Amazon S3

Cloudflare Logpush supports pushing logs directly to Amazon S3 via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

Enable Logpush to Amazon S3 via the dashboard.

To enable the Cloudflare Logpush service:

1. Log in to the Cloudflare dashboard.

1. Select the Enterprise domain you want to use with Logpush.

1. Go to **Analytics** > **Logs**.

1. Click **Connect a service**. A modal window opens where you will need to complete several steps.

1. Select the data set you want to push to a storage service.

1. Select the data fields to include in your logs. You can add or remove fields later by modifying your settings in **Logs** > **Logpush**.

1. Select **Amazon S3**.

1. Enter or select the following destination information:
     * **Bucket path**
     * **Daily subfolders**
     * **Bucket region**
     * **Encryption constraint in bucket policy**
     * For **Grant Cloudflare access to upload files to your bucket**, make sure your bucket has a policy (if you did not add it already):
        * Copy the JSON policy, then go to your bucket in the Amazon S3 console and paste the policy in **Permissions** > **Bucket Policy** and click **Save**

1. Click **Validate access**.
    
1. Enter the **Ownership token** (included in a file or log Cloudflare sends to your provider) and click **Prove ownership**. To find the ownership token, click the **Open** button in the **Overview** tab of the ownership challenge file.

1. Click **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Amazon S3 as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.


## Manage via API

Cloudflare uses Amazon Identity and Access Management (IAM) to gain access to your S3 bucket. The Cloudflare IAM user needs *PutObject* permission for the bucket.

Logs are written into that bucket as gzipped objects using the S3 Access Control List (ACL)
*Bucket-owner-full-control* permission.

<EnableReadPermissions/>

For illustrative purposes, imagine that you want to store logs in the bucket *burritobot*, in the *logs* directory. The S3 URL would then be `s3://burritobot/logs`.

To enable Logpush to Amazon S3:

1. Create an S3 bucket. *See [instructions from Amazon](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)*. Note: buckets in China regions (cn-north-1, cn-northwest-1) are currently not supported.

1. Edit and paste the policy below into **S3** > **Bucket** > **Permissions** > **Bucket Policy** (make sure to replace the *Resource* value with your own bucket path):

```json
{
  "Id": "Policy1506627184792",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1506627150918",
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::burritobot/logs/*",
      "Principal": {
        "AWS": [
          "arn:aws:iam::391854517948:user/cloudflare-logpush"
        ]
      }
    }
  ]
}
```

<Aside type="note" header="Note">

Logpush uses multipart upload for S3. Aborted uploads will result in incomplete files remaining in your bucket. To minimize your storage costs, Amazon recommends configuring a lifecycle rule using the `AbortIncompleteMultipartUpload` action. *See [Uploading and copying objects using multipart upload](https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html#mpu-abort-incomplete-mpu-lifecycle-config)*.
</Aside>
