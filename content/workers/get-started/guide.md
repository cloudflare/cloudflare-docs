---
title: Guide
pcx_content_type: get-started
weight: 1
meta:
  title: Get started guide
---

# Get started guide

This guide will instruct you through setting up a Cloudflare account to deploying your first Worker script. This guide assumes that you already have a Cloudflare account. If you do not have a Cloudflare account, [sign up](https://dash.cloudflare.com/sign-up/workers) before continuing.

{{<Aside type="note" header="Try the Playground">}}

The quickest way to experiment with Cloudflare Workers is in the [Playground](https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank). The Playground does not require any setup. It is a simple, instant way to preview and test a Workers script directly in the browser against any site.

{{</Aside>}}

## 1. Install Wrangler (Workers CLI)

Installing `wrangler`, the Workers command-line interface (CLI), allows you to [`init`](/workers/wrangler/commands/#init), [`dev`](/workers/wrangler/commands/#dev), and [`publish`](/workers/wrangler/commands/#publish) your Workers projects.

To install [`wrangler`](https://github.com/cloudflare/wrangler2), ensure you have [`npm` installed](https://www.npmjs.com/get-npm), preferably using a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm). Using a version manager helps avoid permission issues and allows you to easily change Node.js versions. Then run:

```sh
$ npm install -g wrangler
```

or install with `yarn`:

```sh
$ yarn global add wrangler
```

## 2. Authenticate Wrangler

To authenticate Wrangler, run `wrangler login`: 

```sh
$ wrangler login
```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

## 3. Start a new project

With Wrangler installed, you are ready to create your Worker project.

Run `wrangler init` followed by your project name:

```sh
$ wrangler init <YOUR_WORKER>
```

In your terminal, you will be asked:

1. `Would you like to use git to manage this Worker? (y/n)` Indicate `y`.
2. `Would you like to use TypeScript? (y/n)` Indicate `n` to continue with JavaScript for this guide.
3. `No package.json found. Would you like to create one? (y/n)` Indicate `y`.
4. `Would you like to create a Worker at <YOUR_WORKER>\src\index.js?` Indicate `y`.

{{<Aside type="note" header="TypeScript">}}

`wrangler init` will prompt you to choose y/n to `Would you like to use TypeScript? (y/n)`. If you indicate yes, you will get an `index.ts` file instead of a `index.js` file and Wrangler will also generate a `tsconfig.json` file in the root of your project. 

{{</Aside>}}

You can also use one of [Cloudflare's templates](https://github.com/cloudflare/templates#usage) to start a new project.

After you have created your new Worker, `cd` into your new project directory:

```sh
$ cd <YOUR_WORKER>
``` 

In your project directory, `wrangler init` has generated the following files:

1. `wrangler.toml`: Your [Wrangler](/workers/wrangler/configuration/#example) configuration file.
2. `index.js` (in `/src`): A minimal Hello World Worker written in JavaScript module syntax.
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

After running the `wrangler init` command to generate your Worker, the `index.js` or `index.ts` file will be populated with the code below:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

{{</tab>}}
{{<tab label="js">}}

```js
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return new Response("Hello World!");
	},
};
```

{{</tab>}}
{{</tabs>}}

This code block consists of four parts:

1. The `export` statement: `export default`

`export default` is JavaScript syntax required for defining [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#default_exports_versus_named_exports). `export default` lets the Workers runtime know that this is a Worker object as opposed to another Cloudflare product. Refer to [MDN documentation for more information on default exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

2. The event handler: `async fetch(request)`

The event handler indicates what events the Worker should listen to, such as [`fetch`](/workers/runtime-apis/fetch-event/) or [`scheduled`](/workers/runtime-apis/scheduled-event/). 

3. Parameters: `request`, `env`, `context`

The event handler will always get three parameters passed into it: [`request`, `env` and `context`](/workers/runtime-apis/fetch-event/#syntax-module-worker). If you would like to interact with these parameters, you will have to accept the parameters as variables by indicating them in your code. You can choose which parameters to use. They must always be written in order (`request`, `env`, `context`). In this example, `request` is indicated and your Worker can now interact with the `Request` object.

4. The `Response` object: `return new Response("Hello World!");`

The Workers runtime expects `fetch` events to return a `Response` object. In this example, you will return a new Response with the string `"Hello World!"`.

To review code changes in real time, rewrite the `"Hello World!"` string to `"Hello Worker!"` and, with `wrangler dev` running, save your changes.

To experiment with more premade Workers, refer to [Workers Examples](/workers/examples/).

## 6. Publish your project

With your project configured, you can now publish your Worker. You can publish your Worker to a custom domain, or, if not configured, the Worker will publish to a `*.workers.dev` subdomain by default. To set up a `*.workers.dev` subdomain, go to the [Cloudflare dashboard](https://dash.cloudflare.com/login) > **Workers** > **Your subdomain** > **Change**.

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

## Next steps

To do more with Workers, explore the [Tutorials](/workers/tutorials/) and [Examples](/workers/examples/).
