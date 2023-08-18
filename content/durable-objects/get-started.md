---
weight: 1
title: Get started
pcx_content_type: get-started
---

# Get started

This guide will instruct you through:

- Writing a class that defines a Durable Object.
- Instantiating and communicating with a Durable Object from another Worker via the `Fetch` API.
- Deploying a Durable Object.

{{<render file="_prereqs.md" productFolder="workers">}}

## 1. Enable Durable Objects in the dashboard

To enable Durable Objects, you will need to purchase the Workers Paid plan:

 1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
 2. Go to **Workers & Pages** > **Plans**. 
 3. Select **Purchase Workers Paid** and complete the payment process to enable Durable Objects.

 ## 2. Create a Worker project

You will access your Durable Object from a [Worker](/workers/). Your Worker application is an interface to interact with your Durable Object.

To create a Worker project, run:

{{<tabs labels="npm | yarn">}}
{{<tab label="npm" default="true">}}

```sh
$ npm create cloudflare@latest
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn create cloudflare@latest
```

{{</tab>}}
{{</tabs>}}

Running `create cloudlfare` will install [Wrangler](/workers/wrangler/install-and-update/), the Workers CLI. You will use Wrangler to test and deploy your project.

In your terminal, you will be asked a series of questions related to your project: 

1. Name your new Worker directory by specifying where you want to create your application.
2. Select `"Hello World" script` as the type of application you want to create.
3. Answer `no` to using TypeScript.
4. Answer `no` to using Git.
5. Answer `no` to deploying your Worker.

This will create a new directory, which will include both a `src/worker.js` file to write your code, and a [`wrangler.toml`](/workers/wrangler/configuration/) configuration file. After you create your Worker, create a class to define a Durable Object.

## 3. Write a class to define a Durable Object

Before you create and access a Durable Object, you must define its behavior by exporting an ordinary JavaScript class. 

{{<Aside type="note">}}
If you do not use JavaScript, you will need a [shim](https://developer.mozilla.org/en-US/docs/Glossary/Shim) to translate your class definition to a JavaScript class.
{{</Aside>}}

Your `DurableObjectExample` class will have a constructor with two parameters. The first parameter, `state`, passed to the class constructor contains state specific to the Durable Object, including methods for accessing storage. The second parameter, `env`, contains any bindings you have associated with the Worker when you uploaded it. 

Note that this means bindings are no longer global variables. For example, if you had a secret binding with a `binding` name of `MY_SECRET`, you must access it as `env.MY_SECRET`.

```js
---
filename: worker.js
---
export class DurableObjectExample {
  constructor(state, env) {}
}
```
Workers communicate with a Durable Object via the fetch API. Like a Worker, a Durable Object listens for incoming fetch events by registering an event handler. For a Durable Object, the fetch handler is defined as a method on the class.

Your `worker.js` file should now look like:

```js
---
filename: worker.js
---
export class DurableObjectExample {
  constructor(state, env) {}

  async fetch(request) {
    return new Response("Hello World");
  }
}
```

A Worker can pass information to a Durable Object via headers, the HTTP method, the Request body, or the Request URI.

{{<Aside type="note">}}

HTTP requests received by a Durable Object do not come directly from the Internet. HTTP requests come from other Workers and other Durable Objects. Durable Objects use HTTP for familiarity, but plan to introduce other protocols in the future.

{{</Aside>}}

## 4. Instantiate and communicate with a Durable Object

The `fetch()` handler allows you to instantiate and communicate to a Durable Object from a Worker. 

{{<Aside type="note">}}
Durable Objects do not receive requests directly from the Internet. Durable Objects receive requests from Workers or other Durable Objects. 
This is achieved by configuring a binding in the calling Worker for each Durable Object class that you would like it to be able to talk to. These bindings must be configured at upload time. Methods exposed by the binding can be used to communicate with particular Durable Object instances.
{{</Aside>}}

To communicate with a Durable Object, add the following to your `worker.js` file's existing class and fetch handler :

```js
---
filename: worker.js
---
export default {

  async fetch(request, env) {

    let id = env.EXAMPLE_CLASS.idFromName(new URL(request.url).pathname);

    let stub = env.EXAMPLE_CLASS.get(id);

    let response = await stub.fetch(request);

    return response;
  },
};
```

In the code above, you have:

1. Exported your Worker's main event handlers, such as the `fetch()` handler for receiving HTTP requests.
2. Passed `env` into the `fetch()` handler. Bindings are delivered as a property of the environment object passed as the second parameter when an event handler or class constructor is invoked. By calling the `idFromName()` function on the binding, you use a string-derived object ID. You can also ask the system to [generate random unique IDs](/durable-objects/how-to/access-durable-object-from-a-worker/#generate-ids-randomly). System-generated unique IDs have better performance characteristics, but require you to store the ID somewhere to access the Object again later. 
3. Derived an object ID from the URL path. `EXAMPLE_CLASS.idFromName()` always returns the same ID when given the same string as input (and called on the same class), but never the same ID for two different strings (or for different classes). In this case, you are creating a new object for each unique path. 
4. Constructed the stub for the Durable Object using the ID. A stub is a client object used to send messages to the Durable Object.
5. Forwarded the request to the Durable Object. `stub.fetch()` has the same signature as the global `fetch()` function, except that the request is always sent to the object, regardless of the request's URL.  The first time you send a request to a new object, the object will be created for us. If you do not store durable state in the object, it will automatically be deleted later (and recreated if you request it again). If you store durable state, then the object may be evicted from memory but its durable state will be kept  permanently.
6. Received an HTTP response back to the client with `return response`.

Refer to [Access a Durable Object from a Worker](/durable-objects/how-to/access-durable-object-from-a-worker/) to learn more about communicating to a Durable Object.

## 5. Configure Durable Object bindings

[Bindings](/workers/configuration/bindings/) allow your Workers to interact with resources on the Cloudflare developer platform. Configure Durable Object bindings in your Worker project's `wrangler.toml` by providing a binding name (for this guide, use `EXAMPLE_CLASS`) and the class name (`DurableObjectExample`).

```toml
---
filename: wrangler.toml
---
[[durable_objects.bindings]]
name = "EXAMPLE_CLASS"
class_name = "DurableObjectExample"

# or

[durable_objects]
bindings = [
  { name = "EXAMPLE_CLASS", class_name = "DurableObjectExample" }
]
```

The `[[durable_objects.bindings]]` section contains the following fields:

  - `name` - Required. The binding name to use within your Worker.
  - `class_name` - Required. The class name you wish to bind to.
  - `script_name` - Optional. Defaults to the current [environment's](/durable-objects/platform/environments/) Worker code.

## 6. Configure Durable Object classes with migrations

A migration is a mapping process from a class name to a runtime state. You perform a migration when creating a new Durable Object class, renaming, deleting and transferring an existing Durable Object class. 

Migrations are performed through the `[[migrations]]` configurations key in your `wrangler.toml` file.  

To configure a Durable Object migration in your Worker's `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---
[[migrations]]
tag = "v1" # Should be unique for each entry
new_classes = ["DurableObjectExample"] # Array of new classes
```
Refer to [Durable Objects migrations](/durable-objects/learning/durable-objects-migrations/) to learn more about the migration process.

## 7. Develop a Durable Object Worker locally

To test your Durable Object locally, run [`wrangler dev`](/workers/wrangler/commands/#dev):

```sh
$ wrangler dev
```

## 8. Deploy your Durable Object Worker

To deploy your Durable Object Worker:

```sh
$ npx wrangler deploy
```

Once deployed, you should be able to see your newly created Durable Object Worker on the [Cloudflare dashboard](https://dash.cloudflare.com/), **Workers & Pages** > **Overview**.

Preview your Durable Object Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

By finishing this tutorial, you have successfully created, tested and deployed a Durable Object.
### Related resources
- [Access a Durable Object from a Worker](/durable-objects/how-to/access-durable-object-from-a-worker/).
- [Create Durable Object stubs](/durable-objects/how-to/create-durable-object-stubs/).
- [Miniflare](https://github.com/cloudflare/miniflare) includes helpful tools for mocking and testing your Durable Objects.