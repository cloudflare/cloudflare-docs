---
title: Using R2 with Postman
summary: Learn how to configure Postman to interact with R2.
pcx-content-type: configuration
weight: 1001
layout: example
---

Postman is an API platform that makes interacting with APIs easier. This guide will explain how to use Postman to make authenticated R2 requests to create a bucket, upload a new object, and then retrieve the object. The R2 [Postman collection](https://www.postman.com/cloudflare-r2/workspace/cloudflare-r2/collection/20913290-14ddd8d8-3212-490d-8647-88c9dc557659?action=share&creator=20913290) includes a complete list of operations supported by the platform.

## 1. Purchase R2

Before getting started, you'll need an R2 subscription. [Learn more](https://developers.cloudflare.com/r2/get-started/#purchase-r2) about setting up your subscription.

## 2. Explore R2 in Postman

Explore R2's publicly available [Postman collection](https://www.postman.com/cloudflare-r2/workspace/cloudflare-r2/collection/20913290-14ddd8d8-3212-490d-8647-88c9dc557659?action=share&creator=20913290). The collection is organized into a `Buckets` folder for bucket-level operations and an `Objects` folder for object-level operations. Operations in the `Objects > Upload` folder allow for adding new objects to R2.

## 3. Configure your R2 credentials

Click on the `Cloudflare R2` collection and navigate to the `Variables` tab. Here, you can set variables within the R2 collection. They will be used to authenticate and interact with the R2 platform. Remember to always press Save after updating a variable.

![Postman Variables](/r2/static/postman-variables.png)

To execute some basic operations, we must set `account-id`, `r2-access-key`, and `r2-secret-id`.

Navigate to the [Cloudflare dashboard](https://dash.cloudflare.com/?account=r2) and select the account to use with R2. On the R2 overview page, copy your Cloudflare account ID in the from the right hand sidebar. Back in Postman, set the Current Value of `account-id` to your Cloudflare account ID and press Save.

Next, navigate back to the R2 overview page to set up your `r2-access-key` and `r2-secret-id`. On the right hand sidebar, click the _Manage R2 API Tokens_ link to create an R2 API Token called `Postman` and grant it the `Edit` permission.

![Generate an R2 API token for Postman](/r2/static/postman-r2-api-token.png)

Guard this token closely. Anyone with this information can fully interact with all of your buckets.

Once created, copy the token’s `Access Key ID` value into Postman’s `r2-secret-id` variable and the `Secret Access Key` value into Postman’s `r2-access-key` variable and press Save.

By now, you should have `account-id`, `r2-secret-id`, and `r2-access-key` set in Postman. To verify the token, navigate to the `ListBuckets` request and press `Send`. The Postman collection uses AWS SigV4 authentication to complete the handshake.

![ListBuckets in Postman](/r2/static/postman-r2-list-buckets.png)

You should see a `200 OK` response with a list of existing buckets. If you receive an error, ensure your R2 subscription is active and Postman variables are saved correctly.

## 4. Create a bucket

Now, let’s have some fun. In your `Variables` tab, think of a fun name for a bucket and set it as the `r2-bucket` variable and press Save. Then, select the `CreateBucket` request and press `Send`.

![CreateBucket in Postman](/r2/static/postman-r2-create-bucket.png)

You should see a `200 OK` response. If you run the `ListBuckets` request again, your bucket will appear in the list of results.

## 5. Add an object

A bucket isn’t very interesting without some stuff inside so let’s add an object. On the `Variables` tab, we set `r2-object` to `cat-pic.jpg` and press Save. Then, we select the `PutObject` request, and on the `Body` tab, we choose `binary` before attaching our favorite cat picture. Finally, we press `Send` to add a fluffy friend to R2.

![PutObject in Postman](/r2/static/postman-r2-put-object.png)

After a few seconds, you should receive a `200 OK` response.

## 6. Get an object

It only takes one more click to download our cat friend using the `GetObject` request.

![GetObject in Postman](/r2/static/postman-r2-get-object.png)

You can explore the rest of the R2 Postman collection by playing with other operations. We’ll keep this collection up to date as we expand our feature set so stay tuned for updates.
