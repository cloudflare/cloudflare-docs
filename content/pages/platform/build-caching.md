---
pcx_content_type: concept
title: Build caching
---

# Build caching (beta)

Improve Pages build times by turning on build caching to restore dependencies and build output between builds. The first build to occur after enabling build caching on your Pages project will save to cache. Every subsequent build will restore from cache unless configured otherwise.

## Requirements

Build caching requires the [V2 build system](/pages/platform/language-support-and-tools/) or later. To update from V1, refer to the [V2 build system migration instructions](/pages/platform/language-support-and-tools/#v2-build-system).

## Configuration

### Enable build caching

To enable build caching in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, select your Pages project.
4. Go to **Settings** > **Builds & deployments** > **Build cache** and select **Enable build cache**.

### Clear cache

The build cache can be cleared for a project if needed, such as when debugging build issues. To clear the build cache:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, select your Pages project.
4. Go to **Settings** > **Builds & deployments** > **Build cache**.
5. Select **Clear cache** to clear the build cache.

## How build caching works

When enabled, the build cache will automatically detect and cache data from each build. Refer to [Frameworks]() to review what directories are automatically saved and restored from the build cache.

### Package managers

Package manager caches are automatically saved to the build cache to speed up dependency installation. Pages will cache the global cache directories of the following package managers:

* [yarn 1](https://yarnpkg.com/)
* [npm](https://www.npmjs.com/)
* [pnpm](https://pnpm.io/)
* [bun](https://bun.sh/)


### Frameworks

Caching the build output from frameworks can speed up subsequent build times. The build cache supports the following frameworks:

| Framework | Directories cached   |
| --------- | ---------------------|
| Gatsby    | `.cache`, `public`   |
| Next.js   | `.next/cache`        |
| Astro     | `node_modules/.astro`|

## Limits
During this beta period, the following limits are imposed: 
* **Retention**: Cache is purged seven days after its last read date. Unread cache artifacts are purged seven days after creation.
* **Storage**: Every project is allocated 10 GB. If the project cache exceeds this limit, the project will automatically start deleting artifacts that were read least recently.

## Feedback

If there are package managers or frameworks you want to see supported, let us know in the Pages channel of the [Cloudflare Developer Discord](https://discord.com/invite/cloudflaredev). 
