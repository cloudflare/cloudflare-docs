---
pcx_content_type: configuration
title: WebGPU
---

# WebGPU

The [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API), allows you to use the GPU directly from JavaScript.

The WebGPU API is only accessible from within [Durable Objects](/durable-objects/) — it cannot be used from within Workers.

{{<Aside type="note">}}
The WebGPU API is currently only available in local development. You cannot yet deploy Durable Objects to Cloudflare that rely on the WebGPU API.
{{</Aside>}}

To try using the WebGPU API in local development, enable the `experimental` and `webgpu` [compatibility flags](/workers/configuration/compatibility-dates/#compatibility-flags) in the [`wrangler.toml` configuration file](/workers/wrangler/configuration/) of your Durable Object.

```
compatibility_flags = ["experimental", "webgpu"]
```

The following subset of the WebGPU API is available from within Durable Objects:

| API | Supported? | Notes |
|-----|------------|-------|
| [`API`](name) | ✅ | |


## Examples

- [workers-wonnx](https://github.com/cloudflare/workers-wonnx/)
