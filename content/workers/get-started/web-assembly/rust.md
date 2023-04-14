---
title: Rust
pcx_content_type: rust-wasm-guide
weight: 1
meta:
  title: Rust WebAssembly guide
---

# Rust WebAssembly Guide

This guide will show how to get started with using Rust to build WebAssembly Workers. There are many configurations that can be used to produce WASM binaries which are compatible with Workers, but this guide will focus on using [`workers-rs`](https://github.com/cloudflare/workers-rs), which provides the most fully-featured experience. 

This guide assumes that you have the following installed:
* A recent version of [`Rust`](https://rustup.rs/) 
* [`Wrangler`](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler)
* The Rust `wasm32-unknown-unknown` toolchain:

```sh
$ rustup target add wasm32-unknown-unknown
```

## 1. Create a new project with Wrangler

Use `wrangler generate` to create a new project from Cloudflare's `workers-rs` template.

```sh
$ wrangler generate hello-world-rust https://github.com/cloudflare/workers-sdk/templates/experimental/worker-rust
```

Your project will be created in a new directory (`hello-world-rust`), to view its files:

```sh
$ cd hello-world-rust
```

Here you will find the following files and folders:

* `Cargo.toml` - The standard project configuration file for Rust's [`Cargo`](https://doc.rust-lang.org/cargo/) package manager. Our template pre-populates some best-practice settings for building for WASM on Workers.
* `README.md` - Boilerplate readme for working with the template project.
* `package.json` - NPM configuration for the template project which specifies useful commands (`dev` and `deploy`), and Wrangler as a dev-dependency.
* `wrangler.toml` - Wrangler configuration, pre-populated with custom build command to invoke `worker-build` (See [bundling](/workers/get-started/web-assembly/rust/#bundling-web-pack)).
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

1. `workers-rs` provides an `event` macro, which expects a handler function signature identical to those seen in JavaScript Workers. 
1. `async` is not generally supported by WASM, but you are able to use `async` in a `workers-rs` project (see [`async`](/workers/get-started/web-assembly/rust/#async-wasm-bindgen-futures)). 
{{</Aside>}}

### Runtime API

`workers-rs` provides a a runtime API which closely matches Worker's JavaScript API, and enables integration with Worker's platform features. For detailed documentation of the API, see [`docs.rs/worker`](https://docs.rs/worker/latest/worker/).

#### `event` Macro

This macro allows you to easily define entrypoints to your Worker. It supports the following events:

* `fetch` - Invoked by an incomming HTTP request.
* `scheduled` - Invoked by [`Cron Triggers`](/workers/platform/triggers/cron-triggers/).
* `queue` - Invoked by incomming message batches from [Queues](/queues/) (Requires `queue` feature in `Cargo.toml`, see [example](https://github.com/cloudflare/workers-rs#queues)).
* `start` - Invoked when the Worker is first launched (such as to install panic hooks).

#### `fetch` Parameters

The `fetch` handler provides three arguments which match the JavaScript API:

**`Request`**


**[`Env`](https://docs.rs/worker/latest/worker/struct.Env.html)**

Provides access to Worker [Bindings](https://developers.cloudflare.com/workers/platform/bindings/). 

* [`Secret`](https://github.com/cloudflare/workers-rs/blob/e15f88110d814c2d7759b2368df688433f807694/worker/src/env.rs#L92) - Secret value configured in Cloudflare Dashboard or using `wrangler secret put`.
* [`Var`](https://github.com/cloudflare/workers-rs/blob/e15f88110d814c2d7759b2368df688433f807694/worker/src/env.rs#L92) - Environment variable defined in `wrangler.toml`.
* [`KvStore`](https://docs.rs/worker-kv/latest/worker_kv/struct.KvStore.html) - Workers [KV](https://developers.cloudflare.com/workers/runtime-apis/kv/) namespace binding.
* [`ObjectNamespace`](https://docs.rs/worker/latest/worker/durable/struct.ObjectNamespace.html) - [Durable Object](/workers/runtime-apis/durable-objects/#durable-objects) namespace binding.
* [`Fetcher`](https://docs.rs/worker/latest/worker/struct.Fetcher.html) - [Service Binding](/workers/runtime-apis/service-bindings/) to another Worker.
* [`Bucket`](https://docs.rs/worker/latest/worker/struct.Bucket.html) - [R2](/r2/) Bucket binding.

**[`Context`](https://docs.rs/worker/latest/worker/struct.Context.html)**

Provides access to [`waitUntil`](/workers/runtime-apis/fetch-event/#waituntil) (deferred async tasks) and [`passThroughOnException`](/workers/runtime-apis/fetch-event/#passthroughonexception) (fail open) functionality.

#### [`Response`](https://docs.rs/worker/latest/worker/struct.Response.html)

The `fetch` handler expects a Response return type. 

#### [`Router`](https://docs.rs/worker/latest/worker/struct.Router.html)

Implements convenient routing API to serve multiple paths from one Worker, see [example](https://github.com/cloudflare/workers-rs#or-use-the-router).

## 4. Publish

## How this works
### JavaScript Plumbing (wasm-bindgen)

wasm-bindgen-futures


### Async (wasm-bindgen-futures)

### Binary Size (wasm-opt)

[`wasm-opt`](https://github.com/brson/wasm-opt-rs)


```toml
[profile.release]
lto = true
strip = true
codegen-units = 1
```

### Bundling (worker-build)


web-pack
[`JavaScript Interoprability`](/workers/get-started/web-assembly/#invoking-from-javascript)

(workers-build)

## Useful Links

* [Rust WASM Book](https://rustwasm.github.io/book/introduction.html)