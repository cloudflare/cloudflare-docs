---
weight: 1
title: Get started
pcx_content_type: configuration
---

# Get started

## 1. Install Wrangler and login

To use Wrangler to manage D1, you will need to have [`npm`](https://www.npmjs.com/get-npm) and [`Node.js`](https://nodejs.org/en/) installed. Wrangler requires a Node version of `16.13.0` or later.

To get started, run:

```sh
$ npx wrangler init my-project -y
```

This will create new directory (`my-project`), and setup a new Workers project within it. Your new directory will include a [**wrangler.toml**](https://developers.cloudflare.com/workers/wrangler/configuration/) configuration file in the project directory. 

You can now create your first database with the Wrangler CLI. 

## 2. Create your database

Run the following command to begin creating your database:

```sh
$ npx wrangler d1 create <database-name>
```

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account, before creating your database.

## 3. Update wrangler.toml

After executing this command, Wrangler will ask you to add a snippet of code to your `wrangler.toml` file that looks something like this:

```toml
[[ d1_databases ]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<database-name>"
database_id = "<UUID>"
```


If you would like to have different D1 databases for different environments, you can specify this within your `wrangler.toml` using the following syntax:

```toml
[env.staging]
d1_databases = [
    { binding = "DB", database_name = "<database1-name>", database_id = "<UUID>" },
]

[env.production]
d1_databases = [
    { binding = "DB", database_name = "<database2-name>", database_id = "<UUID>" },
]
```

{{<Aside type="note" header="Note">}}
When you execute the `wrangler d1 create` command, the client API package (which implements the D1 API and database class) is automatically installed. For more information on the D1 Client API, see [D1 Client API](/d1/client-api/)
{{</Aside>}}

## 4. Example D1 database query and response

### Bootstrap your D1 database

With everything installed and your wrangler.toml configured properly, you are now ready to set up your database. Let's look at an example. Say you had a schema.sql file with the following contents:

```sql
---
filename: "schema.sql"
---
DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (CustomerID INT, CompanyName TEXT, ContactName TEXT, PRIMARY KEY (`CustomerID`));
INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, "Alfreds Futterkiste", "Maria Anders"),(4, "Around the Horn", "Thomas Hardy"),(11, "Bs Beverages", "Victoria Ashworth"),(13, "Bs Beverages", "Random Name");
```

You can bootstrap your new D1 database by running:

```sh
$ npx wrangler d1 execute <database-name> --file=./schema.sql
```

Then validate your new data by running a query through Wrangler using something like the following command:
```sh
$ npx wrangler d1 execute <database-name> --command='SELECT * FROM Customers'
```


### Write queries within your Worker

Once you've set up your database, you can connect to it within your Worker by using the binding name configured above in Step 3 on the `env` parameter.

For example, if we use the binding name "DB" (specified in wrangler.toml), executing a SQL query within our Worker is as easy as this:

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
    // …
    return new Response("Call /api/beverages to see everyone who works at Bs Beverages");
  },
};
```

See the D1 Client API section of the docs for the full in-Worker API docs.

## 5. Test and publish with Wrangler

While in your project directory, you can test locally by running:

```sh
$ npx wrangler dev --local
```

{{<Aside type="note" header="local is under development">}}
The local D1 development environment is under active development and may have some incorrect behavior. If you have issues, run npm install wrangler@d1 to make sure you're on the latest version, or provide feedback in Discord.

{{</Aside>}}

When you are ready to deploy, go live by running:

```sh
$ npx wrangler publish
```





