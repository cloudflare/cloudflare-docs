---
pcx_content_type: concept
title: Playground
---

# Playground

The quickest way to experiment with Cloudflare Workers is in the [Playground](https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank). It does not require any setup. The Playground is a sandbox which gives an instant way to preview and test a Workers script directly in the browser against any site.

<p>{{<button type="primary" href="https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank">}}Launch playground{{</button>}}</p>

---

## Hello world

When you arrive in the playground, you will see this default code:

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return new Response('Hello world');
}
```

This is the least complex Worker you can write. When the Worker receives a request, the `fetch` event is dispatched. [RespondWith](/workers/runtime-apis/fetch-event/#respondwith) intercepts the event, promising to return the result of the `handleRequest` function to the client. Finally, `handleRequest` is actually called, and it returns a text [response](/workers/runtime-apis/response/) of `"Hello world"` which is delivered back to the client.

Refer to the documentation for [`addEventListener`](/workers/runtime-apis/add-event-listener/) and [`FetchEvent`](/workers/runtime-apis/fetch-event/) to learn more.

---

## Beyond hello world

To get familiar with Workers, experiment with the Playground by borrowing [Examples](/workers/examples/) from the documentation. This will allow you to experience firsthand [what Workers can do](https://www.cloudflare.com/learning/serverless/why-use-serverless/).

---

## Using the Playground

There are two versions of the Playground available: the [browser Playground](https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank) and the dashboard Playground, also known as the previewer.

To access the dashboard Playground:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. In **Overview**, select your Worker > **Quick edit**.

When you have code you are ready to test, select **Save and Deploy** to preview at the bottom of the script panel.

Now you should be able to see a preview on the right side of that exact code running just as it would in a browser. Enter your website’s address in the right section to preview the Workers script running on that site.

You can modify the script and click the preview button to view the effect on the request.

To test a raw HTTP request — not in an HTML previewer, for example, to test a `POST` request — go to **HTTP**. To run the HTTP preview, select **Run Test**.

---

## DevTools

For debugging Workers inside the Playground, use the developer tools at the bottom of the Playground's preview panel. The developer tools for the Workers Playground works similar to the developer tools in Chrome or Firefox.

### Network tab

**Network** shows the outgoing requests from your Workers script — that is, any calls to `fetch` inside your script.

### Console Logs

The console displays the output of any calls to `console.log` that were called for the current preview run as well as any other preview runs in that session.

### Sources

**Sources** displays the sources that make up your Workers script. Note that access KV, text, and secret bindings are only accessible when authenticated with an account. This means you must be logged in to the dashboard, or use `wrangler dev` with your account credentials.

<!--

## Deploy

There are two ways to preview and deploy a Workers script: on [a site on Cloudflare](/fundamentals/get-started/setup/add-site/) or on a [workers.dev](https://workers.dev/) account. If you'd like to only explore Workers capabilities, you can avoid any setup through the [playground](#playground).

### Cloudflare dashboard

To preview a script, begin by [logging in](https://www.cloudflare.com/a/login) to your Cloudflare dashboard.

After selecting an account and/or zone to deploy the Worker script to, navigate to the appropriate Workers section.

- For workers.dev:
  ![Navigate workers.dev](/workers/tooling/media/navigate-workers-dev.png)

  For a zone on Cloudflare:
  ![Navigate zone](/workers/tooling/media/navigate-zone.png)

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
