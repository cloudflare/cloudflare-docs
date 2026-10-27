---
_build:
  publishResources: false
  render: never
  list: never

name: "Name WebAssembly modules after their module in stack traces"
sort_date: "2026-12-01"
enable_date: "2026-12-01"
enable_flag: "wasm_source_url_support"
disable_flag: "no_wasm_source_url_support"
---

When you enable the `wasm_source_url_support` compatibility flag, stack traces name each
[WebAssembly](/workers/runtime-apis/webassembly/) module in your Worker after its module name.
For example, a frame in a module named `index_bg.wasm` reads:

```txt
at index_bg.wasm:wasm-function[42]:0x1a2b
```

Without this flag, the runtime names each WebAssembly module after a hash of its bytes, so you
cannot tell which module a frame comes from:

```txt
at wasm://wasm/0543fef2:wasm-function[42]:0x1a2b
```

If you parse stack traces, for example in a [Tail Worker](/workers/observability/logs/tail-workers/)
or an error-tracking integration, update any patterns that match `wasm://wasm/`.

Some modules keep the hash name even with this flag:

- Modules compiled at runtime, for example with `WebAssembly.compile()` or
  `new WebAssembly.Module()`.
- WebAssembly bindings in Workers written in the service worker syntax.

A Worker created with the [Worker Loader](/workers/runtime-apis/bindings/worker-loader/) follows
its own compatibility flags. This includes a compiled `WebAssembly.Module` that its parent Worker
passes to it.
