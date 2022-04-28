---
pcx-content-type: how-to
title: Authentication
weight: 2
---

# Running Wrangler in CI/CD

To run Wrangler in a CI/CD environment, the `account_id` will either need to be present in your `wrangler.toml` or in the scope of whatever environment you're running in.

Cloudflare API token will also have to be in your environment (for example, [GitHub secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)).
