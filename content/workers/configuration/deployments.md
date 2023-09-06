---
pcx_content_type: concept
title: Deployments
---

# Deployments

{{<Aside type="note">}}

Deployments are currently in Public Beta. Report deployments bugs to the [Wrangler team](https://github.com/cloudflare/wrangler2/issues/new/choose).

{{</Aside>}}

Deployments are a log of static historical versions of your Worker. They track changes to the bundled code, bindings, compatibility date, and usage model associated with a Worker over time. They also keep metadata associated with the deployment including the user, deploy source, timestamp, and other useful information to understand and audit who or what is making changes to your Worker.

The latest deployment for a Worker is considered the active deployment. You can view your latest 10 deployments [via the Cloudflare dashboard](#via-the-cloudflare-dashboard) or the [`wrangler deployments list` command](#via-wrangler).

{{<Aside type="note">}}

Associated resources for a Worker such as [KV](/workers/wrangler/workers-kv/), [R2](/r2/), and [Durable Objects](/durable-objects/) are not tracked with deployments.

{{</Aside>}}

## Creating a new deployment

New deployments are created whenever an upload, binding change (including environment variables and secrets), usage model change, or [rollback](#rollbacks) is made. Create a new deployment via the Cloudflare dashboard, [Workers API](/api/), or Wrangler (with [`npx wrangler deploy` command](/workers/wrangler/commands/#deploy) or [`wrangler rollback` command](/workers/wrangler/commands#rollback)) .

Notably, this does not include changes to bound resources. For example, if two Workers (Worker A and Worker B) are bound via a service binding, changing the code of a Worker B will not trigger a new deployment on Worker A. Changes to the service binding on Worker A will also not trigger a new deployment for Worker B.

{{<Aside type="note">}}

Changing triggers such as routes, custom domains, or cron triggers will not issue a new deployment.

{{</Aside>}}

## Interacting with deployments

### Via Wrangler

Wrangler allows you to view the 10 most recent deployments as well as bindings and metadata for a specific deployment.

For more information on the `wrangler deployments list` and `wrangler deployments view` commands, refer to the [commands documentation](/workers/wrangler/commands#deployments).

### Via the Cloudflare dashboard

To access your deployments:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. In **Overview**, select your Worker > **Deployments**. 

Deployments includes information about previous deployments, and your Worker’s detail page displays information about the most recently deployed and currently active deployment.

### Via the API

To learn more about accessing deployment information via Cloudflare's REST API, refer to the [API documentation](/api/#worker-deployments-properties).

{{<Aside type="note">}}

Deployments are in active development. To give feedback, request a [live chat](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}

## Rollbacks

Rollbacks are a way to quickly deploy an older deployment to the Cloudflare global network. This could be useful if a breaking change or unintended deployment is made to a production Worker.

Perform a rollback via [Wrangler](/workers/configuration/deployments/#via-wrangler-1) or the [Cloudflare dashboard](/workers/configuration/deployments/#via-the-cloudflare-dashboard-1).

### via Wrangler

To perform a rollback via Wrangler, use the `wrangler rollback` command. Refer to [Wrangler `rollback` command documentation](/workers/wrangler/commands#rollback) for more information.

### via the Cloudflare Dashboard

To perform a rollback via the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Workers & Pages** and in **Overview**, select your Worker > **Deployments**. 
3. Find the deployment you would like to rollback to.
4. Select the three dot icon on the right of the deployment and select **Rollback to this deployment**.

## Limitations

Rollbacks are only valid to the latest 10 deployments. 

Rollbacks will not be allowed if external resources have been deleted or modified between the target deployment and the active deployment. Specifically, rollbacks will not be allowed if:

- A [Durable Object migration](/durable-objects/learning/durable-objects-migrations/) has occurred between the active deployment and target deployment.
- If the target deployment has a binding to an R2 bucket, KV namespace, or queue that no longer exists.
- If the target deployment has a binding to a D1 database (this limitation will be removed in the future).

Bound resources will not be changed during a rollback. This means if the structure of data has changed between the active deployment and target deployment, errors could occur using older bundled code with changed data.
