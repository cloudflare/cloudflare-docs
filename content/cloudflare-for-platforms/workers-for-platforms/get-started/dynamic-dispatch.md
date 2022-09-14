---
pcx_content_type: how-to
title: Create dynamic dispatch
weight: 3
layout: list
---

# Create dynamic dispatch

Once you've created a dispatch namespace, you can fetch any user Workers in the namespace using a dispatcher Worker. The [dispatcher Worker](/cloudflare-for-platforms/workers-for-platforms/get-started/configuration/#2-create-dispatcher) has a namespace binding.

Use any method of routing to a namespaced Worker (reading the subdomain, request header, or lookup in a database). Ultimately you need the name of the user Worker.

In the following example, routing to user workers is done through reading the subdomain `<USER_WORKER_NAME>.example.com/*`. For example, `my-customer.example.com` will run the script uploaded to `PUT accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/my-dispatch-namespace/scripts/my-customer`.

`src/index.ts`

```json
export default {
  async fetch(request, env) {
    try {
        // parse the URL, read the subdomain
        let worker_name = new URL(request.url).host.split('.')[0]
        let user_worker = env.dispatcher.get(worker_name)
        return user_worker.fetch(request)
    } catch (e) {
        if (e.message == 'Error: Worker not found.') {
            // we tried to get a worker that doesn't exist in our dispatch namespace
            return new Response('', {status: 404})
        }

        // this could be any other exception from `fetch()` *or* an exception
        // thrown by the called worker (e.g. if the dispatched worker has 
        // `throw MyException()`, you could check for that here).
        return new Response(e.message, {status: 500})
    }
  }
}
```

### Dynamic Dispatch API reference

Method and endpoint | Description
--------------------|------------
`GET https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/?limit=<LIMIT>&cursor=:<CURSOR>&tags=:<TAGS_LIST>` | Lists the Workers that have been uploaded to this dispatch namespace.<br>This endpoint is paginated using the query parameters `limit` (to limit the number of results given, default and max of 1000) and `cursor` (for fetching pages after the first). It also accepts a comma-separated list of script `tags` and whether they should be included in the response, in the format tag-name:[yes/no]. Example: `tags=customer-123:yes,production:no`.
`PUT https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>` | Uploads a Worker to a dispatch namespace.
`DELETE https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>` |  Deletes a script from a dispatch namespace. This will fully delete the given script, immediately making it unavailable to all of the dispatch namespace bindings referencing this dispatch namespace.