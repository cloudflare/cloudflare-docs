---
pcx_content_type: concept
title: WebAssembly (WASM)
weight: 2
---

# WebAssembly (WASM)

[WebAssembly](https://webassembly.org/) (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine.
Many [languages](http://localhost:5174/workers/platform/languages/#wasm-supported) can be compiled to Wasm and run on Workers.

Guides are available for the following languages:

{{<directory-listing>}}

## Supported Proposals

WebAssembly includes [many proposed APIs](https://webassembly.org/roadmap/) which are in various stages of development. In general, Workers supports "standardized" features which have been implemented by V8, except where the feature may pose a security risk.

### SIMD

SIMD is supported on Workers. For more information on using SIMD in WebAssembly, see [Fast, parallel applications with WebAssembly SIMD](https://v8.dev/features/simd).

### Threading

Threading is not possible in Workers because each Worker runs in a single thread to mitigate timing attacks, and the [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) API is not supported.

## Binary Size

WebAssembly tends to produce larger Workers bundles than JavaScript Workers. Cloudflare limits the size of Workers bundles for performance reasons. This limit will increase over time, however larger bundle size may still impact script startup time. You should
use tools like [`wasm-opt`](https://github.com/brson/wasm-opt-rs) to optimize the WASM binary, and limit the number of dependencies
included in your Worker.

## WASI

WASI support is experimental, with only some syscalls implemented. See our open source implementation [here](https://github.com/cloudflare/workers-wasi), and [blog post](https://blog.cloudflare.com/announcing-wasi-on-workers/) demonstrating its use. 
