---
pcx_content_type: concept
title: Deployments
---

# Deployments

{{<Aside type="note">}}

Deployments are currently in Public Beta.

{{</Aside>}}

Deployments are an audit log of static historical versions of your Worker. They include the bundled code, configuration, and bindings associated with your Worker at a given point in time. A change to any of these will trigger a new deployment on Cloudflare’s network.

Only one deployment is active at any time. The active deployment is your latest deployment. The active deployment is accessible via any of your configured custom domains, routes, service bindings, schedules, and your `*.workers.dev` subdomain.

You can view a list of your deployments in the Cloudflare dashboard > **Workers** > **your Worker project** > **Deployments**. You can also use the `wrangler deployments` command to list out the most recent deployments.

Deployments are triggered by:

* Changes to a Worker’s bindings, code, or configuration in the Cloudflare dashboard.
* Changes to a Worker’s bindings, code, or configuration in the REST API.
* Changes to a Worker’s bindings, code, or configuration in the CLI via [wrangler publish](/workers/wrangler/commands#publish).

## Interacting with Deployments

### wrangler publish

The [`wrangler publish`](/workers/wrangler/commands#publish) command will publish your Worker, and additionally output the identifier of the newly generated deployment.

### wrangler deployments

The [`wrangler deployments`](/workers/wrangler/commands#deployments) command will output detailed information about the most recent deployments, including source, timestamp, identifier, and author.

### Deployments in the dashboard

The Deployments tab of your Cloudflare dashboard will include information about previous deployments, and your Worker’s detail page will now indicate information about the most recently deployed and currently active deployment.

<!-- ### Metadata binding

Deployment information is optionally available directly within your Worker code. This information is presented as a Metadata binding, and can be configured at any custom variable name. To configure in dashboard, head to your Worker > Settings > Variables > Metadata binding, and click ‘Add binding’. Optionally configure a variable name (e.g. CF_METADATA).

Once configured, your Worker will be able to access metadata on the specified variable name. For example:

```
export default {
	fetch(req, env, ctx) {
		return new Response(JSON.stringify(env.CF_METADATA.deployment.id))
	}
}
```

The Metadata binding object definition is as follows:

```
{
	name: string,
	deployment: {
		id: string,
		timestamp: datetime
	}
}
```  -->

## Creating a new Deployment

New Deployments will be created whenever you change code, configuration, or bindings.

Updates to code can be as small as a simple whitespace change. Any changes to code will trigger a new deployment.

Updates to bindings include a change to the value or variable name of a binding, or any CRUD operation on an individual binding. Notably, this does not include changes to the target resource itself. For example, changing the code of a Worker B that is connected via a service binding from Worker A will not trigger a new deployment on Worker A. Only changes to the service binding between Worker A and Worker B will trigger a new deployment. Similarly, changing routes, custom domains, or cron triggers will not issue a new deployment.

Changes to configuration include:

* Changing a Worker’s usage model.
* Changing a Worker’s secret or environment variable names and values.

## Author and source

When you deploy changes to your Worker, Cloudflare will track the user, token, or interface from which your code was last deployed. This is useful to understand and audit who or what is making changes to your applications.

The author of a deployment is available in the Cloudflare dashboard, visible via [`wrangler deployments`](/workers/wrangler/commands#deployments) command, and accessible in [Cloudflare’s REST API](https://api.cloudflare.com/).
