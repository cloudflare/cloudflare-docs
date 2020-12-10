# Durable Objects

<Aside type="warning" header="Beta">

Durable Objects are currently in closed beta. If you are interested in using them, [request a beta invite](http://www.cloudflare.com/cloudflare-workers-durable-objects-beta).

</Aside>

## Background

Durable Objects provide low-latency coordination and consistent storage for the Workers platform.  A given namespace can support essentially unlimited Durable Objects, with each Object having access to a transactional, key-value storage API.

Durable Objects consist of two components: a class that defines a template for creating Durable Objects and a Workers script that instantiates and uses those Durable Objects.  The class and the Workers script are linked together with a binding.

Learn more about [using Durable Objects](/learning/using-durable-objects).

--------------------------------

## Durable Object class definition

```js
export class DurableObject {
  constructor(state, env){

  }

  async fetch(request) {

  }
}
```

<Definitions>

- `state`
  - Passed from the runtime to provide access to the Durable Object's storage as well as various metadata about the Object.

- `state.storage`
  - Contains methods for accessing persistent storage via the transactional storage API. See [Transactional Storage API](#transactional-storage-api) for a detailed reference.

- `env`
  - Contains environment bindings configured for the Worker script, such as KV namespaces, secrets, and other Durable Object namespaces. Note that in traditional Workers not using ES Modules syntax, these same "bindings" appear as global variables within the script. Durable Object namespaces, though, always use ES Modules syntax, and have bindings delivered to the constructor rather than placed in global variables.

</Definitions>

### Transactional Storage API

Accessible via the `state.storage` object passed to the Durable Object constructor.

#### Methods

Each method is implicitly wrapped inside a transaction, such that its results are atomic and isolated from all other storage operations, even when accessing multiple key-value pairs.

<Definitions>

- <Code>get(key<ParamType>string</ParamType>)</Code> <Type>Promise&lt;any></Type>

  - Retrieves the value associated with the given key. The type of the returned value will be whatever was previously written for the key, or undefined if the key does not exist.

- <Code>get(keys<ParamType>Array&lt;String></ParamType>)</Code> <Type>Promise&lt;Map&lt;string, any>></Type>

  - Retrieves the values associated with each of the provided keys. The type of each returned value in the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) will be whatever was previously written for the corresponding key. Any keys that do not exist will be omitted from the result Map. Supports up to 128 keys at a time.

- <Code>put(key<ParamType>string</ParamType>, value<ParamType>any</ParamType>)</Code> <Type>Promise</Type>

  - Stores the value and associates it with the given key. The value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types. Keys are limited to a max size of 2048 bytes and values are limited to 32 KiB (32768 bytes).

- <Code>put(entries<ParamType>Object</ParamType>)</Code> <Type>Promise</Type>

  - Takes an Object and stores each of its keys and values to storage. Each value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types. Supports up to 128 key-value pairs at a time. Each key is limited to a max size of 2048 bytes and each value is limited to 32 KiB (32768 bytes).

- <Code>delete(key<ParamType>string</ParamType>)</Code> <Type>Promise&lt;boolean></Type>

  - Deletes the key and associated value. Returns true if the key existed or false if it didn't.

- <Code>delete(keys<ParamType>Array&lt;String></ParamType>)</Code> <Type>Promise&lt;number></Type>

  - Deletes the provided keys and their associated values. Returns a count of the number of key-value pairs deleted.

- <Code>list()</Code> <Type>Promise&lt;Map&lt;string, any>></Type>

  - Returns all keys and values associated with the current Durable Object in ascending lexicographic sorted order. The type of each returned value in the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) will be whatever was previously written for the corresponding key. Be aware of how much data may be stored in your actor before calling this version of `list` without options, because it will all be loaded into the Durable Object's memory, potentially hitting its [limit](/platform/limits). If that is a concern, pass options to `list` as documented below.

- <Code>list(options<ParamType>Object</ParamType>)</Code> <Type>Promise&lt;Map&lt;string, any>></Type>

  - Returns keys associated with the current Durable Object according to the parameters in the provided options object.

    __Supported options:__

    <Definitions>

    - <Code>start<ParamType>string</ParamType></Code>

      - Key at which the list results should start, inclusive.

    - <Code>end<ParamType>string</ParamType></Code>

      - Key at which the list results should end, exclusive.

    - <Code>reverse<ParamType>boolean</ParamType></Code>

      - If true, return results in descending lexicographic order instead of the default ascending order.

    - <Code>limit<ParamType>number</ParamType></Code>

      - Maximum number of key-value pairs to return.

    </Definitions>

- <Code>transaction(closure<ParamType>Function(txn)</ParamType>)</Code> <Type>Promise</Type>

  - Runs the sequence of storage operations called on `txn` in a single transaction that either commits successfully or aborts. Failed transactions are retried automatically.  Non-storage operations that affect external state, like calling `fetch`, may execute more than once if the transaction is retried.

    <Definitions>

    - `txn`

      - Provides access to the `put()`, `get()`, `delete()` and `list()` methods documented above to run in the current transaction context. In order to get transactional behavior within a transaction closure, you must call the methods on the `txn` object instead of on the top-level `state.storage` object.

        Also supports a `rollback()` function that ensures any changes made during the transaction will be rolled back rather than committed. After `rollback()` is called, any subsequent operations on the `txn` object will fail with an exception. `rollback()` takes no parameters and returns nothing to the caller.

    </Definitions>

</Definitions>

### `fetch()` handler method

The `fetch()` method of a Durable Object namespace is called by the system when an HTTP request is sent to the Object. These requests are not sent from the public Internet, but from other Workers, using a Durable Object namespace binding (see below).

The method takes a [`Request`](/runtime-apis/request) as the parameter, and returns a [`Response`](/runtime-apis/response) (or a `Promise` for a `Response`).

--------------------------------

## Accessing a Durable Object from a Worker

To access a Durable Object from a worker, you must first configure the worker with a binding for a Durable Object namespace. The namespace is, in turn, configured to use a particular class, and controls access to instances of that class.

Namespace bindings have two jobs: generating object IDs and connecting to objects.

### Generating IDs randomly

```js
let id = OBJECT_NAMESPACE.newUniqueId()
```

Creates a new object ID randomly. This method will never return the same ID twice, and thus it is guaranteed that the object does not yet exist and has never existed at the time the method returns.

When generating an ID randomly, you need to store the ID somewhere in order to be able to reach the same object again in the future. You could, for example, store the ID in Workers KV, in an external database, or in a cookie in the user's browser.

Unique IDs are unguessable, therefore they can be used in URL-based access control, sometimes known as "anyone with the link can access."

To store the ID in external storage, use its `.toString()` method to convert it into a hex string, and `OBJECT_NAMESPACE.idFromString()` to convert the string back into an ID later.

#### Restricting objects to a jurisdiction

Durable Objects can be created so that they only run and store data within a specific jurisdiction to comply with local regulations. You must specify the jurisdiction when generating the Durable Object's id.

```js
let id = OBJECT_NAMESPACE.newUniqueId({jurisdiction: "eu"})
```

Creates a new object ID that will only run and persist data within the European Union. The jurisdiction feature is useful for building applications that are compliant with regulations such as the [GDPR](https://gdpr-info.eu/). Jurisdiction constraints can only be used with ids created by `newUniqueId()` and are not currently compatible with ids created by `idFromName(name)`.

Note that objects that are constrained to a jurisdiction may still be accessed by your Workers from anywhere in the world. The jurisdiction constraint only controls where the Durable Object itself runs and persists data. Consider using [Regional Services](https://blog.cloudflare.com/introducing-regional-services/) to control the regions from which Cloudflare responds to requests.

The only jurisdiction currently supported is `eu` (the European Union).

<Aside header="Unique IDs perform best">

When you construct a new unique ID, the system knows that the same ID will not be generated by another Worker running on the other side of the world at the same time. Therefore, the object can be instantiated nearby without waiting for any round-the-world synchronization. Whenever you have a convenient place to store the ID, prefer using randomly-generated IDs for best performance.

</Aside>

### Deriving IDs from names

```js
let id = OBJECT_NAMESPACE.idFromName(name)
```

#### Parameters

<Definitions>

  - `name` <Type>string</Type>
    -  The object name, an arbitrary string from which the ID is derived.

</Definitions>

This method derives a unique object ID from the given name string. It will always return the same ID when given the same name as input.

<Aside header="Name-derived IDs require global lookups at creation">

The first time you access a Durable Object based on an ID derived from a name, the system does not know anything about the object. It is possible that a Worker on the opposite side of the world could have coincidentally decided to access the same object at the same time. In order to guarantee that only one instance of the object is created worldwide, the system must check whether the object has been created anywhere else. Due to the inherent limit of the speed of light, this round-the-world check can take up to a few hundred milliseconds.

After the object has been accessed the first time, information will be cached around the world so that subsequent lookups can be faster.

**Beta note:** We are still working on caching and automatic migration of objects. During the beta period, each named object is located in a random location in either North America or Europe. Thus, different named objects may have variable latency characteristics. This will improve soon.

</Aside>

### Parsing previously-created IDs from strings

```js
let id = OBJECT_NAMESPACE.idFromString(hexId)
```

#### Parameters

<Definitions>

  - `hexId` <Type>string</Type>
    -  An ID string constructed by calling the `.toString()` method of an existing ID.

</Definitions>

This method parses an ID that was previously stringified. This is useful in particular with IDs created using `newUniqueId()`, as these IDs need to be stored somewhere, probably as as a string.

A stringified object ID is a 64-digit hexadecimal number. However, not all 64-digit hex numbers are valid IDs. This method will throw if it is passed an ID that was not originally created by `newUniqueId()` or `idFromName()`. It will also throw if the ID was originally created for a different namespace.

### Obtaining an Object Stub

```js
let stub = OBJECT_NAMESPACE.get(id)
```

#### Parameters

<Definitions>

  - `id` <Type>DurableObjectId</Type>
    -  An ID constructed using `newUniqueId()`, `idFromName()`, or `idFromString()` on this namespace.

</Definitions>

This method constructs an object "stub", which is a local client that provides access to a remote Durable Object.

If the remote object does not already exist, it will be created. Thus, there will always be something for the stub to talk to.

This method always returns the stub immediately, before it has connected to the remote object. This allows you to begin making requests to the object right away, without waiting for a network round trip.

## Object Stubs

A Durable Object stub is a client object used to send requests to a remote Durable Object.

A stub is created using `OBJECT_NAMESPACE.get(id)` (above).

Stubs implement E-order semantics. When you make multiple calls to the same stub, it is guaranteed that the calls will be delivered to the remote object in the order in which you made them. This ordering guarantee often makes many distributed programming problems easier. However, there is a cost: due to random network disruptions or other transient issues, a stub may become disconnected from its remote object. Once a stub is disconnected, it is permanently broken, and all in-flight calls and future calls will fail with exceptions. In order to make new requests to the Durable Object, you must call `OBJECT_NAMESPACE.get(id)` again to get a new stub, and you must keep in mind that there are no ordering guarantees between requests to the new stub vs. the old one. If you don't care about ordering at all, you can create a new stub for every request.

<Aside header="E-order">

E-order is a concept deriving from the [E distributed programming language](https://en.wikipedia.org/wiki/E_(programming_language)). E-order is implemented by the [Cap'n Proto](https://capnproto.org) distributed object-capability RPC protocol, which Cloudflare Workers uses for internal communications.

</Aside>

### Sending HTTP requests

```js
let response = await stub.fetch(request)
let response = await stub.fetch(url, options)
```

The `fetch()` method of a stub has the exact same signature as the [global `fetch`](/runtime-apis/fetch). However, instead of sending an HTTP request to the internet, the request is always sent to the Durable Object to which the stub points.
