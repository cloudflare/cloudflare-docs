---
type: example
summary: Connect Hyperdrive to a Materialize streaming database.
pcx_content_type: configuration
title: Connect to Materialize
weight: 8
layout: example
---

This example shows you how to connect Hyperdrive to a [Materialize](https://materialize.com/) database. Materialize is a Postgres-compatible streaming database that can automatically compute real-time results against your streaming data sources.

## 1. Allow Hyperdrive access

To allow Hyperdrive to connect to your database, you will need to ensure that Hyperdrive has valid user credentials and network access to your database.

### Materialize Console

{{<Aside type="note">}}

Read the Materialize [Quickstart guide](https://materialize.com/docs/get-started/quickstart/) to set up your first database. The steps below assume you have an existing Materialize database ready to go.

{{</Aside>}}

You will need to create a new application user and password for Hyperdrive to connect with:

1. Log in to the [Materialize Console](https://console.materialize.com/).
2. Under the **App Passwords** section, select **Manage app passwords**.
3. Select **New app password** and enter a name, for example, `hyperdrive-user`.
4. Select **Create Password**.
5. Copy the provided password: it will only be shown once.

To retrieve the hostname and database name of your Materialize configuration:

1. Select **Connect** in the sidebar of the Materialize Console.
2. Select **External tools**.
3. Copy the **Host**, **Port** and **Database** settings.

With the username, app password, hostname, port and database name, you can now connect Hyperdrive to your Materialize database.

## 2. Create a database configuration

{{<render file="_create-hyperdrive-config.md">}}
