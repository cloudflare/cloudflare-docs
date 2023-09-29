---
pcx_content_type: configuration
title: Run in CI/CD
---

# Run Wrangler in CI/CD

Wrangler can be run in a continuous integration/continuous deployment (CI/CD) environment. It's good practice to _only_ deploy your Workers from within a CI/CD environment, rather than running adhoc deployments manually using `wrangler deploy`. Among other benefits, this makes sure that your Worker is built and deployed within a consistent environment and makes it easier to control access to production credentials.


## Authentication

When running Wrangler locally, authentication to the Cloudflare API happens via the `wrangler login` command, which initiates an interactive authentication flow. Since CI/CD environments are non-interactive, Wrangler requires a [Cloudflare API token](/fundamentals/api/get-started/create-token/) and [account ID](/fundamentals/setup/find-account-and-zone-ids/) to authenticate with the Cloudflare API.

You can generate an API token that will allow Wrangler to deploy Workers on your account by visiting the following link. You will need to choose the Account and Zone resources that the generated API token will have access to. We recommend scoping these down as much as possible to limit the access of your token. For instance, if you have access to 3 different Cloudflare accounts, you should restrict the generated API token to only the account on which you will be deploying a Worker.


<p>{{<button type="primary" href="https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=[{%22key%22:%22workers_kv_storage%22,%22type%22:%22edit%22},{%22key%22:%22workers_scripts%22,%22type%22:%22edit%22},{%22key%22:%22workers_routes%22,%22type%22:%22edit%22},{%22key%22:%22account_settings%22,%22type%22:%22read%22},{%22key%22:%22user_details%22,%22type%22:%22read%22},{%22key%22:%22workers_tail%22,%22type%22:%22read%22},{%22key%22:%22workers_r2%22,%22type%22:%22edit%22},{%22key%22:%22page%22,%22type%22:%22edit%22},{%22key%22:%22memberships%22,%22type%22:%22read%22}]&name=Wrangler">}}Generate API Token{{</button>}}</p>




## Deploying your Worker

The method for running Wrangler in your CI/CD environment will depend on the specific setup for your project (whether you use GitHub Actions/Jenkins/GitLab or something else entirely).

The basic setup involves running `wrangler deploy` with two environment variables made available:

- `CLOUDFLARE_ACCOUNT_ID`, which should be set to the Cloudflare account ID for the account on which you want to deploy your Worker
- `CLOUDFLARE_API_TOKEN`, which should be set to the Cloudflare API token you generated earlier.

{{<Aside type="warning">}}
It's important not to store the value of `CLOUDFLARE_API_TOKEN` in your repository, as it gives access to deploy Workers on your account. Instead, you should utilise your CI/CD provider's support for storing secrets.
{{</Aside>}}

### GitHub Action

If you use GitHub Actions, we provide [an official action](https://github.com/cloudflare/wrangler-action) for deploying Workers. Here's an example workflow which deploys your Worker on push to the `main` branch.

```yaml
name: Deploy Worker
on:
  push:
    main
jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    needs: test
    steps:
      - uses: actions/checkout@v2
      - name: Build & Deploy Worker
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
```