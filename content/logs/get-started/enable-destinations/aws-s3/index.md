---
title: Enable Amazon S3
pcx_content_type: how-to
weight: 56
meta:
  title: Enable Logpush to Amazon S3
---

# Enable Logpush to Amazon S3

Cloudflare Logpush supports pushing logs directly to Amazon S3 via the Cloudflare dashboard or via API. Customers that use AWS GovCloud locations should use our **S3-compatible endpoint** and not the **Amazon S3 endpoint**.

## Manage via the Cloudflare dashboard

{{<render file="_enable-logpush-job.md">}}

5. In **Select a destination**, choose **Amazon S3**.

6. Enter or select the following destination information:
    - **Bucket** - S3 bucket name
    - **Path** - bucket location within the storage container
    - **Organize logs into daily subfolders** (recommended) 
    - **Bucket region**
    - If your policy requires [AWS SSE-S3 AES256 Server Side Encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html).
    - For **Grant Cloudflare access to upload files to your bucket**, make sure your bucket has a [policy](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-policies-s3.html#iam-policy-ex0) (if you did not add it already): 
      - Copy the JSON policy, then go to your bucket in the Amazon S3 console and paste the policy in **Permissions** > **Bucket Policy** and select **Save**.

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
