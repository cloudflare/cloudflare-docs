---
type: example
summary: Connect Hyperdrive to a Google Cloud SQL database instance.
pcx_content_type: tutorial
title: Connect to Google Cloud SQL
weight: 10
---

# Connect to Google Cloud SQL

This example shows you how to connect Hyperdrive to a Google Cloud SQL PostgreSQL database instance.

## 1. Allow Hyperdrive access

To allow Hyperdrive to connect to your database, you will need to ensure that Hyperdrive has valid user credentials and network access.

{{<render file="_public-connectivity.md">}}

### Cloud Console

When creating the instance or when editing an existing instance in the [Google Cloud Console](https://console.cloud.google.com/sql/instances):

To allow Hyperdrive to reach your instance:

1. In the [Cloud Console](https://console.cloud.google.com/sql/instances), select the instance you want Hyperdrive to connect to.
2. Expand **Connections** > ensure **Public IP** is enabled > **Add a Network** and input `0.0.0.0/0`.
3. Select **Done** > **Save** to persist your changes.
4. Select **Overview** from the sidebar and note down the **Public IP address** of your instance.

To create a user for Hyperdrive to connect as:

1. Select **Users** in the sidebar.
2. Select **Add User Account** > select **Built-in authentication**.
3. Provide a name (for example, `hyperdrive-user`) > select **Generate** to generate a password.
4. Copy this password to your clipboard before selecting **Add** to create the user.

With the username, password, public IP address and (optional) database name (default: `postgres`), you can now create a Hyperdrive database configuration.

### gcloud CLI

The [gcloud CLI](https://cloud.google.com/sdk/docs/install) allows you to create a new user and enable Hyperdrive to connect to your database.

Use `gcloud sql` to create a new user (for example, `hyperdrive-user`) with a strong password:

```sh
$ gcloud sql users create hyperdrive-user --instance=YOUR_INSTANCE_NAME --password=SUFFICIENTLY_LONG_PASSWORD
```

Run the following command to enable [Internet access](https://cloud.google.com/sql/docs/postgres/configure-ip) to your database instance:

```sh
# If you have any existing authorized networks, ensure you provide those as a comma separated list.
# The gcloud CLI will replace any existing authorized networks with the list you provide here.
$ gcloud sql instances patch YOUR_INSTANCE_NAME --authorized-networks="0.0.0.0/0"
```

Refer to [Google Cloud's documentation](https://cloud.google.com/sql/docs/postgres/create-manage-users) for additional configuration options.

## 2. Create a database configuration

{{<render file="_create-hyperdrive-config.md">}}
