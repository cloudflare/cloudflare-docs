---
pcx_content_type: how-to
title: Uploading User Workers
weight: 3
layout: wide
---

# User Workers

[User Workers](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#user-workers) contain code written by your end users (end developers).

## Upload User Workers

You can upload user Workers to a namespace via Wrangler or the Cloudflare API. Workers uploaded to a namespace will not appear on the **Workers & Pages** section of the Cloudflare dashboard. Instead, they will appear in a namespace under the [Workers for Platforms](https://dash.cloudflare.com/?to=/:account/workers-for-platforms) tab.

To run Workers uploaded to a namespace, you will need to first create a [dispatch Worker](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dynamic-dispatch-worker)
with a [dispatch namespace binding](/workers/wrangler/configuration/#dispatch-namespace-bindings-workers-for-platforms).


### Upload user Workers via Wrangler

Uploading user Workers is supported through [wrangler](/workers/wrangler/) by running the following command:

```sh
$ npx wrangler deploy --dispatch-namespace <NAMESPACE_NAME>
```
For simplicity, start with wrangler when [getting started](/cloudflare-for-platforms/workers-for-platforms/get-started/configuration/).

### Upload user Workers via the API

Since you will be deploying Workers on behalf of your users, you will likely want to use the [Workers for Platforms script upload APIs](/api/operations/namespace-worker-put-script-content) directly instead of Wrangler to have more control over the upload process. The Workers for Platforms script upload API is the same as the [Worker upload API](/api/operations/worker-script-upload-worker-module), but it will upload the Worker to a [dispatch namespace](/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dispatch-namespace) instead of to your account directly.

## Bindings

You can use any Workers [bindings](/workers/runtime-apis/bindings/) with the dynamic dispatch Worker or any user Workers.

Bindings for your user Workers can be defined on [multipart script uploads](/api/operations/namespace-worker-put-script-content) in the [metadata](/workers/configuration/multipart-upload-metadata/) part.
