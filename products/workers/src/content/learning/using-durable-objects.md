---
order: 8
---

# Using Durable Objects

Durable Objects provide low-latency coordination and consistent storage for the Workers platform through two features: global uniqueness and a transactional storage API.

* Global Uniqueness guarantees that there will be a single Durable Object with a given id running at once, across the whole world.  Requests for a Durable Object id are routed by the Workers runtime to the Cloudflare point-of-presence that owns the Durable Object.

* The transactional storage API provides strongly-consistent key-value storage to the Durable Object.  Each Object can only read and modify keys associated with that Object. Execution of a Durable Object is single-threaded, but multiple request events may be processed out-of-order from how they arrived at the Object.

For a high-level introduction to Durable Objects, [see the announcement blog post](https://blog.cloudflare.com/introducing-workers-durable-objects).

<Aside type="warning" header="Beta">

Durable Objects are currently in closed beta. If you are interested in using them, [request a beta invite](https://www.cloudflare.com/cloudflare-workers-durable-objects-beta).

</Aside>

## Using Durable Objects

Durable Objects are named instances of a class you define.  Just like a class in object-oriented programming, the class defines the methods and data a Durable Object can access.

There are three steps to creating and using a Durable Object:

* [__Writing the class__](#writing-a-class-that-defines-a-durable-object) that defines a Durable Object.
* [__Instantiating and communicating with a Durable Object__](#instantiating-and-communicating-with-a-durable-object) from another Worker via the Fetch API.
* [__Uploading the Durable Object and Worker__](#uploading-a-durable-object-worker) to Cloudflare's servers using Wrangler.

## Writing a class that defines a Durable Object

Before you can create and access Durable Objects, you must define their behavior by exporting an ordinary JavaScript class. Other languages will need a shim that translates their class definition to a JavaScript class.

The first parameter passed to the class constructor contains state specific to the Durable Object, including methods for accessing storage. The second parameter contains any bindings you have associated with the Worker when you uploaded it.

```js
export class DurableObjectExample {
    constructor(state, env) {
    }
}
```

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

Full documentation for WebSockets will be coming soon, but for now check out this [heavily commented example chat application](https://github.com/cloudflare/workers-chat-demo) that runs in Durable Objects to see how it works.

## Instantiating and communicating with a Durable Object

As mentioned above, Durable Objects do not receive requests directly from the Internet, but from Workers or other Durable Objects. This is achieved by configuring a binding in the calling Worker for each Durable Object class that you'd like it to be able to talk to. These bindings work similarly to KV bindings and must be configured at upload time. Methods exposed by the binding can be used to communicate with particular Durable Object instances.

When a Worker talks to a Durable Object, it does so through a "stub" object. The class binding's `get()` method returns a stub to the particular Durable Object instance, and the stub's `fetch()` method sends HTTP [Requests](/runtime-apis/request) to the instance.

Note that in the example below, we have written the fetch handler using a new kind of Workers syntax based on ES modules. This syntax is required for Durable Objects. The fetch handler in this example implements the Worker that talks to the Durable Object. We recommend following this approach of implementing Durable Objects and a corresponding fetch handler in the same script not only because it is convenient, but also because as of today it is not possible to upload a script to the runtime that does not implement a fetch handler.

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

At the time of writing, Durable Object support in Wrangler is not yet available in a full release build, so you need to install a release candidate instead. See the [release notes](https://github.com/cloudflare/wrangler/releases/tag/v1.15.0-custom-builds-rc.1) for installation instructions and more information.

</Aside>

The easiest way to upload Workers that implement or bind to Durable Objects is to use [Wrangler](/cli-wrangler), the Workers CLI. We recommend starting with one of our templates, which can be done by running:

```sh
$ wrangler generate <worker-name> https://github.com/cloudflare/durable-objects-rollup-esm
```

This will create a directory for your project with basic configuration and source files already set up. If you would prefer to use Webpack rather than Rollup or CommonJS modules rather than ES modules, you may want to look at the [Durable Objects Webpack CommonJS template](https://github.com/cloudflare/durable-objects-webpack-commonjs) instead. Don't worry if you don't know anything about Rollup, Webpack, or the various module types -- all you have to do to use one of the templates is write JavaScript in the provided source file.

If you'd like, you can immediately publish the generated project using this command, but the following sections will cover how to customize the configuration:

```sh
$ wrangler publish --new-class Counter
```

### Specifying the main module

Workers that use modules syntax must have a "main" module specified from which all Durable Objects and event handlers are exported. The file that should be treated as the main module is configured using "module" key in the `package.json` file in the project.

### Configuring Durable Object bindings

Durable Objects bindings can be configured in `wrangler.toml` by providing the class name and script name whose objects you wish to access using the binding. The script name can be omitted when creating a binding for a class that is defined in the same Worker as the binding.

```toml
[durable_objects]
classes = [
  { binding = "EXAMPLE_CLASS", class_name = "DurableObjectExample" } # Binding to our DurableObjectExample class
]
```
The `[durable_objects]` section has 1 subsection:

- `classes` - An array of tables, each table can contain the below fields.
  - `binding` - Required, The binding name to use within your worker.
  - `class_name` - Required, The class name you wish to bind to.
  - `script_name` - Optional, Defaults to the current project's script.

### Publishing Durable Object classes

Normally when you want to publish a Worker using Wrangler, you just run `wrangler publish`. However, when you export a new Durable Objects class from your script, you must tell the Workers platform about it
before you can create and access Durable Objects associated with that class. This process is called a "migration", and is currently performed by providing extra options to `wrangler publish`.

To allow creation of Durable Objects associated with an exported class, specify `--new-class`:

```sh
$ wrangler publish --new-class DurableObjectExample
```

Note that after you've run `--new-class` for a given class name once, you do not need to include the migration on subsequent uploads of the Worker. You'd just run `wrangler publish` with no additional flags.

If you want to delete the Durable Objects associated with an exported class, you can use `--delete-class`:

```sh
$ wrangler publish --delete-class DurableObjectExample
```

<Aside type="warning" header="Important">

Running a `--delete-class` migration will delete all Durable Objects associated with the deleted class, including all of their stored data. Don't do this without first ensuring that you aren't relying on the Durable Objects anymore and have copied any important data to some other location.

</Aside>

These are basic examples -- you can use multiple of these options in a single `wrangler publish` call if you'd like, one class per option. Future versions of Wrangler will also include migration directives for renaming a class or transferring a class from one file to another.

At this point, we're done! If you copy the `DurableObjectExample` and fetch handler code from above into a generated Wrangler project, publish it using a `--new-class` migration, and make a request to it, you'll see that your request was stored in a Durable Object:

```sh
$ curl -H "Content-Type: text/plain" https://<worker-name>.<your-namespace>.workers.dev/ --data "important data!"
***.***.***.*** stored important data!
```

As you write Durable Objects, you can find more helpful details in the [Durable Objects runtime API documentation](/runtime-apis/durable-objects).

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

[Wrangler tail](/cli-wrangler/commands#tail) and [Wrangler dev](/cli-wrangler/commands#dev) do not currently work with Durable Objects.

The Workers dashboard does not yet support viewing or editing Workers that use modules syntax. It also does not yet display any information about your Durable Objects or allow you to create client bindings to Durable Objects in your Workers.

### Object Location

Not all Cloudflare locations support Durable Objects yet, so objects may not be created in exactly the same point-of-presence where they are first requested.

Currently, Durable Objects do not migrate between locations after initial creation. We will be enabling automatic migration in the future.

### Performance

Using Durable Objects will often add response latency, as the request must be forwarded to the point-of-presence where the object is located.

While Durable Objects already perform well for many kinds of tasks, we have lots of performance tuning to do. Expect performance (latency, throughput, overhead, etc.) to improve over the beta period -- and if you observe a performance problem, please tell us about it!

## Example - Counter

We've included complete example code for both the Worker and the Durable Object for a basic counter below.

```js
// Worker

export default {
    async fetch(request, env) {
        return await handleRequest(request, env);
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
        try {
            let stored = await this.state.storage.get("value");
            this.value = stored || 0;
        } catch (err) {
            // If anything throws during initialization then we
            // need to be sure that a future request will retry by
            // creating another `initializePromise` below.
            this.initializePromise = undefined;
            throw err;
        }
    }

    // Handle HTTP requests from clients.
    async fetch(request) {
        // Make sure we're fully initialized from storage.
        if (!this.initializePromise) {
            this.initializePromise = this.initialize();
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
