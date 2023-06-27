---
pcx_content_type: navigation
title: Databases
weight: 8
layout: single
---

# Databases

Use Cloudflare Workers to connect your application to external databases, such as Postgres, MySQL, FaunaDB, Supabase, MongoDB Atlas, PlanetScale, Prisma, and more. To use these Cloudflare Workers integrations, you need to install the relevant packages for the databases you want to use. For more information on ways to connect, refer to [Connect to databases](/workers/databases/connecting-to-databases/).

## Overview

{{<table-wrap>}}

| Database                                                                         |Native Integration |  Library or Driver      | Connection Method      |
| ------------------------------------------------------------------------------- | ----- | --------- | --------- |
| [Postgres](/workers/tutorials/postgres/) | - |  [node-postgres](https://node-postgres.com/) | [Workers Socket API](/workers/runtime-apis/tcp-sockets/) |
| [Postgres](/workers/tutorials/postgres/) | - |  [deno-postgres](https://github.com/cloudflare/worker-template-postgres) | [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
| [MySQL](/workers/tutorials/postgres/) | - | [deno-mysql](https://github.com/cloudflare/worker-template-mysql) |  [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
| [FaunaDB](https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers) | No |  [faunadb](https://github.com/fauna/faunadb-js)         | API via client library |
| [PlanetScale](https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript) | [Yes](/workers/learning/integrations/databases/#planetscale) |[@planetscale/database](https://github.com/planetscale/database-js)         | API via client library |
| [Supabase](https://github.com/supabase/examples-archive/tree/main/supabase-js-v1/with-cloudflare-workers) | [Yes](/workers/learning/integrations/databases/#supabase) | [@supabase/supabase-js](https://github.com/supabase/supabase-js)         | API via client library |
| [Mongo](https://www.mongodb.com/developer/products/atlas/cloudflare-worker-rest-api/) | No | [realm-web](https://www.mongodb.com/docs/realm/web/)         | API via client library |
| [Prisma](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers) | No |  [prisma](https://github.com/prisma/prisma)         | API via client library |
| [Neon](https://blog.cloudflare.com/neon-postgres-database-from-workers/) | [Yes](/workers/learning/integrations/databases/#neon) | [@neondatabase/serverless](https://neon.tech/blog/serverless-driver-for-postgres/) | API via client library |
| [Hasura](https://hasura.io/blog/building-applications-with-cloudflare-workers-and-hasura-graphql-engine/) | No | API | GraphQL API via fetch() |

{{</table-wrap>}}

{{<Aside type="note">}}
If you do not see an integration listed or have an integration to add, complete and submit the [Cloudflare Developer Platform Integration form](https://forms.gle/iaUqLWE8aezSEhgd6).
{{</Aside>}} 

Once you have installed the necessary packages, use the APIs provided by these packages to connect to your database and perform operations on it. Refer to detailed links for service-specific instructions.

## Authentication

If your database requires authentication, use Wrangler secrets to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [`wrangler secret`](/workers/wrangler/commands/#secret) command:

```sh
wrangler secret put SECRET_NAME
```

Then, retrieve the secret value in your code using the following code snippet:

```js
const secretValue = env.SECRET_NAME;
```

Use the secret value to authenticate with the external service. For example, if the external service requires an API key or database username and password for authentication, include these in using the relevant service's library or API.

For services that require mTLS authentication, use [mTLS certificates](/workers/runtime-apis/mtls) to present a client certificate.

