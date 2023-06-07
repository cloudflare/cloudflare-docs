---
title: Backups
weight: 9
pcx_content_type: concept
---

# Backups

D1 has built-in support for creating and restoring backups of your databases, including support for scheduled automatic backups and manual backup management.

## Automatic backups

D1 automatically backs up your databases every hour on your behalf, and [retains backups for 24 hours](/d1/platform/limits/). Backups will block access to the DB while they are running. In most cases this should only be a second or two, and any requests that arrive during the backup will be queued.

To view and manage these backups, including any manual backups you have made, you can use the `d1 backup list <DATABASE_NAME>` command to list each backup.

For example, to list all of the backups of a D1 database named `existing-db`:

```sh
$ wrangler d1 backup list existing-db

┌──────────────┬──────────────────────────────────────┬────────────┬─────────┐
│ created_at   │ id                                   │ num_tables │ size    │
├──────────────┼──────────────────────────────────────┼────────────┼─────────┤
│ 1 hour ago   │ 54a23309-db00-4c5c-92b1-c977633b937c │ 1          │ 95.3 kB │
├──────────────┼──────────────────────────────────────┼────────────┼─────────┤
│ <...>        │ <...>                                │ <...>      │ <...>   │
├──────────────┼──────────────────────────────────────┼────────────┼─────────┤
│ 2 months ago │ 8433a91e-86d0-41a3-b1a3-333b080bca16 │ 1          │ 65.5 kB │
└──────────────┴──────────────────────────────────────┴────────────┴─────────┘%
```

The `id` of each backup allows you to download or restore a specific backup.

## Manually back up a database

Creating a manual backup of your database before making large schema changes, manually inserting or deleting data, or otherwise modifying a database you are actively using is a good practice to get into. D1 allows you to make a backup of a database at any time, and stores the backup on your behalf. You should also consider [using migrations](/d1/platform/migrations/) to simplify changes to an existing database.

To back up a D1 database, you must have:

1. The Cloudflare [Wrangler CLI installed](/workers/wrangler/install-and-update/)
2. An existing D1 database you want to back up.

For example, to create a manual backup of a D1 database named `example-db`, call `d1 backup create`.

```sh
$ wrangler d1 backup create example-db

┌─────────────────────────────┬──────────────────────────────────────┬────────────┬─────────┬───────┐
│ created_at                  │ id                                   │ num_tables │ size    │ state │
├─────────────────────────────┼──────────────────────────────────────┼────────────┼─────────┼───────┤
│ 2023-02-04T15:49:36.113753Z │ 123a81a2-ab91-4c2e-8ebc-64d69633faf1 │ 1          │ 65.5 kB │ done  │
└─────────────────────────────┴──────────────────────────────────────┴────────────┴─────────┴───────┘
```

Larger databases, especially those that are several megabytes (MB) in size with many tables, may take a few seconds to backup. The `state` column in the output will let you know when the backup is done.

## Downloading a backup locally

To download a backup locally, call `wrangler d1 backup download <DATABASE_NAME> <BACKUP_ID>`. Use `wrangler d1 backup list <DATABASE_NAME>` to list the available backups, including their IDs, for a given D1 database.

For example, to download a specific backup for a database named `example-db`:

```sh
$ wrangler d1 backup download example-db 123a81a2-ab91-4c2e-8ebc-64d69633faf1

🌀 Downloading backup 123a81a2-ab91-4c2e-8ebc-64d69633faf1 from 'example-db'
🌀 Saving to /Users/you/projects/example-db.123a81a2.sqlite3
🌀 Done!
```

The database backup will be download to the current working directory in native SQLite3 format. To import a local database, read [the documentation on importing data](/d1/learning/importing-data/) to D1.

## Restoring a backup

{{<Aside type="warning">}}

Restoring a backup will overwrite the existing version of your D1 database in-place. We recommend you make a manual backup before you restore a database, so that you have a backup to revert to if you accidentally restore the wrong backup or break your application.

{{</Aside>}}

Restoring a backup will overwrite the current running version of a database with the backup. Database tables (and their data) that do not exist in the backup will no longer exist in the current version of the database, and queries that rely on them will fail.

To restore a previous backup of a D1 database named `existing-db`, pass the ID of that backup to `d1 backup restore`:

```sh
$ wrangler d1 backup restore existing-db  6cceaf8c-ceab-4351-ac85-7f9e606973e3

Restoring existing-db from backup 6cceaf8c-ceab-4351-ac85-7f9e606973e3....
Done!
```

Any queries against the database will immediately query the current (restored) version once the restore has completed.
