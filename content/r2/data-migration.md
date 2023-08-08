---
title: Data Migration
pcx_content_type: how-to
weight: 3
---

# Super Slurper

Super Slurper allows you to quickly and easily copy objects from other cloud providers to an R2 bucket of your choice.

{{<Aside type="note" header="Beta waitlist">}}

If you are interested in joining the private beta waitlist for incremental migration, [fill out the form](https://docs.google.com/forms/d/e/1FAIpQLSeqOcV0d8fuLSdTULP2eB4AQb3jU8TG3wUGOKEkJ_OeLG5e4g/viewform).

{{</Aside>}}

Migration jobs:

- Preserve custom object metadata from source bucket by copying them on the migrated objects on R2.
- Do not delete any objects from source bucket.
- Use TLS encryption over HTTPS connections for safe and private object transfers.

## When to use Super Slurper

Using Super Slurper as part of your strategy can be a good choice if the cloud storage bucket you are migrating consists primarily of objects less than 50 GB. Objects greater than 50 GB will be skipped and need to be copied separately.

If your source cloud provider is Amazon S3, Super Slurper can be a good choice if the bucket you are migrating primarily consists of objects stored using non-archival storage classes, as objects stored using [archival storage classes](https://aws.amazon.com/s3/storage-classes/#Archive) will be skipped and need to be copied separately. Specifically:

- Files stored using S3 Glacier tiers (not including Glacier Instant Retrieval) will be skipped and logged in the migration log.
- Files stored using S3 Intelligent Tiering and placed in Deep Archive tier will be skipped and logged in the migration log.

For migration use cases that do not meet the above criteria, we recommend using tools such as [rclone](/r2/examples/rclone/).

## Use Super Slurper to migrate data to R2
1. From the Cloudflare dashboard, select **R2** > **Data Migration**.
2. Select **Migrate files**.
3. Select the source cloud storage provider that you will be migrating data from.
4. Enter your source bucket name and associated credentials and select **Next**.
5. Enter your R2 bucket name and associated credentials and select **Next**.
6. After you finish reviewing the details of your migration, select **Migrate files**.

You can view the status of your migration job at any time by selecting your migration from **Data Migration** page.

### Source bucket options
#### Bucket sub path (optional)
This setting specifies the prefix within the source bucket where objects will be copied from.

### Destination R2 bucket options
#### Overwrite files?
This setting determines what happens when an object being copied from the source storage bucket matches the path of an existing object in the destination R2 bucket. There are two options: overwrite (default) and skip.


## Supported cloud storage providers
We currently support copying data from the following cloud object storage providers to R2:
- Amazon S3
- Cloudflare R2

## Create Amazon S3 credentials

To migrate objects from Amazon S3, Super Slurper requires access permissions to your bucket. While you can use any AWS Identity and Access Management (IAM) user credentials with the correct permissions, Cloudflare recommends you create a user with a narrow set of permissions.

To create credentials with the correct permissions:

1. Log in to your AWS IAM account.
2. Create a policy with the following format and replace `<BUCKET_NAME>` with the bucket you want to grant access to:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:Get*",
                "s3:List*"
            ],
            "Resource": [
                "arn:aws:s3:::<BUCKET_NAME>",
                "arn:aws:s3:::<BUCKET_NAME>/*"
            ]
        }
    ]
}
```

3. Create a new user and attach the created policy to that user.

You can now use both the Access Key ID and Secret Access Key when defining your source bucket.
