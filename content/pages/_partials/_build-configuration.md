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
    icon: /icons/framework-icons/logo-react.svg
  gatsby:
    display_name: Gatsby
    build_command: npx gatsby build
    build_output_directory: public
    icon: /icons/framework-icons/logo-gatsby.svg
  next-js:
    display_name: Next.js
    build_command: npx @cloudflare/next-on-pages@1
    build_output_directory: .vercel/output/static
    icon: /icons/framework-icons/logo-next-js.svg
  next-js-static:
    display_name: Next.js (Static HTML Export)
    build_command: npx next build
    build_output_directory: out
    icon: /icons/framework-icons/logo-next-js.svg
  nuxt-js:
    display_name: Nuxt.js
    build_command: npm run build
    build_output_directory: dist
    icon: /icons/framework-icons/logo-nuxt-js.svg
  qwik:
    display_name: Qwik
    build_command: npm run build
    build_output_directory: dist
    icon: /icons/framework-icons/logo-qwik.svg
  remix:
    display_name: Remix
    build_command: npm run build
    build_output_directory: public
    icon: /icons/framework-icons/logo-remix.svg
  svelte:
    display_name: Svelte
    build_command: npm run build
    build_output_directory: public
    icon: /icons/framework-icons/logo-svelte.svg
  sveltekit:
    display_name: SvelteKit
    build_command: npm run build
    build_output_directory: .svelte-kit/cloudflare
    icon: /icons/framework-icons/logo-svelte.svg
  vue:
    display_name: Vue
    build_command: npm run build
    build_output_directory: dist
    icon: /icons/framework-icons/logo-vue.svg
  astro:
    display_name: Astro
    build_command: npm run build
    build_output_directory: dist
    icon: /icons/framework-icons/logo-astro.svg
  angular-cli:
    display_name: Angular (Angular CLI)
    build_command: npx ng build --prod
    build_output_directory: dist
    icon: /icons/framework-icons/logo-angular-cli.svg
  brunch:
    display_name: Brunch
    build_command: npx brunch build --production
    build_output_directory: public
    icon: /icons/framework-icons/logo-brunch.svg
  docusaurus:
    display_name: Docusaurus
    build_command: npm run build
    build_output_directory: build
    icon: /icons/framework-icons/logo-docusaurus.svg
  elder-js:
    display_name: Elder.js
    build_command: npm run build
    build_output_directory: public
    icon: /icons/framework-icons/logo-elder-js.png
  eleventy:
    display_name: Eleventy
    build_command: npx @11ty/eleventy
    build_output_directory: _site
    icon: /icons/framework-icons/logo-eleventy.svg
  ember-js:
    display_name: Ember.js
    build_command: npx ember-cli build
    build_output_directory: dist
    icon: /icons/framework-icons/logo-ember-js.svg
  gitbook:
    display_name: GitBook
    build_command: npx gitbook-cli build
    build_output_directory: _book
    icon: /icons/framework-icons/logo-gitbook.svg
  gridsome:
    display_name: Gridsome
    build_command: npx gridsome build
    build_output_directory: dist
    icon: /icons/framework-icons/logo-gridsome.svg
  hugo:
    display_name: Hugo
    build_command: hugo
    build_output_directory: public
    icon: /icons/framework-icons/logo-hugo.svg
  jekyll:
    display_name: Jekyll
    build_command: jekyll build
    build_output_directory: _site
    icon: /icons/framework-icons/logo-jekyll.svg
  mkdocs:
    display_name: MkDocs
    build_command: mkdocs build
    build_output_directory: site
    icon: /icons/framework-icons/logo-mkdocs.svg
  pelican:
    display_name: Pelican
    build_command: pelican content
    build_output_directory: output
    icon: /icons/framework-icons/logo-pelican.svg
  react-static:
    display_name: React Static
    build_command: react-static build
    build_output_directory: dist
    icon: /icons/framework-icons/logo-react-static.svg
  slate:
    display_name: Slate
    build_command: ./deploy.sh
    build_output_directory: build
    icon: /icons/framework-icons/logo-slate.svg
  umi:
    display_name: Umi
    build_command: npx umi build
    build_output_directory: dist
    icon: /icons/framework-icons/logo-umi-js.svg
  vuepress:
    display_name: VuePress
    build_command: npx vuepress build
    build_output_directory: .vuepress/dist
    icon: /icons/framework-icons/logo-vuepress.svg
  zola:
    display_name: Zola
    build_command: zola build
    build_output_directory: public
    icon: /icons/framework-icons/logo-zola.svg
---