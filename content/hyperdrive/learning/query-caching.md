---
pcx_content_type: concept
title: Query caching
weight: 4
---

# Query caching

Hyperdrive automatically caches the most popular queries executed against your database, reducing the need to go back to your database (incurring latency & database load) for every query.

## What does Hyperdrive cache?

Because Hyperdrive understands database protocols, it can understand whether a query is mutating (writes to the database) or non-mutating (read-only), allowing it to safely cache read queries (only).

Note that Hyperdrive does not just attempt to determine the difference between a `SELECT` and an `INSERT`, but parses the database wire-protocol and uses it to concretely determine whether a query is read-only (non-mutating) or not

For example, a read query that populates the front page of a news site would be cached:

```sql
-- Cacheable
SELECT * FROM articles
WHERE published_date = CURRENT_DATE()
ORDER BY CURRENT_DATE() DESC
LIMIT 50
```

Mutating queries, including `INSERT`, `UPSERT`, or `CREATE TABLE` are not cached:

```sql
-- Not cached
INSERT INTO users(id, name, email) VALUES(555, 'Matt', 'hello@example.com');
```

## Default cache settings

{{<Aside type="note">}}

Hyperdrive will support configuring both the `max_age` and `stale_while_revalidate` values in the near future.

{{</Aside>}}

The default caching behaviour for Hyperdrive is defined below:

- `max_age` = 60 seconds (1 minute)
- `stale_while_revalidate` = 15 seconds

The `max_age` setting determines the maximum lifetime a query response will be served from cache. Cached responses may be evicted from the cache prior to this time if they are rarely used.

The `stale_while_revalidate` setting allows Hyperdrive to continue serving stale cache results for an additional period of time while it is revalidating the cache. In most cases, revalidation should happen very quickly.

You can set a maximum `max_age` of 1 hour.
## Disable caching

You can disable caching on a per-Hyperdrive basis using the [wrangler](/workers/wrangler/install-and-update/) CLI or the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers-and-pages/hyperdrive).

For example:

```sh
# wrangler v3.11 and above required
$ wrangler hyperdrive update my-hyperdrive --disable-caching
```

You can also configure multiple Hyperdrive connections from a single application: one that enables caching for popular queries, and a second where you do not want to cache queries, but still benefit from Hyperdrive's latency benefits and connection pooling.

For example, using the [Postgres.js](/hyperdrive/learning/connect-to-postgres/) driver:

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

- Learn more about [how Hyperdrive works](/hyperdrive/learning/how-hyperdrive-works/)
- How to [connect to PostgreSQL](/hyperdrive/learning/connect-to-postgres/) from Hyperdrive.
- [Troubleshooting common issues](/hyperdrive/learning/troubleshooting/) when connecting a database to Hyperdrive.
