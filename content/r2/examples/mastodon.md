---
title: Using R2 with Mastodon
summary: Learn how to configure Mastodon's object storage to use R2.
pcx_content_type: configuration
weight: 1001
layout: example
---

[Mastodon](https://joinmastodon.org/) is a popular [fediverse](https://en.wikipedia.org/wiki/Fediverse) software. This guide will explain how to configure R2 to be the object storage for self hosted Mastodon instance, for either [a new instance](#setting-up-a-new-instance) or [an existing instance](#migration-to-r2).

## Setting up a new instance

There are multiple ways to set up a self hosted Mastodon instance. Please refer to the [official documentation](https://docs.joinmastodon.org/) for more details. Once reached the step of [configuring](https://docs.joinmastodon.org/admin/config/#files) the instance after installation, please continue reading.

### 1. Determine the hostname to access files

Different from the default hostname of your Mastodon instance, object storage for files requires a unique hostname. As an example, if you set up your Mastodon's hostname to be `mastodon.example.com`, you can use such as `mastodon-files.example.com` or `files.example.com` for accessing files. This means that, when visiting your instance on `mastodon.example.com`, whenever there are media attached to a post such as an image or a video, such file will be served under the hostname determined at this step, such as `mastodon-files.example.com`.

Please note that, if you would move from R2 to another S3 compatible service later on, you can keep using the same hostname determined in this step. Though changing the hostname after the instance has been running could risk breaking historical file references, which is not recommended. In such scenario, [Bulk Redirects](/rules/url-forwarding/bulk-redirects/) can be used to instruct requests reaching previous hostname to refer to the new hostname.

### 2. Create and set up an R2 bucket

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?account=r2).
2. In **Account Home**, select **R2**.
3. In **R2**, click **Create bucket**.
4. Enter your bucket name, then click **Create bucket**. This name is internal when setting up your Mastodon instance and is not public accessible.
5. Once the bucket is created, navigate to the **Settings** tab of this bucket, and copy the value of **S3 API**.
6. While in the **Settings** tab, select **Connect Domain** and enter the hostname determined in step 1.
7. Navigate back to the R2's overview page and select **Manage R2 API Tokens** on the right hand sidebar.
8. Select **Create API token**.
9. Name your token `Mastodon` by selecting the pencil icon next to the API name and grant it the **Edit** permission. Then click **Create API Token** to finalise token creation.
10. Copy the values of **Access Key ID** and **Secret Access Key**.

### 3. Configure R2 for Mastodon

While configuring your Mastodon instance based on the official [configuration file](https://github.com/mastodon/mastodon/blob/main/.env.production.sample), replace the section **File storage** with the following details.

```
S3_ENABLED=true
S3_ALIAS_HOST={{mastodon-files.example.com}}                  # Change to the hostname determined in step 1
S3_BUCKET={{your-bucket-name}}                                # Change to the bucket name set in step 2
S3_ENDPOINT=https://{{unique-id}}.r2.cloudflarestorage.com/   # Change the {{unique-id}} to the part of S3 API retrived in step 2
AWS_ACCESS_KEY_ID={{your-access-key-id}}                      # Change to the Access Key ID retrived in step 2
AWS_SECRET_ACCESS_KEY={{your-secret-access-key}}              # Change to the Secret Access Key retrived in step 2
S3_PROTOCOL=https
S3_PERMISSION=private
```

After configuring your instance, you are good to go to run your instance. After the instance is running, upload a media attachment and verify the attachment is retrieved from the hostname set above. When navigating back to the bucket's page in R2, you should be seeing the following structure.

![Example screenshot of bucket structure after instance is set up and running](/r2/static/mastodon-r2-bucket-structure.png)

## Migration to R2

If you already have an instance running, you can migrate the media files to R2, benefiting from [no egress cost](/r2/platform/pricing/), using the following steps.

### 1. Set up an R2 bucket and start file migration

1. (Optional) To minimize the number of files need to be migrated, you can use the [Mastodon admin CLI](https://docs.joinmastodon.org/admin/tootctl/#media) to clean up not used files.
2. Set up an R2 bucket ready for file migration by following step 1 and 2 mentioned in [Setting up a new instance](#setting-up-a-new-instance) section above.
3. Migrate all the media files to R2. There are [examples](/r2/examples/) provided to connect various providers together. If you currently host these media files _locally_, you can use such as [`rclone`](/r2/examples/rclone/) to upload these local files to R2.

### 2. (Optional) Set up file path redirects

While the file migration is in progress which may take a while, you can prepare file path redirect settings.

If you had the media files hosted locally, it is likely that you would need to set up redirects. By default, media files hosted locally would have the path like `https://mastodon.example.com/cache/...`, which needs to be redirected to such as `https://mastodon-files.example.com/cache/...` once the R2 bucket is up and running alongside your Mastodon instance. If you already use another S3 compatible object storage service and would like to keep the same hostname, there is no redirection needed.

[Bulk Redirects](/rules/url-forwarding/bulk-redirects/) is available for all plans to meet such needs. When redirecting from a local set up, below is an example [Bulk Redirect List](/rules/url-forwarding/bulk-redirects/create-dashboard/).

![Example screenshot of a Bulk Redirect List for redirecting from a local set up](/r2/static/mastodon-r2-bulk-redirects.png)

### 3. Verify bucket and redirects

Depending on your migration plan, you can verify if the bucket is accessible publicly and the redirects work correctly. To verify such, you can open an existing uploaded media file with path like `https://mastodon.example.com/cache/...`, then replace the hostname from `mastodon.example.com` to such as `mastocon-files.example.com` and visit the new path. If the file can be opened correctly, you can proceed to the final step.

### 4. Finalise migration

Your instance may be still running while the migration took place, and during this period, highly likely there are new media files created either through direct uploads or fetched from other federated instances. To upload only these newly created files, you can use programs like [`rclone`](/r2/examples/rclone/). Please note that, when re-running the sync program, all exsiting files will be checked using at least [Class B operations](/r2/platform/pricing/#class-b-operations).

Once all the files are synced, you can restart your Mastodon instance with the new object storage configuration as mentioned in [step 3](#3-configure-r2-for-mastodon) in [Setting up a new instance](#setting-up-a-new-instance).