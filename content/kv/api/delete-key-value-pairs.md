---
pcx_content_type: concept
title: Delete key-value pairs
weight: 7
---

# Delete key-value pairs

To delete a key-value pair, call the `delete()` method on any {{<glossary-tooltip term_id="KV namespace">}}KV namespace{{</glossary-tooltip>}} you have bound to your Worker code:

```js
await env.NAMESPACE.delete(key);
```

Calling the `delete()` method will remove the key and value from your KV namespace. As with any operations, it may take some time for the key to be deleted from various points in the Cloudflare global network.

This method returns a promise that you should `await` on to verify successful deletion.

You can also [delete key-value pairs from the command line with Wrangler](/kv/reference/kv-commands/#delete) or [via the API](/api/operations/workers-kv-namespace-delete-key-value-pair).
