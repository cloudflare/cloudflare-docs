---
pcx_content_type: how-to
title: Install/Update Wrangler
weight: 1
---

# Install/Update Wrangler

{{<Aside type="note">}}

This is an installation guide for the new version of Wrangler. If you previously had Wrangler v1 installed or were working on a Wrangler v1 project, refer to the [Migration guide](/workers/wrangler/migration/migrating-from-wrangler-1/).

{{</Aside>}}

Wrangler is a command-line tool for building with Cloudflare developer products.

## Install Wrangler

To install [Wrangler](https://github.com/cloudflare/wrangler2), ensure you have [Node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/getting-started) installed, preferably using a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm). Using a version manager helps avoid permission issues and allows you to easily change Node.js versions. Wrangler requires a Node.js version of `16.13.0` or later.

{{<Aside type="warning" header="Install Wrangler locally">}}

Cloudflare recommends installing Wrangler locally into each of your projects. This allows you and your team to use the same Wrangler version, control Wrangler versions for each project, and rollback to an earlier version of Wrangler, if needed.

{{</Aside>}}

### Install Wrangler locally

To install Wrangler locally within your Worker project, run:

```sh
$ npm install wrangler
```

or install with `yarn`:

```sh
$ yarn add wrangler
```

### Install Wrangler globally

After you have installed npm and Node.js, run:

```sh
$ npm install -g wrangler
```

or install with Yarn:

```sh
$ yarn global add wrangler
```

## Update Wrangler

To check your Wrangler version, run:

```sh
$ wrangler version
```

### Update Wrangler locally

To update Wrangler only in your current directory containing a `package.json`, run:

```sh
$ npm upgrade wrangler --save
```

or

```sh
$ npm update wrangler --save
```

### Update Wrangler globally

To update Wrangler globally, you must be outside of a project folder (and there is no parent directory containing a `package.json`) and run:

```sh
$ npm update -g wrangler
```

If you are using Volta to control your version of Node and need to update Wrangler globally, run:

```sh
$ volta install wrangler
```

{{<Aside type="warning" header="`npx wrangler init`">}}

Running `npx wrangler` will use the latest version of Wrangler except when there is already a Wrangler version installed in the current folder. In this case, it will use the locally installed version instead. Running `npx wrangler init` will install a local version of Wrangler in the newly created project directory.

{{</Aside>}}

## Related resources

* [Commands](/workers/wrangler/commands/) - A detailed list of the commands that Wrangler supports. 
* [Configuration](/workers/wrangler/configuration/) - Learn more about Wrangler's configuration file.
