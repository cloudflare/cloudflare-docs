---
pcx_content_type: reference
weight: 4
title: Wrangler (Command Line Interface)
---

# Wrangler

Wrangler is [a commmand-line tool](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for building with Cloudflare's developer products, including R2.

The R2 support in Wrangler allows you to manage buckets and perform basic operations against objects in your buckets. For more advanced use-cases, including bulk uploads or mirroring files from legacy object storage providers, we recommend [rclone](https://developers.cloudflare.com/r2/examples/rclone/) or an [S3-compatible](https://developers.cloudflare.com/r2/data-access/s3-api/api/) tool of your choice. 

## Configuring Wrangler

If you have not installed Wrangler before, follow the [installation](https://developers.cloudflare.com/workers/wrangler/install-and-update/) guide to install the `wrangler` CLI onto your machine.

Once installed, you'll need to `wrangler login` to authenticate Wrangler against your Cloudflare account.

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

## Object Level Operations

### Upload an Object

{{<Aside type="note">}}

Wrangler only supports uploading files up to 315MB in size. To upload large files, we recommend [rclone](https://developers.cloudflare.com/r2/examples/rclone/) or an [S3-compatible](https://developers.cloudflare.com/r2/data-access/s3-api/api/) tool of your choice. 

{{</Aside>}}

To upload a file to R2, call `put` and provide a name (key) for the object, as well as the path to the file via `--file`:

```sh
$ wrangler r2 object put test-bucket/dataset.csv --file=dataset.csv

Creating object "dataset.csv" in bucket "test-bucket".
Upload complete.
```

You can set the Content Type (MIME type), Content Disposition, Cache Control and other HTTP header metadata through optional flags.

### Download an Object

You can download objects from a bucket (including private buckets in your account) directly.

For example, to download `file.bin` from `test-bucket`:

```sh
$ wrangler r2 object get test-bucket/file.bin

Downloading "file.bin" from "test-bucket".
Download complete.
```

The file will be downloaded into the current working directory. You can also use the `--file` flag to set a new name for the object as it is downloaded, and the `--pipe` flag to pipe the download to stdout.

### Delete an Object

{{<Aside type="warning">}}

**Deleting an object (or objects) from a bucket is irreversible**.

{{</Aside>}}

You can delete an object directly by calling `delete` against a `{bucket}/{path/to/object}`.

For example, to delete the object `foo.png` from bucket `test-bucket`:

```sh
$ wrangler r2 object delete test-bucket/foo.png

Deleting object "foo.png" from bucket "test-bucket".
Delete complete.
```
