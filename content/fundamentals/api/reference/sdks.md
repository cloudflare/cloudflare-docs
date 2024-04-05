---
pcx_content_type: reference
title: SDKs
weight: 5
---

# SDKs

Cloudflare offers language software development kits (SDKs) as well as `curl` examples to demonstrate how to use the Cloudflare API. The SDK libraries allow you to interact with the Cloudflare API in language-specific syntax and more easily integrate with your existing applications.

Cloudflare currently offers the following SDKs:

- [Go](https://github.com/cloudflare/cloudflare-go)
- [Typescript](https://github.com/cloudflare/cloudflare-typescript)
- [Python](https://github.com/cloudflare/cloudflare-python)

## When to use curl vs SDK

There is no definite answer on which you should use. Instead, consider your use case and determine whether curl or an SDK is the best fit.

| Use case                                                    | curl | SDK  |
| ----------------------------------------------------------- | ---- | ---- |
| Quick testing within the CLI                                | ✅   | ❌   |
| Use within bash scripts or CI                               | ✅   | ❌\* |
| Usage from within an existing application or framework      | ❌   | ✅   |
| More complex usage where you need to chain together outputs | ❌   | ✅   |

\* It is possible, although not straight forward, to use the SDKs within bash scripts or CI environments with additional runtime dependencies and setup.

## Example

The following are examples of how you would query all of the Cloudflare zones you have access to.

### With curl:

```bash
curl "https://api.cloudflare.com/client/v4/zones" \
-H "Authorization: Bearer <API_TOKEN>"
```

### With the Typescript SDK:

```js
const client = new Cloudflare({
  apiToken: process.env["CLOUDFLARE_API_TOKEN"],
});

const zones = await client.zones.list();

console.log(zones);
```
