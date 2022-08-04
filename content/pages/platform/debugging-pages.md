---
pcx_content_type: how-to
title: Debugging Pages
---

# Debugging Pages

When setting up your Pages project, you may encounter various errors that prevent you from successfully deploying your site. This guide gives an overview of some common errors and solutions.

## Check your build log

You can review build errors in your Pages build log. To access your build log:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, go to **Pages**.
3. Select your Pages project > **View build**.

![After logging in to the Cloudflare dashboard, access the build log by following the instructions above](../media/pages-build-log.png)

Possible errors in your build log are included in the following sections.

### Initializing build environment

Possible errors in this step could be caused by improper installation during git integration. 

To fix this in GitHub:
1. Log in to your Github account.
2. Go to **Settings**  from your user icon > find **Applications** under Integrations.
3. Find **Cloudflare Pages** > **Configure** > scroll down and select **Uninstall**.
4. Readd the repository on the Cloudflare dashboard. 

To fix this in GitLab:
1. Log in to your GitLab account.
2. Go to **Preferences** from your user icon > **Applications**.
3. Find **Cloudflare Pages** > scroll down and select **Revoke**.

Be aware that you need a role of **Maintainer** or above to successfully link your repository, otherwise the build will fail.

### Cloning git repository

Possible errors in this step could be caused by lack of Git Large File Storage (LFS). Check your LFS usage by referring to the [GitHub](https://docs.github.com/en/billing/managing-billing-for-git-large-file-storage/viewing-your-git-large-file-storage-usage) and [GitLab](https://docs.gitlab.com/ee/topics/git/lfs/) documentation.

Make sure to also review your submodule configuration by going to the `.gitmodules` file in your root directory. This file needs to contain both a `path` and a `url` property.

Example of a valid configuration:

```js
[submodule "example"]
	path = example/path
	url = git://github.com/example/repo.git
```

Example of an invalid configuration:

```js
[submodule "example"]
	path = example/path
```
or
```js
[submodule "example"]
        url = git://github.com/example/repo.git
```

### Building application

Possible errors in this step could be caused by faulty setup in your Pages project. Review your build command, output folder and environment variables for any incorrect configuration.

### Deploying to Cloudflare's global network

Possible errors in this step could be caused by incorrect Pages Functions configuration. Refer to the [Functions](/pages/platform/functions/) documentation for more information on Functions setup. 

If you are not using Functions or have reviewed that your Functions configuration does not contain any errors, review the [Cloudflare Status site](https://www.cloudflarestatus.com/) for Cloudflare network issues that could be causing the build failure. 

## Differences between `pages.dev` and custom domains

If your custom domain is proxied (orange-clouded) through Cloudflare, your zone's settings such as Auto Minify and caching will apply.

If you are experiencing issues with a framework, like Nuxt.js, only on the custom domain, review if Auto Minify is enabled (log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) > **Speed** > **Optimization** > **Auto Minify**) for HTML and disable it.

If you are experiencing issues with new content not being shown, go to **Rules** > **Page Rules** in the Cloudflare dashboard and check for a Page Rule with **Cache Everything** enabled. If present, remove this rule as Pages handles its own cache.

If you are experiencing errors on your custom domain but not on your `pages.dev` domain, go to **DNS** in the Cloudflare dashboard and set the DNS record for your project to be **DNS Only** (grey cloud). If the error persists, review your zone's configuration.

## Resources

If you need additional guidance on build errors, contact your Cloudflare account team (Enterprise) or refer to the [Support Center](https://support.cloudflare.com/hc/en-us/articles/200172476-Contacting-Cloudflare-Support) for guidance on contacting Cloudflare Support.

You can also ask questions in the Pages section of the [Cloudflare Developers Discord](https://discord.com/invite/cloudflaredev).

