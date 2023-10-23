---
pcx_content_type: concept
title: Connect to PostgreSQL
weight: 3
---

# Connect to Postgres

Hyperdrive supports both PostgreSQL and PostgreSQL-compatible databases, as well as [popular drivers](#supported-drivers) and the many Object Relational Mapper (ORM) libraries that use those drivers.



## Create a Hyperdrive

{{<Aside type="note">}}

New to Hyperdrive? Visit the [get started guide](/hyperdrive/get-started/) first to learn how to set up your first Hyperdrive.

{{</Aside>}}

To quickly create a Hyperdrive that connects to an existing PostgreSQL database, you can use the [wrangler](/workers/wrangler/install-and-update/) CLI or use the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers-and-pages/hyperdrive).

When using wrangler, replace the placeholder value provided to `--connection-string` with the connection string for your database:

```sh
# wrangler v3.11 and above required
$ wrangler hyperdrive create my-first-hyperdrive --connection-string="postgres://user:password@database.host.example.com:5432/databasenamehere"
```

This will output the ID of your Hyperdrive, which you will need to set in the `wrangler.toml` configuration file for your Workers project:

```toml
[[hyperdrive]]
name = "HYPERDRIVE"
id = "<your-hyperdrive-id-here>
```

This will allow Hyperdrive to generate a dynamic connection string within your Worker that you can pass to your existing database driver. See the [code examples](#driver-examples) on this page for how to set up a database driver with Hyperdrive.

Refer to the [examples documentation](/hyperdrive/examples/) for step-by-step guides on how to set up Hyperdrive with several popular database providers.

## Supported drivers

Hyperdrive uses Workers [TCP socket support](/workers/runtime-apis/tcp-sockets/#connect) to support TCP connections to databases. The following table lists the supported database drivers and the minimum version that works with Hyperdrive:

| Driver               | Docs                                 | Minimum Version Required |
| -------------------- | ------------------------------------ | ------------------------ |
| node-postgres - `pg` | https://node-postgres.com/           | `pg@8.11.0`              |
| Drizzle              | https://orm.drizzle.team/            | `0.26.2`^                |
| Kysely               | https://kysely.dev/                  | `0.26.3`^                |

^ _The marked libraries use `node-postgres` as a dependency._

Other drivers and ORMs not listed may also be supported: this list is not exhaustive.

## Supported TLS (SSL) modes

Hyperdrive supports the following [PostgreSQL TLS (SSL)](https://www.postgresql.org/docs/current/libpq-ssl.html) connection modes when connecting to your origin database:

| Mode          | Supported                       | Details                                                                                                                                   |
| ------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `none`        | No                              | Hyperdrive does not support insecure plain text connections.                                                                              |
| `prefer`      | No (use `require`)              | Hyperdrive will always use TLS.                                                                                                           |
| `require`     | Yes (default)                   | TLS is required, but server certificates are not validated.                                                                               |
| `verify-ca`   | Not currently supported in beta | Verifies the server's TLS certificate is signed by a root CA on the client. This ensures the server has a certificate the client trusts.  |
| `verify-full` | Not currently supported in beta | Identical to `verify-ca`, but also requires the database hostname must match a Subject Alternative Name (SAN) present on the certificate. |

{{<Aside type="warning" header="Beta limitation">}}

Hyperdrive does not currently support uploading client CA certificates. In the future, you will be able to provide the client CA to Hyperdrive as part of your database configuration.

{{</Aside>}}

## Driver examples

The following Workers code shows examples for `node-postgres`:

{{<tabs labels="node-postgres">}}
{{<tab label="node-postgres" default="true">}}

```sh
$ npm install pg
```

{{</tab>}}
{{</tabs>}}

The following Workers examples show you how to:

1. Create a database client in each driver.
2. Pass the Hyperdrive connection string and connect to the database.
3. Write a query.

{{<tabs labels="node-postgres">}}
{{<tab label="node-postgres" default="true">}}

```ts
---
filename: src/worker.ts
---
import { Client } from 'pg'

interface Env {
    HYPERDRIVE: Hyperdrive;
}

export default async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    // The node-postgres client accepts a 'connectionString' parameter
    const client = new Client({
      connectionString: env.HYPERDRIVE.connectionString,
    });
    await client.connect()

    const results = await client.query("SELECT * FROM users LIMIT 10")

    return Response.json(results)
}
```

{{</tab>}}
{{</tabs>}}

## Transaction and statement support

Hyperdrive's connection pooling mode is equivalent to the `transaction` mode of connection poolers like PgBouncer and PgCat.

When using Hyperdrive, the following PostgreSQL features are unsupported:

- Named prepared statements ([PostgreSQL docs](https://www.postgresql.org/docs/current/sql-prepare.html)). Note that these are distinct from the typical and common _unnamed_ prepared statements used to safely provide values to a query.
- `SET` statements 
- Advisory locks ([PostgreSQL docs](https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS))
- `LISTEN` and `NOTIFY`
- `PREPARE` and `DEALLOCATE`

In cases where you need to issue these unsupported statements from your application, Cloudflare recommends setting up a second, direct client without Hyperdrive.

## Identify connections from Hyperdrive

To identify active connections to your Postgres database server from Hyperdrive:

- Hyperdrive's connections to your database will show up with `Cloudflare Hyperdrive` as the `application_name` in the `pg_stat_activity` table.
- You can run `SELECT DISTINCT usename, application_name FROM pg_stat_activity WHERE application_name = "Cloudflare Hyperdrive"` to show whether Hyperdrive is currently holding a connection (or connections) open to your database.

## Next steps

- Refer to the list of [supported database integrations](/workers/databases/connecting-to-databases/) to understand other ways to connect to existing databases.
- Learn more about how to use the [Socket API](/workers/runtime-apis/tcp-sockets) in a Worker.
- Understand the [protocols supported by Workers](/workers/learning/protocols/).
