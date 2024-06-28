---
title: CLI
pcx_content_type: get-started
weight: 1
meta:
  title: Get started - CLI
---

# Get started with the CLI

Set up and deploy your first Worker with Wrangler, the Cloudflare Developer Platform CLI.

This guide will instruct you through setting up and deploying your first Worker.

## Prerequisites

{{<render file="_prereqs.md" productFolder="workers">}}

## 1. Create a new Worker project

[C3 (create-cloudflare-cli)](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Open a terminal window and run C3 to create your Worker project:

{{<render file="_c3-run-command.md" productFolder="workers">}}

This will prompt you to install the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) package, and lead you through setup.

For this guide, set up a basic Worker:

1. Name your new Worker directory by specifying where you want to create your application.
2. Select `"Hello World" Worker` as the type of application you want to create.
3. Answer `yes` or `no` to using TypeScript.

{{<Aside type="note">}}

The rest of this guide assumes that you will create a JavaScript project. If you are creating a TypeScript project, the files will be `.ts`, a `.tsconfig` file will be created, and proper dependencies will be added.

{{</Aside>}}

You will be asked if you would like to deploy the project to Cloudflare.

- If you choose to deploy, you will be asked to authenticate (if not logged in already), and your project will be deployed to the Cloudflare global network.
- If you choose not to deploy, go to the newly created project directory to begin writing code. Deploy your project by following the instructions in [step 4](/workers/get-started/guide/#4-deploy-your-project).

{{<details header="What files are in my project?">}}

In your project directory, C3 will have generated the following:

1. `wrangler.toml`: Your [Wrangler](/workers/wrangler/configuration/#sample-wranglertoml-configuration) configuration file.
2. `index.js` (in `/src`): A minimal `'Hello World!'` Worker written in [ES module](/workers/reference/migrate-to-module-workers/) syntax.
3. `package.json`: A minimal Node dependencies configuration file.
4. `package-lock.json`: Refer to [`npm` documentation on `package-lock.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json).
5. `node_modules`: Refer to [`npm` documentation `node_modules`](https://docs.npmjs.com/cli/v7/configuring-npm/folders#node-modules).

{{</details>}}

## 2. Develop with Wrangler CLI

The Workers command-line interface, [Wrangler](/workers/wrangler/install-and-update/), allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](/workers/wrangler/commands/#deploy) your Workers projects. C3 will install Wrangler in projects by default.

After you have created your first Worker, run the [`wrangler dev`](/workers/wrangler/commands/#dev) command in the project directory to start a local server for developing your Worker. This will allow you to test your Worker locally during development.

```sh
$ npx wrangler dev
```

{{<Aside type="note">}}

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.

If you have issues with this step or you do not have access to a browser interface, refer to the [`wrangler login`](/workers/wrangler/commands/#login) documentation for more information.

{{</Aside>}}

You will now be able to go to [http://localhost:8787](http://localhost:8787) to see your Worker running. Any changes you make to your code will trigger a rebuild, and reloading the page will show you the up-to-date output of your Worker.

## 3. Write code

With your new project generated and running, you can begin to write and edit your code.

Find the `src/index.js` file. `index.js` will be populated with the code below:

```js
---
header: index.js
---
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  },
};
```

{{<details header="Code explanation">}}

This code block consists of a few different parts.

```js
---
header: index.js
highlight: [1]
---
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  },
};
```

`export default` is JavaScript syntax required for defining [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#default_exports_versus_named_exports). Your Worker has to have a default export of an object, with properties corresponding to the events your Worker should handle.

```js
---
header: index.js
highlight: [2]
---
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  },
};
```

This [`fetch()` handler](/workers/runtime-apis/handlers/fetch/) will be called when your Worker receives an HTTP request. You can define additional event handlers in the exported object to respond to different types of events. For example, add a [`scheduled()` handler](/workers/runtime-apis/handlers/scheduled/) to respond to Worker invocations via a [Cron Trigger](/workers/configuration/cron-triggers/).

Additionally, the `fetch` handler will always be passed three parameters: [`request`, `env` and `context`](/workers/runtime-apis/handlers/fetch/).

```js
---
header: index.js
highlight: [3]
---
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  },
};
```

The Workers runtime expects `fetch` handlers to return a `Response` object or a Promise which resolves with a `Response` object. In this example, you will return a new `Response` with the string `"Hello World!"`.

{{</details>}}

To review code changes in real time, rewrite the `"Hello World!"` string to `"Hello Worker!"` and, with `wrangler dev` running, save your changes.

## 4. Deploy your project

If you did not deploy your Worker during [step 1](/workers/get-started/guide/#1-create-a-new-worker-project), deploy your Worker via Wrangler to a `*.workers.dev` subdomain or a [Custom Domain](/workers/configuration/routing/custom-domains/). If you have not configured any subdomain or domain, Wrangler will prompt you during the publish process to set one up.

```sh
$ npx wrangler deploy
```

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

{{<Aside type="note" header="Note">}}

When pushing to your `*.workers.dev` subdomain for the first time, you may see [`523` errors](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-523-origin-is-unreachable) while DNS is propagating. These errors should resolve themselves after a minute or so.

{{</Aside>}}

## Next steps

To do more:

- Review our [Examples](/workers/examples/) and [Tutorials](/workers/tutorials/) for inspiration.
- Set up [bindings](/workers/runtime-apis/bindings/) to allow your Worker to interact with other resources and unlock new functionality.
- Learn how to [test and debug](/workers/testing/) your Workers.
- Read about [Workers limits and pricing](/workers/platform/).
