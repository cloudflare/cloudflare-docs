---
weight: 1
title: Get started
pcx_content_type: get-started
---

# Get started

This guide will instruct you through:

- Creating your first database using D1, Cloudflare’s native serverless SQL database.
- Creating a schema and querying your database via the command-line.
- Connecting a [Cloudflare Worker](/workers/) to your D1 database to query your D1 database programmatically.

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [`npm`](https://docs.npmjs.com/getting-started).
3. Install [`Node.js`](https://nodejs.org/en/). Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](/workers/wrangler/install-and-update/) requires a Node version of `16.17.0` or later.

## 1. Log in

Before creating your D1 database, log in with your Cloudflare account by running:

```sh
$ npx wrangler login
```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

## 2. Create a Worker

{{<Aside type="note" header="New to Workers?">}}

Refer to [How Workers works](/workers/reference/how-workers-works/) to learn about the Workers serverless execution model works. Go to the [Workers Get started guide](/workers/get-started/guide/) to set up your first Worker.

{{</Aside>}}

You will create a new Worker as the means to query your database.

Create a new project named `d1-tutorial` by running:

```sh
$ npm create cloudflare@latest d1-tutorial

```

When setting up your `d1-tutorial` Worker, answer the questions as below:

- Your directory has been titled `d1-tutorial`.
- Choose `"Hello World" Worker` for the type of application.
- Select `yes` to using TypeScript.
- Select `yes` to using Git.
- Select `no` to deploying.

This will create a new `d1-tutorial` directory. Your new `d1-tutorial` directory will include:

- A `"Hello World"` [Worker](/workers/get-started/guide/#3-write-code) at `src/index.ts`.
- A [`wrangler.toml`](/workers/wrangler/configuration/) configuration file. `wrangler.toml` is how your `d1-tutorial` Worker will access your D1 database.

{{<Aside type="note" heading="Familiar with Workers?">}}

If you are familiar with Cloudflare Workers, or initializing projects in a Continuous Integration (CI) environment, initialize a new project non-interactively by setting `CI=true` as an environmental variable when running `create cloudflare@latest`.

For example: `CI=true npm create cloudflare@latest d1-tutorial --type=simple --git --ts --deploy=false` will create a basic "Hello World" project ready to build on.

{{</Aside>}}

## 3. Create a database

A D1 database is conceptually similar to many other databases: a database may contain one or more tables, the ability to query those tables, and optional indexes. D1 uses the familiar [SQL query language](https://www.sqlite.org/lang.html) (as used by SQLite).

To create your first D1 database, change into the directory you just created for your Workers project:

```sh
$ cd d1-tutorial
```

Run the following `wrangler d1` command and give your database a name. In this tutorial, the database will be named `prod-d1-tutorial`

{{<Aside type="note" heading="Naming databases">}}
For reference, a good database name is:

- Typically a combination of ASCII characters, shorter than 32 characters, and uses dashes (-) instead of spaces.
- Descriptive of the use-case and environment. For example, "staging-db-web" or "production-db-backend".
- Only used for describing the database, and is not directly referenced in code.
{{</Aside>}}


```sh
$ npx wrangler d1 create prod-d1-tutorial

✅ Successfully created DB 'prod-d1-tutorial'

[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = prod-d1-tutorial"
database_id = "<unique-ID-for-your-database>"
```

This will create a new D1 database, and output the [binding](/workers/configuration/bindings/) configuration needed in the next step.

## 4. Bind your Worker to your D1 database

You must create a binding for your Worker to connect to your D1 database. [Bindings](/workers/configuration/bindings/) allow your Workers to access resources, like D1, on the Cloudflare developer platform. You create bindings by updating your `wrangler.toml` file.

To bind your D1 database to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---

[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = "prod-d1-tutorial"
database_id = "<unique-ID-for-your-database>"
```

Specifically:

- The value (string) you set for `<BINDING_NAME>` will be used to reference this database in your Worker. In this tutorial, name your binding `DB`.
- The binding must be [a valid JavaScript variable name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables). For example, `binding = "MY_DB"` or `binding = "productionDB"` would both be valid names for the binding.
- Your binding is available in your Worker at `env.<BINDING_NAME>` and the D1 [client API](/d1/reference/client-api/) is exposed on this binding.

{{<Aside type="note">}}

When you execute the `wrangler d1 create` command, the client API package (which implements the D1 API and database class) is automatically installed. For more information on the D1 Client API, refer to [D1 Client API](/d1/reference/client-api/).

{{</Aside>}}

You can also bind your D1 database to a Pages Function. For more information, refer to [Functions Bindings](/pages/functions/bindings/#d1-databases).

## 5. Run a query against your D1 database

### Configure your D1 database

With `wrangler.toml` configured properly, you will set up your database. Use the following example `schema.sql` file to initialize your database. Copy the following code and save it as a `schema.sql` file in the `d1-tutorial` Worker directory you created in step 1:

```sql
---
filename: schema.sql
---
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');
```

You will initialize your database to run and test locally first. Bootstrap your new D1 database by running:

```sh
$ npx wrangler d1 execute <DATABASE_NAME> --local --file=./schema.sql
```

Then validate your data is in your database by running:

```sh
$ npx wrangler d1 execute <DATABASE_NAME> --local --command="SELECT * FROM Customers"
```

You should see the following output: 
```sh
🌀 Mapping SQL input into an array of statements
🌀 Executing on local database production-db-backend (5f092302-3fbd-4247-a873-bf1afc5150b) from .wrangler/state/v3/d1:
┌────────────┬─────────────────────┬───────────────────┐
│ CustomerId │ CompanyName         │ ContactName       │
├────────────┼─────────────────────┼───────────────────┤
│ 1          │ Alfreds Futterkiste │ Maria Anders      │
├────────────┼─────────────────────┼───────────────────┤
│ 4          │ Around the Horn     │ Thomas Hardy      │
├────────────┼─────────────────────┼───────────────────┤
│ 11         │ Bs Beverages        │ Victoria Ashworth │
├────────────┼─────────────────────┼───────────────────┤
│ 13         │ Bs Beverages        │ Random Name       │
```

### Write queries within your Worker

After you have set up your database, you will run an SQL query from within your Worker.

First, go to your `d1-tutorial` Worker and open the `index.ts` file. The `index.ts` file is where you configure your Worker's interactions with D1.

Clear the content of `index.ts`. Paste the following code snippet into your `index.ts` file. On the `env` parameter, replace `<BINDING_NAME>` with `DB`:

```typescript
---
filename: src/index.ts
---
export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/beverages") {
      // If you did not use `DB` as your binding name, change it here
      const { results } = await env.DB.prepare(
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

In the code above, you:

1. Define a binding to your D1 database in your TypeScript code. This binding matches the `binding` value you set in `wrangler.toml` under `[[d1_databases]]`.
2. Query your database using `env.DB.prepare` to issue a [prepared query](/d1/reference/client-api/) with a placeholder (the `?` in the query).
3. Call `bind()` to safely and securely bind a value to that placeholder. In a real application, you would allow a user to define the `CompanyName` they want to list results for. Using `bind()` prevents users from executing arbitrary SQL (known as "SQL injection") against your application and deleting or otherwise modifying your database.
4. Execute the query by calling `all()` to return all rows (or none, if the query returns none).
5. Return your query results, if any, in JSON format with `Response.json(results)`.

After configuring your Worker, you can test your project locally before you deploy globally.

## 6. Develop locally with Wrangler

While in your project directory, test your database locally by running:

```sh
$ npx wrangler dev
```

When you run `wrangler dev`, Wrangler will give you a URL (most likely `localhost:8787`) to review your Worker. After you visit the URL Wrangler provides, you will see this message: `Call /api/beverages to see everyone who works at Bs Beverages`.

To test that your database is running successfully, add `/api/beverages` to the provided Wrangler URL: for example, `localhost:8787/api/beverages`. After doing this, you should see your data being displayed in the browser.

## 7. Deploy your database

To deploy your Worker to production, you must first repeat the [database bootstrapping](/d1/get-started/#configure-your-d1-database) steps _without_ the `--local` flag to give your Worker data to read. This will create the database tables and import the data into the production version of your database, running on Cloudflare's global network.

First, bootstrap your database with the `schema.sql` file you created in step 4:

```sh
$ npx wrangler d1 execute prod-d1-tutorial --file=./schema.sql
```

Then validate the data is in production by running:

```sh
$ npx wrangler d1 execute prod-d1-tutorial --command="SELECT * FROM Customers"
```

Finally, deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

```sh
$ npx wrangler deploy
# Outputs: https://d1-tutorial.<YOUR_SUBDOMAIN>.workers.dev
```

You can now visit the URL for your newly created project to query your live database.

For example, if the URL of your new Worker is `d1-tutorial.<YOUR_SUBDOMAIN>.workers.dev`, accessing `https://d1-tutorial.<YOUR_SUBDOMAIN>.workers.dev/api/beverages` will send a request to your Worker that queries your live database directly.

By finishing this tutorial, you have created a D1 database, a Worker to access that database and deployed your project globally.

## Next steps

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord](https://discord.gg/cloudflaredev).

- [Supported Wrangler commands for D1](/workers/wrangler/commands/#d1).
- Learn how to use the [D1 client API](/d1/reference/client-api/) within your Worker.
- Explore [community projects built on D1](/d1/reference/community-projects/).
