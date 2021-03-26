# Deploy a Next.js site

Next.js is an open-source React framework for creating websites and apps. In this guide, you'll create a new Next.js application and deploy it using Cloudflare Pages.

## Creating a new project

Create a new project using npx
```sh
$ npx create-next-app
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
| -------------------- | ----------------|
| Production branch    | `main`          |
| Build command        | `npm run build` |
| Build directory      | `out`           |

</TableLayout>

Your `build` command in `package.json` should build and export your Next.js application, like this: 

```json
{
  "scripts": {
    "build": "next build && next export"
  }
}
```

Once you've configured your site, you can begin your first deploy. You should see Cloudflare Pages installing `next`, your project dependencies, and building your site, before deploying it.

<Aside>

For the complete guide to deploying your first site to Cloudflare Pages, check out [our Getting Started guide](/getting-started).

</Aside>

Once you've deployed your site, you'll receive a unique subdomain for your project on `pages.dev`. Every time you commit new code to your Next.js site, Cloudflare Pages will automatically rebuild your project and deploy it. You'll also get access to [preview deployments](/platform/preview-deployments) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

Congrats, you've deployed your Next.js site on Cloudflare Pages! To learn more about what you can do with the platform, [check out our How-To section](/how-to).
