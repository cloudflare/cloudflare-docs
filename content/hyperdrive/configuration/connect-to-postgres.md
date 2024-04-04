---
pcx_content_type: concept
title: Connect to PostgreSQL
weight: 3
---

# Connect to Postgres

Hyperdrive supports PostgreSQL and PostgreSQL-compatible databases, [popular drivers](#supported-drivers) and Object Relational Mapper (ORM) libraries that use those drivers.

## Create a Hyperdrive

{{<Aside type="note">}}

New to Hyperdrive? Refer to the [Get started guide](/hyperdrive/get-started/) to learn how to set up your first Hyperdrive.

{{</Aside>}}

To create a Hyperdrive that connects to an existing PostgreSQL database, use the [wrangler](/workers/wrangler/install-and-update/) CLI or the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers-and-pages/hyperdrive).

When using wrangler, replace the placeholder value provided to `--connection-string` with the connection string for your database:

```sh
# wrangler v3.11 and above required
$ npx wrangler hyperdrive create my-first-hyperdrive --connection-string="postgres://user:password@database.host.example.com:5432/databasenamehere"
```

The command above will output the ID of your Hyperdrive, which you will need to set in the `wrangler.toml` configuration file for your Workers project:

```toml
node_compat = true # required for database drivers to function

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "<your-hyperdrive-id-here>"
```

This will allow Hyperdrive to generate a dynamic connection string within your Worker that you can pass to your existing database driver. Refer to [Driver examples](#driver-examples) to learn how to set up a database driver with Hyperdrive.

Refer to the [Examples documentation](/hyperdrive/examples/) for step-by-step guides on how to set up Hyperdrive with several popular database providers.

## Supported drivers

Hyperdrive uses Workers [TCP socket support](/workers/runtime-apis/tcp-sockets/#connect) to support TCP connections to databases. The following table lists the supported database drivers and the minimum version that works with Hyperdrive:

| Driver               | Documentation              | Minimum Version Required | Notes                    |
| -------------------- | -------------------------- | ------------------------ |  ----------------------- | 
| node-postgres - `pg` | https://node-postgres.com/ | `pg@8.11.0`              |                           |
| Postgres.js          | https://github.com/porsager/postgres | `postgres@3.43.1` | Must pass `prepare: false` when creating the client. |
| Drizzle              | https://orm.drizzle.team/  | `0.26.2`^                |                           |
| Kysely               | https://kysely.dev/        | `0.26.3`^                |                           |

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

### node-postgres / pg

The following Workers code shows an example for `node-postgres`:

```sh
---
header: node-postgres
---
$ npm install pg
```

The following Workers examples show you how to:

1. Create a database client with a database driver.
2. Pass the Hyperdrive connection string and connect to the database.
3. Write a query.

{{<tabs labels="node-postgres">}}
{{<tab label="node-postgres" default="true">}}

```ts
---
filename: src/index.ts
---
import { Client } from 'pg';

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "HYPERDRIVE" with the variable name you defined.
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		// Create a database client that connects to your database via Hyperdrive
		// Hyperdrive generates a unique connection string you can pass to
		// supported drivers, including node-postgres, Postgres.js, and the many
		// ORMs and query builders that use these drivers.
		const client = new Client({
			host: env.HYPERDRIVE.host,
			user: env.HYPERDRIVE.user,
			password: env.HYPERDRIVE.password,
			port: Number(env.HYPERDRIVE.port),
			database: env.HYPERDRIVE.database
		})

		try {
			// Connect to your database
			await client.connect();

			// A very simple test query
			const result = await client.query({ text: 'SELECT * FROM pg_tables' });

			// Return result rows as JSON
			return Response.json({ result: result });
		} catch (e) {
			console.log(e);
			return Response.json({ error: JSON.stringify(e) }, { status: 500 });
		}
	},
};
```

{{</tab>}}
{{</tabs>}}

### Postgres.js

The following Workers code shows an example for [Postgres.js](https://github.com/porsager/postgres):

```sh
---
header: postgres.js
---
$ npm install postgres
```

The following Workers examples show you how to:

1. Create a database client with a database driver.
2. Pass the Hyperdrive connection string and connect to the database.
3. Write a query.

{{<tabs labels="postgres-js">}}
{{<tab label="postgres-js" default="true">}}

```ts
---
filename: src/index.ts
---
import postgres from "postgres";

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "HYPERDRIVE" with the variable name you defined.
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    // Important: Set `prepare: false` as Postgres.js named prepared statements
    // are not compatible with connection pooling systems like Hyperdrive
    const sql = postgres(env.HYPERDRIVE.connectionString, { prepare: false })

		try {
			// A very simple test query
			const result = await sql`select * from pg_tables`

			// Return result rows as JSON
			return Response.json({ result: result });
		} catch (e) {
			console.log(e);
			return Response.json({ error: JSON.stringify(e) }, { status: 500 });
		}
	},
};
```

{{</tab>}}
{{</tabs>}}

## Transaction and statement support

Hyperdrive's connection pooling mode is equivalent to the `transaction` mode of connection poolers like [PgBouncer](https://www.pgbouncer.org/) and [PgCat](https://github.com/postgresml/pgcat).

Hyperdrive does not support the following PostgreSQL features:

- Named prepared statements ([PostgreSQL docs](https://www.postgresql.org/docs/current/sql-prepare.html)). These are distinct from the typical and common _unnamed_ prepared statements used to safely provide values to a query.
- `SET` statements.
- Advisory locks ([PostgreSQL documentation](https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS)).
- `LISTEN` and `NOTIFY`.
- `PREPARE` and `DEALLOCATE`.

In cases where you need to issue these unsupported statements from your application, the Hyperdrive team recommends setting up a second, direct client without Hyperdrive.

## Identify connections from Hyperdrive

To identify active connections to your Postgres database server from Hyperdrive:

- Hyperdrive's connections to your database will show up with `Cloudflare Hyperdrive` as the `application_name` in the `pg_stat_activity` table.
- Run `SELECT DISTINCT usename, application_name FROM pg_stat_activity WHERE application_name = 'Cloudflare Hyperdrive'` to show whether Hyperdrive is currently holding a connection (or connections) open to your database.

## Next steps

- Refer to the list of [supported database integrations](/workers/databases/connecting-to-databases/) to understand other ways to connect to existing databases.
- Learn more about how to use the [Socket API](/workers/runtime-apis/tcp-sockets) in a Worker.
- Understand the [protocols supported by Workers](/workers/reference/protocols/).
