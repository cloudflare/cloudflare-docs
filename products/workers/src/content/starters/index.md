---
type: overview
order: 2
---

import WorkerStarter from "../../components/worker-starter"

# Starters

<ContentColumn>

Starters are essentially GitHub repos that are designed to be a starting point for building a new Cloudflare Workers project. For the projects below, you simply run:

```sh
$ wrangler generate <new-project-name> <github-repo-url>
```

<Definitions>

- `new-project-name`
  - A folder with this name will be created with your new project inside, pre-configured to [your Workers account](/cli-wrangler/configuration).

- `github-repo-url`
  - This is the URL of the GitHub repo starter, as below.

</Definitions>

</ContentColumn>

--------------------------------

## JavaScript, TypeScript

<WorkerStarter
  title="Hello World"
  description="A bare-bones starter in JavaScript."
  repo="cloudflare/worker-template"
/>

<WorkerStarter
  title="Hello World (TypeScript)"
  description="A bare-bones starter in TypeScript."
  repo="cloudflare/worker-typescript-template"
/>

<WorkerStarter
  title="Worker Sites"
  description="Easily deploy a static site or static assets to Cloudflare’s edge network."
  repo="cloudflare/worker-sites-template"
/>

<WorkerStarter
  title="Router"
  description="Run different logic based on the URL and request method. Use this starter to Build REST APIs or apps that require routing logic."
  repo="cloudflare/worker-template-router"
/>

<WorkerStarter
  title="Apollo GraphQL Server"
  description="Lightning-fast, globally distributed Apollo GraphQL server, deployed at the edge using Cloudflare Workers."
  repo="signalnerve/workers-graphql-server"
/>

<WorkerStarter
  title="Speedtest"
  description="Measure download / upload connection speed from the client side, using the Performance Timing API."
  repo="cloudflare/worker-speedtest-template"
/>

<WorkerStarter
  title="Sentry"
  description="Log exceptions and errors in your Workers application to Sentry.io - an error tracking tool"
  repo="bustle/cf-sentry"
/>

<WorkerStarter
  title="Image Color"
  description="Retrieve the dominant color of a PNG or JPEG image"
  repo="xtuc/img-color-worker"
/>

<WorkerStarter
  title="Cloud Storage"
  description="Serve private AWS bucket files from a Worker script"
  repo="conzorkingkong/cloud-storage"
/>

<WorkerStarter
  title="BinAST"
  description="Serve a JavaScript Binary AST via a Cloudflare Worker."
  repo="xtuc/binast-cf-worker-template"
/>

<WorkerStarter
  title="AWS DynamoDB SQS"
  description="Use AWS services such as DynamoDB and SQS from a Cloudflare Worker"
  repo="cloudflare/workers-aws-template"
/>

--------------------------------

## Other languages

Other languages may require you to install additional tools beyond wrangler. See the README.md file in the project.

<WorkerStarter
  title="Hello World (Rust)"
  description="A bare-bones starter in Rust."
  repo="cloudflare/rustwasm-worker-template"
/>

<WorkerStarter
  title="Hello World (Python)"
  description="A bare-bones starter in Python."
  repo="cloudflare/python-worker-hello-world"
/>

<WorkerStarter
  title="Hello World (Scala)"
  description="A bare-bones starter in Scala."
  repo="cloudflare/scala-worker-hello-world"
/>

<WorkerStarter
  title="KV example (Scala)"
  description="Example usage of Workers KV in Scala."
  repo="cloudflare/scala-worker-kv"
/>

<WorkerStarter
  title="Hello World (Reason)"
  description="A bare-bones starter in Reason."
  repo="cloudflare/reason-worker-hello-world"
/>

<WorkerStarter
  title="Hello World (FSharp)"
  description="A bare-bones starter in FSharp/Fable."
  repo="fable-compiler/cfworker-hello-world"
/>

<WorkerStarter
  title="Hello World (Dart)"
  description="A bare-bones starter in Dart."
  repo="cloudflare/dart-worker-hello-world"
/>

<WorkerStarter
  title="Hello World (Kotlin)"
  description="A bare-bones starter in Kotlin."
  repo="cloudflare/kotlin-worker-hello-world"
/>

<WorkerStarter
  title="Hello World (COBOL)"
  description="A bare-bones starter in COBOL."
  repo="cloudflare/cobol-worker-template"
/>

<WorkerStarter
  title="Hello World (Perl)"
  description="A bare-bones starter in Perl."
  repo="cloudflare/perl-worker-hello-world"
/>

<WorkerStarter
  title="Hello World (PHP)"
  description="A bare-bones starter in PHP."
  repo="cloudflare/php-worker-hello-world"
/>

<WorkerStarter
  title="Emscripten + Wasm Image Resizer"
  description="An image resizer in C compiled to Wasm with Emscripten."
  repo="cloudflare/worker-emscripten-template"
/>

--------------------------------

## Built with Workers

Get inspiration from other sites and projects out there that were built with Cloudflare Workers.

<Button type="primary" href="https://workers.cloudflare.com/built-with">Built with Workers</Button>
