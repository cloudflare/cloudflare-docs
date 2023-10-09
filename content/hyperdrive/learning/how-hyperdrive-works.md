---
pcx_content_type: concept
title: How Hyperdrive works
weight: 2
---

# How Hyperdrive works

Connecting to traditional centralized databases from Cloudflare's global network which consists of over [300 data center locations](https://www.cloudflare.com/network/) presents a few challenges as queries can originate from any of these locations.

If your database is centrally located, queries can take a long time to get to the database and back. They can take even longer in situations where you have to establish a connection and make multiple round trips.

Traditional databases usually handle a maximum number of connections. With any reasonably large amount of distributed traffic, it becomes easy to exhaust these connections.

Hyperdrive solves these challenges by managing the number of global connections to your origin database and selectively parsing and choosing which query response to cache while reducing loading on your database and dramatically speeding up your database queries.

![Hyperdrive connection](/hyperdrive/learning/hyperdrive-comparison.svg)

## Connection Pooling

Hyperdrive creates a global pool of connections to your database that can be reused as your application executes queries against your database.

- When a query hits Hyperdrive, the request is routed to the nearest connection pool.
- If the connection pool has pre-existing connections, it will try and reuse that connection; otherwise, it will establish a new connection to your database and use that to route your query to your origin database with the goal of reusing and creating the least number of connections possible as required to operate your application.

Hyperdrive automatically manages the connection pool properties for you, including limiting the total number of connections to your origin database. Refer to [Limits](/hyperdrive/platform/limits/) to learn more.

- The connection pool operates in transaction mode, where the client that executes the query talks through a single connection for the duration of a transaction.
- When that transaction has completed, the connection is returned to the pool.
- Named prepared statements (which are rarely used), `SET` commands and advisory locks are not supported.

Users can use features like `LOCAL` and `pg_advisory_xact_lock` which are scoped to single transactions.

In cases where you need to issue these unsupported statements from your application, we recommend setting up a second, direct client without Hyperdrive.

## Query Caching

Hyperdrive supports caching of non-mutating (read) queries to your database.

- When queries are sent via Hyperdrive, it parses the query and determines whether the query is a mutating (write) or non-mutating (read) query.
- For non-mutating queries, Hyperdrive will cache the response for the configured `max_age` and whenever subsequent queries are made that match the original, it will return the cached response, bypassing the need to issue the query back to the origin database.

Caching can significantly reduce the burden on your origin database and speed up the response times for your queries.
