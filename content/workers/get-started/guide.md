---
title: Guide
pcx-content-type: get-started
weight: 1
meta:
  title: Get started guide
---

# Get started guide

Cloudflare Workers is a serverless application platform running on Cloudflare’s global [cloud network](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/) in over 200 cities around the world, offering both [free and paid plans](/workers/platform/pricing/).

Learn more about [how Workers works](/workers/learning/how-workers-works/).

{{<Aside type="note" header="Try the Playground">}}

The quickest way to experiment with Cloudflare Workers is in the [Playground](https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank). The Playground does not require any setup. It is a simple, instant way to preview and test a Workers script directly in the browser against any site.

{{</Aside>}}

This guide will instruct you through setting up a Cloudflare account to deploying your first Worker script. This guide assumes that you already have a Cloudflare account. If you do not have a Cloudflare account, sign up before continuing by following this guide:

<p>{{<button type="primary" href="https://dash.cloudflare.com/sign-up/workers">}}Sign up{{</button>}}</p>

---

## 1. Install Wrangler (Workers CLI)

Installing `wrangler`, the Workers command-line interface (CLI), allows you to [`init`](/workers/wrangler/commands/#init), [`dev`](/workers/wrangler/commands/#dev), and [`publish`](/workers/wrangler/commands/#publish) your Workers projects.

To install [`wrangler`](https://github.com/cloudflare/wrangler2), ensure you have [`npm` installed](https://www.npmjs.com/get-npm), preferably using a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm). Using a version manager helps avoid permission issues and allows you to easily change Node.js versions. Then run:

```sh
$ npm install -g wrangler
```

or install with yarn:

```sh
$ yarn global add wrangler
```

---

## 2. Authenticate Wrangler

To authenticate Wrangler, run `wrangler login`: 

```sh
$ wrangler login
```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.



---

## 3. Start a new project

With Wrangler installed, you are ready to create your Worker project.

Run `wrangler init` followed by your project name:

```sh
$ wrangler init <YOUR_WORKER>
```

You will be asked `“Would you like to use git to manage this Worker? (y/n)”` and `Would you like to use TypeScript? (y/n)`. If you would like to respond yes to every question, run:

```sh
$ wrangler init <YOUR_WORKER> -y
```

Wrangler will say yes to all question on your behalf and initialize your new project with git, a `package.json` file, configure TypeScript and a minimum Hello World script.

{{<Aside type="note" header="TypeScript">}}

`wrangler init` will prompt you to choose y/n to `Would you like to use TypeScript? (y/n)`. If you indicate yes, you will get an `index.ts` file instead of a `index.js` file and Wrangler will also generate a `tsconfig.json` file in the root of your project. 

{{</Aside>}}

You can also use one of [Cloudflare's templates](https://github.com/cloudflare/templates#usage) to start a new project.

After you have created your new Worker, `cd` into your new project directory:

```sh
$ cd <YOUR_WORKER>
``` 

In your project directory, `wrangler init` has generated the following files:

1. `wrangler.toml`: Your [Wrangler](https://developers.cloudflare.com/workers/wrangler/configuration/#example) configuration file.
2. `index.js` (in `/src`): A minimal Worker Hello World application script written in module syntax.
3. `package.json`: A minimal Node dependencies configuration file. Only generated if indicated in `wrangler init` command.
4. `tsconfig.json`: TypeScript configuration that includes [Workers types](https://github.com/cloudflare/workers-types). Only generated if indicated in `wrangler init` command.

---

## 4. Run your development server

After you have created your first Worker, run the [`wrangler dev`](/workers/wrangler/commands/#dev) command to start a local server for developing your Worker. This will allow you to test your Worker in development. 

```sh
$ wrangler dev
```

---

## 5. Write code

With your new project generated, you can begin to write your code.

After running the `wrangler init` command to generate your Worker, the `index.js` file will be populated with the code below:

```js
export default {
  async fetch(request) {
    return new Response("Hello World!");
  },
};
```

This code block consists of four parts:

1. The `export` statement: `export default`

`export default` is JavaScript syntax required for defining [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#default_exports_versus_named_exports). `export default` lets the Workers runtime know that this is a Worker object as opposed to another Cloudflare product. Refer to [MDN documentation for more information on default exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

2. The event handler: `async fetch(request)`

The event handler indicates what events the Worker should listen to (such as, [`fetch`](/workers/runtime-apis/fetch-event/) or [`scheduled`](/workers/runtime-apis/scheduled-event/)). 

3. Parameters: `request`, `env`, `context`

The event handler will always get three parameters passed into it: [`request`, `env` and `context`](/workers/runtime-apis/fetch-event/#syntax-module-worker). If you would like to interact with these parameters, you will have to accept the parameters as variables by indicating them in your code. You can choose which parameters to use. They must always be written in order (`request`, `env`, `context`). In this example, `request` is indicated and your Worker can now interact with the `Request` object.

4. The `Response` object: `return new Response("Hello World!");`

The Workers runtime expects `fetch` events to return a `Response` object. In this example, you will return a new Response with the string `"Hello World!"`.

To review code changes in real time, rewrite the `"Hello World!"` string to `"Hello Worker!"` and, with `wrangler dev` running, save your changes.

To experiment with more premade Workers, refer to [Workers Examples](/workers/examples/).

<!-->

### 5b. Routing and filtering requests

After writing a basic script for all requests, the next step is generating a dynamic response based on the requests the Worker script is receiving. This is often referred to as routing.

#### Option 1: Manually route requests

Use standard JavaScript branching logic, such as `if`/`else` or `switch` statements, to conditionally return different responses or execute different handlers based on the request:

```js
---
filename: ~/my-worker/index.js
highlight: [7, 8, 9, 10, 11]
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let response;
  if (request.method === 'POST') {
    response = await generate(request);
  } else {
    response = new Response('Expected POST', { status: 500 });
  }
  // ...
}
```

It is common to route requests based on:

- `request.method` — for example, `GET` or `POST`.
- `request.url` — for example, filter based on query parameters or the pathname.
- `request.headers` — filter based on specific headers.

Refer to a full list of [all properties of a `Request` object](/workers/runtime-apis/request/#properties).

In addition to standard request properties, the Workers platform populates the request with a [`cf` object](/workers/runtime-apis/request/#incomingrequestcfproperties), containing many useful properties, for example, the `region` or `timezone`.

#### Option 2: Use a template for routing on URL

For more complex routing, it is recommended to use a library. The [Workers router starter](https://github.com/cloudflare/worker-template-router) template provides an API similar to ExpressJS for handling requests based on HTTP methods and paths:

```sh
$ git clone https://github.com/cloudflare/worker-template-router
$ cd worker-template-router
$ npm install
```

This starter is used in the tutorial for [building a Slack Bot](/workers/tutorials/build-a-slackbot/).

### (Optional) Configure for deploying to a registered domain

To publish your application on a zone you own, and not a `*.workers.dev` subdomain, you can add a `route` key to your `wrangler.toml` file.

You can get your `zone_id` with the following steps:

1.  [**Log in** to your Cloudflare account](https://dash.cloudflare.com/login) and select the desired zone.
2.  If not already there, navigate to **Overview** in the dashboard.
3.  Scroll down until you see **Zone ID** on the right.
4.  Click **Click to copy** below the input.

Wrangler’s environments feature allows you to deploy the same project to multiple places under multiple names. For a complete guide on how to configure environments, refer to the [environments page](/workers/platform/environments/).

To add a `production` environment, pass in a `zone_id` and `route`:

```toml
---
filename: wrangler.toml
---
name = "my-worker"

# The route pattern your Workers application will be served at
route = "example.com/*"
```

The `route` key here is a [route pattern](/workers/platform/routing/routes/), which can contain wildcards.

If your route is configured to a hostname, you will need to add a DNS record to Cloudflare to ensure that the hostname can be resolved externally. If your Worker acts as your origin (that is, the request terminates in a Worker), you must add a DNS record.

You may enter a placeholder `AAAA` record pointing to `100::`, which must be proxied through Cloudflare (orange-cloud in the DNS settings). This value specifically is the [reserved IPv6 discard prefix](https://tools.ietf.org/html/rfc6666) but is not the only value allowed. For example, you may also use an `A` record pointed to `192.0.2.1` or a `CNAME` pointed to any resolvable target.

Whichever method you choose, your record must be proxied through Cloudflare (orange-clouded) and resolve successfully.

---

<!-->

## 6. Publish your project

With your project configured, you can now publish your Worker. You can publish your Worker to a custom domain, or, if not configured, the Worker will publish to a `*.workers.dev` subdomain by default. To set up a `*.workers.dev` subdomain, go to the Cloudflare dashboard > **Workers** > **Your subdomain** > **Change**.

To deploy to your `*.workers.dev` subdomain, run:

```sh
---
header: Publish to workers.dev
---
$ wrangler publish
```

You can preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

{{<Aside type="note" header="Note">}}

When pushing to your `*.workers.dev` subdomain for the first time, you may initially see [`523` errors](https://support.cloudflare.com/hc/articles/115003011431#523error) while DNS is propagating. It should work without any errors after a minute or so.

{{</Aside>}}

<!-->

### (Optional) Publish your project to a registered domain

To deploy the production environment set in your `wrangler.toml` file in the [optional configuration step](/workers/get-started/guide/#optional-configure-for-deploying-to-a-registered-domain), pass the `--env` flag to the command:

```sh
---
header: Publish to example.com
---
~/my-worker $ wrangler publish --env production
```

For more information on environments, refer to the [Wrangler documentation](/workers/wrangler/configuration/#environments).

You can also configure a GitHub repository to automatically deploy every time you `git push`. You can do this by either using the [Workers GitHub action](https://github.com/marketplace/actions/deploy-to-cloudflare-workers-with-wrangler), or by writing your own GitHub action and manually configuring the necessary [GitHub secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets).

---

<!-->

## Next steps

To do more with Workers, explore the [Tutorials](/workers/tutorials/) and [Examples](/workers/examples/).
