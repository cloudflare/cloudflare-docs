---
type: example
summary: Connect Hyperdrive to a Neon Postgres database.
pcx_content_type: configuration
title: Connect to Neon
weight: 4
layout: example
---

This example shows you how to connect Hyperdrive to a [Neon](https://neon.tech/) Postgres database.

## 1. Allow Hyperdrive access

You can connect Hyperdrive to any existing Neon database by creating a new user and fetching your database connection string.

### Neon Dashboard

1. Go to the [**Neon dashboard**](https://console.neon.tech/app/projects) and select the project (database) you wish to connect to.
2. Select **Roles** from the sidebar and select **New Role**. Enter `hyperdrive-user` as the name (or your preferred name) and **copy the password**. Note that the password will not be displayed again: you will have to reset it if you do not save it somewhere.
3. Select **Dashboard** from the sidebar > go to the **Connection Details** pane > ensure you have selected the **branch**, **database** and **role** (for example,`hyperdrive-user`) that Hyperdrive will connect through.
4. Select the `psql` and check the **pooled connection** checkbox. Note down the connection string (starting with `postgres://hyperdrive-user@...`) from the text box.

With both the connection string and the password, you can now create a Hyperdrive database configuration.

## 2. Create a database configuration

{{<render file="_create-hyperdrive-config.md">}}
