---
title: Configure `rclone` for R2
summary: Example of how to configure `rclone` to use R2.
pcx-content-type: configuration
weight: 1001
layout: example
---

{{<render file="_keys.md">}}

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
access_key_id = abc123 # Your access_key_id
secret_access_key = xyz456 # Your access_key_secret
endpoint = https://<accountid>.r2.cloudflarestorage.com
acl = private
```

You may then use the new `rclone` provider for any of your normal workflows.

## Listing buckets & objects

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

## Uploading & retrieving objects

The [rclone copy](https://rclone.org/commands/rclone_copy/) command can be used to upload objects to an R2 bucket and vice versa - this allows you to upload files up to the 5TB maximum object size that R2 supports.
  
```sh
# Upload dog.txt to the user-uploads bucket
$ rclone copy dog.txt r2demo:user-uploads/dog.txt
$ rclone tree r2demo:user-uploads
# /
# ├── foobar.png
# └── dog.txt

# Download dog.txt from the user-uploads bucket
$ rclone copy r2demo:user-uploads/dog.txt dog.txt
```

## Generating presigned URLs

You can also generate presigned links which allow you to share public access to a file temporarily using the [rclone link](https://rclone.org/commands/rclone_link/) command.

```sh
# You can pass the --expire flag to determine how long the presigned link is valid.
$ rclone link r2demo:my-bucket-name/cat.png --expire 3600
# https://<accountid>.r2.cloudflarestorage.com/my-bucket-name/cat.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<credential>&X-Amz-Date=<timestamp>&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=<signature>
```
