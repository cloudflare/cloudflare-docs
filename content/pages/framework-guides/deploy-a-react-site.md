---
pcx_content_type: how-to
title: Deploy a React site
---

# Deploy a React site

[React](https://reactjs.org/) is a popular framework for building reactive and powerful front-end applications, built by the open-source team at Facebook.

In this guide, you will create a new React application and deploy it using Cloudflare Pages. You will use `create-react-app`, a batteries-included tool for generating new React applications.

## Setting up a new project

Create a new project using `npx`, giving it the title `my-react-app` in your terminal.

```sh
$ npx create-react-app my-react-app
```

And move into the application's directory via:

```sh
$ cd my-react-app
```

From here you can run your application with:

```sh
$ npm start
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="_create-github-repository_no_init.md">}}

## Deploying with Cloudflare Pages

To deploy your site to Pages:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In Account Home, select **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

<div>

{{<pages-build-preset framework="create-react-app">}}

</div>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `create-react-app`, your project dependencies, and building your site, before deploying it.

{{<Aside type="note">}}

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

{{</Aside>}}

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your React application, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

{{<Aside type="note" header="SPA rendering">}}

By default, Cloudflare Pages assumes you are developing a single-page application. Refer to [Serving Pages](/pages/platform/serving-pages/#single-page-application-spa-rendering) for more information.

{{</Aside>}}

{{<render file="_learn-more.md" withParameters="React">}}