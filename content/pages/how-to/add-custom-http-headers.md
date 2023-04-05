---
pcx_content_type: how-to
title: Add custom HTTP headers
---

# Add custom HTTP headers

{{<Aside type="note">}}

Cloudflare provides HTTP header customization for Pages projects by adding a `_headers` file to your project. Refer to the [documentation](/pages/platform/headers/) for more information.

{{</Aside>}}

More advanced customization of HTTP headers is available through Cloudflare Workers [serverless functions](https://www.cloudflare.com/learning/serverless/what-is-serverless/).

If you have not deployed a Worker before, get started with our [tutorial](/workers/get-started/guide/). For the purpose of this tutorial, accomplish steps one (Sign up for a Workers account) through four (Generate a new project) before returning to this page.

Before continuing, ensure that your Cloudflare Pages project is connected to a [custom domain](/pages/platform/custom-domains/#add-a-custom-domain).

## Writing a Workers function

Workers functions are written in [JavaScript](https://www.cloudflare.com/learning/serverless/serverless-javascript/). When a Worker makes a request to a Cloudflare Pages application, it will receive a response. The response a Worker receives is immutable, meaning it cannot be changed. In order to add, delete, or alter headers, clone the response and modify the headers on a new `Response` instance. Return the new response to the browser with your desired header changes. An example of this is shown below:

```js
---
header: Setting custom headers with a Workers function
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // This proxies your Pages application under the condition that your Worker script is deployed on the same custom domain as your Pages project
  const response = await fetch(request);

  // Clone the response so that it is no longer immutable
  const newResponse = new Response(response.body, response);

  // Add a custom header with a value
  newResponse.headers.append('x-workers-hello', 'Hello from Cloudflare Workers');

  // Delete headers
  newResponse.headers.delete('x-header-to-delete');
  newResponse.headers.delete('x-header2-to-delete');

  // Adjust the value for an existing header
  newResponse.headers.set('x-header-to-change', 'NewValue');

  return newResponse;
}
```

## Deploying a Workers function in the dashboard

The easiest way to start deploying your Workers function is by typing [workers.new](https://workers.new/) in the browser. Log in to your account to be automatically directed to the Workers dashboard. From the Workers dashboard, write your function or use one of the [examples from the Workers documentation](/workers/examples/).

Click **Save and Deploy** when your script is ready and set a [route](/workers/platform/triggers/routes/) in your domain's zone settings.

For example, [here is a Workers script](/workers/examples/security-headers/) you can copy and paste into the Workers dashboard that sets common security headers whenever a request hits your Pages URL, such as X-XSS-Protection, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Content-Security-Policy (CSP), and more.

## Deploying a Workers function using the CLI

If you would like to skip writing this file yourself, you can use our `custom-headers-example` [template](https://github.com/codewithkristian/custom-headers-example) to generate a new Workers function with [wrangler](/workers/wrangler/install-and-update/), the Workers CLI tool.

```sh
---
header: Generating a serverless function with wrangler
---
$ git clone https://github.com/cloudflare/custom-headers-example
$ cd custom-headers-example
$ npm install
```

To operate your Workers function alongside your Pages application, deploy it to the same custom domain as your Pages application. To do this, update the `wrangler.toml` file in your project with your account and zone details:

```toml
---
filename: wrangler.toml
highlight: [4,6,7]
---
name = "custom-headers-example"

account_id = "FILL-IN-YOUR-ACCOUNT-ID"
workers_dev = false
route = "FILL-IN-YOUR-WEBSITE.com/*"
zone_id = "FILL-IN-YOUR-ZONE-ID"
```

If you do not know how to find your Account ID and Zone ID, refer to [our guide](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

Once you have configured your `wrangler.toml`, run `wrangler publish` in your terminal to deploy your Worker:

```sh
$ wrangler publish
```

After you have deployed your Worker, your desired HTTP header adjustments will take effect. While the Worker is deployed, you should continue to see the content from your Pages application as normal.
