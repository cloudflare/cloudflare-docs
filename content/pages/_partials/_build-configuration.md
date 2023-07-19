---
_build:
  publishResources: false
  render: never
  list: never

build_configs:
  create-react-app:
    display_name: Create React App
    build_command: npm run build
    build_output_directory: build
  gatsby:
    display_name: Gatsby
    build_command: gatsby build
    build_output_directory: public
  keywork:
    display_name: Keywork
    build_command: yarn build
    build_output_directory: dist
  next-js:
    display_name: Next.js
    build_command: npx @cloudflare/next-on-pages@1
    build_output_directory: .vercel/output/static
  next-js-static:
    display_name: Next.js (Static HTML Export)
    build_command: next build && next export
    build_output_directory: out
  nuxt-js:
    display_name: Nuxt.js
    build_command: npm run build
    build_output_directory: dist
  qwik:
    display_name: Qwik
    build_command: npm run build
    build_output_directory: dist
  remix:
    display_name: Remix
    build_command: npm run build
    build_output_directory: public
  svelte:
    display_name: Svelte
    build_command: npm run build
    build_output_directory: public
  sveltekit:
    display_name: SvelteKit
    build_command: npm run build
    build_output_directory: .svelte-kit/cloudflare
  vue:
    display_name: Vue
    build_command: npm run build
    build_output_directory: dist
  astro:
    display_name: Astro
    build_command: npm run build
    build_output_directory: dist
  angular-cli:
    display_name: Angular (Angular CLI)
    build_command: ng build --prod
    build_output_directory: dist
  brunch:
    display_name: Brunch
    build_command: brunch build --production
    build_output_directory: public
  docusaurus:
    display_name: Docusaurus
    build_command: npm run build
    build_output_directory: build
  eleventy:
    display_name: Eleventy
    build_command: eleventy
    build_output_directory: _site
  ember-js:
    display_name: Ember.js
    build_command: ember build
    build_output_directory: dist
  gitbook:
    display_name: GitBook
    build_command: gitbook build
    build_output_directory: _book
  gridsome:
    display_name: Gridsome
    build_command: gridsome build
    build_output_directory: dist
  hugo:
    display_name: Hugo
    build_command: hugo
    build_output_directory: public
  jekyll:
    display_name: Jekyll
    build_command: jekyll build
    build_output_directory: _site
  mkdocs:
    display_name: Mkdocs
    build_command: mkdocs build
    build_output_directory: site
  pelican:
    display_name: Pelican
    build_command: pelican content
    build_output_directory: output
  react-static:
    display_name: React Static
    build_command: react-static build
    build_output_directory: dist
  slate:
    display_name: Slate
    build_command: ./deploy.sh
    build_output_directory: build
  umi:
    display_name: Umi
    build_command: umi build
    build_output_directory: dist
  vuepress:
    display_name: VuePress
    build_command: vuepress build
    build_output_directory: .vuepress/dist
  zola:
    display_name: Zola
    build_command: zola build
    build_output_directory: public
---