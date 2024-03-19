---
pcx_content_type: concept
title: Versions & Deployments
meta:
  description: Upload versions of Workers and create deployments to release new versions. 
---

{{<heading-pill style="beta">}}Versions & Deployments{{</heading-pill>}}

## Versions
Versions track the state of code as well as the state of configuration defined in a script’s wrangler.toml file. They track historical changes to [bundled code](/workers/wrangler/bundling/) and changes to configuration like [bindings](/workers/configuration/bindings/), [compatibility date and compatibility flags](/workers/configuration/compatibility-dates/) over time.

{{<Aside type="note">}}

State changes for associated Workers storage resources such as [KV](/kv/), [R2](/r2/), [Durable Objects](/durable-objects/) and [D1](/d1/) are not tracked with versions.

{{</Aside>}}

## Deployments

Deployments track the version(s) of your Worker that are actively serving traffic. 

By default, changes to Workers through `npx wrangler deploy`, via the Cloudflare dashboard or the [Workers Script Upload API](https://developers.cloudflare.com/api/operations/worker-script-upload-worker-module) automatically create a new version that is deployed to 100% of traffic.

## Using Versions and Deployments
Together, you can use versions and deployments to track changes to your Worker and configure how those changes are deployed to your traffic. With versions and deployments, you can upload changes to your Worker independent of changing the version that's actively serving traffic. This is useful if:

- You're running critical applications on Workers and want to [gradually deploy](/gradual-deployments) new versions of your Worker. 
- You have a CI pipeline configured for Workers, but want to cut manual releases.

### Create a new version

New versions are created one of two ways: 

**Uploading a new version and deploying it immediately**

By default, changes uploaded with `npx wrangler deploy`, via the Cloudflare dashboard or the [Workers Script Upload API](https://developers.cloudflare.com/api/operations/worker-script-upload-worker-module) create a new version that is automatically deployed to 100% of traffic. 

**Uploading a new version to be [gradually deployed](/gradual-deployments) or deployed at a later time** 

In order to create a new version that is not deployed immediately, use the new wrangler command `npx wrangler versions upload --experimental-gradual-rollouts` or create a new version via the Cloudflare dashboarding using the "Save changes" buttons.

For more details on the wrangler commands, refer to the [`versions` documentation](/workers/wrangler/commands#deployments). 


{{<Aside type="note">}}

Updates to [Routes](/workers/configuration/routing/routes/), [Custom Domains](/workers/configuration/routing/custom-domains/), [Cron Triggers](/workers/configuration/cron-triggers/), [Logpush](/observability/logging/logpush/) or [Tail Workers](observability/logging/tail-workers/) are **not associated with a version and will take effect immediately.**  

{{</Aside>}}

{{<Aside type="note">}}

**New versions are not triggered by changes to bound resources.**

For example, if two Workers (Worker A and Worker B) are bound via a [service binding](/workers/configuration/bindings/about-service-bindings/), changing the code of Worker B will not trigger a new version of Worker A. It will only create a new version of Worker B. Changes to the service binding (such as, deleting the binding or updating the [environment](/workers/wrangler/environments/) it points to) on Worker A will also not create a new version for Worker B.

{{</Aside>}}

## Viewing versions and deployments

### Via Wrangler

Wrangler allows you to view the 20 most recent versions and deployments.

Refer to the [`versions` and `deployments` command documentation](/workers/wrangler/commands#deployments) to view commands. 

### Via the Cloudflare dashboard

**To view your deployments:**

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. In **Overview**, select your Worker > **Deployments**. 

Your active deployment includes the version(s) that are currently serving traffic. To view previous deployments, select 'View all deployments'. 

Deployments metadata includes information about the versions in the deployment, when the deployment was created, the author, source and deployment message.  

**To view your versions:**

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. In **Overview**, select your Worker > **Deployments**. 

Version history tracks the state of code and config for a Worker. Versions metadata includes information about when the deployment was created, the author, source, version message and version tag.  


{{<Aside type="note">}}

Deployments are in active development. To give feedback, request a [live chat](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}

## Related resources

**needs updating**

* [`npx wrangler deploy` documentation](/workers/wrangler/commands#deploy) - Deploy your Worker with the Wrangler CLI.
* [`npx wrangler deployments` documentation](/workers/wrangler/commands#deployments) - List your deployments and view details about a specific deployment.



You can view your latest 10 versions [via the Cloudflare dashboard](#via-the-cloudflare-dashboard) or the [`npx wrangler versions list` command](#via-wrangler).



