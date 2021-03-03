# KV

## Background

Workers KV is a global, low-latency, key-value data store. It supports exceptionally high read volumes with low-latency, making it possible to build highly dynamic APIs and websites which respond as quickly as a cached static file would.

Learn more about [How KV works](/learning/how-kv-works).

--------------------------------

## Methods

### Writing key-value pairs

To create a new key-value pair, or to update the value for a particular key, you can call the `put` method on any namespace you’ve bound to your script. The basic form of this method looks like this:

```js
await NAMESPACE.put(key, value)
```

#### Parameters

<Definitions>

  - `key` <Type>string</Type>
    - The key to associate with the value

  - `value` <Type>string</Type> | <Type>ReadableStream</Type> | <Type>ArrayBuffer</Type>
    -  The value to store. The type is inferred.

</Definitions>

This method returns a `Promise` that you should `await` on in order to verify a successful update.

The maximum size of a value is 25MB.

You can also [write key-value pairs from the command line with
Wrangler](/cli-wrangler/commands#kvkey).

Finally, you can [write data via the API](https://api.cloudflare.com/#workers-kv-namespace-write-key-value-pair).

Due to the eventually consistent nature of Workers KV, concurrent writes from different edge locations can end up up overwriting one another. It’s a common pattern to write data via Wrangler or the API but read the data from within a worker, avoiding this issue by issuing all writes from the same location.

Writes are immediately visible to other requests in the same edge location, but can take up to 60 seconds to be visible in other parts of the world. See [How KV works](/learning/how-kv-works) for more on this topic.

#### Writing data in bulk

You can [write more than one key-value pair at a time with
wrangler](/cli-wrangler/commands#kvbulk) or [via the
API](https://api.cloudflare.com/#workers-kv-namespace-write-multiple-key-value-pairs), up to 10,000 KV pairs. A `key` and `value` are required for each KV pair. The entire request size must be less than 100 megabytes.
We do not support this from within a Worker script at this time.

#### Expiring keys

Many common uses of Workers KV involve writing keys that are only meant to be valid for a certain amount of time. Rather than requiring applications to remember to delete such data at the appropriate time, Workers KV offers the ability to create keys that automatically expire, either at a particular point in time or after a certain amount of time has passed since the key was last modified.

Once the expiration time of an expiring key is reached, it will be deleted from the system. After its deletion, attempts to read it will behave as if the key does not exist, and it will not count against the namespace’s storage usage for billing purposes.

You can choose one of two ways to specify when a key should expire:

- Set its "expiration", using an absolute time specified in a number of [seconds since the UNIX epoch](https://en.wikipedia.org/wiki/Unix_time). For example, if you wanted a key to expire at 12:00AM UTC on April 1, 2019, you would set the key’s expiration to 1554076800.

- Set its "expiration TTL" (time to live), using a relative number of seconds from the current time. For example, if you wanted a key to expire 10 minutes after creating it, you would set its expiration TTL to 600.

Both of these options are usable when writing a key inside a Worker or when writing keys using the API.

Note that expiration times of less than 60 seconds in the future or expiration TTLs of less than 60 seconds are not supported at this time.

#### Creating expiring keys

We talked about the basic form of the `put` method above, but this call also has an optional third parameter. It accepts an object with optional fields that allow you to customize the behavior of the `put`. In particular, you can set either `expiration` or `expirationTtl`, depending on how you would like to specify the key’s expiration time. In other words, you’d run one of the two commands below to set an expiration when writing a key from within a Worker:

<Definitions>

- `NAMESPACE.put(key, value, {expiration: secondsSinceEpoch})` <Type>Promise</Type>

- `NAMESPACE.put(key, value, {expirationTtl: secondsFromNow})` <Type>Promise</Type>

</Definitions>

These assume that `secondsSinceEpoch` and `secondsFromNow` are variables defined elsewhere in your Worker code.

You can also [write with an expiration on the command line via
Wrangler](/cli-wrangler/commands#kvkey) or [via the
API](https://api.cloudflare.com/#workers-kv-namespace-write-key-value-pair).

#### Metadata

To associate some metadata with a key-value pair set `metadata` to any arbitrary object (must serialize to JSON) in the put options object on a `put` call. Usage in Worker script:

`await NAMESPACE.put(key, value, {metadata: {someMetadataKey: "someMetadataValue"}})`

The serialized JSON representation of the metadata object must be no more than 1024 bytes in length.

### Reading key-value pairs

To get the value for a given key, you can call the `get` method on any namespace you’ve bound to your script:

`NAMESPACE.get(key)`

The method returns a promise you can `await` to get the value. If the key is not found, the promise will resolve with the literal value `null`.

Note that `get` may return stale values -- if a given key has recently been read in a given location, changes to the key made in other locations may take up to 60 seconds to be visible. See [How KV works](/learning/how-kv-works) for more on this topic.

Here’s an example of reading a key from within a Worker:

```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await FIRST_KV_NAMESPACE.get("first-key")
  if (value === null) {
    return new Response("Value not found", {status: 404})
  }

  return new Response(value)
}
```

You can also [read key-value pairs from the command line with
wrangler](/cli-wrangler/commands#kvkey).

Finally, you can also [read from the API](https://api.cloudflare.com/#workers-kv-namespace-read-key-value-pair).

#### Types

You can pass an optional `type` parameter to the `get` method as well:

`NAMESPACE.get(key, type)`

The `type` parameter can be any of:

- `"text"`: (default) a string
- `"json"`: an object decoded from a JSON string
- `"arrayBuffer"`: An [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) instance.
- `"stream"`: A [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

For simple values it often makes sense to use the default `"text"` type which provides you with your value as a string. For convenience a `"json"` type is also specified which will convert a JSON value into an object before returning it to you. For large values you can request a `ReadableStream`, and for binary values an `ArrayBuffer`.

For large values, the choice of `type` can have a noticeable effect on latency and CPU usage. For reference, the `type`s can be ordered from fastest to slowest as `"stream"`, `"arrayBuffer"`, `"text"`, and `"json"`.

#### Metadata

You can get the metadata associated with a key-value pair alongside its value by calling the `getWithMetadata` method on a namespace you’ve bound in your script:

```
const valueAndMetadata = await NAMESPACE.getWithMetadata(key)
const value = valueAndMetadata.value
const metadata = valueAndMetadata.metadata
```

If there’s no metadata associated with the requested key-value pair, `null` will be returned for metadata.

You can pass an optional `type` parameter to the `getWithMetadata` method, similar to `get`.

### Deleting key-value pairs

To delete a key-value pair, you can call the `delete` method on any namespace you’ve bound to your script:

`await NAMESPACE.delete(key)`

This will remove the key and value from your namespace. As with any operations, it may take some time to see that they key has been deleted from various points at the edge.

This method returns a promise that you should `await` on in order to verify successful deletion.

You can also [delete key-value pairs from the command line with Wrangler](/cli-wrangler/commands#kvkey) or [via the API](https://api.cloudflare.com/#workers-kv-namespace-delete-key-value-pair).

### Listing keys

You can use a list operation to see all of the keys that live in a given namespace. Here’s a basic example:

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

`NAMESPACE.list({prefix?: string, limit?: number, cursor?: string})`

All arguments are optional:

* `prefix` is a string that represents a prefix you can use to filter all keys.
* `limit` is the maximum number of keys returned. The default is 1000, which is the maximum. It is unlikely that you will want to change this default, but it is included for completeness.
* `cursor` is a string used for paginating responses. See below for more.

The `.list` method returns a promise which resolves with an object that looks like this:

```json
{
  keys: [{ name: "foo", expiration: 1234, metadata: {someMetadataKey: "someMetadataValue"}}],
  list_complete: false,
  cursor: "6Ck1la0VxJ0djhidm1MdX2FyD"
}
```

The `keys` property will contain an array of objects describing each key. That object will have one to three keys of its own: a `name` of the key, optionally its expiration value and optionally associated metadata. The name is a string, the expiration value is a number and metadata is whatever type was set initially. The expiration value will only be returned if the key has an expiration, and will be in the absolute value form, even if it was set in the TTL form. Metadata will also only be returned if the given key has non-null associated metadata.

Additionally, if `list_complete` is `false`, there are more keys to fetch. You’ll use the `cursor` property to get more keys. See the [Pagination section](#pagination) below for more details.

Note that if your values fit in [the metadata size limit](/platform/limits#kv-limits), list can be used to return information associated with multiple keys in one operation. This is more efficient than a list followed by a get per key.

#### Listing by prefix

You can also list all of the keys starting with a particular prefix. For example, say you’ve structured your keys with a user, a user id, and then some key names, separated by colons (e.g. ` user:1:<key>`). You could get the keys for user number one by doing this:

```js
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const value = await NAMESPACE.list({"prefix": "user:1:"})

  return new Response(value.keys)
}
```

This will return all of the keys that start with `"user:1:"`.

#### Ordering

Keys are always returned in lexicographically sorted order according to their UTF-8 bytes.

#### Pagination

If you have more keys than the `limit` value, only that many will be returned. Additionally, the `list_complete` key will be set to `false`, and a `cursor` will also be returned. In this case, you can call `list` again with the `cursor` value to get the next set of keys:

```js
const value = await NAMESPACE.list()

const cursor = value.cursor

const next_value = await NAMESPACE.list({"cursor": cursor})
```

## See Also

- [Limits](/platform/limits#kv-limits)
- [Pricing](/platform/pricing#kv)
