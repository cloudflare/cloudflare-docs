---
pcx_content_type: concept
title: WebAssembly (Wasm)
---

# WebAssembly (Wasm)

[WebAssembly](https://webassembly.org/) (abbreviated Wasm) allows you to compile languages like Rust, Go, or C to a binary format that can run in a wide variety of environments, including [web browsers](https://developer.mozilla.org/en-US/docs/WebAssembly#browser_compatibility), Cloudflare Workers, and other WebAssembly runtimes.

On Workers, you can use WebAssembly to:
- Execute code written in a language other than JavaScript, via `WebAssembly.instantiate()` ([example](/workers/platform/web-assembly/javascript/#use-from-javascript)).
- Write an entire Cloudflare Worker in Rust, using bindings that make Workers' JavaScript APIs available directly from Rust.

Most programming languages can be compiled to Wasm, although support varies across languages and compilers. Guides are available for the following:

{{<directory-listing>}}

## Supported Proposals

WebAssembly is a rapidly evolving set of standards, with [many proposed APIs](https://webassembly.org/roadmap/) which are in various stages of development. In general, Workers supports the same set of features that are available in Google Chrome.

### SIMD

SIMD is supported on Workers. For more information on using SIMD in WebAssembly, see [Fast, parallel applications with WebAssembly SIMD](https://v8.dev/features/simd).

### Threading

Threading is not possible in Workers because each Worker runs in a single thread to mitigate timing attacks, and the [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) API is not supported.

## Binary Size

Compiling to WebAssembly often requires including additional runtime dependencies. As a result, Workers that use WebAssembly are typically larger than an equivalent Worker written in JavaScript. The larger your Worker is, the longer it may take your Worker to [start](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time). We recommend using tools like [`wasm-opt`](https://github.com/brson/wasm-opt-rs) to optimize the size of your Wasm binary.

## WASI

WASI support is experimental, with only some syscalls implemented. See our open source implementation [here](https://github.com/cloudflare/workers-wasi), and [blog post](https://blog.cloudflare.com/announcing-wasi-on-workers/) demonstrating its use. 
