---
title: Time Travel & Backups
pcx_content_type: concept
weight: 3
---

# Time Travel

Time Travel is D1's approach to backups and point-in-time-recovery, and allows you to restore a database to any minute within the last 30 days.

* You do not need to enable Time Travel: it is always on.
* Database history and restoring a database incur no additional costs.
* Time Travel automatically creates [bookmarks](#terminology) on your behalf: you do not need to manually trigger or remember to initiate a backup.

By not having to rely on scheduled backups and/or manually initiated backups, you can go back in time and restore a database prior to a failed migration or schema change, a `DELETE` or `UPDATE` statement without a specific `WHERE` clause, and in the future, fork/copy a production database directly.

{{<Aside type="note" header="Support for Time Travel">}}

Databases using D1's [new storage subsystem](https://blog.cloudflare.com/d1-turning-it-up-to-11/) can use Time Travel. Time Travel replaces the [snapshot-based backups](/d1/learning/backups/) used for legacy alpha databases.

To understand which storage subsystem your database uses, run `wrangler d1 info YOUR_DATABASE` and inspect the `version` field in the output. Databases with `version: beta` support the new Time Travel API. Databases with `version: alpha` only support the older, snapshot-based backup API.

{{</Aside>}}

## Terminology

Time Travel introduces the concept of a "bookmark" to D1: a bookmark represents the state of a database at a specific point in time, and is effectively an append-only log.

* Bookmarks are lexicographically sortable: sorting a list of bookmarks will order them from oldest-to-newest
* Bookmarks older than 30 days are invalid and cannot be used as a restore point.
* Restoring a database to a specific bookmark does not remove or delete older bookmarks. For example, if you restore to a bookmark representing the state of your database 10 minutes ago, and determine that you needed to restore to an earlier point in time, you can still do so.

Bookmarks can be derived from a [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) (seconds since Jan 1st, 1970), and conversion between a specific timestamp and a bookmark is deterministic (stable).

## Retrieve a bookmark

You can retrieve a bookmark for the current timestamp by calling the `d1 info` command, which defaults to returning the current bookmark:

```sh
$ wrangler d1 time-travel info YOUR_DATABASE
```

To retrieve the bookmark for a timestamp in the past, pass the `--at-timestamp` flag with a valid Unix or RFC3339 timestamp:

```sh
# Using an RFC3339 timestamp, including the timezone:
$ wrangler d1 time-travel info YOUR_DATABASE --timestamp='2023-07-09T17:31:11+00:00"
```

## Restore a database

To restore a database a specific point-in-time:

{{<Aside type="warning">}}

Restoring a database to a specific point-in-time is a _destructive_ operation, and overwrites the database in place. In the future, D1 will support branching & cloning databases using Time Travel.

{{</Aside>}}

```sh
$ wrangler d1 time-travel restore YOUR_DATABASE --at-timestamp=UNIX_TIMESTAMP

# Example output:
...
```

Note that:

* Queries in flight will be cancelled, and an error returned to the client
* The restore operation will return a [bookmark](#terminology) that allows you to [undo](#undo-a-restore) and revert the database.

## Undo a restore

You can undo a restore by:

* Taking note of the previous bookmark returned as part of a `wrangler d1 restore` operation
* Restore directly to a bookmark in the past, prior to your last restore.

```sh
# Get a historical bookmark
$ wrangler d1 time-travel info 
```

## Notes

* You can quickly get the Unix timestamp from the command-line in macOS and Windows via `date %+s`
* Time Travel does not yet allow you to clone or fork an existing database to a new copy. In the future, Time Travel will allow you to easily fork (clone) an existing database into a new database, or overwrite an existing database.
* You can restore a database back to a point in time up to 30 days in the past (Workers Paid plans) or 7 days (Workers free plans). See the [Limits](/d1/platform/limits/) page for details on Time Travel's limits.
