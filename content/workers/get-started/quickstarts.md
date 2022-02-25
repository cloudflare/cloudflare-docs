---
type: overview
pcx-content-type: get-started
title: Quickstarts
weight: 3
layout: list
---

import WorkerStarter from "../../components/worker-starter"

# Quickstarts

{{<content-column>}}

Quickstarts are GitHub repos that are designed to be a starting point for building a new Cloudflare Workers project. For the projects below, you simply run:

```sh
$ wrangler generate <new-project-name> <github-repo-url>
```

{{<definitions>}}

*   `new-project-name`
    *   A folder with this name will be created with your new project inside, pre-configured to [your Workers account](/workers/cli-wrangler/configuration/).

*   `github-repo-url`
    *   This is the URL of the GitHub repo starter, as below.

{{</definitions>}}

{{</content-column>}}

***

## Templates

{{<worker-starter
title="JavaScript Starter"
description="A bare-bones Workers starter project, in JavaScript."
repo="cloudflare/worker-template"
>}}

{{<worker-starter
title="TypeScript Starter"
description="A bare-bones Workers starter project, in TypeScript."
repo="cloudflare/worker-typescript-template"
>}}

{{<worker-starter
title="Worker Sites"
description="Easily deploy a static site or static assets to Cloudflare’s edge network."
repo="cloudflare/worker-sites-template"
>}}

{{<worker-starter
title="Router"
description="Run different logic based on the URL and request method. Use this starter to Build REST APIs or apps that require routing logic."
repo="cloudflare/worker-template-router"
>}}

{{<worker-starter
title="Miniflare Example Project"
description="An example Cloudflare Workers project that uses Miniflare for local development, TypeScript, esbuild for bundling, and Jest for testing, with Miniflare's custom Jest environment."
repo="mrbbot/miniflare-typescript-esbuild-jest"
>}}

{{<worker-starter
title="Sunder Starter (Typescript)"
description="A complete starter template using Sunder, TypeScript, Miniflare, esbuild, Jest, and Sass. Uses Worker Sites for static assets."
repo="sunderjs/sunder-worker-template"
>}}

{{<worker-starter
title="Hono Starter"
description="Hono is an ultrafast web framework built for Cloudflare Workers. This is a minimal project using Hono, TypeScript, esbuild, and Miniflare."
repo="yusukebe/hono-minimal"
>}}

***

## Frameworks

{{<worker-starter
title="Apollo GraphQL Server"
description="Lightning-fast, globally distributed Apollo GraphQL server, deployed at the edge using Cloudflare Workers."
repo="signalnerve/workers-graphql-server"
>}}

{{<worker-starter
title="Flareact"
description="Flareact is an edge-rendered React framework built for Cloudflare Workers. It features file-based page routing with dynamic page paths and edge-side data fetching APIs."
repo="flareact/flareact"
>}}

***

## Example Projects

{{<worker-starter
title="Speedtest"
description="Measure download / upload connection speed from the client side, using the Performance Timing API."
repo="cloudflare/worker-speedtest-template"
>}}

{{<worker-starter
title="Sentry"
description="Log exceptions and errors in your Workers application to Sentry.io - an error tracking tool"
repo="bustle/cf-sentry"
>}}

{{<worker-starter
title="Image Color"
description="Retrieve the dominant color of a PNG or JPEG image"
repo="xtuc/img-color-worker"
>}}

{{<worker-starter
title="Cloud Storage"
description="Serve private AWS bucket files from a Worker script"
repo="conzorkingkong/cloud-storage"
>}}

{{<worker-starter
title="BinAST"
description="Serve a JavaScript Binary AST via a Cloudflare Worker."
repo="xtuc/binast-cf-worker-template"
>}}

{{<worker-starter
title="AWS DynamoDB SQS"
description="Use AWS services such as DynamoDB and SQS from a Cloudflare Worker"
repo="cloudflare/workers-aws-template"
>}}

{{<worker-starter
title="Edge-side rendering - Vitedge"
description="Use Vite to render pages at the edge with great DX. Includes i18n, markdown support and more."
repo="frandiox/vitessedge-template"
>}}

{{<worker-starter
title="REST API with Fauna"
description="Build a fast, globally distributed REST API using Cloudflare Workers and Fauna, the data API for modern applications."
repo="fauna-labs/fauna-workers"
>}}

***

## Other languages

Other languages may require you to install additional tools beyond wrangler. See the README.md file in the project.

{{<worker-starter
title="Hello World (Rust)"
description="A bare-bones starter in Rust."
repo="cloudflare/rustwasm-worker-template"
>}}

{{<worker-starter
title="Hello World (Python)"
description="A bare-bones starter in Python."
repo="cloudflare/python-worker-hello-world"
>}}

{{<worker-starter
title="Hello World (Scala)"
description="A bare-bones starter in Scala."
repo="cloudflare/scala-worker-hello-world"
>}}

{{<worker-starter
title="KV example (Scala)"
description="Example usage of Workers KV in Scala."
repo="cloudflare/scala-worker-kv"
>}}

{{<worker-starter
title="Hello World (Reason)"
description="A bare-bones starter in Reason."
repo="cloudflare/reason-worker-hello-world"
>}}

{{<worker-starter
title="Hello World (FSharp)"
description="A bare-bones starter in FSharp/Fable."
repo="fable-compiler/cfworker-hello-world"
>}}

{{<worker-starter
title="Hello World (Dart)"
description="A bare-bones starter in Dart."
repo="cloudflare/dart-worker-hello-world"
>}}

{{<worker-starter
title="Hello World (Kotlin)"
description="A bare-bones starter in Kotlin."
repo="cloudflare/kotlin-worker-hello-world"
>}}

{{<worker-starter
title="Hello World (COBOL)"
description="A bare-bones starter in COBOL."
repo="cloudflare/cobol-worker-template"
>}}

{{<worker-starter
title="Hello World (Perl)"
description="A bare-bones starter in Perl."
repo="cloudflare/perl-worker-hello-world"
>}}

{{<worker-starter
title="Hello World (PHP)"
description="A bare-bones starter in PHP."
repo="cloudflare/php-worker-hello-world"
>}}

{{<worker-starter
title="Emscripten + Wasm Image Resizer"
description="An image resizer in C compiled to Wasm with Emscripten."
repo="cloudflare/worker-emscripten-template"
>}}

***

## Built with Workers

Get inspiration from other sites and projects out there that were built with Cloudflare Workers.

{{<button type="primary" href="https://workers.cloudflare.com/built-with">}}Built with Workers{{</button>}}
