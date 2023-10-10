---
title: Data location
pcx_content_type: concept
weight: 5
---

# Data location

Learn how the location of data stored in D1 is determined, including where the leader is placed and how you optimize that location based on your needs.

## Automatic (recommended)

By default, D1 will automatically create your database in a location close to where you issued the request to create a database. In most cases this allows D1 to choose the optimal location for your database on your behalf.

## Provide Location Hints

You may want to explicitly provide a location hint in cases where the majority of your writes to a specific database come from a different location than where you are creating the database from. Location hints can be useful when:

* Working in a distributed team.
* Creating databases specific to users in specific locations.
* Using continuous deployment (CD) or Infrastructure as Code (IaC) systems to programmatically create your databases.

Provide a Location Hint when creating a D1 database when:

* Using [`wrangler d1`](/workers//wrangler/commands/#d1) to create a database.
* Creating a database [via the Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers/d1).

### Use Wrangler

{{<Aside type="note">}}

To install Wrangler, the command-line interface for D1 and Workers, refer to [Install and Update Wrangler](/workers/wrangler/install-and-update/).

{{</Aside>}}

To provide a location hint when creating a new database, pass the `--location` flag with a valid location hint:

```sh
$ wrangler d1 create new-database --location=weur 
```

### Use the dashboard

To provide a location hint when creating a database via the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to [**Workers & Pages** > **D1**](https://dash.cloudflare.com/?to=/:account/workers/d1).
3. Select **Create database**.
4. Provide a database name and an optional **Location**.
5. Select **Create** to create your database.

## Available hints

The following location hints are currently supported:

| Hint          | Hint description      |
| ------------- | --------------------- |
| wnam          | Western North America |
| enam          | Eastern North America |
| weur          | Western Europe        |
| eeur          | Eastern Europe        |
| apac          | Asia-Pacific          |
