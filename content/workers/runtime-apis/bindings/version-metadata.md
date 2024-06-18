---
pcx_content_type: configuration
title: Version metadata
meta:
  description: Exposes Worker version metadata (`versionID` and `versionTag`). These fields can be added to events emitted from the Worker to send to downstream observability systems.
---

{{<heading-pill style="beta">}}Version metadata binding{{</heading-pill>}}

The version metadata binding can be used to access metadata associated with a [version](/workers/configuration/versions-and-deployments/#versions) from inside the Workers runtime.

Worker version ID, version tag and timestamp of when the version was created are available through the version metadata binding. They can be used in events sent to [Workers Analytics Engine](/analytics/analytics-engine/) or to any third-party analytics/metrics service in order to aggregate by Worker version.

To use the version metadata binding, update your Worker's `wrangler.toml` file:

```toml
---
header: wrangler.toml
---
[version_metadata]
binding = "CF_VERSION_METADATA"
```

### Interface

An example of how to access the version ID and version tag from within a Worker to send events to [Workers Analytics Engine](/analytics/analytics-engine/):

{{<tabs labels="js | ts">}}
{{<tab label="js"  default="true">}}

```js
export default {
  async fetch(request, env, ctx) {
    const { id: versionId, tag: versionTag, timestamp: versionTimestamp } = env.CF_VERSION_METADATA;
    env.WAE.writeDataPoint({
      indexes: [versionId],
      blobs: [versionTag, versionTimestamp],
      //...
    });
    //...
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
interface Environment {
  CF_VERSION_METADATA: WorkerVersionMetadata;
  WAE: AnalyticsEngineDataset;
}

export default {
  async fetch(request, env, ctx) {
    const { id: versionId, tag: versionTag } = env.CF_VERSION_METADATA;
    env.WAE.writeDataPoint({
      indexes: [versionId],
      blobs: [versionTag],
      //...
    });
    //...
  },
} satisfies ExportedHandler<Env>;
```

{{</tab>}}
{{</tabs>}}
