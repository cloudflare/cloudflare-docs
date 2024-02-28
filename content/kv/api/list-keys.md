---
pcx_content_type: concept
title: List keys
weight: 7
---

# List keys

To get the list of the keys call the `list()` method:

```js
const results = await env.NAMESPACE.list(options?);
```

```js
export default {
  async fetch(request, env, ctx) {
    const value = await env.NAMESPACE.list();
    // ...
  },
};
```

You can also [list keys on the command line with Wrangler](/kv/reference/kv-commands/#list) or [via the API](/api/operations/workers-kv-namespace-list-a-namespace'-s-keys).

{{<Aside type="note">}} 
This method may return stale values, since changes in any location might take up to 60 seconds to [propagate throught the Cloudflare Network](/kv/reference/how-kv-works/).
{{</Aside>}}

## Parameters

```js
.list({ prefix, limit, cursor })
```

{{<definitions>}}

- `prefix` {{<type>}}string{{</type>}}

  - Represents a filter that will find all of the keys that start with the given "prefix". It cannot have a `.` or `..`. All other keys are valid. Keys have a maximum length of 512 bytes.

- `limit` {{<type>}}number{{</type>}}

  - The maximum amount of keys to return. The default is 1,000, which is also the maximum. It is unlikely that you will want to change this default but it is included for completeness.

- `cursor` {{<type>}}string{{</type>}}

  - Used for pagination purposes, give the cursor and the results returned will start from that record.

{{</definitions>}}

### Prefix

List all the keys starting with a particular prefix. 

For example, you may have structured your keys with a user, a user ID, and key names, separated by colons (such as `user:1:<key>`). You could get the keys for user number one by using the following code:

```js
export default {
  async fetch(request, env, ctx) {
    const value = await env.NAMESPACE.list({ prefix: "user:1:" });
    return new Response(value.keys);
  },
};
```

This will return all keys starting with the `"user:1:"` prefix.


## Output

The `list()` method returns a promise which resolves with an object that looks like the following:

```json
{
  "keys": [
    {
      "name": "foo",
      "expiration": 1234,
      "metadata": { "someMetadataKey": "someMetadataValue" }
    }
  ],
  "list_complete": false,
  "cursor": "6Ck1la0VxJ0djhidm1MdX2FyD"
}
```

The `keys` property will contain an array of objects describing each key. That object will have one to three keys of its own: the `name` of the key, and optionally the key's `expiration` and `metadata` values.

The `name` is a `string`, the `expiration` value is a number, and `metadata` is whatever type was set initially. The `expiration` value will only be returned if the key has an expiration and will be in the absolute value form, even if it was set in the TTL form. Any `metadata` will only be returned if the given key has non-null associated metadata.

If `list_complete` is `false`, there are more keys to fetch, even if the `keys` array is empty. You will use the `cursor` property to get more keys. Refer to [Pagination](#pagination) for more details.

Consider storing your values [in metadata](/kv/api/write-key-value-pairs/#metadata) if your values fit in the [metadata-size limit](/kv/platform/limits/). Storing values in metadata is more efficient than a `list()` followed by a `get()` per key. When using `put()`, leave the `value` parameter empty and instead include a property in the metadata object:

```js
await env.NAMESPACE.put(key, "", {
  metadata: { value: value },
});
```

## Ordering

Keys are always returned in lexicographically sorted order according to their UTF-8 bytes.

## Pagination

If there are more keys to fetch, the `list_complete` key will be set to `false` and a `cursor` will also be returned. In this case, you can call `list()` again with the `cursor` value to get the next batch of keys:

```js
const value = await env.NAMESPACE.list();

const cursor = value.cursor;

const next_value = await env.NAMESPACE.list({ cursor: cursor });
```

Checking for an empty array in `keys` is not sufficient to determine whether there are more keys to fetch. Instead, use `list_complete`. 

It is possible to have an empty array in `keys`, but still have more keys to fetch, because [recently expired or deleted keys](https://en.wikipedia.org/wiki/Tombstone_%28data_store%29) must be iterated through but will not be included in the returned `keys`.

When de-paginating a large result set while also providing a `prefix` argument, the `prefix` argument must be provided in all subsequent calls along with the initial arguments.