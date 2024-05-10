---
pcx_content_type: navigation
title: Get started
weight: 1
meta:
  description: Install and set up the Workers Vitest integration.
---

# Get started

For most users, Cloudflare recommends using the Workers Vitest integration for testing Workers and [Pages Functions](/pages/functions/) projects. [Vitest](https://vitest.dev/) is a popular JavaScript testing framework featuring a very fast watch mode, Jest compatibility, and out-of-the-box support for TypeScript. In this integration, Cloudflare provides a custom pool that allows your Vitest tests to run _inside_ the Workers runtime.

The Workers Vitest integration:

- Supports both **unit tests** and **integration tests**.
- Provides direct access to Workers runtime APIs and bindings.
- Implements isolated per-test storage.
- Runs tests fully-locally using [Miniflare](https://miniflare.dev/).
- Leverages Vitest's hot-module reloading for near instant reruns.
- Provides a declarative interface for mocking outbound requests.
- Supports projects with multiple Workers.

Get started with one of the available guides:

{{<directory-listing showDescriptions="true">}}

{{<Aside type="warning">}}

The Workers Vitest integration does not support testing Workers using the service worker format. [Migrate to the ES modules format](/workers/reference/migrate-to-module-workers/) to use the Workers Vitest integration.

{{</Aside>}}