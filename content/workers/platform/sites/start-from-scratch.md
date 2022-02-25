---
pcx-content-type: how-to
title: Start from scratch
weight: 2
---

# Start from scratch

To start from scratch to create a Workers Site, follow these steps:

1.  Ensure you have the latest version of [Wrangler](/workers/cli-wrangler/install-update/#update) and Node.js installed.

2.  In your terminal, run `wrangler generate --site <project-name>`, replacing `<project-name>` with the name of your project. The following example creates a project called `my-site`:

```sh
$ wrangler generate --site my-site
```

This command creates the following:

    - `public`: The static assets for your project. By default it contains an `index.html` and a `favicon.ico`.
    - `workers-site`: The JavaScript for serving your assets. You do not need to edit this but if you want to see how it works or add more functionality to your Worker, you can edit `workers-site/index.js`.
    - `wrangler.toml`: Your configuration file where you configure your account and project information.

3\. Add your `account_id` to your `wrangler.toml` file. You can find your `account_id` by logging into the Cloudflare dashboard **Account Home** > choose your **website** > **Overview** > **Account ID**. For more details on finding your `account_id`, refer to the [Get started guide](/workers/get-started/guide/#6a-obtaining-your-account-id-and-zone-id).

4.  You can preview your site by running the [`wrangler dev`](/workers/cli-wrangler/commands/#dev) command:

```sh
$ wrangler dev
```

5.  Decide if you would like to publish your site to a [`*.workers.dev` subdomain](/workers/get-started/guide/#configure-for-deploying-to-workersdev) or a [custom domain](/workers/get-started/guide/#optional-configure-for-deploying-to-a-registered-domain) that you own and have already attached as a Cloudflare zone.Then update your `wrangler.toml` file:

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

     {{<Aside type="note">}}

    Refer to the documentation on [Routes](/workers/platform/routes/) to configure a `route` properly.

     {{</Aside>}}

    If you enable `workers_dev` and supply configuration for a personal domain, your Worker will deploy to both locations.

    Learn more about [configuring your project](/workers/get-started/guide/#7-configure-your-project-for-deployment).

6.  Run:

```sh
$ wrangler publish
```
