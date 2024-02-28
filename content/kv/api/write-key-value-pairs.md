---
pcx_content_type: concept
title: Write key-value pairs
weight: 7
---

# Write key-value pairs

To create or update a key-value pair call the `put()` method:

```js
await env.NAMESPACE.put(key, value, options?);
```

```js
export default {
  async fetch(request, env, ctx) {
    const value = await env.NAMESPACE.put('first-key', 'my value');
    // ...
  },
};
```

You can also [write key-value pairs from the command line with Wrangler](/kv/reference/kv-commands/#create) and [write data via the API](/api/operations/workers-kv-namespace-write-key-value-pair-with-metadata).

{{<Aside type="note">}} 
Changes might take up to 60 seconds to [propagate throught the Cloudflare Network](/kv/reference/how-kv-works/), but will be consistent within the same location after `await` completes.
{{</Aside>}}

## Parameters

```js
.put(key, value, { expiration, expirationTtl, metadata })
```

{{<definitions>}}

- `key` {{<type>}}string{{</type>}}

  - The key to associate with the value. A key cannot be empty, have a `.` or `..`. All other keys are valid. Keys have a maximum length of 512 bytes.

- `value` {{<type>}}string{{</type>}} | {{<type>}}ReadableStream{{</type>}} | {{<type>}}ArrayBuffer{{</type>}}

  - The value to store. The type is inferred. The maximum size is 25 MiB.

- `expiration` {{<type>}}number{{</type>}}

  - Set a key’s expiration using an absolute time specified in a number of seconds since the UNIX epoch.

- `expirationTtl` {{<type>}}number{{</type>}}

  - Set a key’s expiration time to live (TTL) using a relative number of seconds from the current time.

- `metadata` {{<type>}}JSON Object{{</type>}}

  - Any arbitrary object (must serialize to JSON) to associate with a key-value pair.

{{</definitions>}}

### Expiring keys

KV offers the ability to create keys that automatically expire. You may configure expiration to occur either at a particular point in time, or after a certain amount of time has passed since the key was last modified.

{{<Aside type="note">}}

An `expiration` setting on a key will result in that key being deleted, even in cases where the `cacheTtl` is set to a higher (longer duration) value. Expiration always takes precedence.  

{{</Aside>}}

Once the expiration time of an expiring key is reached, it will be deleted from the system. After its deletion, attempts to read the key will behave as if the key does not exist. The deleted key will not count against the KV namespace’s storage usage for billing purposes.

There are two ways to specify when a key should expire:

 - Set a key's expiration using an absolute time specified in a number of [seconds since the UNIX epoch](https://en.wikipedia.org/wiki/Unix_time). For example, if you wanted a key to expire at 12:00AM UTC on April 1, 2019, you would set the key’s expiration to `1554076800`.

 - Set a key's expiration time to live (TTL) using a relative number of seconds from the current time. For example, if you wanted a key to expire 10 minutes after creating it, you would set its expiration TTL to `600`.

Use both options when writing a key inside a Worker or when writing keys using the API.

As of January 2022, expiration targets that are less than 60 seconds into the future are not supported. This is true for both expiration methods.

#### Create expiring keys

The `put()` method accepts an object with optional fields that allow you to customize the behavior of the `put()` method. You can set `expiration` or `expirationTtl`, depending on how you want to specify the key’s expiration time. 

To use `expiration` or `expirationTtl`, run one of the two commands below to set an expiration when writing a key from within a Worker:

{{<definitions>}}

- `.put(key, value, { expiration: secondsSinceEpoch })` {{<type>}}Promise{{</type>}}

- `.put(key, value, { expirationTtl: secondsFromNow })` {{<type>}}Promise{{</type>}}

{{</definitions>}}

These assume that `secondsSinceEpoch` and `secondsFromNow` are variables defined elsewhere in your Worker code.

You can also [write with an expiration on the command line via Wrangler](/kv/reference/kv-namespaces/) or [via the API](/api/operations/workers-kv-namespace-write-key-value-pair-with-metadata).

### Metadata

To associate some {{<glossary-tooltip term_id="metadata">}}metadata{{</glossary-tooltip>}} with a key-value pair, set `metadata` to any arbitrary object (must serialize to JSON) in the `put()` options object on a `put()` call. 

To do this in your Worker script:

```js
await env.NAMESPACE.put(key, value, {
  metadata: { someMetadataKey: "someMetadataValue" },
});
```

The serialized JSON representation of the metadata object must be no more than 1024 bytes in length.


## Write data in bulk

Write more than one key-value pair at a time with Wrangler or [via the API](/api/operations/workers-kv-namespace-write-multiple-key-value-pairs). 

The bulk API can accept up to 10,000 KV pairs at once.

A `key` and a `value` are required for each KV pair. The entire request size must be less than 100 megabytes. As of January 2022, Cloudflare does not support bulk writes from within a Worker.
