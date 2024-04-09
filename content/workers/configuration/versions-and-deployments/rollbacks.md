---
pcx_content_type: configuration
title: Rollbacks
meta:
  description: Revert to an older version of your Worker. 
---

{{<heading-pill style="beta">}}Rollbacks{{</heading-pill>}}

You can roll back to a previously deployed [version](/workers/configuration/versions-and-deployments/#versions) of your Worker using [Wrangler](/workers/wrangler/commands/#rollback) or the Cloudflare dashboard. Rolling back to a previous version of your Worker will immediately create a new [deployment](/workers/configuration/versions-and-deployments/#deployments) with the version specified and become the active deployment across all your deployed routes and domains. 

## Via Wrangler

To roll back to a specified version of your Worker via Wrangler, use the [`wrangler rollback`](/workers/wrangler/commands/#rollback) command.

## Via the Cloudflare Dashboard

To roll back to a specified version of your Worker via the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers) and select your account.
2. Go to **Workers & Pages** > select your Worker > **Deployments**. 
3. Select the three dot icon on the right of the version you would like to roll back to and select **Rollback**.

{{<Aside type="warning">}}

**[Resources connected to your Worker](/workers/configuration/bindings/) will not be changed during a rollback.**

Errors could occur if using code for a prior version if the structure of data has changed between the version in the active deployment and the version selected to rollback to.

{{</Aside>}}
## Limits

### Rollbacks limit

You can only roll back to the 10 most recently published versions.

### Bindings

You cannot roll back to a previous version of your Worker if the [Cloudflare Developer Platform resources](/workers/configuration/bindings/) (such as [KV](/kv/) and [D1](/d1/)) have been deleted or modified between the version selected to roll back to and the version in the active deployment. Specifically, rollbacks will not be allowed if:

- A [Durable Object migration](/durable-objects/reference/durable-objects-migrations/) has occurred between the version in the active deployment and the version selected to roll back to.
- If the target deployment has a [binding](/workers/configuration/bindings/) to an R2 bucket, KV namespace, or queue that no longer exists.
