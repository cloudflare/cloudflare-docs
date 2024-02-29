---
pcx_content_type: concept
title: Versions & Deployments
meta:
  description: Upload versions of Workers and create deployments to release new versions. 
---

# Versions & Deployments


## Versions
Versions track the state of code as well as the state of config defined in a script’s wrangler.toml file. They track historical changes to [bundled code](/workers/wrangler/bundling/), [bindings](/workers/configuration/bindings/), [compatibility date](/workers/configuration/compatibility-dates/), and [usage model](/workers/platform/pricing/#workers) associated with a Worker over time.

Versions also keep metadata associated with the deployment including the user, deploy source, timestamp, and other useful information to understand and audit who or what is making changes to your Worker.

{{<Aside type="note">}}

State changes for associated Workers resources such as [KV](/kv/), [R2](/r2/), [Durable Objects](/durable-objects/) and D1 are not tracked with versions.

{{</Aside>}}

## Deployments

Deployments track the version(s) of your Worker that are actively serving traffic. 

By default, new versions uploaded with the [Workers Upload API](https://developers.cloudflare.com/api/operations/worker-script-upload-worker-module), `wrangler deploy` or via the Cloudflare dashboard are automatically deployed to 100% of traffic.


## Using Versions and Deployments
Together, versions and deployments are used to track changes to your Worker and configure how those changes are deployed to your traffic. With the introduction of versions and deployments, it is now possible to upload changes to your Worker independent of changing the version that's actively serving traffic. This is useful if:

- You have a CI pipeline configured for Workers, but want to cut manual releases
- You're running critical applications on Workers and want to [gradually deploy](/gradual-deployments) versions of your Worker

### Create a new version

There are two ways to create a new version:

**Uploading a new version and deploying it immediately**

By default, new versions uploaded with the [Workers Upload API](https://developers.cloudflare.com/api/operations/worker-script-upload-worker-module), `wrangler deploy` or via the Cloudflare dashboard are automatically deployed to 100% of traffic. 

**Uploading a new version to be [gradually deployed](/gradual-deployments) or deployed at a later time** 

In order to upload a new version that is not deployed immediately, use the new [Worker Versions API](https://developers.cloudflare.com/api/operations/worker-script-upload-worker-module), new `wrangler versions upload` command or upload via the Cloudflare dashboarding using the "Save changes" buttons. 



## Create a new deployment

New deployments are created whenever an upload, binding change (including [environment variables](/workers/configuration/environment-variables/) and [secrets](/workers/configuration/secrets/)), usage model change, or [rollback](#rollbacks) is made.

Create a new deployment via the Cloudflare dashboard, [Workers API](/api/), or Wrangler (with [`npx wrangler deploy` command](/workers/wrangler/commands/#deploy) or [`wrangler rollback` command](/workers/wrangler/commands#rollback)) .

Notably, deployments are not triggered by changes to bound resources. For example, if two Workers (Worker A and Worker B) are bound via a [service binding](/workers/configuration/bindings/about-service-bindings/), changing the code of Worker B will not trigger a new deployment on Worker A. Changes to the service binding (such as, deleting the binding or updating the [environment](/workers/wrangler/environments/) it points to) on Worker A will also not trigger a new deployment for Worker B.

{{<Aside type="note">}}

Updating [routes](/workers/configuration/routing/routes/), [Custom Domains](/workers/configuration/routing/custom-domains/), or [Cron Triggers](/workers/configuration/cron-triggers/) will not issue a new deployment.

{{</Aside>}}

## Interact with deployments

### Via Wrangler

Wrangler allows you to view the 10 most recent deployments as well as bindings and metadata for a specific deployment.

For more information on the `npx wrangler deployments list` and `npx wrangler deployments view` commands, refer to the [`deployments` command documentation](/workers/wrangler/commands#deployments).

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

Rollbacks are a way to deploy an older deployment to the Cloudflare global network. Rollbacks are useful if a breaking change or unintended deployment is made to a production Worker.

Perform a rollback via [Wrangler](/workers/configuration/deployments/#via-wrangler-1) or the [Cloudflare dashboard](/workers/configuration/deployments/#via-the-cloudflare-dashboard-1).

### Via Wrangler

To perform a rollback via Wrangler, use the `wrangler rollback` command. Refer to [Wrangler `rollback` command documentation](/workers/wrangler/commands#rollback) for more information.

### Via the Cloudflare Dashboard

To perform a rollback via the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Workers & Pages** and in **Overview**, select your Worker > **Deployments**. 
3. Find the deployment you would like to rollback to.
4. Select the three dot icon on the right of the deployment and select **Rollback to this deployment**.

## Limitations

Rollbacks are only valid to the latest 10 deployments. 

Rollbacks will not be allowed if external resources have been deleted or modified between the target deployment and the active deployment. Specifically, rollbacks will not be allowed if:

- A [Durable Object migration](/durable-objects/reference/durable-objects-migrations/) has occurred between the active deployment and target deployment.
- If the target deployment has a binding to an R2 bucket, KV namespace, or queue that no longer exists.
- If the target deployment has a binding to a D1 database (this limitation will be removed in the future).

Bound resources will not be changed during a rollback. This means if the structure of data has changed between the active deployment and target deployment, errors could occur using older bundled code with changed data.

## Related resources

* [`npx wrangler deploy` documentation](/workers/wrangler/commands#deploy) - Deploy your Worker with the Wrangler CLI.
* [`npx wrangler deployments` documentation](/workers/wrangler/commands#deployments) - List your deployments and view details about a specific deployment.



You can view your latest 10 versions [via the Cloudflare dashboard](#via-the-cloudflare-dashboard) or the [`npx wrangler versions list` command](#via-wrangler).



