---
title: Guide
pcx_content_type: get-started
weight: 1
meta:
  title: Get started guide
---

# Get started guide

This guide will instruct you through setting up and deploying your first Worker.

{{<Aside type="note" header="Try the Playground">}}

The quickest way to experiment with Cloudflare Workers is in the [Playground](https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank). The Playground does not require any setup. It is an instant way to preview and test a Worker directly in the browser against any site.

{{</Aside>}}

## Get started in the dashboard

By following the Get started guide, you will create a Worker using the command line. To create your first Worker using the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages** > **Create application**.
3. Select **Create Worker** > **Deploy**.

{{<render file="_prereqs.md">}}

## 1. Create a new Worker project

C3 (create-cloudflare-cli) is a command-line tool designed to help you setup and deploy Workers to Cloudflare as fast as possible.

Open a terminal window and run C3 to create your Worker project:

{{<tabs labels="npm | yarn">}}
{{<tab label="npm" default="true">}}

```sh
$ npm create cloudflare@latest
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn create cloudflare@latest
```

{{</tab>}}
{{</tabs>}}

This will prompt you to install the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) package, and lead you through setup.

For this guide, set up a basic Worker:

1. Name your new Worker directory by specifying where you want to create your application.
2. Select `"Hello World" script` as the type of application you want to create.
3. Answer `no` to using TypeScript.

You will be asked if you would like to deploy the project to Cloudflare.

* If you choose to deploy, you will be asked to authenticate (if not logged in already), and your project will be deployed to the Cloudflare global network.
* If you choose not to deploy, go to the newly created project directory to begin writing code. Deploy your project by following the instructions in [step 4](/workers/get-started/guide/#4-deploy-your-project).

In your project directory, C3 has generated the following:

1. `wrangler.toml`: Your [Wrangler](/workers/wrangler/configuration/#sample-wranglertoml-configuration) configuration file.
2. `worker.js` (in `/src`): A minimal `'Hello World!'` Worker written in [ES module](/workers/learning/migrate-to-module-workers/) syntax.
3. `package.json`: A minimal Node dependencies configuration file.
4. `package-lock.json`: Refer to [`npm` documentation on `package-lock.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json).
5. `node_modules`: Refer to [`npm` documentation `node_modules`](https://docs.npmjs.com/cli/v7/configuring-npm/folders#node-modules).

## 2. Develop with Wrangler CLI

The Workers command-line interface, [Wrangler](/workers/wrangler/install-and-update/), allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](/workers/wrangler/commands/#deploy) your Workers projects. C3 will install Wrangler in projects by default.

After you have created your first Worker, run the [`wrangler dev`](/workers/wrangler/commands/#dev) command in the project directory to start a local server for developing your Worker. This will allow you to test your Worker locally during development.

```js
$ npx wrangler dev
```

{{<Aside type="note">}}

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.

If you have issues with this step or you do not have access to a browser interface, refer to the [`wrangler login`](/workers/wrangler/commands/#login) documentation for more information.

{{</Aside>}}

You will now be able to go to [http://localhost:8787](http://localhost:8787) to see your Worker running. Any changes you make to your code will trigger a rebuild, and reloading the page will show you the up-to-date output of your Worker.

## 3. Write code

With your new project generated and running, you can begin to write and edit your code.

Find the `src/worker.js` file. `worker.js` will be populated with the code below:

```js
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

This code block consists of four parts:

1. The `export` statement: `export default`

`export default` is JavaScript syntax required for defining [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#default_exports_versus_named_exports). Your Worker has to have a default export of an object, with properties corresponding to the events your Worker should handle.

2. The event handler: `async fetch(request)`

This event handler will be called when your Worker receives a [`fetch` event](/workers/runtime-apis/fetch-event/). You can define additional event handlers in the exported object to respond to different types of events. For example, add an `async scheduled(event) {}` function definition to respond to [`scheduled` events](/workers/runtime-apis/scheduled-event/).

3. Parameters: `request`, `env`, `context`

The `fetch` event handler will always get three parameters passed into it: [`request`, `env` and `context`](/workers/runtime-apis/fetch-event/#syntax-es-modules).

1. The `Response` object: `return new Response("Hello World!");`

The Workers runtime expects `fetch` events to return a `Response` object. In this example, you will return a new Response with the string `"Hello World!"`.

To review code changes in real time, rewrite the `"Hello World!"` string to `"Hello Worker!"` and, with `wrangler dev` running, save your changes.

To experiment with more Workers code, refer to [Workers Examples](/workers/examples/).

## 4. Deploy your project

If you did not deploy your Worker during [step 1](/workers/get-started/guide/#1-create-a-new-worker-project), deploy your Worker via Wrangler, to a `*.workers.dev` subdomain, or a [Custom Domain](/workers/configuration/routing/custom-domains/), if you have one configured. If you have not configured any subdomain or domain, Wrangler will prompt you during the publish process to set one up.

```sh
$ npx wrangler deploy
```

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

{{<Aside type="note" header="Note">}}

When pushing to your `*.workers.dev` subdomain for the first time, you may see [`523` errors](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-523-origin-is-unreachable) while DNS is propagating. These errors should resolve themselves after a minute or so.

{{</Aside>}}

## 5. Write tests

We recommend writing tests against your Worker. One way to do this is with the [`unstable_dev`](/workers/wrangler/api/#unstable_dev) API in Wrangler. `unstable_dev` is used for writing integration and end-to-end tests.

An example of using `unstable_dev` in a unit test looks like this:

```js
const { unstable_dev } = require("wrangler");

describe("Worker", () => {
  let worker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.js", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return Hello World", async () => {
    const resp = await worker.fetch();
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"Hello World!"`);
    }
  });
});
```

The code block consists of 4 parts:

1. The import statement `const { unstable_dev } = require("wrangler");`, this initializes the `unstable_dev` API so it can be used in the test suite. The `unstable_dev` function accepts two parameters - `await unstable_dev(script, options)`.

2. The `beforeAll()` function for initializing `unstable_dev()`, this helps minimize the overhead required to start the dev server for each individual test, running the dev server for each test will take a longer time to resolve which can end up slowing down the tests.

3. The `afterAll()` function, which calls `await worker.stop()` for stopping the dev server after it runs the test suite.

4. The `await worker.fetch()` function, for checking the response received corresponds with what you were expecting.

## Related resources

To do more:

* Review [Tutorials](/workers/tutorials/) to build projects on Workers.
* Explore [Examples](/workers/examples/) to experiment with copy and paste Worker code.
* Understand how Workers works in [Learning](/workers/learning/).
* Learn about Workers features and functionality in [Platform](/workers/platform/).
* Set up [Wrangler](/workers/wrangler/install-and-update/) to programmatically create, test, and deploy your Worker projects.
