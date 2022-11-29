---
pcx_content_type: concept
title: Workers Services
weight: 15
layout: single
---

# Workers Services

Workers Services are the building blocks for deploying applications on Cloudflare Workers. Workers Services are scripts that can contain bindings to KV stores, Durable Objects, or even other services, as well as environment variables and secrets. A Workers Service is composable, which allows Workers services to talk to each other; allowing you to develop new kinds of microservices like routers, middlewares, deployment managers, or traffic gateways.

## Bindings

Bindings allow your Workers to interact with resources on the Workers platform. Bindings can be configured by logging in to the Cloudflare dashboard > Account Home > [**Workers**](https://dash.cloudflare.com/?zone=workers) > your **Worker** > **Settings**> **Variables**. Bindings also provide a security model for interacting with those resources. Workers only have access to other resources that are explicitly defined as a binding in configuration.

There are multiple types of bindings available today:

1. [Service bindings](/workers/platform/bindings/about-service-bindings/) for communication with another Worker.
2. KV namespace bindings for communication between a Worker and a KV namespace.
3. R2 bucket bindings for communication between a Worker and an R2 bucket.
4. Durable Object bindings for communication between a Worker and a Durable Object.
5. Queue bindings for communication between a Worker and a Queue

[Service bindings](/workers/platform/bindings/about-service-bindings/) are a unique binding type that facilitates Worker-to-Worker communication. A Service binding allows you to send requests to another Worker without those requests going over the Internet. The request immediately invokes the downstream Worker. Service bindings allow for much more composability on the Workers platform.

## Deployments

Deployments are an audit log of static historical versions of your Worker. They include the bundled code, configuration, and bindings associated with your Worker at a given point in time. A change to any of these will trigger a new deployment on Cloudflare’s network. Deployments will soon include integrated rollbacks and automated deployment.

Read more about [Deployments](/workers/platform/deployments).

{{<Aside type="note">}}

We have temporarily disabled the creation of Service Environments while we are improving this feature.

We recommend using [Deployments](/workers/platform/deployments) in place of Environments. Deployments give you a powerful audit log of changes to your application, and will soon include integrated rollbacks and automated deployment. If you'd like to give feedback, please [request a chat](https://www.cloudflare.com/lp/developer-week-deployments).

{{</Aside>}}

