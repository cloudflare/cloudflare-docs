---
pcx_content_type: concept
title: Remote-procedure call (RPC)
meta:
  description: The built-in, JavaScript-native RPC system built into Workers and Durable Objects
---

# Remote-procedure call (RPC)

Workers provides a built-in, JavaScript-native [RPC (Remote Procedure Call)](https://en.wikipedia.org/wiki/Remote_procedure_call) system, allowing you to:

- Define public methods on your Worker that can be called by other Workers on the same Cloudflare account, via [Service Bindings](/workers/runtime-apis/bindings/service-bindings/rpc)
- Define public methods on [Durable Objects](/durable-objects) that can be called by other workers on the same Cloudflare account that declare a binding to it.

The RPC system is designed feel as similar as possible to calling a JavaScript function in the same Worker. In most cases, you should be able to write code in the same way you would if everything was in a single Worker.

## Example

{{<render file="_service-binding-rpc-example.md" productFolder="workers">}}

The client, in this case Worker A, calls Worker B and tells it to execute a specific procedure using specific arguments that the client provides. This is accomplished with standard JavaScript classes.

## Details

{{<directory-listing showDescriptions="true">}}

## Limitations

- [Smart Placement](/workers/configuration/smart-placement/) is currently ignored when making RPC calls. If Smart Placement is enabled for Worker A, and  Worker B declares a [Service Binding](/workers/runtime-apis/bindings) to it, any RPC calls to Worker A will run locally.