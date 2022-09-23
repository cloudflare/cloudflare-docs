---
pcx_content_type: how-to
title: Configure Workers for Platforms
weight: 1
meta:
    title: Configure Workers for Platforms
---

# Configure Workers for Platforms

---
## 1. Create dispatch namespace 

The first step to working with dispatch namespaces is to create a namespace. Once you have [installed and authenticated Wrangler](/workers/get-started/guide/#1-install-wrangler-workers-cli), run the following command to create a new dispatch namespace:

```sh
$ wrangler dispatch-namespace create <NAMESPACE_NAME>
```

## 2. Create dispatcher

The dispatcher Worker calls user Workers from the namespace and executes them. A dispatch namespace binding is used in order to create a dispatcher Worker. After [starting a new project](/workers/get-started/guide/#3-start-a-new-project), add the following to your `wrangler.toml` file.

```toml
[[dispatch_namespaces]]
binding = "dispatcher"
namespace = "<NAMESPACE_NAME>"
```
 
If you are doing your own multipart uploads, include a similar object in your metadata's bindings property:

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

## 3. Upload user Workers to a namespace

This is the same as our standard Worker upload API, but will upload the worker to a dispatch namespace instead of to your account in general. User Workers must be uploaded via the Cloudflare API, wrangler does not support this operation. Workers uploaded this way will not appear on your dashboard.

```bash
curl -X PUT 
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <AUTH_KEY>" \
     -H "Content-Type: application/javascript" \
--data "addEventListener('fetch', event => { event.respondWith(fetch(event.request)) })"
```

## 4. Tag your users' Workers

To help you manage your customers’ Workers, you can use tags to better perform CRUD operations at scale. You can tag scripts based on things like user ID, account ID, project ID, environment, etc, such that when a user deletes their project, you can easily clean up all of their Workers.

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <AUTH_KEY>" \
     -H "Content-Type: application/javascript" \
    --data "['TAG1', 'TAG2', 'TAG3']"
```

{{<Aside type="note">}}

You can set a maximum of eight tags per script. Avoid special characters like `,` and `&` when naming your tag.

{{</Aside>}}

To tag a script, tags can now be included on multipart script uploads in the metadata blob (alongside bindings, etc.):

```json
{
    "body_part": "script",
    "bindings": [...],
    "tags": ["TAG1", "TAG2", "TAG3"]
}
```

### Tags API reference

Method and endpoint | Description
--------------------|------------
`GET https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags` | Lists tags through a response body of a list of tag strings.
`GET https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags?tags=FILTER` | Returns true or false. Where filter is a comma separated pairs of tag names to a yes or no value (eg. my-tag-value:yes)
`GET https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts?tags=FILTER` |  Gets all worker scripts that have tags that match the filter specified. The filter must be comma separated pairs of tag names to a yes or no value depending if the tag should act as an allowlist or blocklist.  
`PUT https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags` |  Sets the tags associated with the worker to match the tags specified in the body. If there are tags already associated with the worker script that are not in the request, they will be removed.
`PUT https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags/<TAG>` | Adds the single specified tag to the list of tags associated with the worker script.
`DELETE https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags/<TAG>` | Deletes the single specified tag from the list of tags associated with the worker script.
`DELETE https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts?tags=FILTER` |  Deletes all worker scripts matching the filter.