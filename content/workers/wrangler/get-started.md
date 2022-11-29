---
pcx_content_type: how-to
title: Get started
weight: 1
---

# Get started with Wrangler

{{<Aside type="note">}}

Wrangler has launched a new version. If you previously had Wrangler 1 installed or were working on a Wrangler 1 project, refer to the [Migration guide](/workers/wrangler/migration/migrating-from-wrangler-1/).

{{</Aside>}}

Wrangler is a command-line tool for building [Cloudflare Workers](https://workers.cloudflare.com/). To use it, you will need to have [`npm`](https://www.npmjs.com/get-npm) and [`Node.js`](https://nodejs.org/en/) installed. Wrangler requires a Node version of `16.13.0` or later.

To create a Worker project with Wrangler, run:

```sh
$ npx wrangler init my-project
```

This will create new directory (`my-project`). To start developing your Worker, run:

```sh
$ cd my-project && npm start
```

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.
{{<Aside type="note">}}

If you have issues with this step or you do not have access to a browser interface, refer to the [`wrangler login`](/workers/wrangler/commands/#login) documentation for more information.
{{</Aside>}}


You will now be able to go to [http://localhost:8787](http://localhost:8787) to see your Worker running. Any changes you make to your code will trigger a rebuild, and reloading the page will show you the up-to-date output of your Worker.

When you are ready to deploy your Worker to Cloudflare's edge network, run:

```sh
$ npm run deploy
```

## Update Wrangler

To check your Wrangler version, run:

```sh
$ wrangler version
```

To update Wrangler, run:

```sh
$ npm update -g wrangler
```

To update Wrangler only in your current directory, run:

```sh
$ npm upgrade wrangler --save
```

or

```sh
$ npm update wranger --save
```

## Related resources

For a detailed list of the commands that Wrangler supports, refer to [Commands](/workers/wrangler/commands/). To learn more about Wrangler's configuration file, refer to [Configuration](/workers/wrangler/configuration/).
