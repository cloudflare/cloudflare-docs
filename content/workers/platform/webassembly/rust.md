---
title: Rust
pcx_content_type: tutorial
weight: 2
meta:
  title: Rust WebAssembly guide
---

# Rust WebAssembly guide

By following this guide, you will learn how to build a Worker entirely in the Rust programming language. You will accomplish this using the `workers-rs` crate, which makes [Runtime APIs](/workers/runtime-apis) and [bindings](/workers/platform/bindings/) to developer platform products, such as [Workers KV](/workers/learning/how-kv-works/), [R2](/r2/), and [Queues](/queues/), available directly from your Rust code.

## Prerequisites

Before starting this guide, make sure you have:

* A recent version of [`Rust`](https://rustup.rs/) 
* [`npm`](https://docs.npmjs.com/getting-started)
* The Rust `wasm32-unknown-unknown` toolchain:

```sh
$ rustup target add wasm32-unknown-unknown
```

## 1. Create a new project with Wrangler

Use [`wrangler generate`](/workers/wrangler/commands/#generate) to create a new project from Cloudflare's `workers-rs` template.

```sh
$ npx wrangler generate hello-world-rust https://github.com/cloudflare/workers-sdk/templates/experimental/worker-rust
```

Your project will be created in a new directory (`hello-world-rust`). To view the new directory's files:

```sh
$ cd hello-world-rust
```

You will find the following files and folders in the `hello-world-rust` directory:

* `Cargo.toml` - The standard project configuration file for Rust's [`Cargo`](https://doc.rust-lang.org/cargo/) package manager. The template pre-populates some best-practice settings for building for Wasm on Workers.
* `README.md` - Boilerplate readme for working with the template project.
* `package.json` - NPM configuration for the template project which specifies useful commands (`dev` and `deploy`), and [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) as a dev-dependency.
* `wrangler.toml` - Wrangler configuration, pre-populated with a custom build command to invoke `worker-build` (Refer to [Wrangler Bundling](/workers/platform/webassembly/rust/#bundling-worker-build)).
* `src` - Rust source directory, pre-populated with simple Hello World Worker.

## 2. Develop locally

After you have created your first Worker, run the [`wrangler dev`](/workers/wrangler/commands/#dev) command to start a local server for developing your Worker. This will allow you to test your Worker in development. 

```sh
$ npx wrangler dev
```

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.
{{<Aside type="note">}}

If you have issues with this step or you do not have access to a browser interface, refer to the [`wrangler login`](/workers/wrangler/commands/#login) documentation for more information.
{{</Aside>}}

Go to [http://localhost:8787](http://localhost:8787) to review your Worker running. Any changes you make to your code will trigger a rebuild, and reloading the page will show you the up-to-date output of your Worker.

## 3. Write your Worker code

With your new project generated, write your Worker code. Find the entrypoint to your Worker in `src/lib.rs`:

```rust
use worker::*;

#[event(fetch)]
async fn main(req: Request, env: Env, ctx: Context) -> Result<Response> {
    Response::ok("Hello, World!")
}
```

{{<Aside type="note">}}

There is some counterintuitive behavior going on here:

1. `workers-rs` provides an `event` macro which expects a handler function signature identical to those seen in JavaScript Workers. 
1. `async` is not generally supported by Wasm, but you are able to use `async` in a `workers-rs` project (refer to [`async`](/workers/platform/webassembly/rust/#async-wasm-bindgen-futures)). 
{{</Aside>}}

### Related runtime APIs

`workers-rs` provides a runtime API which closely matches Worker's JavaScript API, and enables integration with Worker's platform features. For detailed documentation of the API, refer to [`docs.rs/worker`](https://docs.rs/worker/latest/worker/).

#### `event` macro

This macro allows you to easily define entrypoints to your Worker. The `event` macro supports the following events:

* `fetch` - Invoked by an incoming HTTP request.
* `scheduled` - Invoked by [`Cron Triggers`](/workers/platform/triggers/cron-triggers/).
* `queue` - Invoked by incoming message batches from [Queues](/queues/) (Requires `queue` feature in `Cargo.toml`, refer to the [`workers-rs` GitHub repository and `queues` feature flag](https://github.com/cloudflare/workers-rs#queues)).
* `start` - Invoked when the Worker is first launched (such as, to install panic hooks).

#### `fetch` parameters

The `fetch` handler provides three arguments which match the JavaScript API:

1. **[`Request`](https://docs.rs/worker/latest/worker/struct.Request.html)**

An object representing the incoming request. This includes methods for accessing headers, method, path, Cloudflare properties, and body (with support for asynchronous streaming and JSON deserialization with [Serde](https://serde.rs/)).

2. **[`Env`](https://docs.rs/worker/latest/worker/struct.Env.html)**

Provides access to Worker [bindings](https://developers.cloudflare.com/workers/platform/bindings/). 

* [`Secret`](https://github.com/cloudflare/workers-rs/blob/e15f88110d814c2d7759b2368df688433f807694/worker/src/env.rs#L92) - Secret value configured in Cloudflare dashboard or using `wrangler secret put`.
* [`Var`](https://github.com/cloudflare/workers-rs/blob/e15f88110d814c2d7759b2368df688433f807694/worker/src/env.rs#L92) - Environment variable defined in `wrangler.toml`.
* [`KvStore`](https://docs.rs/worker-kv/latest/worker_kv/struct.KvStore.html) - Workers [KV](/workers/runtime-apis/kv/) namespace binding.
* [`ObjectNamespace`](https://docs.rs/worker/latest/worker/durable/struct.ObjectNamespace.html) - [Durable Object](/workers/runtime-apis/durable-objects/#durable-objects) namespace binding.
* [`Fetcher`](https://docs.rs/worker/latest/worker/struct.Fetcher.html) - [Service binding](/workers/runtime-apis/service-bindings/) to another Worker.
* [`Bucket`](https://docs.rs/worker/latest/worker/struct.Bucket.html) - [R2](/r2/) Bucket binding.

3. **[`Context`](https://docs.rs/worker/latest/worker/struct.Context.html)**

Provides access to [`waitUntil`](/workers/runtime-apis/fetch-event/#waituntil) (deferred asynchronous tasks) and [`passThroughOnException`](/workers/runtime-apis/fetch-event/#passthroughonexception) (fail open) functionality.

#### [`Response`](https://docs.rs/worker/latest/worker/struct.Response.html)

The `fetch` handler expects a [`Response`](https://docs.rs/worker/latest/worker/struct.Response.html) return type, which includes support for streaming responses to the client asynchronously. This is also the return type of any subrequests made from your Worker. There are methods for accessing status code and headers, as well as streaming the body asynchronously or deserializing from JSON using [Serde](https://serde.rs/).

#### `Router`

Implements convenient [routing API](https://docs.rs/worker/latest/worker/struct.Router.html) to serve multiple paths from one Worker. Refer to the [`Router` example in the `worker-rs` GitHub repository](https://github.com/cloudflare/workers-rs#or-use-the-router).

## 4. Publish your Worker project

With your project configured, you can now deploy your Worker, to a *.workers.dev subdomain, or a [custom domain](https://developers.cloudflare.com/workers/platform/triggers/custom-domains/), if you have one configured. If you have not configured any subdomain or domain, Wrangler will prompt you during the publish process to set one up.

```sh
$ npx wrangler publish
```

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

{{<Aside type="note">}}

When pushing to your `*.workers.dev` subdomain for the first time, you may see [`523` errors](https://support.cloudflare.com/hc/articles/115003011431#523error) while DNS is propagating. These errors should resolve themselves after a minute or so.

{{</Aside>}}

After completing these steps, you will have a basic Rust-based Worker deployed. From here, you can add crate
dependencies and write code in Rust to implement your Worker application. If you would like to know more about the inner workings of how Rust compiled to Wasm is supported by Workers, the next section outlines the libraries and tools involved.

## How this deployment works

Wasm Workers are invoked from a JavaScript entrypoint script which is created automatically for you when using `workers-rs`. 

### JavaScript Plumbing (`wasm-bindgen`)

To access platform features such as bindings, Wasm Workers must be able to access methods from the JavaScript runtime API. 

This interoperability is achieved using [`wasm-bindgen`](https://rustwasm.github.io/wasm-bindgen/), which provides the glue code needed to import runtime APIs to, and export event handlers from, the Wasm module. `wasm-bindgen` also provides [`js-sys`](https://docs.rs/js-sys/latest/js_sys/), which implements types for interacting with JavaScript objects. In practice, this is an implementation detail, as `workers-rs`'s API handles conversion to and from JavaScript objects, and interaction with imported JavaScript runtime APIs for you.

{{<Aside type="note">}}
If you are using `wasm-bindgen` without `workers-rs` / `worker-build`, then you will need to patch the JavaScript that it emits. This is because when you import a `wasm` file in Workers, you get a `WebAssembly.Module` instead of a `WebAssembly.Instance` for performance and security reasons.

To patch the JavaScript that `wasm-bindgen` emits:

1. Run `wasm-pack build --target bundler` as you normally would.
2. Patch the JavaScript file that it produces (the following code block assumes the file is called `mywasmlib.js`):
```js
import * as imports from "./mywasmlib_bg.js";
 
// switch between both syntax for node and for workerd
import wkmod from "./mywasmlib_bg.wasm";
import * as nodemod from "./mywasmlib_bg.wasm";
if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
    imports.__wbg_set_wasm(nodemod);
} else {
    const instance = new WebAssembly.Instance(wkmod, { "./mywasmlib_bg.js": imports });
    imports.__wbg_set_wasm(instance.exports);
}
 
export * from "./mywasmlib_bg.js";
```
3. In your Worker entrypoint, import the function and use it directly:
```js
import { myFunction } from "path/to/mylib.js";
```
{{</Aside>}}

### Async (`wasm-bindgen-futures`)

[`wasm-bindgen-futures`](https://rustwasm.github.io/wasm-bindgen/api/wasm_bindgen_futures/) (part of the `wasm-bindgen` project) provides interoperability between Rust
Futures and JavaScript Promises. `workers-rs` invokes the entire event handler function using `spawn_local`, meaning that you can program using async Rust, which is turned
into a single JavaScript Promise and run on the JavaScript event loop. Calls to imported JavaScript runtime APIs are automatically converted to Rust Futures that can be easily invoked from async Rust functions.

### Bundling (`worker-build`)

To run the resulting Wasm binary on Workers, `workers-rs` includes a build tool called [`worker-build`](https://github.com/cloudflare/workers-rs/tree/main/worker-build) which: 

1. Creates a JavaScript entrypoint script that properly invokes the module using `wasm-bindgen`'s JavaScript API.  
2. Invokes `web-pack` to minify and bundle the JavaScript code.
3. Outputs a directory structure that Wrangler can use to bundle and publish the final Worker.

`worker-build` is invoked by default in the template project using a custom build command specified in `wrangler.toml`. 

### Binary Size (`wasm-opt`)

Unoptimized Rust Wasm binaries can be large and may exceed Worker bundle size limits or experience long startup times. The template project pre-configures several useful size optimizations in your `Cargo.toml` file:

```toml
[profile.release]
lto = true
strip = true
codegen-units = 1
```

Finally, `worker-bundle` automatically invokes [`wasm-opt`](https://github.com/brson/wasm-opt-rs) to further optimize binary size before upload.

## Related resources

* [Rust Wasm Book](https://rustwasm.github.io/book/introduction.html)