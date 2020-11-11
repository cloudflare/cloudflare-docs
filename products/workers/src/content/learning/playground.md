---
order: 1
---

# Playground

The quickest way to experiment with Cloudflare Workers is in the [Playground](https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank). It doesn’t require _any_ setup. It’s just a simple, instant way to preview and test a Workers script directly in the browser against any site.

<p><Button type="primary" href="https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank">Launch playground</Button></p>

--------------------------------

## Hello world

When you arrive in the playground, you’ll see this default code:

```javascript
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response("Hello world")
}
```

It’s essentially the simplest Worker script you can write.

Essentially what’s going on here is that when the Worker receives a request, `handleRequest` is called, and it responds with a text [response](/runtime-apis/response) of `"Hello world"`.

Check out the reference for [addEventListener](/runtime-apis/add-event-listener) and [FetchEvent](/runtime-apis/fetch-event) to learn more.

--------------------------------

## Beyond hello world

To get familiar with Workers, we recommend playing around in the Playground, borrowing bits from [Examples](/examples) section of the documentation. This will give you a taste of what Workers can do. It’s pretty amazing.

--------------------------------

## Using the playground

When you have code you are ready to test, click the button to preview at the bottom of the script panel.

Now you should be able to see a preview on the right side of _that exact code_ running just as it would in a browser. Enter your website’s address in the right section to preview the Workers script running _on that site_.

You can modify the script and click the preview button to view the effect on the request.

To test a raw HTTP request — not in an HTML previewer, for example to test a `POST` request — go to the **Test** tab in the previewer. To run the HTTP preview, we will need to click update preview and run test.

--------------------------------

## Devtools

For debugging Workers inside the playground, use out the developer tools at the bottom of the preview panel. The developer tools for Workers previewer works similar to the developer tools in Chrome or Firefox.

### Network tab

The Network tab shows the outgoing requests from your Workers script—in other words, any calls to `fetch` inside your script.

### Console Logs

The console displays the output of any calls to `console.log` that were called for the current preview run as well as any other preview runs in that session.

### Sources

The sources that make up your Workers script. Note that access KV, text, and secret bindings are only accessible when authenticated with an account. This means you must be logged in to the dashboard, or use `wrangler preview` with your account credentials.

<!--

## Deploy

There are two ways to preview and deploy a Workers script: on [a site on Cloudflare](https://support.cloudflare.com/hc/en-us/articles/201720164) or on a [workers.dev](https://workers.dev/) account. If you'd like to only explore Workers capabilities, you can avoid any setup through the [playground](#playground).

### Cloudflare Dashboard

To preview a script, begin by [logging in](https://www.cloudflare.com/a/login) to your Cloudflare dashboard.

After selecting an account and/or zone to deploy the Worker script to, navigate to the appropriate Workers section.

- For workers.dev:
  ![Navigate workers.dev](https://developers.cloudflare.com/workers/tooling/media/navigate-workers-dev.png)

  For a zone on Cloudflare:
  ![Navigate zone](https://developers.cloudflare.com/workers/tooling/media/navigate-zone.png)

You will see options to edit existing Workers scripts or create new scripts.

To make your Workers script live, click "Save and Deploy".

## How the Preview Tool Works

The previewer tool works by spinning up a mock instance of the [V8 engine](/reference/runtime) outside of Cloudflare's network. Workers created in the Playground are only for experimentation and don’t run on all of Cloudflare’s infrastructure around the world.

### Key Differences from Production

While the preview tool is powerful in development, the tool must run as a mock proxy service so there are some inherent limitations.

The key differences of the previewer versus a live Workers script are:

- Subrequests ( i.e. fetches inside your Workers script) that call the same hostname as the original request will run in the previewer as an external request (i.e. goes back to the front line of Cloudflare), as those subrequests in production will go directly to the origin.
-  `fetch` can only connect to IPv4 addresses in the playground thus, IPv6-only hosts are not supported.
- The output of `console.log` acts as a no-op in production.
- Not all [APIs](/reference/runtime/apis) are available in the previewer that are in production. Cloudflare Edge dependent features particularly (e.g. [Cache API](/reference/apis/cache)) will _not_ work in the previewer.
- If the tested zone has Cloudflare security features set that would block our preview service, such as "Block by country", then one would receive an error message `Sorry, you've been blocked`. To work around this, use the [fiddle service](https://cloudflareworkers.com), or whitelist [Google Cloud IPs](http://ueen.net/google_cloud_ip.txt)\* to preview scripts.

\* Note whitelisting Google IPs may allow other Cloudflare users with same IPs to make requests to your site and bypass security measures.

-->
