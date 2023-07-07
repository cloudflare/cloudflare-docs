---
updated: 2023-06-15
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Securely access and upload assets with Cloudflare R2
layout: single
---

# Securely access and upload assets with Cloudflare R2

This tutorial explains how to create a TypeScript-based Cloudflare Workers project that can securely access files from and upload files to a [Cloudflare R2](/r2) bucket. Cloudflare R2 allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [`npm`](https://docs.npmjs.com/getting-started).
3. Install [`Node.js`](https://nodejs.org/en/). Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](/workers/wrangler/install-and-update/) requires a Node version of `16.13.0` or later.

## Create a Worker application

First, use the [`create-cloudflare` CLI](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) to create a new Worker. To do this, open a terminal window and run the following command:

{{<tabs labels="NPM | Yarn">}}
{{<tab label="npm" no-code="true">}}

```sh
$ npm create cloudflare@latest
```

{{</tab>}}
{{<tab label="yarn" no-code="true">}}

```sh
$ yarn create cloudflare@latest
```

{{</tab>}}
{{</tabs>}}

To continue with this guide:

1. Give your new Worker application a name.
2. Select `"Hello World" Worker` for the type of application.
3. Select `Yes` to using TypeScript.
4. Select `No` to deploying your application. 

If you choose to deploy, you will be asked to authenticate (if not logged in already), and your project will be deployed. If you deploy, you can still modify your Worker code and deploy again at the end of this tutorial.

## Create an R2 bucket

Before you integrate R2 bucket access into your Worker application, an R2 bucket must be created:

```sh
$ wrangler r2 bucket create <YOUR_BUCKET_NAME>
```
Replace `<YOUR_BUCKET_NAME>` with the name you want to assign to your bucket. List your account's R2 buckets to verify that a new bucket has been added:

```sh
$ wrangler r2 bucket list
```

## Configure access to an R2 bucket

After your new R2 bucket is ready, use it inside your Worker application. 

Use your R2 bucket inside your Worker project by modifying the `wrangler.toml` configuration file to include an [R2 bucket binding](/workers/platform/bindings/#r2-bucket-bindings). Add the following R2 bucket binding to your `wrangler.toml` file:

```toml
[[r2_buckets]]
binding = 'MY_BUCKET' 
bucket_name = '<YOUR_BUCKET_NAME>'
```

Give your R2 bucket binding name. Replace `<YOUR_BUCKET_NAME>` with the name of the R2 bucket you created earlier. 

Your Worker application can now access your R2 bucket using the `MY_BUCKET` variable. You can now perform CRUD (Create, Read, Update, Delete) operations on the contents of the bucket.

## Fetch from an R2 bucket

After setting up an R2 bucket binding, you will implement the functionalities for the Worker to interact with the R2 bucket, such as, fetching files from the bucket and uploading files to the bucket.

To fetch files from the R2 bucket, use the `BINDING.get` function. In the below example, the R2 bucket binding is called `MY_BUCKET`. Using `.get(key)`, you can retrieve an asset based on the URL pathname as the key. In this example, the URL pathname is `/image.png`, and the asset key is `image.png`.

```ts
---
filename: worker.ts
---
export default {
  async fetch(request: Request, env: any) {
    // For example, the request URL my-worker.account.workers.dev/image.png
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    // Retrieve the key "image.png"
    const object = await env.MY_BUCKET.get(key);
    
    if (object === null) {
      return new Response('Object Not Found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);

    return new Response(object.body, {
      headers,
    });
  },
};
```
The code written above fetches and returns data from the R2 bucket when a `GET` request is made to the Worker application using a specific URL path.

## Upload securely to an R2 bucket

Next, you will add the ability to upload to your R2 bucket using authentication. To securely authenticate your upload requests, use [Wrangler's secret capability](/workers/wrangler/commands/#secret). Wrangler was installed when you ran the `create cloudflare@latest` command.

Create a secret value of your choice -- for instance, a random string or password. Using the Wrangler CLI, add the secret to your project as `AUTH_SECRET`:

```sh
$ wrangler secret put AUTH_SECRET
```

Now, add a new code path that handles a `PUT` HTTP request. This new code will check that the previously uploaded secret is correctly used for authentication, and then upload to R2 using `MY_BUCKET.put(key, data)`:

```ts
---
filename: worker.ts
---
export default {
  async fetch(request: Request, env: any) {
    if (request.method === 'PUT') {
      // Note that you could require authentication for all requests
      // by moving this code to the top of the fetch function.
      const auth = request.headers.get('Authorization');
      const expectedAuth = `Bearer ${env.AUTH_SECRET}`;

      if (!auth || auth !== expectedAuth) {
        return new Response('Unauthorized', { status: 401 });
      }

      const url = new URL(request.url);
      const key = url.pathname.slice(1);
      await env.MY_BUCKET.put(key, request.body);
      return new Response(`Object ${key} uploaded successfully!`);
    }
    
    // include the previous code here...
  },
};
```

This approach ensures that only clients who provide a valid bearer token, via the `Authorization` header equal to the `AUTH_SECRET` value, will be permitted to upload to the R2 bucket. If you used a different binding name than `AUTH_SECRET`, replace it in the code above.

## Deploy your Worker application

After completing your Cloudflare Worker project, deploy it to Cloudflare. Make sure you are in your Worker application directory that you created for this tutorial, then run:

```sh
$ npx wrangler deploy
```
Your application is now live and accessible at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.


You have successfully created a Cloudflare Worker that allows you to interact with an R2 bucket to accomplish tasks such as uploading and downloading files. You can now use this as a starting point for your own projects.

## Next steps

To build more with R2 and Workers, refer to [Tutorials](/workers/tutorials/) and the [R2 documentation](/r2/).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord](https://discord.gg/cloudflaredev) to connect with fellow developers and the Cloudflare team.