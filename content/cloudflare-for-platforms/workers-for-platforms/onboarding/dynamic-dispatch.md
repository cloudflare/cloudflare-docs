---
pcx_content_type: how-to
title: Dynamic Dispatch
weight: 3
---

# Dynamic Dispatch

Once you've created a Dispatch Namespace, you can fetch any user Workers in the namespace using a dispatcher worker. The distpacher worker has a namespace binding  (this is step #2 on the [Configuration](/cloudflare-for-platforms/workers-for-platforms/onboarding/walkthrough) page). 


Any method of 'routing' to a namespaced worker can be used (reading the subdomain, request header, or lookup in a database). In the end we just need the name of the user Worker.


In the following example, routing to user workers is done through reading the subdomain `<USER_WORKER_NAME>.example.com/*`. For example, `my-customer.example.com` will run the script uploaded to `PUT accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/my-dispatch-namespace/scripts/my-customer`


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
