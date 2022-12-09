---
pcx_content_type: concept
title: External Services
---

# External Services
Many external services provide libraries and SDKs to interact with their APIs. Many Node-compatible libraries work on Workers right out of the box. Some, which implement `fs`, `http/net`, or access the browser `window` don't directly translate to the Workers runtime, which is v8-based. For a list of working packages, see [Works on Workers](https://workers.cloudflare.com/works).

Most of these services will require authentication. You can store the necessary auth keys and secrets using encrypted environment variables in dashboard via Cloudflare API, or use [`wrangler secret put <KEY>`](/workers/wrangler/commands/#secret) from the wrangler CLI. Then, you can reference these secrets from your Worker.

We recommend using [Custom Domains](/workers/platform/triggers/custom-domains/) when communicating with external APIs, which treat your Worker as your core application.
