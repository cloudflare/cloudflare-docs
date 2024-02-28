---
pcx_content_type: concept
title: Delete key-value pairs
weight: 7
---

# Delete key-value pairs

To delete a key-value pair call the `delete()` method:

```js
await env.NAMESPACE.delete(key);
```

If the key is not found, the promise will resolve and nothing will happen.

```js
export default {
  async fetch(request, env, ctx) {
    const value = await env.NAMESPACE.delete('first-key');
    // ...
  },
};
```

You can also [delete key-value pairs from the command line with Wrangler](/kv/reference/kv-commands/#delete) or [via the API](/api/operations/workers-kv-namespace-delete-key-value-pair).

{{<Aside type="note">}} 
Changes might take up to 60 seconds to [propagate throught the Cloudflare Network](/kv/reference/how-kv-works/), but will be consistent within the same location after `await` completes.
{{</Aside>}}

## Parameters

```js
.delete(key)
```

{{<definitions>}}

- `key` {{<type>}}string{{</type>}}

  - The key to associate with the value. A key cannot be empty, have a `.` or `..`. All other keys are valid. Keys have a maximum length of 512 bytes.

{{</definitions>}}
