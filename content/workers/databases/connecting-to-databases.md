---
pcx_content_type: concept
<<<<<<< HEAD
title: Connect to databases
weight: 1
---

# Connect to databases

Cloudflare Workers can connect to and query your data in both SQL and NoSQL databases, including:

* Traditional hosted relational databases, including Postgres and MySQL.
* Serverless databases: Supabase, MongoDB Atlas, PlanetScale, FaunaDB, and Prisma.
* Cloudflare's own [D1](/d1/), a serverless SQL-based database.

## Connect to a database from a Worker

There are three ways to connect to a database from a Worker:

1. [Database Integrations](/workers/learning/integrations/databases/#native-database-integrations-beta): Simplifies authentication by managing credentials on your behalf and includes support for PlanetScale, Neon and Supabase.
2. [TCP Socket API](/workers/runtime-apis/tcp-sockets): A direct TCP connection to a database. TCP is the de-facto standard protocol that many databases, such as [PostgreSQL](/workers/databases/connect-to-postgres/) and MySQL, use for client connectivity.
3. HTTP- or WebSocket-based [serverless drivers](/workers/learning/integrations/databases/): Many hosted databases support a HTTP or WebSocket API to enable either clients to connect from environments that do not support TCP, or as their preferred connection protocol.

## Next steps

* Learn how to connect to [an existing PostgreSQL database](/workers/databases/connect-to-postgres/).
* Discover [other storage options available](/workers/platform/storage-options/) for use with Workers.
* [Create your first database](/d1/get-started/) with Cloudflare D1.
=======
title: Connecting to databases
weight: 1
---

# Connecting to databases

Cloudflare Workers can connect to and query external databases, including Postgres, MySQL, FaunaDB, Supabase, MongoDB Atlas, PlanetScale, and Prisma, allowing you to build full-stack applications directly on Cloudflare.

## Connection methods

There are two ways to connect to a database from a Worker:

1. Socket API (beta): a direct TCP connection to a database. TCP is the de-facto standard protocol that many databases, including PostgreSQL and MySQL, for client connectivity.
2. Serverless drivers: many hosted databases support a HTTP API to enable clients to connect in environments that don't support TCP natively.

## Database drivers

The following table lists databases and their currently supported connection methods:

{{<table-wrap>}}

| Database                                                                         | Library or Driver      | Connection Method      |
| ------------------------------------------------------------------------------- | --------- | --------- |
| [Postgres](/workers/tutorials/query-postgres-from-workers-using-database-connectors/) |  [deno-postgres](https://github.com/cloudflare/worker-template-postgres) | [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
| [MySQL](/workers/tutorials/query-postgres-from-workers-using-database-connectors/) | [deno-mysql](https://github.com/cloudflare/worker-template-mysql) |  [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
| [FaunaDB](https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers) | [faunadb](https://github.com/fauna/faunadb-js)         | API via client library |
| [PlanetScale](https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript) | [@planetscale/database](https://github.com/planetscale/database-js)         | API via client library |
| [Supabase](https://github.com/supabase/examples-archive/tree/main/supabase-js-v1/with-cloudflare-workers) | [@supabase/supabase-js](https://github.com/supabase/supabase-js)         | API via client library |
| [Mongo](https://www.mongodb.com/developer/products/atlas/cloudflare-worker-rest-api/) | [realm-web](https://www.mongodb.com/docs/realm/web/)         | API via client library |
| [Prisma](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers) | [prisma](https://github.com/prisma/prisma)         | API via client library |
| [Neon](https://blog.cloudflare.com/neon-postgres-database-from-workers/) | [@neondatabase/serverless](https://neon.tech/blog/serverless-driver-for-postgres/) | API via client library |
| [Hasura](https://hasura.io/blog/building-applications-with-cloudflare-workers-and-hasura-graphql-engine/) | API | GraphQL API via fetch() |

{{</table-wrap>}}

{{<Aside type="note">}}
If you do not see an integration listed or have an integration to add, complete and submit the [Cloudflare Developer Platform Integration form](https://forms.gle/iaUqLWE8aezSEhgd6).
{{</Aside>}}

Once you have installed the necessary packages, use the APIs provided by these packages to connect to your database and perform operations on it. Refer to detailed links for service-specific instructions.

## Authentication

If your database requires authentication, use [Secrets](/workers/platform/environment-variables/#add-secrets-to-your-project) to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [`wrangler secret`](/workers/wrangler/commands/#secret) command:

```sh
wrangler secret put SECRET_NAME
```

Then, retrieve the secret value in your code using the following code snippet:

```js
const secretValue = env.SECRET_NAME;
```

Use the secret value to authenticate with the external service. For example, if the external service requires an API key or database username and password for authentication, include these in using the relevant service's library or API.

For services that require Mutual TLS (mTLS) authentication, use Worker's support for [mTLS certificates](/workers/runtime-apis/mtls) to present a client certificate to the upstream server.
>>>>>>> ffc9a40bb (workers: new Databases sidebar section)
