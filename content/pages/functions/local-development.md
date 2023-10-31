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

This will then start serving your Pages project. You can press `b` to open the browser on your local site.

If you are using a framework, you can pass through the framework-provided dev command (such as, `npm run dev`) to run development. This enables you to benefit from the framework hot-reloading and any special build process around it. To run a framework-provided dev command:

```sh
$ npx wrangler pages dev -- <COMMAND>
```

This will start a local Wrangler development server that serves your Pages project. It will also spawn a new process, running the provided `<COMMAND>`. This provided command is expected to start its own local server, which serves static assets. Wrangler will proxy requests for assets to this underlying server. You can press `b` to open the browser on your local site, (available, by default, on [http://localhost:8788](http://localhost:8788)).

{{<Aside type="note">}}

`npx wrangler pages dev -- <COMMAND>` does not have support for Pages specific metafiles, such as `_headers`, `_redirects` or `_routes.json`. When running in this proxy mode, the local development server will ignore any of these files and the respective rules they declare. If your project uses these metafiles, use the `npx wrangler pages dev <DIRECTORY-OF-ASSETS>` command instead.

{{</Aside>}}

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
