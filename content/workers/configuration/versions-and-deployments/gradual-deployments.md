---
pcx_content_type: configuration
title: Gradual Deployments
meta:
  description: Safley deploy code changes to your Workers with gradual deployments. 
---

{{<heading-pill style="beta">}}Gradual Deployments{{</heading-pill>}}

Gradual Deployments give users the ability to incrementally deploy new versions of Workers. Using gradual deployments allows you to: 

- Gradually shift traffic to a newer version of your Worker
- Monitor error rates and exceptions across versions using [analytics and logging](/workers/configuration/versions-and-deployments/gradual-deployments/#observability--logs-analytics-metrics) tooling
- [Rollback](/workers/configuration/versions-and-deployments/rollbacks/) to a previously stable version changes if you notice issues with a version


## Using Gradual Deployments

The following is a simple example that takes you through how to publish a new version of a Worker without deploying it, how to create a gradual deployment between two versions and how to progress the deployment of the new version to 100% of traffic. 

### Via Wrangler

Minimum required version: 3.XX.0

1. Create a new Worker and deploy it using wrangler.

```sh
$ npm create cloudflare@latest
```

2. Create a new version of the Worker. 

Edit the Worker code (recommend simply changing the response content) and upload it. 

```sh
$ npx wrangler versions upload --experimental-gradual-rollouts
```
This will create a new version of the Worker that is not automatically deployed. 

3. Create a new deployment that splits traffic between two versions of the Worker. 

```sh
$ npx wrangler versions deploy --strategy "percentage" --experimental-gradual-rollouts
```

Follow the interactive prompts to create a deployment with the versions uploaded in step #1 and #2. Select your desired percentages for each version. 

4. curl your Worker to test the split deployment. 

```sh
for j in {0..10}
do
    curl -s https://$SCRIPT_NAME.$SUBDOMAIN.workers.dev
done
```
You should see 10 responses. Responses will reflect the content returned by the versions in your deployment. Responses will vary depending on the percentages configured in step #3. 

5. Set the new version uploaded in step 2 to a 100% deployment. 

```sh
$ npx wrangler deployments view --experimental-gradual-rollouts
```

Copy the `versionId` of the version uploaded in step 2. 

```sh
$ npx wrangler versions deploy <VERSION_ID> --message “deployment message”
 --experimental-gradual-rollouts
```

### Via the Dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. Create a new Worker through the **Create application** flow, select the **Hello World** template and deploy it. 
4. Once the Worker is deployed, navigate to the online code editor through **Edit code**. Edit the Worker code (recommend simply changing the response content) and upload it. 
5. To save changes, click the down arrow beside "Deploy", click Save and click the **Save** button. 
6. Create a new deployment that splits traffic between two versions of the Worker. Head to the **Deployments** tab and select **Deploy Version**. Click **Add Version** to create a new deployment with the two versions of your Worker. Select your desired percentages for each version. Click **Deploy**. 
7. curl your Worker to test the split deployment. 

```sh
for j in {0..10}
do
    curl -s https://$SCRIPT_NAME.$SUBDOMAIN.workers.dev
done
```
You should see 10 responses. Responses will reflect the content returned by the versions in your deployment. Responses will vary depending on the percentages configured in step #6. 

### Limits
- You can only create a new deployment with the last 10 versions of your Worker
- You can only view the last 10 deployments through `npx wrangler deployments list --experimental-gradual-rollouts` and through the Cloudflare dashboard

## Observability – Logs, Analytics, Metrics

When using gradual deployments, you want to attribute Workers invocations to a specific version in order to get visibility into the impact of deploying new versions.

### Real-time logs

A scriptVersion field is availble in [real-time logs](/workers/observability/logging/real-time-logs/) via `wrangler tail` and on the dashboard (Workers & Pages > Logs > Real-time logs). When there are multiple versions in a deployment, you can [add a filer](/workers/observability/logging/real-time-logs/#view-logs-using-wrangler-tail) on the scriptVersion field in order to only view incoming logs for a specific version. 

```sh
"scriptVersion": {
    "id": "f59c8cc2-c735-4f23-b2dc-df60aebf27c5"
  }
```
### Logpush

A new ScriptVersion object is available in [Workers Logpush](/workers/observability/logging/logpush/). ScriptVersion can only be added through the Logpush API right now. Sample APU call: 

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
    message: <MESSAGE>,
    tag: <TAG>
}
```

### Runtime Binding

Use the following runtime binding in order to access versionId or versionTag in the Worker. The Worker versionId or versionTag can be sent to [Workers Analytics Engine](/analytics/analytics-engine/) or to any 3rd party analytics/metrics service in order to aggregate by Worker version. 

```sh
[[unsafe.bindings]]
name = "version"
type = "version_metadata"
```
These fields are then accessible in the Worker through the env parameter: `env.version.id` and `env.version.tag`. 



