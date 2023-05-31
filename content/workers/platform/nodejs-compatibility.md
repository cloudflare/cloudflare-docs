---
pcx_content_type: concept
title: Node.js compatibility
---

# Node.js compatibility

Most Workers import one or more packages of JavaScript or TypeScript code from [npm](https://www.npmjs.com/) as dependencies in `package.json`. Many of these packages rely on APIs from the [Node.js runtime](https://nodejs.org/en/about), and will not work unless these APIs are present.

To ensure compatibility with a wider set of npm packages, and make it easier for you to run existing applications on Cloudflare Workers, the following subset of APIs from Node.js are available directly as [Runtime APIs](/workers/runtime-apis/nodejs) in your Cloudflare Worker:

{{<directory-listing folderDirectory="/workers/runtime-apis/nodejs/" >}}

These APIs are available directly in the Workers runtime, without the need to add polyfills to your own code via the previous [`node_compat`](/workers/wrangler/configuration/#add-polyfills-using-wrangler) option in Wrangler.

Node.js APIs in Workers are available under the `node:` prefix, and this prefix must be used when importing modules, both in your code and the npm packages you depend on.

```js
// Do this:
import { Buffer } from "node:buffer";

//  Do not do this:
import { Buffer } from "buffer";
```

## Enable Node.js with Workers

Add the [`nodejs_compat`](/workers/platform/compatibility-dates/#nodejs-compatibility-flag) [compatibility flag](/workers/platform/compatibility-dates/#nodejs-compatibility-flag) to your `wrangler.toml`:

```toml
---
header: wrangler.toml
---
compatibility_flags = [ "nodejs_compat" ]
```

<!-- Add once https://github.com/cloudflare/cloudflare-docs/pull/8322 is merged -->
<!-- {{<render file="_nodejs-compat-local-dev.md">}} -->

## Enable Node.js with Pages Functions

### Enable with Wrangler

To enable `nodejs_compat` in local development, pass the [`--compatibility-flags`](/workers/wrangler/commands/#dev-1) argument with the `nodejs_compat` flag to `wrangler pages dev`:

```sh
$ wrangler pages dev [<DIRECTORY>] --compatibility-flags="nodejs_compat"
```

For additional options, refer to the list of [Pages-specific CLI commands](/workers/wrangler/commands/#dev-1).

### Enable Node.js from the Cloudflare dashboard

To enable Node.js for your Pages Function from the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages** and in **Overview**, select your Pages project.
3. Select **Settings** > **Functions** > **Compatibility Flags**.
4. Add the `nodejs_compat` compatibility flag to your Preview and Production deployments.
