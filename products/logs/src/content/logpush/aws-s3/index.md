---
title: Enable Amazon S3
order: 55
---

# Enable Amazon S3

Cloudflare uses Amazon Identity and Access Management (IAM) to gain access to your S3 bucket. The Cloudflare IAM user needs *PutObject* permission for the bucket.

Logs are written into that bucket as gzipped objects using the S3 Access Control List (ACL)
*Bucket-owner-full-control* permission.

For illustrative purposes, imagine that you want to store logs in the bucket *burritobot*, in the *logs* directory. The S3 URL would then be `s3://burritobot/logs`.

To enable Logpush to Amazon S3:

1. Create an S3 bucket. *See [instructions from Amazon](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)*. Note: buckets in China regions (cn-north-1, cn-northwest-1) are currently not supported.

2. Edit and paste the policy below into **S3** > **Bucket** > **Permissions** > **Bucket Policy** (make sure to replace the *Resource* value with your own bucket path):

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

Logpush uses multipart upload for S3. Aborted uploads will result in incomplete files remaining in your bucket. To minimize your storage costs, Amazon recommends configuring a lifecycle rule using the `AbortIncompleteMultipartUpload` action. *See [Aborting Incomplete Multipart Uploads Using a Bucket Lifecycle Policy](https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html#mpu-abort-incomplete-mpu-lifecycle-config)*.
</Aside>