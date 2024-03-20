---
pcx_content_type: configuration
title: Gradual Deployments
meta:
  description: Safely deploy code changes to your Workers with gradual deployments. 
---

{{<heading-pill style="beta">}}Gradual Deployments{{</heading-pill>}}

Gradual Deployments give you the ability to incrementally deploy new versions of Workers. Using gradual deployments allows you to: 

- Gradually shift traffic to a newer version of your Worker
- Monitor error rates and exceptions across versions using [analytics and logging](/workers/configuration/versions-and-deployments/gradual-deployments/#observability--logs-analytics-metrics) tooling
- Perform a [rollback](/workers/configuration/versions-and-deployments/rollbacks/) to a previously stable version if you notice issues when deploying a new version

{{<Aside type="note">}}

Gradual deployments are in **beta and under active development**. Please read [limitations](/workers/configuration/versions-and-deployments//gradual-deployments/#limitations) before using this feature.

Provide your feeback through this [feedback form](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}

## Using Gradual Deployments

The following is a simple example that takes you through how to publish a new version of a Worker without deploying it, how to create a gradual deployment between two versions and how to progress the deployment of the new version to 100% of traffic. 

### Via Wrangler

{{<Aside type="note">}}

Minimum required wrangler version: 3.34.2. 

{{</Aside>}}

**1. Create a new Worker and deploy it using wrangler.**

```sh
$ npm create cloudflare@latest
```

**2. Create a new version of the Worker.**

Edit the Worker code (recommend simply changing the response content) and upload it. 

```sh
$ npx wrangler versions upload --experimental-gradual-rollouts
```
This will create a new version of the Worker that is not automatically deployed. 

**3. Create a new deployment that splits traffic between two versions of the Worker.** 

```sh
$ npx wrangler versions deploy --experimental-gradual-rollouts
```

Follow the interactive prompts to create a deployment with the versions uploaded in step #1 and #2. Select your desired percentages for each version. 

**4. curl your Worker to test the split deployment.**

```sh
for j in {0..10}
do
    curl -s https://$SCRIPT_NAME.$SUBDOMAIN.workers.dev
done
```
You should see 10 responses. Responses will reflect the content returned by the versions in your deployment. Responses will vary depending on the percentages configured in step #3. 

**5. Set the new version uploaded in step 2 to a 100% deployment.**

```sh
$ npx wrangler versions deploy --experimental-gradual-rollouts
```

Follow the interactive prompts, selecting version uploaded in step 2. 

### Via the Dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers) and select your account.
3. Create a new Worker through the **Create application** button, select the **Hello World** template and deploy it. 
4. Once the Worker is deployed, navigate to the online code editor through **Edit code**. Edit the Worker code (recommend simply changing the response content) and upload it. 
5. To save changes, click the down arrow beside "Deploy", click Save and click the **Save** button. 
6. Create a new deployment that splits traffic between the two versions created in step 3 and 5. Head to the **Deployments** tab and select **Deploy Version**. 
7. curl your Worker to test the split deployment. 

```sh
for j in {0..10}
do
    curl -s https://$SCRIPT_NAME.$SUBDOMAIN.workers.dev
done
```
You should see 10 responses. Responses will reflect the content returned by the versions in your deployment. Responses will vary depending on the percentages configured in step #6. 

## Observability

When using gradual deployments, you want to attribute Workers invocations to a specific version in order to get visibility into the impact of deploying new versions.

### Logpush

A new ScriptVersion object is available in [Workers Logpush](/workers/observability/logging/logpush/). ScriptVersion can only be added through the Logpush API right now. Sample API call: 

```sh
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs' \
-H 'Authorization: Bearer <TOKEN>' \
-H 'Content-Type: application/json' \
-d '{
"name": "workers-logpush",
"logpull_options": "fields=Event,EventTimestampMs,Outcome,Exceptions,Logs,ScriptName,ScriptVersion",
"destination_conf": "<DESTINATION_URL>",
"dataset": "workers_trace_events",
"enabled": true
}'| jq .
```

ScriptVersion is an object with the following structure:
```sh
scriptVersion: {
    id: "<UUID>",
    message: "<MESSAGE>",
    tag: "<TAG>"
}
```

### Runtime Binding

The [Version Metadata runtime binding](/workers/runtime-apis/bindings/script-version/) in order to access version ID or version tag in the Worker.

## Limitations

**Gradual rollouts is not supported for sripts using [Smart Placement](/workers/configuration/smart-placement/), the [mTLS binding](/workers/runtime-apis/bindings/mtls/) or [Durable Objects](/durable-objects/)**

These Workers features are currently not supported with Gradual Rollouts. They will be supported in the near future. 

**You can only create a new deployment with the last 10 versions of your Worker**