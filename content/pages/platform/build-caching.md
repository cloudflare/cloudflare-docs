---
pcx_content_type: concept
title: Build caching
---

# Build caching

Build caching may improve build times by saving and restoring dependencies and build output between builds.

## Requirements

Build caching requires the [V2 build system](/pages/platform/language-support-and-tools/) or later. To update from V1:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages** > in **Overview**, select your Pages project.
3. Go to **Settings** > **Build & deployments** > **Build system version** and select the latest version.

## Configuration

### Enable build caching

Build caching can be enabled and disabled in the Cloudflare Dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, select your Pages project.
4. Go to **Settings** > **Builds & deployments** > **Build cache** and select **Enable build cache**.

### Clear cache

The build cache can be cleared for a project if needed, such as when debugging build issues.

To clear the build cache:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, select your Pages project.
4. Go to **Settings** > **Builds & deployments** > **Build cache** and select **Clear cache** to clear the build cache.

## How build caching works

When enabled, the build cache will automatically detect and cache data from each build. See below for what directories are automatically saved and restored from the build cache.

### Package managers

Package manager caches are automatically saved to the build cache to speed up dependency installation. The build cache supports the following package managers:

| Package manager | Directories cached |
| --------------- | ------------------ |
| yarn            | yarn cache         |
| npm             | npm cache          |
| pnpm            | pnpm store         |

### Frameworks

Caching the build output from frameworks may significantly speed up subsequent build times. The build cache supports the following frameworks:

| Framework | Directories cached |
| --------- | ------------------ |
| Gatsby    | `.cache`, `public` |
| Next.js   | `.next/cache`      |
