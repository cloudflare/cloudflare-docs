---
pcx-content-type: how-to
title: Running in CI/CD
weight: 9
---

# Running Wrangler in CI/CD

To run Wrangler in a continuous integration/continuous deployment (CI/CD) environment, you must provide a Cloudflare API token and account ID.

## Cloudflare API token

Add the token to the `CLOUDFLARE_API_TOKEN` environment variable.

## Account ID

There are three options:

- If there is only one account associated with the API token, then the account ID is inferred automatically;
- Add the `account_id` to the project's `wrangler.toml` file (for example, `account_id = "12345679"`).
- Add the account ID to the `CLOUDFLARE_ACCOUNT_ID` environment variable.
