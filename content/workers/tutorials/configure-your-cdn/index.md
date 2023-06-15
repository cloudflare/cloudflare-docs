---
updated: 2023-06-15
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Access an R2 bucket
layout: single
---

# Access an R2 Bucket

This tutorial explains how to create a TypeScript-based Cloudflare Workers project that can securely access from and upload files to a [Cloudflare R2](/r2) bucket.

## Prerequisites

- A Cloudflare account - if you don't have one, [sign up](https://dash.cloudflare.com/sign-up/workers-and-pages) before continuing.
- Node.js and npm installed.

## Create a new project

First, use the [`create-cloudflare` CLI](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) to create a new Cloudflare Workers project. To do this, open a terminal window and run the following command:

```sh
$ npm create cloudflare
```

or `yarn`:

```sh
$ yarn create cloudflare
```

This will prompt you to install the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) package and lead you through a setup wizard. When asked to choose a template, select the "Hello World Script" option.

Once your project has been configured and scaffolded, you will be asked if you would like to deploy the project to Cloudflare. If you choose not to deploy, you can navigate to the newly created project folder to begin development. Otherwise, you'll be asked to authenticate (if not logged in already), and your project will be deployed.

## Create an R2 Bucket

Before you integrate R2 Bucket access into your project, an R2 bucket must be created:

```sh
$ wrangler r2 bucket create <YOUR_BUCKET_NAME>
```
Replace `<YOUR_BUCKET_NAME>` with the name you want to assign to your bucket. You can list your account's R2 buckets to verify that a new bucket has been added:

```sh
$ wrangler r2 bucket list
```

## Configure access to an R2 Bucket

Your new R2 bucket is ready, and next, we need to use it inside your Workers project. 

You'll do this by modifying the `wrangler.toml` configuration file to include this bucket information. Add the following lines:

```toml
[[r2_buckets]]
binding = 'MY_BUCKET' 
bucket_name = '<YOUR_BUCKET_NAME>'
```

Replace `<YOUR_BUCKET_NAME>` with the name of your R2 bucket.

Your application can now access your R2 bucket using the `MY_BUCKET` variable, and you can perform CRUD (Create, Read, Update, Delete) operations on the contents of the bucket.

## Fetch from an R2 Bucket

Our next step is to implement the functionalities for the worker to interact with the R2 bucket, i.e., fetching files from the bucket and uploading files to the bucket.

To fetch files from the R2 bucket, you can use the `BINDING.get` function. In the below example, the R2 binding is called `MY_BUCKET`. Using `.get(key)`, you can retrieve an asset based on the URL pathname as the key. In this example, the URL pathname is `/image.png`, and the asset key is `image.png`.

```ts
---
filename: index.ts
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
The code written above fetches and returns data from the R2 bucket when a GET request is made to the worker using a specific URL path.

## Upload securely to an R2 Bucket

Next, you'll add the ability to upload to your R2 bucket using authentication. To securely authenticate your upload requests, we'll use Wrangler's secret capability.

Firstly, you need to upload the secret using the Wrangler CLI:

```sh
$ wrangler secret put AUTH_SECRET
```

Here, `AUTH_SECRET` is the name of a secret value of your choice. You'll be prompted to enter the secret value right after you execute this command in your terminal.

Now, you'll add a new code path that handles a PUT HTTP request. This new code will check that the previously uploaded secret is correctly used for authentication, and then upload to R2 using `MY_BUCKET.put(key, data)`:

```ts
---
filename: index.ts
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

## Deploy your project

After completing your Cloudflare Worker project, it's now time to deploy it to Cloudflare. Make sure you're in your project directory, then run:

```sh
$ npx wrangler deploy
```
Your application is now live and accessible at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

## Conclusion and next steps

Congratulations! You've successfully created a Cloudflare Worker that allows you to interact with an R2 bucket, including uploading and downloading files. You can now use this as a starting point for your own projects.

For more inspiration, check out additional tutorials in our [tutorials section](/workers/tutorials) and explore what else you can do with [R2](/r2).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord](https://discord.gg/cloudflaredev) to connect with fellow developers and the Cloudflare team.