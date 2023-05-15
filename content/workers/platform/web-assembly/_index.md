---
pcx_content_type: concept
title: WebAssembly (Wasm)
layout: single
---

# WebAssembly (Wasm)

[WebAssembly](https://webassembly.org/) (abbreviated Wasm) allows you to compile languages like Rust, Go, or C to a binary format that can run in a wide variety of environments, including [web browsers](https://developer.mozilla.org/en-US/docs/WebAssembly#browser_compatibility), Cloudflare Workers, and other WebAssembly runtimes.

On Workers, you can use WebAssembly to:
- Execute code written in a language other than JavaScript, via `WebAssembly.instantiate()`.
- Write an entire Cloudflare Worker in Rust, using bindings that make Workers' JavaScript APIs available directly from your Rust code.

Most programming languages can be compiled to Wasm, although support varies across languages and compilers. Guides are available for the following languages:

{{<directory-listing>}}

## Supported proposals

WebAssembly is a rapidly evolving set of standards, with [many proposed APIs](https://webassembly.org/roadmap/) which are in various stages of development. In general, Workers supports the same set of features that are available in Google Chrome.

### SIMD

SIMD is supported on Workers. For more information on using SIMD in WebAssembly, refer to [Fast, parallel applications with WebAssembly SIMD](https://v8.dev/features/simd).

### Threading

Threading is not possible in Workers. Each Worker runs in a single thread, and the [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) API is not supported.

## Binary size

Compiling to WebAssembly often requires including additional runtime dependencies. As a result, Workers that use WebAssembly are typically larger than an equivalent Worker written in JavaScript. The larger your Worker is, the longer it may take your Worker to start. Refer to [Worker startup time](https://developers.cloudflare.com/workers/platform/limits/#worker-startup-time) for more information. We recommend using tools like [`wasm-opt`](https://github.com/brson/wasm-opt-rs) to optimize the size of your Wasm binary.

## WebAssembly System Interface (WASI)

The [WebAssembly System Interface](https://wasi.dev/) (abbreviated WASI) is a modular system interface for WebAssembly that standardizes a set of underlying system calls for networking, file system access, and more. Applications can depend on the WebAssembly System Interface to behave identically across host environments and operating systems.

WASI is an earlier and more rapidly evolving set of standards than Wasm. WASI support is experimental on Cloudflare Workers, with only some syscalls implemented. Refer to our [open source implementation of WASI](https://github.com/cloudflare/workers-wasi), and [blog post about WASI on Workers](https://blog.cloudflare.com/announcing-wasi-on-workers/) demonstrating its use. 
