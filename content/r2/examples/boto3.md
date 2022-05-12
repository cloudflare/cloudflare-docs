---
title: Configure boto3 for R2
summary: Example of how to configure boto3 to use R2.
pcx-content-type: configuration
weight: 1001
layout: example
---

# Configure `boto3` for R2

You must [generate an Access Key](/r2/platform/s3-compatibility/tokens/) before getting started. All examples will utilitize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.

You must configure [`boto3`](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) to use a preconstructed `endpoint_url` value. This can be done through any `boto3` usage that accepts connection arguments; for example:

```python
import boto3

s3 = boto3.resource('s3',
  endpoint_url = 'https://<accountid>.r2.cloudflarestorage.com',
  aws_access_key_id = '<access_key_id>',
  aws_secret_access_key = '<access_key_secret>'
)
```

You may, however, omit the `aws_access_key_id` and `aws_secret_access_key ` arguments and allow `boto3` to rely on the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` [environment variables](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#using-environment-variables) instead.

An example script may look like the following:

```python
---
filename: main.py
---
import boto3

s3 = boto3.resource('s3',
  endpoint_url = 'https://<accountid>.r2.cloudflarestorage.com',
  aws_access_key_id = '<access_key_id>',
  aws_secret_access_key = '<access_key_secret>'
)

print('Buckets:')
for bucket in s3.buckets.all():
  print(' - ', bucket.name)

bucket = s3.Bucket('my-bucket-name')

print('Objects:')
for item in bucket.objects.all():
  print(' - ', item.key)
```

```sh
$ python main.py
# Buckets:
#  -  user-uploads
#  -  my-bucket-name
# Objects:
#  -  cat.png
#  -  todos.txt
```
