---
title: Supported Wrangler commands
pcx-content-type: concept
---

# Supported Wrangler commands

You can also interact with D1 with Wrangler commands. As of today, the following commands are currently supported:

| Command | Description | 
| ----------------------------------- | ----------------- | 
| `wrangler d1 create <database-name>` | Creates a new D1 database and provides the binding and UUID that you will put in your `wrangler.toml` file. | 
| `wrangler d1 list` | List out all D1 databases on your account |
| `wrangler d1 delete <database-name>` | Delete your D1 database from your account | 
| `wrangler d1 execute <database-name> --command "<SQL-query>"` | Execute query on database | 
| `wrangler d1 execute <database-name> --file ./setup.sql` | Execute queries within a .sql file | 
| `wrangler d1 backup create <database` | Initiate a backup | 
| `wrangler d1 backup list` | List out all available backups | 
| `wrangler d1 backup restore` | Restore a backup to a new database | 
| `wrangler d1 backup download` | Download existing data to your local machine | 
	
