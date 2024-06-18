---
pcx_content_type: reference
title: Pricing
weight: 12
---

# Pricing

Requests to your Functions are billed as Cloudflare Workers requests. Workers plans and pricing can be found [in the Workers documentation](/workers/platform/pricing/).

## Paid Plans

Requests to your Pages functions count towards your quota for Workers Paid plans, including requests from your Function to KV or Durable Object bindings.

Pages supports the [Standard usage model](/workers/platform/pricing/#example-pricing-standard-usage-model).

{{<Aside type="note">}}

Workers Enterprise accounts are billed based on the usage model specified in their contract. To switch to the Standard usage model, reach out to your Customer Success Manager (CSM). Some Workers Enterprise customers maintain the ability to [change usage models](/workers/platform/pricing/#how-to-switch-usage-models).

{{</Aside>}}

### Static asset requests

On both free and paid plans, requests to static assets are free and unlimited. A request is considered static when it does not invoke Functions. Refer to [Functions invocation routes](/pages/functions/routing/#functions-invocation-routes) to learn more about when Functions are invoked.

## Free Plan

Requests to your Pages Functions count towards your quota for the Workers Free plan. For example, you could use 50,000 Functions requests and 50,000 Workers requests to use your full 100,000 daily request usage. The free plan daily request limit resets at midnight UTC.

There are two modes in Project Settings that determine how a Function will behave once the daily request limit has been reached: 1) Fail open and 2) Fail closed.

### Fail open

Once the daily request limit has been reached, Projects in fail open mode will bypass the Function and prevent it from operating on incoming traffic. Incoming requests will behave as if there was no Function, and pass through to the site's static assets. This is the default configuration for all Pages projects.

### Fail closed

Once the daily request limit has been reached, Projects in fail closed mode will display a Cloudflare 1027 error page to visitors, signifying the Function has been temporarily disabled. Cloudflare recommends this option if your Function is performing security related tasks.

{{<Aside type="note">}}

The default configuration for all Pages projects is to Fail open. Fail closed can be configured per project by navigating to the Project Settings page.

{{</Aside>}}
