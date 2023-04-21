---
title: Postman
summary: Learn how to configure Postman to interact with R2.
pcx_content_type: configuration
---

# Use R2 with Postman

Postman is an API platform that makes interacting with APIs easier. This guide will explain how to use Postman to make authenticated R2 requests to create a bucket, upload a new object, and then retrieve the object. The R2 [Postman collection](https://www.postman.com/cloudflare-r2/workspace/cloudflare-r2/collection/20913290-14ddd8d8-3212-490d-8647-88c9dc557659?action=share&creator=20913290) includes a complete list of operations supported by the platform.

## 1. Purchase R2

This guide assumes that you have made a Cloudflare account and [purchased R2](/r2/get-started/#purchase-r2).

## 2. Explore R2 in Postman

Explore R2's publicly available [Postman collection](https://www.postman.com/cloudflare-r2/workspace/cloudflare-r2/collection/20913290-14ddd8d8-3212-490d-8647-88c9dc557659?action=share&creator=20913290). The collection is organized into a `Buckets` folder for bucket-level operations and an `Objects` folder for object-level operations. Operations in the `Objects > Upload` folder allow for adding new objects to R2.

## 3. Configure your R2 credentials

In the [Postman dashboard](https://www.postman.com/cloudflare-r2/workspace/cloudflare-r2/collection/20913290-14ddd8d8-3212-490d-8647-88c9dc557659?action=share&creator=20913290&ctx=documentation), select the **Cloudflare R2** collection and navigate to the **Variables** tab. In **Variables**, you can set variables within the R2 collection. They will be used to authenticate and interact with the R2 platform. Remember to always select **Save** after updating a variable.

![Select **Variables** in the Postman dashboard to continue with the example](/r2/static/postman-variables.png)

To execute basic operations, you must set the `account-id`, `r2-access-key-id`, and `r2-secret-access-key` variables in the Postman dashboard > **Variables**.

To do this:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?account=r2).
2. In **Account Home**, select **R2**.
3. In **R2**, under **Manage R2 API Tokens** on the right side of the dashboard, copy your Cloudflare account ID.
4. Go back to the [Postman dashboard](https://www.postman.com/cloudflare-r2/workspace/cloudflare-r2/collection/20913290-14ddd8d8-3212-490d-8647-88c9dc557659?action=share&creator=20913290&ctx=documentation).
5. Set the **CURRENT VALUE** of `account-id` to your Cloudflare account ID and select **Save**.

Next, generate an R2 API token:

1. Go to the Cloudflare dashboard > **R2**.
2. On the right hand sidebar, select **Manage R2 API Tokens**.
3. Select **Create API token**.
4. Name your token **Postman** by selecting the pencil icon next to the API name and grant it the **Edit** permission.

![Generate an R2 API token for Postman by following the instructions above](/r2/static/postman-r2-api-token.png)

Guard this token and the **Access Key ID** and **Secret Access Key** closely. You will not be able to review these values again after finishing this step. Anyone with this information can fully interact with all of your buckets.

After you have created your API token in the Cloudflare dashboard:

1. Go to the [Postman dashboard](https://www.postman.com/cloudflare-r2/workspace/cloudflare-r2/collection/20913290-14ddd8d8-3212-490d-8647-88c9dc557659?action=share&creator=20913290&ctx=documentation) > **Variables**.
2. Copy `Access Key ID` value from the Cloudflare dashboard and paste it into Postman’s `r2-secret-access-key` variable value and select **Save**.
3. Copy the `Secret Access Key` value value from the Cloudflare dashboard and paste into Postman’s `r2-access-key-id` variable value and select **Save**.

By now, you should have `account-id`, `r2-secret-access-key`, and `r2-access-key-id` set in Postman.

To verify the token:

1. In the Postman dashboard, select the **Cloudflare R2** folder dropdown arrow > **Buckets** folder dropdown arrow > **`GET`ListBuckets**.
2. Select **Send**.

The Postman collection uses AWS SigV4 authentication to complete the handshake.

![Follow the instructions above to access ListBuckets in the Postman dashboard](/r2/static/postman-r2-list-buckets.png)

You should see a `200 OK` response with a list of existing buckets. If you receive an error, ensure your R2 subscription is active and Postman variables are saved correctly.

## 4. Create a bucket

In the Postman dashboard:

1. Go to **Variables**.
2. Set the `r2-bucket` variable value as the name of your R2 bucket and select **Save**.
3. Select the **Cloudflare R2** folder dropdown arrow > **Buckets** folder dropdown arrow > **`PUT`CreateBucket** and select **Send**.

![Follow the instructions above to navigate to CreateBucket in the Postman dashboard](/r2/static/postman-r2-create-bucket.png)

You should see a `200 OK` response. If you run the `ListBuckets` request again, your bucket will appear in the list of results.

## 5. Add an object

You will now add an object to your bucket:

1. Go to **Variables** in the Postman dashboard.
2. Set `r2-object` to `cat-pic.jpg` and select **Save**.
3. Select **Cloudflare R2** folder dropdown arrow > **Objects** folder dropdown arrow > **Multipart** folder dropdown arrow > **`PUT`PutObject** and select **Send**.
4. Go to **Body** and choose **binary** before attaching your cat picture.
5. Select **Send** to add the cat picture to your R2 bucket.

![Follow the instructions above to PutObject in the Postman dashboard](/r2/static/postman-r2-put-object.png)

After a few seconds, you should receive a `200 OK` response.

## 6. Get an object

It only takes a few more more clicks to download our cat friend using the `GetObject` request.

1. Select the **Cloudflare R2** folder dropdown arrow > **Objects** folder dropdown arrow > **`GET`GetObject**.
2. Select **Send**.

![Follow the instructions above to GetObject in the Postman dashboard](/r2/static/postman-r2-get-object.png)

The R2 team will keep this collection up to date as we expand R2 features set. You can explore the rest of the R2 Postman collection by experimenting with other operations.
