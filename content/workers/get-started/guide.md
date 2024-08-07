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

[C3 (`create-cloudflare-cli`)](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Open a terminal window and run C3 to create your Worker project:

{{<render file="_c3-run-command-with-directory.md" productFolder="workers" withParameters="my-first-worker">}}

{{<render file="_c3-post-run-steps.md" productFolder="workers" withParameters="Hello World example;;Hello World Worker;;JavaScript">}}

Now, you have a new project set up. Move into that project folder.

```sh
$ cd my-first-worker
```

{{<details header="What files did C3 create?">}}

In your project directory, C3 will have generated the following:

1. `wrangler.toml`: Your [Wrangler](/workers/wrangler/configuration/#sample-wranglertoml-configuration) configuration file.
2. `index.js` (in `/src`): A minimal `'Hello World!'` Worker written in [ES module](/workers/reference/migrate-to-module-workers/) syntax.
3. `package.json`: A minimal Node dependencies configuration file.
4. `package-lock.json`: Refer to [`npm` documentation on `package-lock.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json).
5. `node_modules`: Refer to [`npm` documentation `node_modules`](https://docs.npmjs.com/cli/v7/configuring-npm/folders#node-modules).

{{</details>}}

{{<details header="What if I already have a project in a git repository?">}}

In addition to creating new projects from C3 templates, C3 also supports creating new projects from Git repositories. To create a new project from a Git repository, open your terminal and run:

```sh
$ npm create cloudflare@latest -- --template <SOURCE>
```

`<SOURCE>` may be any of the following:

- `user/repo` (GitHub)
- `git@github.com:user/repo`
- `https://github.com/user/repo`
- `user/repo/some-template` (subdirectories)
- `user/repo#canary` (branches)
- `user/repo#1234abcd` (commit hash)
- `bitbucket:user/repo` (Bitbucket)
- `gitlab:user/repo` (GitLab)

At a minimum, template folders must contain the following:

- `package.json`
- `wrangler.toml`
- `src/` containing a worker script referenced from `wrangler.toml`

{{</details>}}

## 2. Develop with Wrangler CLI

The Workers command-line interface, [Wrangler](/workers/wrangler/install-and-update/), allows you to [create](/workers/wrangler/commands/#init), [test](/workers/wrangler/commands/#dev), and [deploy](/workers/wrangler/commands/#deploy) your Workers projects. C3 will install Wrangler in projects by default.

After you have created your first Worker, run the [`wrangler dev`](/workers/wrangler/commands/#dev) command in the project directory to start a local server for developing your Worker. This will allow you to preview your Worker locally during development.

```sh
$ npx wrangler dev
```

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.

Go to [http://localhost:8787](http://localhost:8787) to view your Worker.

{{<details header="Browser issues?">}}

If you have issues with this step or you do not have access to a browser interface, refer to the [`wrangler login`](/workers/wrangler/commands/#login) documentation.

{{</details>}}

## 3. Write code

With your new project generated and running, you can begin to write and edit your code.

Find the `src/index.js` file. `index.js` will be populated with the code below:

```js
---
header: Original index.js
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
header: Updated index.js
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

Replace the content in your current `index.js` file with the content below, which changes the text output.

```js
---
header: index.js
highlight: [3]
---
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello Worker!");
  },
};
```

Then, save the file and reload the page. Your Worker's output will have changed to the new text.

{{<details header="No visible changes?">}}

If the output for your Worker does not change, make sure that:

1. You saved the changes to `index.js`.
2. You have `wrangler dev` running.
3. You reloaded your browser.

{{</details>}}

## 4. Deploy your project

Deploy your Worker via Wrangler to a `*.workers.dev` subdomain or a [Custom Domain](/workers/configuration/routing/custom-domains/).

```sh
$ npx wrangler deploy
```

If you have not configured any subdomain or domain, Wrangler will prompt you during the publish process to set one up.

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

{{<details header="Encountering errors?">}}

When pushing to your `*.workers.dev` subdomain for the first time, you may see [`523` errors](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-5xx-errors/#error-523-origin-is-unreachable) while DNS is propagating. These errors should resolve themselves after a minute or so.

{{</details>}}

## Next steps

To do more:

- Review our [Examples](/workers/examples/) and [Tutorials](/workers/tutorials/) for inspiration.
- Set up [bindings](/workers/runtime-apis/bindings/) to allow your Worker to interact with other resources and unlock new functionality.
- Learn how to [test and debug](/workers/testing/) your Workers.
- Read about [Workers limits and pricing](/workers/platform/).
