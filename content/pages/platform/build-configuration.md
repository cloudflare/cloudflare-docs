---
pcx-content-type: concept
title: Build configuration
---

# Build configuration

You may tell Cloudflare Pages how your site needs to be built as well as where its output files will be located.

## Build commands and directories

You should provide a build command to tell Cloudflare Pages how to build your application. For projects not listed here, consider reading the tool's documentation or framework, and submit a pull request to add it here.

Build directories indicates where your project's build command outputs the built version of your Cloudflare Pages site. Often, this defaults to the industry-standard `public`, but you may find that you need to customize it.

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
| Mkdocs                       | `mkdocs build`                       | `site`                      |
| Next.js (Static HTML Export) | `next build && next export`          | `out`                       |
| Nuxt.js                      | `nuxt generate`                      | `dist`                      |
| Pelican                      | `pelican $content [-s settings.py]`  | `output`                    |
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

If your project makes use of environment variables to build your site, you can provide custom environment variables by going to **Account Home** > **Pages** > **your Pages project** > **Settings** > **Environment variables**.

The following system environment variables are injected by default (but can be overridden):

| Environment Variable  | Injected value                        | Example use-case                                                                        |
| --------------------- | ------------------------------------- | --------------------------------------------------------------------------------------- |
| `CF_PAGES`            | `1`                                   | Changing build behaviour when run on Pages versus locally                               |
| `CF_PAGES_COMMIT_SHA` | `<sha1-hash-of-current-commit>`       | Passing current commit ID to error reporting, for example, Sentry                       |
| `CF_PAGES_BRANCH`     | `<branch-name-of-current-deployment>` | Customizing build based on branch, for example, disabling debug logging on `production` |
| `CF_PAGES_URL`        | `<url-of-current-deployment>`         | Allowing build tools to know the URL the page will be deployed at                       |

## Language support and tools

Cloudflare Pages' build environment has broad support for a variety of languages, such as Ruby, Node.js, Python, PHP, and Go.

If you need to use a specific version of a language, (for example, Node.js or Ruby) you can specify it by providing an associated environment variable in your build configuration, or setting the relevant file in your source code.

Here are the pinned versions for tools included in the Cloudflare Workers build environment, and how to override them as relevant:

| Framework | Default version | Environment variable | File                      |
| --------- | --------------- | -------------------- | ------------------------- |
| Elixir    | 1.7             |                      |                           |
| Erlang    | 21              |                      |                           |
| Go        | 1.12            | `GO_VERSION`         |                           |
| Java      | 8               |                      |                           |
| Node.js   | 12.18.0         | `NODE_VERSION`       | `.nvmrc`, `.node-version` |
| PHP       | 5.6             | `PHP_VERSION`        |                           |
| Python    | 2.7             | `PYTHON_VERSION`     | `runtime.txt`, `Pipfile`  |
| Ruby      | 2.6.2           | `RUBY_VERSION`       | `.ruby-version`           |
| .NET      | 3.1.302         |                      |                           |

Many common tools have been pre-installed as well. The environment variable available for overriding the pinned version is specified, as available:

| Tools       | Notes                            | Environment variable |
| ----------- | -------------------------------- | -------------------- |
| Boot        |                                  |                      |
| Cask        |                                  |                      |
| Composer    |                                  |                      |
| Doxygen     | Version 1.8.6                    |                      |
| Emacs       | 25                               |                      |
| Gutenberg   | (requires environment variable)  | `GUTENBERG_VERSION`  |
| Hugo        | Version 0.54                     | `HUGO_VERSION`       |
| GNU Make    | Version 3.8.1                    |                      |
| ImageMagick | Version 6.7.7                    |                      |
| jq          | Version 1.5                      |                      |
| Leiningen   |                                  |                      |
| OptiPNG     | Version 0.6.4                    |                      |
| NPM         | Corresponds with Node.js version | `NPM_VERSION`        |
| pip         | Corresponds with Python version  |                      |
| Pipenv      | Latest version                   |                      |
| Yarn        | Version 1.13.0                   | `YARN_VERSION`       |
| Zola        | (requires environment variable)  | `ZOLA_VERSION`       |

If you want to set a specific version of a framework your Cloudflare Pages project is using, note that Pages will respect your package manager of choice during your build process. For example, if you use Gatsby.js, your `package.json` should indicate a version of the `gatsby` npm package, which will be installed using `npm install` as your project builds on Cloudflare Pages.

## Supported versions

Below is a list of language versions that Cloudflare Pages supports.

* Ruby - `RUBY_VERSION`, `.ruby-version`  
    - Minimum: `2.6.2`  
    - Maximum: `2.7.5`  

* Node.js - `NODE_VERSION`, `.nvmrc`, `.node-version`
    * 12.18.0 (default)
    * Any version that nvm can install.

* Python - `PYTHON_VERSION`, `runtime.txt`, `Pipfile`  
    2.7 (default)  
    3.5  
    3.7  

* PHP - `PHP_VERSION`
    5.6 (default)
    7.2
    7.4

* Go - `GO_VERSION`
    1.14.4 (default)
    Any version available on the Go downloads page.

* Java
 8 (default)
 Emacs
 25 (default)

* Erlang
    21 (default)

* Elixir
    1.7 (default)

* Swift - `SWIFT_VERSION`, `.swift-version`
    Not installed by default.
    Supports any version that swiftenv can install later than `4.x`. Versions `4.x` and earlier will not work due to incompatible shared libraries.
    5.2 is installed if `Package.swift` is present and no version is specified with `SWIFT_VERSION` or `.swift-version`.

* Rust
    Not installed by default.
    Supports any version that rustup can install.

Below is a list of tool versions that Cloudflare Pages supports.

* Node.js
    Yarn - `YARN_VERSION`
        1.22.10 (default)
        Any version available via their installer.
    npm - `NPM_VERSION`
        Version corresponding with Node.js version. (default)
        Any version available via npm.
    bower

* Python
    pip
        Version corresponding with Python version. (default)
    Pipenv
        Latest version.
* PHP
    Composer

* Emacs
    Cask

* Clojure
    Leiningen
        stable
    Boot
        2.5.2

Below is a list of framework versions that Cloudflare Pages supports.

* Hugo - `HUGO_VERSION`
    0.54 extended (default)
    Any version installable via `binrc`.

Gutenburg - `GUTENBERG_VERSION`
    Any version installable via `binrc`.

* Zola - `ZOLA_VERSION`
    Any version installable via binrc.

* jq
    1.5

* ImageMagick
    6.7.7

* GNU Make
    3.81

* OptiPNG
    0.6.4

* Doxygen
    1.8.6

* Homebrew 
    Early alpha.
