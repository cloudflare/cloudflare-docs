---
pcx_content_type: how-to
title: Configuration
weight: 1
meta:
    title: Configuration
---

# Configuration

---
## 1. Dispatch Namespace creation

The first step to working with dispatch namespaces is to create a namespace. Once you've logged into Wrangler, run the following commang to create a new dispatch namespace:

```json
wrangler dispatch-namespace create <NAMESPACE_NAME>
```

## 2. Dispatcher creation

The dispatcher Worker calls Workers from the namespace and executes them. A dispatch namespace binding is use in order to create a dispatcher Worker. After creating a Worker, add the following to your wrangler.toml file. 


```json
[[dispatch_namespaces]]
binding = "dispatcher"
namespace = "<NAMESPACE_NAME>"
```

For special cases (such as using wrangler@d1 which at the moment isn’t caught up), An unsafe binding is available. This is subject to change, use at your own risk.

```json
[[unsafe.bindings]]
name = "dispatcher"
type = "namespace"
namespace = "<NAMESPACE_NAME>"
```
If you're doing your own multipart uploads, just include a similar object in your metadata's bindings property:
```json

{
    "bindings": [
        ...,
        {
            "name": "dispatcher",
            "type": "dispatch_namespace",
            "namespace": "my-namespace"
        }
    ]
}
```

## 3. Upload User Workers to a Namespace

This is the same as our standard Worker upload API, but will upload the worker to a dispatch namespace instead of to your account in general. User Workers must be uploaded via the Cloudflare API, wrangler does not support this operation.Workers uploaded this way will not appear on your dashboard

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <AUTH_KEY>" \
     -H "Content-Type: application/javascript" \
--data "addEventListener('fetch', event => { event.respondWith(fetch(event.request)) })"
```
For uploading files, use the following:
```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <AUTH_KEY>" \
     -F "metadata=@metadata.json;type=application/json" \
     -F "script=@script.js;type=application/javascript"
```

## 4. Tag your users' Workers

To help you manage your customers’ Workers, you can use tags to better perform CRUD operations at scale. You can tag scripts based on things like user ID, account ID, project ID, environment, etc, such that when a user deletes their project, you can easily clean up all of their Workers.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <AUTH_KEY>" \
     -H "Content-Type: application/javascript" \
    --data "['TAG1', 'TAG2', 'TAG3']"
"
```
To tag a script, tags can now be included on multipart script uploads in the metadata blob (alongside bindings, etc.):
```json
{
    "body_part": "script",
    "bindings": [...],
    "tags": ["customer-123", "staging", "free-user"]
}
```

### Tags API

`GET /dispatch/namespaces/:name/scripts/:name/tags` lists tags through a response body of a list of tag strings. 

`PUT /dispatch/namespaces/:name/scripts/:name/tags` sets the tags associated with the worker to match the tags specified in the body. If there are tags already associated with the worker script that are not in the request, they will be removed.

`PUT /dispatch/namespaces/:name/scripts/:name/tags/:tag` adds the single specified tag to the list of tags associated with the worker script.

`DELETE /dispatch/namespaces/:name/scripts/` deletes the specified tag from the list of tags associated with the worker script.

`GET /workers/scripts?tags=FILTER` gets all worker scripts that have tags that match the filter specified. The filter must be comma separated pairs of tag names to a yes or no value depending if the tag should act as an allowlist or blocklist.

`DELETE /workers/scripts?tags=FILTER` deletes all worker scripts matching the filter
