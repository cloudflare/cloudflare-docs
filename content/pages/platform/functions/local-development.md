---
pcx_content_type: how-to
title: Local development
weight: 6
---

# Local development

Run your Pages application locally with our Wrangler Command Line Interface (CLI).

## Install Wrangler

To get started with Wrangler, refer to the [Install/Update Wrangler](/workers/wrangler/install-and-update/).

## Run your Pages project locally

The main command for local development on Pages is `wrangler pages dev`. This will let you run your Pages application locally, which includes serving static assets and running your Functions.

With your folder of static assets set up, run the following command to start local development:

```sh
$ npx wrangler pages dev <DIRECTORY-OF-ASSETS>
```

This will then start serving your Pages project. You can press `B` to open the browser on your local site.

If you are using a framework, you can pass through the framework-provided dev command (such as, `npm run dev`) to run development. This enables you to benefit from the framework hot-reloading and any special build process around it. To run a framework-provided dev command:

```sh
$ npx wrangler pages dev -- <COMMAND>
```

### HTTPS support

To serve your local development server over HTTPS with a self-signed certificate, pass the `--local-protocol=https` argument to `npx wrangler pages dev`:

```sh
$ npx wrangler pages dev --local-protocol=https <DIRECTORY-OF-ASSETS>
```

If you are using `npx wrangler pages dev` with a command (`-- <COMMAND>`), you must match the protocol of whatever server is spun up by that command. If using HTTPS, you must additionally specify the certificate path to Node.js to allow Wrangler to accept responses from the command's server. You can do this by specifying the [`NODE_EXTRA_CA_CERTS`](https://nodejs.org/api/all.html#all_cli_node_extra_ca_certsfile) environment variable:

```sh
$ NODE_EXTRA_CA_CERTS=<PATH_TO_CERTIFICATE> npx wrangler pages dev --local-protocol=https -- <COMMAND>
```

## Attach bindings to local development

To attach a binding to local development, refer to [Bindings](/pages/platform/functions/bindings/) and find the resource you would like to work with.
