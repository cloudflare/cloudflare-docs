---
title: aws CLI
pcx_content_type: configuration
---

# Configure `aws` CLI for R2

{{<render file="_keys.md">}}<br>

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

$ aws s3api list-objects-v2 --endpoint-url https://<accountid>.r2.cloudflarestorage.com --bucket sdk-example
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

## Generate presigned URLs

You can also generate presigned links which allow you to share public access to a file temporarily.

```sh
# You can pass the --expires-in flag to determine how long the presigned link is valid.
$ aws s3 presign --endpoint-url https://<accountid>.r2.cloudflarestorage.com  s3://sdk-example/ferriswasm.png --expires-in 3600
# https://<accountid>.r2.cloudflarestorage.com/sdk-example/ferriswasm.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<credential>&X-Amz-Date=<timestamp>&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=<signature>   
```
