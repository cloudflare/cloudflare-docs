---
pcx_content_type: concept
title: Connecting to Databases
weight: 1
---

# Connecting to Databases

Cloudflare Workers can connect to and query external databases, including Postgres, MySQL, FaunaDB, Supabase, MongoDB Atlas, PlanetScale, and Prisma, allowing you to build full-stack applications directly on Cloudflare.

This page documents how to connect to 

## Connection methods

There are two ways to connect to a database from a Worker:

1. Socket API (beta): a direct TCP connection. Connection pooling needed on the server-side.
2. Serverless drivers: many hosted database platforms provide a HTTP interface, accessed via the standard `fetch()` API in Workers and other serverless platforms.

## Using the Socket API

{{<Aside type="note">}}
The {{<beta>}}[Socket API](){{</beta>}} is currently in beta.
{{</Aside>}}

TODO - a brief demo on using the Socket API vs. Node.js net.Socket


### Connection pooling & re-use

Connection pooling 

### Private connectivity

TODO

## Database drivers

The following table lists databases and their currently supported connection methods:

{{<table-wrap>}}

| Database                                                                        | Library or Driver      | Connection Method      |
| ------------------------------------------------------------------------------- | ---------------------- | ---------------------- |
| PostgreSQL                                                                      | [node-postgres]()      | Socket API             |
| [Postgres](/workers/tutorials/query-postgres-from-workers-using-database-connectors/) | [deno-postgres](https://github.com/cloudflare/worker-template-postgres) | [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
| MySQL                                                                           | [deno-mysql](https://github.com/cloudflare/worker-template-mysql) |  [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
| [FaunaDB](https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers) | [faunadb](https://github.com/fauna/faunadb-js)         | API via client library |
| [PlanetScale](https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript) | [@planetscale/database](https://github.com/planetscale/database-js)         | API via client library |
| [Supabase](https://github.com/supabase/examples-archive/tree/main/supabase-js-v1/with-cloudflare-workers) | [@supabase/supabase-js](https://github.com/supabase/supabase-js)         | API via client library |
| [Mongo](https://www.mongodb.com/developer/products/atlas/cloudflare-worker-rest-api/) | [realm-web](https://www.mongodb.com/docs/realm/web/)         | API via client library |
| [Prisma](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers) | [prisma](https://github.com/prisma/prisma)         | API via client library |
| [Neon](https://blog.cloudflare.com/neon-postgres-database-from-workers/) | [@neondatabase/serverless](https://neon.tech/blog/serverless-driver-for-postgres/) | API via client library |
| [Hasura](https://hasura.io/blog/building-applications-with-cloudflare-workers-and-hasura-graphql-engine/) | API | GraphQL API via fetch() |
| [Turso]()                                                                        | [libsql](https://docs.turso.tech/reference/client-access/javascript-typescript-sdk) | HTTP via fetch() |

{{</table-wrap>}}

{{<Aside type="note">}}V
If you do not see an integration listed or have an integration to add, complete and submit the [Cloudflare Developer Platform Integration form](https://forms.gle/iaUqLWE8aezSEhgd6).
{{</Aside>}}

## Securing database credentials

TODO: re-write this (most DBs do require auth!) and show an example of a connection string being stored -> retrieved.

If your database requires authentication, use [Secrets](/workers/platform/environment-variables/#add-secrets-to-your-project) to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [`wrangler secret`](/workers/wrangler/commands/#secret) command:

```sh
wrangler secret put SECRET_NAME
```

Then, retrieve the secret value in your code using the following code snippet:

```js
const secretValue = env.SECRET_NAME;
```
