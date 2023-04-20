---
title: Wasm in JavaScript
pcx_content_type: javascript-wasm-guide
weight: 1
meta:
  title: Wasm in JavaScript
---

# Invoking Wasm in JavaScript

Wasm can be used from within a Worker written in JavaScript or TypeScript by importing a Wasm module, 
and instantiating an instance of of this module using `[WebAssembly.instantiate()](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiate)`.
This can be used to accelerate computationally intensive operations which do not involve significant I/O.

This guide demonstrates how to invoke a Wasm module
from an existing JavaScript or TypeScript Worker using a simple Wasm binary that
is compiled and used with the JavaScript WebAssembly API, demonstrating the basics of
Wasm and JavaScript interoperability. 

## Simple Wasm Module

In this guide, we will use the WebAssembly Text Format to create a simple Wasm module so that you can
understand how imports and exports work under the hood. In practice, you would not work with this format,
and use the programming language of your choice to compile directly to WebAssembly Binary Format (`.wasm`).

Here is our example module (`;;` denotes a comment):

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

Wrangler will bundle any Wasm module that ends in `.wasm` or `.wasm?module`, so that it is available at runtime within your Worker. 
This is done using a default bundling rule which can be customized in `wrangler.toml`. For more information, see [Bundling](/workers/wrangler/bundling/).


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

If you want to skip JavaScript and write your entire Worker in Rust, Workers provides the same rich runtime API when using the `workers-rs` crate. For more information, see the [Rust guide](/workers/platform/web-assembly/rust/).

