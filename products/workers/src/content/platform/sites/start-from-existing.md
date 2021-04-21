---
order: 0
---

# Start from existing

Workers Sites require [Wrangler](https://github.com/cloudflare/wrangler) — make sure to be on the [latest version](/cli-wrangler/install-update#update).

To deploy a pre-existing static site project, you’ll need to start with a pre-generated site. Workers Sites works well with all static site generators! For a quick-start, check out the following projects:

- [Hugo](https://gohugo.io/getting-started/quick-start/)
- [Gatsby](https://www.gatsbyjs.org/docs/quick-start/), requires Node
- [Jekyll](https://jekyllrb.com/docs/), requires Ruby
- [Eleventy](https://www.11ty.io/#quick-start), requires Node
- [WordPress](https://wordpress.org) (see our tutorial on [deploying static WordPress sites with Workers](/tutorials/hosting-static-wordpress-sites))

Once you have a site generated, follow these steps:

1. Run this Wrangler command in the root of your project’s directory:

  ```sh
  $ wrangler init --site my-static-site
  ```

  This command creates a few things: `wrangler.toml` and a `workers-site` directory.

2. Add your site’s build directory to the `wrangler.toml`:

  ```toml
  [site]
  bucket = "./public" # <-- Add your build directory name here!
  entry-point = "workers-site"
  ```

  The default directories for the most popular static site generators are listed below:

    - Hugo: `public`
    - Gatsby: `public`
    - Jekyll: `_site`
    - Eleventy: `_site`

3. Add your `account_id` to your `wrangler.toml`. You can find your `account_id` on the right sidebar of the Workers or Overview Dashboard. Note: You may need to scroll down! For more details on finding your `account_id` visit [Getting started](/get-started/guide#6a-obtaining-your-account-id-and-zone-id).

4. You can preview your site by running:

  ```sh
  $ wrangler preview --watch
  ```

5. Decide where you’d like to publish your site to: [a workers.dev subdomain](/get-started/guide#configure-for-deploying-to-workersdev) or your [personal domain](/get-started/guide#optional-configure-for-deploying-to-a-registered-domain) registered with Cloudflare.

  Then, update your `wrangler.toml`:

  **Personal Domain**: Add your `zone_id` and a `route`.

  ```toml
  zone_id = "42ef.."
  route = "example.com/*"
  ```

  **workers.dev**: Set `workers_dev` to true. This is the default.

  Learn more about [configuring your project](/get-started/guide#6-configure-your-project-for-deployment).

6. Run:

  ```sh
  $ wrangler publish
  ```