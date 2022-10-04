---
pcx_content_type: how-to
title: Running in CI/CD
weight: 9
---

# Running Wrangler in CI/CD

To run Wrangler in a continuous integration/continuous deployment (CI/CD) environment, you must provide a Cloudflare API token and account ID.

## Create a Cloudflare API token

To create a token, you need to follow the steps outlined on the [API Token](/api/get-started/create-token/) docs. 

![API Token Templates](/workers/wrangler/static/templates.png)

- Select **Edit Cloudflare Workers** template, all templates are prefilled with a token name and permissions, you also need to modify the account and zone resources you want assigned to the token.

- Select continue to summary and review the permissions before selecting create token.

- Add the token to the `CLOUDFLARE_API_TOKEN` environment variable. (for example, `CLOUDFLARE_API_TOKEN=123 wrangler publish`)

## Account ID

You have three options for telling Wrangler which Cloudflare account to use:

- If there is only one account associated with the API token, then the account ID is inferred automatically;
- Add the `account_id` to the project's `wrangler.toml` file (for example, `account_id = "12345679"`).
- Add the account ID to the `CLOUDFLARE_ACCOUNT_ID` environment variable.
