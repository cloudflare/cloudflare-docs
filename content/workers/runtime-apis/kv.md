---
pcx-content-type: configuration
---

# KV

## Background

Workers KV is a global, low-latency, key-value data store. It supports exceptionally high read volumes with low-latency, making it possible to build highly dynamic APIs and websites which respond as quickly as a cached static file would.

Learn more about [How KV works](/learning/how-kv-works).

To use Workers KV, you must create a KV namespace and add a [binding](/runtime-apis/kv#kv-bindings) to your Worker. Refer to the [instructions for Wrangler KV commands](/cli-wrangler/commands#kv) or the KV page of the [Workers dashboard](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces) to get started.

***

## Methods

### Writing key-value pairs

To create a new key-value pair, or to update the value for a particular key, call the `put` method on any namespace you have bound to your script. The basic form of this method looks like this:

```js
await NAMESPACE.put(key, value)
```

#### Parameters

<Definitions>

*   `key` <Type>string</Type>
    *   The key to associate with the value. A key cannot be empty, `.` or `..`. All other keys are valid.

*   `value` <Type>string</Type> | <Type>ReadableStream</Type> | <Type>ArrayBuffer</Type>
    *   The value to store. The type is inferred.

</Definitions>

This method returns a `Promise` that you should `await` on in order to verify a successful update.

The maximum size of a value is 25 MiB.

You can also [write key-value pairs from the command line with Wrangler](/cli-wrangler/commands#kvkey) and [write data via the API](https://api.cloudflare.com/#workers-kv-namespace-write-key-value-pair).

Due to the eventually consistent nature of Workers KV, concurrent writes can end up overwriting one another. It is a common pattern to write data from a single process via Wrangler or the API. This avoids competing, concurrent writes because of the single stream. All data is still readily available within all Workers bound to the namespace.

Writes are immediately visible to other requests in the same edge location, but can take up to 60 seconds to be visible in other parts of the world. Refer to [How KV works](/learning/how-kv-works) for more information on this topic.

#### Writing data in bulk

You can [write more than one key-value pair at a time with Wrangler](/cli-wrangler/commands#kvbulk) or [via the API](https://api.cloudflare.com/#workers-kv-namespace-write-multiple-key-value-pairs). The bulk API can accept up to 10,000 KV pairs at once.

A `key` and `value` are required for each KV pair. The entire request size must be less than 100 megabytes. As of January 2022, Cloudflare does not support bulk writes from within a Worker.

#### Expiring keys

Many common uses of Workers KV involve writing keys that are only meant to be valid for a certain amount of time. Rather than requiring applications to remember to delete such data at the appropriate time, Workers KV offers the ability to create keys that automatically expire. You may configure expiration to occur either at a particular point in time or after a certain amount of time has passed since the key was last modified.

Once the expiration time of an expiring key is reached, it will be deleted from the system. After its deletion, attempts to read it will behave as if the key does not exist. The deleted key will not count against the namespace’s storage usage for billing purposes.

You can choose one of two ways to specify when a key should expire:

1.  Set a key's expiration using an absolute time specified in a number of [seconds since the UNIX epoch](https://en.wikipedia.org/wiki/Unix_time). For example, if you wanted a key to expire at 12:00AM UTC on April 1, 2019, you would set the key’s expiration to `1554076800`.

2.  Set a key's expiration time to live (TTL) using a relative number of seconds from the current time. For example, if you wanted a key to expire 10 minutes after creating it, you would set its expiration TTL to `600`.

Both of these options are usable when writing a key inside a Worker or when writing keys using the API.

As of January 2022, expiration targets that are less than 60 seconds into the future are not supported. This is true for both expiration methods.

#### Creating expiring keys

The `put` method described [previously](/runtime-apis/kv#writing-key-value-pairs) has an optional third parameter. It accepts an object with optional fields that allow you to customize the behavior of the `put` method. In particular, you can set either `expiration` or `expirationTtl`, depending on how you would like to specify the key’s expiration time. To do this, run one of the two commands below to set an expiration when writing a key from within a Worker:

<Definitions>

*   `NAMESPACE.put(key, value, {expiration: secondsSinceEpoch})` <Type>Promise</Type>

*   `NAMESPACE.put(key, value, {expirationTtl: secondsFromNow})` <Type>Promise</Type>

</Definitions>

These assume that `secondsSinceEpoch` and `secondsFromNow` are variables defined elsewhere in your Worker code.

You can also [write with an expiration on the command line via Wrangler](/cli-wrangler/commands#kvkey) or [via the API](https://api.cloudflare.com/#workers-kv-namespace-write-key-value-pair).

#### Metadata

To associate some metadata with a key-value pair, set `metadata` to any arbitrary object (must serialize to JSON) in the `put` options object on a `put` call. To do this in a Worker:

```js
await NAMESPACE.put(key, value, {metadata: {someMetadataKey: "someMetadataValue"}})
```

The serialized JSON representation of the metadata object must be no more than 1024 bytes in length.

### Reading key-value pairs

To get the value for a given key, you can call the `get` method on any namespace you have bound to your script:

```js
NAMESPACE.get(key)
```

The method returns a promise you can `await` to get the value. If the key is not found, the promise will resolve with the literal value `null`.

Note that `get` may return stale values -- if a given key has recently been read in a given location, changes to the key made in other locations may take up to 60 seconds to be visible. Refer to [How KV works](/learning/how-kv-works) for more information on this topic.

An example of reading a key from within a Worker:

```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await NAMESPACE.get("first-key")
  if (value === null) {
    return new Response("Value not found", {status: 404})
  }

  return new Response(value)
}
```

You can [read key-value pairs from the command line with Wrangler](/cli-wrangler/commands#kvkey) and [from the API](https://api.cloudflare.com/#workers-kv-namespace-read-key-value-pair).

#### Types

You can pass in an options object with a `type` parameter to the `get` method:

```js
NAMESPACE.get(key, {type: "text"})
```

The `type` parameter can be any of:

*   `"text"`: A string (default).
*   `"json"`: An object decoded from a JSON string.
*   `"arrayBuffer"`: An [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) instance.
*   `"stream"`: A [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

For simple values, it often makes sense to use the default `"text"` type which provides you with your value as a string. For convenience, a `"json"` type is also specified which will convert a JSON value into an object before returning it to you. For large values, you can use `"stream"` to request a `ReadableStream` and `"arrayBuffer"` to request an `ArrayBuffer` for binary values.

For large values, the choice of `type` can have a noticeable effect on latency and CPU usage. For reference, the `type`s can be ordered from fastest to slowest as `"stream"`, `"arrayBuffer"`, `"text"`, and `"json"`.

#### Cache TTL

The `get` options object also accepts a `cacheTtl` parameter:

```js
NAMESPACE.get(key, {cacheTtl: 3600})
```

The `cacheTtl` parameter must be an integer that is greater than or equal to 60. It defines the length of time in seconds that a KV result is cached in the edge location that it is accessed from. This can be useful for reducing cold read latency on keys that are read relatively infrequently. It is especially useful if your data is write-once or write-rarely. It is not recommended if your data is updated often and you need to see updates shortly after they are written, because writes that happen from other edge locations will not be visible until the cached value expires.

The effective Cache TTL of an already cached item can be reduced by getting it again with a lower `cacheTtl`. For example, if you did `NAMESPACE.get(key, {cacheTtl: 86400})` but later realized that caching for 24 hours was too long, you could `NAMESPACE.get(key, {cacheTtl: 300})` or even `NAMESPACE.get(key)` and it would check for newer data to respect the provided `cacheTtl`, which defaults to `60` seconds.

#### Metadata

You can get the metadata associated with a key-value pair alongside its value by calling the `getWithMetadata` method on a namespace you have bound in your script:

```js
const { value, metadata } = await NAMESPACE.getWithMetadata(key)
```

If there is no metadata associated with the requested key-value pair, `null` will be returned for metadata.

You can pass an options object with `type` and/or `cacheTtl` parameters to the `getWithMetadata` method, similar to `get`.

### Deleting key-value pairs

To delete a key-value pair, call the `delete` method on any namespace you have bound to your script:

```js
await NAMESPACE.delete(key)
```

This will remove the key and value from your namespace. As with any operations, it may take some time to see that they key has been deleted from various points at the edge.

This method returns a promise that you should `await` on in order to verify successful deletion.

You can also [delete key-value pairs from the command line with Wrangler](/cli-wrangler/commands#kvkey) or [via the API](https://api.cloudflare.com/#workers-kv-namespace-delete-key-value-pair).

### Listing keys

You can use a list operation to see all of the keys that live in a given namespace.

An example:

```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await NAMESPACE.list()

  return new Response(value.keys)
}
```

You can also [list keys on the command line with Wrangler](/cli-wrangler/commands#kvkey) or [via the API](https://api.cloudflare.com/#workers-kv-namespace-list-a-namespace-s-keys).

Changes may take up to 60 seconds to be visible when listing keys.

#### More detail

The `list` method has this signature (in TypeScript):

```js
NAMESPACE.list({prefix?: string, limit?: number, cursor?: string})
```

All arguments are optional:

*   `prefix` is a string that represents a prefix you can use to filter all keys.
*   `limit` is the maximum number of keys returned. The default is 1,000, which is the maximum. It is unlikely that you will want to change this default but it is included for completeness.
*   `cursor` is a string used for paginating responses.

The `list` method returns a promise which resolves with an object that looks like this:

```json
{
  keys: [{ name: "foo", expiration: 1234, metadata: {someMetadataKey: "someMetadataValue"}}],
  list_complete: false,
  cursor: "6Ck1la0VxJ0djhidm1MdX2FyD"
}
```

The `keys` property will contain an array of objects describing each key. That object will have one to three keys of its own: the `name` of the key and optionally the key's `expiration` and `metadata` values.

The `name` is a string, the `expiration` value is a number, and `metadata` is whatever type was set initially. The `expiration` value will only be returned if the key has an expiration and will be in the absolute value form, even if it was set in the TTL form. Any `metadata` will only be returned if the given key has non-null associated metadata.

Additionally, if `list_complete` is `false`, there are more keys to fetch. You will use the `cursor` property to get more keys. Refer to the [Pagination section](#pagination) below for more details.

Note that if your values fit in [the metadata size limit](/platform/limits#kv-limits), `list` can be used to return information associated with multiple keys in one operation. This is more efficient than a list followed by a `get` per key.

#### Listing by prefix

You can also list all of the keys starting with a particular prefix. For example, you may have structured your keys with a user, a user ID, and key names, separated by colons (for example, `user:1:<key>`). You could get the keys for user number one by doing this:

```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await NAMESPACE.list({"prefix": "user:1:"})

  return new Response(value.keys)
}
```

This will return all of the keys that start with the `"user:1:"` prefix.

#### Ordering

Keys are always returned in lexicographically sorted order according to their UTF-8 bytes.

#### Pagination

If you have more keys than the `limit` value, only that many will be returned. Additionally, the `list_complete` key will be set to `false` and a `cursor` will also be returned. In this case, you can call `list` again with the `cursor` value to get the next batch of keys:

```js
const value = await NAMESPACE.list()

const cursor = value.cursor

const next_value = await NAMESPACE.list({"cursor": cursor})
```

## KV bindings

### Referencing KV from Workers

A KV namespace is a key-value database that is replicated to Cloudflare's edge. To connect to a KV namespace from within a Worker, you must define a binding that points to the namespace's ID.

The name of your binding does not need to match the KV namespace's name. Instead, the binding should be a valid JavaScript identifier because it will exist as a global variable within your Worker.

This is not the case with Modules, refer to [Referencing KV using Modules](/runtime-apis/kv#referencing-kv-from-durable-objects-and-workers-using-modules-syntax).

When you create a namespace, it will have a name you choose (for example, `My tasks`), and an assigned ID (for example, `06779da6940b431db6e566b4846d64db`).

For your Worker to execute properly, define the binding (called `TODO` in the following example). In the `kv_namespaces` portion of your `wrangler.toml` file, add:

```toml
name = "worker"

# ...

kv_namespaces = [ 
  { binding = "TODO", id = "06779da6940b431db6e566b4846d64db" }
]
```

With this, the deployed Worker will have a `TODO` global variable. Any methods on the `TODO` binding will map to the KV namespace with an ID of `06779da6940b431db6e566b4846d64db` – which you called `My Tasks` earlier.

```js
addEventListener('fetch', async event => {
  // Get the value for the "to-do:123" key
  // NOTE: Relies on the `TODO` KV binding that maps to the "My Tasks" namespace.
  let value = await TODO.get('to-do:123');

  // Return the value, as is, for the Response
  event.respondWith(new Response(value));
});
```

<Aside type="note">

You can create a namespace [using Wrangler](/cli-wrangler/commands#getting-started) or in the [Cloudflare dashboard](https://dash.cloudflare.com/). You can also bind the namespace to your Worker in the dashboard:

1.  Go to **Workers**.
2.  Select your **Worker**.
3.  Select **Settings** > **Variables**.
4.  Go to **KV Namespace Bindings**.
5.  Select **Add binding**.

</Aside>

### Referencing KV from Durable Objects and Workers using Modules Syntax

The documentation above assumes you are using the original Service Worker syntax, where binding a KV namespace makes it available as a global variable with the name you chose, for example, `NAMESPACE`. Durable Objects use Modules syntax. Instead of a global variable, bindings are available as properties of the `env` parameter [passed to the constructor](/runtime-apis/durable-objects#durable-object-class-definition). A typical example might look like:

```js
export class DurableObject {
  constructor(state, env) {
    this.state = state
    this.env = env
  }

  async fetch(request) {
    const valueFromKV = await this.env.NAMESPACE.get('someKey')
    return new Response(valueFromKV)
  }
}
```

## Related resources

*   [Limits](/platform/limits#kv-limits)
*   [Pricing](/platform/pricing#kv)
