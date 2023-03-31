---
title: rclone
pcx_content_type: configuration
---

# Configure `rclone` for R2

{{<render file="_keys.md">}}<br>

With [`rclone`](https://rclone.org/install/) installed, you may run [`rclone config`](https://rclone.org/s3/) to configure a new S3 storage provider. You will be prompted with a series of questions for the new provider details.

{{<Aside type="note" header="Recommendation">}}
It is recommended that you choose a unique provider name and then rely on all default answers to the prompts.

This will create a `rclone` configuration file, which you can then modify with the preset configuration given below.
{{</Aside>}}

{{<Aside type="note">}}
Ensure you are running `rclone` v1.59 or greater ([rclone downloads](https://beta.rclone.org/)). Versions prior to v1.59 may return `HTTP 401: Unauthorized` errors, as earlier versions of `rclone` do not strictly align to the S3 specification in all cases.
{{</Aside>}}

If you have already configured `rclone` in the past, you may run `rclone config file` to print the location of your `rclone` configuration file:

```sh
$ rclone config file
# Configuration file is stored at:
# ~/.config/rclone/rclone.conf
```

Then use an editor (`nano` or `vim`, for example) to add or edit the new provider. This example assumes you are adding a new `r2demo` provider:

```toml
---
filename: ~/.config/rclone/rclone.conf
---
[r2demo]
type = s3
provider = Cloudflare
access_key_id = abc123
secret_access_key = xyz456
endpoint = https://<accountid>.r2.cloudflarestorage.com
acl = private
```

You may then use the new `rclone` provider for any of your normal workflows.

## List buckets & objects

The [rclone tree](https://rclone.org/commands/rclone_tree/) command can be used to list the contents of the remote, in this case Cloudflare R2.

```sh
$ rclone tree r2demo:
# /
# ├── user-uploads
# │   └── foobar.png
# └── my-bucket-name
#     ├── cat.png
#     └── todos.txt

$ rclone tree r2demo:my-bucket-name
# /
# ├── cat.png
# └── todos.txt
```

## Upload and retrieve objects

The [rclone copy](https://rclone.org/commands/rclone_copy/) command can be used to upload objects to an R2 bucket and vice versa - this allows you to upload files up to the 5 TB maximum object size that R2 supports.

```sh
# Upload dog.txt to the user-uploads bucket
$ rclone copy dog.txt r2demo:user-uploads/
$ rclone tree r2demo:user-uploads
# /
# ├── foobar.png
# └── dog.txt

# Download dog.txt from the user-uploads bucket
$ rclone copy r2demo:user-uploads/dog.txt .
```

### A note about multipart upload part sizes

For multipart uploads, part sizes can significantly affect the number of Class A operations that are used, which can alter how much you end up being charged.
Every part upload counts as a separate operation, so larger part sizes will use fewer operations, but might be costly to retry if the upload fails. Also consider that a multipart upload is always going to consume at least 3 times as many operations as a single `PutObject`, because it will include at least one `CreateMultipartUpload`, `UploadPart` & `CompleteMultipartUpload` operations.

Balancing part size depends heavily on your use-case, but these factors can help you minimize your bill, so they are worth thinking about.

You can configure rclone's multipart upload part size using the `--s3-chunk-size` CLI argument. Note that you might also have to adjust the `--s3-upload-cutoff` argument to ensure that rclone is using multipart uploads. Both of these can be set in your configuration file as well. Generally, `--s3-upload-cutoff` will be no less than `--s3-chunk-size`.

```sh
$ rclone copy long-video.mp4 r2demo:user-uploads/ --s3-upload-cutoff=100M --s3-chunk-size=100M
```

## Generate presigned URLs

You can also generate presigned links which allow you to share public access to a file temporarily using the [rclone link](https://rclone.org/commands/rclone_link/) command.

```sh
# You can pass the --expire flag to determine how long the presigned link is valid.
$ rclone link r2demo:my-bucket-name/cat.png --expire 3600
# https://<accountid>.r2.cloudflarestorage.com/my-bucket-name/cat.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<credential>&X-Amz-Date=<timestamp>&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=<signature>
```
