---
pcx_content_type: how-to
title: Install/Update Wrangler
weight: 1
meta:
  description: Get started by installing Wrangler, and update to newer versions by following this guide.
---

# Install/Update Wrangler

Wrangler is a command-line tool for building with Cloudflare developer products.

## Install Wrangler

To install [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler), ensure you have [Node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/getting-started) installed, preferably using a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm). Using a version manager helps avoid permission issues and allows you to change Node.js versions. Wrangler requires a Node version of `16.17.0` or later.

Wrangler is installed locally into each of your projects. This allows you and your team to use the same Wrangler version, control Wrangler versions for each project, and rollback to an earlier version of Wrangler, if needed.

To install Wrangler within your Worker project, run:

{{<render file="_install_wrangler.md" >}}

Since Cloudflare recommends installing Wrangler locally in your project (rather than globally), the way to run Wrangler will depend on your specific setup and package manager. Refer to [How to run Wrangler commands](/workers/wrangler/commands/#how-to-run-wrangler-commands) for more information.

{{<Aside type="warning">}}

If Wrangler is not installed, running `npx wrangler` will install the latest version of Wrangler in the current local folder.

{{</Aside>}}

## Check your Wrangler version

To check your Wrangler version, run:

```sh
$ npx wrangler --version
// or
$ npx wrangler version
// or
$ npx wrangler -v
```

## Update Wrangler

To update the version of Wrangler used in your project, run:

```sh
$ npm install wrangler@latest
```

## Related resources

- [Commands](/workers/wrangler/commands/) - A detailed list of the commands that Wrangler supports.
- [Configuration](/workers/wrangler/configuration/) - Learn more about Wrangler's configuration file.
