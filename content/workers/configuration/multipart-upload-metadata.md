---
pcx_content_type: concept
title: Multipart upload metadata
---

# Multipart upload metadata

If you're using the [Workers Script Upload API](/api/operations/worker-script-upload-worker-module) or [Version Upload API](/api/operations/worker-versions-upload-version) directly, `multipart/form-data` uploads require you to specify a `metadata` part. This metadata defines the Worker's configuration in JSON format, analogue to the [wrangler.toml file](/workers/wrangler/configuration/).

## Sample `metadata`

```json
---
filename: metadata
---
{
  "main_module": "main.js",
  "bindings": [
    {
      "type": "plain_text",
      "name": "MESSAGE",
      "text": "Hello, world!"
    }
  ],
  "compatibility_date": "2021-09-14"
}
```

## Attributes

The following attributes are configurable at the top-level.

{{<Aside type="note">}}
At a minimum, the `main_module` key is required to upload a Worker.
{{</Aside>}}

{{<definitions>}}

- `main_module` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The part name that contains the module entry point of the Worker that will be executed. For example, `main.js`.

- `bindings` {{<type>}}array[object]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - [Bindings](#bindings) to expose in the Worker.

- `placement` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - [Smart placement](/workers/configuration/smart-placement/) object for the Worker.
  - `mode` field only supports `smart` for automatic placement.

- `compatibility_date` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - [Compatibility Date](/workers/configuration/compatibility-dates/#setting-compatibility-date) indicating targeted support in the Workers runtime. Backwards incompatible fixes to the runtime following this date will not affect this Worker. Highly recommended to set a `compatibility_date`, otherwise if on upload via the API, it defaults to the oldest compatibility date before any flags took effect (2021-11-02).

- `compatibility_flags` {{<type>}}array[string]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - [Compatibility Flags](/workers/configuration/compatibility-dates/#setting-compatibility-flags) that enable or disable certain features in the Workers runtime. Used to enable upcoming features or opt in or out of specific changes not included in a `compatibility_date`.

- `usage_model` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Usage model to apply to invocations, only allowed value is `standard`.

{{</definitions>}}

## Additional attributes: [Workers Script Upload API](/api/operations/worker-script-upload-worker-module)

For [immediately deployed uploads](/workers/configuration/versions-and-deployments/#upload-a-new-version-and-deploy-it-immediately), the following **additional** attributes are configurable at the top-level.

{{<Aside type="note">}}
These attributes are **not available** for version uploads.
{{</Aside>}}

{{<definitions>}}

- `migrations` {{<type>}}array[object]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - [Durable Objects migrations](/durable-objects/reference/durable-objects-migrations/) to apply.

- `logpush` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Whether [Logpush](/cloudflare-for-platforms/cloudflare-for-saas/hostname-analytics/#logpush) is turned on for the Worker.

- `tail_consumers` {{<type>}}array[object]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - [Tail Workers](/workers/observability/logging/tail-workers/) that will consume logs from the attached Worker.

- `tags` {{<type>}}array[string]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - List of strings to use as tags for this Worker.

{{</definitions>}}

## Additional attributes: [Version Upload API](/api/operations/worker-versions-upload-version)

For [version uploads](/workers/configuration/versions-and-deployments/#upload-a-new-version-to-be-gradually-deployed-or-deployed-at-a-later-time), the following **additional** attributes are configurable at the top-level.

{{<Aside type="note">}}
These attributes are **not available** for immediately deployed uploads.
{{</Aside>}}

{{<definitions>}}

- `annotations` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Annotations object specific to the Worker version.
  - `workers/message` specifies a custom message for the version.
  - `workers/tag` specifies a custom identifier for the version.

{{</definitions>}}

## Bindings

Workers can interact with resources on the Cloudflare Developer Platform using [bindings](/workers/runtime-apis/bindings/). Refer to the JSON example below that shows how to add bindings in the `metadata` part.

```json
---
filename: metadata
---
{
  "bindings": [
    {
      "type": "ai",
      "name": "<VARIABLE_NAME>"
    },
    {
      "type": "analytics_engine",
      "name": "<VARIABLE_NAME>",
      "dataset": "<DATASET>"
    },
    {
      "type": "browser_rendering",
      "name": "<VARIABLE_NAME>"
    },
    {
      "type": "d1",
      "name": "<VARIABLE_NAME>",
      "id": "<D1_ID>"
    },
    {
      "type": "durable_object_namespace",
      "name": "<VARIABLE_NAME>",
      "class_name": "<DO_CLASS_NAME>"
    },
    {
      "type": "hyperdrive",
      "name": "<VARIABLE_NAME>",
      "id": "<HYPERDRIVE_ID>"
    },
    {
      "type": "kv_namespace",
      "name": "<VARIABLE_NAME>",
      "namespace_id": "<KV_ID>"
    },
    {
      "type": "mtls_certificate",
      "name": "<VARIABLE_NAME>",
      "certificate_id": "<MTLS_CERTIFICATE_ID>"
    },
    {
      "type": "plain_text",
      "name": "<VARIABLE_NAME>",
      "text": "<VARIABLE_VALUE>"
    },
    {
      "type": "queue",
      "name": "<VARIABLE_NAME>",
      "queue_name": "<QUEUE_NAME>"
    },
    {
      "type": "r2_bucket",
      "name": "<VARIABLE_NAME>",
      "bucket_name": "<R2_BUCKET_NAME>"
    },
    {
      "type": "secret_text",
      "name": "<VARIABLE_NAME>",
      "text": "<SECRET_VALUE>"
    },
    {
      "type": "service",
      "name": "<VARIABLE_NAME>",
      "service": "<SERVICE_NAME>",
      "environment": "production"
    },
    {
      "type": "tail_consumer",
      "service": "<WORKER_NAME>"
    },
    {
      "type": "vectorize",
      "name": "<VARIABLE_NAME>",
      "index_name": "<INDEX_NAME>"
    },
    {
      "type": "version_metadata",
      "name": "<VARIABLE_NAME>"
    }
  ]
}
```
