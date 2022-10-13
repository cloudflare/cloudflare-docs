---
order: 1
pcx-content-type: configuration
---

# Get started

## 1. Install Wrangler and login
You will need to be in a Worker project. You can use our example Worker project found here or start from scratch and create a new skeleton Worker project by running:

```sh
$ npx wrangler init
```

which will include a [**wrangler.toml**](https://developers.cloudflare.com/workers/wrangler/configuration/) configuration file in the project directory.

You can create your first database with our Wrangler CLI. To get started, you will need to install our specific version of Wrangler:

```sh
$ npm install --save-dev wrangler
```

After you have the correct version of Wrangler installed, run the following to login to Wrangler in order to get access to D1:

```sh
$ npx wrangler@d1 login
```

This will open a login page and request your account access permissions.

## 2. Create your database 

Once you’ve logged into Wrangler, you can run the following to begin creating your database: 

```sh
$ npx wrangler d1 create <database-name>
```

Update wrangler.toml
After executing this command, you will be asked to add a snippet of code to your wrangler.toml file that looks something like this:

```toml
[[ d1_databases ]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "<database-name>"
database_id = "<UUID>"
```


If you would like to have different D1 databases for different environments, you can specify this within your **wrangler.toml** using the following syntax:

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

As a note, when you execute the `wrangler d1 create command`, the client API package, which implements the D1 API and database class, is automatically installed. For more info on the D1 Client API, see below in the corresponding section and appendix. 

## 3. Example D1 database query and response 

### Bootstrap your D1 database 
With everything installed and your wrangler.toml configured properly, you are now ready to set up your database. Let’s look at a simple example. Say you had a schema.sql file with the following contents: 

**schema.sql**
```sql
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
Once you’ve set up your database, you can connect to it within your Worker by using the binding name configured above in Step 3 on the env parameter. For example, if we use the binding name “DB” (specified in wrangler.toml), executing a SQL query within our Worker is as easy as this: 

```javascript
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

See the D1 Client API appendix for the full in-Worker API docs.


4. Test and publish with Wrangler 

While in your project directory, you can test locally by running: 

```sh
$ npx wrangler dev --local
```
<Aside header="local is under development">
  
The local D1 development environment is under active development and may have some incorrect behavior. If you have issues, run npm install wrangler@d1 to make sure you're on the latest version, or provide feedback in Discord.

</Aside>
  
When you are ready to deploy, go live by running: 

npx wrangler publish




