---
title: Data Migration
pcx_content_type: how-to
weight: 3
---

{{<beta heading="h1">}} Super Slurper{{</beta>}}

Super Slurper allows you to quickly and easily copy objects from other cloud providers to an R2 bucket of your choice.

{{<Aside type="note">}}

This feature is currently in beta. If you have feedback, reach out to us on the [Cloudflare Developer Discord](https://discord.gg/rrZXVVcKQF) in the #r2-storage channel or open a thread on the [Community Forum](https://community.cloudflare.com/c/developers/storage/81).

{{</Aside>}}

Migration jobs:

- Preserve custom object metadata from source bucket by copying them on the migrated objects on R2.
- Do not delete any objects from source bucket.
- Overwrite objects in the destination R2 bucket when an object being copied from the source storage bucket matches the path of an existing object in the destination bucket.
- Uses TLS encryption over HTTPS connections for safe and private object transfers.

## When to use Super Slurper

Using Super Slurper as part of your strategy can be a good choice if your use case meets the following criteria:

- The cloud storage bucket you are migrating consists primarily of objects less than 10 GB (1000³ bytes). Objects greater than 10 GB will be skipped and need to be copied separately.
- The cloud storage bucket you are migrating has fewer than 200 million objects. During the beta, migration jobs can copy around 250 small objects per second.

For migration use cases that do not meet the above criteria, we recommend using tools such as [rclone](/r2/examples/rclone/).

## Migrate data from Amazon S3 to R2

1. From the Cloudflare dashboard, select **R2** > **Data Migration**.
2. Select **Migrate files**.
3. Enter your Amazon S3 bucket name and associated credentials and select **Next**.
4. Enter your R2 bucket name and associated credentials and select **Next**.
5. After you finish reviewing the details of your migration, select **Migrate files**.

You can view the status of your migration job at any time by selecting your migration from **Data Migration** page.

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

You can now use both the Access Key ID and Secret Access Key when defining your source bucket. Refer to [Migrate data from Amazon S3 to R2](/r2/r2-migrator/#migrate-data-from-amazon-s3-to-r2) to learn more.