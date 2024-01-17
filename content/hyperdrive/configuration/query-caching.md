---
pcx_content_type: concept
title: Query caching
weight: 4
---

# Query caching

Hyperdrive automatically caches the most popular queries executed against your database, reducing the need to go back to your database (incurring latency and database load) for every query.

## What does Hyperdrive cache?

Because Hyperdrive uses database protocols, it can differentiate between a mutating query (a query that writes to the database) and a non-mutating query (a read-only query), allowing Hyperdrive to safely cache read-only queries.

Besides determining the difference between a `SELECT` and an `INSERT`, Hyperdrive also parses the database wire-protocol and uses it to differentiate between a mutating or non-mutating query.

For example, a read query that populates the front page of a news site would be cached:

```sql
-- Cacheable
SELECT * FROM articles
WHERE published_date = CURRENT_DATE()
ORDER BY CURRENT_DATE() DESC
LIMIT 50
```

Mutating queries (including `INSERT`, `UPSERT`, or `CREATE TABLE`) and queries that use [functions designated as `volatile` by PostgreSQL](https://www.postgresql.org/docs/current/xfunc-volatility.html) are not cached:

```sql
-- Not cached
INSERT INTO users(id, name, email) VALUES(555, 'Matt', 'hello@example.com');

SELECT LASTVAL(), * FROM articles LIMIT 50;
```

## Default cache settings

{{<Aside type="note">}}

Hyperdrive will support configuring both the `max_age` and `stale_while_revalidate` values in the near future.

{{</Aside>}}

The default caching behaviour for Hyperdrive is defined as below:

- `max_age` = 60 seconds (1 minute)
- `stale_while_revalidate` = 15 seconds

The `max_age` setting determines the maximum lifetime a query response will be served from cache. Cached responses may be evicted from the cache prior to this time if they are rarely used.

The `stale_while_revalidate` setting allows Hyperdrive to continue serving stale cache results for an additional period of time while it is revalidating the cache. In most cases, revalidation should happen rapidly.

You can set a maximum `max_age` of 1 hour.

## Disable caching

Disable caching on a per-Hyperdrive basis using the [wrangler](/workers/wrangler/install-and-update/) CLI or the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers-and-pages/hyperdrive).

For example:

```sh
# wrangler v3.11 and above required
$ npx wrangler hyperdrive update my-hyperdrive --disable-caching
```

You can also configure multiple Hyperdrive connections from a single application: one connection that enables caching for popular queries, and a second connection where you do not want to cache queries, but still benefit from Hyperdrive's latency benefits and connection pooling.

For example, using the [Postgres.js](/hyperdrive/configuration/connect-to-postgres/) driver:

```ts
const client = new Client({
  connectionString: env.HYPERDRIVE.connectionString,
});
// ...
const noCachingClient = new Client({
  // This represents a Hyperdrive configuration with the cache disabled
  connectionString: env.HYPERDRIVE_CACHE_DISABLED.connectionString,
});
```

## Next steps

- Learn more about [How Hyperdrive works](/hyperdrive/configuration/how-hyperdrive-works/).
- Learn how to [Connect to PostgreSQL](/hyperdrive/configuration/connect-to-postgres/) from Hyperdrive.
- Review [Troubleshooting common issues](/hyperdrive/reference/troubleshooting/) when connecting a database to Hyperdrive.