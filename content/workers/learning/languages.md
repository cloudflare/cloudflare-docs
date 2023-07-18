---
pcx_content_type: concept
title: Languages
---

# Languages

## Background

Workers is a polyglot platform. You can write Workers in JavaScript, TypeScript, or any programming language that compiles to [WebAssembly](/workers/runtime-apis/webassembly/).

## JavaScript / TypeScript

The Workers platform fully supports JavaScript standards, as defined by [TC39](https://tc39.es/) (ECMAScript). Cloudflare recommends writing Workers using JavaScript or TypeScript, and publishes type definitions to [GitHub](https://github.com/cloudflare/workers-types) and [npm](https://www.npmjs.com/package/@cloudflare/workers-types) (`npm install -D @cloudflare/workers-types`).

{{<table-wrap>}}

| Language   | Template                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------- |
| JavaScript | [cloudflare/workers-sdk/templates/worker](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker)                       |
| TypeScript | [cloudflare/workers-sdk/templates/worker-typescript](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker-typescript) |

{{</table-wrap>}}

### Resources

- [Quickstarts](/workers/get-started/quickstarts/) – More example repos to use as a basis for your projects
- [TypeScript type definitions](https://github.com/cloudflare/workers-types)
- [JavaScript and web standard APIs](/workers/runtime-apis/web-standards/)
- [Tutorials](/workers/tutorials/)

## WebAssembly (Wasm)

[WebAssembly](https://webassembly.org/) (abbreviated as "Wasm") is a binary format that many languages can be compiled to. This allows you to write Workers using programming language beyond JavaScript, such as Rust, C, C++, Go and more.

{{<table-wrap>}}

| Language | Details                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------- |
| Rust     | [Guide](/workers/runtime-apis/webassembly/rust/)                                                            |
| C        | [Template](https://github.com/cloudflare/workers-sdk/tree/main/templates/experimental/worker-emscripten) |
| Cobol    | [Template](https://github.com/cloudflare/cobol-worker-template)                                          |

{{</table-wrap>}}

### Resources on WebAssembly

- [Serverless Rust with Cloudflare Workers](https://blog.cloudflare.com/cloudflare-workers-as-a-serverless-rust-platform/)
- [WebAssembly on Cloudflare Workers](https://blog.cloudflare.com/webassembly-on-cloudflare-workers/)

## Compile languages to JavaScript

You can write Workers with any language that can compile to JavaScript, including the languages below.

{{<table-wrap>}}

| Language     | Example project                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Kotlin       | [cloudflare/kotlin-worker-hello-world](https://github.com/cloudflare/kotlin-worker-hello-world) |
| Dart         | [cloudflare/dart-worker-hello-world](https://github.com/cloudflare/dart-worker-hello-world)     |
| Python       | [cloudflare/python-worker-hello-world](https://github.com/cloudflare/python-worker-hello-world) |
| Scala        | [cloudflare/scala-worker-hello-world](https://github.com/cloudflare/scala-worker-hello-world)   |
| Reason/OCaml | [cloudflare/reason-worker-hello-world](https://github.com/cloudflare/reason-worker-hello-world) |
| Perl         | [cloudflare/perl-worker-hello-world](https://github.com/cloudflare/perl-worker-hello-world)     |
| PHP          | [cloudflare/php-worker-hello-world](https://github.com/cloudflare/php-worker-hello-world)       |
| FSharp       | [fable-compiler/cfworker-hello-world](https://github.com/fable-compiler/cfworker-hello-world)   |

{{</table-wrap>}}

Refer to the [Cloudflare Workers announces broad language support](https://blog.cloudflare.com/cloudflare-workers-announces-broad-language-support/) blog post for more information.
