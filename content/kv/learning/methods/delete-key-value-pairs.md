---
pcx_content_type: concept
title: Delete key-value pairs
weight: 7
---

# Delete key-value pairs

To delete a key-value pair, call the `delete()` method on any namespace you have bound to your script:

```js
await NAMESPACE.delete(key);
```

This will remove the key and value from your namespace. As with any operations, it may take some time to see that they key has been deleted from various points in the Cloudflare global network.

This method returns a promise that you should `await` on to verify successful deletion.

You can also [delete key-value pairs from the command line with Wrangler](/workers/wrangler/workers-kv/) or [via the API](/api/operations/workers-kv-namespace-delete-key-value-pair).