---
type: example
summary: Connect Hyperdrive to a Supabase Postgres database.
pcx_content_type: configuration
title: Connect to Supabase
weight: 4
layout: example
---

This example shows you how to connect Hyperdrive to a [Supabase](https://supabase.com/) Postgres database.

## 1. Allow Hyperdrive access

You can connect Hyperdrive to any existing Supabase database as the Postgres user which is set up during project creation.
Alternatively, to create a new user for Hyperdrive, run these commands in the [SQL Editor](https://supabase.com/dashboard/project/_/sql/new).

```sql
CREATE ROLE hyperdrive_user LOGIN PASSWORD 'sufficientlyRandomPassword';

-- Here, you are granting it the postgres role. In practice, you want to create a role with lesser privileges.
GRANT postgres to hyperdrive_user;
```

The database endpoint can be found in the [database settings page](https://supabase.com/dashboard/project/_/settings/database).

With a database user, password, database endpoint (hostname and port) and database name (default: postgres), you can now set up Hyperdrive.

## 2. Create a database configuration

{{<render file="_create-hyperdrive-config.md">}}
