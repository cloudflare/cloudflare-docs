---
updated: 2024-05-15
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Use Workers KV directly from Rust
---

# Use Workers KV directly from Rust

This tutorial will teach you how to read and write to KV directly from Rust
using [workers-rs](https://github.com/cloudflare/workers-rs).

{{<render file="_tutorials-before-you-start.md">}}

## Prerequisites

To complete this tutorial, you will need:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- [Wrangler](https://www.notion.so/Workers-e568dc13453f4c9d9133de54c18e32ea?pvs=21) CLI.
- The [Rust](https://www.rust-lang.org/tools/install) toolchain.
- And `cargo-generate` sub-command by running:

```sh
$ cargo install cargo-generate
```

## 1. Create your Worker project in Rust

Open a terminal window, and run the following command to generate a Worker project template in Rust:

```sh
$ cargo generate cloudflare/workers-rs
```

Then select `template/hello-world-http` template, give your project a descriptive name and hit enter. A new project should be created in your shell directory. You can open up the project in your editor and run `npx wrangler dev` to get it compiled and running.

To explore Workers KV from Rust, let's build an app to store and retrieve cities by a given country name. Let’s go!

## Create a KV namespace

In the terminal, use Wrangler to create a KV namespace for `cities`. This generates a configuration to be added to the project:

```sh
$ npx wrangler kv:namespace create cities
```

To add this configuration to your project, open up the `wrangler.toml` file and create an entry for `kv_namespaces` just above the build command:

```toml
---
filename: wrangler.toml
---
kv_namespaces = [
  { binding = "cities", id = "e29b263ab50e42ce9b637fa8370175e8" }
]

# build command...
```

With this configured, we can access the KV namespace with the binding `"cities"` from Rust.

## Write data to KV

For this app we’ll create two routes. A `POST` route to receive and store the city in KV and a `GET` route to retrieve the city of a given country. For example, a `POST` request to `/France` with a body of `{"city": "Paris"}` should create an entry of Paris as a city in France. Conversely, a `GET` request to `/France` should retrieve from KV and respond with Paris.

Start by installing [Serde](https://serde.rs/) as a project dependency to handle JSON `cargo add serde`. Then create an app router and a struct for `Country` in `src/lib.rs`:

```rust
---
filename: src/lib.rs
highlight: [1,6,8,9,10,11,15,17]
---
use serde::{Deserialize, Serialize};
use worker::*;

#[event(fetch)]
async fn fetch(req: Request, env: Env, _ctx: Context) -> Result<Response> {
    let router = Router::new();

    #[derive(Serialize, Deserialize, Debug)]
    struct Country {
        city: String,
    }

    router
        // TODO:
        .post_async("/:country", |_, _| async move { Response::empty() })
        // TODO:
        .get_async("/:country", |_, _| async move { Response::empty() })
        .run(req, env)
        .await
}

```

For the post handler, we’ll grab the country name from the path and the city name from the request body. Then we’ll save this in KV with the country as key and the city as value. Finally, we respond with the city name if all goes well:

```rust
---
filename: src/lib.rs
---
.post_async("/:country", |mut req, ctx| async move {
    let country = ctx.param("country").unwrap();
    let city = match req.json::<Country>().await {
        Ok(c) => c.city,
        Err(_) => String::from(""),
    };
    if city.is_empty() {
        return Response::error("Bad Request", 400);
    };
    return match ctx.kv("cities")?.put(country, &city)?.execute().await {
        Ok(_) => Response::ok(city),
        Err(_) => Response::error("Bad Request", 400),
    };
})
```

Save the file and make a `POST` request to test this endpoint:

```sh
$ curl --json '{"city": "Paris"}' http://localhost:8787/France
```

## Read data from KV

To retrieve cities stored in KV, let’s write a `GET` route that pulls the country name from the path and searches KV. We also need some error handling in case it’s not found:

```rust
---
filename: src/lib.rs
---
.get_async("/:country", |_req, ctx| async move {
    if let Some(country) = ctx.param("country") {
        return match ctx.kv("cities")?.get(country).text().await? {
            Some(city) => Response::ok(city),
            None => Response::error("Country not found", 404),
        };
    }
    Response::error("Bad Request", 400)
})
```

Save and make a curl request to test the endpoint:

```sh
$ curl http://localhost:8787/France
```

## Conclusion

The completed app should look like this and you can deploy your worker with `npx wrangler deploy` :

```rust
---
filename: src/lib.rs
---
use serde::{Deserialize, Serialize};
use worker::*;

#[event(fetch)]
async fn fetch(req: Request, env: Env, _ctx: Context) -> Result<Response> {
    let router = Router::new();

    #[derive(Serialize, Deserialize, Debug)]
    struct Country {
        city: String,
    }

    router
        .post_async("/:country", |mut req, ctx| async move {
            let country = ctx.param("country").unwrap();
            let city = match req.json::<Country>().await {
                Ok(c) => c.city,
                Err(_) => String::from(""),
            };
            if city.is_empty() {
                return Response::error("Bad Request", 400);
            };
            return match ctx.kv("cities")?.put(country, &city)?.execute().await {
                Ok(_) => Response::ok(city),
                Err(_) => Response::error("Bad Request", 400),
            };
        })
        .get_async("/:country", |_req, ctx| async move {
            if let Some(country) = ctx.param("country") {
                return match ctx.kv("cities")?.get(country).text().await? {
                    Some(city) => Response::ok(city),
                    None => Response::error("Country not found", 404),
                };
            }
            Response::error("Bad Request", 400)
        })
        .run(req, env)
        .await
}
```

## Related resources

- [Rust support in Workers](https://www.notion.so/Workers-Examples-In-Python-Rust-e7e5a38f4f414540895ddf4e41409493?pvs=21).
- [Using KV in Workers](https://www.notion.so/Use-Workers-KV-directly-from-Rust-95912dda004a4c8faf1d1281958b408a?pvs=21).
