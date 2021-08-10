---
order: 8
pcx-content-type: concept
---

# Using Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform through two features: global uniqueness and a transactional storage API.

* Global Uniqueness guarantees that there will be a single Durable Object with a given id running at once, across the whole world.  Requests for a Durable Object id are routed by the Workers runtime to the Cloudflare point-of-presence that owns the Durable Object.

* The transactional storage API provides strongly-consistent key-value storage to the Durable Object.  Each Object can only read and modify keys associated with that Object. Execution of a Durable Object is single-threaded, but multiple request events may be processed out-of-order from how they arrived at the Object.

For a high-level introduction to Durable Objects, [see the announcement blog post](https://blog.cloudflare.com/introducing-workers-durable-objects).

<Aside type="warning" header="Beta">

Durable Objects are currently in beta and are available to anyone with a Workers subscription. You can enable them for your account in [the Cloudflare dashboard](https://dash.cloudflare.com/) by navigating to “Workers” and then “Durable Objects”.

</Aside>

## Using Durable Objects

Durable Objects are named instances of a class you define.  Just like a class in object-oriented programming, the class defines the methods and data a Durable Object can access.

There are three steps to creating and using a Durable Object:

* [__Writing the class__](#writing-a-class-that-defines-a-durable-object) that defines a Durable Object.
* [__Instantiating and communicating with a Durable Object__](#instantiating-and-communicating-with-a-durable-object) from another Worker via the Fetch API.
* [__Uploading the Durable Object and Worker__](#uploading-a-durable-object-worker) to Cloudflare's servers using Wrangler.

## Writing a class that defines a Durable Object

Before you can create and access Durable Objects, you must define their behavior by exporting an ordinary JavaScript class. Other languages will need a shim that translates their class definition to a JavaScript class.

The first parameter passed to the class constructor contains state specific to the Durable Object, including methods for accessing storage. The second parameter, `env`, contains any bindings you have associated with the Worker when you uploaded it.

```js
export class DurableObjectExample {
    constructor(state, env) {
    }
}
```

Note this means bindings are no longer global variables. E.g. if you had a secret binding `MY_SECRET`, you must access it as `env.MY_SECRET`.

Workers communicate with a Durable Object via the fetch API.  Like a Worker, a Durable Object listens for incoming Fetch events by registering an event handler. The only difference is that for Durable Objects the fetch handler is defined as a method on the class.

```js
export class DurableObjectExample {
    constructor(state, env) {
    }

    async fetch(request) {
        return new Response('Hello World');
    }

}
```

A Worker can pass information to a Durable Object via headers, the HTTP method, the Request body, or the Request URI.

<Aside>

HTTP requests received by a Durable Object do not come directly from the Internet. They come from other Worker code -- possibly other Durable Objects, or just plain Workers. We'll see how to send such a request in a bit. Durable Objects use HTTP for familiarity, but we plan to introduce other protocols in the future.

</Aside>

### Accessing Persistent Storage from a Durable Object

Durable Objects gain access to a [persistent storage API](/runtime-apis/durable-objects#transactional-storage-api) via the first parameter passed to the Durable Object constructor.  While access to a Durable Object is single-threaded, it's important to remember that request executions can still interleave with each other when they wait on I/O, such as when waiting on the promises returned by persistent storage methods or `fetch` requests.

```js
export class DurableObjectExample {
    constructor(state, env) {
        this.state = state;
    }

    async fetch(request) {
        let ip = request.headers.get('CF-Connecting-IP');
        let data = await request.text();
        let storagePromise = this.state.storage.put(ip, data);
        await storagePromise;
        return new Response(ip + ' stored ' + data);
    }

}
```

Each individual storage operation behaves like a database transaction. More complex use cases can wrap multiple storage statements in a transaction. For example, this Durable Object puts a key if and only if its current value matches the provided "If-Match" header value:

```js
export class DurableObjectExample {
    constructor(state, env) {
        this.state = state;
    }

    async fetch(request) {
        let key = new URL(request.url).host
        let ifMatch = request.headers.get('If-Match');
        let newValue = await request.text();
        let changedValue = false;
        await this.state.storage.transaction(async txn => {
            let currentValue = await txn.get(key);
            if (currentValue != ifMatch && ifMatch != '*') {
                txn.rollback();
                return;
            }
            changedValue = true;
            await txn.put(key, newValue);
        });
        return new Response("Changed: " + changedValue);
    }

}
```

Transactions operate at a [serializable isolation level](https://en.wikipedia.org/wiki/Isolation_(database_systems)#Serializable).  This means transactions can fail if they conflict with a concurrent transaction being run by the same Durable Object.

Transactions are transparently and automatically retried once by rerunning the provided function before returning an error.  To avoid transaction conflicts, don't use transactions when you don't need them, don't hold transactions open any longer than necessary, and limit the number of key-value pairs operated on by each transaction.

<Aside>

Since each Durable Object is single-threaded, technically it is not necessary to use transactions to achieve transactional semantics. With careful use of promises, you could serialize operations in your live object so that there's no possibility of concurrent storage operations. We provide the transactional interface as a convenience for those who don't want to do their own synchronization.

</Aside>

### In-memory state in a Durable Object

Variables in a Durable Object will maintain state as long as your Durable Object is not evicted from memory.  A common pattern is to initialize an object from persistent storage and set class variables the first time it is accessed.  Since future accesses are routed to the same object, it is then possible to return any initialized values without making further calls to persistent storage.

This is shown in the [Counter example](#example---counter) below, which is partially shown here.

```js
export class Counter {
    constructor(state, env) {
        this.state = state;
    }

    async initialize() {
        let stored = await this.state.storage.get("value");
        // after initialization, future reads don't need to access storage!
        this.value = stored || 0;
    }

    // Handle HTTP requests from clients.
    async fetch(request) {
        // Make sure we're fully initialized from storage.
        if (!this.initializePromise) {
            this.initializePromise = this.initialize();
        }
        await this.initializePromise;
        // this.value will retain its state until this object is evicted from memory
        ...
    }
}
```

### WebSockets in Durable Objects

As part of Durable Objects, we've made it possible for Workers to act as WebSocket endpoints -- including as a client or as a server. Previously, Workers could proxy WebSocket connections on to a back-end server, but could not speak the protocol directly.

While technically any Worker can speak WebSocket in this way, WebSockets are most useful when combined with Durable Objects. When a client connects to your application using a WebSocket, you need a way for server-generated events to be sent back to the existing socket connection. Without Durable Objects, there's no way to send an event to the specific Worker holding a WebSocket. With Durable Objects, you can forward the WebSocket to an Object. Messages can then be addressed to that Object by its unique ID, and the Object can then forward those messages down the WebSocket to the client.

For more information, see the [documentation of WebSockets in Workers](/learning/using-websockets). For an example of WebSockets in action within Durable Objects, see [our heavily commented example chat application](https://github.com/cloudflare/workers-chat-demo).

## Instantiating and communicating with a Durable Object

As mentioned above, Durable Objects do not receive requests directly from the Internet, but from Workers or other Durable Objects. This is achieved by configuring a binding in the calling Worker for each Durable Object class that you'd like it to be able to talk to. These bindings work similarly to KV bindings and must be configured at upload time. Methods exposed by the binding can be used to communicate with particular Durable Object instances.

When a Worker talks to a Durable Object, it does so through a "stub" object. The class binding's `get()` method returns a stub to the particular Durable Object instance, and the stub's `fetch()` method sends HTTP [Requests](/runtime-apis/request) to the instance.

The fetch handler in the example below implements the Worker that talks to the Durable Object. Note that we have written the fetch handler using a new kind of Workers syntax based on ES modules. This syntax is required for scripts that export Durable Objects classes, but is not required for scripts that make calls to Durable Objects. However, Workers written in the modules syntax (including Durable Objects) cannot share a script with Workers written in the service-workers syntax.

We recommend following this approach of implementing Durable Objects and a corresponding fetch handler in the same script (written in the modules format) not only because it is convenient, but also because as of today it is not possible to upload a script to the runtime that does not implement a fetch handler.

ES Modules differ from regular JavaScript files in that they have imports and exports. As you saw above, we wrote `export class DurableObjectExample` when defining our class. To implement a fetch handler, you must export a method named `fetch` in an `export default {}` block.

```js
// In modules-syntax workers, we use `export default` to export our script's
// main event handlers, such as the `fetch` handler for receiving HTTP
// requests. In pre-modules workers, the fetch handler was registered using
// `addEventHandler("fetch", event => { ... })`; this is just new syntax for
// essentially the same thing.
export default {
  // In modules-syntax workers, bindings are delivered as a property of the
  // environment object passed as the second parameter when an event handler or
  // class constructor is invoked. This is new compared to pre-module workers,
  // in which bindings show up as global variables.
  async fetch(request, env) {
    // Derive an object ID from the URL path. `EXAMPLE_CLASS` is the Durable
    // Object binding that we will show how to configure in the next section.
    // `EXAMPLE_CLASS.idFromName()` always returns the same ID when given the
    // same string as input (and called on the same class), but never the same
    // ID for two different strings (or for different classes). So, in this
    // case, we are creating a new object for each unique path.
    let id = env.EXAMPLE_CLASS.idFromName(new URL(request.url).pathname);

    // Construct the stub for the Durable Object using the ID. A "stub" is a
    // client object used to send messages to the Durable Object.
    let stub = await env.EXAMPLE_CLASS.get(id);

    // Forward the request to the Durable Object. Note that `stub.fetch()` has
    // the same signature as the global `fetch()` function, except that the
    // request is always sent to the object, regardless of the request's URL.
    //
    // The first time we send a request to a new object, the object will be
    // created for us. If we don't store durable state in the object, it will
    // automatically be deleted later (and recreated if we request it again).
    // If we do store durable state, then the object may be evicted from memory
    // but its durable state will be kept around permanently.
    let response = await stub.fetch(request);

    // We received an HTTP response back. We could process it in the usual
    // ways, but in this case we will just return it to the client.
    return response;
  }
}
```

Learn more about communicating with a Durable Object in the [Workers Durable Objects API reference](/runtime-apis/durable-objects#accessing-a-durable-object-from-a-worker).

<Aside header="String-derived IDs vs. system-generated IDs">

In the above example, we used a string-derived object ID by calling the `idFromName()` function on the binding. You can also ask the system to generate random unique IDs. System-generated unique IDs have better performance characteristics, but require that you store the ID somewhere in order to access the object again later. [See the API reference docs for more information.](/runtime-apis/durable-objects#accessing-a-durable-object-from-a-worker)

</Aside>

## Uploading a Durable Object Worker

<Aside type="warning" header="Custom Wrangler installation instructions">

You must use [Wrangler version 1.19 or greater](https://developers.cloudflare.com/workers/cli-wrangler/install-update) in order to manage Durable Objects.

</Aside>

The easiest way to upload Workers that implement or bind to Durable Objects is to use [Wrangler](/cli-wrangler), the Workers CLI. We recommend starting with one of our templates, the simplest of which can be used by running:

```sh
$ wrangler generate <worker-name> https://github.com/cloudflare/durable-objects-template
```

This will create a directory for your project with basic configuration and a single JavaScript source file already set up. If you want to use TypeScript, or be able to bundle external dependencies with your code using Rollup or Webpack, or to use CommonJS modules rather than ES modules, you may want to try one of the other starter templates instead:

* [Durable Objects Rollup ES Modules template](https://github.com/cloudflare/durable-objects-rollup-esm)
* [Durable Objects TypeScript Rollup ES Modules template](https://github.com/cloudflare/durable-objects-typescript-rollup-esm)
* [Durable Objects Webpack CommonJS template](https://github.com/cloudflare/durable-objects-webpack-commonjs)

The following sections will cover how to customize the configuration, but you can also immediately publish the generated project using `wrangler publish`.

### Specifying the main module

Workers that use modules syntax must have a "main" module specified from which all Durable Objects and event handlers are exported. The file that should be treated as the main module is configured using the `"main"` key in the `[build.upload]` section of `wrangler.toml`. See the [modules section of the custom builds documentation](/cli-wrangler/configuration#modules) for more details.

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
  - `name` - Required, The binding name to use within your Worker.
  - `class_name` - Required, The class name you wish to bind to.
  - `script_name` - Optional, Defaults to the current environment's script.

### Configuring Durable Object classes with migrations

When you make changes to your list of Durable Objects classes, you must initiate a migration process. A migration is informing the Workers platform of the changes and provide it with instructions on how to deal with those changes.

Migrations can also be used for transferring stored data between two Durable Object classes:
* Rename migrations are used to transfer stored objects between two Durable Object classes in the same script.
* Transfer migrations are used to transfer stored objects between two Durable Object classes in different scripts.

The destination class (the class that stored objects are being transferred to) for a rename or transfer migration must be exported by the deployed script.

<Aside type="warning" header="Important">

After a rename or transfer migration, requests to the destination Durable Object class will have access to the source Durable Object's stored data. 

After a migration, any existing bindings to the original Durable Object class (e.g., from other Workers) will automatically forward to the updated destination class. However, any Worker scripts bound to the updated Durable Object class must update their `[durable_objects]` configuration in the `wrangler.toml` file for their next deployment.

</Aside>

Migrations can also be used to delete a Durable Object class and its stored objects.

<Aside type="warning" header="Important">

Running a delete migration will delete all Durable Object instances associated with the deleted class, including all of their stored data. Do not run a delete migration on a class without first ensuring that you are not relying on the Durable Objects within that class anymore. Copy any important data to some other location before deleting. 

</Aside>

Migrations can be performed in two different ways: through the `[[migrations]]` configurations key in your `wrangler.toml` file or through additional CLI arguments during a `wrangler publish` command. Migrations specified in `wrangler.toml` have the additional requirement of a migration tag, which is defined by the **tag** property in each migration entry. Migration tags are treated like unique names and are used to determine which migrations have already been applied. Once a given script has a migration tag set on it, all future script uploads must include a migration tag.

### Durable Object migrations in `wrangler.toml`

The migration list (added in `wrangler 1.19.0`) is an array of tables, specified as a top-level key in your `wrangler.toml`. The migration list is inherited by all environments and cannot be overridden by a specific environment. 

All migrations are applied at deployment. This is true for all migrations, whether initiated through `wrangler.toml` configurations or `wrangler publish` command arguments. Each migration can only be applied once per [environment](/platform/environments). 

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
renamed_classes = [{from: "DurableObjectExample", to: "UpdatedName" }] # Array of rename directives
deleted_classes = ["DeprecatedClass"] # Array of deleted class names
```

<Aside type="note">

Note that `.toml` files do not allow line breaks in inline tables (the `{key: "value"}` syntax), but line breaks
in the surrounding inline array are acceptable.

</Aside>

### Durable Object migrations through Wrangler CLI

<Aside type="warning" header="Deprecation Notice">
    
While CLI migrations initially served a way to quickly migrate Durable Objects, this method is now deprecated and will be removed in a future release.

</Aside>

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

At this point, we're done! If you copy the `DurableObjectExample` and fetch handler code from above into a generated Wrangler project, publish it using a `--new-class` migration, and make a request to it, you'll see that your request was stored in a Durable Object:

```sh
$ curl -H "Content-Type: text/plain" https://<worker-name>.<your-namespace>.workers.dev/ --data "important data!"
***.***.***.*** stored important data!
```

As you write Durable Objects, you can find more helpful details in the [Durable Objects runtime API documentation](/runtime-apis/durable-objects).

## Limits

See the [Durable Objects section of the Limits page](/platform/limits#durable-objects) for current relevant usage limits.

## Limitations

Durable Objects is currently in early beta, and some planned features have not been enabled yet. Many of these limitations will be fixed before Durable Objects becomes generally available.

### Risk of Data Loss

At this time, we are not ready to guarantee that data won't be lost. We don't expect data loss and do maintain regular backups, but bugs are always possible.

For now, if you are storing data in Durable Objects that you can't stand to lose, you must arrange to make backups of that data into some other storage system. Do not rely on Durable Objects for storing production data during the beta period. (This is, of course, always best practice anyway, but it is especially important in the beta.)

### Global Uniqueness

Uniqueness is currently enforced upon starting a new event (such as receiving an HTTP request), and upon accessing storage. After an event is received, if the event takes some time to execute and does not ever access its durable storage, then it is possible that the Durable Object instance may no longer be current, and some other instance of the same object ID will have been created elsewhere. If the event accesses storage at this point, it will receive an exception, but if the event completes without ever accessing storage, it may not ever realize that the object was no longer current.

In particular, a Durable Object may be superseded in this way in the event of a network partition or a software update (including either an update of the Durable Object's class code, or of the Workers system itself).

### Enumerating objects

There is currently no support for generating a list of all existing objects, nor any way to bulk export objects.

### Development tools

[Wrangler dev](/cli-wrangler/commands#dev) does not currently work with Durable Objects.

[Wrangler tail](/cli-wrangler/commands#tail) does work, but note that logs from requests that are upgraded to WebSockets are delayed until the WebSocket is closed.

The Workers dashboard does not yet support viewing or editing Workers that use modules syntax. It also does not yet display any information about your Durable Objects or allow you to create client bindings to Durable Objects in your Workers.

### Object Location

Not all Cloudflare locations support Durable Objects yet, so objects may not be created in exactly the same point-of-presence where they are first requested.

Currently, Durable Objects do not migrate between locations after initial creation. We will be enabling automatic migration in the future.

### Performance

Using Durable Objects will often add response latency, as the request must be forwarded to the point-of-presence where the object is located.

While Durable Objects already perform well for many kinds of tasks, we have lots of performance tuning to do. Expect performance (latency, throughput, overhead, etc.) to improve over the beta period -- and if you observe a performance problem, please tell us about it!

## Example - Counter

We've included complete example code for both the Worker and the Durable Object for a basic counter below. [See here](https://github.com/cloudflare/durable-objects-template) for the full code template.

```js
// Worker

export default {
    fetch(request, env) {
        return handleRequest(request, env);
    }
}

async function handleRequest(request, env) {
    let id = env.Counter.idFromName("A");
    let obj = env.Counter.get(id);
    let resp = await obj.fetch(request.url);
    let count = await resp.text();

    return new Response("Durable Object 'A' count: " + count);
}

// Durable Object

export class Counter {
    constructor(state, env) {
        this.state = state;
    }

    async initialize() {
        let stored = await this.state.storage.get("value");
        this.value = stored || 0;
    }

    // Handle HTTP requests from clients.
    async fetch(request) {
        // Make sure we're fully initialized from storage.
        if (!this.initializePromise) {
            this.initializePromise = this.initialize().catch((err) => {
                // If anything throws during initialization then we need to be
                // sure that a future request will retry initialize().
                // Note that the concurrency involved in resetting this shared
                // promise on an error can be tricky to get right -- we don't
                // recommend customizing it.
                this.initializePromise = undefined;
                throw err
            });
        }
        await this.initializePromise;

        // Apply requested action.
        let url = new URL(request.url);
        let currentValue = this.value;
        switch (url.pathname) {
        case "/increment":
            currentValue = ++this.value;
            await this.state.storage.put("value", this.value);
            break;
        case "/decrement":
            currentValue = --this.value;
            await this.state.storage.put("value", this.value);
            break;
        case "/":
            // Just serve the current value. No storage calls needed!
            break;
        default:
            return new Response("Not found", {status: 404});
        }

        // Return `currentValue`. Note that `this.value` may have been
        // incremented or decremented by a concurrent request when we
        // yielded the event loop to `await` the `storage.put` above!
        // That's why we stored the counter value created by this
        // request in `currentValue` before we used `await`.
        return new Response(currentValue);
    }
}
```

## Configuration Script

While using Wrangler is strongly recommended, if you would really rather not use it for some reason we've included a [shell script](/publish-durable-object.sh) to automate the curl commands involved in uploading a Worker that implements and uses Durable Objects.

## Troubleshooting

### Debugging
`wrangler dev` does not currently support Durable Objects.

To help with debugging, you may use [`wrangler tail`](/cli-wrangler/commands#tail) to troubleshoot your Durable Object script. `wrangler tail` displays a live feed of console and exception logs for each request your Worker receives. After doing a `wrangler publish`, you can use `wrangler tail` in the root directory of your Worker project and visit your Worker URL to see console and error logs in your terminal.

### Common errors
#### Error: `No event handlers were registered. This script does nothing.`
In your `wrangler.toml` file, make sure the `dir` and `main` entries point to the correct file containing your Worker script, and that the file extension is `.mjs` instead of `.js` if using ES Modules Syntax.

#### Error when deleting migration
When deleting a migration using `wrangler --delete-class <ClassName>`, you may encounter this error: `"Cannot apply --delete-class migration to class <ClassName> without also removing the binding that references it"`. You should remove the corresponding binding under `[durable_objects]` in `wrangler.toml` before attempting to apply `--delete-class` again.
