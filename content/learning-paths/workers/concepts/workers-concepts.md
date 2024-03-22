---
title: Cloudflare Workers
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

Cloudflare Workers has significant differences in its architecture from other serverless computing providers. The Workers runtime is designed is designed to be JavaScript-standards compliant and web-interoperable. It uses the V8 engine — the same engine used by Chromium and Node.js and has an open-source version, [`workerd`](https://github.com/cloudflare/workerd).

## Workers

Workers projects are made of two basic components:

1. The entry point (this is the initial `index.js` or `index.ts` that is generated in project creation) where you write code.
2. The [`wrangler.toml` file](/workers/wrangler/configuration/) where you define your project's configuration.

If you are building your Worker entirely on the Cloudflare dashboard, you will use the dashboard editor to update your code and the Cloudflare dashboard configuration settings to configure your project.

When an event (such as an HTTP request or a [Cron Trigger](/workers/configuration/cron-triggers/)) invokes a Worker, the Worker code will execute. Workers projects can have complex functionality, run on multiple [routes](/workers/configuration/routing/), and route function logic according to its intended destination. Cloudflare Workers can do a lot. A single Worker project can have logic as complex or as simple as the developer desires. A simple use case might be [Returning a small HTML page](/workers/examples/return-html/) while a more complex project would span multiple domains, multiple routes for each domain, and different logic for each route and domain. The architectural complexity of a Worker project is decided by the developer.

## Execution

Workers run on [Cloudflare's global network](https://www.cloudflare.com/network/) - a growing global network of thousands of machines distributed across hundreds of locations. Only one Workers instance runs on each of the many Cloudflare global network servers. An instance refers to a single execution environment where Cloudflare Workers runs. Every Worker running within an instance is executed within its own isolate. Workers are stateless, meaning that they do not maintain data or state between invocations.

## Isolates

Workers uses [isolates](/workers/reference/how-workers-works/#isolates): lightweight contexts that provide your code with variables it can access and a safe environment to be executed within. You could even consider an isolate a sandbox for your function to run in.

Isolates are resilient and continuously available for the duration of a request, but in rare instances isolates may be evicted. When a Worker hits official [limits](/workers/platform/limits/) or when resources are exceptionally tight on the machine the request is running on, the runtime will selectively evict isolates after their events are properly resolved.

Like all other JavaScript platforms, a single Workers instance may handle multiple requests including concurrent requests in a single-threaded event loop.

In the [previous page](/learning-paths/workers/concepts/workers-concepts/), you learned about containers. In contrast to isolates, containers are not event-driven. Unlike other serverless providers which use containerized processes each running an instance of a language runtime, Workers pays the overhead of a JavaScript runtime once on the start of a container. Workers processes are able to run essentially limitless scripts with almost no individual overhead. Any given isolate can start around a hundred times faster than a Node process on a container or virtual machine.

A given isolate has its own scope, but isolates are not necessarily long-lived. An isolate may be spun down and evicted for a number of reasons.

## Compute per request

{{<render file="/_compute-per-request.md" productFolder="/workers/">}}

## Summary

By reading this page, you have learned:

- The basics of how Worker projects are organized.
- The fundamentals of how Workers execute on the Cloudflare network.
- How the request to reponse flow executes.

In the next section, you will learn more about the Cloudflare Developer Platform.

## Related resources

- [Cloud computing without containers](https://blog.cloudflare.com/cloud-computing-without-containers) - Blog post detailing the containers versus isolates difference in the context of Cloudflare.