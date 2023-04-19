---
title: Wasm in JavaScript
pcx_content_type: javascript-wasm-guide
weight: 1
meta:
  title: Wasm in JavaScript
---

# Invoking Wasm in JavaScript

Wasm can be used to accelerate existing JavaScript or TypeScript Workers by implementing
computationally intensive operations in Wasm, and invoking them from an existing Worker
using the JavaScript WebAssembly API. This guide demonstrates how to invoke a Wasm module
from an existing JavaScript or TypeScript Worker using a simple Wasm binary that
is compiled and used with the JavaScript WebAssembly API, demonstrating the basics of
Wasm and JavaScript interoperability. 

## Simple Wasm Module

Create a simple Wasm module using the WebAssembly Text Format (`;;` denotes a comment):

```wat
;; src/simple.wat
(module
  ;; Import a function from JavaScript named `imported_func` 
  ;; which takes a single i32 argument and assign to
  ;; variable $i
  (func $i (import "imports" "imported_func") (param i32))
  ;; Export a function named `exported_func` which takes a
  ;; single i32 argument and returns an i32
  (func (export "exported_func") (param $input i32) (return i32)
    ;; Invoke `imported_func` with $input as argument
    local.get $input
    call $i
    ;; Return $input
    local.get $input
    return
  )
)
```

Using [`wat2wasm`](https://github.com/WebAssembly/wabt), convert the WAT format to WebAssembly Binary Format:

```sh
wat2wasm src/simple.wat -o src/simple.wasm
```

## Bundling

Wrangler must know to [bundle](/workers/wrangler/bundling/) the Wasm module with your worker so that it can be imported
in your JavaScript code. Wrangler includes a default bundling rule for Wasm:

```toml
{"type":"CompiledWasm","globs":["**/*.wasm","**/*.wasm?module"]}
```

If you place `simple.wasm` in a path that matches this glob (such as `src/simple.wasm`), then nothing needs to be done to
configure Wrangler to bundle your module!


## Use from JavaScript

Next, import and use the Wasm module in your existing JavaScript Worker (TypeScript in this case):

```typescript
import mod from './simple.wasm'

// Define imports available to Wasm instance.
const importObject = {
  imports: {
    imported_func: (arg: number) => {
      console.log(`Hello from JavaScript: ${arg}`)
    }
  },
};

export default {
  async fetch() {
    // Create instance of WebAssembly Module `mod`, supplying
    // the expected imports in `importObject`
    const instance = await WebAssembly.instantiate(mod, importObject);
    // Invoke the `exported_func` from our Wasm Instance with
    // an argument.
    const retval = instance.exports.exported_func(42);
    // Return the return value!
    return new Response(`Success: ${retval}`);
  }
}
```

When invoked, this Worker should log `Hello from JavaScript: 42` and return `Success: 42`, demonstrating the ability to invoke
Wasm methods with arguments from JavaScript and vice versa.

## Next Steps

In practice, you will likely compile a language of your choice (such as Rust) to WebAssembly binaries. Many languages provide a bindgen to simplify the interaction between JavaScript and Wasm. These tools may integrate with your JavaScript bundler, and provide an API other than
the WebAssembly API for initializing and invoking your Wasm module. As an example, see the [documentation](https://rustwasm.github.io/wasm-bindgen/examples/without-a-bundler.html) for Rust's `wasm-bindgen`.

If you wish to replace your JavaScript worker entirely with Wasm, Workers provides the same rich runtime API when using `workers-rs` in Rust. For more information, see the [Rust guide](/workers/platform/web-assembly/rust/).

