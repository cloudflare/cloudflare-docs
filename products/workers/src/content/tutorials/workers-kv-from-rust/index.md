---
updated: 2021-07-28
difficulty: Intermediate
content_type: "📝 Tutorial"
pcx-content-type: tutorial
---

import TutorialsBeforeYouStart from "../../_partials/_tutorials-before-you-start.md"

# Use Workers KV directly from Rust

This tutorial will show you how to read and write to Workers KV directly from
Rust, by using `wasm_bindgen` and a simple custom wrapper around the JS Workers
KV API.

## Basic Project Scaffolding

To get started, we will let `wrangler` generate a basic project using the
[rustwasm-worker
template](https://github.com/cloudflare/rustwasm-worker-template/), `cd` into it
and use the current state of the git repository as the initial commit:

```sh
$ wrangler generate workers-kv-from-rust https://github.com/cloudflare/rustwasm-worker-template/
$ cd workers-kv-from-rust
$ git add -A
$ git commit -m 'Initial commit'
```

## Create & bind a KV namespace

To be able to access Workers KV, we need to define a binding for a particular KV
namespace in `wrangler.toml`. If you do not have an existing namespace, you can
quickly create one using wrangler. For example, a namespace called
`KV_FROM_RUST` would be created by running:

```sh
$ wrangler kv:namespace create "KV_FROM_RUST"
🌀  Creating namespace with title "workers-kv-from-rust-KV_FROM_RUST"
✨  Success!
Add the following to your configuration file:
kv_namespaces = [
	 { binding = "KV_FROM_RUST", id = "6257d3ebe5d948cda9e59aae1f9a7f1a" }
]
```

Let's also create a preview id so that we can use the namespace with `wrangler
preview`:

```sh
wrangler kv:namespace create "KV_FROM_RUST" --preview
🌀  Creating namespace with title "workers-kv-from-rust-KV_FROM_RUST_preview"
✨  Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "KV_FROM_RUST", preview_id = "5c0f32f95cb94819b8c553b470791efd", id = "6257d3ebe5d948cda9e59aae1f9a7f1a" }
```

Now add this binding to `wrangler.toml`:

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

We can now access this KV namespace as the variable `KV_FROM_RUST` in JS. To
read or write from the namespace in Rust, we need to pass the whole object to
our Rust handler function:

```js
---
filename: worker/worker.js
---
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  const { handle } = wasm_bindgen;
  await wasm_bindgen(wasm);
  return await handle(KV_FROM_RUST, request);
}
```

Note that the signature of our Rust handler differs from the template, which
merely returns a `String` from Rust and keeps the request and response handling
purely on the JS side. In this tutorial we will try to do as much as possible in
Rust and thus pass the request directly to our wasm handler, which will then
construct and return a response. To do this, we first declare `web-sys` as one
of our Rust dependencies and explicitly enable the `Request`, `Response` and
`ResponseInit` features (the `Url` and `UrlSearchParams` features will be used
later in this tutorial):

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

We can now use `Request` and `Response` in Rust to create a very simple handler
that completely ignores the request and always responds with a `200 OK` status:

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

We are now ready to create a type binding using `wasm_bindgen` to access the KV
object. Since the KV API returns JS promises, we first need to add
`wasm-bindgen-futures` and `js-sys` as dependencies:

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

Now we can add the wrapper and change the type of the `kv` argument of our
handler accordingly:

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

We could start using the `kv` parameter as it is, but the function signatures
generated by `wasm_bindgen` are somewhat cumbersome to work with in Rust. It
thus makes sense to create a simple struct around the `WorkersKvJs` type that
wraps it with a more Rust-friendly API:

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

The above wrapper only exposes a subset of the options supported by the KV API,
other options such as `expiration` instead of `expirationTtl` for put and other
types than `text` and `arrayBuffer` for get could be wrapped in a similar
fashion. Conceptually, the wrapper methods all manually construct a JS object
using `Reflect::set` and then convert the return value into a standard Rust type
where necessary.

## Using the wrapper

We can now finally use the wrapper to get and put values from and to our KV
namespace. The following function is a simple example handler that writes the
key `foo` with the value `bar` to KV if a `PUT` request is made to
`/foo?value=bar` and reads and returns the value of key `foo` from KV if a `GET`
request is made to `/foo` (note that `handle` is now async and that we are using
the `Url` and `UrlSearchParams` features that we declared earlier in
`Cargo.toml`):

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

We can now run `wrangler preview`, `wrangler dev` or `wrangler publish` to test
the worker. Here is an example invocation using `wrangler dev`:

```sh
$ curl 'localhost:8787/foo'
""
$ curl -X PUT 'localhost:8787/foo?value=bar'
$ curl 'localhost:8787/foo'
"bar"
```

## Putting it all together

If you followed all the steps, the final `lib.rs` should look as follows:

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
