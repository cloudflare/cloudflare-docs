---
pcx-content-type: how-to
title: Deploy a React application
---

import TutorialsBeforeYouStart from "../\_partials/\_tutorials-before-you-start.md"

# Deploy a React application

[React](https://reactjs.org/) is a popular framework for building reactive and powerful front-end applications, built by the open-source team at Facebook.

In this guide, you will create a new React application and deploy it using Cloudflare Pages. You will use `create-react-app`, a batteries-included tool for generating new React applications.

## Setting up a new project

Create a new project using `npx`, giving it the title `my-react-app` in your terminal.

```sh
$ npx create-react-app my-react-app
```

<TutorialsBeforeYouStart/>

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

Deploy your site to Pages by logging into the [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Pages** and selecting **Create a project**. Select the new GitHub repository that you created and, in the **Set u**p builds and deployments\*\* section, provide the following information:

<TableLayout>

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Build command        | `npm run build` |
| Build directory      | `build`         |

</TableLayout>

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `create-react-app`, your project dependencies, and building your site, before deploying it.

<Aside type="note">

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](/pages/get-started/).

</Aside>

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.
Every time you commit new code to your React application, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](/pages/platform/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your React site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](/pages/framework-guides/).
