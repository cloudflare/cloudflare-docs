---
pcx_content_type: configuration
title: Rollbacks
meta:
  description: Revert to an older version of your Worker. 
---

{{<heading-pill style="beta">}}Rollbacks{{</heading-pill>}}

You can rollback to a previously deployed [version](/workers/configuration/versions-and-deployments/#versions) of your Worker using [wrangler](/workers/wrangler/commands/#rollback) or the dashboard. Rollback will immediately create a new [deployment](/workers/configuration/versions-and-deployments/#deployments) with the version specified and become the active deployment across all your deployed routes and domains. 

Perform a rollback via [Wrangler](/workers/configuration/deployments/#via-wrangler-1) or the [Cloudflare dashboard](/workers/configuration/deployments/#via-the-cloudflare-dashboard-1).

## Via Wrangler

To perform a rollback via Wrangler, use the `wrangler rollback` command. Refer to [Wrangler `rollback` command documentation](/workers/wrangler/commands/#rollback) for more information.

## Via the Cloudflare Dashboard

To perform a rollback via the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers) and select your account.
2. In **Overview**, select your Worker > **Deployments**. 
3. Select the three dot icon on the right of the version you would like to rollback to and select **Rollback**.

{{<Aside type="warning">}}

**[Resources connected to your Worker](/workers/runtime-apis/bindings/) will not be changed during a rollback.**

Errors could occur if using code for a prior version if the structure of data has changed between the version in the active deployment and the version selected to rollback to.

{{</Aside>}}
## Limitations

1. You can only rollback to the 10 most recently published versions. 

2. You cannot perform a rollback if external resources have been deleted or modified between the version selected to rollback to and the version in the active deployment. Specifically, rollbacks will not be allowed if:

- A [Durable Object migration](/durable-objects/reference/durable-objects-migrations/) has occurred between the version in the active deployment and the version selected to rollback to.
- If the target deployment has a binding to an R2 bucket, KV namespace, or queue that no longer exists.
- If the target deployment has a binding to a D1 database (this limitation will be removed in the future).