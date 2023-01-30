---
pcx-content-type: get-started
title: Get started
weight: 1
---

# Get started

This guide will instruct you on creating and deploying a Pages Function.

## Prerequisites 

You must have a Pages project set up on your local machine or deployed on the Cloudflare dashboard. To create a Pages project, refer to [Get started](/pages/get-started/).

## Create a Function

Create a `/functions` directory at the root of your Pages project. 

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

## Deploy your Function

After you have set up your Function, deploy your Pages project. Deploy your project by:

* Connecting your [Git provider](/pages/get-started/#connecting-your-git-provider-to-pages).
* Using [Direct Uploads](/pages/platform/direct-upload/) from the Cloudflare dashboard.
* Using [Wrangler](/workers/wrangler/commands/#pages) from the command line.

## Related resources

- Customize your [Function's routing](/pages/platform/functions/routing/)
- Review the [API reference](/pages/platform/functions/api-reference/)
- Learn how to [debug your Function](/pages/platform/functions/debugging-and-logging/)