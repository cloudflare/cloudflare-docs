---
title: Delete objects
pcx_content_type: how to
weight: 3
---

# Delete objects

You can delete objects from your bucket from the Cloudflare dashboard or using the Wrangler.

## Delete objects via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select **R2**.
2. From the **R2** page in the dashboard, locate and select your bucket.
3. From your bucket's page, locate the object you want to delete. You can select multiple objects to delete at one time.
4. Select your objects and select **Delete**. 
5. Confirm your choice by selecting **Delete**.

## Delete objects via Wrangler

{{<Aside type="warning">}}

Deleting objects from a bucket is irreversible.

{{</Aside>}}

You can delete an object directly by calling `delete` against a `{bucket}/{path/to/object}`.

For example, to delete the object `foo.png` from bucket `test-bucket`:

```sh
$ wrangler r2 object delete test-bucket/foo.png

Deleting object "foo.png" from bucket "test-bucket".
Delete complete.
```