---
title: Rust
pcx_content_type: rust-wasm-guide
weight: 2
meta:
  title: Rust WebAssembly guide
---

# Rust WebAssembly Guide

This guide demonstrates how to build a Worker entirely in the Rust programming language, using the `workers-rs` crate, which which makes [Runtime APIs](/workers/runtime-apis) and [bindings](/workers/platform/bindings/) like Workers KV, R2, and Queues available directly from your Rust code.

## Prerequisites

* A recent version of [`Rust`](https://rustup.rs/) 
* [`npm`](https://docs.npmjs.com/getting-started)
* The Rust `wasm32-unknown-unknown` toolchain:

```sh
$ rustup target add wasm32-unknown-unknown
```

## 1. Create a new project with Wrangler

Use `wrangler generate` to create a new project from Cloudflare's `workers-rs` template.

```sh
$ npx wrangler generate hello-world-rust https://github.com/cloudflare/workers-sdk/templates/experimental/worker-rust
```

Your project will be created in a new directory (`hello-world-rust`), to view its files:

```sh
$ cd hello-world-rust
```

Here you will find the following files and folders:

* `Cargo.toml` - The standard project configuration file for Rust's [`Cargo`](https://doc.rust-lang.org/cargo/) package manager. The template pre-populates some best-practice settings for building for Wasm on Workers.
* `README.md` - Boilerplate readme for working with the template project.
* `package.json` - NPM configuration for the template project which specifies useful commands (`dev` and `deploy`), and [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) as a dev-dependency.
* `wrangler.toml` - Wrangler configuration, pre-populated with a custom build command to invoke `worker-build` (See [bundling](/workers/platform/web-assembly/rust/#bundling-worker-build)).
* `src` - Rust source directory, pre-populated with simple "Hello World" Worker.

## 2. Develop Locally

After you have created your first Worker, run the [`wrangler dev`](/workers/wrangler/commands/#dev) command to start a local server for developing your Worker. This will allow you to test your Worker in development. 

```sh
$ npx wrangler dev
```

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.
{{<Aside type="note">}}

If you have issues with this step or you do not have access to a browser interface, refer to the [`wrangler login`](/workers/wrangler/commands/#login) documentation for more information.
{{</Aside>}}

You will now be able to go to [http://localhost:8787](http://localhost:8787) to see your Worker running. Any changes you make to your code will trigger a rebuild, and reloading the page will show you the up-to-date output of your Worker.

## 3. Make Changes

With your new project generated, you can begin to write your code. You will find the entrypoint to your worker in `src/lib.rs`:

```rust
use worker::*;

#[event(fetch)]
async fn main(req: Request, env: Env, ctx: Context) -> Result<Response> {
    Response::ok("Hello, World!")
}
```

{{<Aside type="note">}}

There is some magic going on here:

1. `workers-rs` provides an `event` macro which expects a handler function signature identical to those seen in JavaScript Workers. 
1. `async` is not generally supported by Wasm, but you are able to use `async` in a `workers-rs` project (see [`async`](/workers/platform/web-assembly/rust/#async-wasm-bindgen-futures)). 
{{</Aside>}}

### Runtime API Tour

`workers-rs` provides a a runtime API which closely matches Worker's JavaScript API, and enables integration with Worker's platform features. For detailed documentation of the API, see [`docs.rs/worker`](https://docs.rs/worker/latest/worker/).

#### `event` Macro

This macro allows you to easily define entrypoints to your Worker. It supports the following events:

* `fetch` - Invoked by an incoming HTTP request.
* `scheduled` - Invoked by [`Cron Triggers`](/workers/platform/triggers/cron-triggers/).
* `queue` - Invoked by incoming message batches from [Queues](/queues/) (Requires `queue` feature in `Cargo.toml`, see [example](https://github.com/cloudflare/workers-rs#queues)).
* `start` - Invoked when the Worker is first launched (such as to install panic hooks).

#### `fetch` Parameters

The `fetch` handler provides three arguments which match the JavaScript API:

**[`Request`](https://docs.rs/worker/latest/worker/struct.Request.html)**

An object representing the incoming request. This includes methods for accessing headers, method, path, Cloudflare properties, and body (with support for asynchronous streaming and JSON deserialization with [Serde](https://serde.rs/)).

**[`Env`](https://docs.rs/worker/latest/worker/struct.Env.html)**

Provides access to Worker [Bindings](https://developers.cloudflare.com/workers/platform/bindings/). 

* [`Secret`](https://github.com/cloudflare/workers-rs/blob/e15f88110d814c2d7759b2368df688433f807694/worker/src/env.rs#L92) - Secret value configured in Cloudflare Dashboard or using `wrangler secret put`.
* [`Var`](https://github.com/cloudflare/workers-rs/blob/e15f88110d814c2d7759b2368df688433f807694/worker/src/env.rs#L92) - Environment variable defined in `wrangler.toml`.
* [`KvStore`](https://docs.rs/worker-kv/latest/worker_kv/struct.KvStore.html) - Workers [KV](https://developers.cloudflare.com/workers/runtime-apis/kv/) namespace binding.
* [`ObjectNamespace`](https://docs.rs/worker/latest/worker/durable/struct.ObjectNamespace.html) - [Durable Object](/workers/runtime-apis/durable-objects/#durable-objects) namespace binding.
* [`Fetcher`](https://docs.rs/worker/latest/worker/struct.Fetcher.html) - [Service Binding](/workers/runtime-apis/service-bindings/) to another Worker.
* [`Bucket`](https://docs.rs/worker/latest/worker/struct.Bucket.html) - [R2](/r2/) Bucket binding.

**[`Context`](https://docs.rs/worker/latest/worker/struct.Context.html)**

Provides access to [`waitUntil`](/workers/runtime-apis/fetch-event/#waituntil) (deferred asynchronous tasks) and [`passThroughOnException`](/workers/runtime-apis/fetch-event/#passthroughonexception) (fail open) functionality.

#### [`Response`](https://docs.rs/worker/latest/worker/struct.Response.html)

The `fetch` handler expects a `Response` return type, which includes support for streaming responses to the client asynchronously. This is also the return type of any subrequests made from your Worker. There
are methods for accessing status code and headers, as well as streaming the body asynchronously or deserializing from JSON using
[Serde](https://serde.rs/).

#### [`Router`](https://docs.rs/worker/latest/worker/struct.Router.html)

Implements convenient routing API to serve multiple paths from one Worker, see [example](https://github.com/cloudflare/workers-rs#or-use-the-router).

## 4. Publish

With your project configured, you can now publish your Worker, to a `*.workers.dev` subdomain, or a [custom domain](/workers/platform/triggers/custom-domains/), if you have one configured. If you have not configured any subdomain or domain, Wrangler will prompt you during the publish process to set one up.

```sh
$ npx wrangler publish
```

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

{{<Aside type="note" header="Note">}}

When pushing to your `*.workers.dev` subdomain for the first time, you may see [`523` errors](https://support.cloudflare.com/hc/articles/115003011431#523error) while DNS is propagating. These errors should resolve themselves after a minute or so.

{{</Aside>}}


## How This Works

Wasm Workers are invoked from a JavaScript entrypoint script which is created automatically for you when using `workers-rs`. 

### JavaScript Plumbing (`wasm-bindgen`)

To access platform features such as bindings, Wasm Workers must be able to access methods from the JavaScript runtime API. 
This interoperability is achieved using [`wasm-bindgen`](https://rustwasm.github.io/wasm-bindgen/), which provides the glue code needed to import runtime APIs to, and export event handlers from, the Wasm module. `wasm-bindgen` also provides [`js-sys`](https://docs.rs/js-sys/latest/js_sys/),
which implements types for interacting with JavaScript objects. In practice, this is an implementation detail, as `workers-rs`'s API handles conversion to and from JavaScript objects, and interaction with imported JavaScript runtime APIs for you.

### Async (`wasm-bindgen-futures`)

[`wasm-bindgen-futures`](https://rustwasm.github.io/wasm-bindgen/api/wasm_bindgen_futures/) (part of the `wasm-bindgen` project) provides interoperability between Rust
Futures and JavaScript Promises. `workers-rs` invokes the entire event handler function using `spawn_local`, meaning that you can program using async Rust, which is turned
into a single JavaScript Promise and run on the JavaScript event loop. Calls to imported JavaScript runtime APIs are automatically converted to Rust Futures that can be easily invoked from async Rust functions.

### Bundling (`worker-build`)

To run the resulting Wasm binary on Workers, `workers-rs` includes a build tool called [`worker-build`](https://github.com/cloudflare/workers-rs/tree/main/worker-build) which: 

1. Creates a JavaScript entrypoint script that properly invokes the module using `wasm-bindgen`'s JavaScript API.  
2. Invokes `web-pack` to minify and bundle the JavaScript code.
3. Outputs a directory structure that Wrangler can use to bundle and publish the final worker.

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

## Resources

* [Rust Wasm Book](https://rustwasm.github.io/book/introduction.html)