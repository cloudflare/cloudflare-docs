---
type: example
summary: Create a simple Durable Object.
tags:
  - Durable Objects
pcx_content_type: configuration
title: Durable Object example
weight: 3
layout: example
---

```js
// Worker

export default {
  async fetch(request, env) {
    return await handleRequest(request, env);
  }
}

async function handleRequest(request, env) {
  let id = env.LOCATION.idFromName("A");
  let obj = env.LOCATION.get(id);
  // Forward the request to the remote Durable Object.
  let resp = await obj.fetch(request);
  // Return the response to the client.
  return new Response(await resp.text());
}

// Durable Object
export class Location {
  constructor(state, env) {
    this.state = state;
    // Upon construction, we do not have a location to provide.
    // This value will be updated as people access the Durable Object.
    // When the Durable Object is evicted from memory, this will be reset./**
    this.location = null
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    let response = null

    if (this.location == null) {
      response = new String(`
This is the first request, we called the constructor, so this.location was null.
We will set this.location to be your city: (${request.cf.city}). Try reloading the page.`);
    } else {
      response = new String(`
The Durable Object was already loaded and running because it recently handled a request.

Previous Location: ${this.location}
New Location: ${request.cf.city}`);
    }

    // We set the new location to be the new city.
    this.location = request.cf.city;
    console.log(response);
    return new Response(response);
  }
}
```