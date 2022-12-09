---
pcx_content_type: concept
title: Databases
---

# Databases

You can use Cloudflare Workers integrations to connect your code to external databases, such as Postgres, MySQL, FaunaDB, Supabase, MongoDB Atlas, Planetscale, Prisma, and more.

To use Cloudflare Workers integrations, you will need to install the relevant packages for the databases you want to use, and store secrets using encrypted environment variables.

{{<table-wrap>}}

| Database                                                                         | Library or Driver      | Connection Method      |
| ------------------------------------------------------------------------------- | --------- | --------- |
| [Postgres](/workers/tutorials/query-postrges-from-workers-using-database-connectors)                                                     |  deno-postgres | [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
| [MySQL](/workers/tutorials/query-postrges-from-workers-using-database-connectors) | deno-mysql         |          |
| [FaunaDB](https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers) | faunadb         | API via client library |
| [Planetscale](https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript) | @planetscale/database         | API via client library |
| [Supabase](https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript) | @planetscale/database         | API via client library |
| [Mongo](https://www.mongodb.com/developer/products/atlas/cloudflare-worker-rest-api/) | [realm-web](https://www.mongodb.com/docs/realm/web/)         | API via client library |
| [Prisma](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers) | [prisma](https://github.com/prisma/prisma)         | API via client library |
| [Neon](https://blog.cloudflare.com/neon-postgres-database-from-workers/) | [@neondatabase/serverless](https://neon.tech/blog/serverless-driver-for-postgres/) | API via client library |

{{</table-wrap>}}

Once you have installed the necessary packages, you can use the APIs provided by these packages to connect to your database and perform operations on it. See detailed links for service-specific instructions.
