---
pcx_content_type: concept
title: User Worker metadata
---

# User Worker metadata

You define the Worker's metadata as part of the [multipart upload of user Workers](/cloudflare-for-platforms/workers-for-platforms/get-started/configuration/#4-upload-user-workers-to-a-namespace). This metadata defines the Workers'configuration analogue to the [wrangler.toml file](/workers/wrangler/configuration/) for regular Workers.

## Sample metadata.json

```json
---
filename: metadata.json
---
{
  "main_module": "main.js",
  "bindings": [
    {
      "type": "service",
      "name": "<TEST_SERVICE>",
      "service": "<TEST_SERVICE_NAME>",
      "environment": "production"
    },
    {
      "type": "kv_namespace",
      "name": "<TEST_KV>",
      "namespace_id": "<KV_ID>"
    },
    {
      "type": "r2_bucket",
      "name": "<TEST_R2>",
      "bucket_name": "<TEST_R2_BUCKET_NAME>"
    },
    {
      "type": "durable_object_namespace",
      "name": "<TEST_DURABLE_OBJECT>",
      "class_name": "<TEST_CLASS>"
    },
    {
      "type": "d1",
      "name": "<TEST_D1>",
      "id": "<TEST_D1_ID>"
    },
    {
      "type": "analytics_engine",
      "name": "<TEST_ANALYTICS_ENGINE>",
      "dataset": "<TEST_DATASET>"
    },
    {
      "type": "queue",
      "name": "<TEST_QUEUE>",
      "queue_name": "<TEST_QUEUE_NAME>"
    },
    {
      "type": "mtls_certificate",
      "name": "<TEST_MTLS>",
      "certificate_id": "<TEST_CERTIFICATE_ID>"
    },
    {
      "type": "plain_text",
      "name": "<VAR_NAME>",
      "text": "<VAR_VALUE>"
    }
  ]
}
```

## Attributes

The following attributes are configurable at the top-level.

{{<Aside type="note">}}
At a minimum, the `main_module` key is required to publish a user Worker.
{{</Aside>}}

{{<definitions>}}

- `main_module` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The path to the module entry point of the user Worker that will be executed. For example, `main.js`.


- `bindings` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The bindings for the user Worker to enable interactions with other resources.


{{</definitions>}}

## Bindings

Analogue to regular Workers, user Workers can also interact with other Cloudflare resources using Bindings. Refer to [metadata.json example](#sample-metadatajson) and the [Wrangler configuration documentation](/workers/wrangler/configuration/#bindings) for more information.

## Tags API reference

Method and endpoint | Description
--------------------|------------
`GET https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags` | Lists tags through a response body of a list of tag strings.
`GET https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags?tags=FILTER` | Returns true or false where `filter` is a comma separated pairs of tag names to a yes or no value (for example, `my-tag-value:yes`)
`GET https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts?tags=FILTER` |  Gets all Worker scripts that have tags that match the filter specified. The filter must be comma separated pairs of tag names to a yes or no value depending if the tag should act as an allowlist or blocklist.  
`PUT https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags` |  Sets the tags associated with the worker to match the tags specified in the body. If there are tags already associated with the Worker script that are not in the request, they will be removed.
`PUT https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags/<TAG>` | Adds the single specified tag to the list of tags associated with the Worker script.
`DELETE https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts/<SCRIPT_NAME>/tags/<TAG>` | Deletes the single specified tag from the list of tags associated with the Worker script.
`DELETE https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/dispatch/namespaces/<NAMESPACE_NAME>/scripts?tags=FILTER` |  Deletes all Worker scripts matching the filter.






