---
pcx_content_type: concept
title: Connect to databases
weight: 1
meta:
  description: Learn about the different kinds of database integrations Cloudflare supports.
---

# Connect to databases

Cloudflare Workers can connect to and query your data in both SQL and NoSQL databases, including:

* Traditional hosted relational databases, including Postgres and MySQL.
* Serverless databases: Supabase, MongoDB Atlas, PlanetScale, FaunaDB, and Prisma.
* Cloudflare's own [D1](/d1/), a serverless SQL-based database.

{{<table-wrap>}}

| Database                                                                         | Integration |  Library or Driver      | Connection Method      |
| ------------------------------------------------------------------------------- | ----- | --------- | --------- |
| [Postgres](/workers/tutorials/postgres/) | - |  [node-postgres](https://node-postgres.com/) | [Hyperdrive](/hyperdrive/) |
| [Postgres](/workers/tutorials/postgres/) | - |  [deno-postgres](https://github.com/cloudflare/worker-template-postgres) | [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) |
| [MySQL](/workers/tutorials/postgres/) | - | [deno-mysql](https://github.com/cloudflare/worker-template-mysql) |  [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/) |
| [FaunaDB](https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers) | No |  [faunadb](https://github.com/fauna/faunadb-js)         | API via client library |
| [PlanetScale](https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript) | [Yes](/workers/databases/native-integrations/planetscale/) |[@planetscale/database](https://github.com/planetscale/database-js)         | API via client library |
| [Supabase](https://github.com/supabase/supabase/tree/master/examples/with-cloudflare-workers) | [Yes](/workers/databases/native-integrations/supabase/) | [@supabase/supabase-js](https://github.com/supabase/supabase-js)         | API via client library |
| [Mongo](https://www.mongodb.com/developer/products/atlas/cloudflare-worker-rest-api/) | No | [realm-web](https://www.mongodb.com/docs/realm/web/)         | API via client library |
| [Prisma](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers) | No |  [prisma](https://github.com/prisma/prisma)         | API via client library |
| [Neon](https://blog.cloudflare.com/neon-postgres-database-from-workers/) | [Yes](/workers/databases/native-integrations/neon/) | [@neondatabase/serverless](https://neon.tech/blog/serverless-driver-for-postgres/) | API via client library |
| [Hasura](https://hasura.io/blog/building-applications-with-cloudflare-workers-and-hasura-graphql-engine/) | No | API | GraphQL API via fetch() |
| [Upstash Redis](https://blog.cloudflare.com/cloudflare-workers-database-integration-with-upstash/) | [Yes](/workers/databases/native-integrations/upstash/) | [@upstash/redis](https://github.com/upstash/upstash-redis) | API via client library |
| [TiDB Cloud](https://docs.pingcap.com/tidbcloud/integrate-tidbcloud-with-cloudflare)                      | No                                                       | [@tidbcloud/serverless](https://github.com/tidbcloud/serverless-js)               | API via client library                       |

{{</table-wrap>}}

{{<Aside type="note">}}
If you do not see an integration listed or have an integration to add, complete and submit the [Cloudflare Developer Platform Integration form](https://forms.gle/iaUqLWE8aezSEhgd6).
{{</Aside>}} 

Once you have installed the necessary packages, use the APIs provided by these packages to connect to your database and perform operations on it. Refer to detailed links for service-specific instructions.

## Connect to a database from a Worker

There are four ways to connect to a database from a Worker:

1. With [Hyperdrive](/hyperdrive/) (recommended), which dramatically speeds up accessing traditional databases. Hyperdrive currently supports PostgreSQL and PostgreSQL-compatible database providers.
2. [Database Integrations](/workers/databases/native-integrations/): Simplifies authentication by managing credentials on your behalf and includes support for PlanetScale, Neon and Supabase.
3. [TCP Socket API](/workers/runtime-apis/tcp-sockets): A direct TCP connection to a database. TCP is the de-facto standard protocol that many databases, such as PostgreSQL and MySQL, use for client connectivity.
4. HTTP- or WebSocket-based serverless drivers: Many hosted databases support a HTTP or WebSocket API to enable either clients to connect from environments that do not support TCP, or as their preferred connection protocol.

## Authentication

If your database requires authentication, use Wrangler secrets to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [`wrangler secret`](/workers/wrangler/commands/#secret) command:

```sh
$ wrangler secret put <SECRET_NAME>
```

Then, retrieve the secret value in your code using the following code snippet:

```js
const secretValue = env.<SECRET_NAME>;
```

Use the secret value to authenticate with the external service. For example, if the external service requires an API key or database username and password for authentication, include these in using the relevant service's library or API.

For services that require mTLS authentication, use [mTLS certificates](/workers/runtime-apis/bindings/mtls) to present a client certificate.

## Next steps

* Learn how to connect to [an existing PostgreSQL database](/hyperdrive/) with Hyperdrive.
* Discover [other storage options available](/workers/platform/storage-options/) for use with Workers.
* [Create your first database](/d1/get-started/) with Cloudflare D1.
