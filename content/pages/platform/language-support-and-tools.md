---
pcx_content_type: concept
title: Language support and tools
layout: language-support-and-tools
rss: https://github.com/cloudflare/cloudflare-docs/commits/production/content/pages/_partials/_platform-language-support-and-tools.atom
outputs:
  - html
  - json
---

# Language support and tools

Cloudflare Pages' build environment has broad support for a variety of languages, such as Ruby, Node.js, Python, PHP, and Go.

If you need to use a specific version of a language, (for example, Node.js or Ruby) you can specify it by providing an associated environment variable in your build configuration, or setting the relevant file in your source code.

{{<Aside type="warning" header="v2 Beta">}}

We have recently annouced a [v2 beta](https://blog.cloudflare.com/moderizing-cloudflare-pages-builds-toolbox/) which brings several improvements to our build system. To migrate to this new version, configure your Pages project settings in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account. 
2. Select **Workers & Pages** and select your Pages project.
3. Go to **Settings** > **Build & deployments** > **Build system version** and select the latest version.

Notably, we have made changes to the default versions of languages and tools that are included. Submit feedback on v2 beta's selection in the [Cloudflare Developer Discord](https://discord.com/invite/cloudflaredev). If there are tools and languages you use that are missing, or if you experience any problems when migrating to v2, submit your feedback in the [Cloudflare Developer Discord](https://discord.com/invite/cloudflaredev).

If you were previously relying on the default versions of any languages or tools in the build system, your build may fail when migrating to v2. To fix this, you must specify the version you wish to use. Find details on how to do this for each of these languages and tools on this page. For example, if you were previously relying on the default version of Node.js in the v1 build system, to migrate to v2, you must specify that you need Node.js `12.18.0` by setting a `NODE_VERSION` environment variable or by adding a `.node-version` or `.nvmrc` file to your project.

During this beta period, we are aware of, and are in the process of fixing, the following issues:

- `Pipfile` support for setting a Python version

{{</Aside>}}

In the following table, review the preinstalled versions for tools included in the Cloudflare Pages build environment, and how to override them as relevant:

{{<languages>}}

Many common tools have been preinstalled in the Cloudflare Pages build environment. The environment variable available for overriding the preinstalled version is specified in the following table, as available:

{{<tools>}}

If you want to set a specific version of a framework your Cloudflare Pages project is using, note that Pages will respect your package manager of choice during your build process. For example, if you use Gatsby, your `package.json` should indicate a version of the `gatsby` npm package, which will be installed using `npm install` as your project builds on Cloudflare Pages.

## Build environment

Cloudflare Pages builds are run in a [gVisor](https://gvisor.dev/docs/) container.

{{<build-environment>}}
