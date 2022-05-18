---
title: Configure `rclone` for R2
summary: Example of how to configure `rclone` to use R2.
pcx-content-type: configuration
weight: 1001
layout: example
---

You must [generate an Access Key](/r2/platform/s3-compatibility/tokens/) before getting started. All examples will utilitize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.

With [`rclone`](https://rclone.org/install/) installed, you may run [`rclone configure`](https://rclone.org/s3/) to configure a new S3 storage provider. You will be prompted with a series of questions for the new provider details.

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
provider = Other
access_key_id = abc123 # Your access_key_id
secret_access_key = xyz456 # Your access_key_secret
endpoint = https://<accountid>.r2.cloudflarestorage.com
acl = private
```

You may then use the new `rclone` provider for any of your normal workflows.

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
