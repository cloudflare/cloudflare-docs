---
pcx_content_type: concept
title: Connect to PostgreSQL
weight: 2
---

# Connect to PostgreSQL (beta)

Cloudflare Workers supports direct connectivity to PostgreSQL instances over the Transmission Control Protocol (TCP) using the [Socket API](/workers/runtime-apis/tcp-sockets), and via serverless drivers that enable HTTP access.

This guide demonstrates how to use the Socket API and the `pg` JavaScript driver to connect to a PostgreSQL server from your Workers.

## Requirements

{{<Aside type="note">}}

Ensure you are using `pg` (node-postgres) version `8.11.0` or higher. Earlier versions do not support the Workers Socket API.

{{</Aside>}}

To connect to a Postgres database from a Worker:

* Install the `pg` library. The [node-postgres](https://node-postgres.com/) (often referred to as `pg`) library has built-in support for the Workers [Socket API](/workers/runtime-apis/tcp-sockets) and enable [`node_compat`](/workers/wrangler/configuration/#add-polyfills-using-wrangler) for your project.
* Ensure your database is reachable from public IP addresses (refer to [Caveats](#caveats)).
* Confirm that [SSL is configured](https://www.postgresql.org/docs/current/libpq-ssl.html#LIBPQ-SSL-PROTECTION) on your Postgres instance for security.

## Connect to a Postgres database

There are two ways to connect to a Postgres database:

* [Use a connection string](/workers/databases/connect-to-postgres/#use-a-connection-string) - for example, `postgresql://username:password@ep-aged-sound-175961.us-east-2.aws.neon.tech/neondb`.
* [Set explicit parameters](/workers/databases/connect-to-postgres/#set-explicit-host-and-port-parameters) (username, password, host, port and database name).

### Use a connection string

A connection string combines the username, password, host, port and (optional) database name as a single URL-like string.

To set your connection string as a [secret](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-secrets-to-your-project) so that it is not stored as plain text, use [`wrangler secret put`](/workers/wrangler/commands/#secret). `DB_URL` is an example variable name for this secret to be accessed in your Worker:

```sh
$ wrangler secret put DB_URL
➜  wrangler secret put DB_URL
-------------------------------------------------------
? Enter a secret value: › ********************
✨ Success! Uploaded secret DB_URL
```

```ts
const client = new Client(env.DB_URL);
await client.connect()
// Ready to query
const result = await client.query({
  text: "SELECT * FROM tablename"
})
```

### Set explicit host and port parameters

You can pass parameters one-by-one to the `pg` client instead of providing a connection string. These parameters can be configured as [environmental variables](/workers/configuration/environment-variables/) via the [dashboard](/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard) or via [`wrangler.toml`](/workers/configuration/environment-variables/#add-environment-variables-via-wrangler), as follows:

```toml
---
filename: wrangler.toml
---

[vars]
DB_USERNAME = "postgres"
# Set your password by creating a Secret so it is not stored as plain text
DB_HOST = "ep-aged-sound-175961.us-east-2.aws.neon.tech"
DB_PORT = "5432"
DB_NAME = "neondb"
```

To set your password as a [secret](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-secrets-to-your-project) so that it is not stored as plain text, use [`wrangler secret put`](/workers/wrangler/commands/#secret). `DB_PASSWORD` is an example variable name for this secret to be accessed in your Worker:

```sh
$ wrangler secret put DB_PASSWORD
-------------------------------------------------------
? Enter a secret value: › ********************
✨ Success! Uploaded secret DB_PASSWORD
```

You can then pass the environmental variables set in your `wrangler.toml` and the password configured as a secret to `pg` when creating a new `Client` instance:

```ts
const client = new Client({
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME
})
await client.connect()
```

### SSL modes

The Socket API currently supports the below SSL modes in PostgreSQL:

{{<table-wrap>}}

| SSL Mode                                            | Currently Supported                              |
| --------------------------------------------------- | ------------------------------------------------ |
| `disable`                                           | Supported (not recommended: insecure)            |
| `allow`                                             | Supported                                       |
| `prefer`                                            | Supported                                       |
| `require`                                           | Supported (**recommended**)                     |
| `verify-ca`                                         | Not yet supported (requires Mutual TLS)         |
| `verify-full`                                       | Not yet supported (requires Mutual TLS)         |

{{</table-wrap>}}

The [PostgreSQL documentation](https://www.postgresql.org/docs/current/libpq-ssl.html#LIBPQ-SSL-PROTECTION) explains each connection mode in further detail.

## Full example

The below example queries a public Postgres database made available by [RNACentral](https://rnacentral.org/help/public-database), which is available at `postgres://reader:NWDMCE5xdipIjRrp@hh-pgsql-public.ebi.ac.uk:5432/pfmegrnargs`.

To run the example:

* Install the `pg` library via `npm install pg`.
* Enable [`node_compat`](/workers/wrangler/configuration/#add-polyfills-using-wrangler) for your Worker project.
* Provide the connection string as a secret via [`wrangler secret put DB_URL`](/workers/wrangler/commands/#secret).

```toml
---
filename: wrangler.toml
---
# Ensure you enable Node.js compatibility to your project
node_compat = true
```

```ts
---
filename: index.ts
---

import { Client } from "pg";

export interface Env {
  // This should be a valid Postgres connection string
  // For example, "postgres://reader:NWDMCE5xdipIjRrp@hh-pgsql-public.ebi.ac.uk:5432/pfmegrnargs"
  // Use `wrangler secret put DB_URL` to configure a Secret with your connection string
  DB_URL: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/favicon.ico")
      return new Response(null, { status: 404 });

    var client = new Client(env.DB_URL);
    await client.connect();

    // Query the RNA database!
    const result = await client.query({
      text: "SELECT * FROM rnc_database LIMIT 10",
    });
    console.log(JSON.stringify(result.rows));
    const resp = Response.json(result.rows);

    // Clean up the client, ensuring we don't kill the worker before that is
    // completed.
    ctx.waitUntil(client.end());
    return resp;
  },
};
```

## Caveats

There are some caveats to be aware of during the beta release of PostgreSQL support with Workers, including:

### Connection pooling & startup

Each Worker invocation currently establishes a new connection to your database, which will introduce additional latency during this beta release. Since many PostgreSQL instances also have limits on the number of concurrent connections they can support, we recommend enabling connection pooling with your database provider or configuring [PgBouncer](https://www.pgbouncer.org/) in front of it. Instances may otherwise be at risk of running out of memory due to how PostgreSQL allocations memory per client connection.

### Access control

Connectivity to your database is over the public Internet. You may need to allow access to your database from outside the private network and/or VPC network it is configured on before you can connect to it from a Worker.

### Mutual TLS support

As documented in the [supported connection modes](#connect-to-a-postgres-database), SSL modes that require support for TLS client certificates are not yet supported.

### ORM (Object Relational Mapper) library version requirement

ORM libraries that use `pg` as their underlying driver will need to be updated to support version `8.11.0` or higher to work within a Worker.

Follow the [changelog](/workers/platform/changelog/) for updates to these caveats.

## Provider-specific configuration

{{<table-wrap>}}

| Provider                                            | Notes                                           |
| --------------------------------------------------- | ----------------------------------------------- |
| [Neon](https://neon.tech/docs/connect/connect-from-any-app) | Enable [connection pooling](https://neon.tech/docs/connect/connection-pooling#enable-connection-pooling) for your Neon database by adding the `-pooler` suffix to your database endpoint ID. |
| [Supabase](https://supabase.com/docs/guides/database/connecting-to-postgres#finding-your-connection-string) | Ensure you are using port `6543` to use [connection pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#how-connection-pooling-works) with your Supabase database. Supabase also provides a [HTTP API](https://supabase.com/docs/guides/database/connecting-to-postgres#api) that can be accessed directly via Workers. |
| AWS RDS / Aurora                                    | Use [RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html) to enable connection pooling and ensure your Security Group allows connections from the public Internet. |
| Google Cloud SQL                                    | Configure a [public IP](https://cloud.google.com/sql/docs/mysql/configure-ip) for your instance and add an authorized address range (`0.0.0.0/0`) to allow (authenticated) access over the public Internet. |

{{</table-wrap>}}

## Next steps

* Refer to the list of [supported database integrations](/workers/databases/connecting-to-databases/) to understand other ways to connect to existing databases.
* Learn more about how to use the [Socket API](/workers/runtime-apis/tcp-sockets) in a Worker.
* Understand the [protocols supported by Workers](/workers/learning/protocols/).
