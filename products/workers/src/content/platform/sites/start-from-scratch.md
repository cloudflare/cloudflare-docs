---
order: 1
pcx-content-type: how-to
---

# Start from scratch

To start from scratch to create a Workers Site, follow these steps:

1. Ensure you have the latest version of [Wrangler](/cli-wrangler/install-update#update) and Node.js installed.

2. In your terminal run `wrangler generate --site <project-name>`, replacing `<project-name>` with the name of your project. For example, I’ll create a project called my-site by running this command:

  ```sh
  $ wrangler generate --site my-site
  ```

  This command creates the following:

    - `public`: The static assets for your project. By default it contains an `index.html` and a `favicon.ico`.
    - `workers-site`: The JavaScript for serving your assets. You don’t need to edit this- but if you want to see how it works or add more functionality to your Worker, you can edit `workers-site/index.js`.
    - `wrangler.toml`: Your configuration file. You’ll configure your account and project information here.

3. Add your `account_id` your `wrangler.toml`. You can find your `account_id` on the right sidebar of the Workers or Overview Dashboard. Note: You may need to scroll down! For more details on finding your `account_id` visit [Getting started](/get-started/guide#6a-obtaining-your-account-id-and-zone-id).

4. You can preview your site by running:

  ```sh
  $ wrangler dev
  ```

5. Decide if you would like to publish your site to a [`*.workers.dev` subdomain](/get-started/guide#configure-for-deploying-to-workersdev) or a [custom domain](/get-started/guide#optional-configure-for-deploying-to-a-registered-domain) that you own and have already attached as a Cloudflare zone. Then update your `wrangler.toml` file accordingly:

    **`*.workers.dev`**: Enable the `workers_dev` configuration.

    ```toml
    workers_dev = true
    ```
  
    And/Or

    **Personal Domain**: Add your `zone_id` and a `route`.

    ```toml
    zone_id = "42ef.."
    route = "https://example.com/*"
    ```

    <Aside type="note">

    Refer to the documentation on [Routes](/platform/routes) to configure `route` properly.

    </Aside>
  
    If you enable `workers_dev` and supply configuration for a personal domain, your Worker will deploy to both locations.

    Learn more about [configuring your project](/get-started/guide#7-configure-your-project-for-deployment).

6. Run:

  ```sh
  $ wrangler publish
  ```
