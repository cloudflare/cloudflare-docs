---
pcx-content-type: how-to
---

# Add Custom HTTP Headers

Cloudflare provides HTTP header customization for Pages projects through Cloudflare Workers serverless functions. You may want to add, remove or alter HTTP headers for security or performance reasons. 

Link to Workers getting started guide. / If you haven't worked with Workers before, you can get started here. 

<Aside>

In order to update your headers with Cloudflare Workers serverless functions, your Cloudflare Pages project needs to be deployed to a custom domain(link on instructions). 

</Aside>

## Writing a serverless function 

Workers functions are written in JavaScript. When a Worker makes a request to a Cloudflare Pages application, it will receive a response. The response a Worker receives is immutable, meaning it cannot be changed. In order to add, delete or alter headers, you can clone the response and modify the headers on the new response. Return the new response to the browser with your desired header changes: 

```js
---
header: Setting custom headers with a Workers function
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  const headers = new Headers(response.headers)

  // Add a header
  headers.append("x-workers-hello", "Hello from Cloudflare Workers")

  // Delete headers
  headers.delete("x-header-to-delete")
  headers.delete("x-header2-to-delete")

  // Change a header
  headers.set("x-header-to-change", "NewValue")

  const newResponse = new Response(response.body, {
    ...response,
    headers
  })

  return newResponse
}
```

## Deploying a function

If you want to deploy a serverless function to add custom headers to your custom Pages application, you can use our `custom-header-example` [template](https://github.com/signalnerve/custom-headers-example) to generate a new Workers function with [wrangler](), the Workers CLI tool. 

```sh 
---
header: Generating a serverless function with wrangler
---
$ wrangler generate projectname https://github.com/cloudflare/custom-headers-example
```

You Workers function should be deployed to the same custom domain as your Pages application. To do this, update the wrangler.toml file in your project with your account and zone details: 

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

If you don't know how to find your account and zone ID, refer to [our guide.](https://developers.cloudflare.com/workers/get-started/guide#7-configure-your-project-for-deployment)

Once you've configured your wrangler.toml, you can publish your code using `wrangler publish`:

```sh
$ wrangler publish
``` 
