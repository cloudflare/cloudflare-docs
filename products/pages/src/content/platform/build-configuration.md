# Build configuration

## Build commands and directories

You should provide a build command to tell Cloudflare Pages how to build your application. For projects not listed here, consider reading the tool's documentation or framework, and submit a pull request to add it here!

Build directories indicates where your project's build command outputs the built version of your Cloudflare Pages site. Often, this defaults to the industry-standard `public`, but you may find that you need to customize it.

Below are some standard build commands and directories for popular frameworks and tools.

<TableWrap>

| Framework/tool               | Build command                       | Build directory                                |
| ---------------------------- | ----------------------------------- | ---------------------------------------------- |
| Angular (Angular CLI)        | `ng build`                          | `dist`                                         |
| Brunch                       | `brunch build --production`         | `public`                                       |
| Docusaurus                   | `npm run build`                     | `build`                                        |
| Eleventy                     | `eleventy`                          | `_site`                                        |
| Ember.js                     | `ember build`                       | `dist`                                         |
| Gatsby                       | `gatsby build`                      | `public`                                       |
| Gridsome                     | `gridsome build`                    | `dist`                                         |
| Harp                         | `harp compile`                      | `www`                                          |
| Hexo                         | `hexo generate`                     | `public`                                       |
| Hugo                         | `hugo`                              | `public`                                       |
| Middleman                    | `middleman build`                   | `build`                                        |
| mdBook                       | `mdbook build path/to/book`         | `./book` (or `build.build-dir` in `book.toml`) |
| Mkdocs                       | `mkdocs build`                      | `site`                                         |
| Next.js (Static HTML Export) | `next build && next export`         | `out`                                          |
| Nuxt.js                      | `nuxt generate`                     | `dist`                                         |
| Pelican                      | `pelican $content [-s settings.py]` | `output`                                       |
| React (create-react-app)     | `npm run build`                     | `build`                                        |
| React Static                 | `react-static build`                | `dist`                                         |
| Slate                        | `./deploy.sh`                       | `build`                                        |
| Svelte                       | `npm run build`                     | `public`                                       |
| Umi                          | `umi build`                         | `dist`                                         |
| Vue                          | `npm run build`                     | `public`                                       |
| VuePress                     | `vuepress build $directory`         | `$directory/.vuepress/dist`                    |
| Zola                         | `zola build`                        | `public`                                       |

</TableWrap>

## Environment variables

If your project make use of environment variables to build your site, you can provide custom environment variables via the Pages UI.

## Language support and tools

Cloudflare Pages' build environment has broad support for a variety of languages, such as Ruby, Node.js, Python, PHP, and Go (and many more):

| Framework | Default version |
| --------- | --------------- |
| Elixir    | 1.7             |
| Emacs     | 25              |
| Erlang    | 21              |
| Java      | 8               |
| Node.js   | 10              |
| PHP       | 5.6             |
| Python    | 2.7             |
| Ruby      | 2.6.2           |

Many common tools have been pre-installed as well:

| Tools       | Notes                           |
| ----------- | ------------------------------- |
| Boot        |                                 |
| Cask        |                                 |
| Composer    |                                 |
| Doxygen     | Version 1.8.6                   |
| Gutenberg   |                                 |
| Hugo        | Version 0.54                    |
| GNU Make    | Version 3.8.1                   |
| ImageMagick | Version 6.7.7                   |
| jq          | Version 1.5                     |
| Leiningen   |                                 |
| OptiPNG     | Version 0.6.4                   |
| NPM         | Corresponds with NPM version    |
| pip         | Corresponds with Python version |
| Pipenv      | Latest version                  |
| Yarn        | Version 1.13.0                  |
| Zola        |                                 |

If you need to use a specific version of a language, e.g. Node.js or Ruby, you can specify it by providing an associated environment variable in your build configuration, or setting the relevant file in your source code. Below are some examples:

| Language/tool | Environment variable | File                      |
| ------------- | -------------------- | ------------------------- |
| Go            | `GO_VERSION`         |                           |
| Node.js       | `NODE_VERSION`       | `.nvmrc`, `.node-version` |
| NPM           | `NPM_VERSION`        |                           |
| Python        | `PYTHON_VERSION`     | `runtime.txt`, `Pipfile`  |
| Ruby          | `RUBY_VERSION`       | `.ruby-version`           |
| Yarn          | `YARN_VERSION`       |                           |

If you're looking to set a specific version of a framework your Cloudflare Pages project is using, note that Pages will respect your package manager of choice during your build process. For instance, if you use Gatsby.js, your `package.json` should indicate a version of the `gatsby` NPM package, which will be installed using `npm install` as your project builds on Cloudflare Pages.
