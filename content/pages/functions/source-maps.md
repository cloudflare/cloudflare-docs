---
pcx_content_type: configuration
title: Source maps and stack traces
meta:
  description: Adding source maps and generating stack traces for Pages. 
---
{{<heading-pill style="beta">}}Source maps and stack traces{{</heading-pill>}}

{{<render file="_source-maps.md" productFolder="workers">}}

{{<Aside type="warning">}}

Support for uploading source maps for Pages is available now in open beta. Minimum required Wrangler version: 3.60.0. 

{{</Aside>}}

## Source Maps

To enable source maps, provide the `--upload-source-maps` flag to [`wrangler pages deploy`](/workers/wrangler/commands/#deploy-1) or add the following to your Pages application's [`wrangler.toml`](/pages/functions/wrangler-configuration/) file if you are using the Pages build environment:

```toml
upload_source_maps = true 
```

When uploading source maps is enabled, Wrangler will automatically generate and upload source map files when you run [`wrangler pages deploy`](/workers/wrangler/commands/#deploy-1).

## Stack traces
​​
When your application throws an uncaught exception, we fetch the source map and use it to map the stack trace of the exception back to lines of your application’s original source code. 

You can then view the stack trace when streaming [real-time logs](/pages/functions/debugging-and-logging/).

{{<Aside type="note">}}

The source map is retrieved after your Pages Function invocation completes — it's an asynchronous process that does not impact your applications's CPU utilization or performance. Source maps are not accessible inside the application at runtime, if you `console.log()` the [stack property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack), you will not get a deobfuscated stack trace. 

{{</Aside>}}

## Related resources

* [Real-time logs](/pages/functions/debugging-and-logging/) - Learn how to capture Pages logs in real-time.