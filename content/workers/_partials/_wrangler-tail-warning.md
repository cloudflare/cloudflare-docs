---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning">}}

When updating a Worker with Wrangler the [Tail Consumer](/workers/observability/logging/tail-workers) config will be removed. Please add the tail_consumer config to the top level of your `wrangler.toml`.

```toml
tail_consumers = [{service = "<TAIL_WORKER_NAME>"}]
```

{{</Aside>}}