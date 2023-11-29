---
type: example
summary: Connect Hyperdrive to a Timescale time-series database.
pcx_content_type: configuration
title: Connect to Timescale
weight: 6
layout: example
---

This example shows you how to connect Hyperdrive to a [Timescale](https://www.timescale.com/) time-series database. Timescale is built on PostgreSQL, and includes powerful time-series, event and analytics features.

You can learn more about Timescale by visiting their [documentation](https://docs.timescale.com/getting-started/latest/services/).

## 1. Allow Hyperdrive access

You can connect Hyperdrive to any existing Timescale database by creating a new user and fetching your database connection string.

### Timescale Dashboard

{{<Aside type="note">}}

Similar to most services, Timescale requires you to reset the password associated with your database user if you do not have it stored securely. You should ensure that you do not break any existing clients if when you reset the password.

{{</Aside>}}

To retrieve your credentials and database endpoint in the [Timescale Console](https://console.cloud.timescale.com/):

1. Select the service (database) you want Hyperdrive to connect to.
2. Expand **Connection info**.
3. Copy the **Service URL**. The Service URL is the connection string that Hyperdrive will use to connect. This string includes the database hostname, port number and database name.

If you do not have your password stored, you will need to select **Forgot your password?** and set a new **SCRAM** password. Save this password, as Timescale will only display it once.

You will end up with a connection string resembling the below:

```sh
postgres://tsdbadmin:YOUR_PASSWORD_HERE@pn79dztyy0.xzhhbfensb.tsdb.cloud.timescale.com:31358/tsdb
```

With the connection string, you can now create a Hyperdrive database configuration.

## 2. Create a database configuration

{{<render file="_create-hyperdrive-config.md">}}
