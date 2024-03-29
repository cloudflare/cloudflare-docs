---
pcx_content_type: configuration
title: Version metadata
meta:
  description: Exposes Worker version metadata (`versionID` and `versionTag`). These fields can be added to events emitted from the Worker to send to downstream observability systems.
---

{{<heading-pill style="beta">}}Version metadata binding{{</heading-pill>}}

The version metadata binding can be used to access metadata associated with a [version](/workers/configuration/versions-and-deployments/#versions) from inside the Workers runtime. 

Worker version ID and version tag are available through the version metadata binding. They can be used in events sent to [Workers Analytics Engine](/analytics/analytics-engine/) or to any third-party analytics/metrics service in order to aggregate by Worker version.

To use the version metdata binding, ipdate your Worker's `wrangler.toml` file:
```
---
header: wrangler.toml
---
[version_metadata]
binding = "CF_VERSION_METADATA"
```

### Interface

An example of how to access the version ID and version tag from within a Worker to send events to [Workers Analytics Engine](/analytics/analytics-engine/):

```js
export default {
    async fetch(request, env, ctx) {
      const { versionId } = env.CF_VERSION_METADATA.id;
      const { versionTag } = env.CF_VERSION_METADATA.tag;
      env.WAE.writeDataPoint({
      'indexes': [versionId],
      'blobs': [versionTag],
       //...
    });
        //...
    }
}
```
