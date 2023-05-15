---
pcx_content_type: concept
title: Build configuration
---

# Build configuration

You may tell Cloudflare Pages how your site needs to be built as well as where its output files will be located.

## Build commands and directories

You should provide a build command to tell Cloudflare Pages how to build your application. For projects not listed here, consider reading the tool's documentation or framework, and submit a pull request to add it here.

Build directories indicates where your project's build command outputs the built version of your Cloudflare Pages site. Often, this defaults to the industry-standard `public`, but you may find that you need to customize it.

<details>
<summary>Understanding your build configuration</summary>
<div>

The build command is provided by your framework. For example, the Gatsby framework uses `gatsby build` as its build command. When you are working without a framework, leave the **Build command** field blank.

The build directory is generated from the build command. Each framework has its own naming convention, for example, the build output directory is named `/public` for many frameworks.

The root directory is where your site’s content lives. If not specified, Cloudflare assumes that your linked git repository is the root directory. The root directory needs to be specified in cases like monorepos, where there may be multiple projects in one repository.

</div>
</details>

## Framework presets

Cloudflare maintains a list of build configurations for popular frameworks and tools. These are accessible during project creation. Below are some standard build commands and directories for popular frameworks and tools.

If you are not using a framework, leave the **Build command** field blank.

{{<table-wrap>}}

| Framework/tool               | Build command                        | Build directory             |
| ---------------------------- | ------------------------------------ | --------------------------- |
| Angular (Angular CLI)        | `ng build`                           | `dist`                      |
| Astro                        | `npm run build`                      | `dist`                      |
| Brunch                       | `brunch build --production`          | `public`                    |
| Docusaurus                   | `npm run build`                      | `build`                     |
| Eleventy                     | `eleventy`                           | `_site`                     |
| Ember.js                     | `ember build`                        | `dist`                      |
| Expo                         | `expo build:web`                     | `web-build`                 |
| Gatsby                       | `gatsby build`                       | `public`                    |
| GitBook                      | `gitbook build`                      | `_book`                     |
| Gridsome                     | `gridsome build`                     | `dist`                      |
| Hugo                         | `hugo`                               | `public`                    |
| Jekyll                       | `jekyll build`                       | `_site`                     |
| Jigsaw                       | `vendor/bin/jigsaw build production` | `build_production`          |
| mdBook                       | `mdbook build`                       | `book`                      |
| Mkdocs                       | `mkdocs build`                       | `site`                      |
| Next.js (Static HTML Export) | `next build && next export`          | `out`                       |
| Nuxt 2                       | `nuxt generate`                      | `dist`                      |
| Nuxt 3+                      | `nuxt build`                         | `dist`                      |
| Pelican                      | `pelican content [-s settings.py]`   | `output`                    |
| Quasar                       | `quasar build`                       | `dist/spa`                  |
| React (create-react-app)     | `npm run build`                      | `build`                     |
| React Static                 | `react-static build`                 | `dist`                      |
| Remix                        | `npm run build`                      | `public`                    |
| Slate                        | `./deploy.sh`                        | `build`                     |
| Svelte                       | `npm run build`                      | `public`                    |
| Umi                          | `umi build`                          | `dist`                      |
| Vue                          | `npm run build`                      | `public`                    |
| VuePress                     | `vuepress build $directory`          | `$directory/.vuepress/dist` |

{{</table-wrap>}}

## Environment variables

If your project makes use of environment variables to build your site, provide custom environment variables:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages** > your Pages project.
3. Select **Settings** > **Environment variables**.

The following system environment variables are injected by default (but can be overridden):

| Environment Variable  | Injected value                        | Example use-case                                                                        |
| --------------------- | ------------------------------------- | --------------------------------------------------------------------------------------- |
| `CF_PAGES`            | `1`                                   | Changing build behaviour when run on Pages versus locally                               |
| `CF_PAGES_COMMIT_SHA` | `<sha1-hash-of-current-commit>`       | Passing current commit ID to error reporting, for example, Sentry                       |
| `CF_PAGES_BRANCH`     | `<branch-name-of-current-deployment>` | Customizing build based on branch, for example, disabling debug logging on `production` |
| `CF_PAGES_URL`        | `<url-of-current-deployment>`         | Allowing build tools to know the URL the page will be deployed at                       |

## Language support and tools

Moved to [Language support and tools](/pages/platform/language-support-and-tools/).
