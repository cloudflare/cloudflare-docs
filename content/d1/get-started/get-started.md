---
weight: 1
title: Get started
pcx_content_type: get-started
---

# Get started

This guide will instruct you through setting up and deploying your first database with D1. This guide assumes you already have a Cloudflare account and are enrolled in Alpha testing.

## 1.  Install and authenticate Wrangler

You will use [Wrangler](/workers/wrangler/get-started/), a command-line tool for building Cloudflare Workers, to access D1. 

To install Wrangler, ensure you have [`npm`](https://docs.npmjs.com/getting-started) and [`Node.js`](https://nodejs.org/en/) installed.

Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. Wrangler requires a Node version of `16.13.0` or later. Install Wrangler by running:

```sh
$ npm install -g wrangler
```

or install with `yarn`:

```sh
$ yarn global add wrangler
```

After installing Wrangler, if you are unauthenticated, you will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

## 2. Create your Worker

You will use a Worker to access your D1 database. Start a new Worker project named `my-project` by running:

```sh
$ npx wrangler init my-project -y
```

This will create a new Worker project directory (`my-project`). Your new directory will include a [`wrangler.toml`](/workers/wrangler/configuration/) configuration file which is how your `my-project` Worker will access your D1 database.

## 3. Create your database

To create your first database, go to your Worker project directory:

```sh
$ cd my-project
```

Then run the following command and give your database a name:

```sh
$ npx wrangler d1 create <DATABASE_NAME>
```

This will create a new D1 database.

## 4. Bind your Worker to your D1 database

You must create a binding for your Worker to connect to your D1 database. [Bindings](/workers/platform/bindings/) allow your Workers to access resources, like D1, on the Cloudflare developer platform. You create bindings by updating your `wrangler.toml` file.

To bind your Worker to your database, add the following to your `wrangler.toml` file:

```toml
[[ d1_databases ]]
binding = "<BINDING_NAME>"
database_name = "<DATABASE_NAME>"
database_id = "<UUID>"
```

Set your binding name by updating the `<BINDING_NAME>` value. Your binding is available in your Worker at `env.<BINDING_NAME>`. The `database_name` and `database_id` can be found in your terminal after you ran the `create` command in step 3. 

{{<Aside type="note">}}

When you execute the `wrangler d1 create` command, the client API package (which implements the D1 API and database class) is automatically installed. For more information on the D1 Client API, refer to [D1 Client API](/d1/client-api/).

{{</Aside>}}

## 4. Run a query and response in your D1 database

### Configure your D1 database

With your `wrangler.toml` configured properly, set up your database. You will use the following example `schema.sql` file to configure your database.

```sql
---
filename: "schema.sql"
---
DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (CustomerID INT, CompanyName TEXT, ContactName TEXT, PRIMARY KEY (`CustomerID`));
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'),(4, 'Around the Horn', 'Thomas Hardy'),(11, 'Bs Beverages', 'Victoria Ashworth'),(13, 'Bs Beverages', 'Random Name');
```

You will configure your database to run and test locally first. Bootstrap your new D1 database by running:

```sh
$ npx wrangler d1 execute <database-name> --local --file=./schema.sql
```

Then validate your data is there by running:

```sh
$ npx wrangler d1 execute <database-name> --local --command='SELECT * FROM Customers'
```

### Write queries within your Worker

After you have set up your database, you will run an SQL query from within your Worker. 

First, go to your Worker project and open the `index.js` file. The `index.js` file is where you configure your Worker's interactions with D1. Paste the following code snippet into your `index.js` file and, on the `env` parameter, replace `<BINDING_NAME>` with the binding name you set in step 4:

```javascript
---
filename: "src/index.js"
highlight: 6
---
export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/beverages") {
      const { results } = await env.<BINDING_NAME>.prepare(
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

After configuring your Worker, test your project locally.

## 5. Develop locally with Wrangler

While in your project directory, test your database locally by running:

```sh
$ npx wrangler dev --local --persist
```

## 6. Deploy your database

To deploy your database, run:

```sh
$ npx wrangler publish
```

Next, repeat the [bootstrap your database](/d1/get-started/#bootstrap-your-d1-database) steps without the `--local` flag to give your Worker data to read:

```sh
$ npx wrangler d1 execute <database-name> --file=./schema.sql
```

Then validate the data is there by running:

```sh
$ npx wrangler d1 execute <database-name> --command='SELECT * FROM Customers'
```

By finishing this guide, you have created a D1 database, a Worker to access that database and deployed your project.
## Next steps

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord](https://discord.gg/cloudflaredev).

* [Supported Wrangler commands for D1]()
* [D1 client API]()
