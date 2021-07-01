---
pcx-content-type: how-to
---

# Add custom HTTP headers

Cloudflare provides HTTP header customization for Pages projects through Cloudflare Workers [serverless functions](https://www.cloudflare.com/learning/serverless/what-is-serverless/). You may want to add, remove, or alter HTTP headers for security or performance reasons. 

If you have not deployed a Worker before, get started with our [tutorial](https://developers.cloudflare.com/workers/get-started/guide). For the purpose of this tutorial, accomplish steps one ("Sign up for a Workers account") through four ("Generate a new project") before returning to this page. 

Before continuing, ensure that your Cloudflare Pages project is connected to a [custom domain](https://developers.cloudflare.com/pages/getting-started#adding-a-custom-domain). 

## Writing a Workers function

Workers functions are written in [JavaScript](https://www.cloudflare.com/learning/serverless/serverless-javascript/). When a Worker makes a request to a Cloudflare Pages application, it will receive a response. The response a Worker receives is immutable, meaning it cannot be changed. In order to add, delete, or alter headers, clone the response and modify the headers on a new `Response` instance. Return the new response to the browser with your desired header changes. An example of this is shown below: 

```js
---
header: Setting custom headers with a Workers function
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  
  // Clone the response so that it's no longer immutable
  const newResponse = new Response(response.body, response)

  // Add a custom header with a value
  newResponse.headers.append("x-workers-hello", "Hello from Cloudflare Workers")

  // Delete headers
  newResponse.headers.delete("x-header-to-delete")
  newResponse.headers.delete("x-header2-to-delete")

  // Adjust the value for an existing header
  newResponse.headers.set("x-header-to-change", "NewValue")

  return newResponse
}
```

<Aside>

If you would like to skip writing this file yourself, you can use our `custom-headers-example` [template](https://github.com/signalnerve/custom-headers-example) to generate a new Workers function with [wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update), the Workers CLI tool. 

```sh 
---
header: Generating a serverless function with wrangler
---
$ wrangler generate projectname https://github.com/cloudflare/custom-headers-example
```

</Aside>

## Deploying a Workers function

To operate your Workers function alongside your Pages application, deploy it to the same custom domain as your Pages application. To do this, update the `wrangler.toml` file in your project with your account and zone details: 

```toml
---
filename: wrangler.toml
highlight: [4,6,7]
---
name = "custom-headers-example"
type = "javascript"

account_id = "FILL-IN-YOUR-ACCOUNT-ID"
workers_dev = false
route = "FILL-IN-YOUR-WEBSITE.com/*"
zone_id = "FILL-IN-YOUR-ZONE-ID"
```

If you do not know how to find your Account ID and Zone ID, refer to [our guide](https://developers.cloudflare.com/workers/get-started/guide#7-configure-your-project-for-deployment).

Once you have configured your `wrangler.toml`, run `wrangler publish` in your terminal to deploy your Worker:

```sh
$ wrangler publish
``` 

After you have deployed your Worker, your desired HTTP header adjustments will take effect. While the Worker is deployed, you should continue to see the content from your Pages application as normal. 
