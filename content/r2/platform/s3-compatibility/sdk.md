---
title: SDK Examples
pcx-content-type: configuration
---

# SDK Examples

Below you will find a few examples of configuring popular S3-oriented SDKs for usage with R2.

You must [generate an Access Key](/r2/platform/s3-compatibility/tokens/) before getting started. All examples will utilitize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.

Additionally, you will need your [Cloudflare Account ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/) to construct your R2 endpoint URL, which is needed for every SDK configuration. An endpoint is constructed with the following format:

```js
const r2endpoint = 'https://<accountid>.r2.cloudflarestorage.com';
```

## `boto3`

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

## `rclone`

With [`rclone`](https://rclone.org/install/) installed, you may run [`rclone configure`](https://rclone.org/s3/) to configure a new S3 storage provider. You will be prompted with a series of questions for the new provider details.

{{<Aside type="note" header="Recommendation">}}
It is recommended that you choose a unique provider name and then rely on all default answers to the prompts.

This will create a `rclone` configuration file, which you can then modify with the preset configuration given below.
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

## `aws-sdk-js`

JavaScript or TypeScript users may continue to use the [`aws-sdk`](https://www.npmjs.com/package/aws-sdk) npm package as per normal. You must pass in the R2 configuration credentials when instantiating your `S3` service client:

```ts
import S3 from 'aws-sdk/clients/s3.js';

const s3 = new S3({
  endpoint: `https://${accountid}.r2-staging.cloudflarestorage.com`,
  accessKeyId: `${access_key_id}`,
  secretAccessKey: `${access_key_secret}`,
  s3DisableBodySigning: false,
  s3ForcePathStyle: true,
});

console.log(
  await s3.listBuckets().promise()
);
//=> {
//=>   Buckets: [
//=>     { Name: 'user-uploads', CreationDate: 2022-04-13T21:23:47.102Z },
//=>     { Name: 'my-bucket-name', CreationDate: 2022-05-07T02:46:49.218Z }
//=>   ],
//=>   Owner: {
//=>     DisplayName: '...',
//=>     ID: '...'
//=>   }
//=> }

console.log(
  await s3.listObjects({ Bucket: 'my-bucket-name' }).promise()
);
//=> {
//=>   IsTruncated: false,
//=>   Name: 'my-bucket-name',
//=>   CommonPrefixes: [],
//=>   MaxKeys: 1000,
//=>   Contents: [
//=>     {
//=>       Key: 'cat.png',
//=>       LastModified: 2022-05-07T02:50:45.616Z,
//=>       ETag: '"c4da329b38467509049e615c11b0c48a"',
//=>       ChecksumAlgorithm: [],
//=>       Size: 751832,
//=>       Owner: [Object]
//=>     },
//=>     {
//=>       Key: 'todos.txt',
//=>       LastModified: 2022-05-07T21:37:17.150Z,
//=>       ETag: '"29d911f495d1ba7cb3a4d7d15e63236a"',
//=>       ChecksumAlgorithm: [],
//=>       Size: 279,
//=>       Owner: [Object]
//=>     }
//=>   ]
//=> }
```
