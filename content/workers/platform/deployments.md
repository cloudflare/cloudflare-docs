---
pcx_content_type: concept
title: Deployments
---

# Deployments

{{<Aside type="note">}}

Deployments are currently in Public Beta.

{{</Aside>}}

Deployments are an audit log of static historical versions of your Worker. They include the bundled code, configuration, and bindings associated with your Worker at a given point in time.

Only one deployment is active at any time. The active deployment is your latest deployment. The active deployment is accessible via any of your configured custom domains, routes, service bindings, schedules, and your `*.workers.dev` subdomain.

## Creating a new Deployment

New Deployments will be created whenever you change code, configuration, or bindings. This includes:

* Changes to a Worker’s bindings, code, or configuration in the Cloudflare dashboard.
* Changes to a Worker’s bindings, code, or configuration in the REST API.
* Changes to a Worker’s bindings, code, or configuration in the CLI via [wrangler publish](/workers/wrangler/commands#publish).

When you deploy changes to your Worker, Cloudflare will track the user, token, or interface from which your code was last deployed. This is useful to understand and audit who or what is making changes to your applications.

{{<Aside type="note">}}

Changing routes, custom domains, or cron triggers will not issue a new deployment.

{{ </Aside>}}

### Updating Code

Any changes to code will trigger a new deployment. This can be as small as a simple whitespace change.

### Updating Bindings

Updates to bindings include a change to the value or variable name of a binding, or any CRUD operation on an individual binding. 

Notably, this does not include changes to the target resource itself. For example, changing the code of a Worker B that is connected via a service binding from Worker A will not trigger a new deployment on Worker A. Only changes to the service binding between Worker A and Worker B will trigger a new deployment.

### Updating Configuration

Updates to configuration include:

* Changing a Worker’s usage model.
* Changing a Worker’s secret or environment variable names and values.

## Interacting with Deployments

Deployment information can be obtained via Wrangler, the Cloudflare Dashboard, or Cloudflare's REST API.

### via Wrangler

The [`wrangler deployments`](/workers/wrangler/commands#deployments) command will output detailed information about the most recent deployments, including source, timestamp, identifier, and author.

### via the Cloudflare Dashboard

Access Deployments by logging into the [Cloudflare dashboard](https://dash.cloudflare.com) > **Account Home** > **Workers** > selecting your Worker project > **Deployments**. Deployments includes information about previous deployments, and your Worker’s detail page will now indicate information about the most recently deployed and currently active deployment.

## Via the API

Read more about accessing Deployment information via Cloudflare's REST API [here](https://api.cloudflare.com/#worker-deployments-properties).

{{<Aside type="note">}}

Deployments are in active development. If you'd like to give feedback, please [request a chat](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}
