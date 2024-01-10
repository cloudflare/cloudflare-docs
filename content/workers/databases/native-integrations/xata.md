---
pcx_content_type: configuration
title: Xata
---

# Xata

[Xata](https://xata.io) is a serverless data platform powered by PostgreSQL. Xata uniquely combines multiple types of stores (relational databases, search engines, analytics engines) into a single service, accessible through a consistent REST API.

{{<render file="_database_integrations_definition.md">}}

## Set up an integration with Xata

To set up an integration with Xata:

1. You need to have an existing Xata database to connect to or create a new database from your Xata workspace [Create a Database](https://app.xata.io/workspaces).

2. In your database, you have several options for creating a table: you can start from scratch, use a template filled with sample data, or import data from a CSV file. For this guide, choose **Start with sample data**. This option automatically populates your database with two sample tables: `Posts` and `Users`.

3. Add the Xata integration to your Worker:

4. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
5. In **Account Home**, select **Workers & Pages**.
6. In **Overview**, select your Worker.
7. Select **Integrations** > **Xata**.
8. Follow the setup flow, selecting the database created in step 1.

9. Install the [Xata CLI](https://xata.io/docs/getting-started/installation) and authenticate the CLI by running the following commands:

   ```sh
   npm install -g @xata.io/cli

   xata auth login
   ```

10. Once you have the CLI set up, In your Worker, run the following code in the root directory of your project:

    ```sh
    xata init
    ```

    Accept the default settings during the configuration process. After completion, a `.env` and `.xatarc` file will be generated in your project folder.

11. To enable Cloudflare access the secret values generated when running in development mode, create a `.dev.vars` file in your project's root directory and add the following content, replacing placeholders with the specific values:

    ```sh
    XATA_API_KEY=<YOUR_API_KEY_HERE>
    XATA_BRANCH=<YOUR_BRANCH_HERE>
    XATA_DATABASE_URL=<YOUR_DATABASE_URL_HERE>
    ```

12. The following example shows how to make a query to your Xata database in a Worker. The credentials needed to connect to Xata have been automatically added as secrets to your Worker through the integration.

    ```ts
    ---
    filename: Worker code
    ---
    export default {
      async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const xata = new XataClient({
          apiKey: env.XATA_API_KEY,
          branch: env.XATA_BRANCH,
          databaseURL: env.XATA_DATABASE_URL,
        });
        const records = await xata.db.Posts.select([
          'id',
          'title',
          'author.name',
          'author.email',
          'author.bio',
        ]).getAll();

        return new Response(JSON.stringify(records), {
          status: 200
        });
      },
    };
    ```

To learn more about Xata, refer to [Xata's official documentation](https://xata.io/docs).
