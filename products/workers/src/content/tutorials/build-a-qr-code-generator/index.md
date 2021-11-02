---
updated: 2020-03-09
difficulty: Beginner
content_type: "📝 Tutorial"
pcx-content-type: tutorial
---

import TutorialsBeforeYouStart from "../../_partials/_tutorials-before-you-start.md"

# Build a QR code generator

<TutorialsBeforeYouStart/>

## Overview

In this tutorial, you will build and publish a serverless function that generates QR codes, using Cloudflare Workers.

This guide will teach you how to build and publish serverless functions. This guide does not assume prior experience with serverless functions or Cloudflare Workers.

If you would like to skip straight to the code, the final version of the codebase is [available on GitHub](https://github.com/signalnerve/workers-qr-code-generator). You can take the code provided in the example repository, customize it, and deploy it for use in your own projects.

## Generate

Cloudflare’s command-line tool for managing Worker projects, [Wrangler](https://github.com/cloudflare/wrangler), supports various templates — pre-built collections of code that make it easy to get started writing Workers. You will make use of the default JavaScript template to start building your project.

In the command line, run the `wrangler generate` command to create your Worker project using Wrangler’s [worker-template](https://github.com/cloudflare/worker-template). Pass the project name “qr-code-generator”:

```sh
---
header: Generating a new project with Wrangler
---
$ wrangler generate qr-code-generator
$ cd qr-code-generator
```

Wrangler templates are Git repositories. If you want to create your own templates, or use one from the [Template Gallery](/examples), there is a variety of options to help you get started.

Cloudflare’s `worker-template` includes support for building and deploying JavaScript-based projects. Inside of your new `qr-code-generator` directory, `index.js` represents the entry point to your Cloudflare Workers application.

All Cloudflare Workers applications start by listening for `fetch` events, which are triggered when a client makes a request to a Workers route. After a request is received by the Worker, the response your application constructs will be returned to the user. This tutorial will guide you through understanding how the request/response pattern works and how you can use it to build fully-featured applications.

```js
---
filename: "index.js"
---
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
function handleRequest(request) {
  return new Response("Hello worker!")
}
```

In your default `index.js` file, you can see that request/response pattern in action. The `handleRequest` constructs a new `Response` with the body text “Hello worker”, as well as an explicit `200` status code. 

When a Worker receives a `fetch` event, the script must use `event.respondWith` to return the newly constructed response to the client. Your Cloudflare Worker script will serve new responses directly from [Cloudflare's edge network](https://www.cloudflare.com/network) instead of continuing to your origin server. A standard server would accept requests and return responses. Cloudflare Workers allows you to respond quickly by constructing responses directly on the Cloudflare edge network.

## Build

Any project you publish to Cloudflare Workers can make use of modern JavaScript tooling like ES modules, NPM packages, and [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) functions to build your application. In addition to writing serverless functions, you can use Workers to [build full applications](/tutorials/build-a-slackbot) using the same tooling and process as in this tutorial.

The QR code generator you will build in this tutorial will be a serverless function that runs on a single route and receives requests. Each request will contain a text message (a URL, for example), which the function will encode into a QR code. The function will then respond with the QR code in PNG image format.

### Handling requests

At this point in the tutorial, your Worker function can receive requests and return a simple response with the text “Hello worker!”. To handle data coming in to your serverless function, check if the incoming request is a `POST`:

```js
---
filename: "index.js"
highlight: [2, 3, 4]
---
function handleRequest(request) {
  if (request.method === "POST") {
    return new Response("Hello worker!")
  }
}
```

Currently, if an incoming request is not a `POST`, the function will return `undefined`. However, a Worker always needs to return a `Response`. Since the function should only accept incoming `POST` requests, return a new `Response` with a [`405` status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405) if the incoming request is not a `POST`:

```js
---
filename: "index.js"
highlight: [5]
---
function handleRequest(request) {
  if (request.method === "POST") {
    return new Response("Hello worker!")
  }
  return new Response("Expected POST", { status: 405 })
}
```

At this point, you have established the basic flow of `handleRequest`. You will now set up a response to incoming valid requests. If a `POST` request comes in, the function should generate a QR code. To start, move the “Hello worker!” response into a new function, `generate`, which will ultimately contain the bulk of our function’s logic:

```js
---
filename: "index.js"
highlight: [1, 2, 3]
---
async function generate(request) {
  // TODO: Include QR code generation
  return new Response("Hello worker!")
}

async function handleRequest(request) {
  // ...
}
```

With the `generate` function filled out, you can call it within `handleRequest` and return its result directly to the client:

```js
---
filename: "index.js"
highlight: [4]
---
function handleRequest(request) {
  // ...
  if (request.method === "POST") {
    return generate(request)
  // ...
}
```

### Building a QR Code

All projects deployed to Cloudflare Workers support NPM packages. This support makes it easy to rapidly build out functionality in your serverless functions. The [`qr-image`](https://github.com/alexeyten/qr-image) package is a great way to take text and encode it into a QR code. The package supports generating the QR codes in a number of file formats (such as PNG, the default, and SVG), and configuring other aspects of the generated QR code. In the command line, install and save `qr-image` to your project’s `package.json`:

```sh
---
header: Installing the qr-image package
---
$ npm install --save qr-image
```

To use the `qr-image` package, configure the `type` to `"webpack"`. This instructs Wrangler to use [Webpack](/cli-wrangler/webpack) to package your project for deployment. (Learn more about [`type` configuration](/cli-wrangler/configuration).)

```toml
---
filename: wrangler.toml
highlight: [3]
---
name = "qr-code-generator"
account_id = "$yourAccountId"
type = "webpack"
```

In `index.js`, require the `qr-image` package as the variable `qr`. In the `generate` function, parse the incoming request as JSON, using `request.json`, and use the `text` to generate a QR code using `qr.imageSync`:

```js
---
filename: "index.js"
highlight: [1, 2, 3, 4, 5, 6]
---
const qr = require("qr-image")

async function generate(request) {
  const { text } = await request.json()
  const qr_png = qr.imageSync(text || "https://workers.dev")
}
```

By default, the QR code is generated as a PNG. Construct a new instance of `Response`, passing in the PNG data as the body, and a `Content-Type` header of `image/png` — this will allow browsers to properly parse the data coming back from your serverless function as an image:

```js
---
filename: "index.js"
highlight: [3, 5]
---
async function generate(request) {
  const { text } = await request.json()
  const headers = { "Content-Type": "image/png" }
  const qr_png = qr.imageSync(text || "https://workers.dev")
  return new Response(qr_png, { headers })
}
```

### Testing in an application UI

The serverless function will work if a user sends a `POST` request to a route, but it would be great to also be able to test the function with a proper interface. At this point in the tutorial, if any request is received by your function that is not a `POST`, a `405` response is returned. The new version of `handleRequest` should return a new `Response` with a static HTML document instead of the `405` error:

```js
---
filename: "index.js"
highlight: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 22]
---
const landing = `
<h1>QR Generator</h1>
<p>Click the below button to generate a new QR code. This will make a request to your serverless function.</p>
<input type="text" id="text" value="https://workers.dev"></input>
<button onclick="generate()">Generate QR Code</button>
<p>Check the "Network" tab in your browser’s developer tools to see the generated QR code.</p>
<script>
  function generate() {
    fetch(window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: document.querySelector("#text").value })
    })
  }
</script>
`

function handleRequest(request) {
  if (request.method === "POST") {
    return generate(request)
  }
  return new Response(landing, {
    headers: {
      "Content-Type": "text/html"
    }
  })
}
```

The `landing` variable, which is a static HTML string, sets up an `input` tag and a corresponding `button`, which calls the `generate` function. This function will make an HTTP `POST` request back to your serverless function, allowing you to see the corresponding QR code image data inside of your browser’s network inspector.

With the above steps complete, your serverless function is ready. The full version of the code looks like this:

```js
---
filename: "index.js"
---
const qr = require("qr-image")

async function generate(request) {
  const { text } = await request.json()
  const headers = { "Content-Type": "image/png" }
  const qr_png = qr.imageSync(text || "https://workers.dev")
  return new Response(qr_png, { headers })
}

const landing = `
<h1>QR Generator</h1>
<p>Click the below button to generate a new QR code. This will make a request to your serverless function.</p>
<input type="text" id="text" value="https://workers.dev"></input>
<button onclick="generate()">Generate QR Code</button>
<p>Check the "Network" tab in your browser’s developer tools to see the generated QR code.</p>
<script>
  function generate() {
    fetch(window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: document.querySelector("#text").value })
    })
  }
</script>
`

function handleRequest(request) {
  if (request.method === "POST") {
    return generate(request)
  }
  return new Response(landing, {
    headers: {
      "Content-Type": "text/html"
    }
  })
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
```

## Publish

With all the above steps complete, you have written the code for a QR code serverless function on Cloudflare Workers.

Wrangler has built-in support for bundling, uploading, and releasing your Cloudflare Workers application. To do this, run `wrangler publish`, which will build and publish your code.

```sh
---
header: Publishing your project
---
$ wrangler publish
```

## Resources

In this tutorial, you built and published a serverless function to Cloudflare Workers for generating QR codes. If you would like to see the full source code for this application, you can find it [on GitHub](https://github.com/signalnerve/workers-qr-code-generator).

If you want to get started building your own projects, review the existing list of [Quickstart templates](/get-started/quickstarts).
