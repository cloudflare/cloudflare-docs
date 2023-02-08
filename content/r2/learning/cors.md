---
pcx_content_type: how-to
title: Configure CORS
weight: 3
---

# Configure Cross-Origin Resource Sharing (CORS)

Cross-Origin Resource Sharing (CORS) is a standardized method that prevents domain X from accessing the resources of domain Y. It does so by using special headers in HTTP responses from domain Y, that allow your browser to verify that domain Y permits domain X to access these resources.

While CORS can help protect your data from malicious websites, CORS is also used to interact with objects in your bucket and configure policies on your bucket.

CORS is used when you interact with a bucket from a web browser, and you have two options:

**[Set a bucket to public:](#use-cors-with-a-public-bucket)** This option makes your bucket accessible on the Internet as read-only, which means anyone can request and load objects from your bucket in their browser or anywhere else. This option is ideal if your bucket contains images used in a public blog.

**[Presigned URLs:](#use-cors-with-a-presigned-url)** Allows anyone with access to the unique URL to perform specific actions on your bucket.

For more information about CORS, refer to [Cross Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

## Prerequisites

Before you configure CORS, you must have:
 
- An R2 bucket with at least one object. If you need to create a bucket, refer to [Create a public bucket](/r2/data-access/public-buckets/).
- A domain you can use to access the object. This can also be a `localhost`.
- (Optional) Access keys. An access key is only required when creating a presigned URL.

## Use CORS with a public bucket

To use CORS with a public bucket, ensure your bucket is set to allow public access.

Next, [add a CORS policy](#add-cors-policies-from-the-dashboard) to your bucket to allow the file to be shared.

## Use CORS with a presigned URL

Presigned URLs are an S3 concept that contain a special signature that encodes details of an S3 action, such as `GetObject` or `PutObject`. Presigned URLs are only used for authentication, which means they are generally safe to distribute publicly without revealing any secrets.

### Create a presigned URL

You will need a pair of S3-compatible credentials to use when you generate the presigned URL.

The example below shows how to generate a presigned `PutObject` URL using the [`@aws-sdk/client-s3`](https://www.npmjs.com/package/@aws-sdk/client-s3) package for JavaScript.

```js
import {
  PutObjectCommand,
  S3,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3({
  endpoint: "https://4893d737c0b9e484dfc37ec392b5fa8a.r2.cloudflarestorage.com",
  credentials: {
	accessKeyId: "7dc27c125a22ad808cd01df8ec309d41",
	secretAccessKey:
  	"1aa5c5b0c43defdb88f567487c071d17e234126133444770a706ae09336c57a4",
  },
  region: "auto",
});

const url = await getSignedUrl(
  s3,
  new PutObjectCommand({
	Bucket: bucket,
	Key: object,
  }),
  {
	expiresIn: 60 * 60 * 24 * 7, // 7d
  }
);
console.log(url);
```

### Test the presigned URL

Test the presigned URL by uploading an object using cURL.

```json
curl -H "Content-Type: text/plain"
```

## Add CORS policies from the dashboard

1. From the Cloudflare dashboard, select **R2**.
2. Locate and select your bucket from the list.
3. From your bucket’s page, select **Settings**.
4. Under **CORS Policy**, select **Add CORS policy**.
5. From the **JSON** tab, manually enter or copy and paste your policy into the text box.
6. When you are done, select **Save**.

Your policy displays on the **Settings** page for your bucket.

## Response headers

You can use the headers below to customize the CORS policy.

- `AllowedOrigins`: Specifies the value for the `Access-Control-Allow-Origin` header R2 sets when requesting objects in a bucket from a browser. Example: `http://www.example.com`
- `AllowedMethods`: Specifies the value for the `Access-Control-Allow-Methods` header R2 sets when requesting objects in a bucket from a browser.
- `AllowedHeaders`: Specifies the value `Access-Control-Allow-Headers` header R2 sets when requesting objects in this bucket from a browser
- `ExposeHeaders`: Object headers used when requesting an object from a browser.
- `MaxAgeSeconds`: The amount of time in seconds browsers are allowed to cache CORS preflight responses.

## Example

This example shows a CORS policy added for a bucket that contains the `Roboto-Light.ttf` object, which is a font file.

The `AllowedOrigins` specify the web server being used, and `localhost:3000` is the hostname where the web server is running. The `AllowedMethods` specify that only `GET` requests are allowed and can read objects in your bucket.

```json
[ 
  { 
    "AllowedOrigins": [ 
       "localhost:3000" 
    ],  
    "AllowedMethods": [
       "GET",
    ]
  }
]
```