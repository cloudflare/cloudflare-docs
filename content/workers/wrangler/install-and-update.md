---
pcx_content_type: how-to
title: Install/Update Wrangler
weight: 1
---

# Install/Update Wrangler

{{<Aside type="note">}}

Wrangler has launched a new version. If you previously had Wrangler 1 installed or were working on a Wrangler 1 project, refer to the [Migration guide](/workers/wrangler/migration/migrating-from-wrangler-1/).

{{</Aside>}}

Wrangler is a command-line tool for building [Cloudflare Workers](https://workers.cloudflare.com/).

## Install Wrangler

To install [Wrangler](https://github.com/cloudflare/wrangler2), ensure you have [Node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/getting-started) installed, preferably using a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm). Using a version manager helps avoid permission issues and allows you to easily change Node.js versions. Wrangler requires a Node version of `16.13.0` or later. After you have installed npm and Node.js, run:

```sh
$ npm install -g wrangler
```

or install with `yarn`:

```sh
$ yarn global add wrangler
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
