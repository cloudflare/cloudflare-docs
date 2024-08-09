---
pcx_content_type: reference
title: Supported features
meta:
  title: Supported features
---

# Supported Versions and Features

## Supported Next.js versions

`@cloudflare/next-on-pages` supports all minor and patch version of Next.js 13 and 14. We regularly run manual and automated tests to ensure compatibility.

### Node.js

Next.js has [two "runtimes"](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes) — "Edge" and "Node.js". When you run your Next.js app on Cloudflare, you [can use available Node.js APIs](/workers/runtime-apis/nodejs/) — but you currently can only use Next.js' "Edge" runtime.

The Workers runtime [supports a broad set of Node.js APIs](workers/platform/nodejs-compatibility/) — but [the Next.js Edge Runtime code intentionally constrains this](https://github.com/vercel/next.js/blob/canary/packages/next/src/build/webpack/plugins/middleware-plugin.ts#L820). As a result, only the following Node.js APIs work in a Next.js app:

- `buffer`
- `events`
- `assert`
- `util`
- `async_hooks`

## Supported Features

### Routers

Both the older [Pages](https://nextjs.org/docs/pages) router and newer [App](https://nextjs.org/docs/app) router from Next.js are supported. Cloudlflare recommends using the App router.

### next.config.mjs Properties

[`next.config.js` — app router](https://nextjs.org/docs/app/api-reference/next-config-js) and [`next.config.js - pages router](https://nextjs.org/docs/pages/api-reference/next-config-js)

| Option                              | Next Docs                                                                                                                                                                                    | Support              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| appDir                              | [app](https://nextjs.org/docs/app/api-reference/next-config-js/appDir)                                                                                                                       | ✅                   |
| assetPrefix                         | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/assetPrefix), [app](https://nextjs.org/docs/app/api-reference/next-config-js/assetPrefix)                                 | 🔄                   |
| basePath                            | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/basePath), [app](https://nextjs.org/docs/app/api-reference/next-config-js/basePath)                                       | ✅                   |
| compress                            | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/compress), [app](https://nextjs.org/docs/app/api-reference/next-config-js/compress)                                       | `N/A`<sup>1</sup>    |
| devIndicators                       | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/devIndicators), [app](https://nextjs.org/docs/app/api-reference/next-config-js/devIndicators)                             | `N/A`<sup>2</sup>    |
| distDir                             | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/distDir), [app](https://nextjs.org/docs/app/api-reference/next-config-js/distDir)                                         | `N/A`<sup>3</sup>    |
| env                                 | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/env), [app](https://nextjs.org/docs/app/api-reference/next-config-js/env)                                                 | ✅                   |
| eslint                              | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/eslint), [app](https://nextjs.org/docs/app/api-reference/next-config-js/eslint)                                           | ✅                   |
| exportPathMap                       | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/exportPathMap), [app](https://nextjs.org/docs/app/api-reference/next-config-js/exportPathMap)                             | `N/A`<sup>4</sup>    |
| generateBuildId                     | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/generateBuildId), [app](https://nextjs.org/docs/app/api-reference/next-config-js/generateBuildId)                         | ✅                   |
| generateEtags                       | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/generateEtags), [app](https://nextjs.org/docs/app/api-reference/next-config-js/generateEtags)                             | 🔄                   |
| headers                             | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/headers), [app](https://nextjs.org/docs/app/api-reference/next-config-js/headers)                                         | ✅                   |
| httpAgentOptions                    | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/httpAgentOptions), [app](https://nextjs.org/docs/app/api-reference/next-config-js/httpAgentOptions)                       | `N/A`                |
| images                              | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/images), [app](https://nextjs.org/docs/app/api-reference/next-config-js/images)                                           | ✅                   |
| incrementalCacheHandlerPath         | [app](https://nextjs.org/docs/app/api-reference/next-config-js/incrementalCacheHandlerPath)                                                                                                  | 🔄                   |
| logging                             | [app](https://nextjs.org/docs/app/api-reference/next-config-js/logging)                                                                                                                      | `N/A`<sup>5</sup>    |
| mdxRs                               | [app](https://nextjs.org/docs/app/api-reference/next-config-js/mdxRs)                                                                                                                        | ✅                   |
| onDemandEntries                     | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/onDemandEntries), [app](https://nextjs.org/docs/app/api-reference/next-config-js/onDemandEntries)                         | `N/A`<sup>6</sup>    |
| optimizePackageImports              | [app](https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports)                                                                                                       | ✅/`N/A`<sup>7</sup> |
| output                              | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/output), [app](https://nextjs.org/docs/app/api-reference/next-config-js/output)                                           | `N/A`<sup>8</sup>    |
| pageExtensions                      | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/pageExtensions), [app](https://nextjs.org/docs/app/api-reference/next-config-js/pageExtensions)                           | ✅                   |
| Partial Prerendering (experimental) | [app](https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering)                                                                                                         | ❌<sup>9</sup>       |
| poweredByHeader                     | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/poweredByHeader), [app](https://nextjs.org/docs/app/api-reference/next-config-js/poweredByHeader)                         | 🔄                   |
| productionBrowserSourceMaps         | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/productionBrowserSourceMaps), [app](https://nextjs.org/docs/app/api-reference/next-config-js/productionBrowserSourceMaps) | 🔄<sup>10</sup>      |
| reactStrictMode                     | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/reactStrictMode), [app](https://nextjs.org/docs/app/api-reference/next-config-js/reactStrictMode)                         | ❌<sup>11</sup>      |
| redirects                           | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/redirects), [app](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)                                     | ✅                   |
| rewrites                            | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites), [app](https://nextjs.org/docs/app/api-reference/next-config-js/rewrites)                                       | ✅                   |
| Runtime Config                      | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/runtime-configuration), [app](https://nextjs.org/docs/app/api-reference/next-config-js/runtime-configuration)             | ❌<sup>12</sup>      |
| serverActions                       | [app](https://nextjs.org/docs/app/api-reference/next-config-js/serverActions)                                                                                                                | ✅                   |
| serverComponentsExternalPackages    | [app](https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages)                                                                                             | `N/A`<sup>13</sup>   |
| trailingSlash                       | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/trailingSlash), [app](https://nextjs.org/docs/app/api-reference/next-config-js/trailingSlash)                             | ✅                   |
| transpilePackages                   | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/transpilePackages), [app](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages)                     | ✅                   |
| turbo                               | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/turbo), [app](https://nextjs.org/docs/app/api-reference/next-config-js/turbo)                                             | 🔄                   |
| typedRoutes                         | [app](https://nextjs.org/docs/app/api-reference/next-config-js/typedRoutes)                                                                                                                  | ✅                   |
| typescript                          | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/typescript), [app](https://nextjs.org/docs/app/api-reference/next-config-js/typescript)                                   | ✅                   |
| urlImports                          | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/urlImports), [app](https://nextjs.org/docs/app/api-reference/next-config-js/urlImports)                                   | ✅                   |
| webpack                             | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/webpack), [app](https://nextjs.org/docs/app/api-reference/next-config-js/webpack)                                         | ✅                   |
| webVitalsAttribution                | [pages](https://nextjs.org/docs/pages/api-reference/next-config-js/webVitalsAttribution), [app](https://nextjs.org/docs/app/api-reference/next-config-js/webVitalsAttribution)               | ✅                   |

    - ✅: Supported
    - 🔄: Not currently supported
    - ❌: Not supported
    - N/A: Not applicable

- _1_ - **compression**: [Cloudflare applies gzip or brotli compression](https://developers.cloudflare.com/support/speed/optimization-file-size/what-will-cloudflare-compress) automatically. When developing locally with Wrangler, no compression is applied.

- _2_ - **dev indicators**: If you're developing using `wrangler pages dev`, it hard refreshes your application the dev indicator doesn't appear. If you run your app locally using `next dev`, this option works fine.

- _3_ - **setting custom build directory**: Applications built using `@cloudflare/next-on-pages` don't rely on the `.next` directory so this option isn't really applicable (the `@cloudflare/next-on-pages` equivalent is to use the `--outdir` flag).

- _4_ - **exportPathMap**: Option used for SSG not applicable for apps built using `@cloudflare/next-on-pages`.

- _5_ - **logging**: If you're developing using `wrangler pages dev`, the extra logging is not applied (since you are effectively running a production build). If you run your app locally using `next dev`, this option works fine.

- _6_ - **onDemandEntries**: Not applicable since it's an option for the Next.js server during development which we don't rely on.

- _7_ - **optimizePackageImports**: `@cloudflare/next-on-pages` performs chunks deduplication and provides an implementation based on modules lazy loading, based on this applying an `optimizePackageImports` doesn't have an impact on the output produced by the CLI. This configuration can still however be used to speed up the build process (both when running `next dev` or when generating a production build).

- _8_ - **output**: `@cloudflare/next-on-pages` works with the standard Next.js output, `standalone` is incompatible with it, `export` is used to generate a static site which doesn't need `@cloudflare/next-on-pages` to run.

- _9_ - **Partial Prerendering (experimental)**: As presented in the official [Next.js documentation](https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering): `Partial Prerendering is designed for the Node.js runtime only.`, as such it is fundamentally incompatibly with `@cloudflare/next-on-pages` (which only works on the edge runtime).

- _10_ - **productionBrowserSourceMaps**: The webpack chunks deduplication performed by `@cloudflare/next-on-pages` doesn't currently preserve source maps in any case so this option can't be implemented either. In the future we might try to preserver source maps, in such case it should be simple to also support this option.

- _11_ - **reactStrictMode**: Currently we build the application so react strict mode (being a local dev feature) doesn't work either way. If we can make strict mode work, this option will most likely work straight away.

- _12_ - **runtime configuration**: We could look into implementing the runtime configuration but it is probably not worth it since it is a legacy configuration and environment variables should be used instead.

- _13_ - **serverComponentsExternalPackages**: This option is for applications running on Node.js so it's not relevant to applications running on Cloudflare Pages.

### Internationalization

Besides the above mentioned `next.config.js` properties, there is also the `i18n` one, that is also fully supported meaning that `@cloudflare/next-on-pages` does support Next.js' built-in internationalization system. For more details on the option see the [Next.js Internationalization documentation](https://nextjs.org/docs/pages/building-your-application/routing/internationalization).

### Rendering and Data Fetching

#### Incremental Static Regeneration

Incremental Static Regeneration (ISR) is a rendering mode in Next.js that allows you to automatically cache and periodically regenerate pages with fresh data. Next.js [does not support](https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration) building ISR pages for the edge runtime, and as such, pages should be changed to use server side rendering (SSR) instead.

ISR pages are built by the Vercel CLI to generate Vercel [Prerender Functions](https://vercel.com/docs/build-output-api/v3/primitives#prerender-functions). These are Node.js serverless functions that can be called in the background while serving the page from the cache. It is not possible to use these with Cloudflare Pages and they are not compatible with the [edge runtime](https://nextjs.org/docs/app/api-reference/edge) currently.

In case the Vercel build process generates prerendered pages for your application, `@cloudflare/next-on-pages` will use static fallback files that are generated by the build process so that your application will still correctly serve your ISR/prerendered pages (but without the regeneration aspect).

#### Dynamic handling of static routes

`@cloudflare/next-on-pages` supports standard statically generated routes, it does however not support dynamic Node.js-based on-demand handling of such routes.

For more details see:

- [troubleshooting `generateStaticParams`](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-nextjs-site/#generatestaticparams)
- [troubleshooting `getStaticPaths` ](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-nextjs-site/#getstaticpaths)

#### Caching and Data Revalidation

Revalidation and `next/cache` are supported on Cloudflare Pages, and can use various bindings. For more information, see our [caching documentation](./caching.md).