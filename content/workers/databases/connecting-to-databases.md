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

1. [Database Integrations](/workers/learning/integrations/databases/#native-database-integrations-beta), which simply authentication by managing credentials on your behalf and includes support for PlanetScale, Neon and Supabase.
2. [TCP Socket API](/workers/runtime-apis/tcp-sockets): a direct TCP connection to a database. TCP is the de-facto standard protocol that many databases, such as [PostgreSQL](/workers/databases/connect-to-postgres/) and MySQL, use for client connectivity.
3. HTTP- or WebSocket-based [serverless drivers](/workers/learning/integrations/databases/): many hosted databases support a HTTP or WebSocket API to enable either clients to connect from environments that don't support TCP, or as their preferred connection protocol.

## Next steps

* Learn how to connect to [an existing PostgreSQL database](/workers/databases/connect-to-postgres/).
* Discover [other storage options available](/workers/platform/storage-options/) for use with Workers.
* [Create your first database](/d1/get-started/) with Cloudflare D1.
