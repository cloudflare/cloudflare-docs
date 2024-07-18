---
updated: 2024-07-15
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Use R2 As static asset storage for your Pages app
products: [R2]
tags: [Hono]
---

# Use R2 as static asset storage for your Pages app

{{<tutorial-date-info>}}

This tutorial will teach you how to use [R2](/r2/) as a static asset bucket for your [Pages](/pages/) app. This is especially helpful if you're hitting the [file limit](/pages/platform/limits/#files) or the [max file size limit](/pages/platform/limits/#file-size) on Pages.

To illustrate how this is done, we will build a simple hello-world app with [Hono](https://hono.dev/), and host its static assets (such as images and JavaScript libraries) in an R2 bucket.

## Create an R2 bucket

Begin by creating an R2 bucket to store the static assets. A new bucket can be created through the dashboard or via Wrangler.

On the dashboard, navigate to the R2 tab using the side bar, click on _Create bucket_ and give your bucket a descriptive name (i.e static-assets).

![Dashboard](/images/workers/tutorials/pages-r2/dash.png)

After creating a bucket, you can drag and drop files or folders from your computer into it. In the example below, I upload the [Confetti JS library](https://www.kirilv.com/canvas-confetti/) and a folder of cat images from [Unsplash](https://unsplash.com/):

![Upload](/images/workers/tutorials/pages-r2/upload.gif)

Alternatively, an R2 bucket can be created from the command line with Wrangler by running:

```sh
$ npx wrangler r2 bucket create <bucket_name>
# i.e
# npx wrangler r2 bucket create static-assets
```

And the required files or folders can be uploaded with the command:

```sh
$ npx wrangler r2 object put <bucket_name>/<file_name> -f <path_to_file>
# i.e
# npx wrangler r2 object put static-assets/confetti.js -f ~/Downloads/confetti.js
```

## Create a Pages app

To create a Pages app with Hono, open a terminal window and run the following command. Select `cloudflare-pages` to use the Pages starter template, and then answer the prompts:

```sh
$ npm create hono@latest <app_name>
# i.e
# npm create hono@latest my-app
```

In the project folder, open `wrangler.toml` and add a binding to the R2 bucket created earlier. The `bucket_name` should be the exact name of the bucket you created in the previous section, while `binding` is a custom name to refer to the resource:

```toml
[[r2_buckets]]
binding = "STATIC_ASSETS"
bucket_name = "static-assets"
```

{{<Aside type="note">}}
Note: The keyword `ASSETS` is reserved and cannot be used as a resource binding.
{{</Aside>}}

Next, open `index.tsx` and add a type definition for the R2 bucket binding. Then, add an `assets` route to fetch and return a given asset from R2. And finally, modify the rendered HTML to return an image and a script fetched from the R2 bucket:

```ts
---
filename: index.tsx
highlight: [4-6, 8, 12-17, 21, 23-26]
---
import { Hono } from "hono";
import { renderer } from "./renderer";

type Bindings = {
  STATIC_ASSETS: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

app.get("/assets/*", async (c) => {
  const path = c.req.path.replace("/assets/", "");
  const asset = await c.env.STATIC_ASSETS.get(path);
  if (!asset) return new Response(null, { status: 404 });
  return new Response(asset.body);
});

app.get("/", (c) => {
  return c.render(
    <>
      <h1>Hello!</h1>
      <img src="/assets/images/cat1.jpg" width="300" />
      <script src="/assets/confetti.js"></script>
      <script>setTimeout(confetti, 500);</script>
    </>,
  );
});

export default app;
```

## Deploy your app

After saving `index.tsx` , open a new terminal window and run:

```sh
$ npm run deploy
```

Once deployed, your Pages app can pull and serve content from your R2 bucket.

![Deployed App](/images/workers/tutorials/pages-r2/deployed.gif)

## Related resources

- [Learn how to create public R2 buckets](/r2/buckets/public-buckets/).
- [Learn how to use R2 from Workers](/r2/api/workers/workers-api-usage/).
