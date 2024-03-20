---
pcx_content_type: configuration
title: Gradual deployments
meta:
  description: Incrementally deploy code changes to your Workers with gradual deployments. 
---

{{<heading-pill style="beta">}}Gradual deployments{{</heading-pill>}}

Gradual Deployments give you the ability to incrementally deploy new [versions](/workers/configuration/versions-and-deployments/#versions) of Workers. Using gradual deployments allows you to: 

- Gradually shift traffic to a newer version of your Worker.
- Monitor error rates and exceptions across versions using [analytics and logging](/workers/configuration/versions-and-deployments/gradual-deployments/#observability--logs-analytics-metrics) tooling.
- Perform a [rollback](/workers/configuration/versions-and-deployments/rollbacks/) to a previously stable version if you notice issues when deploying a new version.

{{<Aside type="note">}}

Gradual deployments are in **beta and under active development**. Please read [limitations](/workers/configuration/versions-and-deployments//gradual-deployments/#limitations) before using this feature.

Provide your feeback through the [feedback form](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}

## Use gradual deployments

The following is a simple example that takes you through how to publish a new version of a Worker without deploying it, how to create a gradual deployment between two versions and how to progress the deployment of the new version to 100% of traffic. 

### Via Wrangler

{{<Aside type="note">}}

Minimum required wrangler version: 3.36.0. 

{{</Aside>}}

**1. Create a new "Hello World" Worker using the `create-cloudflare` CLI (C3) and deploy it.**

{{<render file="/_c3-run-command.md" productFolder="/workers/" >}}

**2. Create a new version of the Worker.**

Edit the Worker code (change the `Response` content) and upload it by using the [`wrangler versions upload`](/workers/wrangler/commands/#upload) command.

```sh
$ npx wrangler versions upload --experimental-versions
```
This will create a new version of the Worker that is not automatically deployed. 

**3. Create a new deployment that splits traffic between two versions of the Worker.** 

Use the [`wrangler versions deploy`](/workers/wrangler/commands/#deploy-2) command and follow the interactive prompts to create a deployment with the versions uploaded in step #1 and #2. Select your desired percentages for each version. 

```sh
$ npx wrangler versions deploy --experimental-versions
```

Follow the interactive prompts to create a deployment with the versions uploaded in step #1 and #2. Select your desired percentages for each version.

**4. cURL your Worker to test the split deployment.**

```sh
for j in {0..10}
do
    curl -s https://$SCRIPT_NAME.$SUBDOMAIN.workers.dev
done
```
You should see 10 responses. Responses will reflect the content returned by the versions in your deployment. Responses will vary depending on the percentages configured in step #3. 

**5. Set the new version uploaded in step 2 to a 100% deployment.**

Run `wrangler versions deploy` again and follow the interactive prompts, selecting the version uploaded in step 2. 

```sh
$ npx wrangler versions deploy --experimental-versions
```

### Via the Dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers) and select your account.
3. Create a new Worker through the **Create application** button, select the **Hello World** template and deploy it. 
4. Once the Worker is deployed, go to the online code editor through **Edit code**. Edit the Worker code (change the `Response` content) and upload the Worker. 
5. To save changes, select the **down arrow** next to **Deploy** > **Save**. This will create a new version of your Worker.
6. Create a new deployment that splits traffic between the two versions created in step 3 and 5 by going to **Deployments** and selecting **Deploy Version**. 
7. cURL your Worker to test the split deployment. 

```sh
for j in {0..10}
do
    curl -s https://$SCRIPT_NAME.$SUBDOMAIN.workers.dev
done
```
You should see 10 responses. Responses will reflect the content returned by the versions in your deployment. Responses will vary depending on the percentages configured in step #6. 

## Version keys and session affinity

You may want requests associated with a particular identifier to be handled by a consistent version of your Worker, such that when there are two versions of your Worker deployed, the version used does not change back and forth on a per-request basis for a given user, session, or any unique ID.

You can do this by setting the `Cf-Worker-Version-Key` header on a request. For example:

```sh
curl -s https://$SCRIPT_NAME.$SUBDOMAIN.workers.dev -H 'Cf-Worker-Version-Key: foo'
```

For a given [deployment](/workers/configuration/deployments/), all requests with a version key set to `foo` will be handled by the same version of your Worker. The specific version of your Worker that the version key `foo` corresponds to is determined by the percentages you have configured for each Worker version in your deployment.

You can set the `Cf-Worker-Version-Key` header both when making an external request from the Internet to your Worker, as well as when making a subrequest from one Worker to another Worker using a [service binding](/workers/runtime-apis/bindings/service-bindings/).
### Extracting version keys from URLs

If the unique identifier that you want to provide to `Cf-Worker-Version-Key` is in the URL of the incoming request, you can configure a [Ruleset Engine](/ruleset-engine/) rule on your zone to extract this key from the path or querystring, and use its value to set `Cf-Worker-Verison-Key`. This allows you to ensure version affinity, while avoiding having to modify the external client that makes the request.

## Observability

When using gradual deployments, you want to attribute Workers invocations to a specific version in order to get visibility into the impact of deploying new versions.

### Logpush

A new `ScriptVersion` object is available in [Workers Logpush](/workers/observability/logging/logpush/). `ScriptVersion` can only be added through the [Logpush API](/api/operations/post-accounts-account_identifier-logpush-jobs) right now. Sample API call: 

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

`ScriptVersion` is an object with the following structure:

```sh
scriptVersion: {
    id: "<UUID>",
    message: "<MESSAGE>",
    tag: "<TAG>"
}
```

### Runtime binding

The [Version Metadata runtime binding](/workers/runtime-apis/bindings/script-version/) in order to access version ID or version tag in the Worker.

## Limits

- Gradual rollouts is not supported for Workers using [Smart Placement](/workers/configuration/smart-placement/), the [mTLS binding](/workers/runtime-apis/bindings/mtls/) or [Durable Objects](/durable-objects/). Smart Placement, mTLS bindings and Durable Objects will be supported in the near future.

These Workers features are currently not supported with Gradual Rollouts. They will be supported in the near future. 

**You can only create a new deployment with the last 10 versions of your Worker**