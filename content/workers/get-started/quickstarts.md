---
type: overview
pcx-content-type: get-started
title: Quickstarts
weight: 3
layout: list
---

# Quickstarts

{{<content-column>}}

Quickstarts are GitHub repos that are designed to be a starting point for building a new Cloudflare Workers project. For the projects below, you simply run:

```sh
$ wrangler generate <new-project-name> <github-repo-url>
```

{{<definitions>}}

- `new-project-name`

  - A folder with this name will be created with your new project inside, pre-configured to [your Workers account](/workers/wrangler/cli-wrangler/configuration/).

- `github-repo-url`
  - This is the URL of the GitHub repo starter, as below.

{{</definitions>}}

{{</content-column>}}

---

<style>
  .WorkerStarter--command pre {
    height: var(--height);
    line-height: 1.4;
    margin-bottom: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    overflow: hidden;
  }
  .WorkerStarter--command code {
    display: block;
    padding: 0.7em 1.25em;
    font-family: inherit;
    cursor: default;
  }
</style>

## Templates

{{<worker-starter title="JavaScript Starter" repo="cloudflare/worker-template" description="A bare-bones Workers starter project, in JavaScript.">}}

{{<worker-starter title="TypeScript Starter" repo="cloudflare/worker-typescript-template" description="A bare-bones Workers starter project, in TypeScript.">}}

{{<worker-starter title="Worker Sites" repo="cloudflare/worker-sites-template" description="Easily deploy a static site or static assets to Cloudflare’s edge network.">}}

{{<worker-starter title="Router" repo="cloudflare/worker-template-router" description="Run different logic based on the URL and request method. Use this starter to Build REST APIs or apps that require routing logic.">}}

{{<worker-starter title="Miniflare Example Project" repo="mrbbot/miniflare-typescript-esbuild-jest" description="An example Cloudflare Workers project that uses Miniflare for local development, TypeScript, esbuild for bundling, and Jest for testing, with Miniflare's custom Jest environment.">}}

{{<worker-starter title="Sunder Starter (Typescript)" repo="sunderjs/sunder-worker-template" description="A complete starter template using Sunder, TypeScript, Miniflare, esbuild, Jest, and Sass. Uses Worker Sites for static assets.">}}

{{<worker-starter title="Hono Starter" repo="honojs/hono-minimal" description="Hono is an ultrafast web framework built for Cloudflare Workers. This is a minimal project using Hono, TypeScript, esbuild, Miniflare, and Jest.">}}

---

## Frameworks

{{<worker-starter title="Apollo GraphQL Server" repo="signalnerve/workers-graphql-server" description="Lightning-fast, globally distributed Apollo GraphQL server, deployed at the edge using Cloudflare Workers.">}}
  
{{<worker-starter title="GraphQL Yoga" repo="the-guild-org/yoga-cloudflare-workers-template" description="The most flexible, fastest, and lightest GraphQL server for all environments, Cloudflare Workers included.">}}

{{<worker-starter title="Flareact" repo="flareact/flareact" description="Flareact is an edge-rendered React framework built for Cloudflare Workers. It features file-based page routing with dynamic page paths and edge-side data fetching APIs.">}}

---

## Example Projects

{{<worker-starter title="Speedtest" repo="cloudflare/worker-speedtest-template"
description="Measure download / upload connection speed from the client side, using the Performance Timing API.">}}

{{<worker-starter title="Sentry" repo="bustle/cf-sentry" description="Log exceptions and errors in your Workers application to Sentry.io - an error tracking tool">}}

{{<worker-starter title="Image Color" repo="xtuc/img-color-worker" description="Retrieve the dominant color of a PNG or JPEG image">}}

{{<worker-starter title="Cloud Storage" repo="conzorkingkong/cloud-storage" description="Serve private AWS bucket files from a Worker script">}}

{{<worker-starter title="BinAST" repo="xtuc/binast-cf-worker-template" description="Serve a JavaScript Binary AST via a Cloudflare Worker.">}}

{{<worker-starter title="AWS DynamoDB SQS" repo="cloudflare/workers-aws-template" description="Use AWS services such as DynamoDB and SQS from a Cloudflare Worker">}}

{{<worker-starter title="Edge-side rendering - Vitedge" repo="frandiox/vitessedge-template" description="Use Vite to render pages at the edge with great DX. Includes i18n, markdown support and more.">}}

{{<worker-starter title="REST API with Fauna" repo="fauna-labs/fauna-workers" description="Build a fast, globally distributed REST API using Cloudflare Workers and Fauna, the data API for modern applications.">}}

---

## Other languages

Other languages may require you to install additional tools beyond wrangler. See the README.md file in the project.

{{<worker-starter title="Hello World (Rust)" repo="cloudflare/rustwasm-worker-template" description="A bare-bones starter in Rust.">}}

{{<worker-starter title="Hello World (Python)" repo="cloudflare/python-worker-hello-world" description="A bare-bones starter in Python.">}}

{{<worker-starter title="Hello World (Scala)" repo="cloudflare/scala-worker-hello-world" description="A bare-bones starter in Scala.">}}

{{<worker-starter title="KV example (Scala)" repo="cloudflare/scala-worker-kv" description="Example usage of Workers KV in Scala.">}}

{{<worker-starter title="Hello World (Reason)" repo="cloudflare/reason-worker-hello-world" description="A bare-bones starter in Reason.">}}

{{<worker-starter title="Hello World (FSharp)" repo="fable-compiler/cfworker-hello-world" description="A bare-bones starter in FSharp/Fable.">}}

{{<worker-starter title="Hello World (Dart)" repo="cloudflare/dart-worker-hello-world" description="A bare-bones starter in Dart.">}}

{{<worker-starter title="Hello World (Kotlin)" repo="cloudflare/kotlin-worker-hello-world" description="A bare-bones starter in Kotlin.">}}

{{<worker-starter title="Hello World (COBOL)" repo="cloudflare/cobol-worker-template" description="A bare-bones starter in COBOL.">}}

{{<worker-starter title="Hello World (Perl)" repo="cloudflare/perl-worker-hello-world" description="A bare-bones starter in Perl.">}}

{{<worker-starter title="Hello World (PHP)" repo="cloudflare/php-worker-hello-world" description="A bare-bones starter in PHP.">}}

{{<worker-starter title="Emscripten + Wasm Image Resizer" repo="cloudflare/worker-emscripten-template" description="An image resizer in C compiled to Wasm with Emscripten.">}}

---

## Built with Workers

Get inspiration from other sites and projects out there that were built with Cloudflare Workers.

{{<button type="primary" href="https://workers.cloudflare.com/built-with">}}Built with Workers{{</button>}}
