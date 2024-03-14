---
pcx_content_type: configuration
title: Rollbacks
meta:
  description: Revert to an older version of your Worker with rollbacks. 
---

{{<heading-pill style="beta">}}Gradual Deployments{{</heading-pill>}}

## Rollbacks

Rollbacks are a way to deploy an older version to the Cloudflare global network. Rollbacks are useful if you notice issues with a version that has been deployed and want to get the Worker back into a stable version. 

Perform a rollback via [Wrangler](/workers/configuration/deployments/#via-wrangler-1) or the [Cloudflare dashboard](/workers/configuration/deployments/#via-the-cloudflare-dashboard-1).

### Via Wrangler

To perform a rollback via Wrangler, use the `wrangler rollback` command. Refer to [Wrangler `rollback` command documentation](/workers/wrangler/commands#rollback) for more information.

### Via the Cloudflare Dashboard

To perform a rollback via the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Workers & Pages** and in **Overview**, select your Worker > **Deployments**. 
3. Find the version you would like to rollback to.
4. Select the three dot icon on the right of the deployment and select **Rollback**.

## Limitations

Rollbacks are only valid to the latest 10 versions. 

Rollbacks will not be allowed if external resources have been deleted or modified between the target deployment and the active deployment. Specifically, rollbacks will not be allowed if:

- A [Durable Object migration](/durable-objects/reference/durable-objects-migrations/) has occurred between the active deployment and target deployment.
- If the target deployment has a binding to an R2 bucket, KV namespace, or queue that no longer exists.
- If the target deployment has a binding to a D1 database (this limitation will be removed in the future).

Bound resources will not be changed during a rollback. This means if the structure of data has changed between the active deployment and the version selected to rollback to, errors could occur using older bundled code with changed data.