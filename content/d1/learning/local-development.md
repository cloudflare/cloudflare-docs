---
title: Local development
weight: 6
pcx_content_type: concept
---

# Develop locally

D1 has fully-featured support for local development, running the same version of D1 as Cloudflare runs globally. Local development uses [Wrangler](/workers/wrangler/install-and-update/), the command-line interface for Workers, to manage local development sessions and state.

## Start a local development session

{{<Aside type="note">}}

This guide assumes you are using [Wrangler v3.0](https://blog.cloudflare.com/wrangler3/) or later.

Users new to D1 and/or Cloudflare Workers should visit the [D1 tutorial](/d1/get-started/) to install `wrangler` and deploy their first database.

{{</Aside>}}

Local development sessions create a standalone, local-only environment that mirrors the production environment D1 runs in so that you can test your Worker and D1 _before_ you deploy to production.

An existing [D1 binding](/workers/wrangler/configuration/#d1-database) of `DB` would be available to your Worker when running locally.

To start a local development session:

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
- D1 Databases:
  - DB: test-db (c020574a-5623-407b-be0c-cd192bab9545)
⎔ Starting local server...

[mf:inf] Ready on http://127.0.0.1:8787/
[b] open a browser, [d] open Devtools, [l] turn off local mode, [c] clear console, [x] to exit                                                                                 │
```

In this example, the Worker has access to local-only D1 database. The corresponding D1 binding in your `wrangler.toml` configuration file would resemble the following:

```toml
---
header: wrangler.toml
---
[[d1_databases]]
binding = "DB"
database_name = "test-db"
database_id = "c020574a-5623-407b-be0c-cd192bab9545"
```

Note that `wrangler dev` separates local and production (remote) data. A local session does not have access to your production data by default. To access your production (remote) database, pass the `--remote` flag when calling `wrangler dev`. Any changes you make when running in `--remote` mode cannot be undone.

Refer to the [`wrangler dev` documentation](/workers/wrangler/commands/#dev) to learn more about how to configure a local development session.

## Persist data

**By default, in wrangler `3.0.0` and above, data is persisted across each run of `wrangler dev`**. If your local development and testing requires or assumes an empty database, you should start with a `DROP TABLE <tablename>` statement to delete existing tables before using `CREATE TABLE` to re-create them.

Use `wrangler dev --persist-to=/path/to/file` to persist data to a specific location. This can be useful when working in a team (allowing you to share) the same copy, when deploying via CI/CD (to ensure the same starting state), or as a way to keep data when migrating across machines.

Users of wrangler `2.x` must use the `--persist` flag: previous versions of wrangler did not persist data by default.

## Related resources

* Use [`wrangler dev`](/workers/wrangler/commands/#dev) to run your Worker and D1 locally and debug issues before deploying.
* Learn [how to debug D1](/d1/learning/debug-d1/).
* Understand how to [access logs](/workers/learning/logging-workers/) generated from your Worker and D1.
