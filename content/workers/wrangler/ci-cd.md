---
pcx-content-type: how-to
title: Running in CI/CD
weight: 9
---

# Running Wrangler in CI/CD

To run Wrangler in a continuous integration/continuous deployment (CI/CD) environment, the `account_id` will either need to be present in your `wrangler.toml` or as the `CLOUDFLARE_ACCOUNT_ID` environment variable.

Cloudflare API token will also have to be specified as the `CLOUDFLARE_API_TOKEN` environment variable.
