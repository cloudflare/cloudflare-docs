---
pcx_content_type: concept
title: Source maps and stack traces
meta:
  description: Adding source maps and generating stack traces for Workers. 
---
{{<heading-pill style="beta">}}Source maps and stack traces{{</heading-pill>}}

[Stack traces](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) help with debugging your code when the Worker encounters an unhandled exception. They show you the specific functions that were called, in what order, from which line and file, and with what arguments.

Most JavaScript code – not just on Workers, but across platforms – is first bundled, often transpiled, and then minified before being deployed to production. This to create smaller bundles to optimize performance and convert from Typescript to Javascript if needed.

Source maps translate compiled and minified code back to the original code that you wrote. Source maps are combined with the stack trace returned by the JavaScript runtime in order to present you with a stack trace.

{{<Aside type="warning">}}

Source maps and stack traces support is going to be in open beta on April 15. 

{{</Aside>}}

## Source Maps

Source maps can be enabled on a per-Worker level by adding the following to the Worker's [wrangler.toml](/workers/wrangler/) file: 

```toml
upload_source_maps = true 

```

Once this setting is configured, wrangler will automatically generate and upload any source map files when you run [`wrangler deploy`](/workers/wrangler/commands/#deploy) or [`wrangler versions deploy`](/workers/wrangler/commands/#deploy-2). 
​​

{{<Aside type="note">}}

Miniflare supports [uploading source maps for local development](https://miniflare.dev/developing/source-maps). 

{{</Aside>}}

## Stack Traces
​​
When your Worker throws an uncaught exception, we fetch the source map and use it to map the stack trace of the exception back to lines of your Worker’s original source code.

You can then view the stack trace in when streaming [real-time logs](/workers/observability/logging/real-time-logs/) or in [Tail Workers](/workers/observability/logging/tail-workers/).

