---
pcx_content_type: concept
title: How Hyperdrive works
weight: 2
---

# How Hyperdrive works

Connecting to traditional centralized databases from Cloudflare's global network which consists of over [300 data center locations](https://www.cloudflare.com/network/) presents a few challenges as queries can originate from any of these locations.

If your database is centrally located, queries can take a long time to get to the database and back. Queries can take even longer in situations where you have to establish a connection and make multiple round trips.

Traditional databases usually handle a maximum number of connections. With any reasonably large amount of distributed traffic, it becomes easy to exhaust these connections.

Hyperdrive solves these challenges by managing the number of global connections to your origin database, selectively parsing and choosing which query response to cache while reducing loading on your database and accelerating your database queries.

![Hyperdrive connection](/images/hyperdrive/configuration/hyperdrive-comparison.svg)

## Connection Pooling

Hyperdrive creates a global pool of connections to your database that can be reused as your application executes queries against your database.

When a query hits Hyperdrive, the request is routed to the nearest connection pool.

If the connection pool has pre-existing connections, the connection pool will try and reuse that connection.

If the connection pool does not have pre-existing connections, it will establish a new connection to your database and use that to route your query. This aims at reusing and creating the least number of connections possible as required to operate your application.

{{<Aside type="note">}}
Hyperdrive automatically manages the connection pool properties for you, including limiting the total number of connections to your origin database. Refer to [Limits](/hyperdrive/platform/limits/) to learn more.
{{</Aside>}}

The connection pool operates in transaction mode, where the client that executes the query communicates through a single connection for the duration of a transaction.

When that transaction has completed, the connection is returned to the pool.

{{<Aside type="warning">}}
Named prepared statements (which are rarely used), `SET` commands, and advisory locks are not supported. Use features such as `LOCAL` and `pg_advisory_xact_lock` which are scoped to single transactions. In cases where you need to issue these unsupported statements from your application, the Hyperdrive team recommends setting up a second, direct client without Hyperdrive.
{{</Aside>}}

## Query Caching

Hyperdrive supports caching of non-mutating (read) queries to your database.

When queries are sent via Hyperdrive, Hyperdrive parses the query and determines whether the query is a mutating (write) or non-mutating (read) query.

For non-mutating queries, Hyperdrive will cache the response for the configured `max_age`, and whenever subsequent queries are made that match the original, Hyperdrive will return the cached response, bypassing the need to issue the query back to the origin database.

Caching reduces the burden on your origin database and accelerates the response times for your queries.

## Related resources

- [Query caching](/hyperdrive/configuration/query-caching/)
