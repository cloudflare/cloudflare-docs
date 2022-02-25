---
order: 2
pcx-content-type: concept
---

# Build configuration

You may tell Cloudflare Pages how your site needs to be built as well as where its output files will be located.

## Build commands and directories

You should provide a build command to tell Cloudflare Pages how to build your application. For projects not listed here, consider reading the tool's documentation or framework, and submit a pull request to add it here.

Build directories indicates where your project's build command outputs the built version of your Cloudflare Pages site. Often, this defaults to the industry-standard `public`, but you may find that you need to customize it.

## Framework presets

Cloudflare maintains a list of build configurations for popular frameworks and tools. These are accessible during project creation. Below are some standard build commands and directories for popular frameworks and tools.

If you are not using a framework, leave the **Build command** field blank.

<TableWrap>

| Framework/tool               | Build command                        | Build directory             |
| ---------------------------- | ------------------------------------ | --------------------------- |
| Angular (Angular CLI)        | `ng build`                           | `dist`                      |
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

</TableWrap>

## Environment variables

If your project makes use of environment variables to build your site, you can provide custom environment variables by going to **Account Home** > **Pages** > **your Pages project** > **Settings** > **Environment variables**.

The following system environment variables are injected by default (but can be overridden):

| Environment Variable  | Injected value                        | Example use-case                                                               |
| --------------------- | ------------------------------------- | ------------------------------------------------------------------------------ |
| `CF_PAGES`            | `1`                                   | Changing build behaviour when run on Pages versus locally                          |
| `CF_PAGES_COMMIT_SHA` | `<sha1-hash-of-current-commit>`       | Passing current commit ID to error reporting, for example, Sentry                       |
| `CF_PAGES_BRANCH`     | `<branch-name-of-current-deployment>` | Customizing build based on branch, for example, disabling debug logging on `production` |

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
