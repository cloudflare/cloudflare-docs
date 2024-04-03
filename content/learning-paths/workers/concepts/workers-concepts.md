---
title: Cloudflare Workers
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

Cloudflare Workers gives developers the power to deploy serverless code instantly to Cloudflare's global network.

Cloudflare Workers significantly differs from other serverless computing providers in its execution model and architecture.

## What you can do with Workers

A single Worker project can have logic as complex or as simple as the developer desires. A project of smaller scale might look like a Worker that [returns a small HTML page](/workers/examples/return-html/) on a single route. A more complex Worker project would span multiple domains, multiple routes for each domain, and different logic for each route. The developer decides the architectural complexity of their Worker project.

Your application can be made up of multiple Workers that work together and deliver a single experience to end users. Workers can also integrate with other Cloudflare Developer Platform functionality such as storage, media and AI. You will learn more about this in the [Developer Platform module](/learning-paths/workers/devplat/).

## Runtime

The [Workers runtime](https://blog.cloudflare.com/workerd-open-source-workers-runtime) is designed to be JavaScript-standards compliant and web-interoperable. The Workers runtime uses the V8 engine — the same engine used by Chromium and Node.js, and has an open-source version, [`workerd`](https://github.com/cloudflare/workerd). 

## Execution

The Cloudflare Workers runtime runs in every data center of [Cloudflare's global network of over 300 cities](https://www.cloudflare.com/network/). Every Worker run within its own isolate. Isolate architecture is what makes Workers efficient.

### Isolates

Workers uses [isolates](/workers/reference/how-workers-works/#isolates): lightweight contexts that provide your code with variables it can access and a safe environment to be executed within. You could even consider an isolate a sandbox for your function to run in.

{{<render file="_isolate-description.md" productFolder="/workers/">}}

<figure>
  {{<architecture-diagram>}}
</figure>

## Compute per request

{{<render file="/_compute-per-request.md" productFolder="/workers/">}}

## Summary

By reading this page, you have learned:

- The basics of how Worker projects are organized.
- The fundamentals of how Workers execute on the Cloudflare network.
- How the request to reponse flow executes.

In the next module, you build and deploy your first Worker to the Cloudflare global network.

## Related resources

- [Cloud computing without containers](https://blog.cloudflare.com/cloud-computing-without-containers) - Blog post detailing the containers versus isolates difference in the context of Cloudflare.
- [How Workers works](/workers/reference/how-workers-works/) - Learn the difference between the Workers runtime versus traditional browsers and Node.js.
- [How the cache works](/workers/reference/how-the-cache-works/) - Learn how Workers interacts with the Cloudflare cache.

## Feedback

To improve this learning path or report any missing or incorrect information, [file an issue on GitHub](https://github.com/cloudflare/cloudflare-docs/issues/new/choose).

## Community

Connect with the [Cloudflare Developer Platform community on Discord](https://discord.cloudflare.com) to ask questions, share what you are building, and discuss the platform with other developers.