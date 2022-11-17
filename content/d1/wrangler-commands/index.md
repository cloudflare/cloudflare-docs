---
weight: 2
title: Wrangler commands
pcx_content_type: concept
---

# Supported Wrangler commands

You can interact with D1 through Wrangler commands. Refer to the list below for commands that are currently supported.

| Command | Description |
| ----------------------------------- | ----------------- |
| `wrangler d1 create <database-name>` | Creates a new D1 database and provides the binding and UUID that you will put in your `wrangler.toml` file. |
| `wrangler d1 list` | List all D1 databases on your account. |
| `wrangler d1 delete <DATABASE_NAME>` | Delete a D1 database from your account. |
| `wrangler d1 execute <DATABASE_NAME> --command "<SQL_QUERY>"` | Execute query on database. |
| `wrangler d1 execute <DATABASE_NAME> --file ./setup.sql` | Execute queries within a `.sql` file. |
| `wrangler d1 backup create <DATABASE_NAME>` | Initiate a backup. |
| `wrangler d1 backup list` | List all available backups. |
| `wrangler d1 backup restore` | Restore a backup to a new database. |
| `wrangler d1 backup download` | Download existing data to your local machine. |

