---
pcx_content_type: get-started
title: Get started
weight: 1
---

# Get started

This guide will instruct you on creating and deploying a Pages Function.

## Prerequisites 

You must have a Pages project set up on your local machine or deployed on the Cloudflare dashboard. To create a Pages project, refer to [Get started](/pages/get-started/).

## Create a Function

To get started with generating a Pages Function, create a `/functions` directory at the root of your Pages project.

{{<Aside type="note" header="Advanced mode">}}

For existing applications where Pages Functions’ built-in file path based routing and middleware system is not desirable, use [Advanced mode](/pages/platform/functions/advanced-mode/). Advanced mode allows you to develop your Pages Functions with a `_workers.js` file rather than the `/functions` directory.

{{</Aside>}}

Writing your Functions files in the `/functions` directory will automatically generate a Worker with custom functionality at predesignated routes.

Copy and paste the following code into a `helloworld.js` file that you create in your `/functions` folder:

```js
---
filename: helloworld.js
---
export function onRequest(context) {
  return new Response("Hello, world!")
}
```

In the above example code, the `onRequest` handler takes a request [`context`](/pages/platform/functions/api-reference/#eventcontext) object. The handler must return a `Response` or a `Promise` of a `Response`.

This Function will run on the `/helloworld` route and returns `"Hello, world!"`. The reason this Function is available on this route is because the file is named `helloworld.js`. Similarly, if this file was called `howdyworld.js`, this function would run on `/howdyworld`.

Refer to [Routing](/pages/platform/functions/routing/) for more information on route customization.

### Runtime Features

Workers runtime features, including compatibility with a subset of Node.js APIs, setting a [compatibility date or compatibility flag](/workers/platform/compatibility-dates/). With Pages Functions, you can configure these by passing an argument to your [Wrangler](/workers/wrangler/commands/#dev-1) command or by setting them in the dashboard. (Project Settings > Functions > Compatibility Flags)

Additionally, you can use other Cloudflare products from within your Pages project by configuring [bindings](/pages/platform/functions/bindings/). 

## Deploy your Function

After you have set up your Function, deploy your Pages project. Deploy your project by:

* Connecting your [Git provider](/pages/get-started/#connecting-your-git-provider-to-pages).
* Using [Direct Uploads](/pages/platform/direct-upload/) from the Cloudflare dashboard.
* Using [Wrangler](/workers/wrangler/commands/#pages) from the command line.

## Related resources

- Customize your [Function's routing](/pages/platform/functions/routing/)
- Review the [API reference](/pages/platform/functions/api-reference/)
- Learn how to [debug your Function](/pages/platform/functions/debugging-and-logging/)
