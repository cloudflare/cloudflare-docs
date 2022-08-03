---
pcx_content_type: how-to
title: Configuration
weight: 1
meta:
    title: Configuration - Workers for Platforms
---

# Configuration - Workers for Platforms

---

## Step 1 - Namespace creation

The first step to working with namespaces is to create a namespace, which requires only a name:

```json
POST /api/dispatch/namespaces
{
    "name": "customer-workers-production"
}
```

## Step 2 - Dispatcher creation

The dispatcher worker gets workers from the namespace and executes them. The following example works with Wrangler 2:

```json
src/index.ts

export default {
  async fetch(request, env) {
    try {
        let worker_name = new URL(request.url).host.split('.')[0]
        let user_worker = env.dispatcher.get(worker_name)
        return user_worker.fetch()
    } catch (e) {
        if (e.message == 'Error: Worker not found.') {
            // we tried to get a worker that doesn't exist in our namespace
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

## Step 3 - Tag your users' Workers

To help you manage your customers’ Workers, you can use tags to better perform CRUD operations at scale. You can tag scripts based on things like user ID, account ID, project ID, environment, etc, such that when a user deletes their project, you can easily clean up all of their Workers.

### Tags API

`GET /dispatch/namespaces/:name/scripts/:name/tags` lists tags through a response body of a list of tag strings. 

`PUT /dispatch/namespaces/:name/scripts/:name/tags` sets the tags associated with the worker to match the tags specified in the body. If there are tags already associated with the worker script that are not in the request, they will be removed.

`PUT /dispatch/namespaces/:name/scripts/:name/tags/:tag` adds the single specified tag to the list of tags associated with the worker script.

`DELETE /dispatch/namespaces/:name/scripts/` deletes the specified tag from the list of tags associated with the worker script.

`GET /workers/scripts?tags=FILTER` gets all worker scripts that have tags that match the filter specified. The filter must be comma separated pairs of tag names to a yes or no value depending if the tag should act as an allowlist or blocklist.

`DELETE /workers/scripts?tags=FILTER` deletes all worker scripts matching the filter
