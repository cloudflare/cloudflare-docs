---
pcx_content_type: concept
title: Alpha database migration guide
weight: 2
---

# Alpha database migration guide

{{<Aside type="warning">}}

D1 alpha databases will stop accepting live SQL queries on July 1, 2024.

{{</Aside}}

D1's open beta launched in October 2023, and newly created databases use a different underlying architecture that is significantly more reliable and performant, with increased database sizes, improved query throughput, and reduced latency.

Users should follow the below migration guide to recreate alpha D1 databases on our production ready system.

### 1. Verify that the database is alpha
```sh
$ npx wrangler d1 info <database_name>
```

### 2. Create a manual backup
```sh
$ npx wrangler d1 backup create <database_name>
```

### 3. Download the manual backup
The command below will download the manual backup of the alpha database as `.sqlite3` file.
```sh
$ npx wrangler d1 backup download <database_name> <backup_id> # See available backups with wrangler d1 backup list <database_name>
```

### 4. Convert the manual backup into SQL statements
The command below will convert the manual backup of the alpha database from the downloaded `.sqlite3` file into SQL statements which can then be imported into the new database. After running the command below, you will need to edit the output SQL file to be compatible with D1. See [convert SQLite database files](/d1/build-with-d1/import-data/#convert-sqlite-database-files) for specifics.
```sh
$ sqlite3 db_dump.sqlite3 .dump > db.sql
```

### 5. Create a new D1 database
All new D1 databases use the updated architecture by default.
```sh
$ npx wrangler d1 create <new_database_name>
```

### 6. Run SQL statements against the new D1 database
```sh
$ npx wrangler d1 execute <new_database_name> --remote --file=./db.sql
```
