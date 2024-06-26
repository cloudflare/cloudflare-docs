---
pcx_content_type: configuration
title: Source maps and stack traces
meta:
  description: Adding source maps and generating stack traces for Workers. 
---
{{<heading-pill style="beta">}}Source maps and stack traces{{</heading-pill>}}

{{<render file="_source-maps.md" productFolder="workers">}}

{{<Aside type="warning">}}

Support for uploading source maps is available now in open beta. Minimum required Wrangler version: 3.46.0.

{{</Aside>}}

## Source Maps

To enable source maps, add the following to your Worker's [`wrangler.toml`](/workers/wrangler/configuration/) file: 

```toml
upload_source_maps = true 
```

When `upload_source_maps` is set to `true`, Wrangler will automatically generate and upload source map files when you run [`wrangler deploy`](/workers/wrangler/commands/#deploy) or [`wrangler versions deploy`](/workers/wrangler/commands/#deploy-2).
​​

{{<Aside type="note">}}

Miniflare can also [output source maps](https://miniflare.dev/developing/source-maps) for use in local development or [testing](/workers/testing/integration-testing/#miniflares-api). 

{{</Aside>}}

## Stack traces
​​
When your Worker throws an uncaught exception, we fetch the source map and use it to map the stack trace of the exception back to lines of your Worker’s original source code. 

You can then view the stack trace in when streaming [real-time logs](/workers/observability/logging/real-time-logs/) or in [Tail Workers](/workers/observability/logging/tail-workers/).

{{<Aside type="note">}}

The source map is retrieved after your Worker invocation completes — it's an asynchronous process that does not impact your Worker's CPU utilization or performance. Source maps are not accessible inside the Worker at runtime, if you `console.log()` the [stack property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) within a Worker, you will not get a deobfuscated stack trace. 

{{</Aside>}}

When Cloudflare attempts to remap a stack trace to the Worker's source map, it does so line-by-line, remapping as much as possible. If a line of the stack trace cannot be remapped for any reason, Cloudflare will leave that line of the stack trace unchanged, and continue to the next line of the stack trace.

## Related resources

* [Tail Workers](/workers/observability/logging/logpush/) - Learn how to attach Tail Workers to transform your logs and send them to HTTP endpoints.
* [Real-time logs](/workers/observability/logging/real-time-logs/) - Learn how to capture Workers logs in real-time.
