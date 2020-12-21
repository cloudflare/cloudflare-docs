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
| Gatsby                       | `gatsby build`                      | `public`                                       |
| GitBook                      | `gitbook build`                     | `_book`                                        |
| Gridsome                     | `gridsome build`                    | `dist`                                         |
| Harp                         | `harp compile`                      | `www`                                          |
| Hexo                         | `hexo generate`                     | `public`                                       |
| Hugo                         | `hugo`                              | `public`                                       |
| Jekyll                       | `jekyll build`                      | `_site`                                        |
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
