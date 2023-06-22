---
pcx_content_type: concept
title: Databases
---

# Databases

Use Cloudflare Workers to connect your application to external databases, such as Postgres, MySQL, FaunaDB, Supabase, MongoDB Atlas, PlanetScale, Prisma, and more. To use these Cloudflare Workers integrations, you need to install the relevant packages for the databases you want to use. For more information on ways to connect, refer to [Connect to databases](/workers/databases/connecting-to-databases/).

## Overview

{{<table-wrap>}}

| Database                                                                         |Native Integration |  Library or Driver      | Connection Method      |
| ------------------------------------------------------------------------------- | ----- | --------- | --------- |
| [Postgres](/workers/tutorials/query-postgres-from-workers-using-database-connectors/) | - |  [node-postgres](https://node-postgres.com/) | [Workers Socket API](/workers/runtime-apis/tcp-sockets/) |
| [Postgres](/workers/tutorials/query-postgres-from-workers-using-database-connectors/) | - |  [deno-postgres](https://github.com/cloudflare/worker-template-postgres) | [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
| [MySQL](/workers/tutorials/query-postgres-from-workers-using-database-connectors/) | - | [deno-mysql](https://github.com/cloudflare/worker-template-mysql) |  [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) |
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

Connect to databases using the new Database Integrations (beta) experience. Enable native Database Integrations in the [Cloudflare dashboard](https://dash.cloudflare.com). With native Database Integrations, Cloudflare automatically handles the process of creating a connection string and adding it as secrets to your Worker. Today, we have support for connecting to PlanetScale, Supabase and Neon through native integrations. 

{{<Aside type="note" header="Making multiple round trip calls to a centralized database from a Worker?">}}

If your Worker is making multiple round trip calls to a centralized database, your Worker may be a good fit for Smart Placement. Smart Placement speeds up applications by automatically running your Worker closer to your back-end infrastructure rather than the end user. Learn more about [how Smart Placement works](/workers/platform/smart-placement/).
{{</Aside>}} 

### PlanetScale

[PlanetScale](https://planetscale.com/) is a MySQL-compatible platform that makes databases infinitely scalable, easier and safer to manage.

1. To set up an integration with PlanetScale, you need to have an existing PlanetScale database to connect to. [Create a PlanetScale database](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide#create-a-database) or [import an existing database to PlanetScale](https://planetscale.com/docs/imports/database-imports#overview).

2. From the [PlanetScale web console](https://planetscale.com/docs/concepts/web-console#get-started), create a `products` table with the following query:

    ```sql
    CREATE TABLE products (
      id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name varchar(255) NOT NULL,
      image_url varchar(255),
      category_id INT,
      KEY category_id_idx (category_id)
    );

    ```

3. Insert some data in your newly created table. Run the following command to add a product and category to your table:

    ```sql
    INSERT INTO products (name, image_url, category_id)
    VALUES  ('Ballpoint pen', 'https://example.com/500x500', '1');
    ```

4. Add the PlanetScale integration to your Worker:
    - Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    - In **Account Home**, select **Workers & Pages**.
    - In **Overview**, select your Worker.
    - Select **Settings** > **Integrations** > **PlanetScale**. 
    - Follow the setup flow, selecting the database created in step 1.

5. In your Worker, install the `@planetscale/database` driver to connect to your PlanetScale database and start manipulating data:

    ```
    npm install @planetscale/database
    ```

6. The following example shows how to make a query to your PlanetScale database in a Worker. The credentials needed to connect to PlanetScale have been automatically added as secrets to your Worker through the integration. 

    ```js
    import { connect } from '@planetscale/database';

    export default {
      async fetch(request, env) {
        const config = {
          host: env.DATABASE_HOST,
          username: env.DATABASE_USERNAME,
          password: env.DATABASE_PASSWORD,
			      fetch: (url, init) => {
				    delete (init)["cache"];
				    return fetch(url, init);
          }
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

To learn more about PlanetScale, refer to [Planetscale's official documentation](https://docs.planetscale.com/).

### Supabase

[Supabase](https://supabase.com/) is an open source Firebase alternative and a PostgreSQL database service that offers real-time functionality, database backups, and extensions. With Supabase, developers can quickly set up a PostgreSQL database and build applications.

1. To set up an integration with Supabase, you to have an existing Supabase database to connect to. [Create a Supabase database](https://supabase.com/docs/guides/database/tables#creating-tables) or [have an existing database to connect to Supabase and load data from](https://supabase.com/docs/guides/database/tables#loading-data).

2. Create a `countries` table with the following query. You can create a table in your Supabase dashboard in two ways:
    - Use the table editor, which allows you to set up Postgres similar to a spreadsheet. 
    - Alternatively, use the [SQL editor](https://supabase.com/docs/guides/database/overview#the-sql-editor):

    ```sql
    CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    );
    ```

 3. Insert some data in your newly created table. Run the following commands to add countries to your table:

    ```sql
    INSERT INTO countries (name) VALUES ('United States');
    INSERT INTO countries (name) VALUES ('Canada');
    INSERT INTO countries (name) VALUES ('The Netherlands');
    ```

4. Add the Supabase database integration to your Worker:
    - Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    - In **Account Home**, select **Workers & Pages**.
    - In **Overview**, select your Worker.
    - Select **Settings** > **Integrations** > **Supabase**. 
    - Follow the setup flow, selecting the database created in step 1.

5. In your Worker, install the `@supabase/supabase-js`  driver to connect to your database and start manipulating data:

    ```
    npm install @supabase/supabase-js
    ```

6. The following example shows how to make a query to your Supabase database in a Worker. The credentials needed to connect to Supabase have been automatically added as secrets to your Worker through the integration.

    ```js 
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

To learn more about Supabase, refer to [Supabase's official documentation](https://supabase.com/docs).

### Neon

[Neon](https://neon.tech/) is a fully managed serverless PostgreSQL. It separates storage and compute to offer modern developer features, such as serverless, branching, and bottomless storage.

1. To set up an integration with Neon, you to have an existing Neon database to connect to. [Create a Neon database](https://neon.tech/docs/tutorial/project-setup#create-a-table) or [load data from an existing database to Neon](https://neon.tech/docs/import/import-from-postgres).

2. Create an `elements` table using the Neon SQL editor. The SQL Editor allows you to query your databases directly from the Neon Console.

    ```sql
    CREATE TABLE elements (
      id INTEGER NOT NULL,
      elementName TEXT NOT NULL,
      atomicNumber INTEGER NOT NULL,
      symbol TEXT NOT NULL
    );
    ```

 3. Insert some data into your newly created table.

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

4. Add the Neon database integration to your Worker:
    - Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    - In **Account Home**, select **Workers & Pages**.
    - In **Overview**, select your Worker.
    - Select **Settings** > **Integrations** > **Neon**. 
    - Follow the setup flow, selecting the database created in step 1.

5. In your Worker, install the `@neondatabase/serverless`  driver to connect to your database and start manipulating data:

    ```
    npm install @neondatabase/serverless
    ```

6. The following example shows how to make a query to your Neon database in a Worker. The credentials needed to connect to Neon have been automatically added as secrets to your Worker through the integration.

    ```js 
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

To learn more about Neon, refer to [Neon's official documentation](https://neon.tech/docs/introduction).

### Upstash

[Upstash](https://upstash.com/) is a serverless database with Redis API. It aims to simplify the process of building and scaling real-time applications by providing a serverless database infrastructure.

1. To set up an integration with Upstash, you to have an existing Upstash database to connect to. [Create a Upstash database](https://docs.upstash.com/redis#create-a-database) or [load data from an existing database to Upstash](https://docs.upstash.com/redis/howto/connectclient).

2. Insert some data to your Upstash database. You can add data to your Upstash database in two ways:
  - Use the CLI directly from your Upstash console
  - Alternatively, install `redis-cli` locally and run the following commands. 

  ```sh
  ➜ set GB "Ey up?"
  OK
  ➜ set US "Yo, what’s up?"
  OK
  ➜ set NL "Hoi, hoe gaat het?"
  OK
  ```

3. Add the Upstash database integration to your Worker:
    - Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    - In **Account Home**, select **Workers & Pages**.
    - In **Overview**, select your Worker.
    - Select **Settings** > **Integrations** > **Upstash**. 
    - Follow the setup flow, selecting the database created in step 1.

4. In your Worker, install the `@upstash/redis`, a HTTP client to connect to your database and start manipulating data:

    ```
    npm install @upstash/redis
    ```

5. The following example shows how to make a query to your Upstash database in a Worker. The credentials needed to connect to Upstash have been automatically added as secrets to your Worker through the integration.

  ```
  import { Redis } from "@upstash/redis/cloudflare";

  export default {
    async fetch(request, env) {
      const redis = Redis.fromEnv(env);

      const country = request.headers.get("cf-ipcountry");
      if (country) {
        const greeting = await redis.get(country);
        if (greeting) {
          return new Response(greeting);
        }
      }

      return new Response("Hello!");
    },
  };
  ```

To learn more about Upstash, refer to [Upstash's official documentation](https://docs.upstash.com/redis).

### FAQs

#### What happens to the Database Integration if I rotate my database credentials?

If you rotate or delete database credentials, you must delete the integration and go through the setup flow again. 

#### Can I select multiple databases per database service?

At this time, Database Integrations only support access to one database per provider. To add multiple, you must manually configure secrets.