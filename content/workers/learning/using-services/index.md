---
pcx_content_type: concept
title: Workers Services
weight: 15
layout: single
---

# Workers Services

Workers Services are the building blocks for deploying applications on Cloudflare Workers.

Workers Services are scripts that can contain [bindings](#bindings) to KV stores, Durable Objects, or other services, as well as environment variables and secrets.

A Workers Service is composable, which allows Workers Services to talk to each other. This opens up the ability to develop new kinds of microservices like: routers, middlewares, deployment managers, or traffic gateways.

To understand Workers Services better, it will help to know about Bindings and Deployments.

## Bindings

Bindings allow your Workers to interact with resources on the Workers platform. Bindings can be configured by logging in to the Cloudflare dashboard > Account Home > [**Workers**](https://dash.cloudflare.com/?zone=workers) > your **Worker** > **Settings**> **Variables**. Bindings also provide a security model for interacting with those resources. Workers only have access to other resources that are explicitly defined as a binding in configuration.

There are multiple types of bindings available today:

1. [Service bindings](/workers/platform/bindings/about-service-bindings/) for communication with another Worker.
2. [KV namespace bindings](/workers/runtime-apis/kv/#kv-bindings) for communication between a Worker and a KV namespace.
3. [R2 bucket bindings](/r2/data-access/workers-api/workers-api-reference/#create-a-binding) for communication between a Worker and an R2 bucket.
4. [Durable Object bindings](/workers/runtime-apis/durable-objects/#accessing-a-durable-object-from-a-worker) for communication between a Worker and a Durable Object.
5. [Queue bindings](/queues/configuration/) for communication between a Worker and a Queue.

{{<Aside type="note">}}

[Service bindings](/workers/platform/bindings/about-service-bindings/) are a unique binding type that facilitates Worker-to-Worker communication. A Service binding allows you to send requests to another Worker without those requests going over the Internet. The request immediately invokes the downstream Worker. Service bindings allow for much more composability on the Workers platform.

{{</Aside>}}

## Deployments

Deployments provide static historical versions of your Worker. They include the bundled code, configuration, and bindings associated with your Worker at a given point in time, and are created when changes to Worker code or configuration is detected.

Read more about [Deployments](/workers/platform/deployments).

{{<Aside type="note">}}

Deployments are in active development. If you'd like to give feedback, please [request a chat](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}

