---
title: Download objects
pcx_content_type: how to
weight: 2
---

# Upload objects

You can download objects from your bucket from the Cloudflare dashboard or using the Wrangler.

## Download objects via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select **R2**.
2. From the **R2** page in the dashboard, locate and select your bucket.
3. From your bucket's page, locate the object you want to download. 
4. At the end of the object's row, select the menu button and click **Download**.

## Download objects via Wrangler

You can download objects from a bucket, including private buckets in your account, directly.

For example, to download `file.bin` from `test-bucket`:

```sh
$ wrangler r2 object get test-bucket/file.bin

Downloading "file.bin" from "test-bucket".
Download complete.
```

The file will be downloaded into the current working directory. You can also use the `--file` flag to set a new name for the object as it is downloaded, and the `--pipe` flag to pipe the download to standard output (stdout).