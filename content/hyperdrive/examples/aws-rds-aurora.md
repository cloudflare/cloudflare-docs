---
type: example
summary: Connect Hyperdrive to an AWS RDS or Aurora database instance.
pcx_content_type: configuration
title: Connect to AWS RDS and Aurora
weight: 11
layout: example
---

This example shows you how to connect Hyperdrive to an Amazon Relational Database Service (Amazon RDS) Postgres or Amazon Aurora database instance.

## 1. Allow Hyperdrive access

To allow Hyperdrive to connect to your database, you will need to ensure that Hyperdrive has valid user credentials and network access.

{{<render file="_beta-public-connectivity.md">}}

### AWS Console

When creating or modifying an instance in the AWS console:

1. Configure a **DB cluster identifier** and other settings you wish to customize.
2. Under **Settings** > **Credential settings**, note down the **Master username** and **Master password**.
2. Under the **Connectivity** header, ensure **Public access** is set to **Yes**.
3. Select an **Existing VPC security group** that allows public Internet access from `0.0.0.0/0` to the port your database instance is configured to listen on (default: `5432` for PostgreSQL instances).
4. Select **Create database**.

{{<Aside type="warning">}}

You must ensure that the [VPC security group](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html) associated with your database allows public IPv4 access to your database port.

Refer to AWS' [database server rules](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html#sg-rules-db-server) for details on how to configure rules specific to your RDS or Aurora database.

{{</Aside>}}


### Retrieve the database endpoint (Aurora)

To retrieve the database endpoint (hostname) for Hyperdrive to connect to:

1. Go to **Databases** view under **RDS** in the AWS console.
2. Select the database you want Hyperdrive to connect to.
3. Under the **Endpoints** header, note down the **Endpoint name** with the type `Writer` and the **Port**.

### Retrieve the database endpoint (RDS PostgreSQL)

For regular RDS instances (non-Aurora), you will need to fetch the endpoint and port of the database:

1. Go to **Databases** view under **RDS** in the AWS console.
2. Select the database you want Hyperdrive to connect to.
3. Under the **Connectivity & security** header, note down the **Endpoint** and the **Port**.

The endpoint will resemble `YOUR_DATABASE_NAME.cpuo5rlli58m.AWS_REGION.rds.amazonaws.com` and the port will default to `5432`.

## 2. Create your user

Once your database is created, you will need to create a user for Hyperdrive to connect as. Although you can use the **Master username** configured during initial database creation, best practice is to create a less privileged user.

To create a new user, log in to the database and use the `CREATE ROLE` command:


```sh
# Log in to the database
$ psql postgresql://MASTER_USERNAME:MASTER_PASSWORD@ENDPOINT_NAME:PORT/database_name
```

Run the following SQL statements:

```sql
-- Create a role for Hyperdrive
CREATE ROLE hyperdrive;

-- Allow Hyperdrive to connect
GRANT CONNECT ON DATABASE postgres TO hyperdrive;

-- Grant database privileges to the hyperdrive role
GRANT ALL PRIVILEGES ON DATABASE postgres to hyperdrive;

-- Create a specific user for Hyperdrive to log in as
CREATE ROLE hyperdrive_user LOGIN PASSWORD 'sufficientlyRandomPassword';

-- Grant this new user the hyperdrive role privileges
GRANT hyperdrive to hyperdrive_user;
```

Refer to AWS' [documentation on user roles in PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.Roles.html) for more details.

With a database user, password, database endpoint (hostname and port) and database name (default: `postgres`), you can now set up Hyperdrive.

## 3. Create a database configuration

{{<render file="_create-hyperdrive-config.md">}}