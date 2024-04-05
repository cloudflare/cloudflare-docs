---
pcx_content_type: concept
title: Alpha database migration guide
weight: 2
---

D1 alpha databases will stop accepting live SQL queries on July 1, 2024. Since D1's open beta launched in October 2023, newly created databases use a different underlying architecture that processes 40x more requests than the alpha v1 architecture. To deliver exceptional database performance, e.g., 10GB max database size, and developer experience, users should follow the below migration guide to recreate alpha D1 databases.

### 1. Create a manual backup
```sh
$ npx wrangler d1 backup create <database_name>
```

### 2. Download the manual backup
The command below will download the manual backup of the alpha database as `.sqlite3` file.
```sh
$ npx wrangler d1 backup download <database_name> <backup_id> # See available backups with wrangler d1 backup list <database_name>
```

### 3. Convert the manual backup into SQL statements
The command below will convert the manual backup of the alpha database from the downloaded `.sqlite3` file into SQL statements which can then be imported into the new database.
```sh
$ sqlite3 db_dump.sqlite3 .dump > db.sql
```

### 4. Create a new D1 database
All new D1 databases use the updated architecture by default.
```sh
$ npx wrangler d1 create <new_database_name>
```

### 5. Run SQL statements against the new D1 database
```sh
$ npx wrangler d1 execute <new_database_name> --file=./db.sql
```
