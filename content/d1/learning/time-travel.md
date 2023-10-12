---
title: Time Travel and backups
pcx_content_type: concept
weight: 3
---

# Time Travel

Time Travel is D1's approach to backups and point-in-time-recovery, and allows you to restore a database to any minute within the last 30 days.

* You do not need to enable Time Travel. It is always on.
* Database history and restoring a database incur no additional costs.
* Time Travel automatically creates [bookmarks](#terminology) on your behalf. You do not need to manually trigger or remember to initiate a backup.

By not having to rely on scheduled backups and/or manually initiated backups, you can go back in time and restore a database prior to a failed migration or schema change, a `DELETE` or `UPDATE` statement without a specific `WHERE` clause, and in the future, fork/copy a production database directly.

{{<Aside type="note" header="Support for Time Travel">}}

Databases using D1's [new storage subsystem](https://blog.cloudflare.com/d1-turning-it-up-to-11/) can use Time Travel. Time Travel replaces the [snapshot-based backups](/d1/learning/backups/) used for legacy alpha databases.

To understand which storage subsystem your database uses, run `wrangler d1 info YOUR_DATABASE` and inspect the `version` field in the output. Databases with `version: beta` support the new Time Travel API. Databases with `version: alpha` only support the older, snapshot-based backup API.

{{</Aside>}}

## Terminology

Time Travel introduces the concept of a "bookmark" to D1. A bookmark represents the state of a database at a specific point in time, and is effectively an append-only log.

* Bookmarks are lexicographically sortable. Sorting orders a list of bookmarks from oldest-to-newest.
* Bookmarks older than 30 days are invalid and cannot be used as a restore point.
* Restoring a database to a specific bookmark does not remove or delete older bookmarks. For example, if you restore to a bookmark representing the state of your database 10 minutes ago, and determine that you needed to restore to an earlier point in time, you can still do so.

Bookmarks can be derived from a [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) (seconds since Jan 1st, 1970), and conversion between a specific timestamp and a bookmark is deterministic (stable).

## Timestamps

Time Travel supports two timestamp formats:

* [Unix timestamps](https://developer.mozilla.org/en-US/docs/Glossary/Unix_time), which correspond to seconds since January 1st, 1970 at midnight. This is always in UTC.
* The [JavaScript date-time string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format), which is a simplified version of the ISO-8601 timestamp format. An valid date-time string for the July 27, 2023 at 11:18AM in Americas/New_York (EST) would look like `2023-07-27T11:18:53.000-04:00`.

## Requirements


* [`Wrangler`](/workers/wrangler/install-and-update/) `v3.4.0` or later installed to use Time Travel commands.
* A database on D1's new `beta` backend. You can check whether a database is using this backend via `wrangler d1 info DB_NAME` - the output show `version: beta`.

## Retrieve a bookmark

You can retrieve a bookmark for the current timestamp by calling the `d1 info` command, which defaults to returning the current bookmark:

```sh
$ wrangler d1 time-travel info YOUR_DATABASE

# Example output
🚧 Time Traveling...
⚠️ The current bookmark is '00000085-0000024c-00004c6d-8e61117bf38d7adb71b934ebbf891683'
⚡️ To restore to this specific bookmark, run:
 `wrangler d1 time-travel restore YOUR_DATABASE --bookmark=00000085-0000024c-00004c6d-8e61117bf38d7adb71b934ebbf891683`
```

To retrieve the bookmark for a timestamp in the past, pass the `--timestamp` flag with a valid Unix or RFC3339 timestamp:

```sh
# Using an RFC3339 timestamp, including the timezone:
$ wrangler d1 time-travel info YOUR_DATABASE --timestamp="2023-07-09T17:31:11+00:00"
```

## Restore a database

To restore a database to a specific point-in-time:

{{<Aside type="warning">}}

Restoring a database to a specific point-in-time is a _destructive_ operation, and overwrites the database in place. In the future, D1 will support branching & cloning databases using Time Travel.

{{</Aside>}}

```sh
$ wrangler d1 time-travel restore YOUR_DATABASE --timestamp=UNIX_TIMESTAMP

# Example output:
🚧 Restoring database YOUR_DATABASE from bookmark 00000080-ffffffff-00004c60-390376cb1c4dd679b74a19d19f5ca5be

⚠️ This will overwrite all data in database YOUR_DATABASE.
In-flight queries and transactions will be cancelled.

✔ OK to proceed (y/N) … yes
⚡️ Time travel in progress...
✅ Database YOUR_DATABASE restored back to bookmark 00000080-ffffffff-00004c60-390376cb1c4dd679b74a19d19f5ca5be

↩️ To undo this operation, you can restore to the previous bookmark: 00000085-ffffffff-00004c6d-2510c8b03a2eb2c48b2422bb3b33fad5
```

Note that:

* Timestamps are converted to a deterministic, stable bookmark. The same timestamp will always represent the same bookmark.
* Queries in flight will be cancelled, and an error returned to the client.
* The restore operation will return a [bookmark](#terminology) that allows you to [undo](#undo-a-restore) and revert the database.

## Undo a restore

You can undo a restore by:

* Taking note of the previous bookmark returned as part of a `wrangler d1 time-travel restore` operation
* Restoring directly to a bookmark in the past, prior to your last restore.

To fetch a bookmark from an earlier state:

```sh
# Get a historical bookmark
$ wrangler d1 time-travel info YOUR_DATABASE

# Example output
🚧 Time Traveling...
⚠️ The current bookmark is '00000085-0000024c-00004c6d-8e61117bf38d7adb71b934ebbf891683'
⚡️ To restore to this specific bookmark, run:
 `wrangler d1 time-travel restore YOUR_DATABASE --bookmark=00000085-0000024c-00004c6d-8e61117bf38d7adb71b934ebbf891683`
```

## Notes

* You can quickly get the Unix timestamp from the command-line in macOS and Windows via `date %+s`.
* Time Travel does not yet allow you to clone or fork an existing database to a new copy. In the future, Time Travel will allow you to fork (clone) an existing database into a new database, or overwrite an existing database.
* You can restore a database back to a point in time up to 30 days in the past (Workers Paid plan) or 7 days (Workers Free plan). Refer to [Limits](/d1/platform/limits/) for details on Time Travel's limits.
