---
pcx_content_type: concept
title: User Worker metadata
---

# User Worker metadata

You define the Worker's metadata as part of the [multipart upload of user Workers](/workers-for-platforms/get-started/configuration/#4-upload-user-workers-to-a-namespace). This metadata defines the Workers'configuration analogue to the [wrangler.toml file](/workers/wrangler/configuration/) for regular Workers.

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
    }
  ]
}
```

## Keys

Keys are configurable at the top-level.

{{<Aside type="note">}}
At a minimum, the `main_module` key is required to publish a user Worker.
{{</Aside>}}

{{<definitions>}}

- `main_module` {{<type>}}strin{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The path to the module entry point of the user Worker that will be executed. For example, `main.js`.


{{</definitions>}}

## Bindings

Analogue to regular Workers, user Workers can also interact with other Cloudflare resources using Bindings. See [metadata.json example](#sample-metadata.json) and the [Wrangler configuration documentation]((https://developers.cloudflare.com/workers/wrangler/configuration/#bindings) for more information.



```





