---
pcx_content_type: how-to
title: Create new buckets
weight: 1
---

# Create buckets

You can create a bucket from the Cloudflare dashboard or using Wrangler.

{{<Aside type="note">}}

Wrangler is [a commmand-line tool](/workers/wrangler/install-and-update/) for building with Cloudflare's developer products, including R2.

The R2 support in Wrangler allows you to manage buckets and perform basic operations against objects in your buckets. For more advanced use-cases, including bulk uploads or mirroring files from legacy object storage providers, we recommend [rclone](/r2/examples/rclone/) or an [S3-compatible](/r2/api/s3/) tool of your choice. 

{{</Aside>}}

## Bucket-Level Operations

Create a bucket:

```sh
$ wrangler r2 bucket create YOUR_BUCKET_NAME
```

List the buckets in the current account:

```sh
$ wrangler r2 bucket list 
```
Delete a bucket. Note that the bucket must be empty (all objects must be deleted).

```sh
$ wrangler r2 bucket delete BUCKET_TO_DELETE
```
