---
title: Community resources
pcx_content_type: reference
weight: 10
structured_data: true
---

# Community resources

Community resources for our customers to help them integrate Turnstile.

{{<Aside type="warning">}}
These resources are made by the **community** and not maintained directly by Cloudflare.

As such, Cloudflare is not liable for any damages arising from using them.
{{</Aside>}}

{{<Aside type="note">}}
Did we miss your library? [Contribute to our list][1].

[1]: https://github.com/cloudflare/cloudflare-docs/blob/production/CONTRIBUTING.md#pull-requests
{{</Aside>}}

## Client-side rendering libraries

Libraries that only support the client-side rendering of Turnstile:

- React
  - [react-turnstile](https://www.npmjs.com/package/react-turnstile)
  - [@marsidev/react-turnstile](https://www.npmjs.com/package/@marsidev/react-turnstile)

{{<Aside type="note">}}
Cloudflare recommends [@marsidev/react-turnstile](https://www.npmjs.com/package/@marsidev/react-turnstile) when rendering Turnstile. We have deployed an implementation of the library and can confirm that it is safe to use and works as expected.
{{</Aside>}}

- Vue
  - [cfturnstile-vue3](https://www.npmjs.com/package/cfturnstile-vue3)
  - [vue-turnstile](https://www.npmjs.com/package/vue-turnstile)
- [Angular](https://www.npmjs.com/package/ngx-turnstile)
- [Svelte](https://www.npmjs.com/package/svelte-turnstile)

## Server-side validation libraries

Libraries that only support the server-side validation of Turnstile:

- [fastify-cloudflare-turnstile](https://www.npmjs.com/package/fastify-cloudflare-turnstile)

## Full-stack libraries

Libraries that both support the both client-side rendering and server-side validation of Turnstile:

- [Nuxt](https://www.npmjs.com/package/@nuxtjs/turnstile)
- [Laravel](https://github.com/romanzipp/Laravel-Turnstile)
- [Phoenix](https://github.com/jsonmaur/phoenix-turnstile)

## Integrations

Turnstile integrations for popular content management systems:

- [Craft CMS](https://plugins.craftcms.com/turnstile)
- [Google Forms](https://github.com/ModMalwareInvestigation/turnstile-for-forms)
- [SilverStripe](https://github.com/webbuilders-group/silverstripe-turnstile)
- [Statamic](https://statamic.com/addons/aryeh-raber/captcha)
- [WordPress](https://wordpress.org/plugins/simple-cloudflare-turnstile)

## Other

Other resources related to integrating Turnstile:

- TypeScript definitions
  - [turnstile-types](https://www.npmjs.com/package/turnstile-types)
  - [@types/cloudflare-turnstile](https://www.npmjs.com/package/@types/cloudflare-turnstile)
