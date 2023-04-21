---
title: Upload objects
pcx_content_type: how to
weight: 1
---

# Upload objects

You can upload objects to your bucket from the Cloudflare dashboard or using the Wrangler.

## Upload objects via the Cloudflare dashboard

To upload objects to your bucket from the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select **R2**.
2. From the **R2** page in the dashboard, locate and select your bucket.
3. Select **Upload**.
4. Choose to either drag and drop your file into the upload area or **select from computer**.

You will receive a confirmation message after a successful upload.

## Upload objects via Wrangler

{{<Aside type="note">}}

Wrangler only supports uploading files up to 315MB in size. To upload large files, we recommend [rclone](/r2/examples/rclone/) or an [S3-compatible](/r2/api/s3/) tool of your choice. 

{{</Aside>}}

To upload a file to R2, call `put` and provide a name (key) for the object, as well as the path to the file via `--file`:

```sh
$ wrangler r2 object put test-bucket/dataset.csv --file=dataset.csv

Creating object "dataset.csv" in bucket "test-bucket".
Upload complete.
```

You can set the `Content-Type` (MIME type), `Content-Disposition`, `Cache-Control` and other HTTP header metadata through optional flags.

