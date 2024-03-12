---
pcx_content_type: configuration
title: Create a new application
weight: 1
meta:
  description: Install and use C3 to create your first application.
---

# C3 (`create-cloudflare` CLI)

[C3 (create-cloudflare-cli)](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

In addition to speed, it leverages officially developed templates for Workers and framework-specific setup guides to ensure each new application that you set up follows Cloudflare and any third-party best practices for deployment on the Cloudflare network.

## Create a new application

To get started, open a terminal window and run:

```sh
$ npm create cloudflare@latest
```

Running `npm create cloudflare@latest` will prompt you to install the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) package, and lead you through a setup wizard. After you have entered the setup wizard, you will be asked which type of application you would like to create.

The list of applications includes a variety of [Workers](/workers/) templates as well as options to select a web framework to create a website or web application with [Cloudflare Pages](/pages/).

## Web frameworks

If you choose to create a new website or application using a web framework, C3 will prompt you to choose one of the following supported frameworks:

- Angular
- Astro
- Docusaurus
- Gatsby
- Hono
- Next
- Nuxt
- Qwik
- React
- Remix
- Solid
- Svelte
- Vue

## Deploy

Once your project has been configured, you will be asked if you would like to deploy the project to Cloudflare. This is optional.

If you choose not to deploy, the project will be created for you locally, and C3 will display some helpful links for further development. Go to the newly created project folder to begin development.

If you choose to deploy, you will be asked to authenticate (if not logged in already), and your project will be deployed immediately. C3 will display your project's URL and some helpful links.