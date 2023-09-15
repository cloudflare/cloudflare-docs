---
type: overview
pcx_content_type: get-started
title: Quickstarts
weight: 3
layout: list
---

# Quickstarts

{{<content-column>}}

Quickstarts are GitHub repositories that are designed to be a starting point for building a new Cloudflare Workers project. To start any of the projects below, run:

```sh
$ npx wrangler generate <NEW_PROJECT_NAME> <GITHUB_REPO_URL>
```

{{<definitions>}}

- `new-project-name`

  - A folder with this name will be created with your new project inside, pre-configured to [your Workers account](/workers/wrangler/configuration/).

- `github-repo-url`
  - This is the URL of the GitHub repo starter, as below.

{{</definitions>}}

{{</content-column>}}


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

{{<Aside type="note" header="Cloudflare templates repository">}}

To access a full list of available Cloudflare templates, refer to the [Cloudflare templates repository](https://github.com/cloudflare/workers-sdk/tree/main/templates).

{{</Aside>}}

## Example Projects

{{<worker-starter title="Router" repo="cloudflare/workers-sdk/templates/worker-router" description="Run different logic based on the URL and request method. Use this starter to Build REST APIs or applications that require routing logic.">}}

{{<worker-starter title="Speedtest" repo="cloudflare/workers-sdk/templates/worker-speedtest"
description="Measure download/upload connection speed from the client side, using the Performance Timing API.">}}

{{<worker-starter title="Sentry" repo="mhart/cf-sentry" description="Log exceptions and errors in your Workers application to Sentry.io - an error tracking tool.">}}

{{<worker-starter title="Image Color" repo="xtuc/img-color-worker" description="Retrieve the dominant color of a PNG or JPEG image.">}}

{{<worker-starter title="Cloud Storage" repo="conzorkingkong/cloud-storage" description="Serve private Amazon Web Services (AWS) bucket files from a Worker script.">}}

{{<worker-starter title="BinAST" repo="xtuc/binast-cf-worker-template" description="Serve a JavaScript Binary AST via a Cloudflare Worker.">}}

{{<worker-starter title="AWS DynamoDB SQS" repo="cloudflare/workers-sdk/templates/worker-aws" description="Use AWS services such as DynamoDB and SQS from a Cloudflare Worker.">}}

{{<worker-starter title="Edge-Side Rendering - Vitedge" repo="frandiox/vitessedge-template" description="Use Vite to render pages on Cloudflare's global network with great DX. Includes i18n, markdown support and more.">}}

{{<worker-starter title="REST API with Fauna" repo="fauna-labs/fauna-workers" description="Build a fast, globally distributed REST API using Cloudflare Workers and Fauna, the data API for modern applications.">}}

{{<worker-starter title="Analytics Engine Forwarder" repo="cloudflare/workers-sdk/templates/worker-analytics-engine-forwarder" description="Use a Worker to capture analytics data with Analytics Engine.">}}

---

## Frameworks

{{<worker-starter title="Hono" repo="honojs/hono-minimal" description="Hono is an ultrafast web framework built for Cloudflare Workers. This is a minimal project using Hono, TypeScript, esbuild, Miniflare, and Jest.">}}

{{<worker-starter title="Apollo GraphQL Server" repo="cloudflare/workers-graphql-server" description="Lightning-fast, globally distributed Apollo GraphQL server, deployed on the Cloudflare global network using Cloudflare Workers.">}}

{{<worker-starter title="GraphQL Yoga" repo="the-guild-org/yoga-cloudflare-workers-template" description="The most flexible, fastest, and lightest GraphQL server for all environments, Cloudflare Workers included.">}}

{{<worker-starter title="Flareact" repo="flareact/flareact" description="Flareact is an edge-rendered React framework built for Cloudflare Workers. It features file-based page routing with dynamic page paths and edge-side data fetching APIs.">}}

{{<worker-starter title="Sunder" repo="sunderjs/sunder-worker-template" description="Sunder is a minimal and unopinionated framework for Service Workers. This template uses Sunder, TypeScript, Miniflare, esbuild, Jest, and Sass, as well as Workers Sites for static assets.">}}

---

## Built with Workers

Get inspiration from other sites and projects out there that were built with Cloudflare Workers.

{{<button type="primary" href="https://workers.cloudflare.com/built-with">}}Built with Workers{{</button>}}
