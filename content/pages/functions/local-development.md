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

This will then start serving your Pages project. You can press `b` to open the browser on your local site, (available, by default, on [http://localhost:8788](http://localhost:8788)).

### HTTPS support

To serve your local development server over HTTPS with a self-signed certificate, pass the `--local-protocol=https` argument to `npx wrangler pages dev`:

```sh
$ npx wrangler pages dev --local-protocol=https <DIRECTORY-OF-ASSETS>
```

## Attach bindings to local development

To attach a binding to local development, refer to [Bindings](/pages/functions/bindings/) and find the resource you would like to work with.
