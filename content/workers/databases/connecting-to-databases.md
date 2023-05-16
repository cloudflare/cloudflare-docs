---
pcx_content_type: concept
title: Connecting to databases
weight: 1
---

# Connecting to databases

Cloudflare Workers can connect to and query your data in both SQL and NoSQL databases, including:

* Traditional hosted relational databases, including Postgres and MySQL
* Serverless databases: Supabase, MongoDB Atlas, PlanetScale, FaunaDB, and Prisma
* Cloudflare's own [D1](/d1/), a serverless SQL-based database

## Ways to connect

There are three ways to connect to a database from a Worker:

1. [Native integrations](/workers/learning/integrations/databases/#native-database-integrations-beta), which includes support for PlanetScale, Neon and Supabase.
2. [TCP Socket API](/workers/runtime-apis/tcp-sockets): a direct TCP connection to a database. TCP is the de-facto standard protocol that many databases, such as [PostgreSQL](/workers/databases/connect-to-postgres/), use for client connectivity.
3. [Serverless drivers](/workers/learning/integrations/databases/): many hosted databases support a HTTP API to enable clients to connect in environments that don't support TCP natively.

## Next steps

* Learn how to connect to [an existing PostgreSQL database](/workers/databases/connect-to-postgres/).
* Discover [other storage options available](/workers/platform/storage-options/) for use with Workers.
* [Create your first database](/d1/get-started/) with Cloudflare D1.
