---
pcx_content_type: configuration
title: Fauna
---

# Fauna

[Fauna](https://fauna.com/) is a is a distributed document-relational database that combines the flexibility of documents with the power of a relational, ACID compliant database that scales across regions, clouds or the globe.

{{<render file="_database_integrations_definition.md">}}

## Set up an integration with Fauna

To set up an integration with Fauna:

1. You need to have an existing Fauna database to connect to. [Create a Fauna database with demo data](https://docs.fauna.com/fauna/current/get-started/quick-start/?lang=javascript#create-a-database).

2. Once your database is created with demo data, you can query it directly using the Shell tab in the Fauna dashboard:

    ```sh
    Customer.all()
    ```

3. Add the Fauna database integration to your Worker:

    1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    2. In **Account Home**, select **Workers & Pages**.
    3. In **Overview**, select your Worker.
    4. Select **Integrations** > **Fauna**.
    5. Follow the setup flow, selecting the database created in step 1.

4. In your Worker, install the `fauna` driver to connect to your database and start manipulating data:

    ```sh
    npm install fauna
    ```

5. The following example shows how to make a query to your Fauna database in a Worker. The credentials needed to connect to Fauna have been automatically added as secrets to your Worker through the integration.

    ```javascript
    import { Client, fql } from 'fauna';

    export default {
      async fetch(request, env) {
        const fauna = new Client({
        secret: env.FAUNA_SECRET,
        });
        const query = fql`Customer.all()`;
        const result = await fauna.query(query);
        return Response.json(result.data);
      }
    }
    ```

To learn more about Fauna, refer to [Fauna's official documentation](https://docs.fauna.com/).