---
pcx_content_type: concept
title: Read key-value pairs
weight: 7
---

# Read key-value pairs

To get the value for a given key, call the `get()` method on any KV namespace you have bound to your Worker code:

```js
env.NAMESPACE.get(key);
```

The `get()` method returns a promise you can `await` on to get the value. If the key is not found, the promise will resolve with the literal value `null`.

The `get()` method may return stale values. If a given key has recently been read in a given location, changes to the key made in other locations may take up to 60 seconds to display.

An example of reading a key from within a Worker:

```js
export default {
    async fetch(request, env, ctx) {
        try {
            const value = await env.NAMESPACE.get("first-key");

            if (value === null) {
                return new Response("Value not found", {status: 404});
            }
            return new Response(value);
        }
        catch (e)
        {
            return new Response(e.message, {status: 500});
        }
    },
};
```

You can [read key-value pairs from the command line with Wrangler](/kv/reference/kv-commands/#get) and [from the API](/api/operations/workers-kv-namespace-read-key-value-pair).

#### Types

You can pass in an options object with a `type` parameter to the `get()` method:

```js
env.NAMESPACE.get(key, { type: "text" });
```

The `type` parameter can be any of the following:

- `text`: A `string` (default).
- `json`: An object decoded from a JSON string.
- `arrayBuffer`: An [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) instance.
- `stream`: A [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).

For simple values, use the default `text` type which provides you with your value as a `string`. For convenience, a `json` type is also specified which will convert a JSON value into an object before returning the object to you. For large values, use `stream` to request a `ReadableStream`. For binary values, use `arrayBuffer` to request an `ArrayBuffer`.

For large values, the choice of `type` can have a noticeable effect on latency and CPU usage. For reference, the `type` can be ordered from fastest to slowest as `stream`, `arrayBuffer`, `text`, and `json`.

## CacheTtl parameter

`cacheTtl` is a parameter that defines the length of time in seconds that a KV result is cached in the global network location it is accessed from. 

Defining the length of time in seconds is useful for reducing cold read latency on keys that are read relatively infrequently. `cacheTtl` is useful if your data is write-once or write-rarely. 

{{<Aside type="note" header="Hot and cold read">}} 
A hot read means that the data is cached on Cloudflare's edge network using the [CDN](/cache/). A cold read means that the data is not cached, therefore you have to fetch the data from the storage provider. Both existing key-value pairs and non-existent key-value pairs (also known as negative lookups) are cached at the edge.
{{</Aside>}}

`cacheTtl` is not recommended if your data is updated often and you need to see updates shortly after they are written, because writes that happen from other global network locations will not be visible until the cached value expires.

The `get()` options object also accepts a `cacheTtl` parameter:

```js
env.NAMESPACE.get(key, { cacheTtl: 3600 });
```

The `cacheTtl` parameter must be an integer greater than or equal to `60`, which is the default. 

The effective `cacheTtl` of an already cached item can be reduced by getting it again with a lower `cacheTtl`. For example, if you did `NAMESPACE.get(key, {cacheTtl: 86400})` but later realized that caching for 24 hours was too long, you could `NAMESPACE.get(key, {cacheTtl: 300})` or even `NAMESPACE.get(key)` and it would check for newer data to respect the provided `cacheTtl`, which defaults to 60 seconds.

## Metadata

A metadata is a serializable value you append to each KV entry. 

Get the metadata associated with a key-value pair alongside its value by calling the `getWithMetadata()` method on a KV namespace you have bound in your Worker code:

```js
const { value, metadata } = await env.NAMESPACE.getWithMetadata(key);
```

If there is no metadata associated with the requested key-value pair, `null` will be returned for metadata.

You can pass an options object with `type` and/or `cacheTtl` parameters to the `getWithMetadata()` method, similar to `get()`.
