---
title: Super Slurper
pcx_content_type: how-to
weight: 1
learning_center:
  title: What is data migration?
  link: https://www.cloudflare.com/learning/cloud/what-is-data-migration/
---

# Super Slurper

Super Slurper allows you to quickly and easily copy objects from other cloud providers to an R2 bucket of your choice.

Migration jobs:

- Preserve custom object metadata from source bucket by copying them on the migrated objects on R2.
- Do not delete any objects from source bucket.
- Use TLS encryption over HTTPS connections for safe and private object transfers.

## When to use Super Slurper

Using Super Slurper as part of your strategy can be a good choice if the cloud storage bucket you are migrating consists primarily of objects less than 50 GB. Objects greater than 50 GB will be skipped and need to be copied separately.

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
Cloudflare currently supports copying data from the following cloud object storage providers to R2:
- Amazon S3
- Cloudflare R2
- Google Cloud Storage (GCS) {{<inline-pill style="beta">}}

## Create credentials for storage providers

### Amazon S3

To copy objects from Amazon S3, Super Slurper requires access permissions to your S3 bucket. While you can use any AWS Identity and Access Management (IAM) user credentials with the correct permissions, Cloudflare recommends you create a user with a narrow set of permissions.

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

### Google Cloud Storage

To copy objects from Google Cloud Storage (GCS), Super Slurper requires access permissions to your GCS bucket. You can use the Google Cloud predefined `Storage Admin` role, but Cloudflare recommends creating a custom role with a narrower set of permissions.

To create a custom role with the necessary permissions:
1. Log in to your Google Cloud console.
2. Go to **IAM & Admin** > **Roles**.
3. Find the `Storage Object Viewer` role and select **Create role from this role**.
4. Give your new role a name.
5. Select **Add permissions** and add the `storage.buckets.get` permission.
6. Select **Create**.

To create credentials with your custom role:
1. Log in to your Google Cloud console.
2. Go to **IAM & Admin** > **Service Accounts**.
3. Create a service account with the your custom role.
4. Go to the **Keys** tab of the service account you created.
5. Select **Add Key** > **Create a new key** and download the JSON key file.

You can now use this JSON key file when enabling Super Slurper.

## Caveats

### ETags

{{<render file="_migrator-etag-caveat.md" withParameters="Super Slurper">}}

### Archive storage classes
Objects stored using AWS S3 [archival storage classes](https://aws.amazon.com/s3/storage-classes/#Archive) will be skipped and need to be copied separately. Specifically:

- Files stored using S3 Glacier tiers (not including Glacier Instant Retrieval) will be skipped and logged in the migration log.
- Files stored using S3 Intelligent Tiering and placed in Deep Archive tier will be skipped and logged in the migration log.