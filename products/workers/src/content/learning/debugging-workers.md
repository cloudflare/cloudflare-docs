---
order: 3
pcx-content-type: concept
---

# Debugging Workers

Debugging is a critical part of developing a new application — whether running code in the initial stages of development, or trying to understand an issue occurring in production. In this article, we will walk you through how to effectively debug your Workers application, as well as provide some code samples to help you get up and running:

<YouTube id="8iPmy7ePYDE"/>

--------------------------------

## Local testing with `wrangler dev`

When you’re developing your Workers application, `wrangler dev` can significantly reduce the time it takes to testing and debugging new features. It can help you get feedback quickly while iterating, by easily exposing logs on localhost, and allows you to experiment easily without deploying to production.

To get started, run `wrangler dev` in your Workers project directory. `wrangler` will deploy your application to our preview service, and make it available for access on `localhost`:

```sh
$ wrangler dev

  Built successfully, built project size is 27 KiB.
  Using namespace for Workers Site "__app-workers_sites_assets_preview"
  Uploading site files
  Listening on http://localhost:8787

[2020-05-28 10:42:33] GET example.com/ HTTP/1.1 200 OK
[2020-05-28 10:42:35] GET example.com/static/nav-7cb303.png HTTP/1.1 200 OK
[2020-05-28 10:42:36] GET example.com/sw.js HTTP/1.1 200 OK
```

In the output above, you can begin to see log lines for the URLs being requested locally.

To help you further debug your code, `wrangler dev` also supports `console.log` statements, so you can see output from your application in your local terminal:

```js
---
filename: index.js
---
addEventListener("fetch", event => {
  console.log(`Received new request: ${event.request.url}`)
  event.respondWith(handleEvent(event))
})
```

```sh
$ wrangler dev

[2020-05-28 10:42:33] GET example.com/ HTTP/1.1 200 OK
Received new request to url: https://example.com/
```

Inserting `console.log` lines throughout your code can help you understand the state of your application in various stages until you reach the desired output.

You can customize how `wrangler dev` works to fit your needs: see [the docs](/cli-wrangler/commands#dev-alpha) for available configuration options.

<Aside type="warning">

There is a bug associated with `wrangler dev` documented in the [Known issues section](/platform/known-issues#wrangler-dev). 

</Aside>

