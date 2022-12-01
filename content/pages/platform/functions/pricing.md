---
pcx-content-type: how-to
title: Pricing
weight: 12
---

# Pricing 
Requests to your Functions are billed as Cloudflare Workers requests. Plans and pricing can be found [here](/workers/platform/pricing/)

## Paid Plans
Requests to your Pages functions count towards your quota for Workers Paid plans, including requests from your Function to KV or Durable Object bindings.

Pages supports both Bundled and Unbound Usage Models. When an account is first upgraded to a Paid Plan, Unbound is the default Usage Model. This default applies only to new projects created after upgrading your plan; existing projects created under the Free Plan will continue to use the Bundled Usage Model. To change the default Usage Model, go to Account Home > Pages and select Change next to the Default Usage Model in the top right of the page.

You can update the Usage Model per project, for both Production and Preview deployments, in the Project Settings page. Like other modifications to your Project Settings, you must redeploy your site in order for this change to take effect. Requests to previous deployments will continue to be billed under the Usage Model the Function was deployed with.


{{<Aside type="note">}} 

For Enterprise customers, please contact your Customer Success Manager for information on pricing.  

{{</Aside>}}


## Free Plan
Requests to your Pages functions count towards your quota for the Workers Free plan. For example, you could use 50,000 Functions requests and 50,000 Workers requests to use your full 100,000 daily request usage. Free plan daily request counts reset at midnight UTC. Requests to static assets that do not include Functions are free and unlimited, regardless of your plan.

There are two modes in Project Settings that determine how a Function will behave once the daily request limit has been reached: 1) Fail open and 2) Fail closed.

### Fail open
Once the daily request limit has been reached, Projects in fail open mode will bypass the Function and prevent it from operating on incoming traffic. Incoming requests will behave as if there was no Function, and pass through to the site's static assets. This is the default configuration for all Pages projects.

### Fail closed
Once the daily request limit has been reached, Projects in fail closed mode will display a Cloudflare 1027 error page to visitors, signifying the Function has been temporarily disabled. Cloudflare recommends this option if your Function is performing security related tasks.

{{<Aside type="note">}} 

  The default configuration for all Pages projects is to Fail open. Fail closed can be configured per project by navigating to the Project Settings page.

{{</Aside>}}
