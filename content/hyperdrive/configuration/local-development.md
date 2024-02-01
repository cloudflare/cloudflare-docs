---
title: Local development
weight: 6
pcx_content_type: concept
---

# Develop locally

Hyperdrive can be used when developing and testing your Workers locally, by connecting to any local database instance running on your machine directly. Local development uses [Wrangler](/workers/wrangler/install-and-update/), the command-line interface for Workers, to manage local development sessions and state.

## Start a local development session

{{<Aside type="note">}}

This guide assumes you are using [Wrangler v3.0](https://blog.cloudflare.com/wrangler3/) or later.

Users new to Hyperdrive and/or Cloudflare Workers should visit the [Hyperdrive tutorial](/hyperdrive/get-started/) to install `wrangler` and deploy their first database.

{{</Aside>}}

To specify a database to connect to when developing locally:

* Create a `HYPERDRIVE_LOCAL_CONNECTION_STRING` environmental variable with the connection string of your database.
* Set `localConnectionString` in `wrangler.toml`

```sh
HYPERDRIVE_LOCAL_CONNECTION_STRING="postgres://user:password@localhost:5432/postgres"
```

If both the `HYPERDRIVE_LOCAL_CONNECTION_STRING` environmental variable and `localConnectionString` in `wrangler.toml` are set, `wrangler dev` will use the environmental variable. 


```sh
# Confirm we are using wrangler v3.0+
$ wrangler --version
⛅️ wrangler 3.0.0

# Start a local dev session:
$ wrangler dev

# Outputs:
------------------
wrangler dev now uses local mode by default, powered by 🔥 Miniflare and 👷 workerd.
To run an edge preview session for your Worker, use wrangler dev --remote
Your worker has access to the following bindings:
- Hyperdrive:
  - HYPERDRIVE: test-db (c020574a-5623-407b-be0c-cd192bab9545)
⎔ Starting local server...

[mf:inf] Ready on http://127.0.0.1:8787/
[b] open a browser, [d] open Devtools, [l] turn off local mode, [c] clear console, [x] to exit                                                                                 │
```

In this example, the Hyperdrive binding in your Worker will connect directly to the database specified The corresponding D1 binding in your `wrangler.toml` configuration file would resemble the following:

```toml
---
header: wrangler.toml
---
[[hyperdrive]]
binding = "HYPERDRIVE"
id = "99eb9a44966446a19476c8d54be9a0bf"
```

Note that `wrangler dev` separates local and production (remote) data. A local session does not have access to your production data by default. To access your production (remote) database, pass the `--remote` flag when calling `wrangler dev`. Any changes you make when running in `--remote` mode cannot be undone.

Refer to the [`wrangler dev` documentation](/workers/wrangler/commands/#dev) to learn more about how to configure a local development session.

## Related resources

* Use [`wrangler dev`](/workers/wrangler/commands/#dev) to run your Worker and Hyperdrive locally and debug issues before deploying.
* Learn [how Hyperdrive works](/hyperdrive/configuration/how-hyperdrive-works/).
* Understand how to [configure query caching in Hyperdrive](/hyperdrive/configuration/query-caching/).
