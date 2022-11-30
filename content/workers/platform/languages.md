---
pcx_content_type: concept
title: Languages
---

# Languages

## Background

Workers is a polyglot platform. You can write Workers with a language you likely already know. Cloudflare built Workers to execute JavaScript and WebAssembly and has continuously added support for new languages.

## JavaScript / TypeScript

The Workers platform fully supports JavaScript. Cloudflare recommends using JavaScript and TypeScript. Find up-to-date [type definitions on GitHub](https://github.com/cloudflare/workers-types) and npm.

{{<table-wrap>}}

| Language   | Template                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------- |
| JavaScript | [cloudflare/worker-template](https://github.com/cloudflare/worker-template)                       |
| TypeScript | [cloudflare/worker-typescript-template](https://github.com/cloudflare/worker-typescript-template) |

{{</table-wrap>}}

### Resources on JavaScript / Typescript

- [Quickstarts](/workers/get-started/quickstarts/) – More example repos to use as a basis for your projects
- [TypeScript type definitions](https://github.com/cloudflare/workers-types)
- [JavaScript and web standard APIs](/workers/runtime-apis/web-standards/)
- [Tutorials](/workers/tutorials/)

## Wasm-supported

[WebAssembly](https://webassembly.org/) — abbreviated Wasm — is a binary format that many languages target during their compilation. This allows developers to write Workers using languages like C, C++, Rust, and more.

{{<table-wrap>}}

| Language | Template                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------- |
| Rust     | [cloudflare/rustwasm-worker-template](https://github.com/cloudflare/rustwasm-worker-template)     |
| C        | [cloudflare/worker-emscripten-template](https://github.com/cloudflare/worker-emscripten-template) |
| Cobol    | [cloudflare/cobol-worker-template](https://github.com/cloudflare/cobol-worker-template)           |

{{</table-wrap>}}

### Resources on WebAssembly

- [Serverless Rust with Cloudflare Workers](https://blog.cloudflare.com/cloudflare-workers-as-a-serverless-rust-platform/)
- [WebAssembly on Cloudflare Workers](https://blog.cloudflare.com/webassembly-on-cloudflare-workers/)

## Compiled to JavaScript

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
