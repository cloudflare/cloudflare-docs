---
updated: 2021-07-28
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Use Workers KV directly from Rust
layout: single
---

# Use Workers KV directly from Rust

{{<render file="_tutorials-wrangler-v1-warning.md">}}

In this tutorial, you will learn how to read and write to Workers KV directly from Rust, by using `wasm_bindgen` and a simple custom wrapper around the JS Workers KV API.

{{<render file="_tutorials-before-you-start.md">}}

## Basic project scaffolding

To get started:

1.  Run the `git clone` command to create a basic project using the [rustwasm-worker template](https://github.com/cloudflare/rustwasm-worker-template/).
2.  After running the `git clone` command, `cd` into the new project.
3.  Use the current state of the git repository as the initial commit by running the `git add` and `git commit` commands in your terminal.

```sh
$ git clone https://github.com/cloudflare/rustwasm-worker-template/ workers-kv-from-rust
$ cd workers-kv-from-rust
$ git add -A
$ git commit -m 'Initial commit'
```

## Create and bind a KV namespace

To be able to access Workers KV, define a binding for a particular KV namespace in the `wrangler.toml` file generated in your new project's directory. If you do not have an existing namespace, create one using `wrangler`. For example, a namespace called `KV_FROM_RUST` would be created by running:

```sh
$ wrangler kv:namespace create "KV_FROM_RUST"
🌀  Creating namespace with title "workers-kv-from-rust-KV_FROM_RUST"
✨  Success!
Add the following to your configuration file:
kv_namespaces = [
	 { binding = "KV_FROM_RUST", id = "6257d3ebe5d948cda9e59aae1f9a7f1a" }
]
```

Create a preview ID to use the namespace with `wrangler preview`:

```sh
wrangler kv:namespace create "KV_FROM_RUST" --preview
🌀  Creating namespace with title "workers-kv-from-rust-KV_FROM_RUST_preview"
✨  Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "KV_FROM_RUST", preview_id = "5c0f32f95cb94819b8c553b470791efd", id = "6257d3ebe5d948cda9e59aae1f9a7f1a" }
```

Add this binding to the `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---
name = "workers-kv-from-rust"
type = "rust"

account_id = ""
workers_dev = true
route = ""
zone_id = ""

kv_namespaces = [
  { binding = "KV_FROM_RUST", preview_id = "5c0f32f95cb94819b8c553b470791efd", id = "6257d3ebe5d948cda9e59aae1f9a7f1a" }
]
```

## Pass the KV namespace object to Rust

You can now access this KV namespace as the variable `KV_FROM_RUST` in JavaScript. To read or write from the namespace in Rust, you need to pass the whole object to the Rust handler function:

```js
---
filename: worker/worker.js
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const { handle } = wasm_bindgen;
const instance = wasm_bindgen(wasm);

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  await instance;

  return await handle(KV_FROM_RUST, request);
}
```

Note that the signature of your Rust handler differs from the template, which merely returns a `String` from Rust and keeps the request and response handling purely on the JavaScript side. This tutorial will try to do as much as possible in Rust and pass the request directly to the wasm handler, which will then construct and return a response.

To do this, declare `web-sys` as one of your Rust dependencies and explicitly enable the `Request`, `Response` and `ResponseInit` features (the `Url` and `UrlSearchParams` features will be used later in this tutorial):

```toml
---
filename: Cargo.toml
---
[dependencies.web-sys]
version = "0.3"
features = [
    'Request',
    'Response',
    'ResponseInit',
    'Url',
    'UrlSearchParams',
]
```

You can now use `Request` and `Response` in Rust to create a very simple handler that completely ignores the request and always responds with a `200 OK` status:

```rust
---
filename: src/lib.rs
---
extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::{JsCast, prelude::*};
use web_sys::{Request, Response, ResponseInit};

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub fn handle(kv: JsValue, req: JsValue) -> Result<Response, JsValue> {
    let req: Request = req.dyn_into()?;
    let mut init = ResponseInit::new();
    init.status(200);
    Response::new_with_opt_str_and_init(None, &init)
}
```

## Bind to KV using `wasm_bindgen`

You are now ready to create a type binding using `wasm_bindgen` to access the KV object. Since the KV API returns JavaScript promises, you must first add `wasm-bindgen-futures` and `js-sys` as dependencies:

```toml
---
filename: Cargo.toml
---
[dependencies]
cfg-if = "0.1.2"
wasm-bindgen = "=0.2.73"
wasm-bindgen-futures = "0.4"
js-sys = "0.3"
```

Add the wrapper and change the type of the `kv` argument of your handler accordingly:

```rust
---
filename: src/lib.rs
---
#[wasm_bindgen]
pub fn handle(kv: WorkersKvJs, req: JsValue) -> Result<Response, JsValue> {
    let req: Request = req.dyn_into()?;
    let mut init = ResponseInit::new();
    init.status(200);
    Response::new_with_opt_str_and_init(None, &init)
}

#[wasm_bindgen]
extern "C" {
    pub type WorkersKvJs;

    #[wasm_bindgen(structural, method, catch)]
    pub async fn put(
        this: &WorkersKvJs,
        k: JsValue,
        v: JsValue,
        options: JsValue,
    ) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(structural, method, catch)]
    pub async fn get(
        this: &WorkersKvJs,
        key: JsValue,
        options: JsValue,
    ) -> Result<JsValue, JsValue>;
}
```

## Create a wrapper around KV

You could start using the `kv` parameter as is, but the function signatures generated by `wasm_bindgen` can be difficult to work within Rust. For an easier experience, create a simple struct around the `WorkersKvJs` type that wraps it with a more Rust-friendly API:

```rust
---
filename: src/lib.rs
---
use js_sys::{ArrayBuffer, Object, Reflect, Uint8Array};

struct WorkersKv {
    kv: WorkersKvJs,
}

impl WorkersKv {
    async fn put_text(&self, key: &str, value: &str, expiration_ttl: u64) -> Result<(), JsValue> {
        let options = Object::new();
        Reflect::set(&options, &"expirationTtl".into(), &(expiration_ttl as f64).into())?;
        self.kv
            .put(JsValue::from_str(key), value.into(), options.into())
            .await?;
        Ok(())
    }

    async fn put_vec(&self, key: &str, value: &[u8], expiration_ttl: u64) -> Result<(), JsValue> {
        let options = Object::new();
        Reflect::set(&options, &"expirationTtl".into(), &(expiration_ttl as f64).into())?;
        let typed_array = Uint8Array::new_with_length(value.len() as u32);
        typed_array.copy_from(value);
        self.kv
            .put(
                JsValue::from_str(key),
                typed_array.buffer().into(),
                options.into(),
            )
            .await?;
        Ok(())
    }

    async fn get_text(&self, key: &str) -> Result<Option<String>, JsValue> {
        let options = Object::new();
        Reflect::set(&options, &"type".into(), &"text".into())?;
        Ok(self
            .kv
            .get(JsValue::from_str(key), options.into())
            .await?
            .as_string())
    }

    async fn get_vec(&self, key: &str) -> Result<Option<Vec<u8>>, JsValue> {
        let options = Object::new();
        Reflect::set(&options, &"type".into(), &"arrayBuffer".into())?;
        let value = self.kv.get(JsValue::from_str(key), options.into()).await?;
        if value.is_null() {
            Ok(None)
        } else {
            let buffer = ArrayBuffer::from(value);
            let typed_array = Uint8Array::new_with_byte_offset(&buffer, 0);
            let mut v = vec![0; typed_array.length() as usize];
            typed_array.copy_to(v.as_mut_slice());
            Ok(Some(v))
        }
    }
}
```

The above wrapper only exposes a subset of the options supported by the KV API, other options such as `expiration` instead of `expirationTtl` for `PUT` and other types than `text` and `arrayBuffer` for `GET` could be wrapped in a similar fashion. Conceptually, the wrapper methods all manually construct a JavaScript object using `Reflect::set` and then convert the return value into a standard Rust type where necessary.

## Using the wrapper

You are now ready to use the wrapper to read and write values to and from your KV namespace.

The following function is an example handler that writes to KV on a `PUT` request, using the URL segments to determine the KV document's key name and value. For example, sending a `PUT` request to `/foo?value=bar` will write the `"bar"` value to the `foo` key.

Additionally, the example handler will read from KV when on `GET` requests, using the URL pathname as the key name. For example, a `GET /foo` request will return the `foo` key's value, if any.

{{<Aside type="note" header="Important changes">}}

When compared to the `handle` function from the previous snippet, be aware of these important changes:

1.  The `handle` function is asynchronous.
2.  The `Url` and `UrlSearchParams` features are in use – they must be declared in the `Cargo.toml` feature set.

{{</Aside>}}

The finalized `handle` function:

```rust
---
filename: src/lib.rs
---
#[wasm_bindgen]
pub async fn handle(kv: WorkersKvJs, req: JsValue) -> Result<Response, JsValue> {
    let req: Request = req.dyn_into()?;
    let url = web_sys::Url::new(&req.url())?;
    let pathname = url.pathname();
    let query_params = url.search_params();
    let kv = WorkersKv { kv };
    match req.method().as_str() {
        "GET" => {
            let value = kv.get_text(&pathname).await?.unwrap_or_default();
            let mut init = ResponseInit::new();
            init.status(200);
            Response::new_with_opt_str_and_init(Some(&format!("\"{}\"\n", value)), &init)
        },
        "PUT" => {
            let value = query_params.get("value").unwrap_or_default();
            // set a TTL of 60 seconds:
            kv.put_text(&pathname, &value, 60).await?;
            let mut init = ResponseInit::new();
            init.status(200);
            Response::new_with_opt_str_and_init(None, &init)
        },
        _ => {
            let mut init = ResponseInit::new();
            init.status(400);
            Response::new_with_opt_str_and_init(None, &init)
        }
    }
}
```

You can use [`wrangler dev`](/workers/wrangler/commands/#dev) to test the Worker:

```sh
$ curl 'localhost:8787/foo'
""
$ curl -X PUT 'localhost:8787/foo?value=bar'
$ curl 'localhost:8787/foo'
"bar"
```

## Conclusion

With all previous steps complete, the final `lib.rs` should look as follows (you can also find the full code as an example repository at <https://github.com/fkettelhoit/workers-kv-from-rust>):

```rust
---
filename: src/lib.rs
---
extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use cfg_if::cfg_if;
use js_sys::{ArrayBuffer, Object, Reflect, Uint8Array};
use wasm_bindgen::{prelude::*, JsCast};
use web_sys::{Request, Response, ResponseInit};

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub async fn handle(kv: WorkersKvJs, req: JsValue) -> Result<Response, JsValue> {
    let req: Request = req.dyn_into()?;
    let url = web_sys::Url::new(&req.url())?;
    let pathname = url.pathname();
    let query_params = url.search_params();
    let kv = WorkersKv { kv };
    match req.method().as_str() {
        "GET" => {
            let value = kv.get_text(&pathname).await?.unwrap_or_default();
            let mut init = ResponseInit::new();
            init.status(200);
            Response::new_with_opt_str_and_init(Some(&format!("\"{}\"\n", value)), &init)
        }
        "PUT" => {
            let value = query_params.get("value").unwrap_or_default();
            // set a TTL of 60 seconds:
            kv.put_text(&pathname, &value, 60).await?;
            let mut init = ResponseInit::new();
            init.status(200);
            Response::new_with_opt_str_and_init(None, &init)
        }
        _ => {
            let mut init = ResponseInit::new();
            init.status(400);
            Response::new_with_opt_str_and_init(None, &init)
        }
    }
}

#[wasm_bindgen]
extern "C" {
    pub type WorkersKvJs;

    #[wasm_bindgen(structural, method, catch)]
    pub async fn put(
        this: &WorkersKvJs,
        k: JsValue,
        v: JsValue,
        options: JsValue,
    ) -> Result<JsValue, JsValue>;

    #[wasm_bindgen(structural, method, catch)]
    pub async fn get(
        this: &WorkersKvJs,
        key: JsValue,
        options: JsValue,
    ) -> Result<JsValue, JsValue>;
}

struct WorkersKv {
    kv: WorkersKvJs,
}

impl WorkersKv {
    async fn put_text(&self, key: &str, value: &str, expiration_ttl: u64) -> Result<(), JsValue> {
        let options = Object::new();
        Reflect::set(&options, &"expirationTtl".into(), &(expiration_ttl as f64).into())?;
        self.kv
            .put(JsValue::from_str(key), value.into(), options.into())
            .await?;
        Ok(())
    }

    async fn put_vec(&self, key: &str, value: &[u8], expiration_ttl: u64) -> Result<(), JsValue> {
        let options = Object::new();
        Reflect::set(&options, &"expirationTtl".into(), &(expiration_ttl as f64).into())?;
        let typed_array = Uint8Array::new_with_length(value.len() as u32);
        typed_array.copy_from(value);
        self.kv
            .put(
                JsValue::from_str(key),
                typed_array.buffer().into(),
                options.into(),
            )
            .await?;
        Ok(())
    }

    async fn get_text(&self, key: &str) -> Result<Option<String>, JsValue> {
        let options = Object::new();
        Reflect::set(&options, &"type".into(), &"text".into())?;
        Ok(self
            .kv
            .get(JsValue::from_str(key), options.into())
            .await?
            .as_string())
    }

    async fn get_vec(&self, key: &str) -> Result<Option<Vec<u8>>, JsValue> {
        let options = Object::new();
        Reflect::set(&options, &"type".into(), &"arrayBuffer".into())?;
        let value = self.kv.get(JsValue::from_str(key), options.into()).await?;
        if value.is_null() {
            Ok(None)
        } else {
            let buffer = ArrayBuffer::from(value);
            let typed_array = Uint8Array::new_with_byte_offset(&buffer, 0);
            let mut v = vec![0; typed_array.length() as usize];
            typed_array.copy_to(v.as_mut_slice());
            Ok(Some(v))
        }
    }
}
```
