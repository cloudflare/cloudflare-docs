---
title: Get started
pcx_content_type: get-started
weight: 2
meta:
  title: Get started guide
---

# Get started 

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

<div style="position: relative; padding-top: 56.25%;"><iframe src="https://customer-6qw1mjlclhl2mqdy.cloudflarestream.com/c247ba8eb4b61355184867bec9e5c532/iframe?poster=https%3A%2F%2Fcustomer-6qw1mjlclhl2mqdy.cloudflarestream.com%2Fc247ba8eb4b61355184867bec9e5c532%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>

## Object storage 

Object storage is an architecture for storing and managing data in an unstructured format, and examples of unstructured data include photos, audio files, videos, and data lakes to name a few.

Object storage allows you to assign unique identifiers to each file, or object, which you can use to locate and access each object.

Object storage is best for data that needs to be read many times, such as audio or video files on your personal website.


## 1. Install and authenticate Wrangler

{{<Aside type="note">}}

Before you create your first bucket, you must purchase R2 from the Cloudflare dashboard.

{{</Aside>}}

1. [Install Wrangler](/workers/wrangler/install-and-update/) within your project using npm and Node.js or Yarn.

{{<tabs labels="npm | yarn">}}
{{<tab label="npm" default="true">}}

```sh
$ npm install wrangler --save-dev
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn add --dev wrangler
```

{{</tab>}}
{{</tabs>}}

2. [Authenticate Wrangler](/workers/wrangler/commands/#login) to enable deployments to Cloudflare. When Wrangler automatically opens your browser to display Cloudflare’s consent screen, select **Allow** to send the API Token to Wrangler.

```txt
wrangler login
```

## 2. Create a bucket

To create a new R2 bucket from the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select **R2**.
2. Select **Create bucket**.
3. Enter a name for the bucket and select **Create bucket**.

## 3. Upload your first object

1. From the **R2** page in the dashboard, locate and select your bucket.
2. Select **Upload**.
3. Choose to either drag and drop your file into the upload area or **select from computer**.

You will receive a confirmation message after a successful upload.

## Bucket access options

Cloudflare provides multiple ways for developers to access their R2 buckets:

- [Workers Runtime API](/r2/api/workers/workers-api-usage/)
- [S3 API compatibility](/r2/api/s3/api/)
- [Public buckets](/r2/buckets/public-buckets/)