---
pcx_content_type: how-to
title: Install/Update Wrangler
weight: 1
---

# Install/Update Wrangler

Wrangler is a command-line tool for building with Cloudflare developer products.

## Install Wrangler

To install [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler), ensure you have [Node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/getting-started) installed, preferably using a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm). Using a version manager helps avoid permission issues and allows you to change Node.js versions. Wrangler requires a Node.js version of `16.13.0` or later.

Wrangler is installed locally into each of your projects. This allows you and your team to use the same Wrangler version, control Wrangler versions for each project, and rollback to an earlier version of Wrangler, if needed.

To install Wrangler within your Worker project, run:

{{<tabs labels="npm | yarn">}}
{{<tab label="npm" default="true">}}

```sh
$ npm install wrangler --save-dev
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn add --dev wrangler
```

{{</tab>}}
{{</tabs>}}

## Check your Wrangler version

To check your Wrangler version, run:

```sh
$ wrangler --version
// or run:
$ wrangler version
```

## Update Wrangler

To update the version of Wrangler used in your project, run:

```sh
$ npm install wrangler@latest
```

{{<Aside type="warning" header="`npx wrangler init`">}}

Running `npx wrangler` will use the latest version of Wrangler except when there is already a Wrangler version installed in the current folder. In this case, it will use the locally installed version instead. Running `npx wrangler init` will install a local version of Wrangler in the newly created project directory.

{{</Aside>}}

## Related resources

* [Commands](/workers/wrangler/commands/) - A detailed list of the commands that Wrangler supports. 
* [Configuration](/workers/wrangler/configuration/) - Learn more about Wrangler's configuration file.
