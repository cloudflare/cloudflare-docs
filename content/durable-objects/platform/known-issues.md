---
pcx_content_type: concept
title: Known issues
---

# Known issues

Durable Objects is generally available. However, there are some known issues.

## Global uniqueness

Global uniqueness guarantees there is only a single instance of a Durable Object class with a given ID running at once, across the world.

Uniqueness is enforced upon starting a new event (such as receiving an HTTP request), and upon accessing storage. 

After an event is received, if the event takes some time to execute and does not ever access its durable storage, then it is possible that the Durable Object instance may no longer be current, and some other instance of the same Durable Object ID will have been created elsewhere. If the event accesses storage at this point, it will receive an [exception](/durable-objects/reference/troubleshooting/). If the event completes without ever accessing storage, it may not ever realize that the Durable Object was no longer current.

A Durable Object may be replaced in the event of a network partition or a software update (including either an update of the Durable Object's class code, or of the Workers system itself). Enabling `wrangler tail` or [Cloudflare dashboard](https://dash.cloudflare.com/) logs requires a software update.

## Code updates

Code changes for Workers and Durable Objects are released globally in an eventually consistent manner. Because Durable Objects are globally unique, the situation can arise that a Worker is running in a part of the world that has been updated and a Durable Object can be running in a part of the world that has not yet been updated, or vice versa. For this reason, it is best practice to ensure that API changes between Workers and Durable Objects are forward and backward compatible across code updates.

## Development tools

[`wrangler tail`](/workers/wrangler/commands/#tail) logs from requests that are upgraded to WebSockets are delayed until the WebSocket is closed. `wrangler tail` should not be connected to a Worker that you expect will receive heavy volumes of traffic.

The Workers editor in the [Cloudflare dashboard](https://dash.cloudflare.com/) allows you to interactively edit and preview your Worker and Durable Objects. In the editor, Durable Objects can only be talked to by a preview request if the Worker being previewed both exports the Durable Object class and binds to it. Durable Objects exported by other Workers cannot be talked to in the editor preview.

[`wrangler dev`](/workers/wrangler/commands/#dev) has read access to Durable Object storage, but writes will be kept in memory and will not affect persistent data. However, if you specify the `script_name` explicitly in the [Durable Object binding](/workers/configuration/bindings/#durable-object-bindings), then writes will affect persistent data. Wrangler will emit a warning in that case.
