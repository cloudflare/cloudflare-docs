---
pcx_content_type: how-to
title: Configure Workers for Platforms
weight: 1
meta:
title: Configure Workers for Platforms
---

# Configure Workers for Platforms

This guide will instruct you on setting up Workers for Platforms. You will configure a [dispatch namespace](/cloudflare-for-platforms/workers-for-platforms/learning/how-workers-for-platforms-works/#dispatch-namespace), a [dynamic dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/learning/how-workers-for-platforms-works/#dynamic-dispatch-worker) and a [user Worker](/cloudflare-for-platforms/workers-for-platforms/learning/how-workers-for-platforms-works/#user-workers) to test a request end to end. This guide assumes that you already have a Cloudflare account. If you do not have a Cloudflare account, sign up before continuing.

## Prerequisite: Enable Workers for Platforms

Workers for Platforms is available for Enterprise customers only. To enable Workers for Platforms, contact your Cloudflare account team.

---

## 1. Create a new project with C3

C3 (create-cloudflare-cli) is a command-line tool designed to help you setup and deploy Workers to Cloudflare as fast as possible.

Open a terminal window and run C3 to create your Worker project:

{{<tabs labels="npm | yarn | pnpm">}}
{{<tab label="npm" default="true">}}

```sh
$ npm create cloudflare@latest <project name> -- --type=hello-world
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn create cloudflare@latest <project name> --type=hello-world
```

{{</tab>}}
{{<tab label="pnpm">}}

```sh
$ pnpm create cloudflare@latest <project name> --type=hello-world
```
{{</tab>}}
{{</tabs>}}

For this guide, set up a basic Worker:

1. Name your new Worker directory by specifying where you want to create your application.
2. Select `"Hello World" script` as the type of application you want to create.
3. Answer `yes` to using TypeScript.

## 2. Create dispatch namespace 

Create a [dispatch namespace](/cloudflare-for-platforms/workers-for-platforms/learning/how-workers-for-platforms-works/#dispatch-namespace). A dispatch namespace is made up of a collection of user Workers. User Workers are Workers that your end users (end developers) create.

To create a dispatch namespace, run:

```sh
$ wrangler dispatch-namespace create <NAMESPACE_NAME>
```

## 3. Create a dynamic dispatch Worker

A [dynamic dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/learning/how-workers-for-platforms-works/#dynamic-dispatch-worker) calls user Workers from the dispatch namespace and executes them.

To create a dynamic dispatch Worker, create a [binding](/workers/configuration/bindings/). Open the [`wrangler.toml`](/workers/wrangler/configuration/) file in your project directory and add the following code block. Your `binding` is set by you (in the following code block, `dispatcher`). Add the `namespace` value by inputting the name of the dispatch namespace you created in step 2:

```toml
---
filename: wrangler.toml
---
[[dispatch_namespaces]]
binding = "dispatcher"
namespace = "<NAMESPACE_NAME>"
```

Next, give your dynamic dispatch Worker the logic it needs to manage user Workers. Open your `index.ts` file and add the following code block:

* `dispatcher` is the binding you created earlier in this step.
* `customer-worker-1` is a script you will upload to the dispatch namespace in the next step.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
filename: index.js
---
export default {
  async fetch(req, env) {
    const worker = env.dispatcher.get("customer-worker-1");
    return await worker.fetch(req);
  }
}
```
{{</tab>}}
{{<tab label="ts">}}

```ts
export interface Env {
    // Example binding to dispatch namespace.
    dispatcher: DispatchNamespace
}

export default {
    async fetch(
        request: Request,
        env: Env
    ): Promise<Response> {
    const worker: Fetcher = env.dispatcher.get("customer-worker-1");
    return await worker.fetch(req);
    },
};
```
{{</tab>}}
{{</tabs>}}

Deploy your project once you have created your dynamic dispatch Worker:

```sh
$ npx wrangler deploy
```

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

Refer to [Create a dynamic dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/get-started/dynamic-dispatch/) for more configuration information.

## 4. Upload user Workers to a namespace

[User Workers](/cloudflare-for-platforms/workers-for-platforms/learning/how-workers-for-platforms-works/#user-workers) are written by end developers. End developers can deploy user Workers to script automated actions, create integrations or modify response payload to return custom content.

You will now upload `customer-worker-1` into your dispatch namespace that you created in step 2. This user Worker has a simple `fetch()` handler that sends a `Hello world` response.

In your project directory, create a `main.js` file, and add the following code:

```js
---
filename: main.js
---
export default {
  fetch(request) {
    return new Response('Hello World');
  },
};
```

In your project directory, create a `metadata.json` file, and define a simple metadata file for the user Worker:

```js
---
filename: metadata.json
---
{
    "main_module": "main.js"
}
```

You will use the Cloudflare API to upload the user Worker. This will upload the user Worker to a dispatch namespace. User Workers must be uploaded via the Cloudflare API as Wrangler does not support this operation. Workers uploaded this way will appear in Account Home > your account > **Workers for Platforms** > your namespace.

Update the necessary fields and run the following command:

1. Add your Cloudflare account email to the value of the `X-Auth-Email` header.
2. Find your `<AUTH_KEY>` by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com) > user icon > **My Profile** > **API Tokens** > **Global API Key** > **View**. 
3. Add your Cloudflare account ID found in your site's **Overview**.
4. Add the namespace name you created in step 2 to `<NAMESPACE_NAME>`.
5. Add the script name `customer-worker-1` to `<SCRIPT_NAME>`.

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/customer-worker-1" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <AUTH_KEY>" \
-H "Content-Type: multipart/form-data" \
-F 'main_js=@main.js;type=application/javascript+module' -F 'metadata=@metadata.json;type=application/json'
```

If you prefer to use an API token, remove the `X-Auth-Key` and `X-Auth-Email` headers. Create an [API token](/fundamentals/api/get-started/create-token/) with **Workers Edit** permission. Select **Account**, **Workers Script**, and **Edit**. Then, add the token to the `"Authorization: Bearer <API_TOKEN>"` header. 


```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/customer-worker-1" \
-H "Authorization: Bearer <BEARER_TOKEN>" \
-H "Content-Type: multipart/form-data" \
-F 'main_js=@main.js;type=application/javascript+module' -F 'metadata=@metadata.json;type=application/json'
```

{{<Aside type="note">}}

For more information on the `metadata.json` refer to [Metadata configuration](/cloudflare-for-platforms/workers-for-platforms/platform/metadata/).

{{</Aside>}}

## 5. Test a request

You will now send a request to the route your dynamic dispatch Worker is on. You should receive the response (`Hello world`) you created in your user Worker (`customer-worker-1`) that you call from your dynamic dispatch Worker (the Worker you made in step 3).

To test your user Worker:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, go to your dynamic dispatch Worker.
4. In the dynamic dispatch Worker, go to the link under **Preview**.

{{<Aside type="note" header="Dynamic dispatch Workers versus user Workers">}}

In the Cloudflare dashboard, dynamic dispatch Workers are found in **Workers**. User Workers can be found in **Workers for Platforms**.

{{</Aside>}}

By completing this guide, you have successfully set up a dispatch namespace, dynamic dispatch Worker and user Worker to test a request end to end.