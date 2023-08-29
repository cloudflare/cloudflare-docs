---
title: Enable Amazon S3
pcx_content_type: how-to
weight: 56
layout: single
meta:
  title: Enable Logpush to Amazon S3
---

# Enable Logpush to Amazon S3

Cloudflare Logpush supports pushing logs directly to Amazon S3 via the Cloudflare dashboard or via API. Customers that use AWS GovCloud locations should use our **S3-compatible endpoint** and not the **Amazon S3 endpoint**.

## Manage via the Cloudflare dashboard

Enable Logpush to Amazon S3 via the dashboard.

To enable the Cloudflare Logpush service:

{{<render file="_enable-logpush-job.md">}}

7. In **Select a destination**, choose **Amazon S3**.

8. Enter or select the following destination information:

    - **Bucket path**
    - **Daily subfolders**
    - **Bucket region**
    - **Encryption constraint in bucket policy**
    - For **Grant Cloudflare access to upload files to your bucket**, make sure your bucket has a policy (if you did not add it already):
      - Copy the JSON policy, then go to your bucket in the Amazon S3 console and paste the policy in **Permissions** > **Bucket Policy** and select **Save**.

9. Select **Validate access**.

10. Enter the **Ownership token** (included in a file or log Cloudflare sends to your provider) and select **Prove ownership**. To find the ownership token, select the **Open** button in the **Overview** tab of the ownership challenge file.

11. Select **Save and Start Pushing** to finish enabling Logpush.

Once connected, Cloudflare lists Amazon S3 as a connected service under **Logs** > **Logpush**. Edit or remove connected services from here.

## Create and get access to an S3 bucket

Cloudflare uses Amazon Identity and Access Management (IAM) to gain access to your S3 bucket. The Cloudflare IAM user needs `PutObject` permission for the bucket.

Logs are written into that bucket as gzipped objects using the S3 Access Control List (ACL)
`Bucket-owner-full-control` permission.

For illustrative purposes, imagine that you want to store logs in the bucket `burritobot`, in the `logs` directory. The S3 URL would then be `s3://burritobot/logs`.

{{<render file="_enable-read-permissions.md">}}
<br/>

To enable Logpush to Amazon S3:

1.  Create an S3 bucket. Refer to [instructions from Amazon](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html).

    {{<Aside type="note" header="Note">}}Buckets in China regions (`cn-north-1`, `cn-northwest-1`) are currently not supported.{{</Aside>}}

2.  Edit and paste the policy below into **S3** > **Bucket** > **Permissions** > **Bucket Policy**, replacing the `Resource` value with your own bucket path. The `AWS` `Principal` is owned by Cloudflare and should not be changed.

```json
{
  "Id": "Policy1506627184792",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1506627150918",
      "Action": ["s3:PutObject"],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::burritobot/logs/*",
      "Principal": {
        "AWS": ["arn:aws:iam::391854517948:user/cloudflare-logpush"]
      }
    }
  ]
}
```

{{<Aside type="note" header="Note">}}

Logpush uses multipart upload for S3. Aborted uploads will result in incomplete files remaining in your bucket. To minimize your storage costs, Amazon recommends configuring a lifecycle rule using the `AbortIncompleteMultipartUpload` action. Refer to [Uploading and copying objects using multipart upload](https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html#mpu-abort-incomplete-mpu-lifecycle-config).

{{</Aside>}}
