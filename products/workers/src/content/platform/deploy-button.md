---
order: 7
---

# Deploy button

## Background

Deploy buttons let you deploy projects to the Workers platform in under five minutes. The deploy buttons use a Worker to deploy to the platform using the [Workers GitHub Action](https://github.com/marketplace/actions/github-action-for-cloudflare-workers). You can also make your own deploy buttons for your projects to make sharing your work easier.

Try the deploy button below to deploy a GraphQL server:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/signalnerve/workers-graphql-server)

Visit [deploy.workers.cloudflare.com](https://deploy.workers.cloudflare.com/) for additional projects to deploy.

## Create a deploy button for your project

1. **Add a GitHub Actions workflow to your project.**

Add a new file to `.github/workflows`, such as `.github/workflows/deploy.yml`, and create a GitHub workflow for deploying your project. It should include a set of `on` events, including _at least_ `repository_dispatch`, but probably `push` and maybe `schedule` as well. Add a step for publishing your project using [wrangler-action](https://github.com/cloudflare/wrangler-action):

```yaml
name: Build
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
        - name: Publish
          uses: cloudflare/wrangler-action@1.3.0
```

2. **Add support for `CF_API_TOKEN` and `CF_ACCOUNT_ID` in your workflow**:

```yaml
# Update "Publish" step from last code snippet
- name: Publish
  uses: cloudflare/wrangler-action@1.3.0
  with:
    apiToken: ${{ secrets.CF_API_TOKEN }}
  env:
    CF_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
```

3. **Add the Markdown code for your button to your project's README, replacing the example `url` parameter with your repository URL.**

```md
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOURUSERNAME/YOURREPO)
```

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com)
