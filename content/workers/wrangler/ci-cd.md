---
pcx_content_type: configuration
title: Run in CI/CD
---

# Run Wrangler in CI/CD

Wrangler can be run in a [continuous integration/continuous deployment (CI/CD) environment](/workers/learning/continuous-integration/). It is good practice to only deploy your Workers from within a CI/CD environment, rather than running adhoc deployments manually using `wrangler deploy`. Among other benefits, deploying Workers from within a CI/CD environment makes sure that your Worker is built and deployed within a consistent environment. Deploying Workers from within a CI/CD environment also makes it easier to control access to production credentials.

## 1. Authentication

When running Wrangler locally, authentication to the Cloudflare API happens via the [`wrangler login`](/workers/wrangler/commands/#login) command, which initiates an interactive authentication flow. Since CI/CD environments are non-interactive, Wrangler requires a [Cloudflare API token](/fundamentals/api/get-started/create-token/) and [account ID](/fundamentals/setup/find-account-and-zone-ids/) to authenticate with the Cloudflare API.

### Cloudflare account ID

To find your Cloudflare account ID, refer to [Find account and zone IDs](/fundamentals/setup/find-account-and-zone-ids/).

### API token

To create an API token to authenticate Wrangler in your CI job:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select **My Profile** > **API Tokens**.
3. Select **Create Token** > find **Edit Cloudflare Workers** > select **Use Template**.
4. Customize your token name.
5. Scope your token.

You will need to choose the account and zone resources that the generated API token will have access to. We recommend scoping these down as much as possible to limit the access of your token. For example, if you have access to three different Cloudflare accounts, you should restrict the generated API token to only the account on which you will be deploying a Worker.

## 2. Set up CI

The method for running Wrangler in your CI/CD environment will depend on the specific setup for your project (whether you use GitHub Actions/Jenkins/GitLab or something else entirely).

To set up your CI:

1. Go to your CI platform and add the following as secrets:

- `CLOUDFLARE_ACCOUNT_ID`: Set to the [Cloudflare account ID](/workers/wrangler/ci-cd/#cloudflare-account-id) for the account on which you want to deploy your Worker.
- `CLOUDFLARE_API_TOKEN`: Set to the [Cloudflare API token you generated](/workers/wrangler/ci-cd/#api-token).

{{<Aside type="warning">}}
It is important not to store the value of `CLOUDFLARE_API_TOKEN` in your repository, as it gives access to deploy Workers on your account. Instead, you should utilise your CI/CD provider's support for storing secrets.
{{</Aside>}}

2. Create a workflow that will be responsible for deploying the Worker. This workflow should run `wrangler deploy`. Review an example [GitHub Actions](https://docs.github.com/en/actions/using-workflows/about-workflows) workflow in the follow section.

### GitHub Action

If you use GitHub Actions, Cloudflare provides [an official action](https://github.com/cloudflare/wrangler-action) for deploying Workers. Refer to the following example workflow which deploys your Worker on push to the `main` branch.

```yaml
---
filename: .github/workflows/push.yml
---
name: Deploy Worker
on:
  push:
    branches:
      - main
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

### GitLab Pipelines

Refer to [GitLab's blog](https://about.gitlab.com/blog/2022/11/21/deploy-remix-with-gitlab-and-cloudflare/) for an example pipeline. Under the `script` key, replace `npm run deploy` with [`npx wrangler deploy`](/workers/wrangler/commands/#deploy).
