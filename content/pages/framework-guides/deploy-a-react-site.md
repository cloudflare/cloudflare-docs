---
pcx_content_type: how-to
title: React
---

# React

[React](https://reactjs.org/) is a popular framework for building reactive and powerful front-end applications, built by the open-source team at Facebook.

In this guide, you will create a new React application and deploy it using Cloudflare Pages. You will use `create-react-app`, a batteries-included tool for generating new React applications.

## Setting up a new project

Use the [`create-cloudflare`](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to set up a new project. C3 will create a new project directory, initiate React's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new React project, run the following command:

```sh
$ npm create cloudflare@latest my-react-app -- --framework=react
```

`create-cloudflare` will install dependencies, including the [Wrangler](/workers/wrangler/install-and-update/#check-your-wrangler-version) CLI and the Cloudflare Pages adapter, and ask you setup questions.

Go to the application's directory:

```sh
$ cd my-react-app
```

From here you can run your application with:

```sh
$ npm start
```

{{<render file="_tutorials-before-you-start.md">}}

{{<render file="/_framework-guides/_create-github-repository_no_init.md">}}

## Deploy with Cloudflare Pages

{{<render file="_deploy-via-c3.md" withParameters="React">}}

### Deploy via the Cloudflare dashboard

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
Every time you commit new code to your React application, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

{{<Aside type="note" header="SPA rendering">}}

By default, Cloudflare Pages assumes you are developing a single-page application. Refer to [Serving Pages](/pages/configuration/serving-pages/#single-page-application-spa-rendering) for more information.

{{</Aside>}}

{{<render file="/_framework-guides/_learn-more.md" withParameters="React">}}