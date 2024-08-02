---
updated: 2023-06-29
difficulty: Beginner
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Build a QR code generator
---

# Build a QR code generator

{{<tutorial-date-info>}}

In this tutorial, you will build and publish a Worker application that generates QR codes.

If you would like to review the code for this tutorial, the final version of the codebase is [available on GitHub](https://github.com/kristianfreeman/workers-qr-code-generator). You can take the code provided in the example repository, customize it, and deploy it for use in your own projects.

{{<render file="_tutorials-before-you-start.md">}}

## 1. Create a new Workers project

First, use the [`create-cloudflare` CLI](/pages/get-started/c3) to create a new Cloudflare Workers project. To do this, open a terminal window and run the following command:

{{<render file="_c3-run-command-with-directory.md" productFolder="workers" withParameters="qr-code-generator">}}

To configure your Worker:

* Choose `"Hello World" Worker` for the type of application you would like to create.
* Answer `No` to using TypeScript.
* Answer `No` to deploying your Worker.

Then, move into your newly created directory:

```sh
$ cd qr-code-generator
```

Inside of your new `qr-code-generator` Worker project directory, `index.js` represents the entry point to your Cloudflare Workers application.

All Cloudflare Workers applications start by listening for `fetch` events, which are triggered when a client makes a request to a Workers route. After a request is received by the Worker, the response your application constructs will be returned to the user. This tutorial will guide you through understanding how the request/response pattern works and how you can use it to build fully featured applications.

```js
---
filename: index.js
---
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello Worker!');
	},
};
```

In your default `index.js` file, you can see that request/response pattern in action. The `fetch` constructs a new `Response` with the body text `'Hello Worker!'`.

When a Worker receives a `fetch` event, the Worker returns the newly constructed response to the client. Your Worker will serve new responses directly from [Cloudflare's global network](https://www.cloudflare.com/network) instead of continuing to your origin server. A standard server would accept requests and return responses. Cloudflare Workers allows you to respond quickly by constructing responses directly on the Cloudflare global network.

## 2. Handle Incoming Request

Any project you publish to Cloudflare Workers can make use of modern JavaScript tooling like ES modules, `npm` packages, and [`async`/`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) functions to build your application. In addition to writing Workers, you can use Workers to [build full applications](/workers/tutorials/build-a-slackbot/) using the same tooling and process as in this tutorial.

The QR code generator you will build in this tutorial will be a Worker that runs on a single route and receives requests. Each request will contain a text message (a URL, for example), which the function will encode into a QR code. The function will then respond with the QR code in PNG image format.

At this point in the tutorial, your Worker function can receive requests and return a simple response with the text `"Hello Worker!"`. To handle data coming into your Worker, check if the incoming request is a `POST` request:

```js
---
filename: index.js
highlight: [2, 3, 4]
---
export default {
	async fetch(request, env, ctx) {
		if (request.method === 'POST') {
			return new Response('Hello Worker!');
		}
	},
};
```

Currently, if an incoming request is not a `POST`, the function will return `undefined`. However, a Worker always needs to return a `Response`. Since the function should only accept incoming `POST` requests, return a new `Response` with a [`405` status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405) if the incoming request is not a `POST`:

```js
---
filename: index.js
highlight: [7, 8]
---
export default {
	async fetch(request, env, ctx) {
		if (request.method === 'POST') {
			return new Response('Hello Worker!');
		}

		return new Response('Expected POST request', {
			status: 405,
		})
	},
};
```

You have established the basic flow of the request. You will now set up a response to incoming valid requests. If a `POST` request comes in, the function should generate a QR code. To start, move the `"Hello Worker!"` response into a new function, `generateQRCode`, which will ultimately contain the bulk of your function’s logic:

```js
---
filename: index.js
highlight: [7, 8, 9, 10]
---
export default {
  async fetch(request, env, ctx) {
    if (request.method === "POST") {}
  }
}

async function generateQRCode(request) {
  // TODO: Include QR code generation
  return new Response("Hello worker!")
}
```

With the `generateQRCode` function filled out, call it within `fetch` function and return its result directly to the client:

```js
---
filename: index.js
highlight: [4]
---
export default {
  async fetch(request, env, ctx) {
    if (request.method === "POST") {
      return generateQRCode(request)
    }
  }
}
```

## 3. Build a QR code generator

All projects deployed to Cloudflare Workers support npm packages. This support makes it easy to rapidly build out functionality in your Workers. The [`qr-image`](https://github.com/alexeyten/qr-image) package is a great way to take text and encode it into a QR code. The package supports generating the QR codes in a number of file formats (such as PNG, the default, and SVG) and configuring other aspects of the generated QR code. In the command line, install and save `qr-image` to your project’s `package.json`:

```sh
---
header: Installing the qr-image package
---
$ npm install --save qr-image
```

In `index.js`, import the `qr-image` package as the variable `qr`. In the `generateQRCode` function, parse the incoming request as JSON using `request.json`, and generate a QR code from `text` using `qr.imageSync`:

```js
---
filename: index.js
highlight: [1, 2, 3, 4, 5, 6]
---
const qr = require("qr-image")

async function generateQRCode(request) {
  const { text } = await request.json()
  const qr_png = qr.imageSync(text || "https://workers.dev")
}
```

By default, the QR code is generated as a PNG. Construct a new instance of `Response`, passing in the PNG data as the body, and a `Content-Type` header of `image/png`. This will allow browsers to properly parse the data coming back from your Worker as an image:

```js
---
filename: index.js
highlight: [3, 4, 5]
---
async function generateQRCode(request) {
  const { text } = await request.json()
  const headers = { "Content-Type": "image/png" }
  const qr_png = qr.imageSync(text || "https://workers.dev")
  return new Response(qr_png, { headers })
}
```

The `qr-image` package you installed depends on Node.js APIs. For this to work, you need to set the `node_compat` flag in your Wrangler configuration file:

```toml
---
filename: wrangler.toml
---
node_compat = true
```

## 4. Test in an application UI

The Worker will work if a user sends a `POST` request to a route, but it would be best practice to also be able to test the function with a proper interface. At this point in the tutorial, if any request is received by your function that is not a `POST`, a `405` response is returned. The new version of `fetch` should return a new `Response` with a static HTML document instead of the `405` error:

```js
---
filename: index.js
highlight: [23-54]
---
export default {
  async fetch(request, env, ctx) {
  if (request.method === 'POST') {
    return generateQRCode(request)
  }

  return new Response(landing, {
    headers: {
      "Content-Type": "text/html"
    }
  })
},
}

async function generateQRCode(request) {
	const { text } = await request.json()
	const headers = { "Content-Type": "image/png" }
	const qr_png = qr.imageSync(text || "https://workers.dev")

	return new Response(qr_png, { headers });
}

const landing = `
<h1>QR Generator</h1>
<p>Click the below button to generate a new QR code. This will make a request to your Worker.</p>
<input type="text" id="text" value="https://workers.dev"></input>
<button onclick="generate()">Generate QR Code</button>
<p>Generated QR Code Image</p>
<img id="qr" src="#" />
<script>
	function generate() {
		fetch(window.location.pathname, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text: document.querySelector("#text").value })
		})
		.then(response => response.blob())
		.then(blob => {
			const reader = new FileReader();
			reader.onloadend = function () {
				document.querySelector("#qr").src = reader.result; // Update the image source with the newly generated QR code
			}
			reader.readAsDataURL(blob);
		})
	}
</script>
`
```

The `landing` variable, which is a static HTML string, sets up an `input` tag and a corresponding `button`, which calls the `generateQRCode` function. This function will make an HTTP `POST` request back to your Worker, allowing you to see the corresponding QR code image returned on the page.

With the above steps complete, your Worker is ready. The full version of the code looks like this:

```js
---
filename: index.js
---
const qr = require('qr-image');

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'POST') {
			return generateQRCode(request)
		}

		return new Response(landing, {
			headers: {
				"Content-Type": "text/html"
			}
		})
	},
};

async function generateQRCode(request) {
	const { text } = await request.json()
	const headers = { "Content-Type": "image/png" }
	const qr_png = qr.imageSync(text || "https://workers.dev")

	return new Response(qr_png, { headers });
}

const landing = `
<h1>QR Generator</h1>
<p>Click the below button to generate a new QR code. This will make a request to your Worker.</p>
<input type="text" id="text" value="https://workers.dev"></input>
<button onclick="generate()">Generate QR Code</button>
<p>Generated QR Code Image</p>
<img id="qr" src="#" />
<script>
	function generate() {
		fetch(window.location.pathname, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text: document.querySelector("#text").value })
		})
		.then(response => response.blob())
		.then(blob => {
			const reader = new FileReader();
			reader.onloadend = function () {
				document.querySelector("#qr").src = reader.result; // Update the image source with the newly generated QR code
			}
			reader.readAsDataURL(blob);
		})
	}
</script>
`
```

## 5. Deploy your Worker

With all the above steps complete, you have written the code for a QR code generator on Cloudflare Workers.

Wrangler has built-in support for bundling, uploading, and releasing your Cloudflare Workers application. To do this, run `npx wrangler deploy`, which will build and deploy your code.

```sh
---
header: Deploy your Worker project
---
$ npx wrangler deploy
```

## Related resources

In this tutorial, you built and deployed a Worker application for generating QR codes. If you would like to see the full source code for this application, you can find it [on GitHub](https://github.com/cloudflare/workers-sdk/tree/main/templates/examples/qr-code-generator).

If you want to get started building your own projects, review the existing list of [Quickstart templates](/workers/get-started/quickstarts/).
