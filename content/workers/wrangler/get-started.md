---
pcx_content_type: how-to
title: Get started
weight: 1
---

# Get started with Wrangler

{{<Aside type="note">}}

Wrangler has launched a new version. If you previously had Wrangler 1 installed or were working on a Wrangler 1 project, refer to the [Migration guide](/workers/wrangler/migration/migrating-from-wrangler-1/).

{{</Aside>}}

Wrangler is a command-line tool for building [Cloudflare Workers](https://workers.cloudflare.com/). To use it, you'll need to have [`npm`](https://www.npmjs.com/get-npm) and [`Node.js`](https://nodejs.org/en/) installed. Wrangler requires a Node version of `16.13.0` or later.

To get started with Wrangler run:

```sh
$ npx wrangler init my-project
```

This will create new directory (`my-project`), and setup a new Workers project within it. To start developing your worker, run:

```sh
$ cd my-project && npm start
```

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.
{{<Aside type="note">}}

If you have issues with this step or you do not have access to a browser interface, see the [`wrangler login`](/workers/wrangler/commands/#login) documentation for more information.
{{</Aside>}}

And that's it! You'll now be able to go to [http://localhost:8787](http://localhost:8787) to see your Worker running. Any changes you make to your code will trigger a rebuild, and simply reloading the page will show you the up-to-date output of your Worker.

When you're ready to deploy your Worker to Cloudflare's global network, run:

```sh
$ npm run deploy
```

For a detailed list of the commands that Wrangler supports, see the [commands documentation](/workers/wrangler/commands/). To learn more about Wrangler's configuration file, see the [configuration documentation](/workers/wrangler/configuration/)
