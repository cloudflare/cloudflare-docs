---
pcx_content_type: concept
title: Deploy button
---

# Deploy button

## Background

Deploy buttons let you deploy applications to Cloudflare's global network in under five minutes. The deploy buttons use Wrangler to deploy a Worker using the [Wrangler GitHub Action](https://github.com/marketplace/actions/deploy-to-cloudflare-workers-with-wrangler). You can deploy an application from a set of ready-made Cloudflare templates, or make deploy buttons for your own applications to make sharing your work easier.

Try the deploy button below to deploy a GraphQL server:

<p>
  <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/workers-graphql-server" target="_blank" rel="noopener">
    <img src="https://deploy.workers.cloudflare.com/button" alt="Select Deploy with Workers to deploy a GraphQL server">
  </a> 
</p>


Refer to [deploy.workers.cloudflare.com](https://deploy.workers.cloudflare.com/) for additional projects to deploy.

## Create a deploy button for your project

1.  Add a GitHub Actions workflow to your project.

Add a new file to `.github/workflows`, such as `.github/workflows/deploy.yml`, and create a GitHub workflow for deploying your project. It should include a set of `on` events, including at least `repository_dispatch`, but probably `push` and maybe `schedule` as well. Add a step for publishing your project using [wrangler-action](https://github.com/cloudflare/wrangler-action):

```yaml
name: Deploy Worker
on:
  push:
  pull_request:
  repository_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    needs: test
    steps:
      - uses: actions/checkout@v2
      - name: Build & Deploy Worker
        uses: cloudflare/wrangler-action@2.0.0
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
```

2.  Add the Markdown code for your button to your project's README, replacing the example `url` parameter with your repository URL.

```md
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOURUSERNAME/YOURREPO)
```

3. With your button configured, anyone can use the **Deploy with Workers** button in your repository README, and deploy their own copy of your application to Cloudflare's global network.
