---
pcx_content_type: concept
title: Node.js compatibility
meta:
  description: Implemented Node.js runtime APIs and enablement instructions for your Worker project.
---

# Node.js compatibility

Most Workers import one or more packages of JavaScript or TypeScript code from [npm](https://www.npmjs.com/) as dependencies in `package.json`. Many of these packages rely on APIs from the [Node.js runtime](https://nodejs.org/en/about), and will not work unless these APIs are present.

To ensure compatibility with a wider set of npm packages, and make it easier for you to run existing applications on Cloudflare Workers, the following APIs from the [Node.js runtime](https://nodejs.org/en/about) are available directly as Workers runtime APIs, with no need to add polyfills to your own code:

{{<directory-listing>}}

Node.js APIs are available under the `node:` prefix, and this prefix must be used when importing modules, both in your code and the npm packages you depend on.

```js
// Do this:
import { Buffer } from 'node:buffer';

// Do not do this:
import { Buffer } from 'buffer';
```
Unless otherwise specified, implementations of Node.js APIs in Workers are intended to match the implementation in the [Current release of Node.js](https://github.com/nodejs/release#release-schedule).

## Enable Node.js with Workers

Add the [`nodejs_compat`](/workers/configuration/compatibility-dates/#nodejs-compatibility-flag) [compatibility flag](/workers/configuration/compatibility-dates/#nodejs-compatibility-flag) to your `wrangler.toml`:

```toml
---
header: wrangler.toml
---
compatibility_flags = [ "nodejs_compat" ]
```

## Enable Node.js with Pages Functions

### Enable Node.js with Wrangler

To enable `nodejs_compat` in local development, pass the [`--compatibility-flags`](/workers/wrangler/commands/#dev-1) argument with the `nodejs_compat` flag to `wrangler pages dev`:

```sh
$ npx wrangler pages dev [<DIRECTORY>] --compatibility-flags="nodejs_compat"
```

For additional options, refer to the list of [Pages-specific CLI commands](/workers/wrangler/commands/#dev-1).

### Enable Node.js from the Cloudflare dashboard

To enable Node.js for your Pages Function from the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages** and in **Overview**, select your Pages project.
3. Select **Settings** > **Functions** > **Compatibility Flags**.
4. Add the `nodejs_compat` compatibility flag to your Preview and Production deployments.

### Enable only AsyncLocalStorage

To enable the Node.js `AsyncLocalStorage` API only, use the `nodejs_als` compatibility flag.

```toml
---
header:wrangler.toml
---
compatibility_flags = [ "nodejs_als" ]
```

## Related resources

* Write your Worker code in [ES modules syntax](/workers/reference/migrate-to-module-workers/) for an optimized experience.
