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

In the following table, review the preinstalled versions for tools included in the Cloudflare Pages build environment, and how to override them as relevant:

{{<languages>}}

Many common tools have been preinstalled in the Cloudflare Pages build environment. The environment variable available for overriding the preinstalled version is specified in the following table, as available:

{{<tools>}}

If you want to set a specific version of a framework your Cloudflare Pages project is using, note that Pages will respect your package manager of choice during your build process. For example, if you use Gatsby, your `package.json` should indicate a version of the `gatsby` npm package, which will be installed using `npm install` as your project builds on Cloudflare Pages.

## Build environment

Cloudflare Pages builds are run in a [gVisor](https://gvisor.dev/docs/) container.

{{<build-environment>}}
