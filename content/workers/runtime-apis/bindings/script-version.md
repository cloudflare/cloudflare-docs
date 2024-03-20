---
pcx_content_type: configuration
title: Version metadata
meta:
  description: Exposes Worker version metadata (`versionID` and `versionTag`). These fields can be added to events emitted from the Worker to send to downstream observability systems.
---

{{<heading-pill style="beta">}}Version metadata binding{{</heading-pill>}}

The version metadata binding can be used to access metadata associated with a [version](/workers/configuration/versions-and-deployments/#versions) from inside the Workers runtime. 

Worker version ID and version tag are available through the version metadata binding. They can be used in events sent to [Workers Analytics Engine](/analytics/analytics-engine/) or to any third-party analytics/metrics service in order to aggregate by Worker version.

Update your Worker project's `wrangler.toml` file to include the version metadata binding:
```
---
header: wrangler.toml
---
[[unsafe.bindings]]
name = "version"
type = "version_metadata"
```

{{<Aside type="warning">}}

Currently, the `version_metadata` binding is in beta and uses the `unsafe.bindings` flag. Cloudflare will be adding first-class support for this new binding in the near future. 

{{</Aside>}}

### Interface

An example of how to access the version ID and version tag from within a Worker:

```js
export default {
    async fetch(request, env, ctx) {
      const { versionId } = env.VERSION.id;
      const { versionTag } = env.VERSION.tag;
      env.WAE.writeDataPoint({
      'indexes': [versionId],
      'blobs': [versionTag],
       //...
    });
        //...
    }
}
```
