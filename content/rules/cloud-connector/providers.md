---
title: Supported cloud providers
pcx_content_type: reference
weight: 10
---

# Supported cloud providers

Cloud Connector currently supports the following cloud providers and services:

- Amazon Web Services - S3
- Google Cloud Platform - Cloud Storage
- Microsoft Azure - Blob Storage

{{<Aside type="note">}}
Support for Cloudflare R2 will be added soon.
{{</Aside>}}

## Amazon Web Services - S3 { #s3 }

The hostname of your S3 bucket URL must have one of the following formats (where `*` is a wildcard character):

- `*s3.amazonaws.com`
- `*s3-website.<region>.amazonaws.com`
- `*s3.<region>.amazonaws.com`
- `*s3-website-<region>.amazonaws.com`

Cloud Connector supports both subdomain and URI path bucket URLs.

### Get the bucket URL

1. Go to the [Amazon S3 console](https://console.aws.amazon.com/s3/) and select **Buckets** in the navigation pane.
2. Select the bucket name.
3. Go to the **Properties** tab.
4. Select the **Static Website Hosting** card. The **Endpoint** field shows your bucket URL.

For more information, refer to the [Amazon S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/EnableWebsiteHosting.html).

## Google Cloud Platform - Cloud Storage { #gcp }

The hostname of your Cloud Storage bucket URL must be the following:

- `*storage.googleapis.com`
- `*storage.cloud.google.com`

Cloud Connector supports both subdomain and URI path bucket URLs.

### Get the bucket URL

1. Go to the [Google Cloud console](https://console.cloud.google.com/storage/browser) and select **Buckets**.
2. Select the bucket name.
3. For one of the files already in the bucket, select the link icon in the **Public** column to copy the file's public URL to the clipboard. The file URL will have the following format:

    `https://storage.googleapis.com/<BUCKET_NAME>/<OBJECT_NAME>`

    To obtain the bucket URL, remove `/<OBJECT_NAME>` from the file URL.

If the files in your bucket are not publicly accessible, you must change the bucket permissions. For details, refer to the [Google Cloud Storage documentation](https://cloud.google.com/storage/docs/access-control/making-data-public#buckets).

## Microsoft Azure - Blob Storage { #azure }

The hostname of your Blob Storage bucket URL must have one of the following formats (where `*` is a wildcard character):

- `*.blob.core.windows.net`
- `*.web.core.windows.net`

### Get the bucket URL

1. Go to the [Azure portal](https://portal.azure.com/) and select your storage account.
2. In the menu pane, under **Settings**, select **Endpoints**.
3. Get your bucket URL from the **Blob service** endpoint or the **Static website** endpoint.

If the blob container is not configured for public access, you must change the container settings. For details, refer to the [Azure Storage documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure?tabs=portal).



