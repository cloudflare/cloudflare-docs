---
title: Supported Crates
pcx_content_type: single
weight: 1
meta:
  title: Supported Crates
---

# `workers-rs` Supported Rust Crates

This document outlines popular Rust crates which have been confirmed to work on Workers when using `workers-rs` (or in some cases just `wasm-bindgen`),
and any custom configuration that was required.
This is not an exhaustive list, many Rust crates can be compiled to the `wasm32-unknown-unknown` target that is supported by Workers.
In some cases this may require disabling default features or enabling a Wasm-specific feature. Finally, it is important to carefully
consider the addition of new dependencies, as this can significantly increase bundle size.

## `time`

Many crates which have been made Wasm-friendly, will use the `time` crate instead of `std::time`. For the `time` crate to work in Wasm, the `wasm-bindgen` feature must be enabled to obtain timing information from JavaScript.

## `tracing`

Tracing can be enabled by using the `tracing-web` crate and the `time` feature for `tracing-subscriber`. 
Due to timing limitations on Workers, spans will have identical start and end times unless they encompass I/O.

[See Example](https://github.com/kflansburg/workers-rs/tree/main/examples/tracing).

## `reqwest`

The `reqwest` library can be compiled to Wasm, and hooks into the JavaScript `fetch` API automatically using `wasm-bindgen`. 

## `tokio-postgres`

`tokio-postgres` can be compiled to Wasm. It must be configured to use a `Socket` from `workers-rs`:

[See Example](https://github.com/kflansburg/workers-rs/tree/main/examples/tokio-postgres).

## `hyper`

The `hyper` crate contains two HTTP clients, the lower-level `conn` module and the higher-level `Client`. 
The `conn` module can be used with Workers `Socket`, however `Client` requires timing dependencies which are
not yet Wasm friendly. 

[See Example](https://github.com/kflansburg/workers-rs/tree/main/examples/hyper).