---
weight: 1
title: Get started
pcx_content_type: get-started
---

# Get started

This guide will instruct you through setting up and deploying your first database with D1. This guide assumes you already have a Cloudflare account.

## 1. Install and authenticate Wrangler

You will use [Wrangler](/workers/wrangler/install-and-update/), a command-line tool for building Cloudflare Workers, to access D1.

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
$ wrangler init my-project -y
```

This will create a new Worker project directory (`my-project`). Your new directory will include a [`wrangler.toml`](/workers/wrangler/configuration/) configuration file which is how your `my-project` Worker will access your D1 database.

{{<Aside type="note">}}

Indicating `-y` will answer affirmatively to all of Wrangler's initialization questions. This will create a `package.json` file, an `index.ts` file instead of a `index.js` file, and Wrangler will also generate a `tsconfig.json` file in the root of your project. It will also create a `fetch` handler instead of a `scheduled` handler.

{{</Aside>}}

## 3. Create your database

To create your first database, go to your Worker project directory:

```sh
$ cd my-project
```

Then run the following command and give your database a name:

```sh
$ wrangler d1 create <DATABASE_NAME>
```

This will create a new D1 database.

## 4. Bind your Worker to your D1 database

You must create a binding for your Worker to connect to your D1 database. [Bindings](/workers/platform/bindings/) allow your Workers to access resources, like D1, on the Cloudflare developer platform. You create bindings by updating your `wrangler.toml` file.

To bind your D1 database to your Worker, add the following to your `wrangler.toml` file:

```toml
[[d1_databases]]
binding = "<BINDING_NAME>"
database_name = "<DATABASE_NAME>"
database_id = "<UUID>"
```

Set your binding name by updating the `<BINDING_NAME>` value. Your binding is available in your Worker at `env.<BINDING_NAME>`. You will find the values for `database_name` and `database_id` in your terminal after you run the `create` command in step 3.

{{<Aside type="note">}}

When you execute the `wrangler d1 create` command, the client API package (which implements the D1 API and database class) is automatically installed. For more information on the D1 Client API, refer to [D1 Client API](/d1/platform/client-api/).

{{</Aside>}}

You can also bind your D1 database to a Pages Function. For more information, refer to [Functions Bindings](/pages/platform/functions/bindings/#d1-databases).

## 5. Run a query against your D1 database

### Configure your D1 database

With `wrangler.toml` configured properly, set up your database. You will use the following example `schema.sql` file to configure your database. Copy the following code and save it as a `schema.sql` file in the `my-project` Worker directory you created in step 2:

```sql
---
filename: schema.sql
---
DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (CustomerID INT, CompanyName TEXT, ContactName TEXT, PRIMARY KEY (`CustomerID`));
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');
```

You will configure your database to run and test locally first. Bootstrap your new D1 database by running:

```sh
$ wrangler d1 execute <DATABASE_NAME> --local --file=./schema.sql
```

Then validate your data is in your database by running:

```sh
$ wrangler d1 execute <DATABASE_NAME> --local --command='SELECT * FROM Customers'
```

### Write queries within your Worker

After you have set up your database, you will run an SQL query from within your Worker.

First, go to your Worker project and open the `index.ts` file. The `index.ts` file is where you configure your Worker's interactions with D1. Paste the following code snippet into your `index.ts` file and, on the `env` parameter, replace `<BINDING_NAME>` with the binding name you set in step 4:

```javascript
---
filename: "src/index.ts"
---
export interface Env {
  <BINDING_NAME>: D1Database;
}

export default {
  async fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/beverages") {
      const { results } = await env.<BINDING_NAME>.prepare(
        "SELECT * FROM Customers WHERE CompanyName = ?"
      )
        .bind("Bs Beverages")
        .all();
      return Response.json(results);
    }

    return new Response(
      "Call /api/beverages to see everyone who works at Bs Beverages"
    );
  },
};
```

After configuring your Worker, test your project locally.

## 6. Develop locally with Wrangler

While in your project directory, test your database locally by running:

```sh
$ wrangler dev --local --persist
```

When you run `wrangler dev`, Wrangler will give you a URL (most likely `localhost:8787`) to review your Worker. After you visit the URL Wrangler provides, you will see this message: `Call /api/beverages to see everyone who works at Bs Beverages`.

To test that your database is running successfully, add `/api/beverages` to the provided Wrangler URL (for example, `localhost:8787/api/beverages`). After doing this, you should see your data being displayed in the browser.

## 7. Deploy your database

To deploy your database to production, you must first repeat the [database bootstrapping](/d1/get-started/#configure-your-d1-database) steps without the `--local` flag to give your Worker data to read.

First, bootstrap your database with the `schema.sql` file you created in step 4:

```sh
$ wrangler d1 execute <DATABASE_NAME> --file=./schema.sql
```

Then validate the data is in production by running:

```sh
$ wrangler d1 execute <DATABASE_NAME> --command='SELECT * FROM Customers'
```

Finally, deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

```sh
$ wrangler publish
```

By finishing this guide, you have created a D1 database, a Worker to access that database and deployed your project.

## Next steps

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord](https://discord.gg/cloudflaredev).

- [Supported Wrangler commands for D1](/workers/wrangler/commands/#d1)
- [D1 client API](/d1/platform/client-api/)
