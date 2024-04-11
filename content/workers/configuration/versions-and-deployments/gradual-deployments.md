---
pcx_content_type: configuration
title: Gradual deployments
meta:
  description: Incrementally deploy code changes to your Workers with gradual deployments.
---

{{<heading-pill style="beta">}}Gradual deployments{{</heading-pill>}}

Gradual Deployments give you the ability to incrementally deploy new [versions](/workers/configuration/versions-and-deployments/#versions) of Workers by splitting traffic across versions.

![Gradual Deployments](/images/workers/platform/versions-and-deployments/gradual-deployments.png)

Using gradual deployments, you can:

- Gradually shift traffic to a newer version of your Worker.
- Monitor error rates and exceptions across versions using [analytics and logging](/workers/configuration/versions-and-deployments/gradual-deployments/#observability) tooling.
- [Roll back](/workers/configuration/versions-and-deployments/rollbacks/) to a previously stable version if you notice issues when deploying a new version.

{{<Aside type="warning">}}

Gradual deployments are in **beta and under active development**. Review [Limits](/workers/configuration/versions-and-deployments//gradual-deployments/#limits) associated with rollbacks before using this feature.

Provide your feeback on the rollbacks feature through the [feedback form](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}

## Use gradual deployments

The following section guides you through an example usage of gradual deployments. You will choose to use either [Wrangler](/workers/configuration/versions-and-deployments/gradual-deployments/#via-wrangler) or the [Cloudflare dashboard](/workers/configuration/versions-and-deployments/gradual-deployments/#via-the-cloudflare-dashboard) to:

- Create a new Worker.
- Publish a new version of that Worker without deploying it.
- Create a gradual deployment between the two versions.
- Progress the deployment of the new version to 100% of traffic.

### Via Wrangler

{{<Aside type="note">}}

Minimum required wrangler version: 3.40.0.

{{</Aside>}}

#### 1. Create and deploy a new Worker

Create a new `"Hello World"` Worker using the [`create-cloudflare` CLI (C3)](/pages/get-started/c3/) and deploy it.


```sh
$ npm create cloudflare@latest <NAME> -- --type=hello-world
```

Answer `yes` or `no` to using TypeScript. Answer `yes` to deploying your application. This is the first version of your Worker.

#### 2. Create a new version of the Worker

To create a new version of the Worker, edit the Worker code by changing the `Response` content to your desired text and upload the Worker by using the [`wrangler versions upload`](/workers/wrangler/commands/#upload) command.

```sh
$ npx wrangler versions upload --experimental-versions
```

This will create a new version of the Worker that is not automatically deployed.

#### 3. Create a new deployment

Use the [`wrangler versions deploy`](/workers/wrangler/commands/#deploy-2) command to
create a new deployment that splits traffic between two versions of the Worker. Follow the interactive prompts to create a deployment with the versions uploaded in [step #1](/workers/configuration/versions-and-deployments/gradual-deployments/#1-create-and-deploy-a-new-worker) and [step #2](/workers/configuration/versions-and-deployments/gradual-deployments/#2-create-a-new-version-of-the-worker). Select your desired percentages for each version.

```sh
$ npx wrangler versions deploy --experimental-versions
```

#### 4. Test the split deployment

Run a cURL command on your Worker to test the split deployment.

```sh
for j in {0..10}
do
    curl -s https://$WORKER_NAME.$SUBDOMAIN.workers.dev
done
```
You should see 10 responses. Responses will reflect the content returned by the versions in your deployment. Responses will vary depending on the percentages configured in [step #3](/workers/configuration/versions-and-deployments/gradual-deployments/#3-create-a-new-deployment).

#### 5. Set your new version to 100% deployment

Run `wrangler versions deploy` again and follow the interactive prompts. Select the version uploaded in [step 2](/workers/configuration/versions-and-deployments/gradual-deployments/#2-create-a-new-version-of-the-worker) and set it to 100% deployment.

```sh
$ npx wrangler versions deploy --experimental-versions
```

### Via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers) and select your account.
2. Go to **Workers & Pages**.
3. Select **Create application** > **Hello World** template > deploy your Worker.
4. Once the Worker is deployed, go to the online code editor through **Edit code**. Edit the Worker code (change the `Response` content) and upload the Worker.
5. To save changes, select the **down arrow** next to **Deploy** > **Save**. This will create a new version of your Worker.
6. Create a new deployment that splits traffic between the two versions created in step 3 and 5 by going to **Deployments** and selecting **Deploy Version**.
7. cURL your Worker to test the split deployment.

```sh
for j in {0..10}
do
    curl -s https://$WORKER_NAME.$SUBDOMAIN.workers.dev
done
```
You should see 10 responses. Responses will reflect the content returned by the versions in your deployment. Responses will vary depending on the percentages configured in step #6.

## Version affinity

By default, the percentages configured when using gradual deployments operate on a per-request basis — a request has a X% probability of invoking one of two versions of the Worker in the [deployment](/workers/configuration/versions-and-deployments/#deployments).

You may want requests associated with a particular identifier (such as user, session, or any unique ID) to be handled by a consistent version of your Worker to prevent version skew. Version skew occurs when there are multiple versions of an application deployed that are not forwards/backwards compatible. You can configure version affinity to prevent the Worker's version from changing back and forth on a per-request basis.

You can do this by setting the `Cloudflare-Workers-Version-Key` header on the incoming request to your Worker. For example:

```sh
curl -s https://$SCRIPT_NAME.$SUBDOMAIN.workers.dev -H 'Cloudflare-Workers-Version-Key: foo'
```

For a given [deployment](/workers/configuration/versions-and-deployments/#deployments), all requests with a version key set to `foo` will be handled by the same version of your Worker. The specific version of your Worker that the version key `foo` corresponds to is determined by the percentages you have configured for each Worker version in your deployment.

You can set the `Cloudflare-Workers-Version-Key` header both when making an external request from the Internet to your Worker, as well as when making a subrequest from one Worker to another Worker using a [service binding](/workers/runtime-apis/bindings/service-bindings/).

### Setting `Cloudflare-Workers-Version-Key` using Ruleset Engine

You may want to extract a version key from certain properties of your request such as the URL, headers or cookies. You can configure a [Ruleset Engine](/ruleset-engine/) rule on your zone to do this. This allows you to specify version affinity based on these properties without having to modify the external client that makes the request.

For example, if your worker serves video assets under the URI path `/assets/` and you wanted requests to each unique asset to be handled by a consistent version, you could define the following [request header modification](/rules/transform/request-header-modification/) rule:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/asset/")
```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `Cloudflare-Workers-Version-Key`

**Value**: `regex_replace(http.request.uri.path, "/asset/(.*)", "${1}")`

{{</example>}}

## Gradual deployments for Durable Objects

Due to [global uniqueness](/durable-objects/platform/known-issues/#global-uniqueness), only one version of each [Durable Object](/durable-objects/) can run at a time. This means that gradual deployments work slightly differently for Durable Objects.

When you create a new gradual deployment for a Durable Object Worker, each Durable Object instance is assigned a Worker version based on the percentages you configured in your [deployment](/workers/configuration/versions-and-deployments/#deployments). This version will not change until you create a new deployment.

![Gradual Deployments Durable Objects](/images/workers/platform/versions-and-deployments/durable-objects.png)


### Example

This example assumes that you have previously created 3 Durable Objects and [derived their IDs from the names](/durable-objects/best-practices/access-durable-objects-from-a-worker/#derive-ids-from-names) "foo", "bar" and "baz".

Your Worker is currently on a version that we will call version "A" and you want to gradually deploy a new version "B" of your Worker.

Here is how the versions of your Durable Objects might change as you progress your gradual deployment:

| Deployment config                      | "foo" | "bar" | "baz" |
| :------------------------------------: | :---: | :---: | :---: |
| Version A: 100% <br>                   | A     | A     | A     |
| Version B: 20% <br> Version A: 80%     | B     | A     | A     |
| Version B: 50% <br> Version A: 50%     | B     | B     | A     |
| Version B: 100% <br>                   | B     | B     | B     |

This is only an example, so the versions assigned to your Durable Objects may be different. However, the following is guaranteed:

- For a given deployment, requests to each Durable Object will always use the same Worker version.
- When you specify each version in the same order as the previous deployment and increase the percentage of a version, Durable Objects which were previously assigned that version will not be assigned a different version. In this example, Durable Object "foo" would never revert from version "B" to version "A".
- The Durable Object will only be [reset](/durable-objects/reference/troubleshooting/#durable-object-reset-because-its-code-was-updated) when it is assigned a different version, so each Durable Object will only be reset once in this example.

{{<Aside type="note">}}

Typically, your Durable Object Worker will define both your Durable Object class and the Worker that interacts with it. In this case, you cannot deploy changes to your Durable Object and its Worker independently.

You should ensure that API changes between your Durable Object and its Worker are [forwards and backwards compatible](/durable-objects/platform/known-issues/#code-updates) whether you are using gradual deployments or not. However, using gradual deployments will make it even more likely that different versions of your Durable Objects and its Worker will interact with each other.

{{</Aside>}}

## Observability

When using gradual deployments, you may want to attribute Workers invocations to a specific version in order to get visibility into the impact of deploying new versions.

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

Use the [Version metadata binding](/workers/runtime-apis/bindings/version-metadata/) in to access version ID or version tag in your Worker.

## Limits

### Deployments limit

You can only create a new deployment with the last 10 uploaded versions of your Worker.

### Unsupported features

These Workers features will be supported in the near future.

- Updating [Secrets via wrangler](/workers/wrangler/commands/#secret) with a split deployment is not supported. You must fully deploy the latest version before using updating secrets.
- Gradual deployments are not supported for Workers with the [mTLS binding](/workers/runtime-apis/bindings/mtls/). Use [`wrangler deploy`](/workers/wrangler/commands/#deploy) for Workers with an mTLS binding. 
- Creating a gradual deployment with two different configurations for [Smart Placement](/workers/configuration/smart-placement/) is not supported. Use [`wrangler deploy`](/workers/wrangler/commands/#deploy) for Workers with Smart Placement enabled. 
- Creating a gradual deployment with [Durable Object migrations](/durable-objects/reference/durable-objects-migrations/) is not supported. Use [`wrangler deploy`](/workers/wrangler/commands/#deploy) if you are applying a [Durable Object migration](/durable-objects/reference/durable-objects-migrations/).

