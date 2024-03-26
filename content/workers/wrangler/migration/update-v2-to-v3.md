---
title: Migrate from Wrangler v2 to v3
pcx_content_type: how-to
weight: 1
---

# Migrate from Wrangler v2 to v3

There are no special instructions for migrating from Wrangler v2 to v3. You should be able to update Wrangler by following the instructions in [Install/Update Wrangler](/workers/wrangler/install-and-update/#update-wrangler). You should experience no disruption to your workflow.

{{<Aside type="warning">}}

If you tried to update to Wrangler v3 prior to v3.3, you may have experienced some compatibility issues with older operating systems. Please try again with the latest v3 where those have been resolved.

{{</Aside>}}

## Deprecations

Refer to [Deprecations](/workers/wrangler/deprecations/#wrangler-v3) for more details on what is no longer supported in v3.

## Troubleshooting
In contrast to v2, Wrangler v3 dev runs your Worker in a local simulator of the workers environment. You won't see all of the behaviour of the rest of the (non-workers) Cloudflare environment locally, which was the case for v2.

Possible side effects this can cause:

If you see ��� characters in a fetch response where previously readable text was returned, you might have set an `Accept-Encoding` header that the worker doesn't support (for example brotli). Setting this header to `"gzip"` should make sure the response is readable again.

## Additional assistance

If you do have an issue or need further assistance, [file an issue](https://github.com/cloudflare/workers-sdk/issues/new/choose) in the `workers-sdk` repo on GitHub.
