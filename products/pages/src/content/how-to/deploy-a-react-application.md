# Deploy a React application

React is an incredibly popular framework for building reactive and powerful frontend applications, built by the open-source team at Facebook.

In this guide, you'll create a new React application and deploy it using Cloudflare Pages. We'll be using `create-react-app`, a batteries-included tool for generating new React applications.

## Setting up a new project

Create a new project using `npx`, giving it the title `my-react-app`.

```sh
$ npx create-react-app my-react-app
```

## Creating a GitHub repository

Create a new GitHub repository by visiting [repo.new](https://repo.new). Once you've created a new repository, you can push your local application to GitHub:

```sh
$ git remote add origin https://github.com/yourgithubusername/githubrepo
$ git branch -M main
$ git push -u origin main
```

## Deploying with Cloudflare Pages

You can deploy your site to Cloudflare Pages by going to the dashboard, and creating a new site. Select your new GitHub repository that you created above, and in the configuration section, provide the following information:

<TableLayout>

| Configuration option | Value           |
| -------------------- | --------------- |
| Production branch    | `main`          |
| Build command        | `npm run build` |
| Build directory      | `build`         |

</TableLayout>

Once you've configured your site, you can begin your first deploy. You should see Cloudflare Pages installing `create-react-app`, your project dependencies, and building your site, before deploying it.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, check out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`. Every time you commit new code to your React application, Cloudflare Pages will automatically rebuild your project and deploy it. You'll also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

Congrats, you've deployed your React site on Cloudflare Pages! To learn more about what you can do with the platform, [check out our How-To section](/how-to).
