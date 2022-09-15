---
pcx_content_type: concept
title: Using Durable Objects
weight: 10
---

# Using Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform through two features: global uniqueness and a transactional storage API.

- Global Uniqueness guarantees that there will be a single instance of a Durable Object class with a given ID running at once, across the world. Requests for a Durable Object ID are routed by the Workers runtime to the Cloudflare data center that owns the Durable Object.

- The transactional storage API provides strongly consistent key-value storage to the Durable Object. Each Object can only read and modify keys associated with that Object. Execution of a Durable Object is single-threaded, but multiple request events may still be processed out-of-order from how they arrived at the Object.

For a high-level introduction to Durable Objects, refer to [the announcement blog post](https://blog.cloudflare.com/introducing-workers-durable-objects).

For details on the specific Durable Object APIs, refer to the [Runtime API documentation](/workers/runtime-apis/durable-objects/).

[The Workers community on Discord](https://discord.gg/cloudflaredev) has a #durable-objects channel where you can ask questions, show off what you are building, and discuss Durable Objects with other developers.

## Using Durable Objects

Durable Objects are named instances of a class you define. Like a class in object-oriented programming, the class defines the methods and data a Durable Object can access.

To start, enable Durable Objects for your account by logging in to [the Cloudflare dashboard](https://dash.cloudflare.com/) > **Workers** > **Durable Objects**.

There are three steps to creating and using a Durable Object:

- [Writing the class](#writing-a-class-that-defines-a-durable-object) that defines a Durable Object.
- [Instantiating and communicating with a Durable Object](#instantiating-and-communicating-with-a-durable-object) from another Worker via the [Fetch](/workers/runtime-apis/durable-objects/#fetch-handler-method) API.
- [Uploading the Durable Object and Worker](#uploading-a-durable-object-worker) to Cloudflare's servers using Wrangler.

## Writing a class that defines a Durable Object

Before you can create and access Durable Objects, you must define their behavior by exporting an ordinary JavaScript class. Other languages will need a shim that translates their class definition to a JavaScript class.

The first parameter passed to the class constructor contains state specific to the Durable Object, including methods for accessing storage. The second parameter, `env`, contains any bindings you have associated with the Worker when you uploaded it.

```js
export class DurableObjectExample {
  constructor(state, env) {}
}
```

Note this means bindings are no longer global variables. For example, if you had a secret binding `MY_SECRET`, you must access it as `env.MY_SECRET`.

Workers communicate with a Durable Object via the Fetch API. Like a Worker, a Durable Object listens for incoming Fetch events by registering an event handler. The difference is that for Durable Objects the fetch handler is defined as a method on the class.

```js
export class DurableObjectExample {
  constructor(state, env) {}

  async fetch(request) {
    return new Response("Hello World");
  }
}
```

A Worker can pass information to a Durable Object via headers, the HTTP method, the Request body, or the Request URI.

{{<Aside type="note">}}

HTTP requests received by a Durable Object do not come directly from the Internet. They come from other Worker code – possibly other Durable Objects, or just plain Workers. Durable Objects use HTTP for familiarity, but plan to introduce other protocols in the future.

{{</Aside>}}

### Accessing Persistent Storage from a Durable Object

Durable Objects gain access to a [persistent storage API](/workers/runtime-apis/durable-objects/#transactional-storage-api) via the first parameter passed to the Durable Object constructor. While access to a Durable Object is single-threaded, it is important to remember that request executions can still interleave with each other when they wait on I/O, such as when waiting on the promises returned by persistent storage methods or `fetch` requests.

```js
export class DurableObjectExample {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    let ip = request.headers.get("CF-Connecting-IP");
    let data = await request.text();
    let storagePromise = this.state.storage.put(ip, data);
    await storagePromise;
    return new Response(ip + " stored " + data);
  }
}
```

The Durable Objects storage API employs several techniques to help you avoid subtle-yet-common storage bugs:

- Each individual storage operation is strictly ordered with respect to all others. Even if the operation completes asynchronously (requiring you to `await` a promise), the results will always be accurate as of the time the operation was invoked.

- A Durable Object can process multiple concurrent requests. However, when a storage operation is in progress (such as, when you are `await`ing the result of a `get()`), delivery of concurrent events will be paused. This ensures that the state of the Object cannot unexpectedly change while a read operation is in-flight, which would otherwise make it very hard to keep in-memory state properly synchronized with on-disk state. If desired, this behavior can be bypassed using the option [`allowConcurrency: true`](/workers/runtime-apis/durable-objects/#methods).

- If multiple write operations are performed consecutively – without `await`ing anything in the meantime – then they will automatically be coalesced and applied atomically. This means that, even in the case of a machine failure, either all of the operations will have been stored to disk, or none of them will have been.

- Write operations are queued to a write buffer, allowing calls like `put()` and `delete()` to complete immediately from the application's point of view. However, when the application initiates an outgoing network message (such as responding to a request, or invoking `fetch()`), the network request will be held until all previous writes are confirmed to be durable. This ensures that an application cannot accidentally confirm a write prematurely. If desired, this behavior can be bypassed using the option [`allowUnconfirmed: true`](/workers/runtime-apis/durable-objects/#methods).

- The storage API implements an in-memory caching layer to improve performance. Reads that hit cache will return instantly, without context-switching to another thread. When reading or writing a value where caching is not worthwhile, you may use the option [`noCache: true`](/workers/runtime-apis/durable-objects/#methods) to avoid it – but this option only affects performance, it will not change behavior.

For more discussion about these features, refer to the [Durable Objects: Easy, Fast, Correct – Choose Three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/) blog post.

### In-memory state in a Durable Object

Variables in a Durable Object will maintain state as long as your Durable Object is not evicted from memory. A common pattern is to initialize an object from persistent storage and set instance variables the first time it is accessed. Since future accesses are routed to the same object, it is then possible to return any initialized values without making further calls to persistent storage.

```js
export class Counter {
  constructor(state, env) {
    this.state = state;
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      let stored = await this.state.storage.get("value");
      // After initialization, future reads do not need to access storage.
      this.value = stored || 0;
    });
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // use this.value rather than storage
  }
}
```

A given instance of a Durable Object may share global memory with other instances of the same class. In the example above, using a global variable `value` instead of the instance variable `this.value` would be incorrect. Two different instances of `Counter` will each have their own separate memory for `this.value`, but might share memory for the global variable `value`, leading to unexpected results. Because of this, it is best to avoid global variables.

{{<Aside type="note" header="Built-in caching">}}

The Durable Object's storage has a built-in in-memory cache of its own – if you `get()` a value that was read or written recently, the result will be instantly returned from cache. Instead of writing initialization code like above, you could `get("value")` whenever you need it, and rely on the built-in cache to make this fast. Refer to the [Counter example](#example---counter) below for an example of this approach.

However, in applications with more complex state, [explicitly storing state in your Object](/workers/learning/using-durable-objects/#in-memory-state-in-a-durable-object) may be easier than making storage API calls on every access. Depending on the configuration of your project, write your code in the way that is easiest for you.

{{</Aside>}}

### WebSockets in Durable Objects

As part of Durable Objects, Workers can act as WebSocket endpoints – including as a client or as a server. Previously, Workers could proxy WebSocket connections on to a back-end server, but could not speak the protocol directly.

While technically any Worker can speak WebSocket in this way, WebSockets are most useful when combined with Durable Objects. When a client connects to your application using a WebSocket, you need a way for server-generated events to be sent back to the existing socket connection. Without Durable Objects, there is no way to send an event to the specific Worker holding a WebSocket. With Durable Objects, you can forward the WebSocket to an Object. Messages can then be addressed to that Object by its unique ID, and the Object can then forward those messages down the WebSocket to the client.

For more information, refer to [Using WebSockets](/workers/learning/using-websockets/). For an example of WebSockets in action within Durable Objects, review the [example chat application](https://github.com/cloudflare/workers-chat-demo).


### Alarms in Durable Objects

Alarms allow Durable Objects to wake themselves up by executing the `alarm()` handler at some point in the future. Alarms are modified using the [Transactional Storage API](/workers/runtime-apis/durable-objects/#transactional-storage-api), and so alarm operations follow the same rules as other storage operations. Each Durable Object instance is able to schedule a single alarm at a time by calling `setAlarm()`. Alarms have guaranteed at-least-once execution and are retried automatically when the `alarm()` handler throws. Retries are performed using exponential backoff starting at a 2 second delay from the first failure with up to 6 retries allowed.

{{<Aside type="note" header="How are alarms different from Cron Triggers?">}}

Alarms are more fine grained than Cron Triggers. A Workers service can have up to three Cron Triggers configured at once, but it can have an unlimited amount of Durable Objects each of which can have an alarm set.

Alarms are directly scheduled from within your Durable Object. Cron Triggers, on the other hand, are not programmatic. Cron Triggers execute based on their schedules, which have to be configured through the Cloudflare dashboard or API.

{{</Aside>}}

Alarms can be used to build distributed primitives, like queues or batching of work atop Durable Objects. They also provide a method for guaranteeing work within a Durable Object will complete without relying on incoming requests to keep the object alive. For more discussion about alarms, refer to the [announcement blog post](https://blog.cloudflare.com/durable-objects-alarms).

## Instantiating and communicating with a Durable Object

Durable Objects do not receive requests directly from the Internet. Durable Objects receive requests from Workers or other Durable Objects. This is achieved by configuring a binding in the calling Worker for each Durable Object class that you would like it to be able to talk to. These bindings work similarly to KV bindings and must be configured at upload time. Methods exposed by the binding can be used to communicate with particular Durable Object instances.

A binding is defined in the `wrangler.toml` file of your Worker project’s directory.

{{<Aside type="note" header="What is a binding?">}}

A binding is a how your Worker interacts with external resources such as [KV Namespaces](/workers/runtime-apis/kv/) or Durable Objects. A binding is a runtime variable that the Workers runtime provides to your code.

You can declare a variable name in your `wrangler.toml` file that will be bound to these resources at runtime, and interact with them through this variable. Every binding’s variable name and behavior is determined by you when deploying the Worker. Refer to the [Environment Variables](/workers/platform/environment-variables/) documentation for more information.

{{</Aside>}}

When a Worker talks to a Durable Object, it does so through a stub object. The class binding's `get()` method returns a stub to the particular Durable Object instance, and the stub's `fetch()` method sends HTTP [Requests](/workers/runtime-apis/request/) to the instance.

The fetch handler in the example below implements the Worker that talks to the Durable Object. Note that the fetch handler is written using a new kind of Workers syntax based on ES Modules. This syntax is required for scripts that export Durable Objects classes, but is not required for scripts that make calls to Durable Objects. However, Workers written in the modules syntax (including Durable Objects) cannot share a script with Workers written in the Service Worker syntax.

We recommend following this approach of implementing Durable Objects and a corresponding fetch handler in the same script (written in the modules format) for convenience, but it is not required.

ES Modules differ from regular JavaScript files in that they have imports and exports. [As shown earlier](/workers/learning/using-durable-objects/#writing-a-class-that-defines-a-durable-object), you wrote `export class DurableObjectExample` when defining our class. To implement a fetch handler, you must export a method named `fetch` in an `export default {}` block.

```js
// In modules-syntax workers, you use `export default` to export your script's
// main event handlers, such as the `fetch` handler for receiving HTTP
// requests. In pre-modules workers, the fetch handler was registered using
// `addEventHandler("fetch", event => { ... })`; this is just new syntax for
// essentially the same thing.
export default {
  // In modules-syntax workers, bindings are delivered as a property of the
  // environment object passed as the second parameter when an event handler or
  // class constructor is invoked. This is new compared to pre-ES Module workers,
  // in which bindings show up as global variables.
  async fetch(request, env) {
    // Derive an object ID from the URL path. `EXAMPLE_CLASS` is the Durable
    // Object binding that you will read how to configure in the next section.
    // `EXAMPLE_CLASS.idFromName()` always returns the same ID when given the
    // same string as input (and called on the same class), but never the same
    // ID for two different strings (or for different classes). So, in this
    // case, you are creating a new object for each unique path.
    let id = env.EXAMPLE_CLASS.idFromName(new URL(request.url).pathname);

    // Construct the stub for the Durable Object using the ID. A stub is a
    // client object used to send messages to the Durable Object.
    let stub = env.EXAMPLE_CLASS.get(id);

    // Forward the request to the Durable Object. Note that `stub.fetch()` has
    // the same signature as the global `fetch()` function, except that the
    // request is always sent to the object, regardless of the request's URL.
    //
    // The first time you send a request to a new object, the object will be
    // created for us. If you do not store durable state in the object, it will
    // automatically be deleted later (and recreated if you request it again).
    // If you do store durable state, then the object may be evicted from memory
    // but its durable state will be kept around permanently.
    let response = await stub.fetch(request);

    // You received an HTTP response back. You could process it in the usual
    // ways, but in this case, you will just return it to the client.
    return response;
  },
};
```

Learn more about communicating with a Durable Object in the [Workers Durable Objects API reference](/workers/runtime-apis/durable-objects/#accessing-a-durable-object-from-a-worker).

{{<Aside type="note" header="String-derived IDs versus system-generated IDs">}}

In the above example, you used a string-derived object ID by calling the `idFromName()` function on the binding. You can also ask the system to generate random unique IDs. System-generated unique IDs have better performance characteristics, but require that you store the ID somewhere in order to access the object again later. Refer to the [API reference documentation](/workers/runtime-apis/durable-objects/#accessing-a-durable-object-from-a-worker) for more information.

{{</Aside>}}

## Uploading a Durable Object Worker

{{<Aside type="warning" header="Custom Wrangler installation instructions">}}

You must use [Wrangler version 1.19.3 or greater](/workers/wrangler/get-started/) in order to manage Durable Objects.

{{</Aside>}}

The easiest way to upload Workers that implement or bind to Durable Objects is to use [Wrangler](/workers/wrangler/), the Workers CLI. You can start with one of our templates, the simplest of which can be used by running:

```sh
$ git clone https://github.com/cloudflare/durable-objects-template
$ cd durable-objects-template
$ wrangler dev
```

This will create a directory for your project with basic configuration and a single JavaScript source file already set up. If you want to use TypeScript, or be able to bundle external dependencies with your code using Rollup or Webpack, or to use CommonJS modules rather than ES modules, try one of the other starter templates instead:

- [Durable Objects Rollup ES Modules template](https://github.com/cloudflare/durable-objects-rollup-esm)
- [Durable Objects TypeScript Rollup ES Modules template](https://github.com/cloudflare/durable-objects-typescript-rollup-esm)
- [Durable Objects Webpack CommonJS template](https://github.com/cloudflare/durable-objects-webpack-commonjs)

The following sections will cover how to customize the configuration, but you can also immediately publish the generated project using the [`wrangler publish`](/workers/wrangler/commands/) command.

### Specifying the main module

Workers that use ES Modules syntax must have a main module specified from which all Durable Objects and event handlers are exported. The file that should be treated as the main module is configured using the `"main"` key in the `[build.upload]` section of `wrangler.toml`. Refer to the [modules section of the custom builds documentation](/workers/wrangler/configuration/#modules) for more details.

### Configuring Durable Object bindings

Durable Objects bindings can be configured in `wrangler.toml` by providing the class name and script name whose objects you wish to access using the binding. The script name can be omitted when creating a binding for a class that is defined in the same Worker as the binding.

```toml
[durable_objects]
bindings = [
  { name = "EXAMPLE_CLASS", class_name = "DurableObjectExample" } # Binding to our DurableObjectExample class
]
```

The `[durable_objects]` section has 1 subsection:

- `bindings` - An array of tables, each table can contain the below fields.
  - `name` - Required. The binding name to use within your Worker.
  - `class_name` - Required. The class name you wish to bind to.
  - `script_name` - Optional. Defaults to the current [environment's](/workers/platform/environments/) script.

If you are using Wrangler [environments](/workers/platform/environments/), you must specify any Durable Object bindings you wish to use on a per-environment basis. Durable Object bindings are not inherited. For example, an environment named `staging`:

```toml
[env.staging]
durable_objects.bindings = [
  {name = "EXAMPLE_CLASS", class_name = "DurableObjectExample"}
]
```

Because Wrangler [appends the environment name to the top-level name](/workers/platform/environments/#naming) when publishing, for a Worker named `worker-name` the above example is equivalent to:

```toml
[env.staging]
durable_objects.bindings = [
  {name = "EXAMPLE_CLASS", class_name = "DurableObjectExample", script_name = "worker-name-staging"}
]
```

Note that `"EXAMPLE_CLASS"` in the staging environment is bound to a different script name compared to the top-level `"EXAMPLE_CLASS"` binding, and will therefore access different objects with different persistent storage. If you want an environment-specific binding that accesses the same objects as the top-level binding, specify the top-level script name explicitly:

```toml
[env.another]
durable_objects.bindings = [
  {name = "EXAMPLE_CLASS", class_name = "DurableObjectExample", script_name = "worker-name"}
]
```

### Configuring Durable Object classes with migrations

When you make changes to your list of Durable Objects classes, you must initiate a migration process. A migration is informing the Workers platform of the changes and provide it with instructions on how to deal with those changes.

The most common migration performed is a new class migration, which informs the system that a new Durable Object class is being uploaded.

Migrations can also be used for transferring stored data between two Durable Object classes:

- Rename migrations are used to transfer stored objects between two Durable Object classes in the same script.
- Transfer migrations are used to transfer stored objects between two Durable Object classes in different scripts.

The destination class (the class that stored objects are being transferred to) for a rename or transfer migration must be exported by the deployed script.

{{<Aside type="warning" header="Important">}}

After a rename or transfer migration, requests to the destination Durable Object class will have access to the source Durable Object's stored data.

After a migration, any existing bindings to the original Durable Object class (for example, from other Workers) will automatically forward to the updated destination class. However, any Worker scripts bound to the updated Durable Object class must update their `[durable_objects]` configuration in the `wrangler.toml` file for their next deployment.

{{</Aside>}}

Migrations can also be used to delete a Durable Object class and its stored objects.

{{<Aside type="warning" header="Important">}}

Running a delete migration will delete all Durable Object instances associated with the deleted class, including all of their stored data. Do not run a delete migration on a class without first ensuring that you are not relying on the Durable Objects within that class anymore. Copy any important data to some other location before deleting.

{{</Aside>}}

### Durable Object migrations in `wrangler.toml`

Migrations are performed through the `[[migrations]]` configurations key in your `wrangler.toml` file. Migrations require a migration tag, which is defined by the `tag` property in each migration entry. Migration tags are treated like unique names and are used to determine which migrations have already been applied. Once a given script has a migration tag set on it, all future script uploads must include a migration tag.

The migration list is an ordered array of tables, specified as a top-level key in your `wrangler.toml` file. The migration list is inherited by all environments and cannot be overridden by a specific environment.

All migrations are applied at deployment. Each migration can only be applied once per [environment](/workers/platform/environments/).

To illustrate an example migrations workflow, the `DurableObjectExample` class can be initially defined with:

```toml
[[migrations]]
tag = "v1" # Should be unique for each entry
new_classes = ["DurableObjectExample"] # Array of new classes
```

Each migration in the list can have multiple directives, and multiple migrations can be specified as your project grows in complexity. For example, you may want to rename the `DurableObjectExample` class to `UpdatedName` and delete an outdated `DeprecatedClass` entirely.

```toml
[[migrations]]
tag = "v1" # Should be unique for each entry
new_classes = ["DurableObjectExample"] # Array of new classes

[[migrations]]
tag = "v2"
renamed_classes = [{from = "DurableObjectExample", to = "UpdatedName" }] # Array of rename directives
deleted_classes = ["DeprecatedClass"] # Array of deleted class names
```

{{<Aside type="note">}}

Note that `.toml` files do not allow line breaks in inline tables (the `{key = "value"}` syntax), but line breaks in the surrounding inline array are acceptable.

{{</Aside>}}

### Durable Object migrations through Wrangler CLI

{{<Aside type="warning" header="Deprecation Notice">}}

While CLI migrations initially served a way to quickly migrate Durable Objects, this method is now deprecated and will be removed in a future release.

{{</Aside>}}

It is possible to define a migration purely through extra arguments to the `wrangler publish` command. When taking this route, any migrations listed in the `wrangler.toml` configuration file are ignored.

You should provide an `--old-tag` value whenever possible. This value should be the name of the migration tag that you believe to be most recently active. Your `wrangler publish` command will throw an error if your `--old-tag` expectation does not align with Cloudflare's value.

The list of CLI migration arguments that can be added to `wrangler publish` is as follows:

```sh
--old-tag <tag name> # Optional if your script does not have a migration tag set yet.
--new-tag <tag name> # new-tag and old-tag are optional if you only use CLI migrations.

# Each of the migration directives can be specified multiple times if you are
# creating/deleting/renaming/transferring multiple classes at once.
--new-class <class name>
--delete-class <class name>
--rename-class <from class> <to class>
--transfer-class <from script> <from class> <to class>
```

### Test your Durable Objects project

If you copy the `DurableObjectExample` and fetch handler code from above into a generated Wrangler project, publish it using a `--new-class` migration, and make a request to it, you will notice that your request was stored in a Durable Object:

```sh
$ curl -H "Content-Type: text/plain" https://<worker-name>.<your-namespace>.workers.dev/ --data "important data!"
***.***.***.*** stored important data!
```

As you write Durable Objects, find more helpful details in the [Durable Objects runtime API documentation](/workers/runtime-apis/durable-objects/).

[Miniflare](https://github.com/cloudflare/miniflare) includes helpful tools for mocking and testing your Durable Objects.

## Limits

Refer to the [Durable Objects section of the Limits page](/workers/platform/limits/#durable-objects) for relevant usage limits.

## Limitations

Durable Objects is generally available. However, there are some known limitations.

### Global Uniqueness

Uniqueness is enforced upon starting a new event (such as receiving an HTTP request), and upon accessing storage. After an event is received, if the event takes some time to execute and does not ever access its durable storage, then it is possible that the Durable Object instance may no longer be current, and some other instance of the same Object ID will have been created elsewhere. If the event accesses storage at this point, it will receive an exception. If the event completes without ever accessing storage, it may not ever realize that the Object was no longer current.

In particular, a Durable Object may be superseded in this way in the event of a network partition or a software update (including either an update of the Durable Object's class code, or of the Workers system itself).

### Development tools

[Wrangler tail](/workers/wrangler/commands/#tail) logs from requests that are upgraded to WebSockets are delayed until the WebSocket is closed. Wrangler tail should not be connected to a script that you expect will receive heavy volumes of traffic.

The Workers editor in [the Cloudflare dashboard](https://dash.cloudflare.com/) allows you to interactively edit and preview your Worker and Durable Objects. Note that in the editor Durable Objects can only be talked to by a preview request if the Worker being previewed both exports the Durable Object class and binds to it. Durable Objects exported by other Workers cannot be talked to in the editor preview.

[`wrangler dev`](/workers/wrangler/commands/#dev) has read access to Durable Object storage, but writes will be kept in memory and will not affect persistent data. However, if you specify the `script_name` explicitly in the Durable Object binding, then writes will affect persistent data. [Wrangler 2](/workers/wrangler/compare-v1-v2/) will emit a warning in that case. 

### Object location

Not all Cloudflare locations host Durable Objects, so Objects may not be created in the same data center where they are first requested.

Currently, Durable Objects do not migrate between locations after initial creation. Cloudflare will be exploring automatic migration compatibility in the future.

### Performance

Using Durable Objects will often add response latency, as the request must be forwarded to the data center where the object is located. Because objects are usually located near where they were first requested, it can be bad for latency to precreate objects from a single location such as your development workstation. It is better for latency to create objects in response to actual production traffic.

## Example - Counter

The complete example code is included for both the Worker and the Durable Object for a basic counter below. Refer [to GitHub](https://github.com/cloudflare/durable-objects-template) for the full code template.

```js
// Worker

export default {
  async fetch(request, env) {
    return await handleRequest(request, env);
  },
};

async function handleRequest(request, env) {
  let url = new URL(request.url);
  let name = url.searchParams.get("name");
  if (!name) {
    return new Response(
      "Select a Durable Object to contact by using" +
        " the `name` URL query string parameter. e.g. ?name=A"
    );
  }

  // Every unique ID refers to an individual instance of the Counter class that
  // has its own state. `idFromName()` always returns the same ID when given the
  // same string as input (and called on the same class), but never the same
  // ID for two different strings (or for different classes).
  let id = env.COUNTER.idFromName(name);

  // Construct the stub for the Durable Object using the ID. A stub is a
  // client object used to send messages to the Durable Object.
  let obj = env.COUNTER.get(id);

  // Send a request to the Durable Object, then await its response.
  let resp = await obj.fetch(request.url);
  let count = await resp.text();

  return new Response(`Durable Object '${name}' count: ${count}`);
}

// Durable Object

export class Counter {
  constructor(state, env) {
    this.state = state;
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // Apply requested action.
    let url = new URL(request.url);

    // Durable Object storage is automatically cached in-memory, so reading the
    // same key every request is fast. (That said, you could also store the
    // value in a class member if you prefer.)
    let value = (await this.state.storage.get("value")) || 0;

    switch (url.pathname) {
      case "/increment":
        ++value;
        break;
      case "/decrement":
        --value;
        break;
      case "/":
        // Just serve the current value.
        break;
      default:
        return new Response("Not found", { status: 404 });
    }

    // You do not have to worry about a concurrent request having modified the
    // value in storage because "input gates" will automatically protect against
    // unwanted concurrency. So, read-modify-write is safe. For more details,
    // refer to: https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/
    await this.state.storage.put("value", value);

    return new Response(value);
  }
}
```

## Related resources

- [Durable Objects runtime API](/workers/runtime-apis/durable-objects/)

## Troubleshooting

### Debugging

[`wrangler dev`](/workers/wrangler/commands/#dev) and [`wrangler tail`](/workers/wrangler/commands/#tail) are both available to help you debug your Durable Objects.

The `wrangler dev` command opens up a tunnel from your local development environment to Cloudflare's network edge, letting you test your Durable Objects code in the Workers environment as you write it.

`wrangler tail` displays a live feed of console and exception logs for each request served by your script, including both normal Worker requests and Durable Object requests. After doing a `wrangler publish`, you can use `wrangler tail` in the root directory of your Worker project and visit your Worker URL to see console and error logs in your terminal.

### GraphQL Analytics

Durable Object metrics are powered by GraphQL, like other Workers metrics. Learn more about querying Workers data sets in this [tutorial](/analytics/graphql-api/tutorials/querying-workers-metrics/). The data sets that include Durable Object metrics include `durableObjectsInvocationsAdaptiveGroups`, `durableObjectsPeriodicGroups`, `durableObjectsStorageGroups`, and `durableObjectsSubrequestsAdaptiveGroups`. You can [use GraphQL introspection to get information on the fields exposed by each](/analytics/graphql-api/getting-started/explore-graphql-schema).

### Common errors

#### Error: `No event handlers were registered. This script does nothing.`

In your `wrangler.toml` file, make sure the `dir` and `main` entries point to the correct file containing your Worker script, and that the file extension is `.mjs` instead of `.js` if using ES Modules Syntax.

#### Error when deleting migration

When deleting a migration using `wrangler publish --delete-class <ClassName>`, you may encounter this error: `"Cannot apply --delete-class migration to class <ClassName> without also removing the binding that references it"`. You should remove the corresponding binding under `[durable_objects]` in `wrangler.toml` before attempting to apply `--delete-class` again.

#### Error: Durable Object is overloaded.

A single instance of a Durable Object cannot do more work than is possible on a single thread. These errors mean the Durable Object has too much work to keep up with incoming requests:

- `Error: Durable Object is overloaded. Too many requests queued.` The total count of queued requests is too high.
- `Error: Durable Object is overloaded. Too much data queued.` The total size of data in queued requests is too high.
- `Error: Durable Object is overloaded. Requests queued for too long.` The oldest request has been in the queue too long.

To solve this you can either do less work per request, or send fewer requests, for example, by splitting the requests among more instances of the Durable Object.

#### Error: Durable Object storage operation exceeded timeout which caused object to be reset.

To prevent indefinite locking, there is a limit on how much time storage operations can take. In objects containing a sufficiently large number of key-value pairs, `deleteAll()` may hit that time limit and fail. When this happens, note that each `deleteAll()` call does make progress and that it is safe to retry until it succeeds. Otherwise contact your Cloudflare account team.

#### Error: Your account is generating too much load on Durable Objects. Please back off and try again later.

There is a limit on how quickly you can [create new objects or lookup different existing objects](/workers/runtime-apis/durable-objects/#obtaining-an-object-stub). Those lookups are usually cached, meaning attempts for the same set of recently accessed objects should be successful, so catching this error and retrying after a short wait is safe. If possible, also consider spreading those lookups across multiple requests.
