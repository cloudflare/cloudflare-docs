---
title: Configure `aws` CLI for R2
summary: Example of how to configure `aws` CLI to use R2.
pcx-content-type: configuration
weight: 1001
layout: example
---

You must [generate an Access Key](/r2/platform/s3-compatibility/tokens/) before getting started. All examples will utilitize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.

With the [`aws`](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) CLI installed, you may run [`aws configure`](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config) to configure a new profile. You will be prompted with a series of questions for the new profile's details.

```shell
$ aws configure
AWS Access Key ID [None]: <access_key_id>
AWS Secret Access Key [None]: <access_key_secret>
Default region name [None]: auto
Default output format [None]: json
```

You may then use the `aws` CLI for any of your normal workflows.

```sh
$ aws s3api list-buckets --endpoint-url https://<accountid>.r2.cloudflarestorage.com
# {
#     "Buckets": [
#         {
#             "Name": "sdk-example",
#             "CreationDate": "2022-05-18T17:19:59.645000+00:00"
#         }
#     ],
#     "Owner": {
#         "DisplayName": "134a5a2c0ba47b38eada4b9c8ead10b6",
#         "ID": "134a5a2c0ba47b38eada4b9c8ead10b6"
#     }
# }

$ aws s3api list-objects-v2 --endpoint-url https://134a5a2c0ba47b38eada4b9c8ead10b6.r2.cloudflarestorage.com --bucket sdk-example
# {
#     "Contents": [
#         {
#             "Key": "ferriswasm.png",
#             "LastModified": "2022-05-18T17:20:21.670000+00:00",
#             "ETag": "\"eb2b891dc67b81755d2b726d9110af16\"",
#             "Size": 87671,
#             "StorageClass": "STANDARD"
#         }
#     ]
# }
```
