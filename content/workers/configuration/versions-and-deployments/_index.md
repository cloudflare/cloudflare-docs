---
pcx_content_type: concept
title: Versions & Deployments
meta:
  description: Upload versions of Workers and create deployments to release new versions. 
---

{{<heading-pill style="beta">}}Versions & Deployments{{</heading-pill>}}

Versions track changes to your Worker. Deployments configure how those changes are deployed to your traffic. 

You can upload changes (versions) to your Worker independent of changing the version that is actively serving traffic (deployment). 

![Versions and Deployments](/images/workers/platform/versions-and-deployments/versions-and-deployments.png)

Using versions and deployments is useful if:

- You are running critical applications on Workers and want to reduce risk when deploying new versions of your Worker using a rolling deployment strategy or blue/green deployment strategy.
- You want to monitor for performance differences when deploying new versions of your Worker.
- You have a CI pipeline configured for Workers but want to cut manual releases.

{{<Aside type="note">}}

Versions and deployments are in **beta and under active development**. Refer to [Limits](/workers/configuration/versions-and-deployments/#limits) before using these features.

Provide your feeback on versions and deployments through the [feedback form](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}

## Versions

A version is defined by the state of code as well as the state of configuration in a Worker's [`wrangler.toml`](/workers/wrangler/configuration/) file. Versions track historical changes to [bundled code](/workers/wrangler/bundling/) and changes to configuration like [bindings](/workers/configuration/bindings/) and [compatibility date and compatibility flags](/workers/configuration/compatibility-dates/) over time.

Versions also track metadata associated with a version, including: the version ID, the user that created the version, deploy source, and timestamp. Optionally, a version message and version tag can be configured on version upload. 

{{<Aside type="note">}}

State changes for associated Workers [storage resources](/workers/platform/storage-options/) such as [KV](/kv/), [R2](/r2/), [Durable Objects](/durable-objects/) and [D1](/d1/) are not tracked with versions. Refer to [Bindings](/workers/configuration/versions-and-deployments/#bindings) below for more information.

{{</Aside>}}

## Deployments

Deployments track the version(s) of your Worker that are actively serving traffic. A deployment can consist of one or two versions of a Worker. 

By default, Workers supports an all-at-once deployment model where traffic is immediately shifted from one version to the newly deployed version automatically. Alternatively, you can use [gradual deployments](/workers/configuration/versions-and-deployments/gradual-deployments/) to create a rolling deployment strategy or blue/green deployment strategy. 

You can also track metadata associated with a deployment, including: the user that created the deployment, deploy source, timestamp and the version(s) in the deployment. Optionally, you can configure a deployment message when you create a deployment. 

## Use versions and deployments

### Create a new version

Review the different ways you can create versions of your Worker and deploy them.

#### Upload a new version and deploy it immediately

Changes uploaded with [`wrangler deploy`](/workers/wrangler/commands/#deploy), via the Cloudflare dashboard, or the [Workers Script Upload API](/api/operations/worker-script-upload-worker-module) create a new version that is automatically deployed to 100% of traffic. 

#### Upload a new version to be gradually deployed or deployed at a later time 

To create a new version of your Worker that is not deployed immediately, use the [`wrangler versions upload --experimental-versions`](/workers/wrangler/commands/#upload) command or create a new version via the Cloudflare dashboard using the **Save** button. You can find the **Save** option under the down arrow beside the "Deploy" button.

Versions created in this way can then be deployed all at once or gradually deployed using the [wranger versions deploy --experimental-versions](/workers/wrangler/commands/#deploy-2) command or via the Cloudflare dashboard under the **Deployments** tab. 

{{<Aside type="note">}}

When using [wrangler](/workers/wrangler/), changes made to a Worker's triggers [routes,  domains](/workers/configuration/routing/) or [cron triggers](/workers/configuration/cron-triggers/) need to be applied with the command [`wrangler triggers deploy --experimental-versions`](/workers/wrangler/commands/#triggers). 
{{</Aside>}}

{{<Aside type="note">}}

New versions are not created when you make changes to [resources connected to your Worker](/workers/runtime-apis/bindings/). For example, if two Workers (Worker A and Worker B) are connected via a [service binding](/workers/configuration/bindings/about-service-bindings/), changing the code of Worker B will not create a new version of Worker A. Changing the code of Worker B will only create a new version of Worker B. Changes to the service binding (such as, deleting the binding or updating the [environment](/workers/wrangler/environments/) it points to) on Worker A will also not create a new version of Worker B.
{{</Aside>}}

### View versions and deployments

#### Via Wrangler

Wrangler allows you to view the 10 most recent versions and deployments. Refer to the [`versions list`](/workers/wrangler/commands/#list-8) and [`deployments`](/workers/wrangler/commands/#list-9) documentation to view the commands. 

#### Via the Cloudflare dashboard

To view your deployments in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers) and select your account.
2. Go to **Workers & Pages**.
3. Select your Worker > **Deployments**.  

## Limits

### Service worker syntax

Service worker syntax is not supported for versions that are uploaded through [`wrangler versions upload --experimental-versions`](/workers/wrangler/commands/#upload). You must use ES modules format. 

Refer to [Migrate from Service Workers to ES modules](/workers/reference/migrate-to-module-workers/#advantages-of-migrating) to learn how to migrate your Workers from the service worker format to the ES modules format.