---
weight: 1
title: Get started
pcx_content_type: configuration
---

# Get started

This guide will instruct you through setting up and deploying your first D1 database. This guide assumes that you already have a Cloudflare account. If you do not have a Cloudflare account, sign up before continuing.
## 1.  Install and authenticate Wrangler

You will use [Wrangler](/workers/wrangler/get-started/), a command-line tool for building Cloudflare Workers, to manage D1. 

To install Wrangler, ensure you have [`npm`](https://docs.npmjs.com/getting-started) and [`Node.js`](https://nodejs.org/en/) installed.

Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. Wrangler requires a Node version of `16.13.0` or later. Install Wrangler by running:

```sh
$ npm install -g wrangler
```

or install with `yarn`:

```sh
$ yarn global add wrangler
```

To authenticate Wrangler, run:

```sh
$ wrangler login
```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

To start a new Worker project, run:

```sh
$ npx wrangler init my-project -y
```

This will create new directory (`my-project`) and a new Workers project within it. Your new directory will include a [`wrangler.toml`](/workers/wrangler/configuration/) configuration file which is how your `my-project` Worker will manage your D1 database.

## 2. Create your database

To create your first database, go to your project directory:

```sh
$ cd my-project
```

and then run:

```sh
$ npx wrangler d1 create <DATABASE_NAME>
```

This will create a new D1 database.

## 3. Bind your Worker to your D1 database

[Bindings](/workers/platform/bindings/) allow your Workers to interact with resources, such as D1. Binding your Worker to your D1 database allows you to . After creating your database, Wrangler will prompt you to add the following to your `wrangler.toml`:

```toml
[[ d1_databases ]]
binding = "<BINDING_NAME>"
database_name = "<DATABASE_NAME>"
database_id = "<UUID>"
```

Your binding name is set by you in this step and is available at `env.<BINDING_NAME>`.

To specify different D1 databases for different environments, use the following syntax in your `wrangler.toml`:

```toml
# describe what is happening here
[env.staging]
d1_databases = [
    { binding = "DB", database_name = "<DATABASE1_NAME>", database_id = "<UUID>" },
]

# describe what is happening here
[env.production]
d1_databases = [
    { binding = "DB", database_name = "<DATABASE2_NAME>", database_id = "<UUID>" },
]
```

{{<Aside type="note">}}

When you execute the `wrangler d1 create` command, the client API package (which implements the D1 API and database class) is automatically installed. For more information on the D1 Client API, refer to [D1 Client API](/d1/client-api/).
{{</Aside>}}

## 4. Example D1 database query and response

### Bootstrap your D1 database

With everything installed and your `wrangler.toml` configured properly, you are now ready to set up your database. Let's look at an example. Say you had a schema.sql file with the following contents:

```sql
---
filename: "schema.sql"
---
DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (CustomerID INT, CompanyName TEXT, ContactName TEXT, PRIMARY KEY (`CustomerID`));
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'),(4, 'Around the Horn', 'Thomas Hardy'),(11, 'Bs Beverages', 'Victoria Ashworth'),(13, 'Bs Beverages', 'Random Name');
```

You can bootstrap your new D1 database by running:

```sh
$ npx wrangler d1 execute <database-name> --local --file=./schema.sql
```

Then validate your data is there by running:

```sh
$ npx wrangler d1 execute <database-name> --local --command='SELECT * FROM Customers'
```


### Write queries within your Worker

Once you've set up your database, you can connect to it within your Worker by using the binding name configured above in Step 3 on the `env` parameter.

For example, if we use the binding name "DB" (specified in `wrangler.toml`), here's how we would run an SQL query within our Worker:

```javascript
---
filename: "src/index.js"
---
export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/beverages") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM Customers WHERE CompanyName = ?"
      )
        .bind("Bs Beverages")
        .all();
      return Response.json(results);
    }

    return new Response("Call /api/beverages to see everyone who works at Bs Beverages");
  },
};
```

Refer to the [D1 Client API](/d1/client-api/) section of the docs for the full in-Worker API docs.

## 5. Developing locally with Wrangler

While in your project directory, you can test locally by running:

```sh
$ npx wrangler dev --local --persist
```

## 6. Publish with Wrangler

When you are ready to deploy, go live by running:

```sh
$ npx wrangler publish
```

Once deployed, you'll also want to repeat the [bootstrap your database](/d1/get-started/#bootstrap-your-d1-database) steps without the `--local` flag to give your Worker data to read:

```sh
$ npx wrangler d1 execute <database-name> --file=./schema.sql
```

Then validate the data is there by running:
```sh
$ npx wrangler d1 execute <database-name> --command='SELECT * FROM Customers'
```

## Connect with us

If you have any feature requests or notice any bugs, share your feedback directly with us by joining the [Cloudflare Developers community on Discord](https://discord.gg/cloudflaredev).
