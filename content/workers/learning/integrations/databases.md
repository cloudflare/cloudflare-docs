---
pcx_content_type: concept
title: Databases
---

# Databases

Use Cloudflare Workers to connect your application to external databases, such as Postgres, MySQL, FaunaDB, Supabase, MongoDB Atlas, PlanetScale, Prisma, and more. To use these Cloudflare Workers integrations, you need to install the relevant packages for the databases you want to use.

## Overview
{{<table-wrap>}}

| Database                                                                         |Native Integration |  Library or Driver      | Connection Method      |
| ------------------------------------------------------------------------------- | ----- | --------- | --------- |
| [Postgres](/workers/tutorials/query-postgres-from-workers-using-database-connectors/) | No |  [deno-postgres](https://github.com/cloudflare/worker-template-postgres) | [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
| [MySQL](/workers/tutorials/query-postgres-from-workers-using-database-connectors/) | No | [deno-mysql](https://github.com/cloudflare/worker-template-mysql) |  [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
| [FaunaDB](https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers) | No |  [faunadb](https://github.com/fauna/faunadb-js)         | API via client library |
| [PlanetScale](https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript) | [Yes](/workers/learning/integrations/databases/#planetscale) |[@planetscale/database](https://github.com/planetscale/database-js)         | API via client library |
| [Supabase](https://github.com/supabase/examples-archive/tree/main/supabase-js-v1/with-cloudflare-workers) | [Yes](/workers/learning/integrations/databases/#supabase) | [@supabase/supabase-js](https://github.com/supabase/supabase-js)         | API via client library |
| [Mongo](https://www.mongodb.com/developer/products/atlas/cloudflare-worker-rest-api/) | No | [realm-web](https://www.mongodb.com/docs/realm/web/)         | API via client library |
| [Prisma](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers) | No |  [prisma](https://github.com/prisma/prisma)         | API via client library |
| [Neon](https://blog.cloudflare.com/neon-postgres-database-from-workers/) | [Yes](/workers/learning/integrations/databases/#neon) | [@neondatabase/serverless](https://neon.tech/blog/serverless-driver-for-postgres/) | API via client library |
| [Hasura](https://hasura.io/blog/building-applications-with-cloudflare-workers-and-hasura-graphql-engine/) | No | API | GraphQL API via fetch() |

{{</table-wrap>}}

{{<Aside type="note">}}
If you do not see an integration listed or have an integration to add, complete and submit the [Cloudflare Developer Platform Integration form](https://forms.gle/iaUqLWE8aezSEhgd6).
{{</Aside>}} 

Once you have installed the necessary packages, use the APIs provided by these packages to connect to your database and perform operations on it. Refer to detailed links for service-specific instructions.

## Authentication

If your database requires authentication, use Wrangler secrets to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [`wrangler secret`](/workers/wrangler/commands/#secret) command:

```sh
wrangler secret put SECRET_NAME
```

Then, retrieve the secret value in your code using the following code snippet:

```js
const secretValue = env.SECRET_NAME;
```

Use the secret value to authenticate with the external service. For example, if the external service requires an API key or database username and password for authentication, include these in using the relevant service's library or API.

For services that require mTLS authentication, use [mTLS certificates](/workers/runtime-apis/mtls) to present a client certificate.

## Native Database Integrations (beta)
Connect to databases using the new Database Integrations (beta) experience on the Cloudflare dashboard. Today, we have support for connecting to PlanetScale, Supabase and Neon through native integrations. 

### PlanetScale
PlanetScale is a MySQL-compatible platform that makes databases infinitely scalable, easier and safer to manage.

1. In order to set up an integration with PlanetScale, you first need to have an existing database to connect to. [Create a PlanetScale database](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide#create-a-database) or [import an existing database](https://planetscale.com/docs/imports/database-imports#overview).

2. To follow along with this example, create a `products` table with the following query.
```sql
CREATE TABLE products (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  image_url varchar(255),
  category_id INT,
  KEY category_id_idx (category_id)
);

```
3. Now that you have created your table, insert some data. Run the following command to add a product and category to your table:
```sql
INSERT INTO products (name, image_url, category_id)
VALUES  ('Ballpoint pen', 'https://example.com/500x500', '1');
```

4. Add the PlanetScale integration to your Worker
    - Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    - In **Account Home**, select **Workers & Pages**.
    - Select your Worker.
    - Select **Settings** > **Integrations** > **PlanetScale**. 
    - Follow the setup flow, selecting the database created in step 1.

5. In your Workers code, install the `@planetscale/database`  driver to connect to your database and start manipulating data.
```
npm install @planetscale/database
```

6. This example shows how to make a query to your PlanetScale database in Workers. The credentials needed to connect to PlanetScale have been automatically added as secrets to your Worker through the integration. 

```js
import { connect } from '@planetscale/database';

export default {
	async fetch(request, env) {
		const config = {
			host: env.DATABASE_HOST,
			username: env.DATABASE_USERNAME,
			password: env.DATABASE_PASSWORD
		}
		
		const conn = connect(config)
		const data = await conn.execute('SELECT * FROM products;')
		return new Response(JSON.stringify(data.rows), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	},
};
```

To learn more about PlanetScale, please refer to Planetscale's [official documentation](https://docs.planetscale.com/).

### Supabase
Supabase is the open source Firebase alternative. Full Postgres database, Authentication, Storage, Realtime, and more.


1. In order to set up an integration with Supabase, you first need to have an existing database to connect to. [Create a Supabase database](https://supabase.com/docs/guides/database/tables#creating-tables) or [load data from an existing database](https://supabase.com/docs/guides/database/tables#loading-data).

2. To follow along with this example, create a `countries` table with the following query. To create a table in your Supabase dashboard, you have two options:
    - You can use the table editor, which allows you to set up Postgres similar to a spreadsheet. 
    - Alternatively, you can use the SQL editor:
```sql
 CREATE TABLE countries (
 id SERIAL PRIMARY KEY,
 name VARCHAR(255) NOT NULL
 );
 ```

 3. Now that you have created your table, insert some data. Run the following commands to add countries to your table:
```sql
 INSERT INTO countries (name) VALUES ('United States');
 INSERT INTO countries (name) VALUES ('Canada');
 INSERT INTO countries (name) VALUES ('The Netherlands');
```

4. Add the Supabase database integration to your Worker
    - Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    - In **Account Home**, select **Workers & Pages**.
    - Select your Worker.
    - Select **Settings** > **Integrations** > **Supabase**. 
    - Follow the setup flow, selecting the database created in step 1.

5. In your Workers code, install the `@supabase/supabase-js`  driver to connect to your database and start manipulating data.
```
npm install @supabase/supabase-js
```

6. This example shows how to make a query to your Supabase database in Workers. The credentials needed to connect to Supabase have been automatically added as secrets to your Worker through the integration.
```sql 
import { createClient } from '@supabase/supabase-js';

export default {
	async fetch(request, env) {
		const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
		const { data, error } = await supabase.from("countries").select('*');
		if (error) throw error;
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
	},
};
```

To learn more about Supabase, please refer to Supabase's [official documentation](https://supabase.com/docs).

### Neon
Neon is a fully managed serverless PostgreSQL. It separates storage and compute to offer modern developer features such as serverless, branching, and bottomless storage.

1. In order to set up an integration with Neon, you first need to have an existing database to connect to. [Create a Neon database](https://neon.tech/docs/tutorial/project-setup#create-a-table) or [load data from an existing database](https://neon.tech/docs/import/import-from-postgres).

2. To follow along with this example, create an `elements` table using the Neon SQL editor. The SQL Editor allows you to query your databases directly from the Neon Console.
```sql
CREATE TABLE elements (
  id INTEGER NOT NULL,
  elementName TEXT NOT NULL,
  atomicNumber INTEGER NOT NULL,
  symbol TEXT NOT NULL
 );
 ```

 3. Now that you have created your table, insert some data.
```sql
INSERT INTO elements (id, elementName, atomicNumber, symbol)
VALUES
  (1, 'Hydrogen', 1, 'H'),
  (2, 'Helium', 2, 'He'),
  (3, 'Lithium', 3, 'Li'),
  (4, 'Beryllium', 4, 'Be'),
  (5, 'Boron', 5, 'B'),
  (6, 'Carbon', 6, 'C'),
  (7, 'Nitrogen', 7, 'N'),
  (8, 'Oxygen', 8, 'O'),
  (9, 'Fluorine', 9, 'F'),
  (10, 'Neon', 10, 'Ne');
```

4. Add the Neon database integration to your Worker
    - Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    - In **Account Home**, select **Workers & Pages**.
    - Select your Worker.
    - Select **Settings** > **Integrations** > **Neon**. 
    - Follow the setup flow, selecting the database created in step 1.

5. In your Workers code, install the `@neondatabase/serverless`  driver to connect to your database and start manipulating data.
```
npm install @neondatabase/serverless
```

6. This example shows how to make a query to your Neon database in Workers. The credentials needed to connect to Neon have been automatically added as secrets to your Worker through the integration. 
```sql 
import { Client } from '@neondatabase/serverless';

export default {
  async fetch(request, env, ctx) {
    const client = new Client(env.DATABASE_URL);
    await client.connect();
    const { rows } = await client.query('SELECT * FROM elements');
    ctx.waitUntil(client.end());  // this doesn’t hold up the response

    return new Response(JSON.stringify(rows));
  }
}
```
To learn more about Neon, please refer to Neon's [official documentation](https://neon.tech/docs/introduction).

### FAQs

#### What happens to the Database Integration if I rotate my database credentials?
If you rotate or delete database credentials you must delete the integration and go through the setup flow again. 

#### Can I select multiple databases per database service?
At this time, Database Integrations only support access to one database per provider. To add multiple, you can manually configure secrets.