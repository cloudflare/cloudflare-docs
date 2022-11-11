---
pcx_content_type: concept
title: Deployments
---

# Deployments

Deployments are a set of static historical ‘snapshots’ of your Worker. They include the code, configuration, and bindings associated with your Worker. A change to any of these will trigger a new deployment on Cloudflare’s network.

Only **one** deployment is active at any time. Currently this is the latest deployment. The active deployment is accessible via any of your configured custom domains, routes, service bindings, schedules, and your optional `workers.dev` preview.

You can view a list of your deployments in the Cloudflare dashboard under the **‘Deployments’** tab within any Worker’s detail view. You can also use the `wrangler deployments` command to list out the most recent deployments.

### Deployments are triggered by:

* Changes to a Worker’s bindings, code, or configuration in the Cloudflare dashboard
* Changes to a Worker’s bindings, code, or configuration in the API
* Changes to a Worker’s bindings, code, or configuration in the CLI via [wrangler publish](/workers/wrangler/commands#publish)

### Deployments consist of : 

|                  |   |
|------------------|---|
| `id` | A unique Cloudflare-generated identifier |
| `metadata` | An object containing information about the deployment |
| `metadata.author_id`  | A Cloudflare-generated unique identifier |
| `metadata.author_email`  | A string representing the user or token information of the author of the deployment |
| `metadata.source`  | A string representing the interface that was used to author the deployment. One of: `"api", "dash", "wrangler", "terraform", "other"`. |
| `metadata.created_on`  | A timestamp indicating deployment date and time |

If you see an unwanted change, you can always issue a new deployment using your interface of choice.

## Interacting with Deployments

### wrangler publish

The [`wrangler publish`](/workers/wrangler/commands#publish) command will output information about the most recent deployment created.

![wrangler publish](../media/wrangler-publish-output.png)

### wrangler deployments

The [`wrangler deployments`](/workers/wrangler/commands#deployments) command will output information about the most recent deployments.

![wrangler deployments](../media/wrangler-deployments-output.png)

### Deployments in the dashboard

The Deployments tab of your Cloudflare dashboard will include information about historical deployments, and your Worker’s detail page will now indicate information about the most recently deployed and currently active deployment.

### Metadata binding

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
```

## Triggering a new Deployment

New Deployments will be issued whenever you change code, configuration, or bindings.

Updates to code can be as small as a simple whitespace change. Any changes to code will trigger a new deployment.

Updates to bindings include a change to the value or variable name of a binding, or any CRUD operation on an individual binding. Notably, this does not include changes to the target resource itself – only the binding (e.g., changing the code of a Worker “B” that is connected via a Service binding from Worker “A” will not trigger a new deployment on Worker “A”).

Changes to configuration include:

* Changing a Worker’s usage model
* Changing a Worker’s secret or environment variable names and values

## Author and Source

When you deploy changes to your Worker, Cloudflare will track the user, token, or interface from which your code was last deployed. This is useful to understand and audit who or what is making changes to your applications.

The author of a deployment is available in the Cloudflare dashboard, displayed after a wrangler publish, visible via [wrangler documentation](/workers/wrangler/commands#deployments) command, accessible in [Cloudflare’s API](https://api.cloudflare.com/), and optionally from your Worker code in the [Metadata binding](/workers/platform/deployments#metadata-binding).
