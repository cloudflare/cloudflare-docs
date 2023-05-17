---
title: Data Location
pcx_content_type: concept
weight: 5
---

# Data Location

Learn how the location of data stored in D1 is determined, including where the leader is placed and how you optimize that location based on your needs.

## Automatic (recommended)

By default, D1 will automatically create your database in a location close to where you issued the request to create a database. In most cases this allows D1 to choose the optimal location for your database on your behalf.

## Providing Location Hints

You may want to explicitly provide a location hint in cases where the majorit of your writes to a specific database come from a different location than where you're created from. This can be particularly useful when working in a distributed team, when creating databases specific to users in specific locations, or when using continuous deployment (CD) or Infrastructure as Code (IaC) systems to programmatically create your databases.

You can provide a Location Hint when creating a D1 database when:

* Creating a database [via the Cloudflare dashboard]()
* Using [`wrangler d1`](/wrangler/commands/#d1) to create a database

### Using wrangler

{{<Aside type="note">}}

You can install Wrangler, the command-line interface for D1 and Workers, by [following the installation instructions](/workers/wrangler/install-and-update/).

{{</Aside>}}

To provide a location hint when creating a new database, pass the `--location` flag with a valid location hint:

```sh
$ wrangler d1 create new-database --location=weur 
```

### Using the dashboard

1. Login to the Cloudflare dashboard
2. Navigate to [**Workers** > **D1**](https://dash.cloudflare.com/?to=/:account/workers/d1)
3. Choose **Create database**
4. Provide a database name and an optional **Location**
5. Select **Create** to create your database

## Available hints

The following location hints are currently supported:

| Hint          | Hint description      |
| ------------- | --------------------- |
| wnam          | Western North America |
| enam          | Eastern North America |
| weur          | Western Europe        |
| eeur          | Eastern Europe        |
| apac          | Asia-Pacific          |
