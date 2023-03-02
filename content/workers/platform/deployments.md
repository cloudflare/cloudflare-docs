---
pcx_content_type: concept
title: Deployments
---

# Deployments

{{<Aside type="note">}}

Deployments are currently in Public Beta and subcommands are currently in Beta. Please report Deployments bugs to the [Wrangler team](https://github.com/cloudflare/wrangler2/issues/new/choose).

{{</Aside>}}

Deployments are a log of static historical versions of your Worker. They track changes to the bundled code, bindings, compatibility date, and usage model associated with a Worker over time. They also keep metadata associated with the deployment including the user, deploy source, timestamp, and other useful information to understand and audit who or what is making changes to your Worker.

The latest deployment for a Worker is considered the "active deployment". You can view your latest 10 deployments [via the Cloudflare dashboard](#via-the-cloudflare-dashboard) or the [`wrangler deployments` command](#via-wrangler).

{{<Aside type="note">}}

Associated resources for a worker such as KV, R2, and Durable Objects are not tracked with deployments.

{{</Aside>}}

## Creating a new Deployment

New Deployments are created whenever an upload, binding change (including environment variables and secrets), usage model change, or [rollback](#rollbacks) is made. These can be done via the Cloudflare Dashboard, [Workers API](/api), or [`wrangler publish` command](/workers/wrangler/commands#publish).

Notably, this does not include changes to bound resources. For example, if two workers (Worker A and Worker B) are bound via a service binding, changing the code of a Worker B will not trigger a new deployment on Worker A. Changes to the service binding on Worker A will also not trigger a new deployment for Worker B.

{{<Aside type="note">}}

Changing triggers such as routes, custom domains, or cron triggers will not issue a new deployment.

{{</Aside>}}

## Interacting with Deployments

### via Wrangler

Wrangler allows you to view the 10 most recent deployments as well as source code, bindings and runtime information about a specific deployment.

More details about the `wrangler deployments` and `wrangler deployments view` command can be found [here](/workers/wrangler/commands#deployments).

### via the Cloudflare Dashboard

Access Deployments by logging into the [Cloudflare dashboard](https://dash.cloudflare.com) > **Account Home** > **Workers** > selecting your Worker project > **Deployments**. Deployments includes information about previous deployments, and your Worker’s detail page will now indicate information about the most recently deployed and currently active deployment.

### via the API

Read more about accessing Deployment information via Cloudflare's REST API [here](/api/#worker-deployments-properties).

{{<Aside type="note">}}

Deployments are in active development. To give feedback, request a [live chat](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}

## Rollbacks
Rollbacks are a way to quickly deploy an older deployment to the edge. This could be useful if a breaking change or unintended publish is made to a production Worker.

There are currently two ways to perform a rollback: via Wrangler or via the Cloudflare Dashboard.

### via Wrangler

You can rollback in Wrangler using the `wrangler deployments rollback` command detailed [here](/workers/wrangler/commands#rollback).

### via the Cloudflare Dashboard

In the Dashboard, find the deployments tab under your Worker. From there, you can select the menu dropdown on the right of the deployment and select **`Rollback to this deployment`**.

## Limitations
Rollbacks are only valid to the latest 10 deployments. 

Rollbacks will not be allowed if external resources have been deleted or modified between the target deployment and the active deployment. Specifically if:

- A Durable Object migration has occurred between the active deployment and target deployment.
- If the target deployment has a binding to an R2 bucket, KV namespace, or Queue that no longer exists.
- If the target deployment has a binding to a D1 database (this limitation will be removed in the future)

Bound resources will not be changed during a rollback. This means if the structure of data has changed between the active deployment and target deployment, errors could occur using older bundled code with changed data.
