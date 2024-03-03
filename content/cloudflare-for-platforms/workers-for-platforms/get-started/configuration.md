---
pcx_content_type: how-to
title: Configure Workers for Platforms
weight: 1
meta:
title: Configure Workers for Platforms
---

# Configure Workers for Platforms

This guide will instruct you on setting up Workers for Platforms. You will configure a [dispatch namespace](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dispatch-namespace), a [dynamic dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dynamic-dispatch-worker) and a [user Worker](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#user-workers) to test a request end to end. This guide assumes that you already have a Cloudflare account. If you do not have a Cloudflare account, sign up before continuing.

## Prerequisite: Enable Workers for Platforms

Workers for Platforms is available for Enterprise customers only. To enable Workers for Platforms, contact your Cloudflare account team.

---

## 1. Install C3

C3 (create-cloudflare-cli) is a command-line tool designed to help you setup and deploy Workers to Cloudflare as fast as possible.

Open a terminal window and run C3 to create your Worker project called `customer-worker-1`:

```sh
$ npm create cloudflare@latest customer-worker-1 -- --type=hello-world
```

When setting up your `customer-worker-1` Worker, answer the questions as below:

- Select `no` to using TypeScript.
- Select `no` to using Git for version control.
- Select `no` to deploying.

## 2. Create dispatch namespace
## 2. Create a dispatch namespace

Create a [dispatch namespace](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dispatch-namespace). A dispatch namespace is made up of a collection of [user Workers](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#user-workers). User Workers are Workers that your end users (end developers) create.

To create a dispatch namespace, run:

```sh
$ npx wrangler dispatch-namespace create <NAMESPACE_NAME>
```

## 3. Upload a user Worker to the dispatch namespace

To upload a user Worker to the dispatch namespace, deploy your application to the dispatch namespace by running the following command:

```sh
$ npx wrangler deploy --dispatch-namespace <NAMESPACE_NAME>
```

## 4. Create a dispatch Worker

[User Workers](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#user-workers) are written by end developers. End developers can deploy user Workers to script automated actions, create integrations or modify response payload to return custom content.

You will now give your dispatch Worker the logic it needs to route to the user Worker created in step 2.

Create your dispatch Worker:

```sh
$ npx wrangler init my-dispatcher
```

When setting up your `my-dispatcher` Worker, answer the questions as below:

- Choose `"Hello World" Worker` as the type of application.
- Select `no` to using TypeScript.
- Select `no` to using Git for version control.
- Select `no` to deploying.

Change to your project's directory:

```sh
$ cd my-dispatcher
```

Open the `wrangler.toml` file in your project directory, and add the dispatch namespace binding:

```toml
---
filename: wrangler.toml
---

[[dispatch_namespace]]
binding = "dispatcher"
namespace = "<NAMESPACE_NAME>"
```

Add the followinng to the index.js file:

```js
---
filename: index.js
---
export default {
  async fetch(req, env) {
    const worker = env.dispatcher.get("customer-worker-1");
    return await worker.fetch(req);
  },
};
```

Do the following to define a simple metadata file for the user Worker:

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

For more information on the `metadata.json` refer to [Metadata configuration](/cloudflare-for-platforms/workers-for-platforms/reference/metadata/).

{{</Aside>}}

## 5. Test a request

You will now send a request to the route your dynamic dispatch Worker is on.

Open your terminal and run the following command to test your dynamic dispatch Worker:

```sh
$ npx wrangler deploy
```

You should receive the response (`Hello world`) you created in your user Worker (`customer-worker-1`) that you call from your dynamic dispatch Worker (the Worker you made in step 3).

Preview your Workers for Platforms project at `https://my-dispatcher.<YOUR_WORKER_SUBDOMAIN>.workers.dev/`.

{{<Aside type="note" header="Dynamic dispatch Workers versus user Workers">}}

In the Cloudflare dashboard, dynamic dispatch Workers are found in **Workers**. User Workers can be found in **Workers for Platforms**.

{{</Aside>}}

By completing this guide, you have successfully set up a dispatch namespace, dynamic dispatch Worker and user Worker to test a request end to end.
