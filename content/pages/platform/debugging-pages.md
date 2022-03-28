---
pcx-content-type: concept
title: Debugging Pages
weight:
---

# Debugging Pages

When setting up your Pages project, you may encounter different errors that prevent you from successfully deploying your site. This guide gives an overview of some common errors and what you can do to solve them.

## Check your build log

You can see build errors in your Pages build log. To access your build log:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, go to **Pages**.
3. Find your project > **View build**.

![After logging into the Cloudflare dashboard, access the build log by following the instructions above](../media/pages-build-log.png)

### Initializing build environment

Possible errors in this step could be caused by improper installation during git integration. 

In GitHub, fix this by:
1. Logging into your Github account.
2. Going to **Settings** > find **Applications** under Integrations.
3. Finding **Cloudflare Pages** > **Configure** > scroll down and select **Uninstall**.
4. Readding the repository on the Cloudflare dashboard. 

In GitLab, fix this by:
1. Logging into your GitLab account.
2. Going to **Preferences** > **Applications**.
3. Find **Cloudflare Pages** > scroll down and select **Revoke**.

Be aware that you need a role of **Maintainer** or above to successfully link your repository, otherwise the build will fail.

### Cloning git repository

### Building application

### Deploying to Cloudflare's global network

## Resources

If your 

