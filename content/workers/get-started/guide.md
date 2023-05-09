---
title: Guide
pcx_content_type: get-started
weight: 1
meta:
  title: Get started guide
---

# Get started guide

This guide will instruct you through setting up a Cloudflare account to deploying your first Worker. This guide assumes that you already have a Cloudflare account. If you do not have a Cloudflare account, [sign up](https://dash.cloudflare.com/sign-up/workers) before continuing.

{{<Aside type="note" header="Try the Playground">}}

The quickest way to experiment with Cloudflare Workers is in the [Playground](https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank). The Playground does not require any setup. It is a simple, instant way to preview and test a Workers script directly in the browser against any site.

{{</Aside>}}

## 1. Start a new project with C3

C3 (create-cloudflare-cli) is a command-line tool designed to help you setup and deploy Workers to Cloudflare as fast as possible. To get started, open a terminal window and run:

```sh
$ npm create cloudflare
```

This will prompt you to install the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) package, and lead you through a setup wizard.

Once your project has been configured and scaffolded, you will be asked if you would like to deploy the project to Cloudflare. If you choose not to deploy, you can navigate to the newly created project folder to begin development. Otherwise, you'll be asked to authenticate (if not logged in already), and your project will be deployed.

## 2. Run your development server via Wrangler CLI

After you have created your first Worker, run the [`wrangler dev`](/workers/wrangler/commands/#dev) command to start a local server for developing your Worker. This will allow you to test your Worker locally during development.

```sh
$ npx wrangler dev
```

The Workers command-line interface, Wrangler, allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](/workers/wrangler/commands/#publish) your Workers projects. Templates installed via C3 will have it installed in the project by default.

{{<Aside type="note">}}

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.

If you have issues with this step or you do not have access to a browser interface, refer to the [`wrangler login`](/workers/wrangler/commands/#login) documentation for more information.

{{</Aside>}}

You will now be able to go to [http://localhost:8787](http://localhost:8787) to see your Worker running. Any changes you make to your code will trigger a rebuild, and reloading the page will show you the up-to-date output of your Worker.

## 3. Write code

With your new project generated and running, you can begin to write and edit your code.

After running the `wrangler init` command to generate your Worker, the `src/index.ts` file will be populated with the code below:

```js
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

This code block consists of four parts:

1. The `export` statement: `export default`

`export default` is JavaScript syntax required for defining [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#default_exports_versus_named_exports). Your Worker has to have a default export of an object, with properties corresponding to the events your Worker should handle.

2. The event handler: `async fetch(request)`

This event handler will be called when your Worker receives a [`fetch` event](/workers/runtime-apis/fetch-event/). You can define additional event handlers in the exported object to respond to different types of events. For example, add an `async scheduled(event) {}` function definition to respond to [`scheduled` events](/workers/runtime-apis/scheduled-event/).

3. Parameters: `request`, `env`, `context`

The `fetch` event handler will always get three parameters passed into it: [`request`, `env` and `context`](/workers/runtime-apis/fetch-event/#syntax-module-worker).

4. The `Response` object: `return new Response("Hello World!");`

The Workers runtime expects `fetch` events to return a `Response` object. In this example, you will return a new Response with the string `"Hello World!"`.

To review code changes in real time, rewrite the `"Hello World!"` string to `"Hello Worker!"` and, with `wrangler dev` running, save your changes.

To experiment with more Workers, run C3 again for more examples or refer to [Workers Examples](/workers/examples/) in our documentation.

## 4. Publish your project

If you did not deploy previously via C3, you can publish your Worker via Wrangler, to a `*.workers.dev` subdomain, or a [custom domain](/workers/platform/triggers/custom-domains/), if you have one configured. If you have not configured any subdomain or domain, Wrangler will prompt you during the publish process to set one up.

```sh
---
header: Publish to workers.dev
---
$ npx wrangler publish
```

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

{{<Aside type="note" header="Note">}}

When pushing to your `*.workers.dev` subdomain for the first time, you may see [`523` errors](https://support.cloudflare.com/hc/articles/115003011431#523error) while DNS is propagating. These errors should resolve themselves after a minute or so.

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

## Next steps

To do more with Workers, explore the [Tutorials](/workers/tutorials/) and [Examples](/workers/examples/).
