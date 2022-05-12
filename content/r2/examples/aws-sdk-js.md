---
title: Configure aws-sdk-jd for R2
summary: Example of how to configure aws-sdk-js to use R2.
pcx-content-type: configuration
weight: 1001
layout: example
---

# Configure `aws-sdk-jd` for R2

You must [generate an Access Key](/r2/platform/s3-compatibility/tokens/) before getting started. All examples will utilitize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.

JavaScript or TypeScript users may continue to use the [`aws-sdk`](https://www.npmjs.com/package/aws-sdk) npm package as per normal. You must pass in the R2 configuration credentials when instantiating your `S3` service client:

```ts
import S3 from 'aws-sdk/clients/s3.js';

const s3 = new S3({
  endpoint: `https://${accountid}.r2.cloudflarestorage.com`,
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
