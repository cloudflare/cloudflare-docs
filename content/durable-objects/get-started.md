---
weight: 1
title: Get started
pcx_content_type: get-started
---

<!-- Don't merge: UPDATE LINKS! -->

# Get started

This guide will instruct you through:

* Writing a class that defines a Durable Object.
* Instantiating and communicationg with a Durable Object from another Worker via the Fetch API.
* Uploading the Durable Object and Worker to Cloudflare's servers using Wrangler. 

This guide assumes you already have a [Cloudflare account](/fundamentals/account-and-billing/account-setup/create-account/).

## 1. Enable Durable Objects

You can enable Durable Objects for your account by purchasing Workers paid plan.

 1. Log in to [the Cloudflare dashboard](https://dash.cloudflare.com/).
 2. Go to **Workers & Pages** and in **Overview**, select your Worker. 
 3. In your Worker, scroll down to **Durable Objects** > **Learn more** > **View Paid Plan**.
 4. Select **Purchase Workers Paid** and complete the payment process to enable Durable Objects.

 ## 2. Write a class that defines a Durable Object

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

## 3. Instantiate and communicate with a Durable Object

Durable Objects do not receive requests directly from the Internet. Durable Objects receive requests from Workers or other Durable Objects. This is achieved by configuring a binding in the calling Worker for each Durable Object class that you would like it to be able to talk to. These bindings work similarly to KV bindings and must be configured at upload time. Methods exposed by the binding can be used to communicate with particular Durable Object instances.

A binding is defined in the `wrangler.toml` file of your Worker project’s directory.

{{<Aside type="note" header="What is a binding?">}}

A binding is a how your Worker interacts with external resources such as [KV Namespaces](/workers/runtime-apis/kv/) or Durable Objects. A binding is a runtime variable that the Workers runtime provides to your code.

You can declare a variable name in your `wrangler.toml` file that will be bound to these resources at runtime, and interact with them through this variable. Every binding’s variable name and behavior is determined by you when deploying the Worker. Refer to the [Environment Variables](/workers/platform/environment-variables/) documentation for more information.

{{</Aside>}}

A Worker talks to a Durable Object through a stub object. The class binding's `get()` method returns a stub to the particular Durable Object instance, and the stub's `fetch()` method sends HTTP [Requests](/workers/runtime-apis/request/) to the instance.

The fetch handler in the example below implements the Worker that talks to the Durable Object. Note that the fetch handler is written using a new kind of Workers syntax based on ES Modules. This syntax is required for scripts that export Durable Objects classes, but is not required for scripts that make calls to Durable Objects. However, Workers written in the modules syntax (including Durable Objects) cannot share a script with Workers written in the Service Worker syntax.

We recommend following this approach of implementing Durable Objects and a corresponding fetch handler in the same script (written in the modules format) for convenience, but it is not required.

ES Modules differ from regular JavaScript files in that they have imports and exports. When [writing the class that defines a Durable Object](/durable-objects/get-started/#2-write-a-class-that-defines-a-durable-object), you wrote `export class DurableObjectExample` when creating your class. To implement a fetch handler, export a method named `fetch()` in an `export default {}` block.

### Example of the fetch handler implementation

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

Learn more about communicating with a Durable Object in the [Workers Durable Objects API reference](/durable-objects/learning/access-durable-object-from-a-worker/).

{{<Aside type="note" header="String-derived IDs versus system-generated IDs">}}

In the above example, you used a string-derived object ID by calling the `idFromName()` function on the binding. You can also ask the system to generate random unique IDs. System-generated unique IDs have better performance characteristics, but require that you store the ID somewhere in order to access the object again later. Refer to the [API reference documentation](/durable-objects/learning/access-durable-object-from-a-worker/) for more information.

{{</Aside>}}

## 4. Upload a Durable Object Worker

{{<Aside type="warning" header="Custom Wrangler installation instructions">}}

You must use [Wrangler version 1.19.3 or greater](/workers/wrangler/install-and-update/) in order to manage Durable Objects.

{{</Aside>}}

To upload Workers that implement or bind to Durable Objects, use [Wrangler](/workers/wrangler/), the Workers CLI. Start with one of our templates, the simplest of which can be used by running:

```sh
$ git clone https://github.com/cloudflare/durable-objects-template
$ cd durable-objects-template
$ wrangler dev
```

The template will create a directory for your project with basic configuration and a single JavaScript source file already set up. Try the [Durable Objects Rollup ES Modules template](https://github.com/cloudflare/durable-objects-rollup-esm) if you want to use the ES modules, the [Durable Objects TypeScript Rollup ES Modules template](https://github.com/cloudflare/durable-objects-typescript-rollup-esm) if you want to use TypeScript, or the [Durable Objects Webpack CommonJS template](https://github.com/cloudflare/durable-objects-webpack-commonjs) if you want to bundle external dependencies with your code using Rollup or Webpack.


The following sections will cover how to customize the configuration, but you can also immediately publish the generated project using the [`wrangler publish`](/workers/wrangler/commands/) command.

### Specify the main module

Workers that use ES Modules syntax must have a main module specified from which all Durable Objects and event handlers are exported. The file that should be treated as the main module is configured using the `"main"` key in the `[build.upload]` section of `wrangler.toml`. Refer to the [modules section of the custom builds documentation](/workers/wrangler/custom-builds/) for more details.

### Configure Durable Object bindings

Durable Objects bindings can be configured in `wrangler.toml` by providing the class name and script name whose objects you wish to access using the binding. The script name can be omitted when creating a binding for a class that is defined in the same Worker as the binding.

```toml
[durable_objects]
bindings = [
  { name = "EXAMPLE_CLASS", class_name = "DurableObjectExample" } # Binding to our DurableObjectExample class
]
```

The `[durable_objects]` section has one subsection:

- `bindings` - An array of tables, each table can contain the below fields.
  - `name` - Required. The binding name to use within your Worker.
  - `class_name` - Required. The class name you wish to bind to.
  - `script_name` - Optional. Defaults to the current [environment's](/workers/platform/environments/) script.

If you are using Wrangler [environments](/workers/platform/environments/), you must specify any Durable Object bindings you wish to use on a per-environment basis. 

Durable Object bindings are not inherited. For example, you can define an environment named `staging` as below:

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

### Configure Durable Object classes with migrations

You must initiate a migration process when you create a new Durable Object class, rename, delete, or transfer an existing Durable Objects class. This process informs the Workers runtime of the changes and provides it with instructions on how to deal with those changes.

{{<Aside type="note">}}

Updating code for an existing Durable Object class does not require a migration. To update code for an existing Durable Object class, run [`wrangler publish`](/workers/wrangler/commands/). This is true even for changes to how code interacts with persistent storage. Because of [global uniqueness](/workers/learning/using-durable-objects/#global-uniqueness), you do not have to be concerned about old and new code interacting with the same storage simultaneously. However, it is your responsibility to ensure that new code is backwards compatible with existing stored data.

{{</Aside>}}
  
The most common migration performed is a new class migration, which informs the system that a new Durable Object class is being uploaded.

Migrations can also be used for transferring stored data between two Durable Object classes. Rename migrations are used to transfer stored objects between two Durable Object classes in the same script. Transfer migrations are used to transfer stored objects between two Durable Object classes in different scripts.

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

While CLI migrations initially served as a way to quickly migrate Durable Objects, this method is now deprecated and will be removed in a future release.

{{</Aside>}}

It is possible to define a migration purely through extra arguments to the `wrangler publish` command. When taking this route, any migrations listed in the `wrangler.toml` configuration file are ignored.

You should provide an `--old-tag` value whenever possible. This value should be the name of the migration tag that you believe to be most recently active. Your `wrangler publish` command will throw an error if your `--old-tag` expectation does not align with Cloudflare's value.

The list of CLI migration arguments that can be added to `wrangler publish` is as follows:

```bash
--old-tag <tag name> # Optional if your script does not have a migration tag set yet.
--new-tag <tag name> # new-tag and old-tag are optional if you only use CLI migrations.

# Each of the migration directives can be specified multiple times if you are
# creating/deleting/renaming/transferring multiple classes at once.
--new-class <class name>
--delete-class <class name>
--rename-class <from class> <to class>
--transfer-class <from script> <from class> <to class>
```

## 5. Test your Durable Objects project

If you copy the `DurableObjectExample` and fetch handler code from above into a generated Wrangler project, publish it using a `--new-class` migration, and make a request to it, you will notice that your request was stored in a Durable Object:

```sh
$ curl -H "Content-Type: text/plain" https://<worker-name>.<your-namespace>.workers.dev/ --data "important data!"
***.***.***.*** stored important data!
```

As you write Durable Objects, find more helpful details in the [Durable Objects](/durable-objects/) documentation.

[Miniflare](https://github.com/cloudflare/miniflare) includes helpful tools for mocking and testing your Durable Objects.