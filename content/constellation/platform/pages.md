---
pcx_content_type: configuration
title: Pages
weight: 30
---

# Cloudflare Pages Support

You can use Constellation with [Cloudflare Pages](https://developers.cloudflare.com/pages/) and [Pages Functions](https://developers.cloudflare.com/pages/platform/functions/).

## Bindings

A [binding](https://developers.cloudflare.com/pages/platform/functions/bindings/) enables your Pages Functions to interact with resources on the Cloudflare developer platform. Before you use Constellation with Cloudflare Pages, you have to setup the bindings to your Constellation projects.

Before you configure your bindings, you need to create your projects and upload your models using [Wrangler](/constellation/platform/wrangler/).

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project > **Settings** > **Functions** > **Constellation bindings** > **Add binding**.
4. Choose whether you would like to set up the binding in your **Production** or **Preview** environment.
5. Give your binding a name under **Variable name**.
6. Select your Constellation project. You must repeat steps 5 and 6 for both the **Production** and **Preview** environments.
7. Redeploy your project for the binding to take effect.

![The bindings interface](/images/constellation/pages.png)

## Function example

You can now use Constellation from [Pages Functions](https://developers.cloudflare.com/pages/platform/functions/) as you would normally use from [Cloudflare Worker](/constellation/get-started/first-constellation-worker/).

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
import { Tensor, InferenceSession, TensorType } from "@cloudflare/constellation";

export async function onRequest(context) {

  const session = new InferenceSession(
    context.env.PETALS_CLASSIFIER,
    "939ac893-5e55-32c0-0223-929edb231929"
  );

  let payload: any = await context.request.json();

  const tensorInput = new Tensor(
      TensorType.Float32,
      Array.prototype.concat(...payload.data),
      { shape: [payload.batch_size, payload.feature_size] }
  );

  const output = await session.run([tensorInput]);

  return new Response(output);
}
```
{{</tab>}}
{{<tab label="ts">}}
```ts
import { Tensor, InferenceSession, TensorType } from "@cloudflare/constellation";

interface Env {
  PETALS_CLASSIFIER: any;
}

export const onRequest: PagesFunction<Env> = async (context) => {

  const session = new InferenceSession(
    context.env.PETALS_CLASSIFIER,
    "939ac893-5e55-32c0-0223-929edb231929"
  );

  let payload: any = await context.request.json();

  const tensorInput = new Tensor(
      TensorType.Float32,
      Array.prototype.concat(...payload.data),
      { shape: [payload.batch_size, payload.feature_size] }
  );

  const output = await session.run([tensorInput]);

  return new Response(output);
}
```
{{</tab>}}
{{</tabs>}}
