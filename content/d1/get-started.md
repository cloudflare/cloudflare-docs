---
weight: 1
title: Get started
pcx_content_type: get-started
---

# Get started

This guide will instruct you through:

- Creating your first database using D1, Cloudflare’s native serverless SQL database.
- Creating a schema and querying your database via the command-line.
- Connecting a [Cloudflare Worker](/workers/) to your D1 database.

This guide assumes you already have a [Cloudflare account](/fundamentals/account-and-billing/account-setup/create-account/).

## 1. Install and authenticate Wrangler

You will use [Wrangler](/workers/wrangler/install-and-update/), a command-line tool for building Cloudflare Workers, to access D1.

- To install Wrangler, ensure you have [`npm`](https://docs.npmjs.com/getting-started) and [`Node.js`](https://nodejs.org/en/) installed.
- Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions.
- Wrangler requires a Node version of `16.13.0` or later.

Install Wrangler by running:

```sh
$ npm install -g wrangler
```

or install with `yarn`:

```sh
$ yarn global add wrangler
```

After installing Wrangler, if you are unauthenticated, you will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

## 2. Create your Worker

{{<Aside type="note" header="New to Workers?">}}
Refer to [How Workers works](/workers/learning/how-workers-works/) to learn about the Workers serverless execution model works. Go to the [Workers Get started guide](/workers/get-started/guide/) to setup your first Worker.
{{</Aside>}}

You will create a new Worker as the container for both your D1 database and the Worker application that you will use to query your database. Create a new Worker named `d1-tutorial` by running:

```sh
$ wrangler init d1-tutorial -y

# Outputs:
 ⛅️ wrangler
-------------------------------------------------------
Using npm as package manager.
✨ Created d1-tutorial/wrangler.toml
✨ Initialized git repository at d1-tutorial
✨ Created d1-tutorial/package.json
✨ Created d1-tutorial/tsconfig.json
✨ Created d1-tutorial/src/index.ts
Your project will use Vitest to run your tests.
✨ Created d1-tutorial/src/index.test.ts
```

This will create a new directory (`d1-tutorial`). Your new directory will include a [`wrangler.toml`](/workers/wrangler/configuration/) configuration file which is how your `my-project` Worker will access your D1 database.

{{<Aside type="note">}}

Indicating `-y` will answer affirmatively to all of Wrangler's initialization questions. This will create a `package.json` file, an `index.ts` file instead of a `index.js` file, and Wrangler will also generate a `tsconfig.json` file in the root of your project. It will also create a `fetch` handler instead of a `scheduled` handler.

{{</Aside>}}

## 3. Create a database

A D1 database is conceptually similar to many other databases: a database may contain one or more tables, the ability to query those tables, and optional indexes. D1 uses the familar [SQL query language](https://www.sqlite.org/lang.html) (as used by SQLite).

To create your first D1 database, change into the directory you just created for your Workers project:

```sh
$ cd d1-tutorial
```

Run the following `wrangler d1` command and give your database a name. A good database name is:

- Typically a combination of ASCII characters, shorter than 32 characters, and uses dashes (-) instead of spaces
- Descriptive of the use-case and environment - for example, "staging-db-web" or "production-db-backend"
- Only used for describing the database, and is not directly referenced in code.

```sh
$ wrangler d1 create <DATABASE_NAME>

✅ Successfully created DB '<DATABASE_NAME>'

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<DATABASE_NAME>"
database_id = "<unique-ID-for-your-database>"
```

This will create a new D1 database, and output the [binding](/workers/platform/bindings/) configuration needed in the next step.

## 4. Bind your Worker to your D1 database

You must create a binding for your Worker to connect to your D1 database. [Bindings](/workers/platform/bindings/) allow your Workers to access resources, like D1, on the Cloudflare developer platform. You create bindings by updating your `wrangler.toml` file.

To bind your D1 database to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
----
filename: wrangler.toml
----

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<DATABASE_NAME>"
database_id = "<unique-ID-for-your-database>"
```

Specifically:

- The value (string) you set for `<BINDING_NAME>` will be used to reference this database in your Worker.
- The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_DB"` or `binding = "productionDB"` would both be valid names for the binding.
- Your binding is available in your Worker at `env.<BINDING_NAME>` and the D1 [client API](/d1/platform/client-api/) is exposed on this binding.

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
CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
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

```typescript
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
$ wrangler dev
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
- Learn how to use the [D1 client API](/d1/platform/client-api/) within your Worker.
- Explore [community projects built on D1](/d1/platform/community-projects/).
