---
pcx_content_type: concept
title: How Workers for Platforms works
weight: 1
meta:
    title: How Workers for Platforms works
---

# How Workers for Platforms works

Workers for Platforms is built on top of [Cloudflare Workers](). The same security and performance models apply to applications that use Workers for Platforms. Workers for Platforms extends the capabilities of Workers for SaaS businesses that want to deploy Worker scripts on behalf of their customers or that want to let their users write Worker scripts directly.

## Definitions

Workers for Platforms introduces a new architecture model as outlined on this page.

### Dispatch namespace

A dispatch namespace is composed of a collection of User Workers. With dispatch Namespaces, a dynamic dispatch Worker can be used to call any User Worker in a namespace. Namespaces can be used to ____.

Best practice: Having a production and staging namespace is useful to test changes that you've made to your Dispatch Worker. Or, if you have multiple distinct services you're providing your customers you should split these out into different dispatch workers and namespaces. We discourage creating a new namespace for each customer. 

### Dynamic dispatch Worker

A dynamic dispatch Worker is written by Cloudflare’s platform customers to run their own logic before dispatching (routing) the request to User Workers. In addition to routing, it can be used to run authentication, create boilerplate functions and sanitize responses.

The dynamic dispatch Worker calls user Workers from the dispatch namespace and executes them. The dynamic dispatch Worker is configured with a dispatch namespace binding. This is the entrypoint for all requests to User Workers.

### User Workers

User Workers are written by end developers. End developers can deploy User Workers to script automated actions, create integrations or modify response payload to return custom content.

## Request lifecycle

![]()

Request for customer-a.example.com/api will first hit the Dispatch Worker. The dispatcher will handle routing logic to user workers based on properties of the request. In this case, the subdomain of the incoming request is used to route to the user worker with the same name. 

​​Workers for Platforms vs Service Bindings
Both Workers for Platforms and Service Bindings enable Worker-to-Worker communication. The difference is that Service Bindings explicitly link two Workers together, and they’re meant for use cases where you know exactly which Workers need to communicate with each other.

Service Bindings don’t work in the Workers for Platforms model because User Workers are uploaded ad hoc. With Dispatch Namespaces, a Dispatch Worker can be used to call any User Worker in a namespace (similar to how Service Bindings work) but without needing to explicitly pre-define the relationship.

Both Service Bindings and Workers for Platforms can be used in tandem when building applications. 




