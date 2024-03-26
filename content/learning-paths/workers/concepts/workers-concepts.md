---
title: Cloudflare Workers
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

A single Worker project can have logic as complex or as simple as the developer desires. A simple project might look like a Worker that [returns a small HTML page](/workers/examples/return-html/) on a single route while a more complex Worker project would span multiple domains, multiple routes for each domain, and different logic for each route. The developer decides the architectural complexity of their Worker project.

Cloudflare Workers significantly differs from other serverless computing providers in its execution model and architecture.

## Runtime

The Workers runtime is designed to be JavaScript-standards compliant and web-interoperable. The Workers runtime uses the V8 engine — the same engine used by Chromium and Node.js, and has an open-source version, [`workerd`](https://github.com/cloudflare/workerd).

## Execution

Every data center in [Cloudflare's global network of over 300 cities](https://www.cloudflare.com/network/) hosts a single instance of the Workers runtime. An instance refers to a single execution environment where Cloudflare Workers runs. Every Worker running within an instance is executed within its own isolate.

### Isolates

Workers uses [isolates](/workers/reference/how-workers-works/#isolates): lightweight contexts that provide your code with variables it can access and a safe environment to be executed within. You could even consider an isolate a sandbox for your function to run in.

Many serverless computing providers use containers. In contrast to isolates, containers are not event-driven. Containerized processes each run an instance of a language runtime. Workers pays the overhead of a JavaScript runtime once on the start of a container and is able to run essentially limitless scripts with almost no individual overhead. Any given isolate can start around a hundred times faster than a Node process on a container or virtual machine.

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