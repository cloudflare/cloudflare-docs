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

## Deploying a Workers function in the UI

The easiest way to start deploying your Workers function is typing [workers.new](https://workers.new/) in the browser. You'll sign-in to your account and automatically be directed to the Workers UI. There you can write your function or use one of the [examples](https://developers.cloudflare.com/workers/examples/) from the Workers docs. 

Click "Save and Deploy" when it's ready and set a [route](https://developers.cloudflare.com/workers/platform/routes/) in your domain's zone settings.

For example, here is a Workers script you can copy/paste into the UI that sets common security headers whenever a request hits your Pages URL. 

```js
---
header: Setting security headers for your Pages project with a Workers function 
---
const DEFAULT_SECURITY_HEADERS = {
    /*
    Secure your application with Content-Security-Policy headers.
    To avoid introducing breaking changes, these headers are not automatically set. 
    Read more here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
    */
    /*
    You can also set Strict-Transport-Security headers. 
    These are not automatically set because your website might get added to Chrome's HSTS preload list.
    Here's the code if you want to apply it:
    "Strict-Transport-Security" : "max-age=63072000; includeSubDomains; preload",
    */
    /*
    X-XSS-Protection header prevents a page from loading if an XSS attack is detected. 
    Read more here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
    */
    "X-XSS-Protection": "1; mode=block",
    /*
    X-Frame-Options header prevents click-jacking attacks. 
    Read more here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
    */
    "X-Frame-Options": "DENY",
    /*
    X-Content-Type-Options header prevents MIME-sniffing. 
    Read more here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
    */
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    'Cross-Origin-Embedder-Policy': 'require-corp; report-to="default";',
    'Cross-Origin-Opener-Policy': 'same-site; report-to="default";',
    "Cross-Origin-Resource-Policy": "same-site",
}
const BLOCKED_HEADERS = [
    "Public-Key-Pins",
    "X-Powered-By",
    "X-AspNet-Version",
]
addEventListener('fetch', event => {
    event.respondWith(addHeaders(event.request))
})
async function addHeaders(req) {
    let response = await fetch(req)
    let newHeaders = new Headers(response.headers)

    const tlsVersion = req.cf.tlsVersion
    // This sets the headers for HTML responses: 
    if (newHeaders.has("Content-Type") && !newHeaders.get("Content-Type").includes("text/html")) {
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        })
    }

    Object.keys(DEFAULT_SECURITY_HEADERS).map(function (name) {
        newHeaders.set(name, DEFAULT_SECURITY_HEADERS[name]);
    })

    BLOCKED_HEADERS.forEach(function (name) {
        newHeaders.delete(name)
    })

    if (tlsVersion != "TLSv1.2" && tlsVersion != "TLSv1.3") {
        return new Response("You need to use TLS version 1.2 or higher.", { status: 400 })
    } else {
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        })
    }
}
```

## Deploying a Workers function using the CLI

If you would like to skip writing this file yourself, you can use our `custom-headers-example` [template](https://github.com/signalnerve/custom-headers-example) to generate a new Workers function with [wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update), the Workers CLI tool. 

```sh 
---
header: Generating a serverless function with wrangler
---
$ wrangler generate projectname https://github.com/cloudflare/custom-headers-example
```
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