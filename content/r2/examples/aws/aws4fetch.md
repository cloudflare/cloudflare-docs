---
title: aws4fetch
pcx_content_type: configuration
---

# Configure `aws4fetch` for R2

{{<render file="_keys.md">}}<br>

JavaScript or TypeScript users may continue to use the [`aws4fetch`](https://www.npmjs.com/package/aws4fetch) npm package as per normal. This package uses the `fetch` and `SubtleCrypto` APIs which you will be familiar with when working in browsers or with Cloudflare Workers.

You must pass in the R2 configuration credentials when instantiating your `S3` service client:

```ts
import { AwsClient } from "aws4fetch";

const R2_URL = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

const client = new AwsClient({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const ListBucketsResult = await client.fetch(R2_URL);
console.log(await ListBucketsResult.text());
// <ListAllMyBucketsResult>
//     <Buckets>
//         <Bucket>
//             <CreationDate>2022-04-13T21:23:47.102Z</CreationDate>
//             <Name>user-uploads</Name>
//         </Bucket>
//         <Bucket>
//             <CreationDate>2022-05-07T02:46:49.218Z</CreationDate>
//             <Name>my-bucket-name</Name>
//         </Bucket>
//     </Buckets>
//     <Owner>
//         <DisplayName>...</DisplayName>
//         <ID>...</ID>
//     </Owner>
// </ListAllMyBucketsResult>

const ListObjectsV2Result = await client.fetch(`${R2_URL}/my-bucket-name?list-type=2`)
console.log(await ListObjectsV2Result.text())
// <ListBucketResult>
//   <Name>my-bucket-name</Name>
//   <Contents>
//     <Key>cat.png</Key>
//     <Size>751832</Size>
//     <LastModified>2022-05-07T02:50:45.616Z</LastModified>
//     <ETag>"c4da329b38467509049e615c11b0c48a"</ETag>
//     <StorageClass>STANDARD</StorageClass>
//   </Contents>
//   <Contents>
//     <Key>todos.txt</Key>
//     <Size>278</Size>
//     <LastModified> 2022-05-07T21:37:17.150Z</LastModified>
//     <ETag>"29d911f495d1ba7cb3a4d7d15e63236a"</ETag>
//     <StorageClass>STANDARD</StorageClass>
//   </Contents>
//   <IsTruncated>false</IsTruncated>
//   <MaxKeys>1000</MaxKeys>
//   <KeyCount>2</KeyCount>
// </ListBucketResult>
```
