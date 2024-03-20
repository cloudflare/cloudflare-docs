---
pcx_content_type: concept
title: Versions & Deployments
meta:
  description: Upload versions of Workers and create deployments to release new versions. 
---

{{<heading-pill style="beta">}}Versions & Deployments{{</heading-pill>}}

Versions track changes to your Worker. Deployments configure how those changes are deployed to your traffic. 

You can upload changes (versions) to your Worker independent of changing the version that is actively serving traffic (deployment). Using versions and deployments is useful if:

- You are running critical applications on Workers and want to reduce risk when deploying new versions of your Worker.
- You want to monitor for performance differences when deploying new versions of your Worker.
- You have a CI pipeline configured for Workers but want to cut manual releases.
{{<Aside type="note">}}

Versions and deployments are in **beta and under active development**. Refer to [Limits](/workers/configuration/versions-and-deployments/#limits) before using these features.

Provide your feeback through the [feedback form](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}

## Versions

Versions track the state of code as well as the state of configuration defined in a Worker's [`wrangler.toml`](/workers/wrangler/configuration/) file. Versions track historical changes to [bundled code](/workers/wrangler/bundling/) and changes to configuration like [bindings](/workers/configuration/bindings/) and [compatibility date and compatibility flags](/workers/configuration/compatibility-dates/) over time.

Versions also track metadata associated with a version, including: the version ID, the user that created the version, deploy source, timestamp. Optionally, a version message and version tag can be configured on version upload. 

{{<Aside type="note">}}

State changes for associated Workers storage resources such as [KV](/kv/), [R2](/r2/), [Durable Objects](/durable-objects/) and [D1](/d1/) are not tracked with versions.

{{</Aside>}}

## Deployments

Deployments track the version(s) of your Worker that are actively serving traffic. A deployment can consist of one or two versions of a Worker. 

By default, Workers supports an all-at-once deployment model where traffic is immediately shifted from one version to the newly deployed version automatically. Alternatively, [gradual deployments]((/gradual-deployments)) can be used to safely roll out a new version by incrementally shifting traffic it.

Metadata associated with a deployment is also tracked, including: the user that created the deployment, deploy source, timestamp and the version(s) in the deployment. Optionally, a deployment message can be configured when a deployment is created. 

## Using Versions and Deployments

With versions and deployments, you can upload changes to your Worker independent of changing the version that's actively serving traffic. This is useful if:

- You're running critical applications on Workers and want to reduce risk when deploying new versions of your Worker.
- You want to monitor for performance differences when deploying new versions of your Worker.
- You have a CI pipeline configured for Workers, but want to cut manual releases.

### Create a new version

Review the different ways you can create versions of your Worker and deploy them.

#### Upload a new version and deploy it immediately

Changes uploaded with [`wrangler deploy`](/workers/wrangler/commands/#deploy), via the Cloudflare dashboard or the [Workers Script Upload API](https://developers.cloudflare.com/api/operations/worker-script-upload-worker-module) create a new version that is automatically deployed to 100% of traffic. 

**Uploading a new version to be [gradually deployed](/gradual-deployments) or deployed at a later time** 

In order to create a new version that is not deployed immediately, use the new wrangler command `npx wrangler versions upload --experimental-gradual-rollouts` or create a new version via the Cloudflare dashboarding using the "Save changes" buttons.

For more details on the wrangler commands, refer to the [`wrangler versions` command documentation](/workers/wrangler/commands/#versions). 

{{<Aside type="note">}}

**New versions are not created when you make changes to [resources connected to your Worker](/workers/runtime-apis/bindings/)**

For example, if two Workers (Worker A and Worker B) are connected via a [service binding](/workers/configuration/bindings/about-service-bindings/), changing the code of Worker B will not create a new version of Worker A. It will only create a new version of Worker B. Changes to the service binding (such as, deleting the binding or updating the [environment](/workers/wrangler/environments/) it points to) on Worker A will also not create a new version of Worker B.

{{</Aside>}}

## View versions and deployments

### Via Wrangler

Wrangler allows you to view the 10 most recent versions and deployments. Refer to the [`versions`](/workers/wrangler/commands#versions) and [`deployments`](/workers/wrangler/commands/#deployments) documentation to view the commands. 

### Via the Cloudflare dashboard

To view your deployments in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers) and select your account.
2. Select your Worker > **Deployments**.  

## Limits

**Making changes to Routes, Custom Domains, Cron Triggers, Logpush or Tail Workers**

Currently, Wrangler users must deploy updates to [routes](/workers/configuration/routing/routes/), [Custom Domains](/workers/configuration/routing/custom-domains/), [Cron Triggers](/workers/configuration/cron-triggers/), [Logpush](/observability/logging/logpush/) or [Tail Workers](observability/logging/tail-workers/) using `npx wrangler deploy`. Updates to routes, Custom Domains, Cron Triggers, Logpush, and Tail Workers using `npx wrangler versions upload --experimental-gradual-rollouts` will not take effect. This will be fixed in the near future. 
