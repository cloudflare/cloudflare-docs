---
pcx_content_type: concept
title: Limitations
---

# Limitations

Durable Objects is generally available. However, there are some known limitations.

## Global Uniqueness

Uniqueness is enforced upon starting a new event (such as receiving an HTTP request), and upon accessing storage. After an event is received, if the event takes some time to execute and does not ever access its durable storage, then it is possible that the Durable Object instance may no longer be current, and some other instance of the same Object ID will have been created elsewhere. If the event accesses storage at this point, it will receive an exception. If the event completes without ever accessing storage, it may not ever realize that the Object was no longer current.

In particular, a Durable Object may be superseded in this way in the event of a network partition or a software update (including either an update of the Durable Object's class code, or of the Workers system itself). Enabling `wrangler tail` or dashboard logs requires a software update.

## Development tools

[Wrangler tail](/workers/wrangler/commands/#tail) logs from requests that are upgraded to WebSockets are delayed until the WebSocket is closed. Wrangler tail should not be connected to a script that you expect will receive heavy volumes of traffic.

The Workers editor in [the Cloudflare dashboard](https://dash.cloudflare.com/) allows you to interactively edit and preview your Worker and Durable Objects. Note that in the editor Durable Objects can only be talked to by a preview request if the Worker being previewed both exports the Durable Object class and binds to it. Durable Objects exported by other Workers cannot be talked to in the editor preview.

[`wrangler dev`](/workers/wrangler/commands/#dev) has read access to Durable Object storage, but writes will be kept in memory and will not affect persistent data. However, if you specify the `script_name` explicitly in the Durable Object binding, then writes will affect persistent data. [Wrangler](/workers/wrangler/) will emit a warning in that case. 

## Object location

A Durable Object is typically instantiated close to where the initial [`get()`](/workers/runtime-apis/durable-objects/#obtaining-an-object-stub) is made. This may not be in the datacenter the user is connected to, but in most cases, it will be in close proximity.

You can also provide an explicit [location hint](/workers/runtime-apis/durable-objects/#providing-a-location-hint) and submit a preferred location when first creating the Durable Object. This can be useful in cases where objects are created programmatically prior to user-interaction, or where the first client request is not representative of where the majority of requests to the object will come from.

Currently, Durable Objects do not migrate between locations after initial creation. Cloudflare will be exploring automatic migration compatibility in the future.

## Performance

Using Durable Objects will often add response latency, as the request must be forwarded to the data center where the object is located. Because objects are usually located near where they were first requested, it can be bad for latency to precreate objects from a single location such as your development workstation. It is better for latency to create objects in response to actual production traffic.