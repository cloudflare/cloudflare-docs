---
type: example
summary: Connect Hyperdrive to Exograph.
pcx_content_type: tutorial
title: Connect to Exograph
weight: 12
---

# Connect to Exograph

This example shows you how to use [Exograph](https://exograph.dev) to build an API server that connects to a Postgres database through Hyperdrive.

## Create a new Exograph project

To create a new Exograph project, install the Exograph CLI following instructions from its [documentation](https://exograph.dev/docs/getting-started#install-exograph).

Next, create a new project by running the following command:

```sh
exo new todo
cd todo
```

If you wish, you can launch this project locally by running (requires that you have a local Postgres database or Docker installed):

```sh
exo yolo
```

You can try the typical queries, such as creating a new todo. See the [Getting Started](../getting-started#using-the-graphiql-interface) for more details.

## Create deployment configuration

Exograph CLI includes a command to simplify deploying to Cloudflare Workers.

```
exo deploy cf-worker
```

This creates the WebAssembly binaries, wrangler.toml, and .dev.vars to configure the application. The `wrangler.toml` file defines environment variables and bindings for your production deployment. The `.dev.vars` file contains the environment variables for local development.

## Preparing the database

Before you try accessing the application, you must connect the worker to a Postgres database. You can do so by provisioning a Postgres database and setting the `EXO_POSTGRES_URL` secret:

```sh
exo secret set EXO_POSTGRES_URL <postgres-database-url>
```

Alternatively, for database providers like Neon and Supabase, you can use the Cloudflare Workers "Integration" tab, click "Add Integration", and follow the instructions. The result will be setting the `DATABASE_URL` secret for you.

Next, run the database migrations to create the necessary tables in the database.

```sh
exo schema migrate --database <postgres-database-url> --apply-to-database
```

You can now deploy the worker to Cloudflare Workers.

```sh
npx wrangler deploy
```

That's it! You now have a GraphQL server connected to a Postgres database running on Cloudflare Workers.

If you wish to play with the APIs, launch the playground by running the following command:

```sh
exo playground --endpoint <cloudflare-worker-url>
```

Let's improve its performance by using Hyperdrive.

## Configuring Hyperdrive

With the earlier configuration, the Exograph worker connected directly to the database. Due to the ephemeral nature of Cloudflare Workers, every request establishes a new connection to the database, which can be slow. We can improve the latency through [Hyperdrive](https://developers.cloudflare.com/hyperdrive/).

To set up a Hyperdrive, use the `npx wrangler hyperdrive create` command or the Cloudflare Worker's dashboard. Then add the following to your `wrangler.toml` (you will get the `id` from the command output or the Hyperdrive dashboard):

```toml
EXO_HYPERDRIVE_BINDING = "<binding-name>"

[[hyperdrive]]
binding = "<binding-name>"
id = "..."
```

The worker will now use Hyperdrive to manage the database connections, significantly reducing the latency.
