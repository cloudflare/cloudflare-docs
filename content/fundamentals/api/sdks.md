---
pcx_content_type: how-to
title: SDKs
weight: 5
---

# SDKs

Despite many examples using `curl` to demonstrate usage of the Cloudflare API,
there are also language SDKs (software development kits) available. These
libraries provide the ability to interact with the Cloudflare API in language
specific syntax and integrate with your existing application.

- [Go](https://github.com/cloudflare/cloudflare-go)
- [Typescript](https://github.com/cloudflare/cloudflare-typescript)
- [Python](https://github.com/cloudflare/cloudflare-python)

## curl vs SDK

There is no definite answer on which you should use. Instead, you should consider
your use case and determine which is the best fit.

| Use case                                                    | curl | SDK  |
| ----------------------------------------------------------- | ---- | ---- |
| Quick testing within the CLI                                | ✅   | ❌   |
| Use within bash scripts or CI                               | ✅   | ❌\* |
| Usage from within an existing application or framework      | ❌   | ✅   |
| More complex usage where you need to chain together outputs | ❌   | ✅   |

\* You can use SDKs in CI however, it requires installing and additional steps to get working.

## Example

Consider the scenario where you need to query all the Cloudflare zones you have
access to. Here is a small comparison of the two approaches:

With curl:

```bash
curl "https://api.cloudflare.com/client/v4/zones" \
-H "Authorization: Bearer <API_TOKEN>"
```

With the Typescript SDK:

```js
const client = new Cloudflare({
  apiToken: process.env["CLOUDFLARE_API_TOKEN"],
});

const zones = await client.zones.list();

console.log(zones);
```
